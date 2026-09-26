import { acopioCapacity, type AcopioInputs } from "./calculateAcopioCapacity";
import { formatNumber as fmt } from "./types";
const fields: [keyof AcopioInputs, string][] = [
  ["excluded", "Área no utilizable (m²)"],
  ["circulation", "Circulación, accesos y evacuación (m²)"],
  ["attention", "Atención, entrega y espera (m²)"],
  ["otherUses", "Otros usos y ocupación existente (m²)"],
  ["unitArea", "Huella por módulo de almacenamiento (m²)"],
  ["units", "Módulos de almacenamiento propuestos"],
];
export default function AcopioCapacity({
  area,
  inputs,
  included,
  blocked,
  onChange,
  onInclude,
}: {
  area: number | null;
  inputs: AcopioInputs;
  included: boolean;
  blocked: boolean;
  onChange: (inputs: AcopioInputs) => void;
  onInclude: () => void;
}) {
  const result = acopioCapacity(area, inputs);
  return (
    <section
      className="acopio-capacity"
      aria-labelledby="acopio-capacity-title"
    >
      <span className="simulation-badge">
        PLANIFICACIÓN SIMULADA · medidas por verificar
      </span>
      <h3 id="acopio-capacity-title">¿Cuánto acopio cabe en este espacio?</h3>
      <p>
        Partimos de la huella cartográfica del lugar:{" "}
        <strong>{area === null ? "sin polígono" : fmt(area) + " m²"}</strong>.
        El cálculo se adapta al espacio seleccionado; no supone que todo el
        parque esté libre.
      </p>
      <p>
        Descuenta superficies separadas, sin contarlas dos veces. Incluye
        árboles, pendientes, mobiliario o zonas restringidas en el área no
        utilizable. Reserva circulación y atención al público antes de proponer
        almacenamiento.
      </p>
      <div className="planning-controls">
        {fields.map(([key, label]) => (
          <label key={key}>
            {label}
            <input
              type="number"
              min={key === "units" ? 1 : 0}
              step={key === "units" ? 1 : "any"}
              value={inputs[key]}
              placeholder="Por medir"
              onChange={(e) => onChange({ ...inputs, [key]: e.target.value })}
            />
          </label>
        ))}
      </div>
      <p className="small-note">
        Un módulo es una unidad de almacenamiento definida por ti (por ejemplo,
        una estantería o un conjunto de ayudas). Usa su huella completa en
        planta. No se presume apilamiento ni capacidad en toneladas. No hay
        valores normativos prellenados.
      </p>
      <p>
        <strong>Regla:</strong> área para almacenamiento = huella − área no
        utilizable − circulación − atención − otros usos. Máximo teórico de
        módulos = parte entera del área restante / huella por módulo.
      </p>
      <div
        role="status"
        className={
          result.status === "overflow" ? "notice capacity-overflow" : "notice"
        }
      >
        <strong>
          {result.status === "overflow"
            ? "Sobreocupación propuesta"
            : result.status === "fits"
              ? "Balance de área suficiente — condicionado"
              : "Capacidad pendiente"}
        </strong>
        <p>{result.reason}</p>
        {"maxUnits" in result && (
          <>
            <p>
              Reservado/descontado: {fmt(result.reservedM2)} m² · Disponible
              para almacenamiento: {fmt(result.availableM2)} m².
            </p>
            <p>
              Almacenamiento solicitado: {fmt(result.requestedM2)} m² · Máximo
              teórico: {fmt(result.maxUnits)} módulos.
            </p>
            <p>
              {result.status === "overflow"
                ? "Exceso de superficie: " +
                  fmt(result.shortageM2) +
                  " m² · Módulos excedentes: " +
                  fmt(result.excessUnits)
                : "Superficie restante: " + fmt(result.remainingM2) + " m²."}
            </p>
          </>
        )}
      </div>
      <p>
        No es un aforo de personas ni demuestra que los módulos encajen en un
        polígono irregular. El área de espera necesita su propia evaluación; la
        población del escenario no equivale a asistentes simultáneos. Forma,
        accesibilidad, suelo, carga, protección de ayudas y evacuación siguen
        por verificar.
      </p>
      {blocked && (
        <p>
          No se puede incluir la distribución con la restricción o falta de
          evidencia de la amenaza seleccionada.
        </p>
      )}
      <button
        disabled={result.status !== "fits" || blocked || included}
        onClick={onInclude}
      >
        {included
          ? "Distribución incluida en el borrador"
          : "Incluir distribución de acopio en el borrador"}
      </button>
      <p className="small-note">
        Cambiar medidas, espacio o amenaza invalida la inclusión anterior. Esto
        no activa el punto ni confirma su apertura. Solo se usan superficies y
        conteos agregados, sin datos personales.
      </p>
    </section>
  );
}
