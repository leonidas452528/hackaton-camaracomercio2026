export const emptyAcopioInputs = {
  excluded: "",
  circulation: "",
  attention: "",
  otherUses: "",
  unitArea: "",
  units: "",
};
export type AcopioInputs = typeof emptyAcopioInputs;

/** Balance de superficies, no aforo ni comprobación de encaje geométrico. */
export function acopioCapacity(area: number | null, inputs: AcopioInputs) {
  const base = {
    cartographicAreaM2: area,
    simulation: true,
    inputs,
    operationalCapacity: null,
  };
  if (area === null || !Number.isFinite(area) || area <= 0)
    return {
      ...base,
      status: "unknown" as const,
      reason: "Sin polígono válido: no se puede calcular el área disponible.",
    };
  if (Object.values(inputs).some((value) => value.trim() === ""))
    return {
      ...base,
      status: "unknown" as const,
      reason:
        "Completa las superficies y la carga propuesta; un dato faltante no equivale a cero.",
    };
  const values = Object.fromEntries(
    Object.entries(inputs).map(([key, value]) => [key, Number(value)]),
  ) as Record<keyof AcopioInputs, number>;
  if (
    Object.values(values).some(
      (value) => !Number.isFinite(value) || value < 0,
    ) ||
    values.unitArea <= 0 ||
    !Number.isSafeInteger(values.units) ||
    values.units < 1
  )
    return {
      ...base,
      status: "invalid" as const,
      reason:
        "Usa superficies no negativas, área por módulo mayor que cero y cantidad entera positiva.",
    };
  if (values.circulation <= 0 || values.attention <= 0)
    return {
      ...base,
      status: "invalid" as const,
      reason:
        "Reserva área para circulación/accesos y atención/espera. Sus dimensiones deben verificarse.",
    };
  const reservedM2 =
    values.excluded + values.circulation + values.attention + values.otherUses;
  const requestedM2 = values.units * values.unitArea;
  if (!Number.isFinite(reservedM2) || !Number.isFinite(requestedM2))
    return {
      ...base,
      status: "invalid" as const,
      reason: "Las superficies introducidas exceden el rango calculable.",
    };
  const availableM2 = Math.max(0, area - reservedM2);
  const maxUnits = Math.floor(availableM2 / values.unitArea);
  if (!Number.isSafeInteger(maxUnits))
    return { ...base, status: "invalid" as const, reason: "Revisa la huella por módulo: la cantidad calculada excede el rango de precisión." };
  const shortageM2 = Math.max(0, reservedM2 + requestedM2 - area);
  return {
    ...base,
    reservedM2,
    requestedM2,
    availableM2,
    maxUnits,
    shortageM2,
    remainingM2: Math.max(0, availableM2 - requestedM2),
    excessUnits: Math.max(0, values.units - maxUnits),
    status: shortageM2 > 0 ? ("overflow" as const) : ("fits" as const),
    reason:
      shortageM2 > 0
        ? "La propuesta supera la superficie disponible. Reduce la carga o revisa otro espacio."
        : "La propuesta cumple el balance de áreas supuesto; falta comprobar distribución, accesos y condiciones en campo.",
  };
}
