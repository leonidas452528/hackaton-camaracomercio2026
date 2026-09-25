import type { Scene } from "three";
import {
  site,
  emergencyCalculation,
  refugeLayout,
  storageLayout,
  sources,
} from "./data/site";

/** Copia independiente: no modifica la escena interactiva ni exporta DOM/datos del mapa. */
export async function exportEmergencyScene(scene: Scene): Promise<ArrayBuffer> {
  const snapshot = scene.clone(true);
  snapshot.name = "Cali Activa — emergencia ilustrativa";
  snapshot.userData = {
    state: "emergency",
    units: "meters",
    coordinateSystem: site.coordinates,
    disclaimer: refugeLayout.value.legend,
    authority:
      "La activación la decide la autoridad. Sin evaluación estructural ni concepto de Bomberos; disponibilidad por confirmar.",
    sources,
    quantities: emergencyCalculation,
    layout: refugeLayout,
    traceability: storageLayout.value.traceability,
    omitted:
      "Etiquetas y pantallas HTML, controles, mapa IDESC y animaciones. Consultar las capturas y LEEME.md adjuntos.",
  };
  // Iluminación del visor: no incluir luces incompatibles ni cámaras auxiliares.
  const excluded = snapshot.children.filter(
    (child) => child.type.endsWith("Light") || child.type.endsWith("Camera"),
  );
  excluded.forEach((child) => snapshot.remove(child));
  snapshot.updateMatrixWorld(true);
  const { GLTFExporter } = await import(
    "three/addons/exporters/GLTFExporter.js"
  );
  const result = await new GLTFExporter().parseAsync(snapshot, {
    binary: true,
    onlyVisible: true,
  });
  if (!(result instanceof ArrayBuffer))
    throw new Error("El exportador no produjo un GLB binario.");
  return result;
}
