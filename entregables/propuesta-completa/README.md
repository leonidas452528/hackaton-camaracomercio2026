# Territorio Preparado · propuesta completa

[Word editable](Territorio_Preparado_Propuesta_Completa.docx) · [PDF para compartir](Territorio_Preparado_Propuesta_Completa.pdf)

Documento de **13 páginas**, con portada, resumen ejecutivo, solución, cinco fases, actores, reglas multiamenaza, dimensionamiento, coordinación, difusión, recuperación, arquitectura/maqueta, demostración, evidencia, hoja de ruta y fuentes. Contiene 11 tablas editables y dos imágenes con descripción alternativa.

Se distingue lo implementado de los supuestos SIMULADOS y los procesos pendientes. La validación con entidades permanece fuera de esta etapa. No se declaran apertura de parques, envío SMS real, aforos, impacto medido o certificaciones de madurez.

Fuentes: `docs/PROYECTO.md`, `docs/PROPUESTA_REAL.md`, código y catálogo `prototipo/datos/FUENTES.md`. Las fuentes primarias están incluidas en el documento; no se agregan datasets ni cifras de emergencias. La portada reutiliza la ilustración conceptual de `presentacion-ampliada/assets/espacio-conceptual.png`; prompt y procedencia en esa carpeta. La segunda imagen es la captura conceptual `maqueta3d/deliverables/renders/sistema_agua.png`.

## Revisión

[Vista páginas 1–6](Vista_general_1.jpg) · [Vista páginas 7–12](Vista_general_2.jpg) · [Última página](Vista_general_3.jpg)

La exportación PDF conserva el texto de los párrafos y tablas del Word, tiene 13 páginas y fue revisada visualmente. Resultados reproducibles en `verificacion.json`. El PDF es complementario; el DOCX es la entrega editable. La paginación puede variar entre versiones de Word o si faltan las fuentes DejaVu Sans.

## Regeneración

Dependencias Python en `src/requirements.txt`, LibreOffice y DejaVu Sans. Desde la raíz del repositorio:

```bash
python3 entregables/propuesta-completa/src/crear_documento.py
soffice --headless --convert-to pdf --outdir entregables/propuesta-completa entregables/propuesta-completa/Territorio_Preparado_Propuesta_Completa.docx
python3 entregables/propuesta-completa/src/verificar_documento.py
```

El contenido editable de origen está en `src/crear_documento.py`. Regenerar reemplaza el DOCX/PDF; incorporar allí las correcciones que se quieran conservar.
