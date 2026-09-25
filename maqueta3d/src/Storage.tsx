import { Html } from "@react-three/drei";
import { Shape } from "three";
import { site, storageLayout, type StorageSectorId } from "./data/site";
import SceneLabel from "./SceneLabel";
import { formatNumber } from "./types";
const layout = storageLayout.value;
type Vector = readonly [number, number, number];
type Sector = (typeof layout.sectors)[number];
const arrowShape = new Shape();
arrowShape.moveTo(0, 0);
arrowShape.lineTo(-layout.arrows.headLength, -layout.arrows.headWidth / 2);
arrowShape.lineTo(-layout.arrows.headLength, layout.arrows.headWidth / 2);
arrowShape.closePath();
function Box({
  size,
  position = [0, 0, 0],
  color,
}: {
  size: Vector;
  position?: Vector;
  color: string;
}) {
  return (
    <mesh position={[...position]} castShadow receiveShadow>
      <boxGeometry args={[...size]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
function DirectionalPath({
  points,
  color,
  width,
  height,
  repeat = false,
}: {
  points: readonly Vector[];
  color: string;
  width: number;
  height: number;
  repeat?: boolean;
}) {
  return (
    <group name="flujo-direccional">
      {points.slice(1).map((to, i) => {
        const from = points[i],
          dx = to[0] - from[0],
          dz = to[2] - from[2],
          length = Math.hypot(dx, dz);
        if (!length) return null;
        const count = repeat
          ? Math.max(1, Math.floor(length / layout.arrows.spacing))
          : 1;
        return (
          <group
            key={i}
            position={[from[0], from[1], from[2]]}
            rotation={[0, -Math.atan2(dz, dx), 0]}
          >
            <Box
              size={[length, height, width]}
              position={[length / 2, height / 2, 0]}
              color={color}
            />
            {Array.from({ length: count }, (_, j) => (
              <mesh
                key={j}
                position={[(length * (j + 1)) / (count + 1), height * 2, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <shapeGeometry args={[arrowShape]} />
                <meshBasicMaterial color={repeat ? "#fff4d6" : color} />
              </mesh>
            ))}
          </group>
        );
      })}
    </group>
  );
}
function Board({ screen = false }: { screen?: boolean }) {
  const board = layout.fixtures.board,
    display = layout.fixtures.screen;
  const size = screen ? display.size : board.size,
    height = screen ? display.centerHeight : board.centerHeight;
  return (
    <>
      <Box
        size={size}
        position={[0, height, 0]}
        color={screen ? "#183a37" : "#e8e6cd"}
      />
      <Box
        size={[board.postThickness, height, board.postThickness]}
        position={[0, height / 2, 0]}
        color="#506b5a"
      />
      <Html
        transform
        position={[0, height, size[2]]}
        distanceFactor={8}
        zIndexRange={[1, 0]}
      >
        <div className={`physical-board ${screen ? "physical-screen" : ""}`}>
          {screen ? (
            <>
              <strong>TRAZABILIDAD</strong>
              <b>{layout.traceability.status}</b>
              <span>Lote · tipo · cantidad</span>
              <span>Origen · destino · hash</span>
              <small>Pendientes de fuente verificada</small>
            </>
          ) : (
            <>
              <strong>NECESIDADES</strong>
              {layout.requiredSupplies.map((s) => (
                <span key={s.label}>
                  {s.quantity} {s.unit} · {s.label}
                </span>
              ))}
              <small>Requerimiento calculado · stock sin confirmar</small>
            </>
          )}
        </div>
      </Html>
    </>
  );
}
function Table() {
  const t = layout.fixtures.table;
  return (
    <>
      <Box size={t.size} position={[0, t.height, 0]} color="#c8aa77" />
      {[-1, 1].flatMap((x) =>
        [-1, 1].map((z) => (
          <Box
            key={`${x}-${z}`}
            size={[t.postThickness, t.height, t.postThickness]}
            position={[
              x * (t.size[0] / 2 - t.postThickness),
              t.height / 2,
              z * (t.size[2] / 2 - t.postThickness),
            ]}
            color="#536f61"
          />
        )),
      )}
    </>
  );
}
function Bin({ position, color }: { position: Vector; color: string }) {
  const { size, wallThickness: t } = layout.fixtures.bin;
  return (
    <group position={[...position]}>
      <Box
        size={[size[0], t, size[2]]}
        position={[0, t / 2, 0]}
        color={color}
      />
      {[-1, 1].map((side) => (
        <group key={side}>
          <Box
            size={[t, size[1], size[2]]}
            position={[(side * size[0]) / 2, size[1] / 2, 0]}
            color={color}
          />
          <Box
            size={[size[0], size[1], t]}
            position={[0, size[1] / 2, (side * size[2]) / 2]}
            color={color}
          />
        </group>
      ))}
    </group>
  );
}
function Shelves() {
  const s = layout.fixtures.shelf;
  return (
    <>
      {layout.shelfCenters.map((p, i) => (
        <group position={[...p]} key={i}>
          {[-1, 1].flatMap((x) =>
            [-1, 1].map((z) => (
              <Box
                key={`${x}-${z}`}
                size={[s.postThickness, s.height, s.postThickness]}
                position={[(x * s.width) / 2, s.height / 2, (z * s.depth) / 2]}
                color="#5e7667"
              />
            )),
          )}
          {s.levels.map((h) => (
            <Box
              key={h}
              size={[s.width, s.boardThickness, s.depth]}
              position={[0, h, 0]}
              color="#e2d2ab"
            />
          ))}
        </group>
      ))}
    </>
  );
}
function Equipment({ sector }: { sector: Sector }) {
  switch (sector.id) {
    case "needs":
      return <Board />;
    case "reception":
      return <Table />;
    case "sorting":
      return (
        <>
          {layout.categoryCenters.map((position, i) => (
            <Bin key={i} position={position} color={sector.color} />
          ))}
        </>
      );
    case "rejection":
      return <Bin position={[0, 0, 0]} color="#b06b51" />;
    case "warehouse":
      return <Shelves />;
    case "dispatch":
      return (
        <>
          {layout.fixtures.pallet.centers.map((p, i) => (
            <Box
              key={i}
              size={layout.fixtures.pallet.size}
              position={[p[0], layout.fixtures.pallet.size[1] / 2, p[2]]}
              color="#b99b67"
            />
          ))}
        </>
      );
    case "traceability":
      return <Board screen />;
    default:
      return null;
  }
}
export function StorageCenter({
  selected,
  onSelect,
  showLabels,
}: {
  selected: StorageSectorId;
  onSelect: (id: StorageSectorId) => void;
  showLabels: boolean;
}) {
  return (
    <group
      position={[0, site.presentation.surfaceThickness, 0]}
      name="centro-acopio"
    >
      {layout.sectors.map((sector) => (
        <group
          key={sector.id}
          name={`acopio-${sector.id}`}
          position={[...sector.position]}
          onClick={(event) => {
            event.stopPropagation();
            onSelect(sector.id);
          }}
        >
          <mesh
            receiveShadow
            position={[0, layout.fixtures.floorThickness / 2, 0]}
          >
            <boxGeometry
              args={[
                sector.footprint.length,
                layout.fixtures.floorThickness,
                sector.footprint.width,
              ]}
            />
            <meshStandardMaterial
              color={sector.color}
              emissive={selected === sector.id ? "#705927" : "#000000"}
              emissiveIntensity={selected === sector.id ? 0.12 : 1}
            />
          </mesh>
          <group position={[0, layout.fixtures.floorThickness, 0]}>
            <Equipment sector={sector} />
          </group>
          {showLabels && (
            <Html
              center
              position={[
                0,
                layout.fixtures.labelHeight,
                -sector.footprint.width / 2 + layout.fixtures.labelEdgeOffset,
              ]}
              zIndexRange={[12, 0]}
            >
              <button
                className={`storage-label ${selected === sector.id ? "selected" : ""}`}
                aria-label={`Seleccionar ${sector.label}`}
                aria-pressed={selected === sector.id}
                onClick={() => onSelect(sector.id)}
              >
                <b>{sector.number}</b>
                <span>{sector.shortLabel}</span>
              </button>
            </Html>
          )}
        </group>
      ))}
      {layout.flows.map((flow) => (
        <DirectionalPath
          key={`${flow.from}-${flow.to}`}
          points={flow.points}
          color={
            flow.kind === "rejected"
              ? "#9e493a"
              : flow.kind === "record"
                ? "#656181"
                : "#2e6755"
          }
          width={layout.arrows.width}
          height={layout.arrows.height}
        />
      ))}
    </group>
  );
}
export function SupplyRoute({ labels }: { labels: boolean }) {
  return (
    <group
      name="ruta-conceptual-refugio"
      position={[
        0,
        site.presentation.surfaceThickness + layout.fixtures.floorThickness,
        0,
      ]}
    >
      <DirectionalPath
        points={layout.route.points}
        color={layout.route.color}
        width={layout.route.width}
        height={layout.route.height}
        repeat
      />
      {labels && (
        <>
          <SceneLabel
            position={layout.route.labelPosition}
            title="Despacho → refugio"
            subtitle="Conexión ilustrativa · no es ruta vial"
          />
          <SceneLabel
            position={layout.route.entranceLabelPosition}
            title="Acceso propuesto al refugio"
            subtitle="Junto al registro · por verificar"
          />
        </>
      )}
    </group>
  );
}
export function StoragePanel({
  selected,
  onSelect,
}: {
  selected: StorageSectorId;
  onSelect: (id: StorageSectorId) => void;
}) {
  const sector =
    layout.sectors.find((s) => s.id === selected) ?? layout.sectors[0];
  return (
    <section
      className="storage-panel"
      aria-label="Proceso del centro de acopio"
    >
      <div className="storage-process">
        <p className="eyebrow">CENTRO DE ACOPIO · DIAMANTE DE BÉISBOL</p>
        <h3>De la necesidad al despacho</h3>
        <p>Selecciona un sector para revisar su función.</p>
        <div className="storage-steps">
          {layout.sectors.map((s) => (
            <button
              key={s.id}
              aria-pressed={selected === s.id}
              onClick={() => onSelect(s.id)}
            >
              <b>{s.number}</b>
              <span>{s.shortLabel}</span>
            </button>
          ))}
        </div>
        <div className="flow-legend">
          <span>→ Aceptado: clasificación → bodega → despacho</span>
          <span>↘ Rechazado: clasificación → descarte</span>
          <span>⇢ Trazabilidad: registro del movimiento</span>
        </div>
        <p className="small-note">
          {layout.legend}. No representa inventario disponible.
        </p>
      </div>
      <div className="storage-detail" aria-live="polite">
        <p className="eyebrow">SECTOR {sector.number}</p>
        <h3>{sector.label}</h3>
        <p>{sector.description}</p>
        {sector.id === "needs" && (
          <>
            <dl className="supply-needs">
              {layout.requiredSupplies.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>
                    {formatNumber(s.quantity)} {s.unit}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="small-note">
              Requerimiento bruto para el caso de {site.scenario.people.value}{" "}
              personas de la ficha. No descuenta existencias: aún no hay
              faltantes confirmados.
            </p>
          </>
        )}
        {sector.id === "sorting" && (
          <ul className="category-list">
            {layout.categories.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        )}
        {sector.id === "rejection" && (
          <p className="notice">
            Ramal separado: no hay flujo desde descarte hacia bodega o despacho.
          </p>
        )}
        {sector.id === "traceability" && (
          <div className="traceability-screen">
            <strong>{layout.traceability.status}</strong>
            <dl>
              {layout.traceability.fields.map((field) => (
                <div key={field}>
                  <dt>{field}</dt>
                  <dd>
                    {field === "Hash"
                      ? "Sin hash: falta un registro verificado"
                      : "Pendiente de fuente verificada"}
                  </dd>
                </div>
              ))}
            </dl>
            <p>{layout.traceability.note}</p>
          </div>
        )}
        {sector.id === "dispatch" && (
          <p className="notice">{layout.route.note}</p>
        )}
      </div>
    </section>
  );
}
