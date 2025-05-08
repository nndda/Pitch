import {
  PitchComponentsCollection,
  compileUsedVariables,
} from "./components"

// <style> to apply user-input styling
const compInputStyleOverride: HTMLStyleElement = document.getElementById("comp-input-override") as HTMLStyleElement;

export function compileComponents(
  // Selected components
  compList : string[],

  // Components definition object
  compObj: PitchComponentsCollection,

  // User-input
  compInputs: Record<string, string>,

): string {

  // Main CSS
  let css: string = "";
  // Main CSS variables
  const usedVars : string[] = [];

  // User-input variables for all components
  let cssInpPreview: string = "";

  // User-input variables for selected components
  let cssInp: string = "";

  for (const comp in compObj) {
    // Check if the current component is selected by the user
    const compIsSelected: boolean = compList.includes(comp);

    // Grab main CSS of the selected components
    if (compIsSelected) {
      css += compObj[comp].css;

      for (let i: number = compObj[comp].variables.length; i-- > 0;) {

        if (!usedVars.includes(compObj[comp].variables[i])) {
          usedVars.push(compObj[comp].variables[i]);
        }

      }
    }

    // TODO: if components are using its default value, do not use user-input value

    // Grab the user-input of all components
    if (compObj[comp].inputVars) {

      // From variable-based input, create CSS variables declarations
      let compiledInpVars: string = "";

      compiledInpVars += `${compObj[comp].inputVars.selector}{`;

      for (const owo in compObj[comp].inputVars.vars) {
        compiledInpVars += `--${compObj[comp].inputVars.vars[owo]}:"${owo}";`;
      }

      compiledInpVars += "}";


      cssInpPreview += compiledInpVars;

      if (compIsSelected) {
        cssInp += compiledInpVars;
      }

    }
  }

  // Replace the variables placeholder with the variables value
  for (const inp in compInputs) {
    const RE: RegExp = new RegExp(inp, "g");

    css = css.replace(RE, compInputs[inp]);
    cssInp = cssInp.replace(RE, compInputs[inp]);
    // css = (cssInp + css).replace(RE, compInputs[inp]); // <-- buggy

    cssInpPreview = cssInpPreview.replace(RE, compInputs[inp]);
  }

  compInputStyleOverride.textContent = cssInpPreview;

  // return `@charset "UTF-8";` + compileUsedVariables(usedVars) + css; // <-- buggy
  return `@charset "UTF-8";` + compileUsedVariables(usedVars) + cssInp + css;
}