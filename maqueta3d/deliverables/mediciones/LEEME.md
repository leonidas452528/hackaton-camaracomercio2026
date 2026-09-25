# Mediciones preliminares del sitio piloto

25 de septiembre de 2026. La validación con entidades queda **fuera de esta etapa por decisión del usuario**. Se mantienen los límites técnicos: esto no certifica disponibilidad, estructura, seguridad ni autorización de uso.

## Resultado medido en cartografía

La construcción `cat_bas_construcciones.2992614` del WFS Catastro/IDESC contiene los tres puntos de voleibol del catálogo (`deporte-230`, `deporte-268` y `deporte-791`). Se trata de un **candidato al Coliseo Francisco Chois**, cuya identificación exacta sigue por confirmar.

| Magnitud | Estimación | Interpretación |
|---|---:|---|
| Huella | 3.069 m² | Polígono de construcción; no superficie libre |
| Perímetro | 236,7 m | Contorno cartográfico |
| Rectángulo envolvente | 68,7 × 47,0 m | Caja que contiene el polígono; no dimensiones interiores |
| Orientación del eje largo | 47,5° / 227,5° | Respecto al norte geográfico; no orientación confirmada de canchas |
| Altura libre / superficie útil | Sin dato | No deducibles de esta geometría |
| Número de canchas | Sin confirmar | Tres puntos no equivalen a tres canchas actuales |

Ver [plano de la huella](huella_voleibol.svg), [datos y método](mediciones.json) y [distancias entre puntos del catálogo](distancias_catalogo.csv). Las coordenadas y enlaces a Google Maps están en el JSON. Las distancias son rectas entre puntos inventariados, no rutas peatonales ni distancias entre accesos. Se calculan desde **dos candidatos distintos a hockey**, sin asignar uno automáticamente al piloto.

La precisión indicada por el redondeo no es la exactitud de la fuente. Antigüedad de las construcciones y precisión cartográfica sin verificar. El polígono puede incluir espacios no utilizables y no determina área de techo inclinado.

## Discrepancia del hockey

La [Alcaldía identifica a Miguel Calero como coliseo de hockey en línea](https://www.cali.gov.co/deportes/publicaciones/139089/escenarios-gratuitos/). La propuesta y la maqueta usan una referencia de campo abierto de 91,40 × 55 m: **no es una medición de Miguel Calero ni debe usarse para deducir su área disponible**. La ficha [turística de IDESC](https://idesc.cali.gov.co/download/turismo/recursos_zonas/RT-65-C19p.pdf) también lo denomina coliseo.

No se encontró una construcción que contenga el punto `deporte-225` en el recorte consultado; esto no demuestra ausencia de edificio. El punto alternativo `deporte-535` está fuera del recorte de construcciones y no se evaluó su contención. La identidad, planta y dimensiones actuales de hockey quedan pendientes. Se conserva la maqueta previa como distribución conceptual **sin recalibración automática**; no se sustituye el dato desconocido por una medida reglamentaria de otra disciplina.

## Otros escenarios

- **Evangelista Mora:** la [ficha municipal](https://www.cali.gov.co/deportes/publicaciones/131771/unidades-deportivas-de-alto-rendimiento/) publica 3.586 m² de área. No especifica que sea superficie libre interior: se registra como referencia documental, no como medición nueva ni aforo de alojamiento.
- **Béisbol:** el punto `deporte-229` permite calcular distancias, pero no describe el contorno del campo. La huella 60 × 60 m del modelo sigue siendo ilustrativa.
- **Voleibol:** el nuevo polígono permite medir la huella candidata; faltan identificación exacta, altura libre, obstáculos e interiores. No se aumenta el número de kits por dividir su área total.

## Procedencia y reproducción

Fuente geométrica: [Catastro / IDESC, servicio WFS](https://ws-idesc.cali.gov.co/geoserver/ows?service=WFS&version=1.0.0&request=GetCapabilities). La descarga exacta y licencia **por verificar** se registraron en `prototipo/datos/FUENTES.md` y `fuentes.csv`. Solo se solicitó geometría: sin atributos personales o prediales. No se presume la licencia de otra capa.

```bash
node maqueta3d/scripts/measure-pilot.mjs  # recalcula medidas, distancias y plano desde el archivo archivado
```

Método: área esférica y perímetro geodésico con Turf; rectángulo de mínima área en proyección equirectangular local. Inspección de fuente, asociación espacial y resultados reproducibles; no levantamiento topográfico ni medición en sitio.
