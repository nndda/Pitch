export interface PitchComponentData {
  name: string,
  variables: Array<string>,
  css: string,
}

export function getUsedVariables(css : string): Array<string> {
  return [
    "--b",
    "--b2",
    "--b2s",
    "--t",
    "--l",
    "--br",
    "--btn",
    "--btn_f",
    "--btn_s",
  ].filter(vars => {
    if (css.includes(vars)) return vars
  })
}

export function compileUsedVariables(vars : Array<string>): string {
  interface VariableList {
    [key: string]: string,
  }
  const varsList : VariableList = {
    "--b": "--b:var(--itchio_bg_color);",
    "--b2": "--b2:var(--itchio_bg2_color);",
    "--b2s": "--b2s:var(--itchio_bg2_sub);",
    "--t": "--t:var(--itchio_text_color);",
    "--l": "--l:var(--itchio_link_color);",
    "--br": "--br:var(--itchio_border_color);",
    "--btn": "--btn:var(--itchio_button_color);",
    "--btn_f": "--btn_f:var(--itchio_button_fg_color);",
    "--btn_s": "--btn_s:var(--itchio_button_shadow_color);",
  };
  let css = "#wrapper{";

  vars.forEach(v => {
    for (const k in varsList) {
      if (k === v) {
        css += varsList[v];
      }
    }
  });

  return css + "}"
}

export const components = [
  "accordion",
  "alert-box",
  "description-list",
  "input",
  "label",
  "spoiler",
]
// const comp = {
//   "accordion",
// }