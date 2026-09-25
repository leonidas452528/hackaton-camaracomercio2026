# Cali Activa · mapa territorial y maqueta 3D

Aplicación local con Vite, React, TypeScript estricto, Leaflet y React Three Fiber/Drei. Mapa con archivos reales de IDESC y escena del refugio y centro de acopio del sitio piloto (seis pasos del prompt completados). No hay disponibilidad operativa confirmada en los datos.

## Abrir

Requiere Node 22.12 o posterior compatible con Vite y npm.

```bash
cd maqueta3d
npm ci                         # instala versiones del lockfile
npm run dev                    # abre http://localhost:5173
npm run build                  # valida TypeScript y genera dist/
npm run preview                # sirve dist/ localmente
```

El mapa permite buscar, filtrar por comuna, barrio/sector, fuente y cruce de amenaza; activar límites y amenazas; seleccionar fichas y descargar `sectores.csv`. Los polígonos, puntos y capas se sirven desde la aplicación. La capa de calles está activada por defecto y usa OpenStreetMap por internet. Puede desactivarse; si falla, las geometrías locales siguen disponibles. Cada ficha y el panel del mapa enlazan las coordenadas a Google Maps, vista satélite y Street View. El enlace de zona sigue el centro y zoom al desplazar el mapa. Google Maps se abre en otra pestaña: no se incrustan teselas de Google ni se requiere clave de API. Las tipografías tienen sustitutos locales si no hay conexión.

## Datos y regeneración

```bash
npm run data                   # genera public/data/ desde raw/ del repositorio
python3 scripts/check-sources.py # compara fuentes archivadas con descargas WFS actuales
npm test                       # geometrías, conservación de registros y minimización
npx playwright install chromium # instala navegador para las pruebas
npm run test:e2e                # filtros, fichas, 3D, móvil y capturas
```

- 1.970 huellas de espacio público y 1.021 registros deportivos. Pueden superponerse: no son 2.991 lugares únicos ni plazas de alojamiento.
- Comuna y barrio se asignan al punto representativo de la geometría usando 22 comunas y 342 barrios/sectores archivados. Los 52 registros sin comuna no se fuerzan a una división administrativa.
- Las amenazas se cruzan contra toda la huella de EPOU (incluye contacto con borde); en deporte se cruza solo el punto disponible. No usar esto como evaluación de riesgo integral.
- Los atributos exportados están en una lista explícita; se omiten nombres de visitadores, contactos e identificadores prediales.
- `manifest.json` conserva las URL primarias, licencias, conteos y SHA-256 de las fuentes archivadas. `source-checks.json` registra la comparación remota del 25 de septiembre: las nueve capas coincidieron en geometrías y atributos, ignorando IDs transitorios WFS. La comparación no certifica que el inventario refleje condiciones operativas actuales.
- `summary.json` y `sectores.csv` resumen registros por comuna/barrio, incluidas filas sin asignar. `spaces.json` contiene las geometrías y fichas depuradas. El estado de disponibilidad es **por confirmar** para todos los registros; cero confirmaciones no significa cero espacios disponibles.

**Reglas:** cruce detectado → requiere revisión específica de esa amenaza; sin cruce → no hay evidencia de intersección en esas capas, no implica seguridad. Faltan remoción en masa, incendios, sequía, otras condiciones sísmicas, evaluación estructural, acceso, administración, servicios y autorización. La condición “Adecuado” del inventario no es concepto técnico vigente.

**Atribución y licencia de datos derivados:** Alcaldía de Santiago de Cali · DAPM / IDESC y Secretaría del Deporte y la Recreación. CC BY-SA 4.0: https://creativecommons.org/licenses/by-sa/4.0/. Las fuentes y descargas se consultan en la interfaz y en `../prototipo/datos/FUENTES.md`.

## Alcance de la maqueta

La pestaña 3D muestra el hockey, el volumen genérico del coliseo y el diamante en las posiciones aproximadas de la propuesta. Incluye órbita, vistas predefinidas y recuadro de Evangelista Mora. Las dimensiones y cantidades están en `src/data/site.ts`. La escena **no está georreferenciada al mapa**: hay que confirmar la identidad y posición de los escenarios genéricos del catálogo. No se inventaron coordenadas para enlazarlos.

Los seis pasos del prompt están completados. La entrega en `deliverables/renders/` incluye siete capturas 1920 × 1080 y el GLB estático de emergencia; los pendientes de datos y validación operativa permanecen en `PENDIENTES.md`.

## Reconocer los espacios en Google Maps

