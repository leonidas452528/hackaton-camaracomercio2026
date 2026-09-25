import { bbox, booleanIntersects } from "@turf/turf";
export function index(features) {
  return features.map((feature) => ({ feature, bounds: bbox(feature) }));
}
export function overlaps(a, b) {
  return a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1];
}
export function intersections(feature, indexed) {
  const bounds = bbox(feature);
  return indexed
    .filter(
      (item) =>
        overlaps(bounds, item.bounds) &&
        booleanIntersects(feature, item.feature),
    )
    .map((item) => item.feature);
}
export function summarize(records) {
  const groups = new Map();
  for (const record of records) {
    const p = record.properties;
    const key = `${p.commune ?? "sin-asignar"}|${p.neighborhood ?? "sin-asignar"}`;
    const group = groups.get(key) ?? {
      commune: p.commune,
      neighborhood: p.neighborhood,
      publicSpaces: 0,
      sportsRecords: 0,
      floodIntersections: 0,
      seismicIntersections: 0,
      availabilityConfirmed: 0,
    };
    group[p.sourceKey === "publicSpaces" ? "publicSpaces" : "sportsRecords"]++;
    group.floodIntersections += Number(p.flood.length > 0);
    group.seismicIntersections += Number(p.seismic.length > 0);
    groups.set(key, group);
  }
  return [...groups.values()].sort((a, b) =>
    `${a.commune} ${a.neighborhood}`.localeCompare(
      `${b.commune} ${b.neighborhood}`,
      "es",
    ),
  );
}
