# Territorio Preparado · Pitch de 1 minuto

**Tiempo máximo: 60 segundos. Unas 150 palabras, a ritmo tranquilo.** Son 4 diapositivas y una sola voz. Si sobra tiempo, no se agrega nada: se habla más despacio.

| Tiempo | Diapositiva (imagen) | Qué se dice |
|---|---|---|
| 0–12 s | **1 · El gancho.** Captura NUEVA del mapa de la app filtrado por "Inundación" y buscando "Calimio" (la captura `mapa_cali.png` todavía dice "Cali Activa") | "El 10 de agosto, tras el sismo de 7,4, 1.046 personas se refugiaron en canchas de Chiminangos y Calimio que la propia comunidad convirtió en albergues. Esas canchas están a menos de 150 metros del jarillón del río Cauca: amenaza alta de inundación y suelo licuable." |
| 12–22 s | **2 · El problema.** Cifra grande: "1.970 espacios públicos. ¿Cuál sirve para qué?" | "Cali tiene 1.970 espacios públicos inventariados, pero hoy nadie sabe cuál sirve ante qué amenaza, qué le falta ni quién debe responder." |
| 22–45 s | **3 · La solución en vivo.** Captura del mapa con la ficha (`entregables/presentacion-ampliada/assets/ficha.png`) y el cálculo 20 → 16 (`exceso.png`, `ajuste.png`) | "Territorio Preparado cruza datos reales del POT, IDESC y Copernicus. Eliges la amenaza y la población, y el sistema descarta los lugares expuestos y propone tres candidatos. Calcula cuánto cabe sin sobreocupar, cuánta agua y cuántos baños faltan, y qué entidad responde. Cada criterio queda a la vista." |
| 45–60 s | **4 · Cierre.** Logo y frase | "Ya funciona con el mapa real de Cali, una maqueta 3D del refugio y del centro de acopio, y avisos para la comunidad. Que la próxima vez el parque esté listo antes de la emergencia. **Territorio Preparado propone; la autoridad decide.**" |

## Reglas para no perder puntos
- Nunca digas "los mejores lugares" ni "lugares habilitados". Lo correcto es "**candidatos** que la autoridad revisa" (Ley 1523 de 2012).
- El 20 → 16 es un cálculo **por área con datos simulados**. No afirmes que "caben 16 familias".
- Todas las cifras tienen fuente en `docs/PROYECTO.md`: sismo de 7,4 y 1.046 personas o 336 familias según la Defensoría (sección 5), distancia de 72 a 152 m al dique y suelo licuable (sección 6.2), 1.970 espacios (DAPM/IDESC).
- Si preguntan por la validación: "La siguiente etapa es validarlo con la Secretaría de Gestión del Riesgo y las JAC de Chiminangos y Calimio".

## Preguntas probables del jurado (respuestas de 10 segundos)
- **¿Qué es real y qué es simulado?** Los espacios, las amenazas y los daños del sismo son reales y públicos. La población del escenario, las reservas de área, el IoT y los SMS están simulados y así se marcan en pantalla.
- **¿Y los datos personales?** No se usan. Solo manejamos conteos agregados, no hay datos de menores ni reconocimiento facial (Ley 1581 de 2012 y Ley 1098 de 2006).
- **¿Reemplaza a los ingenieros o a Bomberos?** No. El sistema solo registra si existe una evaluación estructural vigente (NSR-10) y no emite conceptos de Bomberos (Ley 1575 de 2012).
- **¿Cómo escala?** Es un frontend con datos abiertos. Con un Sheets o una base compartida, cada comuna puede alimentar su inventario.
