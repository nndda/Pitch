import {
  PitchComponentsCollection,
  compileUsedVariables,
} from "./components"

export function compileComponents(
  compList : string[],
  compObj: PitchComponentsCollection
) : string {
  const usedVars : string[] = [];
  let css = "";

  compList.forEach((comp : string) => {
    if (comp !== "") {
      css += compObj[comp].css;

      compObj[comp].variables.forEach((vars : string) => {
        if (!usedVars.includes(vars)) {
          usedVars.push(vars);
        }
      });
    }
  });

  return compileUsedVariables(usedVars) + css;
}