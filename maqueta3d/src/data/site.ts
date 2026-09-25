/** Única fuente de medidas y cantidades. Una unidad de escena equivale a un metro.
 * No acredita aforo, aptitud estructural ni disponibilidad real de servicios.
 */
export type EvidenceStatus =
  | "documentado"
  | "referencia reglamentaria (verificar)"
  | "aproximado"
  | "ilustrativo"
  | "POR MEDIR"
  | "SIMULADO"
  | "calculado";

export interface Evidence<T> {
  readonly value: T;
  readonly status: EvidenceStatus;
  readonly source: string;
  readonly note: string;
}

function evidence<T>(
  value: T,
  status: EvidenceStatus,
  source: string,
  note = "",
): Evidence<T> {
  return { value, status, source, note };
}

export const sources = {
  official: "docs/portafolio_retos_alcaldia_cali.pdf — RETO-01, Datos clave",
  proposal: "docs/propuesta_cali_activa.md — Sitio piloto y Contenido del kit",
  prompt: "PROMPT_CODEX_3D.md — secciones 2 y 3",
  hockey:
    "https://www.fih.hockey/static-assets/pdf/fih-junior_world-cup-_events_field_specifications-16-01-05.pdf",
  volleyball: "https://faculty.kfupm.edu.sa/pe/abuhilal/volleyball_rules.html",
} as const;

export const site = {
  name: "Unidad Deportiva Jaime Aparicio · Cali Activa",
  coordinates: {
    metersPerUnit: 1,
    eastAxis: "+X",
    northAxis: "-Z",
    upAxis: "+Y",
    legend: "Posiciones aproximadas — orientación por verificar",
  },
  presentation: {
    ground: evidence(
      { length: 340, width: 250, center: [75, -0.2, -30] as const },
      "ilustrativo",
      sources.prompt,
      "Base visual, no representa límites del predio.",
    ),
    genericHall: evidence(
      { length: 28, width: 19, height: 9 },
      "ilustrativo",
      sources.prompt,
      "Volumen genérico; dimensiones reales POR MEDIR.",
    ),
    surfaceThickness: 0.15,
    camera: {
      position: [280, 260, 290] as const,
      target: [70, 0, -30] as const,
      fov: 45,
    },
    views: [
      {
        id: "general",
        label: "General",
        position: [280, 260, 290] as const,
        target: [70, 0, -30] as const,
      },
      {
        id: "hockey",
        label: "Campo de hockey",
        position: [85, 90, 95] as const,
        target: [0, 0, 0] as const,
      },
      {
        id: "volleyball",
        label: "Coliseo",
        position: [186, 42, -63] as const,
        target: [148, 0, -111] as const,
      },
      {
        id: "baseball",
        label: "Acopio",
        position: [235, 80, 120] as const,
        target: [173, 0, 40] as const,
      },
    ],
  },
  venues: {
    hockey: {
      name: "Cancha de Hockey Miguel Calero",
      position: evidence(
        [0, 0, 0] as const,
        "aproximado",
        sources.prompt,
        "Origen relativo de la escena.",
      ),
      field: evidence(
        { length: 91.4, width: 55 },
        "referencia reglamentaria (verificar)",
        sources.hockey,
        "Dimensiones tomadas de la propuesta; confirmar las medidas reales del escenario.",
      ),
      footprintWithMargins: evidence(
        { length: 97.4, width: 59 },
        "referencia reglamentaria (verificar)",
        sources.hockey,
      ),
    },
    volleyball: {
      name: "Coliseo de Voleibol Francisco Chois",
      position: evidence(
        [148, 0, -111] as const,
        "aproximado",
        sources.prompt,
        "Error de decenas de metros.",
      ),
      court: evidence(
        { length: 18, width: 9 },
        "referencia reglamentaria (verificar)",
        sources.volleyball,
      ),
      freeZonePerSide: evidence(
        3,
        "referencia reglamentaria (verificar)",
        sources.volleyball,
      ),
      minimumClearHeight: evidence(
        7,
        "referencia reglamentaria (verificar)",
        sources.volleyball,
      ),
      modeledCourtCount: evidence(
        1,
        "ilustrativo",
        sources.prompt,
        "No representa el número real de canchas.",
      ),
      actualCourtCount: evidence<number | null>(
        null,
        "POR MEDIR",
        sources.proposal,
      ),
      actualFootprint: evidence<readonly [number, number] | null>(
        null,
        "POR MEDIR",
        sources.proposal,
      ),
      actualHeight: evidence<number | null>(
        null,
        "POR MEDIR",
        sources.proposal,
      ),
      roofArea: evidence<number | null>(null, "POR MEDIR", sources.proposal),
    },
    baseball: {
      name: "Diamante de Béisbol · centro de acopio",
      position: evidence(
        [173, 0, 40] as const,
        "aproximado",
        sources.prompt,
        "Error de decenas de metros.",
      ),
      placeholderFootprint: evidence(
        { length: 60, width: 60 },
        "ilustrativo",
        sources.prompt,
        "Dimensiones reales POR MEDIR.",
      ),
    },
    evangelista: {
      name: "Coliseo Evangelista Mora · recuadro aparte",
      position: evidence(
        [-195, 0, -726] as const,
        "aproximado",
        sources.prompt,
        "Fuera del encuadre principal.",
      ),
      actualFootprint: evidence<readonly [number, number] | null>(
        null,
        "POR MEDIR",
        sources.proposal,
      ),
      actualHeight: evidence<number | null>(
        null,
        "POR MEDIR",
        sources.proposal,
      ),
      actualCourtCount: evidence<number | null>(
        null,
        "POR MEDIR",
        sources.proposal,
      ),
      modeledCourtCount: evidence(1, "ilustrativo", sources.prompt),
    },
  },
  equipment: {
    partition: evidence(
      { length: 2, width: 2, height: 2 },
      "ilustrativo",
      sources.prompt,
    ),
    kit: evidence(
      { people: 20, partitions: 5, footprintM2: 70 },
      "ilustrativo",
      sources.prompt,
      "Huella de referencia con circulación; las particiones no acreditan área individual suficiente.",
    ),
    canopy: evidence(
      { length: 10, width: 7, clearHeight: 3 },
      "ilustrativo",
      sources.prompt,
    ),
    closedModule: evidence(
      { length: 5, width: 3.5, height: 2.5 },
      "ilustrativo",
      sources.prompt,
    ),
    closedModuleLabels: ["Espacio NNA", "Punto de salud"],
    toilet: evidence(
      { length: 1.2, width: 1.2, height: 2.3 },
      "ilustrativo",
      sources.prompt,
    ),
    tank: evidence(
      { length: 1, width: 1, height: 1.2 },
      "ilustrativo",
      sources.prompt,
      "Volumen geométrico no equivale a capacidad útil ni garantiza suministro diario. Uso no potable.",
    ),
    tankCount: evidence<number | null>(null, "POR MEDIR", sources.proposal),
    solarKitCount: evidence(
      1,
      "ilustrativo",
      sources.prompt,
      "Kit compartido; potencia y dimensiones por definir.",
    ),
  },
  scenario: {
    people: evidence(
      143,
      "documentado",
      sources.official,
      "Caso citado en la ficha; no es ocupación actual.",
    ),
    peoplePerToilet: evidence(
      20,
      "referencia reglamentaria (verificar)",
      sources.proposal,
      "Referencia humanitaria Esfera; edición pendiente de verificar.",
    ),
    litersPerPersonDay: evidence(
      15,
      "referencia reglamentaria (verificar)",
      sources.proposal,
      "Parámetro solicitado para la maqueta de uso no potable; no acredita que Esfera destine toda esta dotación a ese uso.",
    ),
    simulatedMinorCount: evidence(
      40,
      "SIMULADO",
      sources.prompt,
      "Conteo agregado ficticio, sin registros individuales.",
    ),
  },
  storageFlow: [
    "Lista pública de necesidades",
    "Recepción",
    "Clasificación: alimentos, agua, aseo, abrigo, kits",
    "Descarte: vencido o inservible",
    "Bodega e inventario",
    "Despacho hacia el refugio",
    "Pantalla de trazabilidad de insumos",
  ],
  states: [
    { id: "everyday", label: "Uso cotidiano" },
    { id: "emergency", label: "Emergencia (sismo)" },
    { id: "recovery", label: "Recuperación" },
  ],
  safeguards: [
    "La activación la decide la Secretaría de Gestión del Riesgo o el Consejo Municipal.",
    "Requiere evaluación estructural vigente e inspección antes de activar; no emite conceptos de Bomberos.",
    "Solo conteos agregados. Sin nombres, documentos, identificación individual ni reconocimiento facial.",
    "Maqueta ilustrativa: no es un plano constructivo ni un aforo autorizado.",
    "Uso no potable. Sin obras civiles ni logos institucionales.",
  ],
} as const;