Seleccionar un registro o un punto/polígono y usar **Abrir espacio en Google Maps**, **Vista satélite** o **Street View**. El enlace lleva al punto de referencia IDESC; no se inventan direcciones ni Place IDs. No se garantiza una entrada física ni cobertura de Street View. Comprobar siempre la fecha de la imagen y los accesos con la entidad responsable. La aplicación no solicita geolocalización del usuario.

Referencia técnica oficial: https://developers.google.com/maps/documentation/urls/get-started. Las URLs incluyen `api=1` y convierten GeoJSON `[longitud, latitud]` a `latitud,longitud`; no requieren clave. El mapa dentro de la aplicación conserva la base OpenStreetMap y las geometrías IDESC con su atribución.

## Refugio ilustrativo · paso 3

La vista 3D incorpora 5 kits interiores, 3 exteriores con cubierta, 5 particiones por kit, 2 módulos cerrados (NNA y salud), 8 baños, un kit solar, dos tanques ilustrativos con bajantes y mesa/lector/pantalla de registro. Todos los tamaños y posiciones están en `src/data/site.ts`.

Las huellas interiores se reconfiguran en franjas de 4,8 × (70/4,8) m para conservar 70 m² por kit dentro de la referencia 24 × 15 m. Las cubiertas exteriores conservan 10 × 7 m. Las pruebas verifican contención y ausencia de solapamiento geométrico, **no** evacuación, aforo, accesibilidad ni estabilidad. El diseño debe validarse profesionalmente.

El registro muestra el código ficticio `DEMO-0001` y conteos agregados SIMULADOS; no existe registro nominal ni asociación del código con una persona. Las cantidades del equipamiento no representan instalaciones reales; el número operativo de tanques y su capacidad útil siguen sin confirmar.

Controles: vistas General, Campo de hockey, Coliseo, Punto de registro y Acopio; órbita; mostrar/ocultar cubiertas para examinar las particiones. Las imágenes `refugio_coliseo.png`, `refugio_campo.png` y `registro.png` documentan este paso a 1920 × 1080.

## Centro de acopio · paso 4

En la pestaña **Demostración de refugio**, abrir **Acopio**. Las siete etiquetas 3D y los botones del panel permiten seleccionar sectores y consultar su función. La clasificación tiene cinco categorías; los insumos rechazados siguen un ramal independiente hacia descarte. La bodega contiene estanterías ilustrativas, sin representar cantidades de existencias.

La cartelera muestra los requerimientos brutos calculados para el caso de la ficha; no son faltantes, pues se desconoce el inventario. **Pantalla de trazabilidad** abre una vista cercana con los campos lote, tipo, cantidad, origen, destino y hash. Se muestran pendientes de fuente verificada: el prompt sugería un lote simulado, pero AGENTS.md limita la simulación a IoT y ocupación. No se fabricaron datos ni un hash. No hay blockchain conectada.

**Ruta al refugio** encuadra el enlace desde despacho hasta el acceso propuesto junto al registro. Puede ocultarse con **Mostrar ruta conceptual**. Es un trazado ilustrativo sin georreferenciación, no una ruta vial ni de evacuación; requiere verificación en sitio.

Las medidas, cámaras, cantidades de mobiliario y posiciones están en `src/data/site.ts`; la escena y el panel en `src/Storage.tsx`. Pruebas en `scripts/storage.test.mjs` (encaje, ramal de descarte, ruta e integridad de la pantalla) y `tests/storage.spec.ts` (interacción, móvil, teclado y capturas). Las capturas `acopio.png`, `trazabilidad.png` y `ruta_refugio.png` se generan a 1920 × 1080.

## Estados de la maqueta

En **Demostración de refugio**, usa **Uso cotidiano**, **Emergencia (sismo)** y **Recuperación**. Los ocho kits pasan de stands de feria a refugio y después se compactan y regresan a la bodega ilustrativa. En uso cotidiano hay una conexión de riego superficial de uso no potable; el acopio queda vacío. Puedes cambiar de destino durante una transición.

**Reducir movimiento** elimina la animación y respeta inicialmente la preferencia del sistema. El selector solo cambia la representación; no activa espacios, certifica condiciones ni registra movimientos de inventario. Recuperación requiere revisión, limpieza y acta por los responsables. La exportación GLB y las capturas se describen a continuación.

## Entrega GLB y capturas

En emergencia, con la transición terminada, cubiertas y ruta visibles, usa **Descargar emergencia en GLB**. El archivo se genera localmente con la geometría y metadatos de procedencia/limitaciones. No contiene etiquetas ni pantallas HTML, controles, mapa o animaciones: se consultan en la aplicación y capturas.

```bash
npm run deliverables         # regenera las siete capturas y el GLB; valida y genera manifiesto
npm run verify:deliverables  # verifica GLB y dimensiones; actualiza manifiesto SHA-256
```

