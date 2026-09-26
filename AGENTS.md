# AGENTS.md — Instrucciones para cualquier IA que trabaje en este repo

Eres un asistente del equipo **William Ortiz, Herlin Echeverry, Pablo Arango y Bryan Martínez Villamarín** en la **Hackathon Smart City Expo Cali 2026** (Cámara de Comercio de Cali y Alcaldía de Santiago de Cali, 23 al 26 de septiembre de 2026). Responde siempre en **español**.

## 1. Lee esto primero
1. `docs/PROYECTO.md`: la bitácora completa y la fuente de verdad. Incluye la ficha del reto, el marco legal, la investigación con sus fuentes, la propuesta y los pendientes.
2. La sección **"7. Pendientes"** de ese archivo: indica en qué va el equipo.
3. `docs/PROYECTO.pdf` es la misma bitácora en PDF para compartir. Es un archivo generado: no lo edites a mano.

## 2. Contexto en 30 segundos
- **Reto:** RETO-01 **Cali Activa**, espacios públicos que se transforman para cuidar. Owner: Secretaría de Gestión del Riesgo de Emergencias y Desastres; líder técnico: DATIC.
- **Propuesta:** "Cali Activa: espacios listos para cualquier amenaza". Es un plan de contingencia **multiamenaza** (sismo, inundación por el río Cauca y el Jarillón, sequía o El Niño) que:
  1. caracteriza cada espacio público según su aptitud **para cada tipo de amenaza**;
  2. **recomienda** (nunca decide) los 3 mejores espacios según la amenaza y la población;
  3. calcula las **brechas** según los estándares Esfera y las asigna a la **entidad responsable** (Protocolo de Alojamientos Temporales de la UNGRD);
  4. hace seguimiento de las brechas en un tablero;
  5. guía el **retorno** del espacio a su uso normal con un checklist y un acta.
- **Hallazgos propios (no están en la ficha):** hubo albergues **autogestionados** en Chiminangos I, Chiminangos II y Calimio Norte (336 familias). **Calimio Norte está en la zona del Jarillón**, amenazada por inundación. Hay un vacío de caracterización y trazabilidad de ayudas señalado por la Defensoría y OCHA.
- **Meta de evaluación:** **TRL 3** (prototipo No-Code que demuestra la lógica) + **IRL 3** (proceso de coordinación validado con actores reales) + **video de 4 minutos**.

## 3. Reglas no negociables (antes de proponer o construir CUALQUIER cosa)
Aplica este filtro y dilo explícitamente en tu respuesta:
1. **La recomendación no reemplaza a la autoridad.** La activación la decide la Secretaría de Gestión del Riesgo o el Consejo Municipal de Gestión del Riesgo (Ley 1523 de 2012, Decreto 2157 de 2017).
2. **No reemplaza evaluaciones estructurales** (NSR-10, Ley 400 de 1997): solo registra si existe una evaluación vigente y su fecha.
3. **No invade las competencias de Bomberos** (Ley 1575 de 2012) ni emite conceptos de seguridad humana ni contra incendios.
4. **Datos mínimos** (Ley 1581 de 2012): solo conteos agregados por ciclo vital. **Nada de nombres ni documentos**, y **ningún dato de menores** (Ley 1098 de 2006). Los datos sensibles (salud, discapacidad) son opcionales y agregados.
5. **Sin reconocimiento facial** ni identificación individual innecesaria.
6. **IA y reglas explicables:** cada recomendación muestra las variables y los criterios que usó (Circular SIC 002 de 2024 y CONPES 4144 de 2025, pendientes de verificar).
7. **Prototipo con datos REALES y públicos de Cali** (decisión del 25 de septiembre; ver `docs/DATASETS.md`): el espacio público del DAPM/IDESC, las amenazas del POT, los daños satelitales del sismo y otros. Solo el IoT del kit y la ocupación de los escenarios de la demo pueden ser simulados, **marcados como SIMULADOS**. Cita siempre la fuente primaria, respeta las licencias CC BY-SA (atribución) y **nunca uses datos personales reales** (del RUD solo se usan agregados) ni los envíes a modelos externos.
8. Accesibilidad básica (Resolución MinTIC 1519 de 2020): buen contraste y lenguaje claro.
9. **No inventes cifras ni normas.** Si un dato no aparece con fuente en `docs/PROYECTO.md`, búscalo y cítalo, o márcalo como "(verificar)".

