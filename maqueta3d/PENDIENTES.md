# Maqueta 3D — avance y pendientes

25 de septiembre de 2026. Ejecutados los pasos 1 a 6 de `PROMPT_CODEX_3D.md`, más el mapa con datos reales solicitado por el equipo. El prompt exige detenerse al terminar cada paso.

- [x] Centralizar medidas, procedencia, marcadores y cálculos en `src/data/site.ts`.
- [x] Leer RETO-01 del portafolio local y copiarlo a la ruta documental indicada. La ficha respalda las 143 personas del caso.
- [x] Paso 2: escena general con Vite, React, TypeScript estricto, Fiber y Drei; órbita y vistas predefinidas.
- [x] Mapa de inventarios reales por comuna y barrio, amenazas, fichas y resumen descargable.
- [x] Nueve capas contrastadas con descarga oficial WFS: geometrías y atributos coinciden con los archivos archivados.
- [x] Distinguir cruce de amenaza de disponibilidad; conservar 52 registros sin comuna asignada.
- [x] Paso 3: refugio y equipamiento ilustrativo; cubiertas ocultables y vista de registro.
- [x] Mapa con calles por defecto y enlaces oficiales de Google Maps, satélite y Street View por coordenadas; acceso por espacio y zona visible.
- [x] Paso 4: acopio interactivo con siete sectores, ramal de descarte, ruta conceptual y pantalla de trazabilidad sin registro verificado.
- [ ] Incorporar un lote real verificado para completar cantidad, movimientos y hash; no hay datos de inventario confirmados.
- [x] Paso 5: estados y transiciones, reutilización de kits, riego ilustrativo y movimiento reducido.
- [x] Paso 6: siete capturas 1920 × 1080, GLB estático de emergencia, guía y revisión final.

## Alcance de la etapa de mediciones

La validación con entidades queda fuera de esta etapa por instrucción del usuario; no se marca como realizada. Ver `deliverables/mediciones/LEEME.md`. Huella cartográfica candidata a voleibol medida; identidad exacta, dimensiones interiores, alturas y superficie libre siguen pendientes. Miguel Calero figura oficialmente como coliseo de hockey en línea: la referencia de campo abierto del modelo no es una medida real del sitio.

## Datos y restricciones por resolver

- Confirmar medidas reales y orientación del hockey; posiciones aproximadas según el prompt, sin coordenadas originales disponibles.
- Medir huella, altura, número de canchas y área de techo de los coliseos; medir el diamante, baños existentes, accesos y rampas. Los valores desconocidos son `null`, nunca cero.
- Verificar las referencias deportivas enlazadas en la propuesta y la edición aplicable de Esfera. Las dimensiones se conservan exactamente como exige el prompt, pero no se presentan como mediciones del sitio.
- Validar distribución física: las 5 huellas interiores reconfiguradas conservan 70 m² por kit y caben geométricamente en 24 × 15 m sin solapamiento. Esto no valida evacuación, circulaciones, accesibilidad ni aforo.
- Definir cantidad y capacidad útil de tanques, suministro diario, dimensiones y potencia del kit solar. No deducir disponibilidad de agua del volumen exterior.
- El producto 143×15 = 2.145 L/día reproduce el cálculo solicitado para uso no potable; verificar su interpretación frente a Esfera antes de usarlo operativamente.
- No implementar registro nominal ni enlaces a personas: prevalece AGENTS.md. El eventual lector será utilería; cualquier código será ficticio, sin asociación individual.
- Diferencia entre prompt y AGENTS.md resuelta en la implementación: la pantalla de trazabilidad conserva todos sus campos, pero muestra “Sin registro verificado”. AGENTS.md solo permite simular IoT/ocupación; no se fabrican lotes, movimientos, existencias ni hashes. Incorporar datos reales cuando los valide la entidad.
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
- Paso siguiente a esta entrega histórica: centro de acopio y ruta al refugio (resuelto en el paso 4).

**Verificación del paso 3:** compilación de producción/TypeScript estricto aprobados; 7 pruebas de lógica/geometría y 4 pruebas de navegador aprobadas. Revisión visual y repetición dirigida de refugio después de corregir etiquetas y sombras.

## Paso 4 — centro de acopio y conexión al refugio

- Siete sectores: necesidades, recepción, clasificación, descarte, bodega, despacho y trazabilidad. Selección por etiquetas 3D o botones accesibles.
- Mobiliario ilustrativo: cartelera con requerimientos calculados, mesa, contenedores por categoría, estanterías, plataformas de despacho y pantalla. No representa existencias reales.
- Flechas: aceptados hacia bodega/despacho; rechazados hacia descarte, sin retorno al circuito. El enlace a trazabilidad representa un registro, no transporte de insumos.
- Ruta desde despacho hasta el acceso propuesto junto al registro del refugio, con vista dedicada y control para mostrarla/ocultarla. No es ruta vial ni de evacuación; falta medir y verificar accesos/obstáculos reales.
- `src/data/site.ts` centraliza sectores, mobiliario, ruta, cámaras y campos de trazabilidad; `src/Storage.tsx` construye las vistas y el panel del proceso.
- Trazabilidad: lote, tipo, cantidad, origen, destino y hash quedan pendientes de fuente verificada. No hay conexión blockchain ni transacciones. La ausencia de datos no se representa como saldo cero.
- Comprobar con los responsables distribución de recepción, condiciones de almacenamiento, accesibilidad, disposición del descarte, administración y circulación real.
- Capturas del paso: `acopio.png`, `trazabilidad.png` y `ruta_refugio.png` en `deliverables/renders/`, a 1920 × 1080.
- Pendientes generales: estados y transiciones (paso 5), exportación GLB y revisión final (paso 6).

