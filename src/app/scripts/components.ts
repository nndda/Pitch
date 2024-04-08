export interface PitchComponentData {
  name: string,
  description: string,
  variables?: Array<string>,
  css?: string,
  labels?: Array<string>,
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

export interface PitchComponentsLibrary {
  [key: string]: {
    desc: string,
    labels?: Array<string>,
  }
}

// export const components : Array<PitchComponentData> = [
export const components : PitchComponentsLibrary = {
  "accordion" : {
    desc: "Turn walls of texts into list of collapsable contents. It's basically just a styled list of <details> elements.",
    labels: [],
  },
  "admonition" : {
    desc: "Inform the visitors about content warnings, additional informations, or a technical issues like the one used above in this documentation",
  },
  "description-list" : {
    desc: "But since its just a 2 column table, it can be repurposed to anything that make use of that layout: credit section, key input guide for a game, etc.",
  },
  "input" : {
    desc: "Represent the keyboard inputs, controls, or any buttons.",
  },
  "label" : {
    desc: "Highlight genres, tags, tools, or jam. Can be applied to hyperlinks or plain text.",
  },
  "spoiler" : {
    desc: "Hide any lines of text. Hover over it, to show the content. Can be applied to any inline element.",
  },
  "table" : {
    desc: "",
  },
}
// const comp = {
//   "accordion",
// }