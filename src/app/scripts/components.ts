export interface PitchComponentData {
  name: string,
  desc?: string,
  variables?: Array<string>,
  css?: string,
  labels?: Array<string>,
  sampleHTML?: string,
}

export interface PitchComponentsCollection {
  [key: string]: PitchComponentData,
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

export interface PitchComponentsLibrary {
  [key: string]: {
    desc: string,
    labels?: Array<string>,
    sampleHTML?: string,
  }
}

export const components : PitchComponentsLibrary = {
  "accordion" : {
    desc: "Turn walls of texts into list of collapsable contents.",
    sampleHTML: `
      <div class="custom-accrd">

        <details open>
          <summary>How do I get access to custom CSS in my game page?</summary>
          You can contact itch.io support to enable the custom CSS feature.
        </details>

        <details>
          <summary>Can I use this in a commercial project?</summary>
          Yes! The generated CSS codes is licensed under <em>Creative Commons Zero v1.0 Universal</em>.
        </details>

        <details>
          <summary>Why can't I use this on profile or jam pages?</summary>
          All components make use of the page's theme. Unlike project page, profile page and jam page didn't have some of the require color variables needed for the components to be displayed correctly (e.g. button color).
        </details>

      </div>
    `,
  },
  "admonition" : {
    desc: "Inform content warnings, additional informations, or a technical issues.",
    sampleHTML: `
      <blockquote class="custom-adm">

        <h3>&#9888; Title</h3>
        Admonition contents/descriptions

      </blockquote>
    `,
  },
  "description-list" : {
    desc: "Modified description list element using 2 column table layout.",
    sampleHTML: `
      <dl>

        <dt>Arts</dt>
        <dd>
          <a href="#">Amazing artist</a>
        </dd>

        <dt>Story</dt>
        <dd>
          <a href="#">Wonderful writer</a>
        </dd>

        <dt>Codes</dt>
        <dd>
          <a href="#">Creative coder</a>
          <a href="#">Proficient programmer</a>
        </dd>

      </dl>

      <br>

      <dl>

        <dt>Move</dt>
        <dd>
          <kbd>W</kbd>,
          <kbd>A</kbd>,
          <kbd>S</kbd>,
          <kbd>D</kbd>
        </dd>

        <dt>Jump</dt>
        <dd>
          <kbd>Space</kbd>
        </dd>

        <dt>Interract</dt>
        <dd>
          <kbd>F</kbd>,
          <kbd>E</kbd>
        </dd>

      </dl>
    `,
  },
  "input" : {
    desc: "Represent the keyboard inputs, controls, or any buttons.",
    sampleHTML: `
      Select the text, press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy, and <kbd>Ctrl</kbd> + <kbd>V</kbd> to paste them.

      <kbd>W</kbd>,
      <kbd>A</kbd>,
      <kbd>S</kbd>,
      <kbd>D</kbd>

      <br>

      <kbd>Ctrl</kbd> + <kbd>A</kbd>

      <br>

      <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>Del</kbd>
    `,
  },
  "label" : {
    desc: "Highlight genres, tags, tools, or jam. Can be applied to hyperlinks or plain text.",
    sampleHTML: `
      <i class="custom-lb">
        #halloween
      </i>
    `,
  },
  "spoiler" : {
    desc: "Hide any lines of text. Hover over it, to show the content. Can be applied to any inline element.",
    sampleHTML: `
    `,
  },
  "table" : {
    desc: "Modified default table element, that takes the full width of the page.",
    sampleHTML: `
    `,
  },
  "variables" : {
    desc: "",
  },
}