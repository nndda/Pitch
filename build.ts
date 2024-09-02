const fs = require("fs");
const path = require("path");
const sass = require("sass");
const CleanCSS = require("clean-css");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");

import {
  components,
  PitchComponentsLibrary,
  PitchComponentsCollection,
  getUsedVariables,
  PitchComponentData,
} from "./src/app/scripts/components";

const componentsPath : string = path.resolve(__dirname, "src/components");

[
  "dist/components",
  "dist/components/cosmetics",
  "dist/app",
].forEach((dir : string) => {
  fs.mkdirSync(
    path.resolve(__dirname, dir),
    { recursive: true },
    (err: any) => {
      if (err) throw err;
    }
  );
});

let componentObjects : PitchComponentsCollection = {};

function buildComponent(component : string) : void {
  console.log(`Processing ${component}...`);

  const compName = component
    .replace(".scss", "");

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

  componentObjects[compName] = {
    name: compName,
    css: cssStr,
  };

  if (component !== "variables") {
    componentObjects[compName].sampleHTML = [];

    for (const n in components[compName].sampleHTML) {
      componentObjects[compName].sampleHTML.push(n);
    }
    componentObjects[compName].desc = components[compName].desc;
    componentObjects[compName].variables = getUsedVariables(cssStr);
  }
}

export function processComponents() : void {
  fs
    .readdirSync(componentsPath, {recursive : true})
    .forEach((component : string) => {
      if (component.endsWith(".scss")) {
        buildComponent(component);
      }
  });
}

processComponents();

let cssOut = "";
for (const i in componentObjects) {
  cssOut += componentObjects[i].css;
}
console.log(
  "-".repeat(80),
  "\n",
  cssOut,
  "\n",
  "-".repeat(80)
);

fs.writeFileSync(
  path.resolve(__dirname, "dist/app/" + "components.json"),
  JSON.stringify(componentObjects)
);
// but why
fs.writeFileSync(
  path.resolve(__dirname, "dist/" + "components.json"),
  JSON.stringify(componentObjects)
);
fs.writeFileSync(
  path.resolve(__dirname, "src/app/" + "components.json"),
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
  ]).process(css, {from: undefined}).then((result : any) => {
    result.warnings().forEach((warn : any) => {
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

  cssCleaned.errors.forEach((err : any) => {
    console.error(err);
  });
  cssCleaned.warnings.forEach((warn : any) => {
    console.warn(warn);
  });

  return cssCleaned.styles;
}
