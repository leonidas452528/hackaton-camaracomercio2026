import test from "node:test";
import assert from "node:assert/strict";
import {
  requirements,
  compareCandidates,
  eligibility,
  gaps,
  projectedFootprint,
  geometryArea,
} from "../src/planning.ts";
const fixture = (id, lon = 0, extras = {}) => ({
  type: "Feature",
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [lon, 0],
        [lon + 0.001, 0],
        [lon + 0.001, 0.001],
        [lon, 0.001],
        [lon, 0],
      ],
    ],
  },
  properties: {
    id,
    name: id,
    sourceKey: "publicSpaces",
    coordinates: [lon, 0],
    flood: [],
    seismic: [],
    toilets: null,
    waterLitersPerDay: null,
    ...extras,
  },
});
test("preselección excluye amenazas y fuentes duplicadas; orden determinista por cercanía", () => {
  const origin = fixture("origin");
  const pool = [
    fixture("flood", 0.0001, { flood: ["alta"] }),
    fixture("sports", 0.0001, { sourceKey: "sports" }),
    fixture("far", 0.01),
    fixture("b", 0.002),
    fixture("a", 0.002),
    fixture("fourth", 0.02),
  ];
  const result = compareCandidates(pool, origin, "flood");
  assert.deepEqual(
    result.candidates.map((c) => c.space.properties.id),
    ["a", "b", "far"],
  );
  assert.equal(result.excluded, 1);
  assert.equal(result.considered, 5);
});
test("sismo cambia descarte; sequía no devuelve candidatos sin datos", () => {
  const s = fixture("seismic", 0, { seismic: ["licuación"] });
  assert.equal(eligibility(s, "flood").excluded, false);
  assert.equal(eligibility(s, "earthquake").excluded, true);
  assert.equal(compareCandidates([s], s, "drought").candidates.length, 0);
});
test("necesidades redondean baños, separan cero de desconocido y no usan área predial como cubierta", () => {
  assert.deepEqual(requirements(143), {
    toilets: 8,
    water: 2145,
    coveredArea: 500.5,
  });
  const unknown = gaps(fixture("x"), 143);
  assert.ok(unknown.every((g) => g.missing === null));
  const known = gaps(
    fixture("x", 0, { toilets: 0, waterLitersPerDay: 1000 }),
    143,
  );
  assert.equal(known[0].missing, 8);
  assert.equal(known[1].missing, 1145);
  assert.equal(known[2].missing, null);
});
test("rechaza conteos negativos, vacíos, decimales o no finitos", () => {
  for (const n of [0, -1, 1.5, NaN, Infinity, 100001])
    assert.throws(() => requirements(n));
});
test("geometría conserva huecos y multipolígonos; puntos no adquieren una huella inventada", () => {
  const s = fixture("x");
  s.geometry.coordinates.push([
    [0.0002, 0.0002],
    [0.0004, 0.0002],
    [0.0004, 0.0004],
    [0.0002, 0.0004],
    [0.0002, 0.0002],
  ]);
  const projected = projectedFootprint(s);
  assert.equal(projected.length, 1);
  assert.equal(projected[0].length, 2);
  assert.ok(Math.abs(projected[0][0][1][0] - 111.195) < 0.01);
  const area = geometryArea(s);
  const multi = {
    ...s,
    geometry: {
      type: "MultiPolygon",
      coordinates: [
        s.geometry.coordinates,
        fixture("y", 0.01).geometry.coordinates,
      ],
    },
  };
  assert.equal(projectedFootprint(multi).length, 2);
  assert.ok(geometryArea(multi) > area);
  const point = { ...s, geometry: { type: "Point", coordinates: [0, 0] } };
  assert.deepEqual(projectedFootprint(point), []);
  assert.equal(geometryArea(point), null);
});

test("incendios no heredan aptitud de inundación ni sismo y separan falta de datos de descarte", () => {
  const origin = fixture("origin");
  const spaces = [
    origin,
    fixture("close", 0.00001),
    fixture("flood", 0.01, { flood: ["alta"] }),
  ];
  for (const threat of ["wildfire", "building-fire"]) {
    const result = compareCandidates(spaces, origin, threat);
    assert.equal(result.candidates.length, 0);
    assert.equal(result.pendingEvidence, 3);
    assert.equal(result.excluded, 0);
    assert.equal(eligibility(origin, threat).status, "pending");
    assert.match(
      eligibility(origin, threat).reason,
      /sin evidencia suficiente/,
    );
  }
  assert.equal(eligibility(origin, "unsupported").status, "pending");
  assert.equal(eligibility(origin, "flood").status, "conditional");
});
