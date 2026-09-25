# Hackathon Smart City Expo Cali 2026 — Bitácora del proyecto

**Equipo:** William Ortiz, Herlin Echeverry, Pablo Arango, Daniel Celis
**Reto:** RETO-01 Cali Activa: espacios públicos que se transforman para cuidar
**Enfoque:** plan de contingencia multiamenaza (sismo, inundación y sequía/El Niño) para espacios públicos, con organismos y mecanismos para el antes, el durante y el después.
**Última actualización:** 25 de septiembre de 2026 (Sesión 2, referentes internacionales)

---

## 1. Cómo funciona el hackathon

**Material fuente:** `~/Descargas/SESIÓN 1 - 23 SEPT…zip`, `SESIÓN 2 - 25 SEPT…zip` y `SESIÓN 3 - 26 SEPT…zip` (la Sesión 3 venía vacía).

| Sesión | Fecha | Qué se hace | Artefacto |
|---|---|---|---|
| 1 | Mié 23 sep | Tablero del equipo: roles, frase, lo que sabemos y suponemos, actores, entrevistas | Artefacto 1: https://claude.ai/artifact/LAmBJHeusdaZ48dwDgkpLx |
| 2, bloque 1 | Vie 25 sep, mañana | Acotar el reto en 6 campos + "¿Cómo podríamos…?" | Artefacto 2: https://claude.ai/artifact/W2gqfgJFZjHU33PMR6Lqmt |
| 2, bloque 2 | Vie 25 sep, después del almuerzo | Ideación (6 a 8 ideas) y filtro por impacto y factibilidad | Artefacto 3: https://claude.ai/artifact/5Bwp37CYVRW8DypdZdASi8 |
| 2, bloque 3 | Vie 25 sep, tarde | Propuesta de valor, validación, TRL/IRL, plan del prototipo, guion | Artefacto 4: https://claude.ai/artifact/EggcCaEL6xavWRHpkY9KAU |
| 3 | Sáb 26 sep | Prototipo, pruebas, bitácora y guion de grabación | Artefacto 5: https://claude.ai/artifact/8yLQNLcNt8FF3aMcmewD81 |

**Reglas clave**
- Cada artefacto recibe el Word del anterior. No editen el Word después de descargarlo.
- Usen siempre el mismo computador y el mismo navegador (el avance se guarda en localStorage). No usen modo incógnito.
- Validador adicional (Gema de Gemini): https://gemini.google.com/gem/1Isx0OX0Ap5lmPl5SlM8d4y9KWl9E4dvC?usp=sharing
- Meta: **TRL 3** (prototipo que demuestra la lógica) + **IRL 3** (proceso de coordinación validado con actores reales).
- La solución no tiene que ser una app: puede ser un flujo en Glide o Softr, un tablero en Looker Studio, un Figma o un diagrama de proceso.
- **Guion del video (4 min, productora CCC):** [00:00–01:00] dolor territorial y cifras · [01:00–02:15] demo en vivo · [02:15–03:15] valor público e IRL 3 · [03:15–04:00] equipo y cierre.
- El entregable final se sube a la carpeta de Drive del hackathon.

## 2. Ficha oficial del RETO-01 (Portafolio de Retos, Alcaldía de Cali, v2.0)

- **Owner:** Secretaría de Gestión del Riesgo de Emergencias y Desastres (líder funcional) y DATIC (líder técnico).
- **Entidades a articular:** UAE Gestión de Bienes y Servicios, Secretaría de Infraestructura, Secretaría del Deporte, Secretaría de Seguridad y Justicia, Secretaría de Salud Pública, Secretaría de Bienestar Social, Secretaría de Educación, Planeación, EMCALI, UAESP.
- **Pregunta retadora:** ¿Cómo podríamos transformar los espacios públicos de Cali en una red adaptable que, según el tipo de emergencia y las necesidades de la población, permita activar y operar de manera segura y coordinada funciones temporales de atención y recuperación, y facilite posteriormente el retorno del espacio a su uso cotidiano?
- **Objetivo:** un prototipo de baja fidelidad que caracterice espacios, analice su aptitud según el escenario, identifique adecuaciones, active entidades según la población, haga seguimiento y apoye el retorno.
- **Indicadores de validación:**
  - diferenciar la respuesta según el tipo de emergencia;
  - número de variables de preparación;
  - capacidad de identificar brechas;
  - trazabilidad necesidad → servicio → entidad;
  - tiempo para generar una propuesta de activación en un escenario simulado;
  - representar el ciclo completo, de la preparación a la recuperación.
