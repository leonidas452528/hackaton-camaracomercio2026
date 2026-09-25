import { Html } from "@react-three/drei";
export default function SceneLabel({
  title,
  subtitle,
  position,
}: {
  title: string;
  subtitle: string;
  position: readonly [number, number, number];
}) {
  return (
    <Html center position={[...position]} zIndexRange={[10, 0]}>
      <div className="scene-label">
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
    </Html>
  );
}
