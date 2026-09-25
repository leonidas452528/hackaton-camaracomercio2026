import { useMemo, Component, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, OrbitControls } from "@react-three/drei";
import { Shape, Path, DoubleSide } from "three";
import type { Space } from "./types";
import { planningView } from "./data/site";
import { projectedFootprint } from "./planning";
class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <p role="alert">
        No se pudo abrir la vista 3D. La ficha y Google Maps siguen disponibles.
      </p>
    ) : (
      this.props.children
    );
  }
}
function Footprint({ space }: { space: Space }) {
  const shapes = useMemo(
    () =>
      projectedFootprint(space).map((rings) => {
        const shape = new Shape();
        rings.forEach((ring, index) => {
          const path = index === 0 ? shape : new Path();
          ring.forEach(([x, y], i) =>
            i === 0 ? path.moveTo(x, y) : path.lineTo(x, y),
          );
          path.closePath();
          if (index > 0) shape.holes.push(path);
        });
        return shape;
      }),
    [space],
  );
  return (
    <group
      rotation={[-Math.PI / 2, 0, 0]}
      name={`huella-${space.properties.id}`}
    >
      {shapes.map((shape, i) => (
        <mesh key={i}>
          <shapeGeometry args={[shape]} />
          <meshBasicMaterial color="#438675" side={DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}
export default function SelectedSpaceScene({ space }: { space: Space }) {
  if (!["Polygon", "MultiPolygon"].includes(space.geometry.type))
    return (
      <div className="notice" data-testid="point-only">
        Este registro solo tiene un punto. No hay contorno para adaptar una
        maqueta; consulta su ubicación en Google Maps. No se copia el piloto
        sobre este lugar.
      </div>
    );
  return (
    <>
      <div
        className="selected-footprint"
        data-space-id={space.properties.id}
        aria-label={`Huella de ${space.properties.name}`}
      >
        <Boundary>
          <Canvas
            key={space.properties.id}
            camera={{
              position: [...planningView.camera.position],
              fov: planningView.camera.fov,
            }}
          >
            <color attach="background" args={["#e7eee7"]} />
            <Bounds fit clip observe margin={planningView.boundsMargin}>
              <Footprint space={space} />
            </Bounds>
            <OrbitControls makeDefault maxPolarAngle={Math.PI / 2.1} />
          </Canvas>
        </Boundary>
      </div>
      <p className="small-note">
        Huella IDESC adaptada automáticamente · escala en metros · norte hacia
        el fondo de la vista inicial. Es una superficie plana: no se conocen
        altura, interior útil, accesos u obstáculos. La distribución de kits
        requiere esas mediciones.
      </p>
    </>
  );
}
