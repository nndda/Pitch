import {
  runtimeData,
} from "../states/runtime";
import {
  inputs,
  settings,
} from "../states/storage.svelte";

function layerCSS(css: string): string {
  // if (settings.state["css.use_layer"]) {
    if (settings.state["css.minify"]) {
      return `@layer pitch-css{@layer b,u;@layer u{


  /* <<< YOUR STYLING HERE >>> */


}@layer b{${css}}}`;
    } else {
      return `@layer pitch-css {
  @layer base, user;

  @layer user {


    /* <<< YOUR STYLING HERE >>> */


  }

  @layer base {
${css}
  }
}`;
    }
  // }

  // return css;
}

export function compile(): string {
  const
    inputsProps = inputs.state

  , cssOut: string[] = []
  , cssMinify = settings.state["css.minify"]
  , cssIndent = cssMinify ? "" : "  "
  , cssNewline = cssMinify ? "" : "\n\n"

  , inputStyleProps: string[] = []
  , inputStyleIncludes: string[] = []
  ;

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
          const
            compInput = compData.manifest.input
          ;

          if (compInput) {
            for (const inputItem of compInput) {
              if ("type" in inputItem) {
                inputStyleIncludes.push(inputItem.var);
              }
            }
          }

          cssOut.push(
            cssMinify
              ? compData.manifest.css!.compressed
              : compData.manifest.css!.raw
          );
        }
      }
    }
  }

  if (Object.keys(inputsProps).length > 0) {
    for (const prop of inputStyleIncludes) {
      if (prop in inputsProps) {
        inputStyleProps.push( cssIndent +
          (
            "--" + prop + ": " + inputsProps[prop] + ";"
          )
        );
      }
    }
  }

  const
    cssOutStr = (
      inputStyleProps.length > 0
        ? [":root {", ... inputStyleProps, "}"].join(cssMinify ? "" : "\n")
        : ""
    ) + cssNewline + cssOut.join(cssNewline)
  ;

  return settings.state["css.use_layer"]
    ? layerCSS(cssMinify ? cssOutStr : cssOutStr.replace(/^/gm, "    "))
    : cssOutStr
  ;
}
