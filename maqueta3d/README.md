# Cali Activa · mapa territorial y maqueta 3D

Aplicación local con Vite, React, TypeScript estricto, Leaflet y React Three Fiber/Drei. Mapa con archivos reales de IDESC y escena del refugio del sitio piloto (paso 3 del prompt). No hay disponibilidad operativa confirmada en los datos.

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

Quedan pendientes los pasos 4–6 del prompt: acopio, estados/transiciones, GLB y renders finales. Las capturas actuales en `deliverables/renders/` documentan el mapa y el refugio; no representan la escena completa con acopio y transiciones.

## Reconocer los espacios en Google Maps

Seleccionar un registro o un punto/polígono y usar **Abrir espacio en Google Maps**, **Vista satélite** o **Street View**. El enlace lleva al punto de referencia IDESC; no se inventan direcciones ni Place IDs. No se garantiza una entrada física ni cobertura de Street View. Comprobar siempre la fecha de la imagen y los accesos con la entidad responsable. La aplicación no solicita geolocalización del usuario.

Referencia técnica oficial: https://developers.google.com/maps/documentation/urls/get-started. Las URLs incluyen `api=1` y convierten GeoJSON `[longitud, latitud]` a `latitud,longitud`; no requieren clave. El mapa dentro de la aplicación conserva la base OpenStreetMap y las geometrías IDESC con su atribución.

## Refugio ilustrativo · paso 3

La vista 3D incorpora 5 kits interiores, 3 exteriores con cubierta, 5 particiones por kit, 2 módulos cerrados (NNA y salud), 8 baños, un kit solar, dos tanques ilustrativos con bajantes y mesa/lector/pantalla de registro. Todos los tamaños y posiciones están en `src/data/site.ts`.

Las huellas interiores se reconfiguran en franjas de 4,8 × (70/4,8) m para conservar 70 m² por kit dentro de la referencia 24 × 15 m. Las cubiertas exteriores conservan 10 × 7 m. Las pruebas verifican contención y ausencia de solapamiento geométrico, **no** evacuación, aforo, accesibilidad ni estabilidad. El diseño debe validarse profesionalmente.

El registro muestra el código ficticio `DEMO-0001` y conteos agregados SIMULADOS; no existe registro nominal ni asociación del código con una persona. Las cantidades del equipamiento no representan instalaciones reales; el número operativo de tanques y su capacidad útil siguen sin confirmar.

Controles: vistas General, Campo de hockey, Coliseo, Punto de registro y Acopio; órbita; mostrar/ocultar cubiertas para examinar las particiones. Las imágenes `refugio_coliseo.png`, `refugio_campo.png` y `registro.png` documentan este paso a 1920 × 1080.
