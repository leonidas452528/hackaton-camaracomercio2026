import { Html } from "@react-three/drei";
import { site, refugeLayout, emergencyCalculation } from "./data/site";
import SceneLabel from "./SceneLabel";
const layout = refugeLayout.value;
const { equipment, presentation } = site;
type Vector = readonly [number, number, number];
function Box({
  size,
  position = [0, 0, 0],
  color,
  opacity = 1,
}: {
  size: Vector;
  position?: Vector;
  color: string;
  opacity?: number;
}) {
  return (
    <mesh position={[...position]} castShadow receiveShadow>
      <boxGeometry args={[...size]} />
      <meshStandardMaterial
        color={color}
        transparent={opacity < 1}
        opacity={opacity}
        depthWrite={opacity === 1}
      />
    </mesh>
  );
}
function Partition({ position }: { position: Vector }) {
  const { length: l, width: w, height: h } = equipment.partition.value;
  const { poleThickness: p, clothThickness: t } = layout.details;
  return (
    <group position={[...position]} name="particion-ilustrativa">
      <Box size={[t, h, w]} position={[-l / 2, h / 2, 0]} color="#eee5cb" />
      {[-1, 1].map((side) => (
        <group key={side}>
          <Box
            size={[l, h, t]}
            position={[0, h / 2, (side * w) / 2]}
            color="#f5edda"
          />
          {[-1, 1].map((end) => (
            <Box
              key={end}
              size={[p, h, p]}
              position={[(end * l) / 2, h / 2, (side * w) / 2]}
              color="#f5f8ee"
            />
          ))}
        </group>
      ))}
    </group>
  );
}
function Kit({
  position,
  indoor,
  showRoofs,
  index,
  labels,
}: {
  position: Vector;
  indoor: boolean;
  showRoofs: boolean;
  index: number;
  labels: boolean;
}) {
  const canopy = equipment.canopy.value;
  const footprint = indoor ? layout.indoor.footprint : canopy;
  const positions = indoor
    ? layout.indoor.partitionCenters
    : layout.outdoor.partitionCenters;
  const { poleThickness, roofThickness, labelLift, floorThickness } =
    layout.details;
  return (
    <group
      position={[
        position[0],
        position[1] +
          (indoor
            ? layout.details.floorThickness * 2
            : layout.details.floorThickness),
        position[2],
      ]}
      name={indoor ? "kit-interior" : "kit-cubierto"}
    >
      <Box
        size={[footprint.length, floorThickness, footprint.width]}
        position={[0, floorThickness / 2, 0]}
        color={indoor ? "#7caaa0" : "#cfb790"}
      />
      {positions.map((p, i) => (
        <Partition position={p} key={i} />
      ))}
      {!indoor && (
        <>
          {[-1, 1].flatMap((x) =>
            [-1, 1].map((z) => (
              <Box
                key={`${x}-${z}`}
                size={[poleThickness, canopy.clearHeight, poleThickness]}
                position={[
                  (x * canopy.length) / 2,
                  canopy.clearHeight / 2,
                  (z * canopy.width) / 2,
                ]}
                color="#d6e0d4"
              />
            )),
          )}
          {showRoofs && (
            <Box
              size={[canopy.length, roofThickness, canopy.width]}
              position={[0, canopy.clearHeight + roofThickness / 2, 0]}
              color="#fcf0d3"
              opacity={0.68}
            />
          )}
        </>
      )}
      {labels && (
        <SceneLabel
          position={[
            0,
            (indoor ? equipment.partition.value.height : canopy.clearHeight) +
              labelLift,
            0,
          ]}
          title={`Kit ${index + 1} · ${equipment.kit.value.footprintM2} m²`}
          subtitle={
            indoor
              ? "Particiones · ilustrativo"
              : "Cubierta modular · ilustrativo"
          }
        />
      )}
    </group>
  );
}
export function IndoorRefuge({
  showRoofs,
  labels,
}: {
  showRoofs: boolean;
  labels: boolean;
}) {
  const hall = presentation.genericHall.value;
  const { columnThickness, roofOpacity } = layout.hall;
  const court = emergencyCalculation.value;
  return (
    <>
      <Box
        size={[hall.length, layout.details.floorThickness, hall.width]}
        color="#d8ddd1"
      />
      <Box
        size={[
          court.courtLength,
          layout.details.floorThickness,
          court.courtWidth,
        ]}
        position={[0, layout.details.floorThickness, 0]}
        color="#a0b8a7"
      />
      {[-1, 1].flatMap((x) =>
        [-1, 1].map((z) => (
          <Box
            key={`${x}-${z}`}
            size={[columnThickness, hall.height, columnThickness]}
            position={[
              (x * hall.length) / 2,
              hall.height / 2,
              (z * hall.width) / 2,
            ]}
            color="#7b9389"
          />
        )),
      )}
      {showRoofs && (
        <Box
          size={[hall.length, layout.details.roofThickness, hall.width]}
          position={[0, hall.height, 0]}
          color="#8ea79c"
          opacity={roofOpacity}
        />
      )}
      {layout.indoor.centers.map((p, i) => (
        <Kit
          key={i}
          position={p}
          index={i}
          indoor
          showRoofs={false}
          labels={false}
        />
      ))}
      {layout.tanks.centers.map((p, i) => (
        <Tank key={i} position={p} />
      ))}
      {labels && (
        <SceneLabel
          position={[
            layout.tanks.centers[0][0],
            equipment.tank.value.height + layout.details.labelLift,
            layout.tanks.centers[0][2],
          ]}
          title="Tanques · uso no potable"
          subtitle="Ilustrativos · cantidad y capacidad por verificar"
        />
      )}
    </>
  );
}
function Tank({ position }: { position: Vector }) {
  const tank = equipment.tank.value;
  const hall = presentation.genericHall.value;
  const radius = layout.details.pipeRadius;
  // Bajante superficial desde el borde del techo hasta el tanque; no obra civil.
  const connectionLength = Math.abs(position[0]) - hall.length / 2;
  return (
    <group position={[...position]} name="tanque-ilustrativo">
      <Box
        size={[tank.length, tank.height, tank.width]}
        position={[0, tank.height / 2, 0]}
        color="#689ba7"
      />
      <Box
        size={[tank.length, layout.details.roofThickness, tank.width]}
        position={[0, tank.height, 0]}
        color="#d3e3da"
      />
      <mesh position={[0, (hall.height + tank.height) / 2, 0]}>
        <cylinderGeometry
          args={[radius, radius, hall.height - tank.height, 8]}
        />
        <meshStandardMaterial color="#dce8e1" />
      </mesh>
      <mesh
        position={[connectionLength / 2, hall.height, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[radius, radius, connectionLength, 8]} />
        <meshStandardMaterial color="#dce8e1" />
      </mesh>
    </group>
  );
}
function ClosedModule({
  position,
  label,
  color,
}: {
  position: Vector;
  label: string;
  color: string;
}) {
  const { length: l, width: w, height: h } = equipment.closedModule.value;
  const door = layout.details.door;
  return (
    <group position={[...position]} name={label}>
      <Box size={[l, h, w]} position={[0, h / 2, 0]} color={color} />
      <Box
        size={door}
        position={[0, door[1] / 2, w / 2 + door[2] / 2]}
        color="#f5f1df"
      />
      <Box
        size={[l, layout.details.roofThickness, w]}
        position={[0, h, 0]}
        color="#e2e3d0"
      />
    </group>
  );
}
function Toilet({ position }: { position: Vector }) {
  const { length: l, width: w, height: h } = equipment.toilet.value;
  const door = layout.details.toiletDoor;
  return (
    <group position={[...position]} name="bano-portatil">
      <Box size={[l, h, w]} position={[0, h / 2, 0]} color="#7a9ca3" />
      <Box
        size={door}
        position={[
          0,
          door[1] / 2 + layout.details.floorThickness,
          -w / 2 - door[2] / 2,
        ]}
        color="#c4d8d1"
      />
      <Box
        size={[l, layout.details.roofThickness, w]}
        position={[0, h, 0]}
        color="#f2ecdf"
      />
    </group>
  );
}
function SolarKit({ labels }: { labels: boolean }) {
  const solar = layout.solar;
  return (
    <group position={[...solar.position]} name="kit-solar-portatil">
      <group
        position={[0, solar.panelHeight, 0]}
        rotation={[solar.panelTilt, 0, 0]}
      >
        <Box size={solar.panel} color="#214e62" />
      </group>
      <Box
        size={[
          layout.details.poleThickness,
          solar.panelHeight,
          layout.details.poleThickness,
        ]}
        position={[0, solar.panelHeight / 2, 0]}
        color="#859188"
      />
      <Box
        size={solar.battery}
        position={[solar.panel[0] / 2, solar.battery[1] / 2, 0]}
        color="#4d6d65"
      />
      {labels && (
        <SceneLabel
          position={[layout.fieldLabels.solar[0]-solar.position[0],layout.fieldLabels.solar[1],layout.fieldLabels.solar[2]-solar.position[2]]}
          title="Kit solar portátil"
          subtitle="Ilustrativo · potencia por definir"
        />
      )}
    </group>
  );
}
function Registration({ labels }: { labels: boolean }) {
  const r = layout.registration;
  const pole = layout.details.poleThickness;
  return (
    <group position={[...r.position]} name="punto-registro">
      <Box size={r.table} position={[0, r.tableHeight, 0]} color="#ae8c60" />
      {[-1, 1].flatMap((x) =>
        [-1, 1].map((z) => (
          <Box
            key={`${x}-${z}`}
            size={[pole, r.tableHeight, pole]}
            position={[
              x * (r.table[0] / 2 - pole),
              r.tableHeight / 2,
              z * (r.table[2] / 2 - pole),
            ]}
            color="#496258"
          />
        )),
      )}
      <Box size={r.screen} position={[0, r.screenHeight, 0]} color="#163a35" />
      <Box
        size={[pole, r.screenHeight - r.tableHeight, pole]}
        position={[0, (r.screenHeight + r.tableHeight) / 2, 0]}
        color="#466659"
      />
      <Box
        size={r.reader}
        position={[
          r.table[0] / 2 - r.reader[0],
          r.tableHeight + r.reader[1] / 2,
          r.table[2] / 4,
        ]}
        color="#204b42"
      />
      {labels && (
        <Html center position={[0, r.labelHeight, 0]} zIndexRange={[12, 0]}>
          <div className="registration-screen">
            <strong>Punto de registro</strong>
            <span>Código ficticio {r.code}</span>
            <b>
              {site.scenario.people.value} personas ·{" "}
              {site.scenario.simulatedMinorCount.value} menores
            </b>
            <em>SIMULADO · conteos agregados</em>
            <small>Lector ilustrativo · sin registro individual</small>
          </div>
        </Html>
      )}
    </group>
  );
}
export function FieldRefuge({
  showRoofs,
  view,
}: {
  showRoofs: boolean;
  view: string;
}) {
  const labels = view === "hockey";
  return (
    <group position={[0, presentation.surfaceThickness * 2, 0]}>
      {layout.outdoor.centers.map((p, i) => (
        <Kit
          key={i}
          position={p}
          index={i + emergencyCalculation.value.indoorKits}
          indoor={false}
          showRoofs={showRoofs}
          labels={false}
        />
      ))}
      {layout.modules.map((m) => (
        <ClosedModule key={m.label} {...m} />
      ))}
      {layout.toilets.map((p, i) => (
        <Toilet key={i} position={p} />
      ))}
      <SolarKit labels={labels} />
      <Registration labels={view === "registration"} />
      {labels && (
        <>
          <SceneLabel
            position={layout.fieldLabels.kits}
            title={`${emergencyCalculation.value.outdoorKits} kits con cubierta`}
            subtitle={`${equipment.kit.value.footprintM2} m² cada uno · ilustrativos`}
          />
          <SceneLabel
            position={layout.fieldLabels.toilets}
            title={`${emergencyCalculation.value.toiletsRequired} baños portátiles`}
            subtitle="Propuesta ilustrativa · servicios por verificar"
          />
          <SceneLabel
            position={layout.fieldLabels.modules}
            title="Espacio NNA · Punto de salud"
            subtitle="Dos módulos cerrados · ilustrativos"
          />
        </>
      )}
    </group>
  );
}
