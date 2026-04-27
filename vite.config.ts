import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";

function abs(path: string): string {
  return resolve(__dirname, path)
}

// Pitch CSS components tooling
// TODO: make the whole components/decorations/tweaks programmable/DRY
import {
  readFile,
  copyFile,
} from "fs/promises";

import {
  readdirSync,
} from "fs";

import postcss from "postcss";
import autoprefixer from "autoprefixer";

import cssnano from "cssnano";
import cssnanoPresetAdvanced from "cssnano-preset-advanced";

// i hate life
import fg from "fast-glob";

const
  postcsssssss = postcss([
    cssnano(cssnanoPresetAdvanced({
      discardOverridden: false,
      discardUnused: false,
      reduceIdents: false,
    })),
    autoprefixer(),
  ])
, CSSCompsBaseDir = "src/pages/component/"
, reCSSCompsSrc = /src\/pages\/component\/(components|decorations)\/.+\.css$/
, reCSSExt = /\.css$/
;

console.log(
  "Pitch: dev server started",
  "\n",
  "Pitch: copying components' CSS...",
);

for (const compType of ["components", "decorations",]) {
  for (const path of readdirSync(CSSCompsBaseDir + compType)) {

    if (reCSSExt.test(path)) {
      // console.log(`Pitch: copying ${compType}/${path}...`);

      const absPath = CSSCompsBaseDir + compType + "/" + path;

      copyFile(absPath, absPath.replace(reCSSExt, "")).then(() => {
        console.log(`Pitch: ${compType}/${path} copied!`)
      });
    }

  }
}


// https://vite.dev/config/
export default defineConfig({
  root: abs("./src/"),

  plugins: [
    svelte(),

    // TODO: add error handling, maybe

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

    {
      name: "css-copy",

      configureServer(server) {
        server.watcher
          .add(fg.sync([
              "src/pages/component/components/*.css",
              "src/pages/component/decorations/*.css",
          ]))
          .on("change", path => {
            if (reCSSCompsSrc.test(path)) {

              console.log(`Pitch: ${path} changed, copying...`);

              copyFile(path, path.replace(reCSSExt, "")).then(() => {
                console.log(`Pitch: ${path} copied!`);

                // server.hot.send({ type: "full-reload", });
              });
            }
          });
      }
    }
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
