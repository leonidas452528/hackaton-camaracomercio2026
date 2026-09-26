# Territorio Preparado: qué propone y qué hace realmente

**Versión:** 25 de septiembre de 2026.  
**Producto:** Territorio Preparado.  
**Reto oficial:** RETO-01 Cali Activa.  
**Equipo:** William Ortiz, Herlin Echeverry, Pablo Arango y Daniel Celis.

## 1. La idea principal

**Ayudar a preparar espacios públicos de Cali para atender a la población ante una emergencia, revisando las restricciones del lugar, el espacio que se propone ocupar y los servicios que faltan.**

La pregunta que resuelve es: **“Ante esta amenaza, ¿qué espacios podemos estudiar para prestar apoyo, qué necesitamos preparar y qué queda por verificar antes de abrirlos?”**

La propuesta busca convertir información territorial dispersa en un **borrador de preparación por espacio**, comprensible y revisable por el equipo y la autoridad. Ese es el producto central. El mapa ayuda a localizar; el cálculo ayuda a dimensionar; el seguimiento organiza pendientes; la comunicación ayuda a informar.

## 2. El problema que queremos resolver

Encontrar un parque en un mapa no indica si puede recibir ayudas o personas. Antes de proponer su uso hay que conocer las restricciones de la amenaza, el área útil, los accesos, los servicios y las condiciones de apertura.

Además, **acopio, alojamiento y punto de encuentro cumplen funciones distintas**. Un área para almacenar y entregar ayudas no equivale a capacidad para alojar personas. El sistema debe hacer visibles esas diferencias y los datos que todavía faltan.

## 3. Quién lo usaría y qué recibe

El usuario principal previsto es el **equipo que prepara la respuesta territorial**. Consulta espacios, define un escenario y prepara una propuesta. La autoridad competente revisa y decide la activación. La comunidad recibe orientación e información sobre los puntos cuando su apertura esté confirmada.

Hoy se demuestra ese proceso en una aplicación local. No existe una integración operativa con entidades ni un sistema de cuentas y permisos por actor.

## 4. Qué funciona hoy

| Función | Comportamiento real del prototipo |
|---|---|
| Consultar el territorio | Muestra inventarios públicos de Cali, filtros por comuna/barrio, fichas y cruces cartográficos. El inventario de espacio público efectivo contiene 1.970 registros; un registro no acredita disponibilidad. |
| Ubicar un espacio | Abre Google Maps, satélite y Street View por coordenadas. El mapa de la aplicación utiliza Leaflet y calles OpenStreetMap; Google Maps es un enlace externo. |
| Preparar un escenario | Permite escoger amenaza y un conteo agregado de personas **SIMULADO**. |
| Comparar candidatos | Preselecciona hasta tres polígonos del sector, aplicando las restricciones disponibles y ordenando por distancia en línea recta. La población modifica las necesidades, no el orden: faltan capacidades confirmadas. |
| Revisar por amenaza | En inundación descarta cruces con las capas disponibles. En sismo excluye cruces de licuación/corrimiento y mantiene la necesidad de inspección. Para sequía e incendios no preselecciona lugares sin evidencia suficiente. |
| Dimensionar el acopio | Calcula el área cartográfica del polígono y descuenta reservas introducidas por el usuario. Detecta propuestas que exceden el balance y bloquea su inclusión como distribución de acopio. Entradas y resultados de la demo se identifican como **SIMULADOS**. |
| Estimar necesidades | Calcula referencias de agua, baños y superficie cubierta para el conteo del escenario. Si las existencias son desconocidas, conserva el faltante como no calculable. |
| Organizar pendientes | Muestra responsables propuestos y estados locales por servicio, como “Por medir” y “En revisión”. No acredita aceptación ni trabajo realizado por una entidad. |
| Exportar la propuesta | Descarga un borrador JSON con escenario, criterios, necesidades, supuestos y pendientes. |
| Orientar a la comunidad | Incluye aprendizaje preventivo y la diferencia entre un lugar inventariado y un punto habilitado. |
| Demostrar la difusión | Prepara avisos generales con ubicación y simula resultados SMS. No utiliza teléfonos, proveedor ni envíos reales; no garantiza cobertura de toda la población. |

## 5. El recorrido que debe guiar la demostración

