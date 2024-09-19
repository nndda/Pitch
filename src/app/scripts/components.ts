// Why do I even use TypeScript...
export interface PitchComponentData {
  // Name defined in its yaml file.
  name: string,

  // Description defined in its yaml file.
  description?: string,

  // HTML previews defined in its yaml file.
  sampleHTML?: Array<string>,

  // Type based off its parent's directory name.
  type?: string,

  // Compiled CSS from its SCSS file.
  css?: string,

  // itch.io built-in CSS variables from the component's CSS.
  variables?: Array<string>,

  labels?: Array<string>,
}

export interface PitchComponentsCollection {
  [key: string]: PitchComponentData,
}

interface VariableList {
  [key: string]: string,
}

// Shorthand for itch.io built-in variables
const varsList : VariableList = {
  "b": "itchio_bg_color",
  "b2": "itchio_bg2_color",
  "b2s": "itchio_bg2_sub",
  "t": "itchio_text_color",
  "l": "itchio_link_color",
  "br": "itchio_border_color",
  "btn": "itchio_button_color",
  "btn_f": "itchio_button_fg_color",
  "btn_s": "itchio_button_shadow_color",
};

// Get used itch.io built-in variables from 'css' string.
export function getUsedVariables(css : string): Array<string> {
  let usedVars : Array<string> = [];
  for (const n in varsList) {
    if (new RegExp("(\-\-" + n + ")").test(css)) usedVars.push(n);
  }
  return usedVars;
}

// Create shorthand variables from used built-in variables (from getUsedVariables()).
export function compileUsedVariables(vars : Array<string>): string {
  let css = "#wrapper{";

  vars.forEach(v => {
    for (const k in varsList) {
      if (k === v) {
        css += `--${k}:var(--${varsList[v]});`;
      }
    }
  });

  return css + "}"
}