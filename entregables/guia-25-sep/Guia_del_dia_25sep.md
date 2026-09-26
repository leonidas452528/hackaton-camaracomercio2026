# Territorio Preparado: guía de todo lo que se hizo el 25 de septiembre

**Hackathon Smart City Expo Cali 2026 · RETO-01 Cali Activa**
**Equipo:** William Ortiz · Herlin Echeverry · Pablo Arango · Bryan Martínez Villamarín (reemplaza a Daniel Celis desde el 25 de septiembre)
**Corte:** 25 de septiembre de 2026, 23:00. Presentación: sábado 26 de septiembre. **Pitch máximo: 1 minuto.**

---

## 1. El proyecto en 20 segundos
**Territorio Preparado** ayuda a planear el uso temporal de los espacios públicos de Cali en una emergencia. Cruza datos reales (POT, IDESC, Copernicus), descarta los lugares expuestos a la amenaza, propone candidatos, calcula cuánto cabe sin sobreocupar y qué servicios faltan, y a qué entidad le corresponde cada uno. **El sistema propone y la autoridad decide.**

- **Nombre del producto:** Territorio Preparado. "Cali Activa" es el nombre del reto y "Cali Lista" era la propuesta inicial de Pablo.
- **El gancho:** tras el sismo de 7,4 del 10 de agosto, **1.046 personas (336 familias)** terminaron en albergues **autogestionados** en Chiminangos I, Chiminangos II y Calimio Norte. Según la Defensoría, esas canchas quedan **a entre 72 y 152 m del dique del río Cauca**, con amenaza **alta** de inundación y suelo **licuable**.

## 2. Qué se hizo hoy, en orden
| Hora | Quién | Qué |
|---|---|---|
| 10:52 | William | Bitácora del proyecto, marco legal colombiano e instrucciones para IA (`docs/PROYECTO.md`, `AGENTS.md`) |
| 11:43 | William | Referentes internacionales por amenaza: Tokio, Yokohama, Nepal, Róterdam, Ciudad del Cabo… |
| 11:55 | Pablo | **Cali Lista**: formulario de caracterización con 6 categorías (`docs/cali_lista.pdf`) |
| 12:14 | William | Gema de Gemini y ruta de aprendizaje del equipo (`gema/`) |
| 12:16–12:44 | William | Idea integrada en 3 capas y filtro legal por capa (`docs/IDEA_INTEGRADA.md`) |
| 14:12–14:27 | William | **Datos reales:** inventario de 1.970 espacios con su exposición a cada amenaza, afectación del sismo por comuna y catálogo de fuentes con sus licencias (`docs/DATASETS.md`, `prototipo/datos/`) |
| 14:34 | Pablo | **Módulo preventivo** (`docs/modulo_preventivo.pdf`): zonificación del riesgo, peritaje del espacio (nivel A) y de su entorno (nivel B), puntaje de aptitud 60/40 y planes de acción |
| 14:48–19:29 | Herlin | **Aplicación y maqueta 3D** (`maqueta3d/`, en React, Three.js y Leaflet): mapa real, refugio, acopio, ciclo de los kits, incendios, avisos, SMS simulado y cálculo de la capacidad de acopio |
| 19:52–20:31 | Herlin | Video animado de 80 s, en dos versiones (`entregables/video/v2/`) |
| 20:45–21:40 | Herlin | Presentación en PowerPoint y PDF (versión normal y ampliada) y adopción del nombre **Territorio Preparado** |
| 21:48–21:57 | Herlin | Documento del alcance real (`docs/PROPUESTA_REAL.md`) y propuesta completa en Word y PDF |
| 22:58 | William (con Claude) | Unión de los forks de Herlin y Pablo, cambio de integrante, auditoría y pitch de 1 minuto |

