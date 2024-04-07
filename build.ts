const fs = require("fs");
const path = require("path");
const sass = require("sass");
const CleanCSS = require("clean-css");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");

import {
  components,
  getUsedVariables,
  PitchComponentData,
} from "./src/app/scripts/components";

const componentsPath = path.resolve(__dirname, "src/components");

[
  "dist/components",
  "dist/app",
].forEach(dir => {
  fs.mkdir(
    path.resolve(__dirname, dir),
    { recursive: true },
    (err: any) => {
      if (err) throw err;
    }
  );
});

let componentObjects : Array<PitchComponentData> = [];

fs.readdirSync(componentsPath).forEach((component: string) => {
  let cssStr = compileComponentsCSS(
    sass.compileString(
      fs.readFileSync(
        path.join(componentsPath, component),
        { encoding: "utf-8" }
      )
    ).css
  );

  fs.writeFileSync(
    path.resolve(__dirname, "dist/components/" + component.replace(".scss", ".css")),
    cssStr
  );

  componentObjects.push({
    name: component.replace(".scss", ""),
    variables: getUsedVariables(cssStr),
    css: cssStr,
  });
});

fs.writeFileSync(
  path.resolve(__dirname, "dist/app/" + "components.json"),
  JSON.stringify(componentObjects)
);

function compileComponentsCSS(srcCSS : string): string {
  let css = srcCSS;

  postcss([
    autoprefixer({
      overrideBrowserslist: [
        // "Electron 11.5.0",
        "since 2022",
      ]
    })
  ]).process(css, {from: undefined}).then((result: any) => {
    result.warnings().forEach((warn: any) => {
      console.warn(warn.toString())
    });
    css = result.css;
  });

  let cssCleaned = new CleanCSS({
    level: 2,
  }).minify(
    // but why
    css
    .replace(/"\\\\/g, "\"\\")
    .replace("@charset \"UTF-8\";", "")
  );

  cssCleaned.errors.forEach((err: any) => {
    console.error(err);
  });
  cssCleaned.warnings.forEach((warn: any) => {
    console.warn(warn);
  });

  return cssCleaned.styles;
}

function buildObject() {

}