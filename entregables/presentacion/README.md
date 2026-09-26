# Cali Activa · presentación profesional

**Entrega principal:** [PowerPoint editable](Cali_Activa_Presentacion.pptx) · [PDF para compartir](Cali_Activa_Presentacion.pdf)

Presentación horizontal **16:9**, con **10 diapositivas de pitch + 2 anexos**. El guion propone cuatro minutos, conforme al formato de pitch del proyecto; no arrastra el límite de 80 segundos del video cancelado. Incluye notas del presentador en el PPTX y [guion separado](Guion_del_pitch.md).

## Contenido

1. Cali Activa: del espacio público al cuidado.
2. El problema: dónde, cuánto cabe y quién responde.
3. La propuesta: conocer, dimensionar, coordinar, comunicar y recuperar.
4. Base territorial real: 1.970 registros públicos.
5. Tres decisiones: amenaza, superficie y habilitación.
6. Caso de acopio: huella real + reservas simuladas; 20 módulos exceden y 16 cumplen el balance supuesto.
7. Escenario simulado de 300 personas: necesidades de agua, baños y superficie cubierta.
8. Prevención y comunicación a toda la población; SMS simulado.
9. Recorrido del prototipo con una captura real.
10. Valor público, siguiente paso y equipo.
11. Anexo: implementado frente a pendiente de verificación.
12. Anexo: fuentes y trazabilidad de datos/reglas.

Diseño editorial con azul verdoso oscuro, marfil y verde lima; tipografía DejaVu Sans, titulares grandes, diagramas y cifras editables. Los mapas son imágenes derivadas de geometrías públicas; la captura es una imagen de la aplicación. No se utilizaron los personajes ni fotogramas del video.

## Vista previa

[Diapositivas 1–6](Vista_general_1.jpg) · [Diapositivas 7–12](Vista_general_2.jpg) · [Portada](Portada.jpg)

## Fuentes y límites

- Fuente cartográfica: **Alcaldía de Santiago de Cali – DAPM / IDESC**, [espacio público efectivo](https://datos.cali.gov.co/dataset/epou-espacio-publico-efectivo) y [comunas](https://www.datos.gov.co/dataset/Comunas-de-Santiago-de-Cali/dx2g-2mhm). Corte local: 25 de septiembre de 2026. Adaptación: **CC BY-SA 4.0**. Descargas/licencias: `prototipo/datos/FUENTES.md`.
- Captura del mapa: interfaz real del prototipo; calles **© OpenStreetMap**, con atribución en captura y diapositiva. [Créditos de OpenStreetMap](https://www.openstreetmap.org/copyright).
- Área real del caso `epou-9465`: 447,2149007228903 m². Reservas SIMULADAS: 100 + 80 + 60 + 40 m². Módulo SIMULADO: 10 m². Los 16 módulos son un máximo teórico de superficie, no un encaje físico, aforo ni habilitación.
- Escenario de población SIMULADO: 300 personas. Necesidades de referencia: 4.500 L/día, 15 baños y 1.050 m² cubiertos. Fuente: [Manual Esfera 2018](https://spherestandards.org/wp-content/uploads/Sphere-Handbook-2018-EN.pdf), reglas ya documentadas en el frontend. Deben contextualizarse y no representan existencias.
- Responsables propuestos sin validación con entidades. La activación corresponde a la autoridad; no se reemplazan evaluaciones estructurales ni conceptos de Bomberos. Sin datos personales ni reconocimiento facial.
- Prototipo y bitácora: `docs/PROYECTO.md`. Sin datos nuevos de emergencias ni afirmaciones de impacto medido. La validación con entidades y la integración SMS real permanecen fuera de esta etapa.

## Regenerar

Dependencias Python en `src/requirements.txt`; LibreOffice para PDF; Playwright ya instalado en `maqueta3d/` para capturas. Desde la raíz, con la aplicación local disponible en el puerto 5173:

```bash
node entregables/presentacion/src/capturas.mjs
python entregables/presentacion/src/crear_presentacion.py
soffice --headless --convert-to pdf --outdir entregables/presentacion entregables/presentacion/Cali_Activa_Presentacion.pptx
python entregables/presentacion/src/verificar_presentacion.py
```

El verificador comprueba 12 páginas, relación 16:9, notas del presentador, textos exportados y límites del lienzo. Genera las vistas previas y `verificacion.json`. La revisión visual complementa el control técnico.
