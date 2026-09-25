import { useEffect, useState } from "react";
import type { acopioNotice } from "./buildAcopioNotice";

export default function SmsChannel({
  notice,
}: {
  notice: ReturnType<typeof acopioNotice>;
}) {
  const [count, setCount] = useState("1000");
  const [scenario, setScenario] = useState("partial");
  const [stage, setStage] = useState<"ready" | "sending" | "done">("ready");
  const total = Number(count);
  const valid = Number.isInteger(total) && total >= 1 && total <= 100000;
  const pending = scenario === "partial" ? Math.ceil(total * 0.05) : 0;
  useEffect(() => {
    if (stage !== "sending") return;
    const timer = window.setTimeout(() => setStage("done"), 1000);
    return () => window.clearTimeout(timer);
  }, [stage]);
  return (
    <section className="sms-channel" aria-labelledby="sms-title">
      <span className="simulation-badge">SIMULADO · sin envíos reales</span>
      <h3 id="sms-title">Canal de difusión masiva SMS</h3>
      <p>
        Aviso para toda la población. Esta demo representa una audiencia
        ficticia; no mide cobertura de Cali ni usa teléfonos o un proveedor.
      </p>
      <div className="planning-controls">
        <label>
          Destinatarios simulados
          <input
            type="number"
            min="1"
            max="100000"
            step="1"
            value={count}
            disabled={stage === "sending"}
            onChange={(e) => {
              setCount(e.target.value);
              setStage("ready");
            }}
          />
        </label>
        <label>
          Escenario de entrega simulado
          <select
            value={scenario}
            disabled={stage === "sending"}
            onChange={(e) => {
              setScenario(e.target.value);
              setStage("ready");
            }}
          >
            <option value="partial">
              5 % pendientes (ejemplo ilustrativo)
            </option>
            <option value="complete">
              Entrega completa (ejemplo ilustrativo)
            </option>
          </select>
        </label>
      </div>
      {!valid && (
        <p role="alert">Escribe un número entero entre 1 y 100.000.</p>
      )}
      <div className="sms-review">
        <strong>Vista previa en el celular · SIMULADA</strong>
        <pre>
          SIMULADO — no es un aviso real.{"\n"}
          {notice.text}
        </pre>
      </div>
      <button
        disabled={!valid || stage === "sending" || stage === "done"}
        onClick={() => setStage("sending")}
      >
        {stage === "sending"
          ? "Simulando envío…"
          : stage === "done"
            ? "Simulación finalizada"
            : "Simular envío masivo"}
      </button>
      {stage === "done" && (
        <button onClick={() => setStage("ready")}>Reiniciar simulación</button>
      )}
      <div role="status" aria-live="polite">
        {stage === "ready" && (
          <p>
            Listo para demostrar: revisar mensaje → simular envío → revisar
            resultados.
          </p>
        )}
        {stage === "sending" && (
          <p>SIMULADO: procesando la audiencia ficticia…</p>
        )}
        {stage === "done" && (
          <div className="sms-results">
            <h4>Resultado SIMULADO</h4>
            <p>
              {total} destinatarios ficticios · {total - pending} entregas
              simuladas · {pending} pendientes simulados.
            </p>
            <p>
              Envíos reales: 0. Los resultados siguen el escenario elegido; no
              son confirmaciones del operador ni indican que alguien haya leído
              el aviso.
            </p>
            {pending > 0 && (
              <p>
                En una operación real habría que revisar las entregas pendientes
                y complementar la comunicación por otros canales oficiales.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
