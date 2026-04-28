import {
  compsUserInputStorage,
} from "../../../states/storage.svelte";

const rootStyle = document.documentElement.style;

export function applyUserInput(
  cssVar: string,
  value: ComponentUserInputValue,
): void {
  rootStyle.setProperty(
    "--" + cssVar,
    `${value}`,
  );

  compsUserInputStorage.update(cssVar, value);
}

export function removeUserInput(cssVar: string): void {
  rootStyle.removeProperty("--" + cssVar);
  delete compsUserInputStorage.state[cssVar];
  compsUserInputStorage.flush();
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
