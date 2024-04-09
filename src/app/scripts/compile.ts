import { copyComponentsCSS } from "./copy";
import {
  PitchComponentData,
  PitchComponentsCollection,
  compileUsedVariables,
} from "./components"

export function compileComponents(
  compList : string[],
  compObj: PitchComponentsCollection
) {
  let usedVars : Array<string> = [];
  let css = "";

  for (const comp in compObj) {
    if (compList.includes(compObj[comp].name)) {
      compObj[comp].variables.forEach(v => {
        if (!usedVars.includes(v)) {
          usedVars.push(v);
        }
      });
    }
  }

  console.log(usedVars);
  css += compileUsedVariables(usedVars);

  for (const comp in compObj) {
    if (compList.includes(compObj[comp].name)) {
      css += compObj[comp].css;
    }
  }

  copyComponentsCSS(css);
}