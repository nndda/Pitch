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

export function getUsedVariables(css : string): Array<string> {
  return [
    "b",
    "b2",
    "b2s",
    "t",
    "l",
    "br",
    "btn",
    "btn_f",
    "btn_s",
  ].filter(vars => {
    if (new RegExp("(\-\-" + vars + ")").test(css)) return vars
  })
}

export function compileUsedVariables(vars : Array<string>): string {
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
    desc: "Turn walls of texts into list of collapsable contents. It's basically just a styled list of <details> elements.",
    sampleHTML: `
      <div class="custom-accrd">

        <details>
          <summary>
            Accordion Item 1
          </summary>
          Accordion content 2
        </details>

        <details>
          <summary>
            Accordion Item 2
          </summary>
          Accordion content 2
        </details>

        <details>
          <summary>
            Accordion Item 3
          </summary>
          Accordion content 3
        </details>

      </div>
    `,
  },
  "admonition" : {
    desc: "Inform the visitors about content warnings, additional informations, or a technical issues.",
    sampleHTML: `
      <blockquote class="custom-adm">

        <h3>&#9888; Title</h3>
        Admonition contents/descriptions

      </blockquote>
    `,
  },
  "description-list" : {
    desc: "Modified description list element with a 2 column table layout. Can be repurposed to anything that make use of that layout: credit section, key input guide for a game, etc.",
    sampleHTML: `
      <dl>

        <dt>Arts and Visuals</dt>
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
    `,
  },
  "input" : {
    desc: "Represent the keyboard inputs, controls, or any buttons.",
    sampleHTML: `
    `,
  },
  "label" : {
    desc: "Highlight genres, tags, tools, or jam. Can be applied to hyperlinks or plain text.",
    sampleHTML: `
    `,
  },
  "spoiler" : {
    desc: "Hide any lines of text. Hover over it, to show the content. Can be applied to any inline element.",
    sampleHTML: `
    `,
  },
  "table" : {
    desc: "Modified default table element, that takes full width of the page.",
    sampleHTML: `
    `,
  },
  "variables" : {
    desc: "",
  },
}