const court = site.venues.volleyball.court.value;
const freeZone = site.venues.volleyball.freeZonePerSide.value;
const kit = site.equipment.kit.value;
const people = site.scenario.people.value;
const courtLength = court.length + freeZone * 2;
const courtWidth = court.width + freeZone * 2;
const courtAreaM2 = courtLength * courtWidth;
const kitsRequired = Math.ceil(people / kit.people);
const courtKitsByArea = Math.floor(courtAreaM2 / kit.footprintM2);
const indoorKits = Math.min(kitsRequired, courtKitsByArea);

export const emergencyCalculation = evidence(
  {
    courtLength,
    courtWidth,
    courtAreaM2,
    kitsRequired,
    courtKitsByArea,
    indoorKits,
    outdoorKits: kitsRequired - indoorKits,
    toiletsRequired: Math.ceil(people / site.scenario.peoplePerToilet.value),
    nonPotableLitersPerDay: people * site.scenario.litersPerPersonDay.value,
    totalKitFootprintM2: kitsRequired * kit.footprintM2,
    closedModules: site.equipment.closedModuleLabels.length,
  },
  "calculado",
  sources.prompt,
  "ceil(personas/20); floor(área/70); ceil(personas/20) baños; personas×15 L/día. " +
    "Los 5 kits interiores son una estimación por área: falta validar encaje, evacuación y accesibilidad.",
);
