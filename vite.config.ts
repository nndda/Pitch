import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";

function abs(path: string): string {
  return resolve(__dirname, path)
}

// Pitch CSS components tooling
import { readFile } from "fs/promises";

import postcss from "postcss";
import autoprefixer from "autoprefixer";

import cssnano from "cssnano";
import cssnanoPresetAdvanced from "cssnano-preset-advanced";

const postcsssssss = postcss([
  cssnano(cssnanoPresetAdvanced({
    discardOverridden: false,
    discardUnused: false,
    reduceIdents: false,
  })),
  autoprefixer(),
]);

// https://vite.dev/config/
export default defineConfig({
  root: abs("./src/"),

  plugins: [
    svelte(),

    // TODO:
    // WHAT. THE. FUCK. VITE???? LET ME HAVE MY CUSTOM CSS MODULE!!!!!!!!!!!!!
    {
      name: "pitch-css-component",
      enforce: "pre",

      async load(id) {

        // WHY IS THE PLUGIN FIGHTING MEEEEAWODNAWIDUNIASBUBDUAWYNDIQNOCMSZOMOWQDOUNWQIDUNQWIDUHIUH
        // I just want to handle the Pitch's CSS component manually myself, that's all...
        //
        // But why is Vite keep on insisting on touching it too!!!
        // LEMME IMPORT IT THE WAY I WANT!!!!!
        // For some reason, custom CSS module still got processed by Vite.
        //
        // So, as a workaround, extensionless copy of the components' CSS source code will be created
        // with a script on pre dev/build (for now).
        // if (!id.endsWith(".css?css-component")) { // <- no, absolutely no .css apparently
        if (!id.endsWith("?css-component")) return;

        const
          path = id.replace("?css-component", "")
        , cssRaw = await readFile(path, "utf-8")

        , css = (await postcsssssss
            .process(cssRaw, { from: path })
          ).css
        ;

        return {
          code: `export default ${JSON.stringify({
            raw: cssRaw,
            compressed: css,
          })}`
        };
      }
    },
  ],

  publicDir: abs("./src/public/"),
  appType: "spa",
  build: {
    assetsDir: "./assets/", // relative to root
    license: true,

    copyPublicDir: true,

    outDir: "../dist/", // also relative to root
    emptyOutDir: true,
  },
});
