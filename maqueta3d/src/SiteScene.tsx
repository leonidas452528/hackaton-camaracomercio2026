import { Component, useEffect, useState, type ReactNode } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Label from "./SceneLabel";
import { IndoorRefuge, FieldRefuge } from "./Refuge";
import { site, emergencyCalculation, refugeLayout } from "./data/site";
import { formatNumber } from "./types";
const { venues, presentation } = site;
type View = (typeof presentation.views)[number];
function CameraView({ view }: { view: View }) {
  const { camera } = useThree();
  useEffect(() => {
    camera.position.set(view.position[0], view.position[1], view.position[2]);
    camera.lookAt(view.target[0], view.target[1], view.target[2]);
  }, [view, camera]);
  return (
    <OrbitControls
      makeDefault
      target={[...view.target]}
      minDistance={15}
      maxDistance={700}
      maxPolarAngle={Math.PI / 2.1}
    />
  );
}
function Overview({ view, showRoofs }: { view: View; showRoofs: boolean }) {
  const field = venues.hockey.field.value,
    margins = venues.hockey.footprintWithMargins.value,
    hall = presentation.genericHall.value,
    baseball = venues.baseball.placeholderFootprint.value;
  return (
    <>
      <color attach="background" args={["#e7eee7"]} />
      <ambientLight intensity={1.3} />
      <directionalLight
        position={[80, 160, 90]}
        intensity={2.3}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={presentation.shadow.bias}
        shadow-normalBias={presentation.shadow.normalBias}
        shadow-camera-left={-250}
        shadow-camera-right={250}
        shadow-camera-top={250}
        shadow-camera-bottom={-250}
      />
      <mesh
        receiveShadow
        position={[...presentation.ground.value.center]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry
          args={[
            presentation.ground.value.length,
            presentation.ground.value.width,
          ]}
        />
        <meshStandardMaterial color="#cbd8c5" />
      </mesh>
      <group position={[...venues.hockey.position.value]}>
        <mesh receiveShadow>
          <boxGeometry
            args={[
              margins.length,
              presentation.surfaceThickness,
              margins.width,
            ]}
          />
          <meshStandardMaterial color="#bba991" />
        </mesh>
        <mesh position={[0, presentation.surfaceThickness, 0]} receiveShadow>
          <boxGeometry
            args={[field.length, presentation.surfaceThickness, field.width]}
          />
          <meshStandardMaterial color="#528d80" />
        </mesh>
        <mesh position={[0, presentation.surfaceThickness * 2, 0]}>
          <boxGeometry
            args={[
              presentation.surfaceThickness,
              presentation.surfaceThickness,
              field.width,
            ]}
          />
          <meshStandardMaterial color="#f6f4e8" />
        </mesh>
        <FieldRefuge showRoofs={showRoofs} view={view.id} />
        {view.id === "general" && (
          <Label
            position={[0, 5, 0]}
            title="Campo de hockey"
            subtitle={`${field.length} × ${field.width} m · referencia reglamentaria`}
          />
        )}
      </group>
      <group position={[...venues.volleyball.position.value]}>
        <IndoorRefuge showRoofs={showRoofs} labels={view.id === "volleyball"} />
        {view.id === "general" && (
          <Label
            position={[0, hall.height + 6, 0]}
            title="Coliseo Francisco Chois"
            subtitle="Volumen ilustrativo · huella y altura POR MEDIR"
          />
        )}
      </group>
      <group position={[...venues.baseball.position.value]}>
        <mesh receiveShadow>
          <boxGeometry
            args={[
              baseball.length,
              presentation.surfaceThickness,
              baseball.width,
            ]}
          />
          <meshStandardMaterial color="#c8b58e" />
        </mesh>
        {(view.id === "general" || view.id === "baseball") && (
          <Label
            position={[0, 5, 0]}
            title="Diamante de Béisbol · acopio"
            subtitle={`${baseball.length} × ${baseball.width} m ilustrativos · POR MEDIR`}
          />
        )}
      </group>
      <CameraView view={view} />
    </>
  );
}
class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <p role="alert" className="notice">
        No se pudo iniciar WebGL. El mapa y las fichas siguen disponibles.
        Activa la aceleración gráfica para abrir la maqueta.
      </p>
    ) : (
      this.props.children
    );
  }
}
export default function SiteScene() {
  const [view, setView] = useState<View>(presentation.views[0]);
  const [showRoofs, setShowRoofs] = useState(true);
  const quantities = emergencyCalculation.value;
  return (
    <section className="scene-section">
      <div className="scene-intro">
        <div>
          <p className="eyebrow">PASO 3 · REFUGIO Y SERVICIOS</p>
          <h2>Unidad Deportiva Jaime Aparicio</h2>
          <p>
            {site.coordinates.legend}. Una unidad de escena equivale a un metro.
          </p>
        </div>
        <span className="badge">
          Maqueta ilustrativa, no levantamiento del sitio
        </span>
      </div>
      <div className="scene-toolbar">
        {presentation.views.map((v) => (
          <button
            className={v.id === view.id ? "active" : ""}
            onClick={() => setView(v)}
            key={v.id}
          >
            {v.label}
          </button>
        ))}
        <label className="roof-toggle">
          <input
            type="checkbox"
            checked={showRoofs}
            onChange={(e) => setShowRoofs(e.target.checked)}
          />
          Mostrar cubiertas
        </label>
      </div>
      <div
        className="refuge-summary"
        aria-label="Resumen de la propuesta de refugio"
      >
        <span>
          <strong>{quantities.indoorKits}</strong> kits interiores
        </span>
        <span>
          <strong>{quantities.outdoorKits}</strong> kits con cubierta
        </span>
        <span>
          <strong>{quantities.toiletsRequired}</strong> baños portátiles
        </span>
        <span>
          <strong>{quantities.closedModules}</strong> módulos cerrados
        </span>
        <span>
          <strong>
            {formatNumber(quantities.nonPotableLitersPerDay)} L/día
          </strong>{" "}
          uso no potable · cálculo de referencia
        </span>
      </div>
      <p className="small-note">
        {refugeLayout.value.legend}. La ocupación del registro es SIMULADA.
      </p>
      <div className="scene-canvas">
        <SceneBoundary>
          <Canvas
            shadows
            camera={{
              position: [...presentation.camera.position],
              fov: presentation.camera.fov,
            }}
          >
            <Overview view={view} showRoofs={showRoofs} />
          </Canvas>
        </SceneBoundary>
      </div>
      <div className="scene-notes">
        <div>
          <h3>Fuera del encuadre · Evangelista Mora</h3>
          <p>
            Posición relativa aproximada: X{" "}
            {venues.evangelista.position.value[0]} m; Z{" "}
            {venues.evangelista.position.value[2]} m. Huella, altura y
            orientación por medir. No se representa como parte contigua del
            complejo.
          </p>
        </div>
        <div>
          <h3>El mapa y la maqueta tienen distinta precisión</h3>
          <p>
            El mapa usa geometrías del catálogo IDESC. Esta escena sigue las
            posiciones aproximadas de la propuesta, que aún deben contrastarse
            con el sitio. Los nombres genéricos del catálogo no bastan para
            identificar con certeza todos los escenarios.
          </p>
        </div>
        <div>
          <h3>Distribución del refugio por validar</h3>
          <p>
            Las {quantities.indoorKits} franjas interiores conservan{" "}
            {site.equipment.kit.value.footprintM2} m² por kit y contienen{" "}
            {site.equipment.kit.value.partitions} particiones cada una. La
            circulación y la evacuación requieren validación profesional. Los
            tanques no acreditan suministro ni capacidad útil. No hay evaluación
            estructural ni disponibilidad confirmada del complejo.
          </p>
        </div>
      </div>
    </section>
  );
}
