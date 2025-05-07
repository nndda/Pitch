// Why do I even use TypeScript...
export interface PitchComponentData {
  // Name defined in its yaml file.
  name: string,
  nameDisplay?: string,

  // Description defined in its yaml file.
  // description?: string,

  // HTML previews defined in its yaml file.
  sampleHTML?: string[],

  // Image previews defined in its yaml file.
  // Stored in src/components/_assets/
  sampleIMG?: string[],

  // Type based off its parent's directory name.
  type?: string,

  // Compiled CSS from its SCSS file.
  css?: string,

  // itch.io built-in CSS variables from the component's CSS.
  variables?: string[],

  sub?: string,

  // labels?: string[],

  inputs?: PitchComponentInput[],
  inputVars?: {
    selector: string,
    vars: Record<string, string>,
  },

  notes?: string[],

  scope?: PitchComponentScope[],

  groupOnly?: boolean,

  elemCheck?: HTMLInputElement,
}

export type PitchComponentsCollection = Record<string, PitchComponentData>

export interface PitchComponentInput {
  name: string,
  id: string,

  default?: string,
}

export type PitchComponentScope = "project" | "profile" | "jam"

export type VariableList = Record<string, string>

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

// Get used itch.io built-in variables (in shorthand form) from 'css' string.
export function getUsedVariables(css : string): string[] {
  const usedVars : string[] = [];
  for (const n in varsList) {
    if (new RegExp("(--" + n + ")").test(css)) usedVars.push(n);
  }
  return usedVars;
}

// Create shorthand variables from used built-in variables (from getUsedVariables()).
export function compileUsedVariables(vars : string[]): string {
  if (vars.length >= 1) {
    let css: string = "#wrapper{";

    for (let i: number = vars.length; i-- > 0;) {
      // shorthand variable:  vars[i];
      // itch's variable:     varsList[vars[i]];

      css += `--${vars[i]}:var(--${varsList[vars[i]]});`;
    }

    return css + "}";
  }

  return "";
}
