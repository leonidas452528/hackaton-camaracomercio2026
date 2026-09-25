# Idea integrada del equipo: RETO-01 Cali Activa

**Estado al 25 de septiembre de 2026.** El detalle completo, con fuentes y la tabla legal, está en `docs/PROYECTO.md` (secciones 5, 6 y 6.1).

## En una frase
Un sistema que les dice a las autoridades **qué espacio público activar según la amenaza** (sismo, inundación o sequía), **qué le falta**, **quién debe responder** y **cómo devolverlo a su uso normal**. Se complementa con adecuaciones permanentes y con un kit modular reutilizable monitoreado con IoT.

## Las piezas y quién las trajo
| Pieza | Quién | Aporte |
|---|---|---|
| Cali Activa multiamenaza | Bitácora del equipo | La aptitud depende de la amenaza; matriz de quién responde; albergues autogestionados (Chiminangos I y II, Calimio Norte); retorno |
| Cali Lista (`docs/cali_lista.pdf`) | Pablo | Formulario de caracterización con 6 categorías; funciones (albergue, acopio, salud, conectividad); adecuaciones mínimas permanentes; ciclo que se retroalimenta |
| Refugios modulares de PVC + IoT | Otro integrante (aún no ha subido material) | Módulos reutilizables en eventos y en emergencias; sensores sin cámaras |
| Marco legal | El integrante encargado del marco legal | Filtro transversal de todas las piezas |

## Las 3 capas
1. **Decisión (el software que se prototipa el sábado).**
   - La ficha de cada espacio tiene las variables de Cali Lista más su aptitud por amenaza.
   - Funciones posibles: albergue, centro de acopio, punto de apoyo a salud, punto de agua, punto de información y conectividad, y zona de amortiguación.
   - Flujo: **aptitud = f(espacio, amenaza, función)** → los 3 mejores espacios (**la autoridad decide**) → brechas según Esfera → entidad responsable → tablero → checklist y acta de retorno.
2. **Adecuaciones permanentes (recomendación del sistema; no se construyen).** Toma de agua, puntos para conectar baños, energía solar y anclajes para los módulos, priorizados por probabilidad de uso. Referentes: parques de prevención de desastres de Tokio y puntos de agua de Ciudad del Cabo.
3. **Kit modular de PVC + IoT (maqueta y datos simulados).**
   - En tiempos normales, los módulos se usan en eventos (CicloVida, ferias); en una emergencia, cubren la brecha de área cubierta.
   - Sensores: nivel del tanque, conteo anónimo de entradas y salidas, temperatura y humedad.
   - El nivel del río se toma de las fuentes oficiales (CVC o IDEAM).

## Los 3 papeles de un espacio según la amenaza
- **Sismo** → albergue.
- **Inundación** → zona que se deja inundar (amortiguación).
- **Sequía o El Niño** → punto de agua.

Referentes: Yokohama (estadio Nissan), Tokio, Nepal, Estambul, Róterdam, Copenhague, Alemania, Ciudad del Cabo y Barcelona.

## Demo (60 a 90 segundos)
1. "Alerta naranja: el río Cauca está a 9,25 m. Hay 300 personas de Calimio Norte que necesitan reubicarse."
2. Se descartan los espacios en zona inundable y el sistema recomienda 3.
3. Brechas: 9 baños (EMCALI y UAESP) y 200 m² cubiertos (2 kits de la bodega X).
4. El tablero muestra "tanque al 40 %" (dato SIMULADO).
5. Se cambia el escenario a sismo y **la recomendación cambia**.
6. Retorno: los módulos vuelven a la bodega, se revisa el espacio y se firma el acta.

## Diferenciadores frente a los otros ~7 equipos
1. Enfoque multiamenaza (Ecosistema Creativo, el rival más cercano, solo mapea zonas afectadas y zonas seguras).
2. Matriz de quién responde, que da la trazabilidad necesidad → servicio → entidad.
3. Albergues autogestionados (hallazgo de la Defensoría).
4. Ciclo completo, con retorno y adecuaciones preventivas.

## Líneas rojas y alertas legales clave
- Recomienda; **no decide** (Ley 1523). No reemplaza la NSR-10 ni los conceptos de Bomberos (Ley 1575).
- Hay que cambiar **"peritaje"** por "caracterización".
- Solo conteos por ciclo vital (Leyes 1581 y 1098). Sin cámaras. Sin rastreo de direcciones MAC ni Bluetooth.
- PVC: libera un gas tóxico (cloruro de hidrógeno) al quemarse → material con retardante de llama y **concepto de Bomberos**; estabilidad firmada por un profesional.
- IoT: equipos homologados y en bandas de uso libre (Resolución ANE 105 de 2020).
- Los kits se compran y se guardan antes de la emergencia (contratación ordinaria). Su uso en eventos se reglamenta y la emergencia tiene prioridad.
- Por verificar: licencia de ocupación del espacio público (Decreto 1077 de 2015), aprovechamiento económico en Cali, NSR-10 para estructuras temporales, art. 66 de la Ley 1523, Circular SIC 002 de 2024 y CONPES 4144 de 2025.

## Pendientes inmediatos
- [ ] Decidir el nombre: Cali Activa o Cali Lista.
- [ ] Recibir el material del compañero del kit de PVC + IoT.
- [ ] Validar el IRL 3 con un actor real: una JAC de Chiminangos o Calimio Norte, o la Secretaría de Gestión del Riesgo.
- [ ] Construir el dataset simulado (espacios × amenazas × funciones, kits y sensores) y el prototipo No-Code (Sheets + Glide o Softr + Looker Studio).
- [ ] Confirmar la cifra oficial del sismo en Cali (154 fallecidos según el repositorio de la Alcaldía; falta la fecha de corte).
- [ ] Actualizar la Gema con esta versión integrada.
