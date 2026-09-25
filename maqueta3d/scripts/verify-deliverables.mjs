import { readFile, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { validateBytes } from "gltf-validator";
const directory = new URL("../deliverables/renders/", import.meta.url);
const files = [
  "general.png",
  "refugio_coliseo.png",
  "refugio_campo.png",
  "acopio.png",
  "registro.png",
  "cotidiano.png",
  "recuperacion.png",
  "sistema_agua.png",
  "coliseo_cubierto.png",
  "albergue_exterior.png",
  "cali_activa.glb",
];
const manifest = [];
for (const file of files) {
  const bytes = await readFile(new URL(file, directory));
  const entry = {
    file,
    bytes: bytes.length,
    sha256: createHash("sha256").update(bytes).digest("hex"),
  };
  if (file.endsWith(".png")) {
    assert.equal(bytes.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
    entry.width = bytes.readUInt32BE(16);
    entry.height = bytes.readUInt32BE(20);
    assert.equal(entry.width, 1920, file);
    assert.equal(entry.height, 1080, file);
  } else {
    const report = await validateBytes(bytes, { uri: file, maxIssues: 10000 });
    await writeFile(
      new URL("validacion_glb.json", directory),
      JSON.stringify(report, null, 2) + "\n",
    );
    assert.equal(report.issues.numErrors, 0, JSON.stringify(report.issues));
    assert.equal(report.issues.numWarnings, 0, JSON.stringify(report.issues));
    entry.validation = {
      errors: report.issues.numErrors,
      warnings: report.issues.numWarnings,
    };
    console.log(
      `GLB: ${report.issues.numErrors} errores, ${report.issues.numWarnings} advertencias.`,
    );
  }
  manifest.push(entry);
}
await writeFile(
  new URL("manifest.json", directory),
  JSON.stringify(
    {
      description:
        "Entregables de la maqueta ilustrativa; no certifican disponibilidad ni condiciones técnicas.",
      files: manifest,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  "Diez capturas 1920 × 1080 y GLB verificados; manifiesto SHA-256 generado.",
);