- **Líneas rojas:** no reemplazar evaluaciones estructurales, conceptos técnicos de seguridad ni decisiones de autoridades; no invadir competencias de bomberos; privacidad y datos mínimos; sin reconocimiento facial ni identificación individual innecesaria; recomendaciones automáticas que se puedan entender, con criterios visibles.
- **Tecnologías sugeridas:** SIG, No-Code/Low-Code, IA y analítica, IoT, tableros, apps web o móviles, gestión de incidencias, conectividad resiliente.

## 3. Competencia (tableros del artefacto 1)

| Reto | Equipos |
|---|---|
| RETO-01 (~7) | CityVe (condiciones sanitarias), Certeza (agenda social y percepción de inseguridad), Ecosistema Creativo (zonas afectadas y zonas seguras en tiempo real), Revo HUD (motociclistas), CityBeam (mobiliario urbano y paredes interactivas), Nature Intelligence (alertas de incendios satelitales), Aerostatic (comunicación entre comunidad e instituciones) |
| RETO-02 (~8) | VUM, Páramo Digital, DoTech, La Maleta, Alfaworks, Factura Clara, toderosfynd, (Certeza Fintech) |
| RETO-03 (3) | Dedsec, Mentes en Movimiento, TriAI |

**Qué nos diferencia:** ningún equipo trabaja el enfoque **multiamenaza** (que la aptitud de un espacio dependa del tipo de amenaza), ni la **matriz de quién responde por cada servicio**, ni la inclusión de los **albergues autogestionados**.

## 4. Marco legal y normativo colombiano (filtro obligatorio)

> Las normas marcadas con (verificar) hay que confirmarlas en la Función Pública o la SIC antes de citarlas en el video o la bitácora.

### Transversal
| Tema | Norma | Qué nos exige |
|---|---|---|
| Datos personales | Ley 1581 de 2012; Decreto 1377 de 2013 (compilado en el Decreto 1074 de 2015) | Autorización previa, expresa e informada; aviso de privacidad; pedir solo lo necesario y usarlo solo para el fin declarado |
| Datos sensibles | Ley 1581, arts. 5 y 6 | Salud, discapacidad y etnia: respuesta siempre opcional |
| Menores | Ley 1581, art. 7; Ley 1098 de 2006 | Solo datos agregados; nunca identificar a menores |
| IA | Circular SIC 002 de 2024 (verificar); CONPES 4144 de 2025 (verificar) | IA explicable; la decisión final la toma una persona; no enviar datos personales reales a modelos externos |
| Transparencia | Ley 1712 de 2014 | Criterios que se puedan publicar; usar datos abiertos |
| Gobierno digital | Decreto 767 de 2022; MSPI de MinTIC | Solución web, interoperable, con seguridad y privacidad desde el diseño |
| Accesibilidad | Resolución MinTIC 1519 de 2020 (WCAG 2.1 AA); Ley 1618 de 2013 | Contraste, lectura en pantalla, lenguaje claro |
| Mensajes de datos | Ley 527 de 1999 | Validez de los registros digitales |
| Delitos informáticos | Ley 1273 de 2009 | No hacer scraping ni acceder a datos sin autorización |
| Propiedad intelectual | Ley 23 de 1982 y bases del hackathon | Revisar a quién pertenece lo que se desarrolle |

### Específico del RETO-01
- **Ley 1523 de 2012** (Sistema Nacional de Gestión del Riesgo) y **Decreto 2157 de 2017**: la activación la decide el Consejo Municipal de Gestión del Riesgo y la Secretaría de Gestión del Riesgo. Nuestro sistema **recomienda; no decide**.
- **Protocolo de Alojamientos Temporales de la UNGRD** y **Manual de Estandarización de la Ayuda Humanitaria**: de ahí sale la tabla de quién responde por cada servicio.
- **Ley 400 de 1997 y NSR-10**: no reemplazamos la evaluación estructural; solo registramos si existe y su fecha.
- **Ley 1575 de 2012** (Bomberos): no emitimos conceptos de seguridad humana ni contra incendios.
- **Ley 1098, Ley 1618 y Ley 1257 de 2008**: zonas diferenciadas para niños, personas con discapacidad y mujeres; conteos por ciclo vital, sin censar a personas.
- **Decreto 1504 de 1998** (espacio público) y **POT de Cali (Acuerdo 0373 de 2014)**: el uso temporal debe tener una ruta de retorno.
- **Estándares Esfera** (referencia humanitaria internacional): 1 baño por cada 20 personas, 15 L de agua por persona al día, 3,5 m² cubiertos por persona.

