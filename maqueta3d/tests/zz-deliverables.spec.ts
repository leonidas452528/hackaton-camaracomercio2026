import { test, expect } from "@playwright/test";
import { readFile } from "node:fs/promises";

test("entrega final: siete capturas y GLB de emergencia completo y recargable", async ({
  page,
}) => {
  test.setTimeout(90000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page
    .getByRole("button", { name: "02 Demostración de refugio" })
    .click();
  await expect(page.locator("canvas")).toBeVisible();
  await expect(page.locator(".scene-label").first()).toBeVisible();
  const capture = async (file: string, view: string) => {
    await page.getByRole("button", { name: view, exact: true }).click();
    await page.locator(".scene-canvas").scrollIntoViewIfNeeded();
    await page.waitForTimeout(450);
    await page.screenshot({ path: `deliverables/renders/${file}.png` });
  };
  await capture("general", "General");
  await page.getByRole("checkbox", { name: "Mostrar cubiertas" }).uncheck();
  await expect(
    page.getByRole("button", { name: "Descargar emergencia en GLB" }),
  ).toBeDisabled();
  await capture("refugio_coliseo", "Coliseo");
  await page.getByRole("checkbox", { name: "Mostrar cubiertas" }).check();
  await capture("refugio_campo", "Campo de hockey");
  await capture("registro", "Punto de registro");
  await capture("acopio", "Acopio");
  await page
    .getByRole("button", { name: "Uso cotidiano", exact: true })
    .click();
  await expect(
    page.getByRole("button", { name: "Descargar emergencia en GLB" }),
  ).toBeDisabled();
  await capture("cotidiano", "General");
  await page.getByRole("button", { name: "Recuperación", exact: true }).click();
  await capture("recuperacion", "Acopio");
  await page
    .getByRole("button", { name: "Emergencia (sismo)", exact: true })
    .click();
  // El GLB debe contener posiciones finales aunque se venga de recuperación.
  await expect(page.locator(".lifecycle-status")).toHaveAttribute(
    "data-transitioning",
    "false",
  );
  await page.waitForTimeout(200);
  const downloading = page.waitForEvent("download");
  await page
    .getByRole("button", { name: "Descargar emergencia en GLB" })
    .click();
  const download = await downloading;
  expect(download.suggestedFilename()).toBe("cali_activa.glb");
  await download.saveAs("deliverables/renders/cali_activa.glb");
  const bytes = await readFile("deliverables/renders/cali_activa.glb");
  expect(bytes.subarray(0, 4).toString()).toBe("glTF");
  expect(bytes.readUInt32LE(4)).toBe(2);
  expect(bytes.readUInt32LE(8)).toBe(bytes.length);
  const gltf = JSON.parse(
    bytes.subarray(20, 20 + bytes.readUInt32LE(12)).toString(),
  );
  const nodes = gltf.nodes as { name?: string }[];
  for (const [name, count] of Object.entries({
    "kit-interior": 5,
    "kit-cubierto": 3,
    "particion-ilustrativa": 40,
    "bano-portatil": 8,
    "tanque-ilustrativo": 2,
    "punto-registro": 1,
    "centro-acopio": 1,
    "ruta-conceptual-refugio": 1,
    "Espacio NNA": 1,
    "Punto de salud": 1,
  })) {
    expect(
      nodes.filter((n) => n.name === name),
      name,
    ).toHaveLength(count);
  }
  expect(nodes.filter((n) => n.name?.startsWith("acopio-"))).toHaveLength(7);
  expect(gltf.scenes[0].extras.state).toBe("emergency");
  expect(gltf.scenes[0].extras.traceability.record).toBeNull();
  // Recarga independiente con GLTFLoader: geometría finita y kits en sus sedes.
  const inspection = await page.evaluate(async (base64) => {
    const loaderPath = "/node_modules/three/examples/jsm/loaders/GLTFLoader.js";
    const { GLTFLoader } = await import(/* @vite-ignore */ loaderPath);
    const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
    const loaded = await new GLTFLoader().parseAsync(bytes.buffer, "");
    loaded.scene.updateMatrixWorld(true);
    const positions: { name: string; x: number; z: number }[] = [];
    let meshes = 0;
    loaded.scene.traverse((node: any) => {
      if (node.isMesh) meshes++;
      // GLTFLoader normaliza guiones en nombres; recoger ambos tipos.
      if (/^kit-(interior|cubierto)(_|$)/.test(node.name)) {
        const elements = node.matrixWorld.elements;
        positions.push({
          name: node.name.replace(/_\d+$/, ""),
          x: elements[12],
          z: elements[14],
        });
      }
    });
    return { meshes, positions };
  }, bytes.toString("base64"));
  expect(inspection.meshes).toBeGreaterThan(200);
  expect(
    inspection.positions
      .filter((p) => p.name === "kit-interior")
      .every((p) => p.z === -111),
  ).toBe(true);
  expect(
    inspection.positions
      .filter((p) => p.name === "kit-cubierto")
      .every((p) => p.z === 0),
  ).toBe(true);
  expect(inspection.positions).toHaveLength(8);
  expect(errors).toEqual([]);
});
