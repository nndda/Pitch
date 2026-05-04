import {
  runtimeData,
} from "../states/runtime";

interface CSSCompilerOption {
  compressed: boolean,
  layer: boolean,
}

export const options: CSSCompilerOption = {
  compressed: true,
  layer: false,
}

export function compile(): string {
  const
    inputStyle = document.documentElement.getAttribute("style")
  , cssOut: string[] = []
  ;

  if (inputStyle) {
    cssOut.push(
      options.compressed
        ? `:root{${inputStyle}}`
        : `:root{\n${inputStyle}\n}` // TODO:
    );
  }

  for (const catId in runtimeData) {
    const
      compCatData = runtimeData[catId].components
    ;

    for (const compId in compCatData) {
      if (compCatData[compId].type === "item") {
        const
          compData = compCatData[compId] as ComponentRuntimeItem
        ;

        if (compData.chkBox!.checked) {
          cssOut.push(
            compData.manifest.css ? compData.manifest.css.compressed : ""
          );
        }
      }
    }
  }

  return cssOut.join("");
}