### Checklist antes de construir
1. ¿Recomienda sin quitarle la decisión a la autoridad competente?
2. ¿Pide solo los datos necesarios, con aviso y autorización, y hace opcionales los sensibles?
3. ¿Usa datos simulados o abiertos en el prototipo, sin datos reales de personas?
4. ¿Tiene una tabla de explicabilidad (variables, reglas, límites) visible en la demo?
5. ¿Cruza alguna línea roja o se mete en competencias de otra entidad (bomberos, salud, estructural)?
6. ¿Cumple lo básico de accesibilidad?

## 5. Investigación: noticias y evidencia

### Terremoto del 10 de agosto de 2026
- Magnitud 7,4, a las 7:34 a. m.; epicentro en San José del Palmar (Chocó), a 103 km de profundidad.
- **Cali:** 105 muertos, 1.401 heridos; 879 viviendas destruidas y 16.357 averiadas; **45.138 familias (97.337 personas) inscritas en el Registro Único de Damnificados (RUD)**; cerca de 20 edificios colapsados. (Otra nota del 13 de septiembre habla de 154 fallecidos y 1.517 heridos. El repositorio oficial de la Alcaldía, que citó el equipo Revo HUD, reporta **154 fallecidos, 1.657 lesionados y 24 edificaciones con colapso total**: falta confirmar la fecha de corte.)
- **Valle del Cauca (corte al 24 de agosto):** 220 muertos, 3.043 heridos; el 80 % de las casas de El Cairo quedó destruido.
- **País (OCHA, 25 de septiembre):** 486.917 afectados (303.934 familias), 335 muertos, 4.516 heridos, 105 desaparecidos, 36.478 viviendas destruidas; **6.903 personas en 105 alojamientos temporales**; 4.431 sedes educativas, 402 centros de salud y 182 acueductos afectados.
- **Vacíos que señala OCHA:** cifras que no coinciden entre las evaluaciones de daños y los reportes municipales; migrantes que quedaron fuera de los registros; familias sin información sobre las inspecciones estructurales; fallas de agua y saneamiento en los albergues.

### Albergues en Cali
- **Oficiales:** Cancha de Hockey Miguel Calero (albergue y punto de atención humanitaria, con equipos psicosociales, de salud y de Bienestar Social; atiende a migrantes), Diamante de Béisbol y Unidad Deportiva Jaime Aparicio (albergue, centro de acopio y lugar de descanso para rescatistas). Se entregaron colchonetas, agua, alimentos, cobijas y kits de higiene, y se instalaron baños portátiles.
- **Autogestionados (hallazgo clave):** la Defensoría encontró **336 familias (1.046 personas)** en 3 albergues montados por la comunidad en canchas de **Chiminangos I, Chiminangos II y Calimio Norte**. Funcionaban con carpas y baños donados por un empresario, ollas comunitarias y voluntarios jóvenes.
- **Recomendaciones de la Defensoría:** organizar mejor los albergues; acompañamiento permanente de la Alcaldía (Santa Elena, Alto Meléndez); articulación con el ICBF; baños adecuados y **censo por ciclo vital en la Cancha de Hockey**. Observó "traslados de ayudas cuyo destino se desconocía" por falta de caracterización de las familias.
- **ICBF:** acompaña 49 albergues; verifica derechos, ubica a niños y activa rutas de protección.
- **Vida en los albergues:** trauma (despertarse con cualquier ruido), carpas sin protección adecuada, falta de espacios para niños y apoyo psicosocial limitado.

### Retorno de escenarios deportivos
- Al 31 de agosto, de **43 escenarios** de alto rendimiento revisados: **12 habilitados (27,9 %)**, **22 esperando inspección técnica (51,2 %)**, 4 inhabilitados, 2 con observaciones y 2 sin revisar.
- En el Valle del Cauca, 36 escenarios quedaron afectados, 24 con daños importantes. Seguían cerrados el Coliseo El Pueblo, el Velódromo Alcides Nieto y el Complejo Acuático Hernando Botero. Indervalle lidera la evaluación.

