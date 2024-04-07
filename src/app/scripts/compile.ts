import { copyComponentsCSS } from "./copy";
import { PitchComponentData, compileUsedVariables } from "./components"

export function compileComponents(compList : string[]) {
  fetch("./components.json")
    .then( response => response.text())
    .then( data => {
      const compObj : Array<PitchComponentData> = JSON.parse(data);
      let usedVars : Array<string> = [];
      let css = "";

      compObj.forEach(comp => {
        if (compList.includes(comp.name)) {
          comp.variables.forEach(v => {
            if (!usedVars.includes(v)) {
              usedVars.push(v);
            }
          });
        }
      });

      css += compileUsedVariables(usedVars);

      compObj.forEach(comp => {
        if (compList.includes(comp.name)) {
          css += comp.css;
        }
      });

      copyComponentsCSS(css);

    }).catch( err => {
      console.log(err)
    });
}