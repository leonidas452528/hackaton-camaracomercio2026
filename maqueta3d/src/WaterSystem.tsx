import { construction, refugeLayout, site } from "./data/site";
import { Member, Solid, type Point } from "./Architecture";
import SceneLabel from "./SceneLabel";
const config = construction.value.water,
  color = construction.value.palette.pipe;
const hall = site.presentation.genericHall.value,
  tank = site.equipment.tank.value;
export function WaterSystem({
  labels,
  roofVisible,
}: {
  labels: boolean;
  roofVisible: boolean;
}) {
  const eaveX = -hall.length / 2 - construction.value.hall.overhang;
  const gutterY = hall.height - config.gutterDepth;
  return (
    <group name="sistema-agua-propuesto">
      <Solid
        size={[config.servicePad.length, 0.08, config.servicePad.width]}
        position={[
          config.servicePad.center[0],
          0.04,
          config.servicePad.center[2],
        ]}
        color="#b6b4a1"
      />
      {roofVisible && (
        <group name="canaleta-recoleccion">
          {[
            [-hall.width / 2 - construction.value.hall.overhang, -3, true],
            [-3, -1.5, false],
            [-1.5, 0, true],
            [0, hall.width / 2 + construction.value.hall.overhang, false],
          ].map(([start, end, descending], i) => {
            const z0 = Number(start),
              z1 = Number(end),
              dy = descending ? -config.gutterFall : config.gutterFall;
            const length = Math.hypot(z1 - z0, dy);
            return (
              <group
                key={i}
                position={[
                  eaveX,
                  gutterY + config.gutterFall / 2,
                  (z0 + z1) / 2,
                ]}
                rotation={[-Math.atan2(dy, z1 - z0), 0, 0]}
              >
                <Solid
                  size={[config.gutterWidth, 0.05, length]}
                  color={color}
                />
                {[-1, 1].map((side) => (
                  <Solid
                    key={side}
                    size={[0.04, config.gutterDepth, length]}
                    position={[
                      (side * config.gutterWidth) / 2,
                      config.gutterDepth / 2,
                      0,
                    ]}
                    color={color}
                  />
                ))}
              </group>
            );
          })}
        </group>
      )}
      {refugeLayout.value.tanks.centers.map((p, i) => {
        const top = config.baseHeight + tank.height;
        const pipe = (from: Point, to: Point, name?: string) => (
          <Member
            from={from}
            to={to}
            radius={config.pipeRadius}
            color={color}
            name={name}
          />
        );
        return (
          <group key={i} name="tanque-ilustrativo" position={[...p]}>
            <Solid
              size={[
                tank.length + config.baseMargin,
                config.baseHeight,
                tank.width + config.baseMargin,
              ]}
              position={[0, config.baseHeight / 2, 0]}
              color="#66706a"
            />
            <Solid
              size={[tank.length, tank.height, tank.width]}
              position={[0, config.baseHeight + tank.height / 2, 0]}
              color={construction.value.palette.tank}
            />
            {[0.1, 0.5, 0.9].map((f) => (
              <group key={f}>
                {[-1, 1].map((side) => (
                  <group key={side}>
                    <Solid
                      size={[
                        tank.length + 0.05,
                        config.cageThickness,
                        config.cageThickness,
                      ]}
                      position={[
                        0,
                        config.baseHeight + tank.height * f,
                        (side * tank.width) / 2,
                      ]}
                    />
                    <Solid
                      size={[
                        config.cageThickness,
                        config.cageThickness,
                        tank.width + 0.05,
                      ]}
                      position={[
                        (side * tank.length) / 2,
                        config.baseHeight + tank.height * f,
                        0,
                      ]}
                    />
                    <Solid
                      size={[
                        config.cageThickness,
                        tank.height,
                        config.cageThickness,
                      ]}
                      position={[
                        (side * tank.length) / 2,
                        config.baseHeight + tank.height / 2,
                        (f - 0.5) * tank.width,
                      ]}
                    />
                  </group>
                ))}
              </group>
            ))}
            <mesh position={[0, top + 0.04, 0]} castShadow>
              <cylinderGeometry args={[0.14, 0.14, 0.08, 16]} />
              <meshStandardMaterial color="#263e3b" />
            </mesh>
            {[3, 6].map((y) => (
              <Member
                key={y}
                from={[eaveX - p[0], y, 0]}
                to={[-hall.length / 2 - p[0], y, -hall.width / 4 - p[2]]}
                radius={config.cageThickness}
                name="soporte-bajante"
              />
            ))}
            {/* Captación por gravedad: canaleta -> filtro -> entrada superior. */}
            {roofVisible &&
              pipe(
                [eaveX - p[0], gutterY, 0],
                [eaveX - p[0], top + config.filterHeight + 0.25, 0],
                "bajante",
              )}
            <mesh
              position={[eaveX - p[0], top + config.filterHeight / 2 + 0.25, 0]}
              castShadow
            >
              <cylinderGeometry
                args={[
                  config.filterRadius,
                  config.filterRadius,
                  config.filterHeight,
                  16,
                ]}
              />
              <meshStandardMaterial color="#717d6e" />
            </mesh>
            {pipe(
              [eaveX - p[0], top + 0.25, 0],
              [0, top + 0.1, 0],
              "entrada-filtrada",
            )}
            {pipe([0, top + 0.1, 0], [0, top, 0])}
            {/* Rebose termina en recipiente representado, nunca dentro del refugio. */}
            {pipe(
              [tank.length / 2, top - 0.15, tank.width / 3],
              [tank.length / 2 + 0.4, top - 0.15, tank.width / 3],
              "rebose",
            )}
            {pipe(
              [tank.length / 2 + 0.4, top - 0.15, tank.width / 3],
              [tank.length / 2 + 0.4, 0.45, tank.width / 3],
            )}
            <mesh position={[tank.length / 2 + 0.4, 0.2, tank.width / 3]}>
              <cylinderGeometry args={[0.25, 0.2, 0.35, 16, 1, true]} />
              <meshStandardMaterial color="#a16e48" side={2} />
            </mesh>
            {pipe(
              [-tank.length / 2, config.outletHeight, 0],
              [config.tapX - p[0], config.outletHeight, 0],
              "salida-no-potable",
            )}
            {pipe(
              [config.tapX - p[0], config.outletHeight, 0],
              [config.tapX - p[0], config.outletHeight, config.tapZ - p[2]],
            )}
          </group>
        );
      })}
      <Solid
        size={[0.65, 0.65, 0.55]}
        position={[config.tapX, 0.325, config.tapZ]}
        color="#536761"
        name="bomba-propuesta"
      />
      <Solid
        size={[1.3, 0.1, 0.5]}
        position={[config.tapX - 0.6, 0.05, config.tapZ]}
        color="#8c938b"
        name="soporte-servicio"
      />
      <Member
        from={[config.tapX, config.outletHeight, config.tapZ]}
        to={[config.tapX - 0.7, config.outletHeight, config.tapZ]}
        radius={config.pipeRadius}
        color={color}
      />
      <Solid
        size={[0.22, 0.05, 0.12]}
        position={[config.tapX - 0.5, config.outletHeight + 0.12, config.tapZ]}
        color="#b47339"
        name="valvula-salida"
      />
      {labels && (
        <SceneLabel
          position={[-19, 2.8, -3]}
          title="Tanques · uso no potable"
          subtitle="2 recipientes propuestos · capacidad por verificar"
        />
      )}
    </group>
  );
}
export function WaterPanel() {
  return (
    <aside
      className="water-panel"
      aria-label="Funcionamiento propuesto del agua"
    >
      <div>
        <p className="eyebrow">AGUA · DISEÑO CONCEPTUAL</p>
        <h3>Del techo al punto de servicio</h3>
        <p>
          Dos tanques superficiales junto al lateral del coliseo; no son
          cisternas enterradas ni equipos existentes confirmados.
        </p>
      </div>
      <ol>
        <li>
          <strong>Captación</strong>
          <span>
            La cubierta inclinada conduce lluvia hacia la canaleta lateral y las
            bajantes.
          </span>
        </li>
        <li>
          <strong>Entrada</strong>
          <span>
            Filtro propuesto antes de la entrada superior. Falta diseñar la
            separación de primeras aguas.
          </span>
        </li>
        <li>
          <strong>Almacenamiento</strong>
          <span>
            Recipientes cerrados sobre bases, con acceso de mantenimiento y
            rebose hacia recolección controlada.
          </span>
        </li>
        <li>
          <strong>Servicio</strong>
          <span>
            Salidas bajas, válvula y bomba propuesta para limpieza o riego.
            Energía, caudal, tratamiento y destino final del rebose por definir.
          </span>
        </li>
      </ol>
      <p>
        <strong>Solo uso no potable.</strong> No hay conexión a consumo humano
        ni a baños portátiles. La lluvia es intermitente: esta escena no
        acredita abastecimiento diario ni presión disponible.
      </p>
    </aside>
  );
}
