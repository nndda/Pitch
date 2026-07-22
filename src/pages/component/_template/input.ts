import { inputStyling } from "../../../states/runtime";
import { getProject, projectUpdate } from "../../../storage/db";

export async function isInputVariablesCompatible(
  data: ComponentData,
): Promise<boolean> {

  const
    inputData = (await getProject())?.inputs!
  ;

  if (data.compatibleOnInputs) {
    const
      inputCurrent = Object.keys(inputData)
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

export async function applyUserInput(
  cssVar: string,
  value: ComponentUserInputValue,
): Promise<void> {
  // @ts-ignore
  await projectUpdate({ ["inputs." + cssVar]: value });

  inputStyling.replaceSync("#wrapper {" + await constructRule() + "}");
}

export async function removeUserInput(cssVar: string): Promise<void> {
  await projectUpdate(proj => {
    delete proj.inputs[cssVar];
  });

  inputStyling.replaceSync("#wrapper {" + await constructRule() + "}");
}

export async function constructRule(): Promise<string> {
  const
    inputData = (await getProject())?.inputs!
  , cssOut: string[] = []
  ;

  for (const cssVar in inputData) {
    cssOut.push(`--${cssVar}: ${inputData[cssVar]}`);
  }

  return cssOut.join(";");
}
