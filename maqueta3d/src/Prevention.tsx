import { brand } from "./brand";
import { useState } from "react";

const guides = [
  {
    name: "Inundación",
    before:
      "Consulta con las autoridades las acciones de preparación de tu zona y organiza la ayuda mutua en tu comunidad.",
    during:
      "Atiende las órdenes de evacuación. No cruces ríos ni zonas inundadas: el agua puede ocultar daños y peligros.",
    after:
      "Consulta las indicaciones oficiales antes de desplazarte o regresar. La ubicación de un parque no demuestra que sus accesos estén transitables.",
    source:
      "https://repositorio.gestiondelriesgo.gov.co/bitstream/handle/20.500.11762/32902/BoletinInundaciones.pdf?isAllowed=y&sequence=33",
  },
  {
    name: "Sismo",
    before:
      "Acuerda un punto de encuentro familiar e identifica zonas de protección. Asegura muebles y objetos pesados que puedan caer.",
    during:
      "Agáchate, cúbrete y sujétate. Mantente atento a la información de las autoridades competentes.",
    after:
      "Mantente atento a las réplicas. El regreso requiere revisar las condiciones de la vivienda; esta aplicación no realiza esa evaluación.",
    source:
      "https://portal.gestiondelriesgo.gov.co/paginas/old_noticias/2122.aspx",
  },
  {
    name: "Incendio forestal",
    before:
      "Evita quemar basura o vegetación y arrojar elementos inflamables. Conoce los números locales de emergencia.",
    during:
      "Avisa oportunamente a las autoridades y sigue sus instrucciones. Permanece en una zona segura; no te acerques al fuego.",
    after:
      "Espera las indicaciones de las autoridades. Colabora en la recuperación de las zonas afectadas cuando corresponda.",
    source:
      "https://portal.gestiondelriesgo.gov.co/Paginas/recomendaciones-incendios-forestales.aspx",
  },
];
const checks = [
  "Sé dónde consultar información oficial y verificar la fecha del aviso.",
  "He conversado con mi hogar sobre el punto de encuentro y la ayuda mutua.",
  "Distingo un punto de acopio de un alojamiento temporal.",
  "Antes de compartir un aviso, revisaré su fuente, ubicación y estado de apertura.",
];

export default function Prevention({ onMap }: { onMap: () => void }) {
  const [hazard, setHazard] = useState(0);
  const [checked, setChecked] = useState<string[]>([]);
  const [answer, setAnswer] = useState("");
  const guide = guides[hazard];
  return (
    <section className="prevention" aria-labelledby="prevention-title">
      <div className="prevention-intro">
        <p className="eyebrow">PREPARARSE · COMUNICAR · CUIDAR</p>
        <h2 id="prevention-title">Análisis preventivo y cultura ciudadana</h2>
        <p>Una ciudad preparada también sabe cómo actuar y cómo ayudar.</p>
        <p>
          Aprende qué revisar antes de una emergencia, cómo seguir las
          indicaciones oficiales y cómo encontrar información sobre los lugares
          de atención.
        </p>
      </div>
      <label className="prevention-selector">
        Amenaza para aprender
        <select
          value={hazard}
          onChange={(e) => setHazard(Number(e.target.value))}
        >
          {guides.map((g, i) => (
            <option key={g.name} value={i}>
              {g.name}
            </option>
          ))}
        </select>
      </label>
      <div className="prevention-grid">
        {[
          ["Antes · prepárate", guide.before],
          ["Durante · protégete", guide.during],
          ["Después · verifica", guide.after],
        ].map(([title, body]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <p className="small-note">
        Orientación educativa basada en{" "}
        <a href={guide.source} target="_blank" rel="noreferrer">
          recomendaciones de la UNGRD para {guide.name.toLowerCase()}
        </a>
        . No es una alerta vigente ni una orden de evacuación.
      </p>
      <section className="prevention-destination">
        <h3>¿A dónde dirigirme?</h3>
        <p>
          Consulta el destino y las instrucciones comunicadas por la autoridad
          para tu situación. Este inventario no tiene puntos abiertos
          confirmados.
        </p>
        <ol>
          <li>
            <strong>Confirma el propósito:</strong> encuentro para reunirse;
            acopio para recibir o distribuir ayudas; alojamiento temporal para
            hospedaje de emergencia.
          </li>
          <li>
            <strong>Revisa el aviso:</strong> emisor oficial, fecha, apertura,
            horario y condiciones de atención.
          </li>
          <li>
            <strong>Confirma el acceso:</strong> sigue las instrucciones
            oficiales. Google Maps ubica el lugar, pero no verifica una ruta
            segura durante la emergencia.
          </li>
        </ol>
        <button onClick={onMap}>Consultar espacios en el mapa</button>
        <p>
          <a
            href="https://www.cali.gov.co/gestiondelriesgo/"
            target="_blank"
            rel="noreferrer"
          >
            Consultar Gestión del Riesgo de Cali
          </a>
        </p>
      </section>
      <div className="prevention-grid">
        <section className="prevention-card">
          <h3>Mi preparación empieza hoy</h3>
          <p>
            Lista personal de aprendizaje; no certifica que estés a salvo. No se
            guarda ni solicita información personal.
          </p>
          {checks.map((item) => (
            <label className="prevention-check" key={item}>
              <input
                type="checkbox"
                checked={checked.includes(item)}
                onChange={(e) =>
                  setChecked((prev) =>
                    e.target.checked
                      ? [...prev, item]
                      : prev.filter((v) => v !== item),
                  )
                }
              />
              {item}
            </label>
          ))}
          <p role="status">
            {checked.length} de {checks.length} pasos revisados.
          </p>
        </section>
        <section className="prevention-card">
          <h3>Ponlo en práctica</h3>
          <p>
            Un parque aparece en el mapa. ¿Eso significa que ya puedo acudir
            allí a recibir ayudas?
          </p>
          <button
            aria-pressed={answer === "yes"}
            onClick={() => setAnswer("yes")}
          >
            Sí, porque aparece en el mapa
          </button>
          <button
            aria-pressed={answer === "no"}
            onClick={() => setAnswer("no")}
          >
            No, debo confirmar su apertura
          </button>
          <p role="status">
            {answer &&
              (answer === "no" ? "Correcto. " : "Revisa esta diferencia: ") +
                "El mapa muestra espacios existentes. La autoridad confirma cuáles están habilitados, para qué servicio y con qué condiciones de acceso."}
          </p>
        </section>
      </div>
      <p className="small-note">
        {brand.name} orienta y muestra criterios; la activación corresponde a la
        autoridad. No sustituye evaluaciones estructurales ni las competencias
        de Bomberos. Para incendios en edificaciones y otras amenazas, consulta
        las instrucciones específicas de los organismos de respuesta.
      </p>
    </section>
  );
}
