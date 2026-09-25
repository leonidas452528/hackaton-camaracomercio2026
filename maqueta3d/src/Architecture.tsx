import { Quaternion, Vector3 } from "three";
import { construction, site } from "./data/site";
export type Point = readonly [number, number, number];
const c = construction.value;
export function Solid({
  size,
  position = [0, 0, 0],
  color = c.palette.structure,
  name,
}: {
  size: Point;
  position?: Point;
  color?: string;
  name?: string;
}) {
  return (
    <mesh position={[...position]} castShadow receiveShadow name={name}>
      <boxGeometry args={[...size]} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  );
}
/** Un tramo conecta sus dos extremos exactos: no hay tubos flotantes. */
export function Member({
  from,
  to,
  radius,
  color = c.palette.structure,
  name,
}: {
  from: Point;
  to: Point;
  radius: number;
  color?: string;
  name?: string;
}) {
  const a = new Vector3(...from),
    b = new Vector3(...to),
    direction = b.clone().sub(a);
  const rotation = new Quaternion().setFromUnitVectors(
    new Vector3(0, 1, 0),
    direction.clone().normalize(),
  );
  return (
    <mesh
      position={a.add(b).multiplyScalar(0.5)}
      quaternion={rotation}
      castShadow
      receiveShadow
      name={name}
    >
      <cylinderGeometry args={[radius, radius, direction.length(), 10]} />
      <meshStandardMaterial color={color} roughness={0.65} />
    </mesh>
  );
}
export function PitchedCanopy({
  length,
  width,
  height,
  showRoof,
  rise = c.canopy.rise,
  name = "cubierta-propuesta",
}: {
  length: number;
  width: number;
  height: number;
  showRoof: boolean;
  rise?: number;
  name?: string;
}) {
  const { post, beam, overhang, foot } = c.canopy;
  const half = width / 2 + overhang,
    slope = Math.atan2(rise, half);
  return (
    <group name={name}>
      {[-1, 1].flatMap((x) =>
        [-1, 1].map((z) => (
          <group key={`${x}-${z}`}>
            <Solid
              size={foot}
              position={[(x * length) / 2, foot[1] / 2, (z * width) / 2]}
              color="#8f9288"
            />
            <Solid
              size={[post, height, post]}
              position={[(x * length) / 2, height / 2, (z * width) / 2]}
            />
          </group>
        )),
      )}
      {[-1, 1].map((x) => (
        <group key={x}>
          <Solid
            size={[beam, beam, width]}
            position={[(x * length) / 2, height, 0]}
          />
          {[-1, 1].map((z) => (
            <Member
              key={z}
              from={[(x * length) / 2, height, z * half]}
              to={[(x * length) / 2, height + rise, 0]}
              radius={beam / 2}
            />
          ))}
          <Member
            from={[(x * length) / 2, height, 0]}
            to={[(x * length) / 2, height + rise, 0]}
            radius={post / 2}
          />
        </group>
      ))}
      <Solid size={[length, beam, beam]} position={[0, height + rise, 0]} />
      {[-1, 1].map((z) => (
        <Solid
          key={z}
          size={[length, beam, beam]}
          position={[0, height, (z * width) / 2]}
        />
      ))}
      {[-1, 1].flatMap((x) =>
        [-1, 1].map((z) => (
          <Member
            key={`brace-${x}-${z}`}
            from={[(x * length) / 2, height - 0.65, (z * width) / 2]}
            to={[x * (length / 2 - 0.65), height, (z * width) / 2]}
            radius={post / 3}
          />
        )),
      )}
      {showRoof &&
        [-1, 1].map((z) => (
          <group
            key={z}
            position={[0, height + rise / 2 + beam / 2, (z * half) / 2]}
            rotation={[z * slope, 0, 0]}
          >
            <Solid
              size={[
                length + overhang * 2,
                site.presentation.surfaceThickness / 2,
                Math.hypot(half, rise),
              ]}
              color={c.palette.fabric}
              name="faldon-opaco"
            />
          </group>
        ))}
    </group>
  );
}
export function HallStructure({ showRoof }: { showRoof: boolean }) {
  const hall = site.presentation.genericHall.value,
    { rise, overhang, beam, frames } = c.hall;
  const run = hall.length + overhang * 2,
    angle = Math.atan2(rise, run);
  return (
    <group name="estructura-coliseo-conceptual">
      {Array.from({ length: frames }, (_, i) => {
        const z = -hall.width / 2 + (i * hall.width) / (frames - 1);
        return (
          <group key={i}>
            {[-1, 1].map((x) => {
              const height =
                hall.height +
                rise / 2 +
                ((x * hall.length) / 2) * Math.tan(angle);
              return (
                <group key={x}>
                  <Solid
                    size={[0.7, 0.15, 0.7]}
                    position={[(x * hall.length) / 2, 0.075, z]}
                    color="#989d94"
                  />
                  <Solid
                    size={[beam, height, beam]}
                    position={[(x * hall.length) / 2, height / 2, z]}
                  />
                </group>
              );
            })}
            <Member
              from={[-run / 2, hall.height, z]}
              to={[run / 2, hall.height + rise, z]}
              radius={beam / 2}
            />
            <Member
              from={[-hall.length / 2, hall.height - 1.2, z]}
              to={[hall.length / 2, hall.height - 1.2, z]}
              radius={beam / 3}
            />
            {[-1, 1].map((x) => (
              <Member
                key={x}
                from={[(x * hall.length) / 2, hall.height - 1.2, z]}
                to={[0, hall.height + rise / 2, z]}
                radius={beam / 4}
              />
            ))}
          </group>
        );
      })}
      {[-1, 0, 1].map((x) => (
        <Solid
          key={x}
          size={[beam, beam, hall.width]}
          position={[
            (x * hall.length) / 2,
            hall.height + rise / 2 + ((x * hall.length) / 2) * Math.tan(angle),
            0,
          ]}
        />
      ))}
      {showRoof && (
        <group
          position={[0, hall.height + rise / 2 + beam / 2, 0]}
          rotation={[0, 0, angle]}
        >
          <Solid
            size={[
              Math.hypot(run, rise),
              site.presentation.surfaceThickness,
              hall.width + overhang * 2,
            ]}
            color={c.palette.roof}
            name="techo-coliseo-opaco"
          />
        </group>
      )}
    </group>
  );
}
