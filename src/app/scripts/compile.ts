import {
  PitchComponentsCollection,
  compileUsedVariables,
} from "./components"

const compInputStyleOverride: HTMLStyleElement = document.getElementById("comp-input-override") as HTMLStyleElement;

export function compileComponents(
  compList : string[],
  compObj: PitchComponentsCollection,
  compInputs: Record<string, string>,
) : string {
  const usedVars : string[] = [];
  let css: string = "";

  // TODO: use for-loop instead. Or move it to the loop below.
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

  // Implement variable-user-inputs
  // Heavens forgive me for this abomination

  // User-input variables for all components
  let cssInpPreview: string = "";

  // User-input variables for selected components
  let cssInp: string = "";

  for (const comp in compObj) {
    if (compObj[comp].inputVars) {

      // From variable-based input, create CSS variables declarations
      let compiledInpVars: string = "";

      compiledInpVars += `${compObj[comp].inputVars.selector}{`;

      for (const owo in compObj[comp].inputVars.vars) {
        compiledInpVars += `--${compObj[comp].inputVars.vars[owo]}: "${owo}";`;
      }

      compiledInpVars += "}";


      cssInpPreview += compiledInpVars;

      if (compList.includes(comp)) {
        cssInp += compiledInpVars;
      }

    }
  }

  // Replace the variables placeholder with the variables value
  for (const inp in compInputs) {
    const RE: RegExp = new RegExp(inp, "g");

    // css = css.replace(RE, compInputs[inp]);
    // cssInp = cssInp.replace(RE, compInputs[inp]);
    css = (cssInp + css).replace(RE, compInputs[inp]);

    cssInpPreview = cssInpPreview.replace(RE, compInputs[inp]);
  }

  compInputStyleOverride.textContent = cssInpPreview;

  return `@charset "UTF-8";` + compileUsedVariables(usedVars) + css;
  // return `@charset "UTF-8";` + compileUsedVariables(usedVars) + cssInp + css;
}