**Verificación del paso 4:** compilación de producción/TypeScript estricto aprobados; 11 pruebas de lógica/geometría y 6 de navegador aprobadas. Capturas revisadas, incluida la separación de etiquetas en la ruta.

## Paso 5 — estados y transiciones

- Selector de uso cotidiano, emergencia por sismo y recuperación; estado anunciado y controles por teclado.
- Ocho kits reutilizados: feria, distribución de refugio y compactación/retorno a bodega. Cambios de destino durante la animación sin reiniciar la posición.
- Riego ilustrativo con los tanques existentes; acopio vacío en uso cotidiano. No se afirma suministro real ni evento programado.
- En recuperación se retira equipamiento temporal del campo/coliseo. La animación no certifica inventario, acta, limpieza ni autorización de retorno.
- Movimiento reducido automático por preferencia del sistema y control manual.
- Capturas de revisión: `cotidiano.png` y `recuperacion.png` a 1920 × 1080. Pendiente paso 6: exportación GLB de emergencia y revisión/capturas finales.

**Verificación del paso 5:** compilación de producción/TypeScript estricto aprobados; 12 pruebas de lógica/geometría y 8 de navegador aprobadas por bloques, con repetición del ciclo tras corregir encuadre y etiquetas. Revisión visual de cotidiano y recuperación completada.

## Paso 6 — entrega final de la maqueta

- Descarga GLB local habilitada solo en emergencia, al terminar la transición y con cubiertas/ruta visibles. No exporta posiciones intermedias ni modifica la escena interactiva.
- GLB estático con metadatos de procedencia, unidades, cantidades y advertencias. Etiquetas/pantallas HTML, animaciones, mapa y recuadro externo de Evangelista Mora se consultan en aplicación/capturas; no forman parte de la geometría exportada.
- Siete capturas requeridas a 1920 × 1080, guía `deliverables/renders/LEEME.md`, informe `validacion_glb.json` y manifiesto SHA-256.
- Revisión final: sin información individual, logos ni obra civil; edificios genéricos, equipo ilustrativo, registro SIMULADO, agua de uso no potable y trazabilidad pendiente de fuente real. No se certifica aptitud ni se sustituye a la autoridad, evaluación estructural o Bomberos.
- Los seis pasos de construcción están entregados. Permanecen abiertos los datos y validaciones operativas de las secciones anteriores.

**Verificación del paso 6:** compilación aprobada; 12 pruebas de lógica/geometría y 9 de navegador aprobadas por bloques. GLB recargable, cantidades/posiciones verificadas; glTF Validator: 0 errores y 0 advertencias (avisos informativos de UV sin textura y nodos vacíos de etiquetas HTML). Siete capturas 1920 × 1080 revisadas y manifiesto SHA-256 generado.

## Preparación por espacio seleccionado

- [x] Corregir la asociación de Miguel Calero con un campo abierto: existe como coliseo; demostración anterior rotulada conceptual, sin eliminar registros reales.
- [x] Conectar selección del mapa con preparación, huella plana automática y vínculos Google Maps. Puntos sin contorno mantienen geometría desconocida.
- [x] Preselección de hasta tres EPOU del sector por cercanía tras reglas de inundación/licuación; sequía sin candidatos por falta de datos.
- [x] Necesidades por población simulada, brechas desconocidas separadas de cero, responsables propuestos, seguimiento local y exportación JSON.
- [ ] Distribución interior real de kits, alturas, superficies útiles, accesos y obstáculos. No se sustituye con el área total del predio.
- [ ] Aptitud operacional y brechas cuantificadas cuando existan aforos/servicios medidos. Validación con entidades fuera de la etapa actual.

## Revisión visual: cubiertas y agua

- [x] Instalar y leer skills Three.js: R3F, iluminación, materiales y geometría (proveedor/revisión en la bitácora).
- [x] Techos opacos con pendiente y estructura, bases/apoyos y cubiertas del acopio, registro y retorno a bodega.
- [x] Vista de corte identificada al ocultar cubiertas; conserva bloqueo de exportación incompleta.
- [x] Vista “Sistema de agua”: recipientes superficiales propuestos, canaleta, bajantes, filtros, rebose, válvula y bomba; explicación accesible en HTML.
- [x] Vista cercana “Albergue exterior” y sombras ajustadas por encuadre.
- [ ] Cálculo de cargas y anclajes; selección/dimensionamiento hidráulico, primeras aguas, calidad, energía y destino de rebose. No son resultados de la maqueta.

Las referencias históricas a cubiertas transparentes quedan sustituidas por esta revisión. Las formas constructivas siguen siendo propuestas por verificar, no instalaciones medidas. La visualización no incorpora un simulador físico ni certifica estabilidad o suministro.