### Inundaciones: río Cauca y Jarillón
- **24 de febrero de 2026:** el río Cauca llegó a 9,25 m y se declaró alerta naranja en el oriente (Puerto Nuevo, Playa Renaciente, Brisas del Cauca). Actuaron Bomberos, Cruz Roja y Defensa Civil. No hubo viviendas inundadas.
- **Mayo de 2026:** emergencia en 23 km de terrenos junto al Jarillón.
- El Plan Jarillón (Fondo Adaptación) protege a **900.000 habitantes** del oriente. En marzo hubo intervenciones en Calimio Norte y Petecuy.
- ⚠️ **Calimio Norte (albergue autogestionado tras el sismo) está en el sector del Jarillón**, es decir, en zona de amenaza por inundación. Chiminangos: hay que verificarlo en el mapa de amenaza del POT.

### Sequía y El Niño
- IDEAM: 90 % de probabilidad de un El Niño muy fuerte en el último trimestre de 2026 (75 % de que sea el más intenso en 76 años). **El pico será en noviembre.**
- En julio de 2026 hubo más de 30 incendios en Cali (+20 % frente a 2025); 50 incendios forestales en el Valle del Cauca. Vigilancia reforzada en las comunas 1, 18 y 20, Pance, La Buitrera y El Saladito.
- El río Meléndez está en alerta naranja (~600 L/s). EMCALI tiene planes de contingencia para las laderas. Salvajina está al 80 % y Sara Brut al 96 %; la CVC descarta cortes de agua en Cali por ahora.
- Los 6 riesgos que identificó Cali: incendios forestales, desabastecimiento de agua, salud pública, interrupción de servicios, sector agrícola y ecosistemas.

### Referentes internacionales: planes de contingencia en espacios públicos
Idea que los une: **el espacio público se diseña desde el inicio con dos vidas**, la cotidiana y la de emergencia, y además se **protege legalmente** para que no desaparezca.

**Sismo**
| País | Qué hacen | Qué adaptamos a Cali |
|---|---|---|
| Japón (Tokio) | **Parques de prevención de desastres (bōsai kōen):** bancas que se convierten en fogones (*kamado*), tapas de alcantarilla que se convierten en baños sin agua ni electricidad (el parque Hikarigaoka tiene 52), postes solares con tomas para cargar celulares y bodegas con comida. Bajo parques y colegios hay **tanques de agua potable antisísmicos** enterrados; en Yokohama, el de Minato Mirai 21 guarda agua para unas 170.000 personas durante 3 días. | Campo de la ficha de aptitud: "¿tiene agua almacenada, baños sin red y energía propia?". Es la brecha que más se vio en los albergues de Cali (baños portátiles, agua donada). |
| Nepal (Katmandú) | En 2013, el Gobierno aprobó por decreto **83 espacios abiertos humanitarios** (unos 4 km²), con mapas SIG, un portal web y una app. Tras el sismo de 2015, 33 de esos espacios recibieron a casi 31.000 personas. En 2020, OIM encontró que **solo la mitad seguía siendo utilizable** por construcciones nuevas. | Un inventario oficial y previo, con revisión periódica: la ficha debe tener **fecha de última verificación**. |
| Turquía (Estambul) | Tras el sismo de 1999 se definieron 470 áreas de reunión; más de 300 terminaron convertidas en centros comerciales, viviendas u oficinas porque **no tenían protección legal**. | Lección negativa: proponer que los espacios aptos queden protegidos en el POT o en el Plan Municipal de Gestión del Riesgo. |
| México (CDMX) | El SASMEX da la alerta sísmica y el C5 la difunde por **28.287 altavoces**. En el Simulacro Nacional del 19 de septiembre de 2026 funcionó el 98,93 % (303 fallaron) y la ciudadanía reporta las fallas. | Simulacros periódicos de activación de espacios, con un indicador de qué funcionó y qué no. |

