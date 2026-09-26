const components = [
  {
    title: "Descanso y privacidad",
    image: "refugios-carton.jpg",
    alt: "Referencia de camas y divisiones de cartón organizadas dentro de un recinto cubierto",
    description: "Camas y divisiones de cartón como parte propuesta del kit para organizar el descanso y dar privacidad en espacios cubiertos y secos.",
    detail: "El material, la resistencia y las condiciones de uso se definen antes de su implementación.",
  },
  {
    title: "Cisterna de lona",
    image: "cisterna-lona.webp",
    alt: "Cisterna flexible azul de lona apoyada sobre una superficie protegida",
    description: "Depósito flexible como parte del kit para almacenar agua y apoyar el abastecimiento temporal del refugio.",
    detail: "La capacidad, el tipo de agua y las conexiones quedan por definir. La imagen no acredita potabilidad.",
  },
  {
    title: "Panel solar portátil",
    image: "panel-solar.jpeg",
    alt: "Panel solar plegable con estuches para transportarlo",
    description: "Panel plegable como parte del kit de energía, pensado para apoyar la iluminación y la carga de equipos de comunicación.",
    detail: "La potencia, la batería y la autonomía se dimensionan según los equipos que se conecten.",
  },
];

export default function Kit() {
  return (
    <section className="kit-panel" aria-labelledby="kit-title">
      <p className="eyebrow">KIT CALI ACTIVA · PROPUESTA CONCEPTUAL</p>
      <h2 id="kit-title">Un kit para descansar, almacenar agua y tener energía</h2>
      <p className="kit-intro">Estas tres piezas forman parte del kit propuesto de Territorio Preparado. Se combinan con la cubierta, el saneamiento y los demás insumos según las necesidades del espacio.</p>
      <div className="kit-grid">
        {components.map((component, index) => (
          <figure className="kit-card" key={component.title}>
            <a href={`${import.meta.env.BASE_URL}images/kit/${component.image}`} target="_blank" rel="noreferrer" aria-label={`Abrir imagen completa: ${component.title}`}>
              <img src={`${import.meta.env.BASE_URL}images/kit/${component.image}`} alt={component.alt} />
            </a>
            <figcaption>
              <span className="eyebrow">PIEZA 0{index + 1}</span>
              <h3>{component.title}</h3>
              <p>{component.description}</p>
              <p className="kit-detail">{component.detail}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="kit-source">Referencias visuales aportadas por el equipo. Ilustran la idea del kit; las especificaciones y cantidades están por definir. La referencia de cartón conserva el crédito visible @MECATRÓNICA.</p>
    </section>
  );
}
