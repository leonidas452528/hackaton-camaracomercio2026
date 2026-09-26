# PROMPT_CODEX_3D.md — Maqueta 3D de refugio y acopio (Cali Activa, RETO-01)

Eres el agente que construye la **maqueta 3D** de la propuesta Cali Activa. Sigue este archivo al pie de la letra.
Si falta un dato, **no lo inventes**: usa el marcador indicado y anótalo en `maqueta3d/PENDIENTES.md`.
No modifiques ni reemplaces el `AGENTS.md` del repositorio; este archivo solo rige la carpeta `maqueta3d/`.

---

## 0. Fuentes

1. `docs/portafolio_retos_alcaldia_cali.pdf` — ficha oficial (solo RETO-01).
2. `docs/propuesta_cali_activa.md` — propuesta del equipo (red de espacios, kit, motor, registro, acopio,
   trazabilidad de insumos, sitio piloto). Si no existe, detente y pídela.

Prioridad ante contradicciones: ficha oficial > propuesta > este archivo.

---

## 1. Qué debe mostrar la maqueta

El **sitio piloto**: el complejo de la Unidad Deportiva Jaime Aparicio (Cali), albergue oficial tras el sismo
del 10 de agosto de 2026. La maqueta muestra cómo el complejo se organiza en **zona de refugio** y **zona de
acopio**, y cómo cambia entre uso cotidiano, emergencia y recuperación.

---

## 2. Medidas (1 unidad de la escena = 1 metro)

### Medidas reglamentarias (usar exactas)

| Elemento | Medida |
|---|---|
| Campo de hockey | 91,40 × 55,00 m; con márgenes mínimos 97,40 × 59,00 m |
| Cancha de voleibol con zona libre | 24 × 15 m (cancha 18 × 9 m + 3 m por lado); altura libre ≥ 7 m |

### Posiciones relativas (desde el centro del campo de hockey)

Calculadas con coordenadas de Google Maps; error de decenas de metros. Eje X = este, eje −Z = norte.

| Escenario | X (m) | Z (m) |
|---|---|---|
| Coliseo de Voleibol Francisco Chois | +148 | −111 |
| Diamante de Béisbol | +173 | +40 |
| Coliseo Evangelista Mora | −195 | −726 (fuera del encuadre: mostrar como recuadro aparte) |

**Orientación de cada escenario: por verificar.** Alinéalos con los ejes y muestra en pantalla la leyenda
"Posiciones aproximadas — orientación por verificar".

### Medidas ilustrativas (usar y rotular "ilustrativo")

| Elemento | Medida |
|---|---|
| Unidad de partición (PVC + tela) | 2 × 2 m, altura 2 m |
| Kit para 20 personas | 5 unidades de partición + circulación; huella total 70 m² |
| Cubierta modular del kit | 10 × 7 m, altura libre 3 m, sin muros |
| Módulo cerrado (espacio NNA / punto de salud) | 5 × 3,5 m, altura 2,5 m |
| Baño portátil | 1,2 × 1,2 × 2,3 m |
| Tanque modular de agua | 1 × 1 × 1,2 m, conectado a bajante del techo |
| Huella de cada coliseo, altura, número de canchas | **POR MEDIR**: modela un volumen genérico con 1 cancha de voleibol |
| Diamante de Béisbol | **POR MEDIR**: modela un área abierta genérica de 60 × 60 m |

### Cálculo de la escena de emergencia (caso real: 143 personas)

- Kits necesarios: 143 ÷ 20 → **8 kits** · baños: **8** · agua no potable: **2.145 L/día**.
- Coliseo (1 cancha, 360 m²): caben **5 kits** (360 ÷ 70 = 5,1 → 5).
- Campo de hockey: los **3 kits** restantes, **con cubierta**.
- 2 módulos cerrados: "Espacio NNA" y "Punto de salud", en el campo de hockey junto a los kits.

---

