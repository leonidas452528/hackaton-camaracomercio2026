# Cali Activa · demostración animada de 80 segundos

**Archivo principal:** [cali-activa-80s.mp4](cali-activa-80s.mp4). Horizontal 1280 × 720, 24 fps, H.264 y AAC estéreo. Subtítulos incrustados y archivo [SRT](cali-activa-80s.srt). [Storyboard](storyboard.jpg).

La animación resume el proyecto; no es una grabación literal de la interfaz ni una alerta vigente. Personajes ficticios, ilustraciones y música instrumental creadas por código para esta pieza. Dos voces sintéticas en español de Colombia, sin imitación de personas del equipo. El servicio de síntesis recibe exclusivamente el texto público del guion, nunca datos personales.

## Recorrido

| Tiempo | Escena |
|---|---|
| 00:00–00:08 | Problema y propuesta |
| 00:08–00:18 | Aprendizaje preventivo antes, durante y después |
| 00:18–00:29 | Mapa real, amenaza, criterios y ubicación |
| 00:29–00:40 | Acopio: descontar reservas y bloquear sobreocupación propuesta |
| 00:40–00:50 | Necesidades, brechas por verificar y responsables propuestos |
| 00:50–01:00 | La autoridad decide; no sustituye evaluaciones ni Bomberos |
| 01:00–01:11 | Aviso de acopio y SMS SIMULADO, sin apertura confirmada |
| 01:11–01:20 | Retorno al uso cotidiano, revisión y acta como flujo del proyecto |

El guion exacto está en [src/guion.json](src/guion.json). El retorno se presenta como parte del proyecto, no como una devolución de un predio efectivamente ejecutada. El balance de acopio es una estimación por superficie, no un aforo ni una comprobación de encaje físico. No se muestran cifras inventadas como mediciones reales.

## Fuentes y créditos

- Cartografía real: **Alcaldía de Santiago de Cali – DAPM / IDESC, datos.cali.gov.co**. Inventario archivado el 25 de septiembre de 2026, en `maqueta3d/public/data/`.
- Espacio mostrado: **epou-9465**, Parque · Colinas del Sur · EPE_1064. Su aparición no acredita apertura.
- [Espacio público efectivo](https://datos.cali.gov.co/dataset/epou-espacio-publico-efectivo), CC BY-SA según catálogo del proyecto.
- [Comunas de Santiago de Cali](https://www.datos.gov.co/dataset/Comunas-de-Santiago-de-Cali/dx2g-2mhm), CC BY según catálogo del proyecto.
- Transformación: ajuste de escala y dibujo de geometrías originales. Mapas derivados bajo **CC BY-SA 4.0**, con atribución visible. Descargas y licencias completas en `prototipo/datos/FUENTES.md`.
- Contenido funcional: `docs/PROYECTO.md`, apartados 6.10–6.16. Sin nuevos datos de emergencias.
- Síntesis: `es-CO-SalomeNeural` y `es-CO-GonzaloNeural` mediante [edge-tts](https://github.com/rany2/edge-tts). Montaje con [FFmpeg](https://ffmpeg.org/). Tipografía DejaVu Sans.

## Regenerar

Instalar FFmpeg y las dependencias de `src/requirements.txt` en un entorno virtual. Desde la raíz del repositorio:

```bash
python entregables/video/src/render.py --audio-only
python entregables/video/src/render.py --preview
python entregables/video/src/render.py
```

Puede indicarse FFmpeg con `CALI_VIDEO_FFMPEG`. Las voces se reutilizan desde `audio/` (intermedios ignorados por Git). El script ajusta el tiempo de narración sin recortarla, mezcla música original y efectos suaves, y codifica exactamente 1.920 fotogramas. Los subtítulos se reparten en frases dentro de cada turno de voz.

## Verificación

Duración comprobada: **80,000 segundos**; **1.920 fotogramas**. Decodificación completa sin errores, audio presente en las ocho escenas y 22 bloques de subtítulos dentro del tiempo disponible. Ver [verificacion.json](verificacion.json). Ejecutar `python entregables/video/src/verify.py` para repetir el control técnico. La revisión técnica no equivale a validación con entidades.
