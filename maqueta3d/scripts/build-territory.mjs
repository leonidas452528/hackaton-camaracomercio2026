/** Derivado reproducible de las fuentes archivadas. Nunca importa atributos personales. */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";
import { createHash } from "node:crypto";
import { point, pointOnFeature } from "@turf/turf";
import { index, intersections, summarize } from "./spatial.mjs";
const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const raw = resolve(root, "prototipo/datos/raw/idesc");
const out = resolve(root, "maqueta3d/public/data");
mkdirSync(out, { recursive: true });
const definitions = {
  publicSpaces: [
    "epou_epu_espacio_publico_efectivo",
    "dapm",
    "https://datos.cali.gov.co/dataset/epou-espacio-publico-efectivo",
    "CC BY-SA",
  ],
  sports: [
    "escenarios_deportivos",
    "deporte_recreacion",
    "https://idesc.cali.gov.co",
    "CC BY-SA",
  ],
  communes: [
    "pdt_dpa_comunas",
    "dapm",
    "https://www.datos.gov.co/dataset/Comunas-de-Santiago-de-Cali/dx2g-2mhm",
    "CC BY",
  ],
  neighborhoods: [
    "pdt_dpa_barrios_sectores",
    "dapm",
    "https://datos.cali.gov.co/dataset/servicio-wms-barrios-de-cali",
    "CC BY",
  ],
  fluvial: [
    "amb_ari_inundacion_fluvial",
    "pot_2014",
    "https://datos.cali.gov.co/dataset/inundacion-fluvial",
    "CC BY-SA",
  ],
  pluvial: [
    "amb_ari_inundacion_pluvial",
    "pot_2014",
    "https://datos.cali.gov.co/dataset/inundacion-pluvial",
    "CC BY-SA",
  ],
  nonMitigable: [
    "emc_amb_ari_amenaza_no_mitigable_inundacion",
    "expediente_municipal",
    "https://idesc.cali.gov.co",
    "CC BY-SA",
  ],
  liquefaction: [
    "mc_susceptible_licuacion",
    "idesc",
    "https://idesc.cali.gov.co",
    "CC BY-SA",
  ],
  seismicEffects: [
    "amb_ari_efectos_sismicos",
    "pot_2014",
    "https://datos.cali.gov.co/dataset/efectos-sismicos",
    "CC BY-SA",
  ],
};
const sourceLayers = {},
  sources = [];
for (const [key, [name, workspace, page, license]] of Object.entries(
  definitions,
)) {
  const bytes = readFileSync(resolve(raw, `${name}.geojson`));
  const data = JSON.parse(bytes);
  if (!data.features?.length) throw new Error(`Capa vacía: ${name}`);
  sourceLayers[key] = data;
  sources.push({
    key,
    name,
    page,
    license,
    download: `https://ws-idesc.cali.gov.co/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${workspace}:${name}&outputFormat=application/json&srsName=EPSG:4326`,
    snapshotDate: "2026-09-25",
    sha256: createHash("sha256").update(bytes).digest("hex"),
    count: data.features.length,
  });
}
const collection = (features) => ({ type: "FeatureCollection", features });
const feature = (geometry, properties) => ({
  type: "Feature",
  geometry,
  properties,
});
const communes = collection(
  sourceLayers.communes.features.map((f) =>
    feature(f.geometry, {
      code: f.properties.comcodigo,
      name: f.properties.comnombre,
    }),
  ),
);
const neighborhoods = collection(
  sourceLayers.neighborhoods.features.map((f) =>
    feature(f.geometry, {
      code: f.properties.barcodigo,
      name: f.properties.barnombre,
      commune: f.properties.barcomuna,
    }),
  ),
);
const flood = collection(
  ["fluvial", "pluvial", "nonMitigable"].flatMap((key) =>
    sourceLayers[key].features.map((f) =>
      feature(f.geometry, {
        sourceKey: key,
        label: f.properties.amenaza_in ?? f.properties.tipo_amena,
      }),
    ),
  ),
);
const seismic = collection([
  ...sourceLayers.liquefaction.features
    .filter(
      (f) =>
        Number(f.properties.sucep_licu) > 0 ||
        Number(f.properties.corrim_lat) > 0,
    )
    .map((f) =>
      feature(f.geometry, {
        sourceKey: "liquefaction",
        label: `${f.properties.label ?? f.properties.zona_mzsc} · susceptibilidad a licuación / corrimiento`,
      }),
    ),
  ...sourceLayers.seismicEffects.features.map((f) =>
    feature(f.geometry, {
      sourceKey: "seismicEffects",
      label: f.properties.tipo,
    }),
  ),
]);
const communeIndex = index(communes.features),
  neighborhoodIndex = index(neighborhoods.features);
const floodIndex = index(flood.features),
  seismicIndex = index(seismic.features);
const records = [],
  rejected = [];
