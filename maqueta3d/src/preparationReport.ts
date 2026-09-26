import type { Space, Manifest } from "./types";
import type { ScenarioThreat, gaps, eligibility, compareCandidates } from "./planning";
import type { acopioCapacity } from "./calculateAcopioCapacity";
import type { firePreparation } from "./fire";
import { planningRules, site } from "./data/site.ts";

export interface PreparationReport {
  generatedAt: string;
  origin: Space["properties"];
  target: Space["properties"];
  scope: string;
  threat: ScenarioThreat;
  people: number;
  decision: ReturnType<typeof eligibility>;
  comparison: ReturnType<typeof compareCandidates>;
  gaps: (ReturnType<typeof gaps>[number] & { followup: string })[];
  acopio: ReturnType<typeof acopioCapacity> & { includedInDraft: boolean };
  fire: (ReturnType<typeof firePreparation>[number] & { followup: string })[];
  fireLimitations: readonly string[];
  fireSources: { title: string; url: string }[];
  manifest: Manifest;
}
const escape = (value: unknown) => String(value ?? "Por confirmar").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const number = (value: number) => new Intl.NumberFormat("es-CO", { maximumFractionDigits: 2 }).format(value);
const measure = (value: number | null | undefined, unit = "") => value == null ? "Por confirmar" : `${number(value)} ${unit}`.trim();
const link = (url: string, label: string) => /^https?:\/\//i.test(url) ? `<a href="${escape(url)}" rel="noreferrer">${escape(label)}</a>` : escape(label);
const table = (headers: string[], rows: string[][]) => `<div class="table-wrap"><table class="columns-${headers.length}"><thead><tr>${headers.map(h => `<th scope="col">${escape(h)}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
const threats: Record<ScenarioThreat, string> = { flood: "Inundación", earthquake: "Sismo", drought: "Sequía", wildfire: "Incendio forestal", "building-fire": "Incendio en edificación" };

