import { copyComponentsCSS } from "./copy";
import {
  PitchComponentsCollection,
  compileUsedVariables,
} from "./components"

export function compileComponents(
  compList : string[],
  compObj: PitchComponentsCollection
) {
  let usedVars : string[] = [];
  let css = "";

  compList.forEach((comp) => {
    css += compObj[comp].css;

    compObj[comp].variables.forEach((vars) => {
      if (!usedVars.includes(vars)) {
        usedVars.push(vars);
      }
    });
  });

  css += compileUsedVariables(usedVars);

  copyComponentsCSS(css);
}