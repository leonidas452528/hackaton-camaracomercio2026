# Maqueta 3D — avance y pendientes

25 de septiembre de 2026. Ejecutados los pasos 1, 2 y 3 de `PROMPT_CODEX_3D.md`, más el mapa con datos reales solicitado por el equipo. El prompt exige detenerse al terminar cada paso.

- [x] Centralizar medidas, procedencia, marcadores y cálculos en `src/data/site.ts`.
- [x] Leer RETO-01 del portafolio local y copiarlo a la ruta documental indicada. La ficha respalda las 143 personas del caso.
- [x] Paso 2: escena general con Vite, React, TypeScript estricto, Fiber y Drei; órbita y vistas predefinidas.
- [x] Mapa de inventarios reales por comuna y barrio, amenazas, fichas y resumen descargable.
- [x] Nueve capas contrastadas con descarga oficial WFS: geometrías y atributos coinciden con los archivos archivados.
- [x] Distinguir cruce de amenaza de disponibilidad; conservar 52 registros sin comuna asignada.
- [x] Paso 3: refugio y equipamiento ilustrativo; cubiertas ocultables y vista de registro.
- [x] Mapa con calles por defecto y enlaces oficiales de Google Maps, satélite y Street View por coordenadas; acceso por espacio y zona visible.
- [ ] Paso 4: acopio y ruta.
- [ ] Paso 5: estados y transiciones.
- [ ] Paso 6: capturas, GLB y revisión final.

## Datos y restricciones por resolver

- Confirmar medidas reales y orientación del hockey; posiciones aproximadas según el prompt, sin coordenadas originales disponibles.
- Medir huella, altura, número de canchas y área de techo de los coliseos; medir el diamante, baños existentes, accesos y rampas. Los valores desconocidos son `null`, nunca cero.
- Verificar las referencias deportivas enlazadas en la propuesta y la edición aplicable de Esfera. Las dimensiones se conservan exactamente como exige el prompt, pero no se presentan como mediciones del sitio.
- Validar distribución física: las 5 huellas interiores reconfiguradas conservan 70 m² por kit y caben geométricamente en 24 × 15 m sin solapamiento. Esto no valida evacuación, circulaciones, accesibilidad ni aforo.
- Definir cantidad y capacidad útil de tanques, suministro diario, dimensiones y potencia del kit solar. No deducir disponibilidad de agua del volumen exterior.
- El producto 143×15 = 2.145 L/día reproduce el cálculo solicitado para uso no potable; verificar su interpretación frente a Esfera antes de usarlo operativamente.
- No implementar registro nominal ni enlaces a personas: prevalece AGENTS.md. El eventual lector será utilería; cualquier código será ficticio, sin asociación individual.
- La propuesta contempla trazabilidad simulada de lotes; aclarar su excepción frente a AGENTS.md (que limita simulación a IoT y ocupación) antes del paso 4. No cargar inventarios ficticios como datos reales.
- No hay evidencia de evaluación estructural vigente ni de activación autorizada del escenario. La maqueta no certifica ninguna de ellas.

## Revisión del paso 1

Sin datos personales, logos ni obras civiles. Medidas ilustrativas y datos desconocidos etiquetados; ocupación por ciclo vital marcada SIMULADA. Las futuras vistas deben mostrar las advertencias y atribuciones y usar contraste y lenguaje claro.

## Pendientes territoriales

- Confirmar disponibilidad, administración/acceso, aforo, agua, baños, accesibilidad y evaluación vigente con las entidades. No hay lista confirmada de zonas disponibles.
- Revisar 52 registros sin comuna y posibles duplicados entre inventario deportivo y EPOU. No sumar aforos ni superficies entre fuentes.
- Verificar identidad de los escenarios del piloto: el catálogo incluye varias canchas de hockey con nombres genéricos. Las coordenadas del mapa no sustituyen la medición del sitio.
- Incorporar otras amenazas antes de hacer recomendaciones multiamenaza operativas.

## Validación del paso 2 (histórico)

- `npm run build`: aprobado, TypeScript estricto y producción.
- `npm test`: 3 pruebas aprobadas (intersecciones de huella, huecos, integridad y atributos permitidos).
- `npm run test:e2e`: 2 pruebas aprobadas (escritorio con filtros/ficha/3D y móvil sin desbordamiento).
- Capturas revisadas: `deliverables/renders/mapa_cali.png`, `mapa_movil.png` y `general.png`. Son capturas de interfaz, no los renders finales de emergencia del paso 6.

## Paso 3 y corrección del mapa (25 de septiembre)

- Enlaces oficiales de Google Maps por coordenadas, mapa/satélite y Street View; sin clave ni ubicación personal. La base interna es OpenStreetMap con atribución visible.
- Cinco kits interiores sin cubierta propia, tres con cubierta exterior, cinco particiones por kit, ocho baños, módulos NNA/salud, kit solar, dos tanques **ilustrativos** y registro SIMULADO.
- Falta confirmar el número y capacidad de tanques necesarios; los dos dibujados no constituyen inventario real ni garantizan 2.145 L/día.
- Nuevas pruebas: orden latitud/longitud y URL oficiales; encaje/no solapamiento de huellas; integración Google con el mapa, fallo de calles y vista de refugio.
- Capturas del paso 3 en 1920 × 1080: `refugio_coliseo.png`, `refugio_campo.png`, `registro.png`. `mapa_google.png` documenta el mapa con calles y vínculos.
- Fuente técnica: https://developers.google.com/maps/documentation/urls/get-started.
- Siguiente paso del prompt: centro de acopio y ruta al refugio.

**Verificación del paso 3:** compilación de producción/TypeScript estricto aprobados; 7 pruebas de lógica/geometría y 4 pruebas de navegador aprobadas. Revisión visual y repetición dirigida de refugio después de corregir etiquetas y sombras.
