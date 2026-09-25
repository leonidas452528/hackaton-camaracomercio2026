import test from "node:test";
import assert from "node:assert/strict";
import { googleMapsLinks } from "../src/googleMaps.ts";
import { site, refugeLayout, emergencyCalculation } from "../src/data/site.ts";

test("Google Maps usa latitud,longitud aunque GeoJSON entrega longitud,latitud", () => {
  const coords = [-76.53801534, 3.42216391];
  const links = googleMapsLinks(coords, 17);
  const search = new URL(links.place),
    satellite = new URL(links.satellite),
    street = new URL(links.streetView);
  for (const value of Object.values(links)) {
    const url = new URL(value);
    assert.equal(url.origin, "https://www.google.com");
    assert.equal(url.searchParams.get("api"), "1");
    assert.equal(url.searchParams.has("key"), false);
  }
  assert.equal(search.searchParams.get("query"), "3.42216391,-76.53801534");
  assert.equal(
    satellite.searchParams.get("center"),
    search.searchParams.get("query"),
  );
  assert.equal(satellite.searchParams.get("basemap"), "satellite");
  assert.equal(satellite.searchParams.get("zoom"), "17");
  assert.equal(
    street.searchParams.get("viewpoint"),
    search.searchParams.get("query"),
  );
  assert.equal(street.searchParams.get("map_action"), "pano");
});
test("rechaza coordenadas imposibles y acota el zoom de enlaces externos", () => {
  assert.throws(() => googleMapsLinks([NaN, 3]));
  assert.throws(() => googleMapsLinks([-76, 93]));
  assert.equal(
    new URL(googleMapsLinks([-76, 3], 40).satellite).searchParams.get("zoom"),
    "21",
  );
});
const epsilon = 1e-8;
function contained(center, footprint, container) {
  return (
    Math.abs(center[0]) + footprint.length / 2 <=
      container.length / 2 + epsilon &&
    Math.abs(center[2]) + footprint.width / 2 <= container.width / 2 + epsilon
  );
}
function intersects(a, b, footprint) {
  return (
    Math.abs(a[0] - b[0]) < footprint.length - epsilon &&
    Math.abs(a[2] - b[2]) < footprint.width - epsilon
  );
}
test("huellas interiores conservan área sin solaparse ni salirse de la cancha de referencia", () => {
  const { indoor } = refugeLayout.value;
  const c = emergencyCalculation.value;
  assert.equal(indoor.centers.length, c.indoorKits);
  assert.ok(
    Math.abs(
      indoor.footprint.length * indoor.footprint.width -
        site.equipment.kit.value.footprintM2,
    ) < epsilon,
  );
  for (const [i, p] of indoor.centers.entries()) {
    assert.ok(
      contained(p, indoor.footprint, {
        length: c.courtLength,
        width: c.courtWidth,
      }),
    );
    for (const q of indoor.centers.slice(i + 1))
      assert.equal(intersects(p, q, indoor.footprint), false);
  }
  for (const p of indoor.partitionCenters)
    assert.ok(contained(p, site.equipment.partition.value, indoor.footprint));
});
test("equipo exterior cabe en el campo; baños, módulos y particiones mantienen las cantidades", () => {
  const layout = refugeLayout.value,
    c = emergencyCalculation.value;
  assert.equal(layout.outdoor.centers.length, c.outdoorKits);
  assert.equal(layout.toilets.length, c.toiletsRequired);
  assert.equal(layout.modules.length, c.closedModules);
  assert.equal(
    layout.outdoor.partitionCenters.length,
    site.equipment.kit.value.partitions,
  );
  assert.equal(
    layout.indoor.partitionCenters.length,
    site.equipment.kit.value.partitions,
  );
  const footprints = [
    ...layout.outdoor.centers.map((p) => ({
      p,
      f: site.equipment.canopy.value,
    })),
    ...layout.modules.map((m) => ({
      p: m.position,
      f: site.equipment.closedModule.value,
    })),
    ...layout.toilets.map((p) => ({ p, f: site.equipment.toilet.value })),
  ];
  for (const [i, a] of footprints.entries()) {
    assert.ok(contained(a.p, a.f, site.venues.hockey.field.value));
    for (const b of footprints.slice(i + 1)) {
      const overlap =
        Math.abs(a.p[0] - b.p[0]) < (a.f.length + b.f.length) / 2 &&
        Math.abs(a.p[2] - b.p[2]) < (a.f.width + b.f.width) / 2;
      assert.equal(overlap, false);
    }
  }
  assert.equal(site.equipment.tankCount.value, null); // la maqueta no inventa inventario operativo
  assert.equal(site.scenario.simulatedMinorCount.status, "SIMULADO");
});