## 3. Dónde está cada cosa
| Necesito… | Archivo |
|---|---|
| **El pitch de 1 minuto** | `entregables/pitch-1min/Guion_1_minuto.md` |
| La presentación para proyectar | `entregables/presentacion-ampliada/Presentacion_Ampliada.pptx` y `.pdf` |
| El documento completo para el jurado | `entregables/propuesta-completa/Territorio_Preparado_Propuesta_Completa.docx` y `.pdf` |
| Qué hace de verdad el prototipo | `docs/PROPUESTA_REAL.md` |
| El video (80 s) | `entregables/video/v2/cali-activa-80s.mp4` |
| Las capturas y los renders 3D | `maqueta3d/deliverables/renders/` |
| La bitácora completa con fuentes | `docs/PROYECTO.md` y `docs/PROYECTO.pdf` |
| Los datos y sus licencias | `docs/DATASETS.md` y `prototipo/datos/FUENTES.md` |

**Para correr la demo** (en el portátil, con internet para ver las calles):
```
cd ~/hackathon-cali-2026/maqueta3d
npm ci
npm run dev
```
Luego abre http://localhost:5173. Recorrido: **Mapa de espacios** → **Preparar intervención** → amenaza "Inundación" → espacio `epou-9465` (Colinas del Sur) → proponer **20** módulos (sale exceso) → bajar a **16** (sí cabe) → exportar el borrador.

## 4. Auditoría: estado verificado esta noche
**Lo que funciona (comprobado):**
- `npm run build` compila sin errores (TypeScript estricto).
- `npm test`: **22 de 22 pruebas aprobadas** (geometría, acopio, reglas de selección y trazabilidad sin datos inventados).
- Los forks de Herlin (24 commits) y de Pablo (1 commit) se unieron sin conflictos.
- El nombre del equipo quedó actualizado en los Markdown, la presentación (`.pptx` y `.pdf`) y el Word (`.docx` y `.pdf`).
- El marco legal se respeta en la app: no hay datos personales ni reconocimiento facial, los datos simulados están rotulados y la autoridad decide.

**No verificado:** las pruebas de navegador (`npm run test:e2e`, Playwright), porque requieren instalar los navegadores.

### Lo que falta, por prioridad
**CRÍTICO para el sábado (pitch de 1 minuto):**
1. **El pitch no cabe en un minuto.** El guion ampliado dura 240 s, el video 80 s y la presentación tiene 12 diapositivas más anexos. **Solución lista:** `entregables/pitch-1min/Guion_1_minuto.md`, con 4 diapositivas y unas 150 palabras. Hay que **ensayarlo con cronómetro** al menos 3 veces.
2. **Falta armar las 4 diapositivas del pitch corto.** Se pueden reutilizar las del PowerPoint ampliado (portada, mapa, ficha, exceso/ajuste y cierre).
3. **Nombre mezclado.** El video v2, la captura `mapa_cali.png` y la cabecera antigua de la app dicen "Cali Activa", y el video termina con "Cali Activa propone". En el pitch hay que decir **Territorio Preparado** y mencionar que "responde al reto Cali Activa".
4. **La demo solo corre en local.** No hay un enlace público: si el portátil o el internet fallan, no hay demo. Opciones: publicarla en GitHub Pages o tener listas las capturas y el video de respaldo.
5. **Subir los cambios a GitHub.** La unión de los forks y los cambios de esta noche están solo en tu portátil. Hay que hacer `git push`.

**IMPORTANTE (puntaje TRL 3 + IRL 3):**
6. **La validación con un actor real quedó excluida** "por decisión del usuario". Para el IRL 3 conviene al menos una conversación documentada (una llamada o un WhatsApp con una JAC de Chiminangos o Calimio, o con la Secretaría de Gestión del Riesgo) y registrarla en la bitácora, sin datos personales.
7. **Artefactos 2, 3 y 4 sin marcar** en la bitácora. Si el hackathon los exige, deben estar completos antes de la presentación.
8. **El módulo preventivo de Pablo no está en la app.** El puntaje 60/40 con la red de apoyo cercana (salud, Bomberos, MIO, EMCALI) solo está en PDF. En el pitch puede mencionarse como "siguiente fase".
9. **El kit de PVC + IoT** nunca llegó con su material. Se menciona solo como maqueta simulada.

