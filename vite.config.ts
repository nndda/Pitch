import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";

function abs(path: string): string {
  return resolve(__dirname, path)
}

// https://vite.dev/config/
export default defineConfig({
  root: abs("./src/"),
  plugins: [svelte()],
  publicDir: abs("./src/public/"),
  appType: "spa",
  build: {
    assetsDir: "./assets/",
    license: true,

    copyPublicDir: true,

    outDir: "../dist/",
    emptyOutDir: true,
  },
});
