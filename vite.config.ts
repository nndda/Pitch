import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve, join, relative } from "path";
import { execSync } from "child_process";

function abs(path: string): string {
  return resolve(import.meta.dirname, path)
}

// Pitch CSS components tooling
// TODO: make the whole components/decorations/tweaks programmable/DRY
import {
  readFile,
  copyFile,
} from "fs/promises";

// import {
//   readdirSync,
// } from "fs";

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
// , CSSCompsBaseDir = "src/pages/component/"
, reCSSCompsSrc = /src\/pages\/component\/(components|decorations|tweaks)\/.+\.css$/
, reCSSExt = /\.css$/
;

console.log(
  "Pitch: dev server started\nPitch: copying components' CSS...",
);

for (const cssPath of fg.globSync(
  join(abs("."), "src/pages/component/**/*.css"),
)) {
  copyFile(cssPath, cssPath.replace(reCSSExt, "")).then(() => {
    console.log(`Pitch: ${relative(import.meta.dirname, cssPath)} copied!`)
  });
}

import packageJSON from "./package.json";

const
  args = process.argv

, commitHash = JSON.stringify(execSync("git rev-parse HEAD").toString().trim())
, commitHash8 = commitHash.slice(1, 9)
, commitDate = JSON.stringify(execSync("git --no-pager log -1 --format=%cI").toString().trim())

, versionBuildShort = `${packageJSON.version}${args.includes("--nightly") ? "-nightly" :""}`
, versionBuild = `${versionBuildShort}-${commitHash8}`
;

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
              "src/pages/component/components/**/*/styles.css",
              "src/pages/component/decorations/**/*/styles.css",
              "src/pages/component/tweaks/**/*/styles.css",
          ]))
          .on("change", path => {
            if (reCSSCompsSrc.test(path)) {

              console.log(`Pitch: ${path} changed, copying...`);

              copyFile(path, path.replace(reCSSExt, "")).then(() => {
                console.log(`Pitch: ${path} copied!`);
              });
            }
          });
      }
    },

    {
      name: "output-version-file",

      generateBundle() {
        this.emitFile({
          type: "asset",
          fileName: "version.txt",
          source: versionBuild,
        })
      }
    },
  ],

  publicDir: abs("./src/public/"),
  appType: "spa",
  build: {
    assetsDir: "./", // relative to outDir
    license: true,

    copyPublicDir: true,

    outDir: "../dist/", // relative to root
    emptyOutDir: true,
  },

  define: {
    COMMIT_HASH: commitHash,
    COMMIT_DATE: commitDate,
    VERSION: JSON.stringify(versionBuildShort),
  }
});
