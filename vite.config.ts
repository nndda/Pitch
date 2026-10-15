import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "path";
import { execSync } from "child_process";

import packageJSON from "./package.json" with { type: "json" };
import tsconfigAppJSON from "./tsconfig.app.json" with { type: "json" };

import PitchCSSSourcePlugin from "./src/plugins/pitch-css-source";

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
      extensions: [ ".svelte" ],
    }),

    PitchCSSSourcePlugin,

    VitePWA({
      registerType: "prompt",
      workbox: {
        // globPatterns: ["**/*.{js,css,html,json,svg,ico,webp,png,woff,woff2}"],
        cleanupOutdatedCaches: true,
      },
      manifest: {
        name: "Pitch - CSS components for itch.io pages",
        short_name: "Pitch",
        description: "Catalogue of CSS components & tweaks, specifically made for your itch.io pages.",

        icons: [
          {
            src: "./icon.svg",
            sizes: "any",
            type: "image/svg+xml"
          },
          {
            src: "./icon.192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "./icon.512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],

        display: "standalone",

        theme_color: "#FC3A78",
        background_color: "#171620",

        categories: [
          "developer tools",
          "design"
        ],

        lang: "en",

        start_url: "/",

        prefer_related_applications: false
      },
    }),

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
