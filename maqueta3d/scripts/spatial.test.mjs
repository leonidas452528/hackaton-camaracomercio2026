import test from "node:test";
import assert from "node:assert/strict";
import { polygon, point } from "@turf/turf";
import { readFileSync } from "node:fs";
import { index, intersections, summarize } from "./spatial.mjs";
const square = (x, y, size) =>
  polygon([
    [
      [x, y],
      [x + size, y],
      [x + size, y + size],
      [x, y + size],
      [x, y],
    ],
  ]);
test("detecta amenaza que toca la huella aunque el centro quede fuera", () => {
  const hazard = index([square(9, 0, 4)]);
  assert.equal(intersections(square(0, 0, 10), hazard).length, 1);
  assert.equal(intersections(point([5, 5]), hazard).length, 0);
});
test("respeta huecos y descarta cajas cercanas sin cruce real", () => {
  const area = polygon([
    [
      [0, 0],
      [10, 0],
      [10, 10],
      [0, 10],
      [0, 0],
    ],
    [
      [2, 2],
      [2, 8],
      [8, 8],
      [8, 2],
      [2, 2],
    ],
  ]);
  assert.equal(intersections(point([5, 5]), index([area])).length, 0);
  assert.equal(intersections(point([1, 1]), index([area])).length, 1);
  assert.equal(intersections(square(11, 11, 2), index([area])).length, 0);
});
test("conserva los registros, separa fuentes y nunca inventa disponibilidad", () => {
  const data = JSON.parse(
    readFileSync(new URL("../public/data/spaces.json", import.meta.url)),
  );
  const manifest = JSON.parse(
    readFileSync(new URL("../public/data/manifest.json", import.meta.url)),
  );
  assert.equal(
    data.features.length,
    manifest.sources
      .filter((s) => ["publicSpaces", "sports"].includes(s.key))
      .reduce((sum, s) => sum + s.count, 0),
  );
  const ids = new Set();
  const forbidden = [
    "visitador",
    "telefono",
    "cedula",
    "documento",
    "propietario",
  ];
  for (const f of data.features) {
    const p = f.properties;
    assert.ok(!ids.has(p.id));
    ids.add(p.id);
    assert.ok(p.coordinates.every(Number.isFinite));
    assert.ok(p.coordinates[0] < -76 && p.coordinates[0] > -77);
    assert.ok(p.coordinates[1] > 3 && p.coordinates[1] < 4);
    assert.equal(p.capacity, null);
    assert.equal(p.structuralAssessment, null);
    assert.equal(p.availability, "Por confirmar con la entidad responsable");
    for (const key of Object.keys(p)) assert.ok(!forbidden.includes(key));
  }
  const summary = summarize(data.features);
  assert.equal(
    summary.reduce((s, r) => s + r.publicSpaces + r.sportsRecords, 0),
    data.features.length,
  );
  assert.equal(
    summary.reduce((s, r) => s + r.availabilityConfirmed, 0),
    0,
  );
});
