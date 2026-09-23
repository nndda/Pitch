import type { Plugin } from "vite";
import type { ChildNode } from "postcss";

import { dirname, join, resolve, relative } from "path";
import { copyFile, readFile } from "fs/promises";
import { readFileSync, writeFileSync, existsSync } from "fs";
import fg from "fast-glob";
import postcss from "postcss";
import cssnano from "cssnano";
import cssnanoPresetAdvanced from "cssnano-preset-advanced";

import "../dev/generate-comp-samples";

const
  root = resolve(import.meta.dirname, "../../")

, cssGlob = fg.globSync(resolve(root, "./src/pages/component/**/*/styles.css"))
, pageGlob = fg.globSync(resolve(root, "./src/pages/component/**/*/page.docs.svelte"))
, reCSSExt = /\.css$/
, reCSSCompsSrc = /src\/pages\/component\/(components|decorations|tweaks)\/.+\.css$/
, reCSSTag = /^<\/style>$/gm

, postcsssssss = postcss([
    cssnano({
      // @ts-ignore
      plugins: cssnanoPresetAdvanced({
        discardOverridden: false,
        discardUnused: false,
        reduceIdents: false,
      }).plugins,
    }),
  ])
;

function extractFontFace(
  cssSrc: string,
): string {
  return postcss
    .parse(cssSrc, { from: undefined, })
    .nodes
    .map((child: ChildNode): string => {
      if (
        child.type === "atrule" &&
        child.name === "font-face"
      ) {
        return child.toString();
      }

      return "";
    })
    .join("")
  ;
}

function copyCSS(path: string) {
  copyFile(path, path.replace(reCSSExt, ""))
    .then(() => {
      console.log(`Pitch: ${relative(root, path)} copied!`)
    })
  ;
}

cssGlob.forEach(copyCSS);

// NOTE: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA

fg.globSync(
  resolve(root, "./src/pages/component/**/*/page.docs.svelte"),
).forEach(path => {
  const
    samplePage = join(dirname(path), "page.examples.svelte")
  , hasSamplesPage = existsSync(samplePage) && readFileSync(samplePage, "utf8").trim() !== ""
  ;

  writeFileSync(
    join(dirname(path), "page.svelte"),
    `
      <script lang="ts">
        export let data: ComponentData;
        import { ComponentPage } from "@elements";

        import Docs from "./page.docs.svelte";
        ${hasSamplesPage ? 'import Examples from "./page.examples.svelte";' : ""}
      </script>

      <ComponentPage
        data={data}

        PageDocumentation={Docs}
        PageExamples={
          ${hasSamplesPage ? 'Examples' : "null"}
        }
      />
    `,
    "utf-8",
  );
});

export default {
  name: "pitch-css-component",
  enforce: "pre",

  configureServer(server) {
    server.watcher
      .add(cssGlob)
      .on("change", path => {
        if (reCSSCompsSrc.test(path)) {
          console.log(`Pitch: ${path} changed, copying...`);

          copyCSS(path);
        }
      })
    ;

    // TODO: watch examples so that the server doesn't need to be restarted to generate the components' samples
    // server.watcher
    //   .add(
    //     ????
    //   )
    //   .on("unlink", generateSampleBarrelExport)
    //   .on("add", generateSampleBarrelExport)
    // ;
  },

  async load(id) {
    const
      isCSSSource = id.endsWith("?css-component")
    , isSample = id.endsWith(".html")
    ;

    if (
      !(isCSSSource || isSample)
    ) {
      return;
    }

    if (isCSSSource) {
      const
        path = id.replace("?css-component", "")
      , cssRaw = await readFile(path, "utf-8")

      , css = (await postcsssssss
          .process(cssRaw, { from: undefined })
        ).css

      , fontFaceRaw = extractFontFace(cssRaw)
        // NOTE: questionable
      , fontFace = (await postcsssssss
          .process(fontFaceRaw, { from: undefined })
        ).css
      ;

      return {
        invalidate: true,

        code: `export default ${JSON.stringify({
          raw: cssRaw,
          compressed: css,

          fontFaces: {
            raw: fontFaceRaw,
            compressed: fontFace,
          },
        } as CSSData)}`,
      };
    }

    if (isSample) {
      const
        path = id.replace("?css-component", "")
      , source = await readFile(path, "utf-8")

      , reRes = reCSSTag.exec(source)
      , src = source.split(reCSSTag, 2)
      ;

      return {
        code: `
          <script lang="ts">
            import { CodeEditor } from "@elements";
          </script>

          <CodeEditor
            html={\`${reRes ? src[1] : source}\`}
            ${reRes ? `css={\`${src[0].replace("<style>", "")}\`}` : ""}
          />
        `
      };
    }
  }
} as Plugin;
