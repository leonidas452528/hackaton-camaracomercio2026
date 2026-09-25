import { distance, area } from "@turf/turf";
import type { Space } from "./types";
export type ScenarioThreat = "flood" | "earthquake" | "drought";
import { planningRules, planningView } from "./data/site.ts";
export { planningRules };
export function requirements(people: number) {
  if (
    !Number.isInteger(people) ||
    people < 1 ||
    people > planningView.maximumPeople
  )
    throw new Error("Usa un conteo entero entre 1 y 100.000 personas.");
  return {
    toilets: Math.ceil(people / planningRules.peoplePerToilet),
    water: people * planningRules.litersPerPersonDay,
    coveredArea: people * planningRules.coveredM2PerPerson,
  };
}
export function eligibility(space: Space, threat: ScenarioThreat) {
  if (threat === "drought")
    return {
      excluded: true,
      reason: "Sin datos de sequía y abastecimiento: no se puede recomendar.",
    };
  if (threat === "flood" && space.properties.flood.length)
    return {
      excluded: true,
      reason: "Descartado por cruce de inundación en las capas consultadas.",
    };
  if (threat === "earthquake" && space.properties.seismic.length)
    return {
      excluded: true,
      reason:
        "Fuera de la preselección por cruce de licuación/corrimiento; requiere evaluación territorial.",
    };
  return {
    excluded: false,
    reason:
      threat === "earthquake"
        ? "Sin cruce de licuación/corrimiento; requiere inspección estructural antes de considerar activación."
        : "Sin cruce de inundación detectado; no significa ausencia de riesgo ni disponibilidad.",
  };
}
export function compareCandidates(
  spaces: Space[],
  origin: Space,
  threat: ScenarioThreat,
) {
  // Una sola fuente para no sumar los puntos deportivos y los polígonos del mismo predio.
  const pool = spaces.filter(
    (s) =>
      s.properties.sourceKey === "publicSpaces" &&
      ["Polygon", "MultiPolygon"].includes(s.geometry.type),
  );
  const seen = new Set<string>();
  const candidates = pool
    .filter((s) => {
      const duplicate = seen.has(s.properties.id);
      seen.add(s.properties.id);
      return !duplicate && !eligibility(s, threat).excluded;
    })
    .map((space) => ({
      space,
      distanceM: distance(
        origin.properties.coordinates,
        space.properties.coordinates,
        { units: "meters" },
      ),
      reason: eligibility(space, threat).reason,
    }))
    .sort(
      (a, b) =>
        a.distanceM - b.distanceM ||
        a.space.properties.id.localeCompare(b.space.properties.id),
    );
  return {
    candidates: candidates.slice(0, 3),
    considered: pool.length,
    excluded: pool.filter((s) => eligibility(s, threat).excluded).length,
  };
}
export function geometryArea(space: Space): number | null {
  return ["Polygon", "MultiPolygon"].includes(space.geometry.type)
    ? area(space)
    : null;
}
export function gaps(space: Space, people: number) {
  const needed = requirements(people);
  return [
    {
      id: "toilets",
      label: "Baños",
      required: needed.toilets,
      unit: "baños",
      existing: space.properties.toilets as number | null,
      responsible: "UAESP",
      rule: "Redondeo superior de personas / 20; referencia de planificación a medio plazo.",
    },
    {
      id: "water",
      label: "Agua para necesidades básicas",
      required: needed.water,
      unit: "L/día",
      existing: space.properties.waterLitersPerDay as number | null,
      responsible: "EMCALI",
      rule: "Personas × 15 L/día; adaptar a contexto y usos. No representa exclusivamente agua de uso no potable.",
    },
    {
      id: "shelter",
      label: "Superficie cubierta habitable",
      required: needed.coveredArea,
      unit: "m²",
      existing: null,
      responsible: "Gestión del Riesgo",
      rule: "Personas × 3,5 m²; referencia mínima a contextualizar. La huella del predio no demuestra área cubierta útil.",
    },
  ].map((g) => ({
    ...g,
    missing: g.existing === null ? null : Math.max(0, g.required - g.existing),
  }));
}
/** Proyección local en metros; conserva todos los polígonos y sus huecos. Sin altura inventada. */
export function projectedFootprint(space: Space) {
  const g = space.geometry;
  if (g.type !== "Polygon" && g.type !== "MultiPolygon") return [];
  const polygons = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
  const [lon, lat] = space.properties.coordinates,
    radians = Math.PI / 180,
    radius = planningView.earthRadiusM;
  return polygons.map((p) =>
    p.map((r) =>
      r.map(
        (c) =>
          [
            (c[0] - lon) * radians * radius * Math.cos(lat * radians),
            (c[1] - lat) * radians * radius,
          ] as [number, number],
      ),
    ),
  );
}