/** Documento autónomo: todos los datos variables se escapan antes de insertar HTML. */
export function preparationReport(report: PreparationReport) {
  const { target, comparison, acopio } = report;
  const peoplePerKit = site.equipment.kit.value.people;
  const kits = Math.ceil(report.people / peoplePerKit);
  const status = { conditional: "Candidato condicionado a revisión", excluded: "Espacio descartado en esta preselección", pending: "Sin evidencia suficiente para preseleccionar" }[report.decision.status];
  const acopioStatus = { fits: "Cumple el balance de área supuesto", overflow: "La propuesta no cabe", unknown: "Faltan datos para calcular", invalid: "Datos por corregir" }[acopio.status];
  const inputNames = { excluded: "Superficie excluida (m²)", circulation: "Circulación y accesos (m²)", attention: "Atención y espera (m²)", otherUses: "Otros usos (m²)", unitArea: "Área por módulo de acopio (m²)", units: "Módulos de acopio propuestos" };
  const metrics = report.gaps.map(r => `<article><strong>${escape(measure(r.required, r.unit))}</strong><span>${escape(r.label)}</span></article>`).join("");
  return `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Preparación · ${escape(target.name)} · Territorio Preparado</title>
<style>
*{box-sizing:border-box}body{margin:0;background:#eef2ed;color:#193e3b;font:15px/1.6 system-ui,sans-serif}main{max-width:1080px;margin:28px auto;padding:42px;background:white;border-radius:14px}h1{font-size:32px;line-height:1.2}h2{font-size:22px;margin-top:32px;border-bottom:2px solid #d8e0d7;padding-bottom:8px}h3{font-size:17px}p{margin:10px 0}a{color:#205c51;overflow-wrap:anywhere}.eyebrow{font-weight:700;font-size:12px;letter-spacing:1px}.notice{background:#f5f4df;padding:16px;border-left:4px solid #927028}.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:22px 0}.metrics article{padding:16px;background:#edf4ee;border-radius:8px}.metrics strong,.metrics span{display:block}.metrics strong{font-size:22px}.metrics span,small{font-size:13px}.table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;margin:14px 0}th,td{text-align:left;vertical-align:top;padding:10px;border:1px solid #d8e0d7;overflow-wrap:normal}th{background:#edf4ee;font-size:13px}td{font-size:13px}.columns-5{table-layout:fixed}.columns-5 th:nth-child(1){width:30%}.columns-5 th:nth-child(2){width:16%}.columns-5 th:nth-child(3){width:14%}.columns-5 th:nth-child(4){width:20%}.columns-5 th:nth-child(5){width:20%}.columns-3 th:first-child{width:22%}.columns-3 th:last-child{width:25%}tr{break-inside:avoid}button{padding:12px 20px;border:0;border-radius:6px;background:#205c51;color:white;font:inherit;cursor:pointer}button:focus-visible{outline:3px solid #b46320;outline-offset:3px}.toolbar{max-width:1080px;margin:20px auto;padding:0 16px}.muted{color:#526b65}li{margin:8px 0}footer{border-top:1px solid #d8e0d7;margin-top:30px;padding-top:15px;font-size:12px}
@media(max-width:700px){main{margin:0;padding:20px;border-radius:0}.metrics{grid-template-columns:repeat(2,1fr)}h1{font-size:26px}}
@page{size:A4;margin:15mm}@media print{body{background:white;font-size:10pt}main{margin:0;padding:0;max-width:none}.toolbar{display:none}h1{font-size:22pt}h2{font-size:15pt;break-after:avoid}.metrics{grid-template-columns:repeat(4,1fr)}.metrics strong{font-size:14pt}th,td{font-size:9pt;padding:6px}.table-wrap{overflow:visible}thead{display:table-header-group}a{color:inherit}.notice{border:1px solid #927028}}
</style></head><body>
<div class="toolbar"><button onclick="window.print()">Imprimir / guardar como PDF</button><p>En la ventana de impresión, elige «Guardar como PDF». Este informe también se puede leer sin conexión.</p></div>
<main><p class="eyebrow">TERRITORIO PREPARADO · BORRADOR DE PREPARACIÓN</p><h1>${escape(target.name)}</h1>
<p>Escenario: <strong>${escape(threats[report.threat])}</strong> · <strong>${number(report.people)} personas</strong> · Población SIMULADA</p>
<p class="muted">Generado: ${escape(new Date(report.generatedAt).toLocaleString("es-CO", { timeZone: "America/Bogota" }))} (hora de Colombia).</p>
<div class="notice"><strong>${escape(status)}</strong><p>${escape(report.decision.reason)}</p><p>Este documento organiza necesidades y tareas. La autoridad decide la activación; no constituye autorización ni certifica disponibilidad o seguridad.</p></div>
<h2>1. Resumen de necesidades</h2><div class="metrics">${metrics}<article><strong>${number(kits)} kits</strong><span>Estimación conceptual para ${peoplePerKit} personas por kit</span></article></div>
<p>Las cantidades corresponden a la población planteada. Los servicios existentes están por verificar: una necesidad total no equivale al faltante que se debe comprar. El número de kits no demuestra que quepan en este espacio.</p>
<h2>2. Ubicación y escenario</h2>
${table(["Dato", "Detalle"], [["Espacio e identificador", `${escape(target.name)} · ${escape(target.id)}`],["Comuna / barrio", `${escape(target.commune)} / ${escape(target.neighborhood)}`],["Coordenadas", `Latitud ${escape(target.coordinates[1])}; longitud ${escape(target.coordinates[0])}`],["Ubicación en mapa", link(`https://www.google.com/maps/search/?api=1&query=${target.coordinates[1]},${target.coordinates[0]}`, "Ver ubicación en Google Maps (requiere internet)")],["Referencia de cercanía", `${escape(report.origin.name)} · ${escape(report.origin.id)}`],["Sector comparado",escape(report.scope)],["Huella cartográfica", `${measure(acopio.cartographicAreaM2,"m²")}; no equivale a superficie útil ni cubierta.`]] )}
<h2>3. Servicios, faltantes y responsables</h2>
${table(["Servicio y criterio", "Necesidad total", "Existencia", "Faltante", "Responsable propuesto / seguimiento"], report.gaps.map(r => [`<strong>${escape(r.label)}</strong><p>${escape(r.rule)}</p>`,escape(measure(r.required,r.unit)),escape(measure(r.existing,r.unit)),r.missing == null ? "Por determinar: medir la existencia" : escape(measure(r.missing,r.unit)),`${escape(r.responsible)}<p>${escape(r.followup)}</p>`]))}
<p>Responsables propuestos por el equipo, pendientes de validación. El agua calculada cubre necesidades básicas; no es exclusivamente agua no potable ni caudal para extinción de incendios.</p>
<h2>4. Kit y equipamiento por preparar</h2>
<p><strong>${number(kits)} kits estimados</strong> = redondeo superior de ${number(report.people)} personas ÷ ${peoplePerKit}. Supuesto conceptual del proyecto; inventario, distribución y prestaciones por confirmar.</p>
${table(["Componente", "Necesidad planteada y pendiente", "Coordinación propuesta"], [
["Refugio, descanso y privacidad", "Preparar cubierta y divisiones; considerar camas y divisiones de cartón en interiores secos. Cantidades de camas, materiales y distribución por definir según la población y el espacio.", "Gestión del Riesgo y Bienestar Social"],
["Cisterna de lona", "Prever almacenamiento flexible de agua. Dimensionar número de depósitos y litros de almacenamiento según demanda diaria, autonomía y frecuencia de abastecimiento; no confundir litros/día con capacidad del tanque. Potabilidad por verificar.", "EMCALI y Salud Pública"],
["Panel solar portátil", "Prever energía para iluminación y comunicación. Cantidad de paneles, potencia, batería y autonomía por definir según las cargas.", "EMCALI y Gestión del Riesgo"],
["Saneamiento e higiene", "Confirmar baños existentes y resolver el faltante de la tabla anterior. Definir insumos de higiene, limpieza y gestión de residuos.", "UAESP y Salud Pública"],
["Salud y protección", "Prever punto de salud y espacio de protección de niñas, niños y adolescentes; definir personal, insumos, accesibilidad y distribución. Sin registrar información individual en este informe.", "Salud Pública, ICBF y Bienestar Social"],
["Alimentación, abrigo y logística", "Definir alimentos, colchonetas, cobijas, cantidades, duración de la atención, transporte, recepción y entrega de ayudas según necesidades verificadas.", "Gestión del Riesgo y Bienestar Social"],
].map(row=>row.map(escape)))}
<h2>5. Balance de superficie del acopio</h2><p><strong>${escape(acopioStatus)}</strong>. ${escape(acopio.reason)}</p>
<p>Inclusión en el borrador: <strong>${acopio.includedInDraft ? "Incluido como propuesta de acopio" : "No incluido"}</strong>. Activación no autorizada. Los módulos de acopio son distintos de los kits de atención a personas.</p>
${table(["Entrada del escenario SIMULADO", "Valor"], Object.entries(inputNames).map(([key,label])=>[escape(label),escape(acopio.inputs[key as keyof typeof inputNames].trim() || "Por confirmar")]))}
${"availableM2" in acopio ? table(["Resultado del cálculo", "Valor"], [["Superficie reservada",measure(acopio.reservedM2,"m²")],["Superficie disponible",measure(acopio.availableM2,"m²")],["Superficie solicitada",measure(acopio.requestedM2,"m²")],["Máximo de módulos por área",measure(acopio.maxUnits)],["Superficie que falta",measure(acopio.shortageM2,"m²")],["Superficie restante",measure(acopio.remainingM2,"m²")],["Módulos en exceso",measure(acopio.excessUnits)]]) : "<p>No hay un balance completo; revisar los datos pendientes o inválidos antes de dimensionar el acopio.</p>"}
<p>Huella menos exclusiones, circulación, atención y otros usos. Este balance SIMULADO no certifica aforo, encaje geométrico ni capacidad operacional.</p>
<h2>6. Espacios comparados y criterio</h2><p>${number(comparison.considered)} polígonos considerados; ${number(comparison.excluded)} descartados por cruce; ${number(comparison.pendingEvidence)} sin evidencia suficiente.</p>
${comparison.candidates.length ? table(["Candidato", "Distancia recta", "Condición"],comparison.candidates.map(c=>[`${escape(c.space.properties.name)} · ${escape(c.space.properties.id)}`,`${number(Math.round(c.distanceM))} m`,escape(c.reason)])) : "<p>No hay candidatos para esta amenaza en el sector. No se sustituyen por espacios descartados.</p>"}
<p>Ordenados por distancia recta al punto de referencia; empate por identificador. No se evalúan rutas, capacidad ni disponibilidad. La población modifica las necesidades, no el orden de candidatos.</p>
${report.fire.length ? `<h2>7. Revisión específica ante incendio</h2>${table(["Información requerida", "Pendiente", "Seguimiento"],report.fire.map(r=>[escape(r.label),`${escape(r.detail)}<p>${escape(r.status)}</p>`,escape(r.followup)]))}<ul>${report.fireLimitations.map(l=>`<li>${escape(l)}</li>`).join("")}</ul>` : ""}
<h2>${report.fire.length ? "8" : "7"}. Tareas antes de presentar la propuesta</h2><ul>
<li>Confirmar administración, disponibilidad y autorización de uso del espacio con Gestión del Riesgo.</li>
<li>Revisar amenaza, evaluación estructural, seguridad, accesibilidad, entradas y evacuación con las entidades competentes.</li>
<li>Medir servicios existentes para convertir las necesidades totales en faltantes reales; completar cantidades y especificaciones del kit.</li>
<li>Comprobar en campo la distribución de refugio, acopio, atención y circulación.</li>
<li>Definir duración, abastecimiento, transporte, presupuesto, responsables y seguimiento de entrega.</li>
<li>Confirmar apertura, acceso y horario antes de difundir avisos. El SMS del prototipo es simulado.</li>
<li>Preparar desmontaje, limpieza, revisión y acta de retorno al uso cotidiano.</li></ul>
<h2>${report.fire.length ? "9" : "8"}. Fuentes y alcance</h2><p>${escape(report.manifest.attribution)}. Corte de datos: ${escape(report.manifest.snapshotDate)}.</p><ul>${report.manifest.sources.map(s=>`<li>${link(s.page,s.name)} · ${escape(s.license)}</li>`).join("")}<li>${link(planningRules.sphereSource,"Manual Esfera 2018: referencias de agua, saneamiento y superficie cubierta")}</li>${report.fireSources.map(s=>`<li>${link(s.url,s.title)}</li>`).join("")}</ul>
<p>Reglas: personas ÷ ${planningRules.peoplePerToilet} para baños (redondeo superior); personas × ${planningRules.litersPerPersonDay} L/día; personas × ${number(planningRules.coveredM2PerPerson)} m² cubiertos. Referencias a contextualizar, no certificación de cumplimiento.</p>
<ul>${report.manifest.limitations.map(l=>`<li>${escape(l)}</li>`).join("")}</ul>
<footer>Territorio Preparado · Escenario SIMULADO · Seguimiento local, sin validación con entidades. No sustituye evaluaciones estructurales ni competencias de Bomberos. Sin datos personales ni reconocimiento facial.</footer>
</main></body></html>`;
}