for (const sourceKey of ["publicSpaces", "sports"]) {
  for (const f of sourceLayers[sourceKey].features) {
    if (!f.geometry) {
      rejected.push({ sourceKey, reason: "Sin geometría" });
      continue;
    }
    const p = f.properties;
    const anchor = f.geometry.type === "Point" ? f : pointOnFeature(f);
    const coordinates = anchor.geometry.coordinates.slice(0, 2);
    if (!coordinates.every(Number.isFinite))
      throw new Error("Coordenadas inválidas");
    const communeMatches = intersections(point(coordinates), communeIndex);
    const neighborhoodMatches = intersections(
      point(coordinates),
      neighborhoodIndex,
    );
    const commune =
      communeMatches.length === 1 ? communeMatches[0].properties.code : null;
    const neighborhood =
      neighborhoodMatches.length === 1
        ? neighborhoodMatches[0].properties.name
        : null;
    records.push(
      feature(f.geometry, {
        id: sourceKey === "publicSpaces" ? `epou-${p.gid}` : `deporte-${p.id}`,
        sourceKey,
        name:
          sourceKey === "publicSpaces"
            ? `${p.epepotele ?? "Espacio público"} · ${p.epebarrio ?? "sector sin nombre"} · ${p.epecodep ?? p.gid}`
            : p.nombre || `Escenario sin nombre · ${p.id}`,
        commune,
        neighborhood,
        coordinates,
        sourceCommune: sourceKey === "publicSpaces" ? p.epeidcomuna : null,
        sourceNeighborhood: sourceKey === "publicSpaces" ? p.epebarrio : null,
        boundaryAmbiguous:
          communeMatches.length > 1 || neighborhoodMatches.length > 1,
        areaM2:
          sourceKey === "publicSpaces" && Number.isFinite(p.shape_area)
            ? Math.round(p.shape_area)
            : null,
        type:
          sourceKey === "publicSpaces" ? p.epepotele : "Escenario deportivo",
        condition: sourceKey === "publicSpaces" ? p.epecualit : null,
        flood: [
          ...new Set(
            intersections(f, floodIndex).map((h) => h.properties.label),
          ),
        ],
        seismic: [
          ...new Set(
            intersections(f, seismicIndex).map((h) => h.properties.label),
          ),
        ],
        assessmentMethod:
          f.geometry.type === "Point"
            ? "Cruce en el punto del catálogo; no evalúa toda la huella"
            : "Intersección con toda la huella; incluye contacto de borde",
        availability: "Por confirmar con la entidad responsable",
        structuralAssessment: null,
        capacity: null,
        toilets: null,
        waterLitersPerDay: null,
      }),
    );
  }
}
const ids = new Set(records.map((f) => f.properties.id));
if (ids.size !== records.length) throw new Error("Identificadores duplicados");
const summary = summarize(records);
const manifest = {
  snapshotDate: "2026-09-25",
  attribution:
    "Alcaldía de Santiago de Cali · DAPM / IDESC y Secretaría del Deporte y la Recreación",
  license: "CC BY-SA 4.0",
  sources,
  recordCount: records.length,
  rejected,
  availabilityConfirmed: 0,
  limitations: [
    "Inventarios geográficos, no lista de alojamientos disponibles ni autorizados.",
    "Las dos fuentes pueden representar el mismo predio; no sumar como lugares únicos ni aforos.",
    "Sin cruce no significa ausencia de amenaza. Faltan evaluaciones, servicios, accesibilidad y autorización.",
    "No se han evaluado remoción en masa, incendio, sequía ni todos los riesgos sísmicos.",
    "Los polígonos son huellas inventariadas; no representan superficie utilizable o libre.",
    "Comuna y barrio se asignan por punto representativo y límites archivados. Los bordes ambiguos quedan sin asignar.",
    "La condición cualitativa del catálogo no certifica condiciones posteriores a una emergencia.",
  ],
};
for (const [name, data] of Object.entries({
  spaces: collection(records),
  communes,
  neighborhoods,
  flood,
  seismic,
  summary,
  manifest,
})) {
  writeFileSync(resolve(out, `${name}.json`), JSON.stringify(data));
}
const csv = (value) => `"${String(value ?? "").replaceAll('"', '""')}"`;
writeFileSync(
  resolve(out, "sectores.csv"),
  [
    "comuna,barrio_sector,registros_espacio_publico,registros_deportivos,cruces_inundacion,cruces_sismicos,disponibilidad_confirmada",
    ...summary.map((r) => Object.values(r).map(csv).join(",")),
  ].join("\n") + "\n",
);
console.log(
  JSON.stringify(
    {
      records: records.length,
      publicSpaces: records.filter(
        (f) => f.properties.sourceKey === "publicSpaces",
      ).length,
      sports: records.filter((f) => f.properties.sourceKey === "sports").length,
      sectors: summary.length,
      unassigned: records.filter((f) => !f.properties.commune).length,
      flood: records.filter((f) => f.properties.flood.length).length,
      seismic: records.filter((f) => f.properties.seismic.length).length,
      rejected,
    },
    null,
    2,
  ),
);
