/** Requisitos de información propuestos por el equipo; no son un protocolo de Bomberos. */
export type FireThreat = "wildfire" | "building-fire";
export const isFire = (threat: string): threat is FireThreat =>
  threat === "wildfire" || threat === "building-fire";
export const fireSources = [
  {
    title: "Alcaldía de Cali · atención de emergencias",
    url: "https://www.cali.gov.co/gestiondelriesgo/publicaciones/140522/recomendaciones-en-caso-de-emergencias/",
  },
  {
    title: "Alcaldía de Cali · atención de incendio forestal en Pichindé",
    url: "https://www.cali.gov.co/gestiondelriesgo/publicaciones/184412/por-inconsciencia-ciudadana-nuevamente-se-presenta-incendio-forestal-en-pichinde/",
  },
];
const common = [
  {
    id: "perimeter",
    label: "Área afectada y restricciones",
    detail:
      "Falta geometría del incidente con fuente, fecha y restricciones emitidas por la autoridad. La ubicación del espacio seleccionado no es el foco del incendio.",
  },
  {
    id: "access",
    label: "Acceso y evacuación",
    detail:
      "Faltan accesos utilizables y restricciones de circulación verificadas. Google Maps ubica el espacio; no certifica una ruta segura.",
  },
];
export function firePreparation(threat: FireThreat) {
  const specific =
    threat === "wildfire"
      ? [
          {
            id: "vegetation",
            label: "Amenaza e interfaz con vegetación",
            detail:
              "Falta cartografía verificada de amenaza forestal, cobertura y fecha de actualización. Un parque no se considera seguro por estar abierto.",
          },
          {
            id: "smoke",
            label: "Humo y condiciones del entorno",
            detail:
              "Falta información vigente de humo, viento y restricciones aplicables. No se calcula dispersión ni se inventa una distancia segura.",
          },
        ]
      : [
          {
            id: "building",
            label: "Edificación afectada y entorno",
            detail:
              "Falta identificar el edificio afectado, su perímetro de restricción y posibles afectaciones a predios vecinos. El polígono del espacio público no sustituye esta información.",
          },
          {
            id: "inspection",
            label: "Inspecciones y condiciones para el uso",
            detail:
              "Sin evidencia de evaluación estructural, condiciones de seguridad humana ni autorización de uso. La aplicación no emite conceptos ni permite dar estos requisitos por cumplidos.",
          },
        ];
  return [...common, ...specific].map((item) => ({
    ...item,
    evidence: null,
    status: "Sin evidencia incorporada",
  }));
}
export const fireLimitations = [
  "Sin capa de amenaza por incendio verificada ni información vigente del incidente incorporadas.",
  "No simula propagación, humo, temperatura, daños, resistencia al fuego ni tiempos de evacuación.",
  "Las necesidades de agua calculadas son para la población: no son caudal de extinción. Los tanques de la maqueta no constituyen una red contra incendios.",
  "No certifica materiales de las carpas, disponibilidad ni condiciones de seguridad. La autoridad decide; no sustituye a Bomberos ni evaluaciones estructurales.",
];