## 3. Zonas a modelar

### Zona de refugio
- Coliseo: 5 kits de particiones dentro, sin cubierta (ya tiene techo).
- Campo de hockey: 3 kits con cubierta modular, 2 módulos cerrados, 8 baños portátiles en un borde,
  kit solar portátil, tanques modulares junto al coliseo conectados a sus bajantes.
- **Punto de registro** en el acceso: mesa, lector y pantalla que muestra solo el código de la manilla y el
  conteo agregado ("143 personas · 40 menores · Dato simulado"). Nunca nombres ni documentos.

### Zona de acopio (Diamante de Béisbol)
Sectores rotulados en este orden de flujo, con flechas en el piso:
1. Lista pública de necesidades (cartelera)
2. Recepción
3. Clasificación (alimentos, agua, aseo, abrigo, kits)
4. Descarte (vencido o inservible)
5. Bodega e inventario (estanterías)
6. Despacho hacia el refugio
7. Pantalla de trazabilidad: muestra un lote de insumos con tipo, cantidad, origen, destino y un hash
   de ejemplo rotulado "simulado". **Sin personas ni dinero.**

Una ruta marcada conecta el despacho del acopio con la entrada del refugio.

---

## 4. Estados (botones con transición animada)

| Estado | Qué se ve |
|---|---|
| Uso cotidiano | Los mismos kits armados como stands de una feria en el campo; tanques regando zonas verdes; acopio vacío |
| Emergencia (sismo) | Escena completa de las secciones 2 y 3 |
| Recuperación | Kits desmontándose y volviendo a la bodega; campo y coliseo libres |

---

## 5. Líneas rojas

1. Ninguna cifra sin fuente: reglamentaria, del caso real (143 personas), calculada en la sección 2,
   o rotulada "ilustrativo" / "POR MEDIR" / "Dato simulado".
2. Sin datos personales en ninguna pantalla. Personas solo como siluetas genéricas sin rasgos.
3. Sin escudo ni logos de la Alcaldía u otras entidades.
4. Sin obra civil (canales, excavaciones, cisternas enterradas).
5. Nunca escribir "agua potable": siempre "uso no potable".
6. Edificios como volúmenes genéricos; no replicar fachadas reales.

---

## 6. Tecnología y entregables

- Carpeta `maqueta3d/`: Vite + React + TypeScript (modo `strict`) + `@react-three/fiber` + `@react-three/drei`.
- Estilo estilizado low-poly, paleta sobria y consistente, sombras suaves, etiquetas legibles (HTML de drei).
- Controles: órbita, vistas predefinidas (general, refugio, acopio, punto de registro) y selector de estado.
- Textos visibles en español; identificadores de código en inglés.
- Todas las medidas y cantidades en un único archivo `src/data/site.ts`, nunca repetidas en los componentes.
- Capturas 1920 × 1080 con Playwright en `deliverables/renders/`:
  `general.png`, `refugio_coliseo.png`, `refugio_campo.png`, `acopio.png`, `registro.png`,
  `cotidiano.png`, `recuperacion.png`.
- Exportar la escena de emergencia a `deliverables/renders/cali_activa.glb` (GLTFExporter).

---

## 7. Orden de trabajo (detente y reporta al terminar cada paso)

1. `src/data/site.ts` con todas las medidas y el cálculo de kits de la sección 2.
2. Escena general con los escenarios en sus posiciones relativas.
3. Zona de refugio (coliseo y campo) con kits, cubiertas, módulos, baños, tanques y punto de registro.
4. Zona de acopio con sus sectores y la ruta al refugio.
5. Estados y transiciones.
6. Capturas, exportación GLB y `maqueta3d/PENDIENTES.md`.

Cada reporte incluye: qué se hizo, archivos tocados, comandos para verlo (`comando  # qué hace`) y pendientes.
Verificación final: `npm run build` sin errores y revisión de las líneas rojas de la sección 5.
