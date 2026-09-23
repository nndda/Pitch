import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { resolve } from "path";
import { execSync } from "child_process";

import packageJSON from "./package.json" with { type: "json" };
import tsconfigAppJSON from "./tsconfig.app.json" with { type: "json" };

import PitchCSSSourcePlugin from "./src/plugins/pitch-css-source.ts";

import "./src/pages/component/component.d.ts";

interface AliasObj {
  find: string | RegExp,
  replacement: string,
}

function abs(path: string): string {
  return resolve(import.meta.dirname, path)
}

const
  args = process.argv
, root = abs(".")

, commitHash = JSON.stringify(execSync("git rev-parse HEAD").toString().trim())
, commitHash8 = commitHash.slice(1, 9)
, commitDate = JSON.stringify(execSync("git --no-pager log -1 --format=%cI").toString().trim())

, versionBuildShort = `${packageJSON.version}${args.includes("--nightly") ? "-nightly" :""}`
, versionBuild = `${versionBuildShort}-${commitHash8}`
;

// https://vite.dev/config/
export default defineConfig({
  root: resolve(root, "./src/"),

  plugins: [
    svelte({
      extensions: [ ".svelte", ".html" ],
      // include: [
      //   /\.svelte/,
      //   /\,html\?css-sample/,
      // ],
    }),
    PitchCSSSourcePlugin,

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

  resolve: {
    alias: [
      // NOTE: DRY, but...
      ... Object
        .entries(tsconfigAppJSON.compilerOptions.paths)
        .reduce(( prev, [ alias, pathArr ] ) => {

            function removeAst(str: string) {
              return str.replace(/\*/, "");
            }

            return [
              ...prev,
              (
                alias.endsWith("*") ?
                {
                  find: new RegExp(removeAst(alias).replaceAll(/\//g, "\\/") + "(.+)"),
                  replacement: removeAst(abs(pathArr[0])) + "$1",
                } :
                {
                  find: alias,
                  replacement: abs(pathArr[0]),
                }
              ),
            ];

          },
          [] as AliasObj[],
        )
    ],
  },

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
