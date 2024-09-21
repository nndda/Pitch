// Build script for the components.
// Must be ran before building the app,
// And whenever anything under `src/components/` is modified.

const fs = require("fs");
const path = require("path");
const sass = require("sass");
const CleanCSS = require("clean-css");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
import { parse } from 'yaml'

import {
  PitchComponentData,
  PitchComponentsCollection,
  getUsedVariables,
} from "./src/app/scripts/components";

const componentsPath : string = path.resolve(__dirname, "src/components/");

// Create output components directories
[
  "dist/components",
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

let componentsCollection : PitchComponentsCollection = {};

function isValidComponent(compPath : string) : boolean {
  if (
    isFileExt(compPath, ".scss") &&
    // Ignore '_variables.scss' file.
    path.basename(compPath) !== "_variables.scss"
  ) {

    // Create absolute path.
    let compPathAbs : string = path.join(componentsPath, compPath)

    // Check if there's component's yaml file.
    let compYAMLPath : string = replaceFileExt(compPathAbs, ".yaml");

    if (!fs.existsSync(compYAMLPath)) {
      console.error(`${path.basename(compPathAbs)} component's .yaml is missing.`);
      return false;
    }

    return isValidCompYAML(
      parse(fs.readFileSync(
        compYAMLPath, 
        { encoding: "utf-8" }
      ))
    );
  }
  return false;
}

// Check if 'filename' use 'ext' file extension.
// 'ext' must includes the dot.
function isFileExt(filename : string, ext : string) : boolean {
  return path.extname(filename) === ext;
}

// Replace the file extension of 'filename' to 'newExt'.
// 'newExt' must includes the dot.
function replaceFileExt(filename: string, newExt: string): string {
  return filename.substring(0, filename.lastIndexOf(".")) + newExt;
}

// Required property for the component's yaml file.
const requiredCompData = ["name", "description", "sampleHTML"];
// Validate component's yaml.
function isValidCompYAML(parsedData : any) : boolean {
  for (const property of requiredCompData) {
    if (!parsedData.hasOwnProperty(property)) {
      console.error(`Property ${property} is missing.`);
      return false;
    }
  }
  return true;
}

// _variables.scss file is processed separately.
componentsCollection["_variables"] = {
  name: "_variables",
  css: compileComponentsCSS(
    sass.compileString(
      fs.readFileSync(
        path.join(componentsPath, "_variables.scss"),
        { encoding: "utf-8" }
      )
    ).css
  ),
};
fs.writeFileSync(
  path.resolve(
    __dirname, "dist/components/" +
    replaceFileExt("_variables.scss", ".css")
  ),
  componentsCollection["_variables"].css
);

// Compile and add component to 'componentsCollection'.
// 'compPath' is the path to the .scss source file.
function buildComponent(compPath : string) : void {
  // Validate component.
  if (isValidComponent(compPath)) {

    console.log(`Processing ${compPath}...`);

    // Get the absolute filepath of the .scss source file.
    const compPathAbs : string = path.join(componentsPath, compPath);

    // Get component's yaml data.
    const compData : any = parse(
      fs.readFileSync(
        replaceFileExt(compPathAbs, ".yaml"), 
        { encoding: "utf-8" }
      )
    );

    // Component's type based off its parent's directory name.
    const compType : string = path.basename(path.dirname(compPathAbs));

    // Compile SCSS file to CSS string 'cssStr'.
    let cssStr = compileComponentsCSS(
      sass.compileString(
        fs.readFileSync(compPathAbs, { encoding: "utf-8" })
      ).css
    );

    // Component's 'id' consist of its type, and its name.
    // i.e. 'components__accordion'
    const compID : string = compType + "__" + replaceFileExt(path.basename(compPath), "");

    // Save the compiled CSS string 'cssStr' to the output directory.
    fs.writeFileSync(
      path.resolve(
        __dirname, "dist/components/" + compID + ".css"
      ),
      cssStr
    );

    // Define components to the collection.
    componentsCollection[compID] = <PitchComponentData>({
      // Component's data. Refer to src/app/components.ts for more info.
      name: compData["name"],
      description: compData["description"],
      sampleHTML: compData["sampleHTML"],
      css: cssStr,
      type: compType,
      variables: getUsedVariables(cssStr),
    });
  }
}

// Crawl through the 'componentsPath' directory and its subdirectories.
fs
  .readdirSync(componentsPath, {recursive : true})
  // Call 'buildComponent()' for each files inside.
  .forEach((component : string) => {
    buildComponent(component);
});

// Log all component's CSS.
let cssOut = "";
for (const i in componentsCollection) {
  cssOut += componentsCollection[i].css;
}

console.log(
  "-".repeat(80),
  "\n",
  cssOut,
  "\n",
  "-".repeat(80),
);

// Save components collection to JSON.
const componentsCollectionJSONStr : string = JSON.stringify(componentsCollection);
// In the following directories.
[
  "dist/app/",
  "dist/",
  "src/app/",
].forEach((value) => {
  fs.writeFileSync(
    path.resolve(__dirname, value + "components.json"),
    componentsCollectionJSONStr
  );
});


// Compress and process CSS string 'srcCSS' with CleanCSS, PostCSS, and Autoprefixer.
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