Guía completa en [deliverables/renders/LEEME.md](deliverables/renders/LEEME.md). Informe de glTF Validator en `validacion_glb.json`, huellas en `manifest.json`. Ninguno de estos archivos acredita disponibilidad, aforo, evaluación estructural ni autorización de activación.

## Preparar un espacio seleccionado

1. En el mapa, selecciona un registro y pulsa **Preparar este espacio**.
2. Elige inundación o sismo y un conteo de personas **SIMULADO**. Sequía informa que faltan datos.
3. Revisa hasta tres candidatos EPOU del sector (comuna/barrio), ordenados por distancia recta tras los descartes territoriales. El número de personas cambia necesidades, no el orden sin aforos confirmados.
4. Al elegir un candidato se adapta automáticamente su huella, conservando huecos y multipolígonos. Los puntos sin contorno no reciben una geometría inventada. La distribución interior de kits requiere superficie útil/accesos/obstáculos medidos.
5. Revisa necesidades y brechas: si no se conoce existencia, el faltante queda desconocido. Responsables propuestos por el equipo, sin validación con entidades. Guarda seguimiento local (“Por medir”/“En revisión”) y descarga el borrador JSON.

La pestaña **Demostración de refugio** conserva el ejemplo fijo. El campo dibujado no representa dimensiones reales de Miguel Calero, que sí es un coliseo real de hockey en línea. El aviso y la fuente municipal están en pantalla.

Reglas en `src/planning.ts`, parámetros/referencias en `src/data/site.ts`, vista en `src/Intervention.tsx` y geometría adaptable en `src/SelectedSpaceScene.tsx`. El nuevo cálculo de agua contempla necesidades básicas, no exclusivamente uso no potable. Referencias Esfera contextualizables: no certificados de cumplimiento.

### Cubiertas y sistema de agua

En **Demostración de refugio**, usa **Albergue exterior** para revisar la cubierta y sus apoyos, y **Sistema de agua** para ver la propuesta junto al coliseo y leer el recorrido captación → filtrado propuesto → almacenamiento → servicio no potable. La bomba, las bases y las conexiones son geometría conceptual; no acreditan capacidad, calidad o caudal.

**Mostrar cubiertas** permanece activado por defecto. Al desactivarlo aparece una **Vista de corte** para inspeccionar interiores. La exportación GLB exige cubiertas visibles. El modelo contiene techos opacos también en acopio, registro y bodega de retorno.

Skills locales utilizadas: `threejs-r3f`, `threejs-lighting`, `threejs-materials`, `threejs-geometry`, de [cesartevisual/threejs-skills](https://github.com/cesartevisual/threejs-skills), revisión `84f9bcb4bea1f7a28d57fe7f0af78f7f9c3dc467`. No son dependencias necesarias para ejecutar la aplicación. WorldSkills es la referencia de la especialidad indicada por el usuario, no el proveedor de esas skills.

### Preparación ante incendios

**Mapa → seleccionar espacio → Preparar este espacio → Amenaza del escenario** permite elegir **Incendio forestal** o **Incendio en edificación**. Cada subtipo muestra la información pendiente, seguimiento local y exportación JSON. No hay una capa de incendio verificada ni datos vigentes del incidente incorporados: ambos escenarios mantienen la preselección sin candidatos. Cambiar una tarea a “En revisión” no acredita seguridad ni habilita espacios.

La selección del mapa no representa el foco de un incendio. Las necesidades de agua son humanitarias, no de extinción; los tanques 3D no constituyen una red contra incendios. No se simulan fuego, humo o evacuación y no se emiten conceptos de Bomberos. La validación con entidades sigue fuera de esta etapa.

### Avisos de acopio a la población

En la ficha de **Preparar intervención**, abre **Preparar aviso SMS de acopio**. El borrador incluye ubicación real en Google Maps e información propuesta de horario y ayudas, para toda la población, sin clasificar damnificados. Permite copiar y descargar JSON. Los campos se limpian al cambiar de espacio.

**Canal SMS SIMULADO:** pulsa **Simular envío masivo** para recorrer una entrega ficticia completa o con pendientes. No usa un proveedor ni envía mensajes reales; las cifras de audiencia y entrega están marcadas como simuladas. No pide ni guarda teléfonos. Como no hay puntos habilitados confirmados, el borrador indica que no se debe acudir todavía; no es un aviso oficial de apertura.

La pestaña **04 Análisis preventivo** ofrece orientación educativa por amenaza, una lista personal sin persistencia y una pregunta interactiva sobre la apertura de los puntos. Incluye fuentes UNGRD y acceso al mapa. El guion de demostración está en `../entregables/guion_prevencion_difusion.md`.
