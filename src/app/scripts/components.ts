export interface PitchComponentData {
  name: string,
  desc?: string,
  variables?: Array<string>,
  css?: string,
  labels?: Array<string>,
  sampleHTML?: Array<string>,
  // codeHTML?: Array<string>,
}

export interface PitchComponentsCollection {
  [key: string]: PitchComponentData,
}

export interface PitchComponentsLibrary {
  [key: string]: {
    desc: string,
    type: string,
    labels?: Array<string>,
    sampleHTML?: Array<string>,
  }
}

interface VariableList {
  [key: string]: string,
}

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

export function getUsedVariables(css : string): Array<string> {
  let usedVars : Array<string> = [];
  for (const n in varsList) {
    if (new RegExp("(\-\-" + n + ")").test(css)) usedVars.push(n);
  }
  return usedVars;
}

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

import { compBase } from "../components/base"; 
import { compDecoration } from "../components/decoration"; 

export const components : PitchComponentsLibrary = {
  ...compBase,
  ...compDecoration,
};
