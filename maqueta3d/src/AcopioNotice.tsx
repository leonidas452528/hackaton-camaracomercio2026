import { useState } from "react";
import type { Space } from "./types";
import SmsChannel from "./SmsChannel";
import { acopioNotice } from "./buildAcopioNotice";
export default function AcopioNotice({ space }: { space: Space }) {
  const [hours, setHours] = useState("");
  const [items, setItems] = useState("");
  const [message, setMessage] = useState("");
  const notice = acopioNotice(space, hours, items);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(notice.text);
      setMessage("Borrador copiado. No se ha enviado ningún SMS.");
    } catch {
      setMessage(
        "No se pudo copiar. Selecciona el texto del borrador o descarga el aviso.",
      );
    }
  };
  const download = () => {
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(notice, null, 2)], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `aviso-acopio-${space.properties.id}.json`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setMessage("Borrador descargado. No se ha enviado ningún SMS.");
  };
  return (
    <details className="acopio-notice">
      <summary>Preparar aviso SMS de acopio</summary>
      <h3>Avisar dónde llevar o recoger ayudas</h3>
      <p>
        Espacio propuesto: <strong>{space.properties.name}</strong> ·{" "}
        {space.properties.id}. La selección no confirma que funcione como punto
        de acopio.
      </p>
      <p>
        Flujo previsto: definir el punto → confirmar apertura, horario y acceso
        → revisar el mensaje → difundir a la población por el canal habilitado.
        En esta demo puedes recorrer el envío con una simulación, sin
        comunicaciones reales.
      </p>
      <div className="planning-controls">
        <p>
          <strong>Destinatarios: toda la población.</strong> Información pública
          para quienes puedan aportar, quienes necesiten ayudas y quienes
          quieran mantenerse informados; sin registrar quién es damnificado.
        </p>
        <label>
          Horario propuesto
          <input
            value={hours}
            maxLength={100}
            placeholder="Pendiente de definir"
            onChange={(e) => {
              setHours(e.target.value);
              setMessage("");
            }}
          />
        </label>
      </div>
      <label>
        Información propuesta sobre recepción y entrega de ayudas
        <input
          value={items}
          maxLength={240}
          placeholder="Pendiente de definir"
          onChange={(e) => {
            setItems(e.target.value);
            setMessage("");
          }}
        />
      </label>
      <p className="small-note">
        Escribe solo información operativa propuesta, sin nombres, teléfonos ni
        datos de personas. Los campos no confirman existencias ni se guardan al
        cambiar de espacio.
      </p>
      <label htmlFor="acopio-notice-body">Borrador del mensaje</label>
      <textarea
        id="acopio-notice-body"
        readOnly
        value={notice.text}
        rows={10}
      />
      <div className="notice-actions">
        <button onClick={copy}>Copiar borrador SMS</button>
        <button onClick={download}>Descargar aviso de acopio</button>
      </div>
      <p role="status">{message || "Borrador sin enviar."}</p>
      <SmsChannel key={notice.text} notice={notice} />
      <p>
        Los mensajes pueden ocupar varios SMS según su longitud y codificación;
        el costo y la entrega dependerán del proveedor. El enlace ubica el punto
        en Google Maps, no certifica una ruta segura.
      </p>
    </details>
  );
}
