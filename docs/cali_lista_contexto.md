# Contexto: Cali Lista — Peritaje y activación de espacios públicos para emergencias

## Origen del proyecto

Esta propuesta responde al **RETO-01-CALI_ACTIVA** del "Portafolio de Retos GovTech" de la Alcaldía de Santiago de Cali (Hackathon GovTech, eje temático SCEC26: Ciudades Resilientes Seguras y Saludables).

**Contexto detonante:** un sismo ocurrido el 10 de agosto de 2026 en Cali evidenció que la disponibilidad de un espacio público no garantiza que esté preparado para responder a una emergencia. En la Cancha de Hockey, por ejemplo, se alojaron más de 30 familias y 143 personas sin que el espacio tuviera condiciones (baños, caracterización de población) previamente definidas.

**Pregunta retadora oficial del reto:**
> ¿Cómo podríamos transformar los espacios públicos de Cali en una red adaptable que, según el tipo de emergencia y las necesidades de la población, permita activar y operar de manera segura y coordinada funciones temporales de atención y recuperación, y facilite posteriormente el retorno del espacio a su uso cotidiano?

**Owner institucional del reto:** Secretaría de Gestión del Riesgo de Emergencias y Desastres (líder funcional) / DATIC (líder técnico), con articulación de Infraestructura, Deporte y Recreación, Seguridad y Justicia, Salud Pública, Bienestar Social, Educación, Planeación, EMCALI, UAESP, entre otros.

---

## La idea: Cali Lista

Sistema/metodología que:
1. **Perita** (evalúa) espacios públicos de Cali (parques, canchas, plazoletas, equipamientos).
2. **Clasifica** cada espacio según su aptitud para cumplir funciones temporales de emergencia.
3. Genera una **matriz de brechas**: qué le falta a cada espacio para activarse bien, y qué entidad debe resolverlo.
4. Produce un **plan de activación** ejecutable el día de una emergencia real.
5. **Recomienda adecuaciones mínimas permanentes** (ej. un punto fijo de agua potable en una cancha) que sirven tanto en el uso cotidiano del espacio como en una futura crisis — se instalan de forma preventiva, no reactiva.

La instalación física (agua potable, etc.) **no se construye durante la Hackathon**: es una recomendación de salida del sistema, priorizada según la probabilidad de uso de cada espacio. Lo que se prototipa es la metodología y la herramienta de decisión (TRL 3, prototipo de baja fidelidad).

---

## Flujo del sistema (ciclo principal)

```
1. PERITAJE (preparación)
   → Brigadista/funcionario evalúa el espacio: capacidad, servicios,
     riesgos, accesibilidad, población cercana.

2. CLASIFICACIÓN
   → El sistema asigna funciones viables: albergue, acopio, salud,
     conectividad.

3. MATRIZ DE BRECHAS
   → Se identifica qué falta por espacio (ej. agua, baños) y qué
     entidad debe resolverlo.

4. ACTIVACIÓN
   → Ante una emergencia real, se ejecuta el plan ya definido por
     espacio y se notifica a entidades responsables.

5. SEGUIMIENTO
   → Tablero monitorea condiciones del espacio activo en tiempo real
     durante la operación.

6. RECUPERACIÓN
   → El espacio retorna a su función habitual; se documenta la
     experiencia para el siguiente ciclo (retroalimenta el peritaje).
```

El flujo es **cíclico**: cada recuperación mejora la precisión del siguiente peritaje.

### Rama paralela: adecuaciones preventivas

```
Matriz de brechas
   → Priorización de espacios de alta probabilidad de uso
   → Instalación de adecuación mínima permanente (ej. toma de agua potable)
   → Uso cotidiano del espacio + disponibilidad garantizada en emergencia
```

---

## Variables del formulario de peritaje

| Categoría | Variables |
|---|---|
| Identificación | Nombre del espacio, tipo (parque, cancha, plazoleta, equipamiento), ubicación georreferenciada |
| Capacidad | Área en m², capacidad estimada de personas |
| Servicios existentes | Agua potable, baños, electricidad, cobertura de red |
| Accesibilidad | Vías de acceso, condiciones para personas con discapacidad |
| Riesgos del entorno | Inundación, deslizamiento, cercanía a fallas u otros riesgos conocidos |
| Contexto poblacional | Densidad y características de la población circundante (niños, adultos mayores, etc.) |

## Clasificación de funciones posibles

| Función | Condiciones mínimas orientativas |
|---|---|
| Albergue temporal | Buena accesibilidad, capacidad amplia, cercanía a servicios de salud |
| Centro de acopio / distribución | Acceso vehicular, espacio cubierto o adaptable |
| Punto de salud / triage | Conectividad, cercanía a vías principales |
| Punto de conectividad / información | Cobertura de red, ubicación central |

*(Condiciones orientativas para el prototipo; el motor de reglas final se ajusta con la entidad owner durante la validación real.)*

---

## Requisitos técnicos no negociables (heredados del reto oficial)

- **No** se permite reconocimiento facial ni identificación individual innecesaria de ciudadanos.
- Datos personales tratados con criterios de privacidad y minimización (Ley 1581 de Colombia).
- Las recomendaciones automatizadas deben ser **explicables**: criterios visibles, no caja negra.
- No reemplaza evaluaciones estructurales, conceptos técnicos de seguridad ni decisiones de autoridades competentes.

## Tecnologías sugeridas para el prototipo (TRL 3)

- Formulario digital (No-Code / Low-Code)
- Sistema de información geográfica para visualizar espacios
- Motor de reglas simple (if-then) para clasificación — no requiere ML complejo en el MVP
- Tablero/dashboard de seguimiento de brechas

## Indicadores de éxito (KPIs)

- Número de espacios peritados y clasificados en el prototipo
- Tiempo promedio para generar un plan de activación por espacio (objetivo: minutos, no días)
- % de brechas identificadas con entidad responsable asignada
- Trazabilidad completa: necesidad detectada → servicio requerido → entidad responsable
- Capacidad de representar el ciclo completo: preparación → activación → operación → recuperación

---

## Estado actual del proyecto

- ✅ Idea y alcance definidos
- ✅ Ficha de caracterización de la solución (formato oficial del reto) documentada
- ✅ Modelo/flujo del sistema documentado
- ⬜ Definición de si se construye como app/web real o mockup/prototipo visual (pendiente de decidir según equipo y tiempo disponible)
- ⬜ Selección de espacios reales o simulados de Cali para la demo
- ⬜ Desarrollo del formulario de peritaje funcional
- ⬜ Desarrollo del motor de clasificación por reglas
- ⬜ Desarrollo del dashboard/mapa visual

## Documento fuente relacionado

Existe un PDF de propuesta más extenso y formateado (`propuesta.pdf`) con portada, ficha completa siguiendo el formato oficial de la Alcaldía, diagrama de flujo visual y tablas — este .md es su versión condensada en texto plano para dar contexto a un asistente de IA.
