import test from "node:test";
import assert from "node:assert/strict";
import { acopioCapacity, emptyAcopioInputs } from "../src/calculateAcopioCapacity.ts";
const inputs = { excluded: "100", circulation: "200", attention: "100", otherUses: "100", unitArea: "20", units: "25" };
test("descuenta reservas y admite el límite exacto; no autoriza capacidad operacional", () => {
  const r = acopioCapacity(1000, inputs);
  assert.equal(r.status, "fits");
  assert.equal(r.availableM2, 500);
  assert.equal(r.maxUnits, 25);
  assert.equal(r.remainingM2, 0);
  assert.equal(r.operationalCapacity, null);
});
test("exceso y reservas superiores al parque nunca producen capacidad negativa", () => {
  const r = acopioCapacity(1000, { ...inputs, units: "26" });
  assert.equal(r.status, "overflow");
  assert.equal(r.shortageM2, 20);
  assert.equal(r.excessUnits, 1);
  const reserved = acopioCapacity(100, inputs);
  assert.equal(reserved.availableM2, 0);
  assert.equal(reserved.maxUnits, 0);
  assert.equal(reserved.shortageM2, 900);
});
test("sin área o medidas no inventa ceros; rechaza entradas inválidas", () => {
  for (const area of [null, NaN, Infinity, 0]) assert.equal(acopioCapacity(area, inputs).status, "unknown");
  assert.equal(acopioCapacity(1000, emptyAcopioInputs).status, "unknown");
  for (const patch of [{ circulation: "0" }, { attention: "0" }, { excluded: "-1" }, { units: "1.5" }, { unitArea: "0" }, { unitArea: "Infinity" }, { unitArea: "1e-320" }])
    assert.equal(acopioCapacity(1000, { ...inputs, ...patch }).status, "invalid");
});
test("capacidad cambia con superficie y redondea módulos hacia abajo", () => {
  assert.equal(acopioCapacity(999, inputs).maxUnits, 24);
  assert.equal(acopioCapacity(2000, inputs).maxUnits, 75);
});