**Inundación**
| País | Qué hacen | Qué adaptamos a Cali |
|---|---|---|
| Japón (Yokohama) | El **estadio Nissan** está construido sobre pilotes dentro de la cuenca de retención del río Tsurumi (parque Shin-Yokohama): cuando el río se desborda, el agua pasa por debajo y el parque se inunda a propósito. Con el tifón Hagibis (12 de octubre de 2019) la cuenca se llenó, y al día siguiente el partido Japón-Escocia del Mundial de Rugby se jugó sin problemas. | La aptitud cambia con la amenaza: un espacio puede ser **zona de amortiguación** en una inundación y **albergue** en un sismo. El sistema debe saber cuál de los dos papeles le toca. |
| Países Bajos (Róterdam) | **Plaza de agua Benthemplein:** canchas de baloncesto y skate hundidas que, en un aguacero, almacenan unos 1.700 m³ (una piscina olímpica) y alivian el alcantarillado. | Un parque o una cancha puede ser amortiguador, no albergue. |
| Dinamarca (Copenhague) | El **Plan de Aguaceros** tiene unos 300 proyectos. El parque Enghaveparken tiene muros con compuertas que suben solas y lo convierten en un depósito de 22.600 m³. | Umbrales automáticos, como el "río Cauca ≥ 9 m" del plan. |
| China | **Ciudades esponja** (desde 2015): la meta es que en 2030 el 80 % del área urbana absorba y reutilice al menos el 70 % de la lluvia. Hoy hay más de 640 proyectos en 250 municipios. | Contexto para el "después": reconstruir el espacio pensando en la próxima amenaza. |

**Sequía o El Niño**
| País | Qué hacen | Qué adaptamos a Cali |
|---|---|---|
| Alemania | La Ley de Aseguramiento del Agua (*Wassersicherstellungsgesetz*, 1965) mantiene unos **5.200 pozos de emergencia** independientes de la red, sobre todo en zonas residenciales de las ciudades grandes. Berlín tiene unos 900 pozos de calle. | Mapear las fuentes de agua alternas (pozos, tanques, carrotanques) asociadas a cada espacio. |
| Sudáfrica (Ciudad del Cabo, 2018) | El plan del "Día Cero" definía unos 200 **puntos de recolección de agua** en espacios públicos, a 25 L por persona al día, con horario ampliable y seguridad de Policía y Ejército. Los carrotanques atendían primero a hogares de adultos mayores y de personas sin hogar. El Día Cero no llegó porque la ciudad redujo el consumo. | Un tercer papel para el espacio público: **punto de distribución de agua**, además de albergue y amortiguador. Poblaciones priorizadas. |
| España (Barcelona, 2024) | Emergencia por sequía (embalses por debajo del 16 %): bajó la dotación de 210 a 200 L por persona al día, se cerraron fuentes ornamentales y parques acuáticos, y se dejó de regar los parques; los árboles se regaban lo mínimo con agua subterránea. | Qué se apaga en un espacio (riego, fuentes, piscinas) y qué se prende (punto de agua, refugio climático) cuando El Niño llegue a su pico en noviembre. |

**Conclusión para la propuesta:** ningún referente usa el mismo espacio igual para las tres amenazas. Eso respalda la idea central de "Cali Activa": **la aptitud es por amenaza** y cada espacio tiene uno de tres papeles posibles, **albergue, amortiguador o punto de agua**. En Colombia la decisión de activarlo sigue siendo de la autoridad (Ley 1523). Obras como el estadio sobre pilotes o los tanques enterrados son de largo plazo y salen del alcance del prototipo; en la ficha solo se registran como atributos del espacio.

## 6. La propuesta: "Cali Activa: espacios listos para cualquier amenaza"

**Idea central:** la aptitud de un espacio depende de la amenaza. Una cancha del oriente sirve para un sismo pero no para una inundación. Un coliseo de ladera sirve para una inundación pero queda sin agua en El Niño. El plan incluye los albergues autogestionados que la ciudad no tenía mapeados. La estructura sigue los tres procesos de la Ley 1523: conocimiento del riesgo, reducción y manejo.

### ANTES (preparación)
| Mecanismo | Organismo responsable |
|---|---|
| Ficha de aptitud por espacio y por amenaza: capacidad, baños, agua, energía, accesibilidad, zona de amenaza, evaluación estructural vigente | Secretaría de Gestión del Riesgo (líder), Planeación, Secretaría del Deporte, Bienes y Servicios, DATIC |
| Umbrales de alerta que preactivan espacios (río Cauca ≥ 9 m, sismo, alerta roja por incendio) | IDEAM, CVC, Servicio Geológico Colombiano |
| Matriz de quién responde por cada servicio (Protocolo UNGRD) | Consejo Municipal de Gestión del Riesgo |
| Registro de líderes comunitarios y albergues autogestionados | Juntas de acción comunal, Bienestar Social |

