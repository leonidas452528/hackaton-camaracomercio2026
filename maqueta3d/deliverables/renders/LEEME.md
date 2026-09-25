# Cali Activa — entrega de la maqueta 3D

Escena **conceptual e ilustrativa**, inspirada en la propuesta del complejo Jaime Aparicio. El campo abierto no representa dimensiones reales de Miguel Calero (coliseo de hockey en línea). Una unidad representa un metro; posiciones aproximadas y orientación por verificar. Los edificios son volúmenes genéricos, no levantamientos ni fachadas reales.

## Archivos

- `cali_activa.glb`: geometría estática del estado **Emergencia (sismo)**, con cubiertas y ruta conceptual visibles. Abrir en un visor compatible con glTF 2.0 o importar en Blender. Sus metadatos incluyen procedencia, cantidades, límites y trazabilidad sin registro verificado.
- `general.png`, `refugio_coliseo.png`, `refugio_campo.png`, `acopio.png`, `registro.png`, `cotidiano.png`, `recuperacion.png`: capturas de la interfaz a **1920 × 1080**. En la vista del coliseo se oculta la cubierta para observar las particiones.
- `validacion_glb.json`: informe generado con glTF Validator de Khronos, versión fijada en `package-lock.json`. Resultado: 0 errores y 0 advertencias; avisos informativos por UV sin textura y nodos vacíos de etiquetas HTML.
- `manifest.json`: tamaño y SHA-256 de los ocho entregables anteriores, dimensiones de capturas y resumen de validación del GLB.

El GLB no contiene etiquetas/pantallas HTML, controles de interacción, animaciones ni el mapa territorial. Las pantallas y sus leyendas se consultan en las capturas; los tres estados animados, en la aplicación. El recuadro informativo de Evangelista Mora es externo a la escena y tampoco se exporta como edificio contiguo.

## Alcance y procedencia

- Ocho kits propuestos (cinco interiores y tres exteriores), cuarenta particiones, ocho baños y dos módulos cerrados; las cantidades de kits/baños se calculan en `src/data/site.ts` a partir del caso de 143 personas de la ficha RETO-01.
- Equipos, distribución, mobiliario y ruta son ilustrativos. Los dos tanques dibujados no acreditan inventario ni capacidad útil. El cálculo de 2.145 L/día de uso no potable requiere validar su interpretación y el suministro real.
- Los conteos y código del registro son **SIMULADOS**, sin vinculación individual. La trazabilidad carece de lote real verificado: no se fabrican existencias ni hashes. No hay datos personales, reconocimiento facial, logos ni obras civiles.
- La activación corresponde a la autoridad. La maqueta no sustituye evaluación estructural ni conceptos de Bomberos, no certifica aforo/accesibilidad ni acredita disponibilidad actual. La ruta no es vial ni de evacuación. La recuperación no certifica limpieza, revisión o acta de retorno.
- Fuentes internas: `docs/portafolio_retos_alcaldia_cali.pdf` (RETO-01), `docs/propuesta_cali_activa.md`, `PROMPT_CODEX_3D.md`; evidencia detallada en `src/data/site.ts` y pendientes en `maqueta3d/PENDIENTES.md`.
- El mapa de la aplicación usa datos reales IDESC con atribuciones en `public/data/manifest.json` y `prototipo/datos/FUENTES.md`; no forma parte de este GLB ni demuestra disponibilidad operativa.

## Regenerar

Desde `maqueta3d/`, con dependencias y Chromium instalados:

```bash
npm run deliverables         # Playwright: siete capturas y descarga GLB; valida y genera manifiesto
npm run verify:deliverables  # verifica GLB, dimensiones y regenera las huellas
npm run build                # TypeScript estricto y producción
```

El navegador también permite **Descargar emergencia en GLB** cuando se ha completado la transición a emergencia y están visibles las cubiertas y la ruta. La exportación se realiza localmente; no sube el modelo a servicios externos.

## Preparación territorial

La aplicación incorpora “Preparar este espacio” desde el mapa: adapta automáticamente la huella real IDESC, compara candidatos y calcula necesidades. `intervencion.png` documenta ese flujo y tiene formato de página completa, distinto de las siete capturas 1920 × 1080. El GLB de esta carpeta corresponde exclusivamente a la demostración conceptual; no es la exportación del espacio elegido en el mapa.

## Revisión de cubiertas y agua

- `coliseo_cubierto.png`: cubierta opaca, estructura y tanques junto al lateral; dimensiones conceptuales.
- `albergue_exterior.png`: vista cercana de carpa, faldones y apoyos propuestos.
- `sistema_agua.png`: canaleta, bajantes y recipientes superficiales propuestos, con conexiones para uso no potable. No representa capacidad/caudal verificados ni cisternas existentes.
- `refugio_coliseo.png` muestra intencionadamente una **vista de corte**, rotulada en la interfaz; el techo se conserva en el GLB completo.

La revisión reemplaza los techos transparentes de versiones anteriores. No acredita un diseño estructural o hidráulico calculado.
