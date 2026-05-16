import { inputStyling } from "../../../states/runtime";
import { inputs } from "../../../states/storage.svelte";

export function isInputVariablesCompatible(
  data: ComponentData,
): boolean {
  if (data.compatibleOnInputs) {
    const
      inputCurrent = Object.keys(inputs.state)
    ;

    for (const inputReq of data.compatibleOnInputs) {
      if (!inputCurrent.includes(inputReq)) {
        return false;
      }
    }

    return true;
  }

  return false;
}

export function applyUserInput(
  cssVar: string,
  value: ComponentUserInputValue,
): void {
  inputs.update(cssVar, value);

  inputStyling.replaceSync("#wrapper {" + constructRule(inputs.state) + "}");
}

export function removeUserInput(cssVar: string): void {
  delete inputs.state[cssVar];
  inputs.flush();

  inputStyling.replaceSync("#wrapper {" + constructRule(inputs.state) + "}");
}

export function constructRule(
  inputData: Record<string, ComponentUserInputValue>,
): string {
  const
    cssOut: string[] = []
  ;

  for (const cssVar in inputData) {
    cssOut.push(`--${cssVar}: ${inputData[cssVar]}`);
  }

  return cssOut.join(";");
}