### DURANTE (activación y operación)
| Mecanismo | Organismo responsable |
|---|---|
| El sistema recomienda los 3 mejores espacios según la amenaza y el número de personas; la decisión la toma la autoridad | Secretaría de Gestión del Riesgo, Consejo Municipal |
| Lista de brechas según Esfera, asignadas automáticamente a su entidad | EMCALI, UAESP, Salud Pública, ICBF, Bienestar Social, Policía, Cruz Roja, Defensa Civil |
| Caracterización mínima por ciclo vital (solo conteos) | Bienestar Social, con veeduría de la Defensoría y la Personería |
| Tablero de seguimiento de brechas (abierta → en curso → cerrada) | DATIC, Secretaría de Gestión del Riesgo |

### DESPUÉS (recuperación y retorno)
| Mecanismo | Organismo responsable |
|---|---|
| Checklist de retorno: salida de la población → limpieza → inspección → reparación → acta de entrega | Secretaría de Infraestructura, Secretaría del Deporte, Bienes y Servicios |
| Lecciones aprendidas y actualización de la ficha del espacio | Secretaría de Gestión del Riesgo |

### Demo para el sábado (60 s)
"Alerta naranja, río Cauca a 9,25 m. Hay 300 personas de Calimio Norte que necesitan reubicarse." El sistema descarta los espacios del oriente que están en zona inundable, propone 3 alternativas con sus brechas y dice quién responde por cada una. Luego se cambia el escenario a "sismo" y la recomendación cambia. Así se cubren los indicadores de la ficha.

**Herramientas:** Google Sheets como base de datos, Glide o Softr para la app, Looker Studio para el mapa y el tablero. Datos simulados, con nombres reales de escenarios y cifras ficticias marcadas como tales.

### Filtro legal de la propuesta
- Es una recomendación; la decisión la toma la autoridad (Ley 1523).
- No reemplaza evaluaciones estructurales (NSR-10).
- No emite conceptos de bomberos (Ley 1575).
- Solo conteos agregados, sin datos de menores (Ley 1581 y Ley 1098).
- Reglas visibles y explicables.
- Sin reconocimiento facial.

## 7. Pendientes
- [ ] Artefacto 2: redactar los 6 campos y el "¿Cómo podríamos…?" con los hallazgos propios (albergues autogestionados y la amenaza cruzada con el Jarillón).
- [ ] Artefacto 3: generar 6 a 8 ideas y filtrarlas.
- [ ] Artefacto 4: propuesta de valor, validación con un usuario real (JAC de Chiminangos o Calimio Norte, o la Secretaría de Gestión del Riesgo) y plan del prototipo.
- [ ] Sábado: construir el dataset simulado y el prototipo No-Code, y grabar el video.
- [ ] Agregar a la ficha de aptitud el campo "papel según la amenaza" (albergue, amortiguador o punto de agua) y los atributos de agua almacenada, baños sin red y energía propia (ver los referentes internacionales).
- [x] Ruta de aprendizaje y Gema de Gemini para entrenar al equipo: `gema/INSTRUCCIONES_GEMA.md` y `gema/RUTA_APRENDIZAJE.pdf` (incluye el análisis de la competencia del RETO-01).
- [ ] Confirmar las cifras oficiales de muertos en Cali (105 vs. 154) y las normas marcadas con (verificar).

