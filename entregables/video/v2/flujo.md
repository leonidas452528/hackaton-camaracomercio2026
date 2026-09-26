# Flujo detallado de Cali Activa

El video recorre este proceso en 80 segundos. Los rombos son decisiones; las flechas rojas detienen o devuelven la propuesta, y las verdes permiten continuar de manera condicionada.

```mermaid
flowchart TD
    A[Prevención y cultura ciudadana] --> B[Definir amenaza, sector y población SIMULADA]
    B --> C[Consultar inventario público y capas disponibles]
    C --> D{¿Pasa el filtro de amenaza y evidencia?}
    D -- No --> E[Descartado por cruce o pendiente de evidencia]
    E --> B
    D -- Sí --> F[Candidato condicionado, sin habilitación]
    F --> G{¿Tiene polígono?}
    G -- No --> H[Área desconocida: capacidad pendiente]
    G -- Sí --> I[Calcular área cartográfica]
    I --> J[Ingresar reservas: exclusiones, circulación, atención y otros usos]
    J --> K{¿Datos completos y válidos?}
    K -- No --> J
    K -- Sí --> L[Área restante / huella por módulo; redondear hacia abajo]
    L --> M{¿La carga propuesta cabe por área?}
    M -- No --> N[Bloquear inclusión; reducir carga o revisar otro espacio]
    N --> J
    M -- Sí --> O[Incluir distribución condicionada en borrador]
    O --> P[Calcular necesidades de agua, baños y refugio]
    P --> Q{¿Se conocen servicios existentes?}
    Q -- No --> R[Brechas por medir]
    Q -- Sí --> S[Calcular faltantes]
    R --> T[Responsables propuestos y seguimiento]
    S --> T
    T --> U[Revisión de la autoridad competente]
    U --> V{¿Habilitación confirmada?}
    V -- No --> W[Conservar borrador: no invitar a acudir]
    V -- Sí --> X[Confirmar apertura, horario y acceso]
    X --> Y[Preparar y revisar aviso operativo]
    W -. Demostración sin apertura .-> Z[Simular envío masivo; cero SMS reales]
    Y -. Integración real fuera de alcance .-> AA[Difusión oficial a población]
    Z --> AB[Entregas y pendientes SIMULADOS]
    AA --> AC[Atención y seguimiento]
    AC --> AD[Revisión, checklist y acta]
    AD --> AE[Retorno al uso cotidiano]
```

## Ejemplo de acopio mostrado

- **Dato real:** área del polígono `epou-9465`, calculada con Turf: 447,2149007228903 m².
- **Supuestos SIMULADOS:** exclusiones 100 m², circulación 80 m², atención 60 m² y otros usos 40 m².
- **Resultado del supuesto:** 167,2149007228903 m² restantes.
- **Módulo SIMULADO:** 10 m² de huella. Máximo teórico: 16 módulos completos.
- Proponer 20 requiere 200 m²: excede en 32,79 m² y se bloquea su inclusión.
- Proponer 16 requiere 160 m²: deja 7,21 m² en el balance supuesto.

Las cifras visibles se redondean a dos decimales; el cálculo usa la precisión completa. No se afirma que los módulos encajen físicamente en el parque ni que este esté disponible. Resultados exportados de la misma función del frontend en `src/ejemplo-acopio.json`.