## 4. Flujo del hackathon (artefactos)
Cada artefacto es una página de claude.ai que recibe el Word del anterior y entrega otro:
- Artefacto 2 (acotar el reto): https://claude.ai/artifact/W2gqfgJFZjHU33PMR6Lqmt
- Artefacto 3 (ideación y filtro): https://claude.ai/artifact/5Bwp37CYVRW8DypdZdASi8
- Artefacto 4 (propuesta, validación y plan): https://claude.ai/artifact/EggcCaEL6xavWRHpkY9KAU
- Artefacto 5 (prototipo, bitácora y guion): https://claude.ai/artifact/8yLQNLcNt8FF3aMcmewD81

Cuando el equipo pida ayuda con un artefacto, entrega textos **listos para copiar y pegar** en sus campos.

## 5. Estructura del repo
```
AGENTS.md            ← este archivo (instrucciones para IA)
CLAUDE.md            ← apunta a AGENTS.md
README.md            ← presentación del proyecto
docs/PROYECTO.md     ← bitácora completa (fuente de verdad)
docs/PROYECTO.pdf    ← PDF generado a partir de PROYECTO.md
docs/md2html.py      ← script de conversión de .md a HTML
prototipo/           ← prototipo No-Code: especificación, enlaces, capturas
docs/DATASETS.md     ← catálogo de datos reales, zonas más afectadas y vacíos de información
prototipo/datos/FUENTES.md ← URL de descarga, página de origen y licencia de cada dataset (también en fuentes.csv)
prototipo/datos/raw/ ← fuentes originales (IDESC, POT, Copernicus, SERTIT, MEN, OPS…)
prototipo/datos/procesados/ ← cruces listos para Sheets o Looker (inventario_espacios_cali.csv…)
prototipo/scripts/   ← scripts en Python puro que regeneran procesados/
entregables/         ← Words de los artefactos, guion del video, entregable final
```

## 6. Cómo mantener el contexto (obligatorio)
- Después de cada avance, **actualiza `docs/PROYECTO.md`**: agrega los hallazgos y las fuentes nuevas con URL, marca los pendientes resueltos y cambia la fecha de "Última actualización".
- Regenera el PDF:
  ```bash
  python3 docs/md2html.py docs/PROYECTO.md /tmp/PROYECTO.html
  soffice --headless --convert-to pdf:writer_web_pdf_Export --outdir docs /tmp/PROYECTO.html
  ```
- Si agregas un dataset, registra su URL de descarga, su página de origen y su licencia en `prototipo/datos/FUENTES.md` y `fuentes.csv`.
- Haz commits pequeños con mensajes en español, por ejemplo `docs: hallazgos de entrevista con JAC Calimio`.
- **El repo es público:** no subas datos personales, teléfonos, cédulas, tokens ni los Word de otros equipos.

## 7. Prototipo sugerido (sábado 26 de septiembre)
- **Stack:** Google Sheets (base de datos) + Glide o Softr (app) + Looker Studio (mapa y tablero).
- **Base real ya construida:** `prototipo/datos/procesados/inventario_espacios_cali.csv` (1.970 espacios con su exposición por amenaza) y `resumen_comunas_multiamenaza.csv`.
- **Tablas mínimas** (en `prototipo/datos/`):
  - `espacios.csv`: id, nombre, comuna, lat, lon, capacidad, baños, agua_l_dia, energia_respaldo, accesible, zona_inundacion, zona_remocion, riesgo_incendio, evaluacion_estructural_fecha, dueño.
  - `escenarios.csv`: amenaza, personas, %niños, %adultos_mayores, %discapacidad, comuna_origen.
  - `responsables.csv`: servicio → entidad (según el Protocolo de la UNGRD).
  - `brechas.csv`: espacio, servicio, faltante, entidad, estado.
- **Reglas explicables** (ejemplos):
  - si la amenaza es inundación y `zona_inundacion = sí` → el espacio se descarta;
  - si la amenaza es sismo y no hay evaluación estructural vigente → se marca "requiere inspección antes de activar";
  - baños necesarios = personas / 20; agua necesaria = personas × 15 L al día.
- **Demo:** "Alerta naranja, río Cauca a 9,25 m, 300 personas de Calimio Norte" → 3 espacios recomendados con sus brechas y responsables → cambiar a "sismo" → la recomendación cambia.
