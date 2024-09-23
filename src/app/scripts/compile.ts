import {
  PitchComponentsCollection,
  compileUsedVariables,
} from "./components"

export function compileComponents(
  compList : string[],
  compObj: PitchComponentsCollection
) : string {
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

  return css;
}