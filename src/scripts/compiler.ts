import {
  runtimeData,
  // compCheckboxCache,
} from "../states/runtime";
import {
  inputs,
  projects,
  settings,
  currentProject,
} from "../states/storage.svelte";

export function compile(): string {
  const
    inputsProps = inputs.state
  , isProject = projects.state[currentProject.get()!].scope === "project"

  , cssOut: string[] = []
  , minify = settings.state["css.minify"]
  , cssIndent = minify ? "" : "  "
  , cssNewline = minify ? "" : "\n\n"

  , inputStyleProps: string[] = []
  , inputStyleIncludes: string[] = []

  , compsNoCommentSection: string[] = []
  , settingNoCommentSection = settings.state["css.isolate_comment_section"]
  ;

  cssOut.push(
    minify
      ? `#wrapper {--b:var(--itchio_bg_color);--b2:var(--itchio_bg2_color);--b2s:var(--itchio_bg2_sub);--t:var(--itchio_text_color);--l:var(--itchio_link_color);--br:var(--itchio_border_color);--btn:var(--itchio_button_color);--btn_f:var(--itchio_button_fg_color);--btn_s:var(--itchio_button_shadow_color)}`
      : `#wrapper {
  --b: var(--itchio_bg_color);
  --b2: var(--itchio_bg2_color);
  --b2s: var(--itchio_bg2_sub);
  --t: var(--itchio_text_color);
  --l: var(--itchio_link_color);
  --br: var(--itchio_border_color);
  --btn: var(--itchio_button_color);
  --btn_f: var(--itchio_button_fg_color);
  --btn_s: var(--itchio_button_shadow_color);
}`
  )

  // TODO: maybe iterate cached checkboxes instead?
  for (const catId in runtimeData) {
    const
      compCatData = runtimeData[catId].components
    ;

    for (const compId in compCatData) {
      if (compCatData[compId].type === "item") {
        const
          compData = compCatData[compId] as ComponentRuntimeItem
        , compManifest = compData.manifest
        ;

        if (compData.chkBox!.checked) {
          const
            compInput = compManifest.input
          ;

          if (compInput) {
            for (const inputItem of compInput) {
              if ("type" in inputItem) {
                inputStyleIncludes.push(inputItem.var);
              }
            }
          }

          (
            (
              isProject && (
                settingNoCommentSection || compManifest.disallowCommentSection
              )
            )
              ? compsNoCommentSection
              : cssOut
          ).push(
            minify
              ? compManifest.css.compressed
              : compManifest.css.raw
          );
        }
      }
    }
  }

  if (compsNoCommentSection.length > 0) {
    cssOut.push(
      minify
        ? `.column.left_col>.formatted_description{`
        : `.column.left_col > .formatted_description {`
    );

    for (const compCSS of compsNoCommentSection) {
      cssOut.push(
        minify
          ? compCSS
          : compCSS
            .split("\n")
            .map(val => "  " + val)
            .join("\n")
      );
    }

    cssOut.push("}");
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

  return (
    inputStyleProps.length > 0
      ? [":root {", ... inputStyleProps, "}"].join(minify ? "" : "\n")
      : ""
  ) + cssNewline + cssOut.join(cssNewline);
}