## 8. Fuentes consultadas
- Portafolio de Retos HSC, Alcaldía de Cali v2.0 (PDF, Sesión 1)
- Guía de uso de los artefactos, Sesiones 2 y 3 (DOCX) y presentación de la Sesión 2 (PPTX)
- https://es.wikipedia.org/wiki/Terremoto_de_Colombia_de_2026
- https://www.infobae.com/colombia/2026/09/25/ocha-alerta-vacios-de-informacion-y-atencion-tras-terremoto-que-deja-486917-afectados-en-colombia/
- https://datosdelterremoto.org/municipio/cali/
- https://www.defensoria.gov.co/web/guest/-/defensoria-pide-atencion-urgente-para-336-familias-en-albergues-de-cali
- https://www.vanguardia.com/colombia/2026/09/13/el-terremoto-no-termina-la-vida-en-los-albergues-de-cali/
- https://www.elpais.com.co/cali/terremoto-en-cali-estos-son-los-lugares-habilitados-para-recibir-a-los-damnificados-1038.html
- https://www.elnuevosiglo.com.co/nacion/cali-abren-albergue-en-cancha-de-hockey-y-evaluan-subsidios-para-damnificados
- https://www.semana.com/nacion/cali/articulo/tras-el-terremoto-cali-informa-cuales-escenarios-deportivos-vuelven-a-estar-al-servicio-de-los-atletas-desde-este-31-de-agosto/202628/
- https://occidente.co/regionales/valle-del-cauca/36-escenarios-deportivos-estan-afectados/
- https://www.icbf.gov.co/noticias/el-icbf-mantiene-atencion-ininterrumpida-en-territorios-afectados-por-el-terremoto
- https://cwmas.com.co/cali/2026/02/24/rio-cauca-en-alerta-naranja-aumenta-el-caudal-en-el-oriente-de-cali/
- https://www.cali.gov.co/boletines/publicaciones/191712/el-jarillon-del-rio-cauca-no-es-una-via-se-limitara-el-acceso-y-transito-de-vehiculos-sobre-su-estructura/
- https://www.fondoadaptacion.gov.co/index.php/component/sppagebuilder/?view=page&id=168
- https://www.lafm.com.co/actualidad/medidas-aumento-incendios-forestales-cali-fenomeno-nino-405401
- https://ciudadregion.com/regiones/valle-del-cauca/cali/pico-fenomeno-nino-noviembre-valle-cauca-niveles-embalses
- https://ciudadregion.com/regiones/valle-del-cauca/cali/sequia-valle-del-cauca-niveles-represas-incendios-forestales
- https://www.cali.gov.co/gobierno/publicaciones/193607/terremoto-de-cali-repositorio-oficial-de-informacion/
- https://www.unocha.org/publications/report/colombia/colombia-prediccion-impactos-por-desarrollo-de-el-fenomeno-del-nino-2026-2027-19-de-junio-de-2026
- https://www.cdp.net/en/insights/yokohama
- https://adaptation-platform.nies.go.jp/en/db/measures/report_043.html
- https://www.tokyo-park.or.jp/special/bousai/english/sisetsu.html
- https://www.smithsonianmag.com/smart-news/tokyo-has-built-disaster-preparedness-fabric-city-180952366/
- https://www.kubota.com/corporatehistory/ourchallenges/japan-water-03/2/
- https://reliefweb.int/report/nepal/updated-report-83-open-spaces-identified-humanitarian-purposes-kathmandu-valley
- https://nepalitimes.com/kathmandu-loses-its-open-spaces
- https://www.turkeyrecap.com/p/out-of-space-lack-of-safe-zones-deepens
- https://www.elimparcial.com/mexico/2026/09/19/simulacro-nacional-2026-303-altavoces-de-cdmx-no-sonaron-segun-c5-asi-puedes-reportar-una-falla/
- https://www.urbanisten.nl/work/benthemplein
- https://www.dutchwatersector.com/news/new-innovative-water-square-combines-leisure-and-storm-water-storage-in-rotterdam-the
- https://stateofgreen.com/en/solutions/125669/
- https://toposmagazine.com/enghaveparken-copenhagen-denmark/
- https://www.preventionweb.net/news/chinas-sponge-cities-aim-re-use-70-rainwater-heres-how
- https://de.wikipedia.org/wiki/Trinkwassernotbrunnen
- https://www.bbk.bund.de/DE/Themen/Kritische-Infrastrukturen/Sektoren-Branchen/Wasser/Wassersicherstellung/wassersicherstellung_node.html
- https://iol.co.za/capeargus/news/watercrisis-city-of-cape-town-unveils-scant-dayzero-plans-12989659
- https://siwi.org/news/how-cape-town-saved-itself-from-day-zero
- https://phys.org/news/2024-02-barcelona-restrictions-drought-emergency-declared.html
- https://ajuntament.barcelona.cat/urbanisme-accio-climatica-mobilitat-pla-barris-serveis-urbans/en/aigua/la-sequera
