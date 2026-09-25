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
        position: [173, 80, 115] as const,
        target: [173, 0, 40] as const,
      },
      {
        id: "supply-route",
        label: "Ruta al refugio",
        position: [120, 170, 195] as const,
        target: [100, 0, 10] as const,
      },
      {
        id: "traceability",
        label: "Pantalla de trazabilidad",
        position: [153, 10, 82] as const,
        target: [153, 2.6, 64] as const,
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

/** Acopio conceptual: el mobiliario no describe existencias ni instalaciones reales. */
export const storageLayout = evidence(
  {
    sectors: [
      {
        id: "needs",
        number: 1,
        label: site.storageFlow[0],
        shortLabel: "Necesidades",
        position: [-20, 0, -20] as const,
        footprint: { length: 14, width: 10 },
        color: "#e7ce9b",
        description:
          "Publicar el requerimiento calculado para el escenario. Las existencias son desconocidas: todavía no se puede calcular el faltante real.",
      },
      {
        id: "reception",
        number: 2,
        label: site.storageFlow[1],
        shortLabel: "Recepción",
        position: [0, 0, -20] as const,
        footprint: { length: 14, width: 10 },
        color: "#b4caba",
        description:
          "Verificar y registrar los insumos que llegan antes de incorporarlos al inventario. La maqueta no registra donantes ni personas.",
      },
      {
        id: "sorting",
        number: 3,
        label: site.storageFlow[2],
        shortLabel: "Clasificación",
        position: [20, 0, -17] as const,
        footprint: { length: 14, width: 16 },
        color: "#a7c3c9",
        description:
          "Separar por categoría y revisar estado. Lo aceptado sigue a la bodega; lo vencido o inservible pasa al área de descarte.",
      },
      {
        id: "rejection",
        number: 4,
        label: site.storageFlow[3],
        shortLabel: "Descarte",
        position: [22, 0, 8] as const,
        footprint: { length: 10, width: 10 },
        color: "#dfb19a",
        description:
          "Separar los insumos vencidos o inservibles y registrar el motivo. No vuelven al circuito de distribución; la disposición la define la entidad responsable.",
      },
      {
        id: "warehouse",
        number: 5,
        label: site.storageFlow[4],
        shortLabel: "Bodega",
        position: [0, 0, 10] as const,
        footprint: { length: 18, width: 16 },
        color: "#b6c5a1",
        description:
          "Conservar los insumos aceptados en estanterías y registrar entradas, salidas y saldo verificados. Los muebles dibujados son ilustrativos; no representan existencias.",
      },
      {
        id: "dispatch",
        number: 6,
        label: site.storageFlow[5],
        shortLabel: "Despacho",
        position: [-20, 0, 10] as const,
        footprint: { length: 12, width: 12 },
        color: "#9fc3b3",
        description:
          "Preparar el despacho que solicite el refugio y registrar origen, destino y cantidad. La recepción en el refugio requiere confirmación por la entidad responsable.",
      },
      {
        id: "traceability",
        number: 7,
        label: site.storageFlow[6],
        shortLabel: "Trazabilidad",
        position: [-20, 0, 24] as const,
        footprint: { length: 12, width: 7 },
        color: "#c3c4d3",
        description:
          "Consultar la secuencia de un lote: ingreso, despacho y entrega. Sin un registro verificado no se muestran cantidades, movimientos ni un hash ficticio.",
      },
    ] as const,
    flows: [
      {
        from: "needs",
        to: "reception",
        kind: "guidance",
        label: "Consultar necesidades",
        points: [
          [-12, 0, -20],
          [-8, 0, -20],
        ] as const,
      },
      {
        from: "reception",
        to: "sorting",
        kind: "accepted",
        label: "Ingreso a revisión",
        points: [
          [8, 0, -20],
          [12, 0, -20],
        ] as const,
      },
      {
        from: "sorting",
        to: "warehouse",
        kind: "accepted",
        label: "Insumos aceptados",
        points: [
          [16, 0, -7],
          [10, 0, -3],
          [0, 0, -3],
          [0, 0, 1],
        ] as const,
      },
      {
        from: "sorting",
        to: "rejection",
        kind: "rejected",
        label: "Vencido o inservible",
        points: [
          [24, 0, -7],
          [24, 0, 2],
        ] as const,
      },
      {
        from: "warehouse",
        to: "dispatch",
        kind: "accepted",
        label: "Preparar salida",
        points: [
          [-10, 0, 10],
          [-13, 0, 10],
        ] as const,
      },
      {
        from: "dispatch",
        to: "traceability",
        kind: "record",
        label: "Registrar movimiento",
        points: [
          [-20, 0, 17],
          [-20, 0, 19.5],
        ] as const,
      },
    ],
    categories: [
      "Alimentos",
      "Agua · uso no potable",
      "Aseo",
      "Abrigo",
      "Kits",
    ],
    categoryCenters: [
      [-4, 0, -4],
      [0, 0, -4],
      [4, 0, -4],
      [-2, 0, 3],
      [2, 0, 3],
    ] as const,
    shelfCenters: [
      [-5, 0, 0],
      [0, 0, 0],
      [5, 0, 0],
    ] as const,
    fixtures: {
      floorThickness: 0.07,
      labelHeight: 3.4,
      labelEdgeOffset: 1.5,
      board: {
        size: [5, 2.5, 0.16] as const,
        centerHeight: 2.8,
        postThickness: 0.12,
      },
      table: { size: [5, 0.14, 2] as const, height: 1.1, postThickness: 0.12 },
      bin: { size: [2, 1, 2] as const, wallThickness: 0.1 },
      shelf: {
        width: 3.2,
        depth: 6,
        height: 3.2,
        postThickness: 0.1,
        boardThickness: 0.1,
        levels: [0.2, 1.5, 3] as const,
      },
      pallet: {
        size: [4, 0.2, 3] as const,
        centers: [
          [-3, 0, 0],
          [3, 0, 0],
        ] as const,
      },
      screen: {
        size: [4, 2.2, 0.14] as const,
        centerHeight: 2.6,
        standThickness: 0.14,
      },
    },
    arrows: {
      width: 0.42,
      height: 0.12,
      headLength: 1.3,
      headWidth: 1.1,
      spacing: 16,
    },
    route: {
      width: 2.4,
      height: 0.09,
      color: "#b17a32",
      points: [
        [
          site.venues.baseball.position.value[0] - 20,
          0,
          site.venues.baseball.position.value[2] + 10,
        ],
        [135, 0, 50],
        [135, 0, -32],
        [45, 0, -32],
        [45, 0, -14],
        [
          refugeLayout.value.registration.position[0],
          0,
          refugeLayout.value.registration.position[2] + 3,
        ],
      ] as const,
      label: "Conexión conceptual · despacho → acceso al refugio",
      note: "Trazado ilustrativo, no ruta vial ni de evacuación. Accesos, obstáculos y circulación por verificar en sitio.",
      labelPosition: [135, 8, 5] as const,
      entranceLabelPosition: [35, 5, -25] as const,
    },
    requiredSupplies: [
      {
        label: "Kits de refugio",
        quantity: emergencyCalculation.value.kitsRequired,
        unit: "kits",
      },
      {
        label: "Baños portátiles",
        quantity: emergencyCalculation.value.toiletsRequired,
        unit: "unidades",
      },
      {
        label: "Uso no potable",
        quantity: emergencyCalculation.value.nonPotableLitersPerDay,
        unit: "L/día",
      },
    ],
    traceability: {
      status: "Sin registro verificado",
      fields: [
        "Lote",
        "Tipo de insumo",
        "Cantidad",
        "Origen",
        "Destino",
        "Hash",
      ],
      record: null,
      note: "Estructura preparada para un lote real. Sin inventario, entregas, transacciones ni conexión a blockchain confirmados.",
    },
    legend:
      "Sectores, mobiliario y circulación ilustrativos · dimensiones reales del diamante POR MEDIR",
  },
  "ilustrativo",
  sources.prompt,
  "Flujo según la propuesta del equipo. El descarte es un ramal separado. AGENTS.md limita la simulación a IoT y ocupación: la trazabilidad se deja sin datos hasta contar con evidencia verificable.",
);

export type StorageSectorId =
  (typeof storageLayout.value.sectors)[number]["id"];

export type SceneState = "everyday" | "emergency" | "recovery";
export const lifecycle = evidence(
  {
    durationSeconds: 2.4,
    collapseFraction: 0.35,
    packedScale: [0.22, 0.12, 0.22] as const,
    states: [
      {
        id: "everyday",
        label: "Uso cotidiano",
        description:
          "Los ocho kits se reutilizan como stands de feria en el campo. Los tanques ilustran riego de zonas verdes con agua de uso no potable; el acopio queda vacío.",
      },
      {
        id: "emergency",
        label: "Emergencia (sismo)",
        description:
          "Cinco kits interiores y tres exteriores, servicios propuestos y circuito de acopio. La activación requiere decisión de la autoridad e inspecciones; esta vista no las acredita.",
      },
      {
        id: "recovery",
        label: "Recuperación",
        description:
          "Los kits se compactan y regresan a la bodega ilustrativa. Campo y coliseo quedan sin equipamiento temporal. El retorno requiere revisión, limpieza y acta; aquí no se certifica su cumplimiento.",
      },
    ] as const,
    everydayCenters: Array.from(
      { length: kitsRequired },
      (_, i) => [-30 + (i % 4) * 20, 0.24, i < 4 ? -13 : 13] as const,
    ),
    recoveryCenters: Array.from(
      { length: kitsRequired },
      (_, i) =>
        [
          site.venues.baseball.position.value[0] - 6 + (i % 4) * 4,
          0.24,
          site.venues.baseball.position.value[2] + 7 + Math.floor(i / 4) * 6,
        ] as const,
    ),
    greenPatch: {
      position: [123, 0.18, -112] as const,
      size: [8, 0.12, 12] as const,
    },
    hoseWidth: 0.12,
    overviewCamera: {
      position: [120, 170, 195] as const,
      target: [90, 0, -25] as const,
    },
    labelPosition: [-5, 8, -20] as const,
    recoveryLabelPosition: [173, 8, 39] as const,
  },
  "ilustrativo",
  "PROMPT_CODEX_3D.md — sección 4; docs/propuesta_cali_activa.md — Fase 4 y uso cotidiano",
  "Animación conceptual de reutilización, no movimiento real de inventario ni ruta logística validada.",
);
