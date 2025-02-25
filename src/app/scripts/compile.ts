import {
  PitchComponentsCollection,
  compileUsedVariables,
} from "./components"

export function compileComponents(
  compList : string[],
  compObj: PitchComponentsCollection,
  compInputs: Record<string, string>,
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

  return compileUsedVariables(usedVars) + Object.keys(compInputs).reduce((result, key) => {
    return result.replace(new RegExp(key, "g"), compInputs[key]);
  }, css);
}