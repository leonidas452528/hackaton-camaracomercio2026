# Territorio Preparado

**Espacios y ayudas coordinados ante emergencias.** Nombre elegido por el usuario el 25 de septiembre de 2026. Responde al **RETO-01 Cali Activa**, cuyo nombre oficial se conserva.

[PowerPoint editable](Presentacion_Ampliada.pptx) · [PDF para compartir](Presentacion_Ampliada.pdf) · [Guion y notas](Guion_del_pitch.md)

Presentación ampliada 16:9: **12 diapositivas principales para cuatro minutos sugeridos y cuatro anexos**. Sustituye como entrega principal la presentación inicial; los videos anteriores quedan como historial.

## Contenido

1. Identidad y propósito del sistema.
2. Problema: ubicación, ocupación y coordinación.
3. Actores y responsabilidades del proceso previsto.
4. Inventario territorial real y ficha del espacio.
5. Matriz de restricciones por amenaza.
6. Flujo de decisiones, evidencia y correcciones.
7. Organización conceptual: almacenamiento, atención, servicios y circulación.
8. Desglose de la superficie para acopio.
9. Demostración del exceso y ajuste con capturas reales.
10. Necesidades de referencia y servicios por verificar.
11. Educación preventiva y difusión SMS simulada.
12. Valor público y equipo.
13. Anexo: arquitectura implementada.
14. Anexo: controles y límites del prototipo.
15. Anexo: próximos pasos y alcance pendiente.
16. Anexo: fuentes primarias y trazabilidad.

Los textos, tablas y diagramas son editables. Las capturas de la aplicación, mapas e ilustración son imágenes. No se presentan mejoras de impacto cuantificadas sin medición.

## Vista previa

[Portada](Portada.jpg) · [Diapositivas 1–6](Vista_general_1.jpg) · [Diapositivas 7–12](Vista_general_2.jpg) · [Anexos](Vista_general_3.jpg)

## Datos, créditos y límites

- **Alcaldía de Santiago de Cali – DAPM/IDESC:** [espacio público efectivo](https://datos.cali.gov.co/dataset/epou-espacio-publico-efectivo) y [comunas](https://www.datos.gov.co/dataset/Comunas-de-Santiago-de-Cali/dx2g-2mhm). Inventario local de 1.970 espacios; corte 25 de septiembre de 2026. Adaptaciones cartográficas CC BY-SA 4.0. Descargas y licencias en `prototipo/datos/FUENTES.md`. No se incorporan datasets nuevos.
- Calles de las capturas: **© OpenStreetMap**, [atribución](https://www.openstreetmap.org/copyright).
- `epou-9465`: área cartográfica real de 447,2149007228903 m². Reservas **SIMULADAS** de 100 + 80 + 60 + 40 m² y módulos **SIMULADOS** de 10 m². Restan 167,21 m²; 20 módulos exceden y 16 cumplen el balance supuesto. Esto no demuestra encaje geométrico, aforo, accesibilidad o apertura.
- Escenario **SIMULADO** de 300 personas: referencias de 4.500 L/día, 15 baños y 1.050 m² cubiertos según reglas del frontend basadas en el [Manual Esfera 2018](https://spherestandards.org/wp-content/uploads/Sphere-Handbook-2018-EN.pdf). Son necesidades de referencia, no existencias verificadas ni faltantes conocidos.
- SMS **SIMULADO**: 100 destinatarios ficticios, 95 entregas y 5 pendientes ficticios; cero envíos reales. No se usan teléfonos ni datos personales.
- [Ilustración conceptual](assets/espacio-conceptual.png) generada con la herramienta integrada **image_gen**, aplicando la skill **imagegen**. [Prompt exacto y procedencia](src/prompt-ilustracion.json). No representa un parque real, implantación automática, inventario existente ni diseño técnico aprobado.
- La autoridad decide la activación. El sistema no sustituye evaluaciones estructurales ni competencias de Bomberos. Sin reconocimiento facial. Las entidades son responsables propuestos; su validación permanece fuera de esta etapa por decisión del usuario. La recuperación se muestra como proceso previsto.

## Regeneración

Dependencias fijadas en `src/requirements.txt`. Requiere LibreOffice, DejaVu Sans y Playwright del frontend. Con la aplicación local en el puerto 5173, desde la raíz:

```bash
node entregables/presentacion-ampliada/src/capturas.mjs
python3 entregables/presentacion-ampliada/src/crear_presentacion.py
soffice --headless --convert-to pdf --outdir entregables/presentacion-ampliada entregables/presentacion-ampliada/Presentacion_Ampliada.pptx
python3 entregables/presentacion-ampliada/src/verificar_presentacion.py
```

La marca se configura en `src/marca.json`; la del frontend en `maqueta3d/src/brand.ts`. El verificador revisa 16 páginas, notas, formato 16:9, texto exportado y límites del lienzo; genera vistas previas y `verificacion.json`. Complementar con revisión visual.
