import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Vector3 } from "three";
import { Kit } from "./Refuge";
import Label from "./SceneLabel";
import { Member, PitchedCanopy, type Point } from "./Architecture";
import { construction } from "./data/site";
import {
  lifecycle,
  site,
  refugeLayout,
  storageLayout,
  type SceneState,
} from "./data/site";
const config = lifecycle.value;
const emergencyCenters = [
  ...refugeLayout.value.indoor.centers.map(
    (p) =>
      p.map((n, i) => n + site.venues.volleyball.position.value[i]) as [
        number,
        number,
        number,
      ],
  ),
  ...refugeLayout.value.outdoor.centers.map(
    (p) => [p[0], site.presentation.surfaceThickness * 2, p[2]] as const,
  ),
];

export function MovingKits({
  state,
  reducedMotion,
  showRoofs,
  onComplete,
}: {
  state: SceneState;
  reducedMotion: boolean;
  showRoofs: boolean;
  onComplete: () => void;
}) {
  const groups = useRef<(Group | null)[]>([]);
  const animation = useRef({
    elapsed: 0,
    done: false,
    starts: [] as { position: Vector3; scale: Vector3 }[],
  });
  useEffect(() => {
    animation.current = {
      elapsed: 0,
      done: false,
      starts: groups.current.map((g) => ({
        position: g!.position.clone(),
        scale: g!.scale.clone(),
      })),
    };
  }, [state, reducedMotion]);
  useFrame((_, delta) => {
    const a = animation.current;
    if (a.done || !a.starts.length) return;
    a.elapsed += delta;
    const t = reducedMotion
      ? 1
      : Math.min(a.elapsed / config.durationSeconds, 1);
    const smooth = (n: number) => n * n * (3 - 2 * n);
    const travel =
      state === "recovery"
        ? smooth(
            Math.max(
              0,
              (t - config.collapseFraction) / (1 - config.collapseFraction),
            ),
          )
        : smooth(t);
    const fold =
      state === "recovery"
        ? smooth(Math.min(t / config.collapseFraction, 1))
        : smooth(t);
    const targets =
      state === "everyday"
        ? config.everydayCenters
        : state === "recovery"
          ? config.recoveryCenters
          : emergencyCenters;
    groups.current.forEach((g, i) => {
      if (!g) return;
      g.position.lerpVectors(
        a.starts[i].position,
        new Vector3(...targets[i]),
        travel,
      );
      g.scale.lerpVectors(
        a.starts[i].scale,
        new Vector3(
          ...(state === "recovery" ? config.packedScale : ([1, 1, 1] as const)),
        ),
        fold,
      );
    });
    if (t === 1) {
      a.done = true;
      onComplete();
    }
  });
  return (
    <group name="kits-reutilizables">
      {emergencyCenters.map((p, i) => (
        <group
          key={i}
          ref={(g) => {
            groups.current[i] = g;
          }}
          position={[...p]}
        >
          <Kit
            position={[0, 0, 0]}
            indoor={i < refugeLayout.value.indoor.centers.length}
            showRoofs={showRoofs}
            outdoorCover={state === "everyday"}
            index={i}
            labels={false}
          />
        </group>
      ))}
    </group>
  );
}

export function EverydayUse({ labels }: { labels: boolean }) {
  const patch = config.greenPatch;
  const tankOrigin = site.venues.volleyball.position.value;
  return (
    <group name="riego-ilustrativo">
      <mesh position={[...patch.position]} receiveShadow>
        <boxGeometry args={[...patch.size]} />
        <meshStandardMaterial color="#639051" />
      </mesh>
      {(() => {
        const water = construction.value.water;
        const start: Point = [
          tankOrigin[0] + water.tapX - 0.7,
          water.outletHeight,
          tankOrigin[2] + water.tapZ,
        ];
        const elbow: Point = [patch.position[0], water.outletHeight, start[2]];
        const end: Point = [
          patch.position[0],
          water.outletHeight,
          patch.position[2],
        ];
        return (
          <>
            <Member
              from={start}
              to={elbow}
              radius={config.hoseWidth / 2}
              color="#44869a"
            />
            <Member
              from={elbow}
              to={end}
              radius={config.hoseWidth / 2}
              color="#44869a"
            />
          </>
        );
      })()}
      {labels && (
        <Label
          position={[
            patch.position[0],
            site.equipment.tank.value.height +
              refugeLayout.value.details.labelLift,
            patch.position[2],
          ]}
          title="Riego de zonas verdes"
          subtitle="Uso no potable · conexión ilustrativa, caudal por verificar"
        />
      )}
    </group>
  );
}

export function RecoveryWarehouse() {
  const warehouse = storageLayout.value.sectors.find(
    (s) => s.id === "warehouse",
  )!;
  return (
    <group>
      <group
        position={[
          site.venues.baseball.position.value[0] + warehouse.position[0],
          site.presentation.surfaceThickness,
          site.venues.baseball.position.value[2] + warehouse.position[2],
        ]}
      >
        <PitchedCanopy
          length={warehouse.footprint.length}
          width={warehouse.footprint.width}
          height={construction.value.storage.eaveHeight}
          rise={construction.value.storage.rise}
          showRoof
          name="cubierta-retorno"
        />
      </group>
      <mesh
        position={[
          site.venues.baseball.position.value[0] + warehouse.position[0],
          site.presentation.surfaceThickness,
          site.venues.baseball.position.value[2] + warehouse.position[2],
        ]}
        receiveShadow
        name="bodega-retorno"
      >
        <boxGeometry
          args={[
            warehouse.footprint.length,
            storageLayout.value.fixtures.floorThickness,
            warehouse.footprint.width,
          ]}
        />
        <meshStandardMaterial color={warehouse.color} />
      </mesh>
    </group>
  );
}