**MARCO LEGAL (te corresponde):**
10. Verificar las normas marcadas "(verificar)" en las secciones 4 y 6.1 de la bitácora, en especial la **Circular SIC 002 de 2024** y el **CONPES 4144 de 2025**.
11. Confirmar la cifra oficial de muertos en Cali (105 frente a 154). **Recomendación: no mencionarla en el pitch.**
12. `prototipo/datos/raw/sismo/men_sedes.csv` (datos abiertos del MEN) trae **correos y teléfonos institucionales** de colegios, y algunos correos parecen de personas (por ejemplo, JBORRERO@…). Es información pública, pero el repo es público y la app no la usa: conviene **quitar esas columnas** (principio de datos mínimos de la Ley 1581).

**DESEABLE (si queda tiempo):**
- Geocodificar los 4 alojamientos oficiales y los 3 autogestionados.
- Datos de incendios y sequía: hoy la app no preselecciona espacios para esas amenazas porque falta evidencia. Es correcto y conviene decirlo si preguntan.
- Resolver la identidad de la cancha de hockey (Miguel Calero figura como coliseo).

## 5. El pitch de 1 minuto (para memorizar)
**[0–12 s] El gancho.** "El 10 de agosto, tras el sismo de 7,4, 1.046 personas se refugiaron en canchas de Chiminangos y Calimio que la propia comunidad convirtió en albergues. Esas canchas están a menos de 150 metros del jarillón del río Cauca: amenaza alta de inundación y suelo licuable."

**[12–22 s] El problema.** "Cali tiene 1.970 espacios públicos inventariados, pero hoy nadie sabe cuál sirve ante qué amenaza, qué le falta ni quién debe responder."

**[22–45 s] La solución.** "Territorio Preparado cruza datos reales del POT, IDESC y Copernicus. Eliges la amenaza y la población, y el sistema descarta los lugares expuestos y propone tres candidatos. Calcula cuánto cabe sin sobreocupar, cuánta agua y cuántos baños faltan, y qué entidad responde. Cada criterio queda a la vista."

**[45–60 s] El cierre.** "Ya funciona con el mapa real de Cali, una maqueta 3D del refugio y del centro de acopio, y avisos para la comunidad. Que la próxima vez el parque esté listo antes de la emergencia. **Territorio Preparado propone; la autoridad decide.**"

**Tres frases prohibidas:** "los mejores lugares", "lugares habilitados" y "caben 16 familias". Di en su lugar "candidatos", "propuesta para revisión" y "cabe por área, con datos simulados".

## 6. Respuestas rápidas para el jurado
- **¿Qué es real?** Los espacios (DAPM/IDESC), las amenazas (POT) y los daños del sismo (Copernicus EMSR916 y SERTIT). **Qué es simulado:** la población del escenario, las reservas de área, el IoT y los SMS, y así se rotula.
- **¿Datos personales?** Ninguno. Solo conteos agregados, sin datos de menores y sin reconocimiento facial (Ley 1581 de 2012, Ley 1098 de 2006).
- **¿Quién decide?** La Secretaría de Gestión del Riesgo o el Consejo Municipal de Gestión del Riesgo (Ley 1523 de 2012). El sistema no reemplaza la evaluación estructural (NSR-10) ni a Bomberos (Ley 1575 de 2012).
- **¿Qué sigue?** Validar con la Secretaría y las JAC, medir en campo la superficie útil, integrar el peritaje de entorno (el módulo preventivo) y crear un canal de avisos real y autorizado.

## 7. Checklist para mañana
- [ ] `git push` con la unión de los forks y los cambios de esta noche
- [ ] Armar las 4 diapositivas del pitch de 1 minuto
- [ ] Ensayar el pitch 3 veces con cronómetro (máximo 60 s)
- [ ] Probar la demo en el portátil de la presentación (`npm ci && npm run dev`)
- [ ] Tener el video y las capturas de respaldo sin conexión
- [ ] Decidir quién habla (una sola voz)
- [ ] (Legal) Revisar las normas "(verificar)" y quitar los contactos de `men_sedes.csv`
- [ ] (IRL) Documentar al menos un contacto de validación real
