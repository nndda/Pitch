const fs = require("fs");
const path = require("path");
const sass = require("sass");
const CleanCSS = require("clean-css");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");

var css = "";
const componentsPath = path.resolve(__dirname, "src/components");

fs.readdirSync(componentsPath).forEach(component => {
  css += fs.readFileSync(
    path.join(componentsPath, component),
    {encoding: "utf-8"}
  );
});

var cssCleaned = new CleanCSS({
  level: 2
}).minify(
  sass.compileString(css).css
  // but why
  .replace(/"\\\\/g, "\"\\")
  .replace("@charset \"UTF-8\";", "")
);

cssCleaned.errors.forEach(err => {
  console.error(err);
});
cssCleaned.warnings.forEach(warn => {
  console.warn(warn);
});

postcss([
  autoprefixer({
    overrideBrowserslist: [
      "Electron 11.5.0",
      "since 2022",
    ]
  })
]).process(cssCleaned.styles, {from: undefined}).then(result => {
  result.warnings().forEach(warn => {
    console.warn(warn.toString())
  });
  fs.writeFileSync(
    path.join(path.resolve(__dirname, "dist"), "pitch.css"),
    result.css
  );
});