1. **Definir:** amenaza, sector y población del escenario.
2. **Consultar:** espacios reales y restricciones conocidas.
3. **Revisar un candidato:** ubicación, huella y evidencia pendiente.
4. **Dimensionar:** reservar circulación, atención y otros usos; calcular cuánto almacenamiento se propone.
5. **Preparar:** estimar necesidades y registrar lo que falta medir o resolver.
6. **Entregar:** exportar un borrador explicable para revisión.
7. **Decisión externa:** la autoridad determina si se activa el lugar y bajo qué condiciones.
8. **Informar:** comunicar ubicación y condiciones una vez confirmada la apertura. Hoy este canal se demuestra mediante SMS **SIMULADO** y conserva apertura no confirmada.

El objetivo completo incluye seguimiento de operación y retorno del espacio a su uso cotidiano. La recuperación tiene representación conceptual, pero **todavía no hay un cierre operativo con inspección y acta verificadas**.

## 6. Qué papel tiene la maqueta 3D

La maqueta explica visualmente funciones como refugio, acopio, circulación y sistema de agua conceptual. Al seleccionar un espacio con polígono, se adapta la **huella del terreno** y el encuadre.

**Los refugios, cisternas y módulos no se distribuyen automáticamente sobre cada parque.** Faltan medidas útiles, obstáculos, accesos y comprobación de encaje. La escena ilustrativa no representa construcciones existentes ni un diseño técnico aprobado.

El prototipo es una herramienta de **planeación de escenarios de atención**. No calcula propagación del fuego, movimiento del agua, daños estructurales ni evacuaciones físicas.

## 7. Un ejemplo que sí demuestra el valor actual

Se selecciona `epou-9465`, Parque · Colinas del Sur · EPE_1064. Su huella cartográfica tiene aproximadamente **447,21 m²**.

Para la demo se introducen reservas **SIMULADAS**: 100 m² no utilizables, 80 m² de circulación, 60 m² de atención y 40 m² de otros usos. Quedan **167,21 m²** en el supuesto. Con módulos **SIMULADOS** de 10 m²:

- Proponer 20 requiere 200 m²: el balance detecta exceso.
- Proponer 16 requiere 160 m²: cumple el balance supuesto.

Esto demuestra detección de exceso **por superficie**. No demuestra que los módulos encajen físicamente, que puedan entrar 16 familias ni que el parque esté autorizado.

## 8. Qué falta para una operación real

- Medir superficie útil, accesos, obstáculos y condiciones de cada espacio.
- Verificar disponibilidad, servicios, aforos y evaluaciones técnicas; la validación con entidades permanece fuera de la etapa actual por decisión del usuario.
- Completar evidencia para incendios y sequía.
- Comprobar distribución geométrica y condiciones físicas de los módulos.
- Implementar coordinación compartida y evidencias de atención de pendientes.
- Integrar difusión real, cobertura, revisión de avisos y estados efectivos de entrega.
- Completar el proceso documentado de recuperación y retorno.

No se debe presentar “tres lugares cercanos con filtros” como “los tres mejores lugares operativos”, ni necesidades estimadas como servicios disponibles.

## 9. La frase para presentar el proyecto

> **Territorio Preparado ayuda a planear el uso temporal de espacios públicos de Cali ante emergencias: consulta restricciones, dimensiona propuestas de acopio y hace visibles los servicios pendientes. Entrega una propuesta explicable; la autoridad decide su activación.**

El foco de la entrega debe ser ese recorrido y su borrador. El 3D, la educación y la difusión muestran cómo se comprende y comunica la propuesta.

## 10. Límites y evidencia

Recomendaciones explicables; activación por la autoridad; sin sustituir evaluaciones estructurales ni competencias de Bomberos. Datos públicos, conteos agregados y simulaciones identificadas; sin datos personales ni reconocimiento facial. Lenguaje claro, contraste y controles accesibles. No se afirma impacto medido ni habilitación real.

La descripción se contrastó con la [bitácora](PROYECTO.md), especialmente las secciones 6.10 a 6.16, y con la implementación: [reglas de selección](../maqueta3d/src/planning.ts), [capacidad de acopio](../maqueta3d/src/calculateAcopioCapacity.ts) y [preparación y exportación](../maqueta3d/src/Intervention.tsx).

Fuentes y procedencia: [catálogo de datasets](DATASETS.md), [descargas y licencias](../prototipo/datos/FUENTES.md), [espacio público DAPM/IDESC](https://datos.cali.gov.co/dataset/epou-espacio-publico-efectivo) y [Manual Esfera 2018](https://spherestandards.org/wp-content/uploads/Sphere-Handbook-2018-EN.pdf). El ejemplo reutiliza el dato local y los supuestos documentados; no incorpora cifras nuevas de emergencias.
