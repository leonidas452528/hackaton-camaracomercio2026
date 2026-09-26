# Territorio Preparado

**Espacios y ayudas coordinados ante emergencias.**

Proyecto para la **Hackathon Smart City Expo Cali 2026**, **RETO-01 Cali Activa: espacios públicos que se transforman para cuidar** (Alcaldía de Santiago de Cali).

**Equipo:** William Ortiz · Herlin Echeverry · Pablo Arango · Daniel Celis

## El problema
Tras el sismo de magnitud 7,4 del 10 de agosto de 2026, Cali tuvo que convertir canchas y coliseos en albergues sin saber si estaban preparados ni qué entidad respondía por cada servicio. Además, aparecieron albergues **autogestionados** por la comunidad, y uno de ellos está en la zona inundable del Jarillón del río Cauca. Con El Niño alcanzando su pico en noviembre, el agua también se vuelve una restricción.

## La propuesta
Un plan de contingencia **multiamenaza** (sismo, inundación y sequía) que organiza el **antes, el durante y el después** de cada espacio público:
- **Antes:** ficha de aptitud por espacio y por amenaza, umbrales de alerta y matriz de responsables.
- **Durante:** recomendación explicable de espacios (la decisión la toma la autoridad), brechas según Esfera asignadas a su entidad y seguimiento.
- **Después:** checklist de retorno y acta de entrega del espacio a su uso normal.

## Documentación
- **Propuesta completa para presentar:** [Word editable](entregables/propuesta-completa/Territorio_Preparado_Propuesta_Completa.docx) · [PDF](entregables/propuesta-completa/Territorio_Preparado_Propuesta_Completa.pdf).
- **Idea principal y alcance real:** [qué hace hoy Territorio Preparado](docs/PROPUESTA_REAL.md).
- **Publicación:** [comandos para subir las actualizaciones a GitHub](docs/SUBIR_A_GITHUB.md).
- **Presentación del pitch:** [PowerPoint editable](entregables/presentacion-ampliada/Presentacion_Ampliada.pptx) · [PDF](entregables/presentacion-ampliada/Presentacion_Ampliada.pdf) · [Guion](entregables/presentacion-ampliada/Guion_del_pitch.md)
- [Bitácora completa (MD)](docs/PROYECTO.md) · [PDF](docs/PROYECTO.pdf)
- [Instrucciones para asistentes de IA](AGENTS.md)

> El prototipo usa **datos reales y públicos de Cali**: espacio público del DAPM/IDESC, amenazas del POT y daños satelitales del sismo del 10 de agosto de 2026 (Copernicus EMSR916, SERTIT). Ver [docs/DATASETS.md](docs/DATASETS.md). El IoT, los escenarios de ocupación, los supuestos de acopio y la difusión SMS de demostración se identifican como SIMULADOS. No contiene datos personales. Cumple la Ley 1581 de 2012 y las líneas rojas del reto.

## Mapa territorial y maqueta 3D

El [explorador territorial](maqueta3d/README.md) permite consultar los inventarios reales de IDESC por comuna y barrio, sus cruces con amenazas y los datos que faltan para confirmar disponibilidad. Incluye la escena 3D general del sitio piloto.

```bash
cd maqueta3d
npm ci
npm run dev
```

Abrir http://localhost:5173. Los espacios inventariados **no son alojamientos disponibles o autorizados**.
