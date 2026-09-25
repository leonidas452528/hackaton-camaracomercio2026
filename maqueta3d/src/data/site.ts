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
    shadow: { bias: -0.0001, normalBias: 0.08 },
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
        position: [0, 65, 65] as const,
        target: [0, 0, 0] as const,
      },
      {
        id: "volleyball",
        label: "Coliseo",
        position: [172, 25, -83] as const,
        target: [148, 0, -111] as const,
      },
      {
        id: "registration",
        label: "Punto de registro",
        position: [43, 9, -6] as const,
        target: [35, 1, -17] as const,
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

/** Disposición de demostración. No describe equipamiento existente ni un diseño aprobado. */
export const refugeLayout = evidence(
  {
    indoor: {
      // Las particiones interiores son flexibles: no se exige la huella de la cubierta exterior.
      footprint: {
        length: courtLength / indoorKits,
        width: kit.footprintM2 / (courtLength / indoorKits),
      },
      centers: Array.from(
        { length: indoorKits },
        (_, i) =>
          [
            -courtLength / 2 + (i + 0.5) * (courtLength / indoorKits),
            0,
            0,
          ] as const,
      ),
      partitionCenters: Array.from(
        { length: kit.partitions },
        (_, i) => [-1.2, 0, (i - (kit.partitions - 1) / 2) * 2.8] as const,
      ),
    },
    outdoor: {
      centers: Array.from(
        { length: emergencyCalculation.value.outdoorKits },
        (_, i) => [-20 + i * 15, 0, 0] as const,
      ),
      partitionCenters: [
        [-3, 0, -1.6],
        [0, 0, -1.6],
        [3, 0, -1.6],
        [-3, 0, 1.6],
        [0, 0, 1.6],
      ] as const,
    },
    modules: [
      {
        label: site.equipment.closedModuleLabels[0],
        position: [25, 0, 1] as const,
        color: "#b79260",
      },
      {
        label: site.equipment.closedModuleLabels[1],
        position: [25, 0, -10] as const,
        color: "#5e9688",
      },
    ],
    toilets: Array.from(
      { length: emergencyCalculation.value.toiletsRequired },
      (_, i) => [-15 + i * 2.2, 0, 22] as const,
    ),
    tanks: {
      centers: [
        [-17, 0, -3],
        [-17, 0, 0],
      ] as const,
      note: "Dos tanques ilustrativos; cantidad operativa y capacidad útil por definir.",
    },
    solar: {
      position: [28, 0, 12] as const,
      panel: [2.8, 0.12, 1.6] as const,
      panelHeight: 1.2,
      panelTilt: -0.3,
      battery: [0.6, 0.7, 0.5] as const,
    },
    registration: {
      position: [35, 0, -17] as const,
      table: [2, 0.12, 0.9] as const,
      tableHeight: 0.85,
      screen: [1.3, 0.85, 0.08] as const,
      screenHeight: 1.6,
      reader: [0.18, 0.12, 0.25] as const,
      code: "DEMO-0001",
      labelHeight: 3.5,
    },
    details: {
      poleThickness: 0.06,
      clothThickness: 0.025,
      roofThickness: 0.12,
      door: [0.9, 2.1, 0.035] as const,
      toiletDoor: [0.65, 1.8, 0.025] as const,
      pipeRadius: 0.07,
      labelLift: 1.5,
      floorThickness: 0.06,
    },
    hall: { columnThickness: 0.3, roofOpacity: 0.22 },
    fieldLabels: {
      kits: [-8, 8, -12] as const,
      toilets: [-30, 6, 23] as const,
      modules: [32, 9, -14] as const,
      solar: [35, 9, 14] as const,
    },
    legend:
      "Distribución y equipamiento ilustrativos · no representan inventario instalado ni aforo autorizado",
  },
  "ilustrativo",
  sources.prompt,
  "5 huellas interiores de 70 m² reconfiguradas como franjas; 3 cubiertas exteriores de 10×7 m. Validar evacuación, circulación, protección y accesibilidad.",
);
