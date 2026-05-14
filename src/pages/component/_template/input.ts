import {
  inputs,
} from "../../../states/storage.svelte";

const rootStyle = document.documentElement.style;

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
  rootStyle.setProperty(
    "--" + cssVar,
    `${value}`,
  );

  inputs.update(cssVar, value);
}

export function removeUserInput(cssVar: string): void {
  rootStyle.removeProperty("--" + cssVar);
  delete inputs.state[cssVar];
  inputs.flush();
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
