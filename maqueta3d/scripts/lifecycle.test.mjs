import test from "node:test";
import assert from "node:assert/strict";
import {
  lifecycle,
  emergencyCalculation,
  refugeLayout,
  site,
  storageLayout,
} from "../src/data/site.ts";
const data = lifecycle.value;
test("los mismos ocho kits caben como feria y vuelven a la bodega sin solaparse", () => {
  const count = emergencyCalculation.value.kitsRequired;
  const warehouse = storageLayout.value.sectors.find(
    (s) => s.id === "warehouse",
  );
  for (const state of ["everyday", "recovery"]) {
    const centers = data[`${state}Centers`];
    assert.equal(centers.length, count);
    const scale = state === "recovery" ? data.packedScale : [1, 1, 1];
    const footprints = centers.map((_, i) =>
      i < emergencyCalculation.value.indoorKits
        ? refugeLayout.value.indoor.footprint
        : site.equipment.canopy.value,
    );
    const origin =
      state === "everyday"
        ? [0, 0, 0]
        : site.venues.baseball.position.value.map(
            (v, i) => v + warehouse.position[i],
          );
    const bounds =
      state === "everyday"
        ? site.venues.hockey.field.value
        : warehouse.footprint;
    centers.forEach((p, i) => {
      assert.ok(
        Math.abs(p[0] - origin[0]) + (footprints[i].length * scale[0]) / 2 <=
          bounds.length / 2,
      );
      assert.ok(
        Math.abs(p[2] - origin[2]) + (footprints[i].width * scale[2]) / 2 <=
          bounds.width / 2,
      );
      centers.slice(i + 1).forEach((q, offset) => {
        const j = i + offset + 1;
        assert.ok(
          Math.abs(p[0] - q[0]) >=
            ((footprints[i].length + footprints[j].length) * scale[0]) / 2 ||
            Math.abs(p[2] - q[2]) >=
              ((footprints[i].width + footprints[j].width) * scale[2]) / 2,
        );
      });
    });
  }
});
