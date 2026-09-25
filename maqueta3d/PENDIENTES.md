# Maqueta 3D — avance y pendientes

25 de septiembre de 2026. Ejecutado únicamente el paso 1 de `PROMPT_CODEX_3D.md`, que exige detenerse al terminar cada paso.

- [x] Centralizar medidas, procedencia, marcadores y cálculos en `src/data/site.ts`.
- [x] Leer RETO-01 del portafolio local y copiarlo a la ruta documental indicada. La ficha respalda las 143 personas del caso.
- [ ] Paso 2: escena general con Vite, React, TypeScript estricto, Fiber y Drei.
- [ ] Paso 3: refugio y equipamiento.
- [ ] Paso 4: acopio y ruta.
- [ ] Paso 5: estados y transiciones.
- [ ] Paso 6: capturas, GLB y revisión final.

## Datos y restricciones por resolver

- Confirmar medidas reales y orientación del hockey; posiciones aproximadas según el prompt, sin coordenadas originales disponibles.
- Medir huella, altura, número de canchas y área de techo de los coliseos; medir el diamante, baños existentes, accesos y rampas. Los valores desconocidos son `null`, nunca cero.
- Verificar las referencias deportivas enlazadas en la propuesta y la edición aplicable de Esfera. Las dimensiones se conservan exactamente como exige el prompt, pero no se presentan como mediciones del sitio.
- Validar distribución física: 360/70 permite calcular 5 kits por área, pero no demuestra que encajen ni que se cumplan circulaciones o evacuación.
- Definir cantidad y capacidad útil de tanques, suministro diario, dimensiones y potencia del kit solar. No deducir disponibilidad de agua del volumen exterior.
- El producto 143×15 = 2.145 L/día reproduce el cálculo solicitado para uso no potable; verificar su interpretación frente a Esfera antes de usarlo operativamente.
- No implementar registro nominal ni enlaces a personas: prevalece AGENTS.md. El eventual lector será utilería; cualquier código será ficticio, sin asociación individual.
- La propuesta contempla trazabilidad simulada de lotes; aclarar su excepción frente a AGENTS.md (que limita simulación a IoT y ocupación) antes del paso 4. No cargar inventarios ficticios como datos reales.
- No hay evidencia de evaluación estructural vigente ni de activación autorizada del escenario. La maqueta no certifica ninguna de ellas.

## Revisión del paso 1

Sin datos personales, logos ni obras civiles. Medidas ilustrativas y datos desconocidos etiquetados; ocupación por ciclo vital marcada SIMULADA. Las futuras vistas deben mostrar las advertencias y atribuciones y usar contraste y lenguaje claro.
