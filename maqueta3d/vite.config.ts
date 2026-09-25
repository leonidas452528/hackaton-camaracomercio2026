import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      "three/addons/exporters/GLTFExporter.js",
      "three/addons/loaders/GLTFLoader.js",
    ],
  },
  build: { chunkSizeWarningLimit: 1100 },
});
