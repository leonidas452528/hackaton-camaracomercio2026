# Cali Activa · video v2 con personajes de referencia y flujo detallado

[Ver o descargar el MP4 de 80 segundos](cali-activa-80s.mp4) · [Reproductor](index.html) · [Diagrama completo](flujo.md) · [Guion](guion.md) · [Subtítulos](cali-activa-80s.srt) · [Storyboard](storyboard.jpg)

Esta segunda versión conserva la duración exacta de **1 minuto y 20 segundos**, dos voces sintéticas en español de Colombia, música instrumental y efectos. Cambia el enfoque visual: personajes adaptados de la referencia del usuario acompañan diagramas con flechas animadas, rombos de decisión, salidas Sí/No y un retorno para corregir sobreocupación. Los retratos son ilustraciones con movimiento suave e indicador de voz; no se presenta sincronización labial como si fuera una filmación.

## Qué explica

1. Definir amenaza, sector y población simulada; filtrar inventario real con criterios visibles.
2. Diferenciar un candidato condicionado de un sitio disponible, y un punto cartográfico de un polígono con superficie calculable.
3. Descontar reservas y comparar la propuesta contra el máximo teórico por área.
4. Mostrar un caso que falla (20 módulos) y su corrección (16), con los resultados de la misma función del frontend.
5. Calcular necesidades; dejar brechas por medir cuando faltan servicios existentes; proponer responsables.
6. Separar el borrador de la habilitación por la autoridad. Sin confirmación, no invitar a acudir.
7. Demostrar difusión SMS con cero mensajes reales y resultados ficticios.
8. Presentar revisión, acta y retorno al uso cotidiano como el flujo previsto.

## Personajes y generación

Referencia suministrada por el usuario, ahora dentro del repositorio: [lámina original de personajes](../../../Imagen%20Refe/d91e7ea3-5b16-4aea-986f-cf69824be45e.jpeg). Es la misma lámina utilizada para las adaptaciones de la versión 2. Se conservaron los rasgos del narrador de cabello castaño, bufanda y saco beige, y de la narradora pelirroja con gafas redondas, pañoleta y cardigan estampado.

Assets guardados en [assets/narrador.png](assets/narrador.png) y [assets/narradora.png](assets/narradora.png), con transparencia. Generados con la herramienta integrada **image_gen** siguiendo la skill **imagegen**; no se usó el fallback CLI. Prompts completos y referencia en [src/prompts-personajes.json](src/prompts-personajes.json). Las fuentes generadas se mantienen intactas; se escalan y componen como capas del video. No se imitan voces de personas reales.

## Procedencia y límites

- **Huella real:** Parque · Colinas del Sur · EPE_1064 (`epou-9465`). Fuente: Alcaldía de Santiago de Cali – DAPM / IDESC, [espacio público efectivo](https://datos.cali.gov.co/dataset/epou-espacio-publico-efectivo), archivado el 25 de septiembre de 2026. Adaptación cartográfica bajo CC BY-SA 4.0. Descarga y licencia en `prototipo/datos/FUENTES.md`.
- **Área calculada:** 447,2149007228903 m² mediante Turf, desde el polígono real. En pantalla: 447,21 m².
- **Reservas SIMULADAS:** 100 + 80 + 60 + 40 m². **Huella por módulo SIMULADA:** 10 m². Área restante: 167,21 m²; máximo teórico: 16 módulos. JSON original de cálculo: [src/ejemplo-acopio.json](src/ejemplo-acopio.json).
- Los resultados son un balance supuesto, no aforo certificado, encaje físico ni evidencia de habilitación. La validación con entidades continúa fuera de esta etapa. La autoridad decide; el sistema no reemplaza evaluaciones estructurales ni conceptos de Bomberos.
- SMS simulado, sin apertura confirmada. El diagrama de habilitación representa el proceso previsto, no una autorización realizada ni una integración nueva con entidades.
- Diagrama, animación y música originales por código. Voces Salome y Gonzalo mediante edge-tts; montaje FFmpeg, fuentes DejaVu Sans. Solo el guion público se procesa en la síntesis de voz. No hay datos personales ni reconocimiento facial.

## Regenerar y verificar

Reutiliza las dependencias de `../src/requirements.txt` y FFmpeg. Desde la raíz del repositorio:

```bash
python entregables/video/v2/src/render_flujo.py --audio-only
python entregables/video/v2/src/render_flujo.py --preview
python entregables/video/v2/src/render_flujo.py
python entregables/video/v2/src/verify.py
```

Los módulos comunes de dibujo y mezcla se importan de `../src/render.py`. La primera versión se conserva. La nueva queda en `v2/`; los reproductores principal y v2 apuntan a esta versión. La caché de voces se invalida cuando cambia el guion, evitando mezclar narración antigua con diagramas nuevos. Las fuentes PNG ya generadas permiten regenerar sin invocar image_gen de nuevo.

## Verificación final

**80,000 segundos, 1.920 fotogramas, 1280 × 720, 24 fps, H.264/AAC.** Decodificación completa aprobada; audio en ocho escenas y 25 subtítulos dentro de tiempo y recuadro. Storyboard y fotograma del MP4 final revisados visualmente. [Resultados técnicos](verificacion.json).
