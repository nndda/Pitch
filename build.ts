// Build script for the components.
// Must be ran before building the app,
// And whenever anything under `src/components/` is modified.

import * as fs from "fs";
import * as path from "path";
import * as sass from "sass";
const CleanCSS = require("clean-css");
import postcss from "postcss";
const autoprefixer = require("autoprefixer");
import { parse } from "yaml";
const DOMPurifyC = require("dompurify");
import { JSDOM } from "jsdom";

const window = new JSDOM("").window;
const DOMPurify = DOMPurifyC(window);

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
  "src/pitch-cdn/assets",
].forEach((dir : string) => {
  fs.mkdirSync(
    path.resolve(__dirname, dir),
    { recursive: true }
  );
});

const componentsCollection : PitchComponentsCollection = {};

function isValidComponent(compPath : string) : boolean {
  if (
    isFileExt(compPath, ".scss") &&
    // Ignore '_variables.scss' file.
    path.basename(compPath) !== "_variables.scss"
  ) {

    // Create absolute path.
    const compPathAbs : string = path.join(componentsPath, compPath)

    // Check if there's component's yaml file.
    const compYAMLPath : string = replaceFileExt(compPathAbs, ".yaml");

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

export interface CompYAML {
  name: string,
  string: string,
  sampleHTML: string[],
}

// Required property for the component's yaml file.
const requiredCompData = ["name"];
// Validate component's yaml.
function isValidCompYAML(parsedData : CompYAML) : boolean {
  for (const property of requiredCompData) {
    if (!Object.prototype.hasOwnProperty.call(parsedData, property)) {
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
    fs.readFileSync(
      path.join(componentsPath, "_variables.scss"),
      { encoding: "utf-8" }
    )
  ),
};
fs.writeFileSync(
  path.resolve(
    __dirname, "dist/components/" +
    replaceFileExt("_variables.scss", ".css")
  ),
  componentsCollection["_variables"].css
);

const CDNComps: string[] = [
  "Accordion",
  "Callout",
  "Code Block",
  "Dot Leader",
  "Image Comparison",
  "Info List",
  "Input",
  "Label",
    "Grouped",
  "Read More",
  // Spoiler
    "On Hover",
    "On Click",
  "Table",
  "Timeline List",
  "Toggle",
  "Tooltip",
];
const CDNCompsCompiled: Record<string, string> = {};
const CDNCompsAll: string[] = [];

// Compile and add component to 'componentsCollection'.
// 'compPath' is the path to the .scss source file.
function buildComponent(compPath : string) : void {
  // Validate component.
  if (isValidComponent(compPath)) {

    console.log(`Processing ${compPath}...`);

    // Get the absolute filepath of the .scss source file.
    const compPathAbs : string = path.join(componentsPath, compPath);

    // Get component's yaml data.
    const compData : PitchComponentData = parse(
      fs.readFileSync(
        replaceFileExt(compPathAbs, ".yaml"), 
        { encoding: "utf-8" }
      )
    );

    // Component's type based off its parent's directory name.
    const compType : string = path.basename(path.dirname(compPathAbs));

    const scssRaw: string = fs.readFileSync(compPathAbs, { encoding: "utf-8" });

    // Compile SCSS file to CSS string 'cssStr'.
    const cssStr: string = compileComponentsCSS(scssRaw);

    // Component's 'id' based off its type, and its name.
    // i.e. 'components__accordion'
    const compID : string = compType + "__" + replaceFileExt(path.basename(compPath), "");

    // Save the compiled CSS string 'cssStr' to the output directory.
    fs.writeFileSync(
      path.resolve(
        __dirname, "dist/components/" + compID + ".css"
      ),
      cssStr
    );

    if (CDNComps.includes(compData.name)) {
      CDNCompsCompiled[compData.name.replace(" ", "-").toLowerCase()] = cssStr;
      CDNCompsAll.push(cssStr);
    }

    // Define components to the collection.
    componentsCollection[compID] = {
      // Component's data. Refer to src/app/components.ts for more info.
      name: compData.name,
      nameDisplay: compData.nameDisplay ?? compData.name,
      // Sanitize component's description.
      // description: sanitizeHTML(compData.description),
      // Sanitize component's preview HTML.
      sampleHTML:
        compData.sampleHTML !== undefined ?
        compData.sampleHTML.map((value : string) => sanitizeHTML(value)) : [],
      sampleIMG:
        compData.sampleIMG !== undefined ?
        compData.sampleIMG.map((value : string) => "./components/assets/" + value) : [],
      css: cssStr,
      cssRaw: compileComponentsCSS(scssRaw, false),
      type: compType,

      sub:
        compData.sub !== undefined ?
        compType + "__" + compData.sub : undefined,

      inputs: compData.inputs ?? [],
      inputVars: compData.inputVars,

      notes: compData.notes ?? [],

      groupOnly: compData.groupOnly ?? false,

      scopes: compData.scopes,

      variables: getUsedVariables(cssStr),
    } as PitchComponentData;
  }
}

// Crawl through the 'componentsPath' directory and its subdirectories.
(fs.readdirSync(componentsPath, {recursive : true}) as string[])
  // Call 'buildComponent()' for each files inside.
  .forEach((component : string) => {
    buildComponent(component);
});

// Log all component's CSS.
// let cssOut = "";
// for (const i in componentsCollection) {
//   cssOut += componentsCollection[i].css;
// }

console.log(
  "-".repeat(80),
  "\n",
  // cssOut,
  "\n",
  // "-".repeat(80),
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

// CodePen data
let codepenCSS: string = "";
for (const comp in componentsCollection) {
  if (
    !comp.startsWith("tweaks") &&
    !comp.startsWith("_variables")
  ) {
    codepenCSS += componentsCollection[comp].css;
  }
}
fs.writeFileSync(
  path.resolve(__dirname, "codepen-css.css"),
  codepenCSS
    .replace(/#wrapper/g, "body")
    .replace(/:not\(\.game_info_panel_widget\)\s*>\s*/g, "") // Resolve Table component issue
);

// import { varsList } from "./src/app/scripts/components"; Doesn't work for some reason :/

// Compress and process CSS string 'srcCSS' with CleanCSS, PostCSS, and Autoprefixer.
function compileComponentsCSS(srcCSS : string, minified: boolean = true): string {
  let css: string = sass.compileString(srcCSS).css;

  postcss([
    autoprefixer({
      overrideBrowserslist: [
        "Electron 11.5.0",
        "since 2022",
      ]
    })
  ]).process(css, {from: undefined}).then((result : postcss.Result) => {
    result.warnings().forEach((warn : postcss.Warning) => {
      console.warn(warn.toString());
    });
    css = result.css;
  });
  css = css
    // but why
    .replace(/"\\\\/g, "\"\\")
    .replace("@charset \"UTF-8\";", "")
    ;

  if (minified) {
    const cssCleaned = new CleanCSS({
      level: 2,
    }).minify(css);

    cssCleaned.errors.forEach((err : string) => {
      console.error(err);
    });
    cssCleaned.warnings.forEach((warn : string) => {
      console.warn(warn);
    });

    return cssCleaned.styles;
  }

  // I have to define this here for it to be recognized for some reason ://
  // TODO: this
  const varsList: Record<string, string> = {
    "btn_f": "itchio_button_fg_color",
    "btn_s": "itchio_button_shadow_color",
    "btn": "itchio_button_color",
    "b2s": "itchio_bg2_sub",
    "b2": "itchio_bg2_color",
    "br": "itchio_border_color",
    "b": "itchio_bg_color",
    "t": "itchio_text_color",
    "l": "itchio_link_color",
  };

  // This is not good
  for (const varShort of [
    "btn_f",
    "btn_s",
    "btn",
    "b2s",
    "b2",
    "br",
    "b",
    "t",
  ]) {
    css = css.replace(
      // This is also not good
      new RegExp(`--${varShort}`, "gm"),
      `--${varsList[varShort]}`,
    );
  }

  return css;
}

fs.writeFileSync(
  path.resolve(__dirname, "./src/pitch-cdn/components-cdn.json"),
  JSON.stringify(CDNCompsCompiled)
);

// fs.writeFileSync(
//   path.resolve(__dirname, "./src/pitch-cdn/assets/all.css"),
//   CDNCompsAll.join("")
// );

fs.mkdirSync(path.resolve(__dirname, "./css"), { recursive: true });

fs.writeFileSync(
  path.resolve(__dirname, "./css/components.css"),
  `@charset "UTF-8";` + componentsCollection["_variables"].css + CDNCompsAll.join("")
);

// Sanitize HTML string
DOMPurify.setConfig({
  USE_PROFILES: {
    html: true,
    svg: false,
    mathMl: false,
  },
  FORBID_TAGS: [
    "style",
    "script",
    "svg",
    "link",
  ],
  ALLOWED_ATTR: [
    "class",
    "style",
    "width",
    "height",
  ],
  ALLOW_ARIA_ATTR: false,
  ALLOW_DATA_ATTR: false,
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
  RETURN_TRUSTED_TYPE: false,
});

function sanitizeHTML(dirtyHTML : string) : string {
  if (!dirtyHTML) return "";

  if (
    dirtyHTML.trimStart().startsWith("<!-- NOTE -->") ||
    dirtyHTML.trimStart().startsWith("<!-- IMG -->") ||
    dirtyHTML.trimStart().startsWith("<!-- CSS -->")
  ) {
    return dirtyHTML.trimStart();
  }

  return (DOMPurify.sanitize(dirtyHTML) as string);
    // Wish I didn't have to do this.
    // .replace(/href="[^"]+"/g, `href="#"`);
}