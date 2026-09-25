import test from "node:test";
import assert from "node:assert/strict";
import { storageLayout, site, refugeLayout } from "../src/data/site.ts";
const layout = storageLayout.value;

test("sectores caben en la huella ilustrativa sin solaparse", () => {
  const pad = site.venues.baseball.placeholderFootprint.value;
  assert.equal(
    new Set(layout.sectors.map((s) => s.id)).size,
    layout.sectors.length,
  );
  for (const [i, a] of layout.sectors.entries()) {
    assert.ok(
      Math.abs(a.position[0]) + a.footprint.length / 2 <= pad.length / 2,
    );
    assert.ok(Math.abs(a.position[2]) + a.footprint.width / 2 <= pad.width / 2);
    for (const b of layout.sectors.slice(i + 1)) {
      assert.equal(
        Math.abs(a.position[0] - b.position[0]) <
          (a.footprint.length + b.footprint.length) / 2 &&
          Math.abs(a.position[2] - b.position[2]) <
            (a.footprint.width + b.footprint.width) / 2,
        false,
      );
    }
  }
});
test("descarte no tiene camino hacia bodega o despacho; el flujo aceptado sí", () => {
  const reachable = (start) => {
    const result = new Set([start]),
      queue = [start];
    while (queue.length) {
      const current = queue.shift();
      for (const flow of layout.flows.filter((f) => f.from === current)) {
        assert.ok(layout.sectors.some((s) => s.id === flow.to));
        if (!result.has(flow.to)) {
          result.add(flow.to);
          queue.push(flow.to);
        }
      }
    }
    return result;
  };
  assert.ok(reachable("sorting").has("rejection"));
  assert.ok(reachable("sorting").has("warehouse"));
  assert.ok(reachable("warehouse").has("dispatch"));
  assert.equal(reachable("rejection").has("warehouse"), false);
  assert.equal(reachable("rejection").has("dispatch"), false);
});
test("ruta conecta despacho con acceso del refugio y evita equipos del campo", () => {
  const origin = site.venues.baseball.position.value;
  const dispatch = layout.sectors.find((s) => s.id === "dispatch").position;
  assert.deepEqual(layout.route.points[0], [
    origin[0] + dispatch[0],
    0,
    origin[2] + dispatch[2],
  ]);
  const destination = layout.route.points.at(-1),
    registration = refugeLayout.value.registration.position;
  assert.equal(destination[0], registration[0]);
  assert.ok(
    Math.hypot(
      destination[0] - registration[0],
      destination[2] - registration[2],
    ) < site.equipment.closedModule.value.length,
  );
  const obstacles = [
    ...refugeLayout.value.outdoor.centers.map((p) => ({
      p,
      f: site.equipment.canopy.value,
    })),
    ...refugeLayout.value.toilets.map((p) => ({
      p,
      f: site.equipment.toilet.value,
    })),
    ...refugeLayout.value.modules.map((m) => ({
      p: m.position,
      f: site.equipment.closedModule.value,
    })),
  ];
  for (const [i, to] of layout.route.points.slice(1).entries()) {
    const from = layout.route.points[i];
    assert.ok(
      from[0] === to[0] || from[2] === to[2],
      "La verificación siguiente requiere tramos ortogonales",
    );
    const minX = Math.min(from[0], to[0]) - layout.route.width / 2,
      maxX = Math.max(from[0], to[0]) + layout.route.width / 2;
    const minZ = Math.min(from[2], to[2]) - layout.route.width / 2,
      maxZ = Math.max(from[2], to[2]) + layout.route.width / 2;
    for (const { p, f } of obstacles)
      assert.equal(
        minX < p[0] + f.length / 2 &&
          maxX > p[0] - f.length / 2 &&
          minZ < p[2] + f.width / 2 &&
          maxZ > p[2] - f.width / 2,
        false,
      );
  }
});
test("no se inventa lote, cantidad de existencias ni hash de trazabilidad", () => {
  assert.equal(layout.traceability.record, null);
  assert.equal(layout.traceability.status, "Sin registro verificado");
  assert.ok(layout.traceability.fields.includes("Hash"));
  assert.ok(layout.traceability.fields.includes("Cantidad"));
  assert.equal(storageLayout.status, "ilustrativo");
});
