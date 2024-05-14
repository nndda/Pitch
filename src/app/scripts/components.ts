export interface PitchComponentData {
  name: string,
  cosmetic?: boolean,
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
    cosmetic: boolean,
    labels?: Array<string>,
    sampleHTML?: string,
  }
}

export const components : PitchComponentsLibrary = {
  "accordion" : {
    desc: "Turn walls of texts into list of collapsable contents.",
    cosmetic: false,
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
  "callout" : {
    desc: "Inform content warnings, additional informations, or a technical issues.",
    cosmetic: false,
    sampleHTML: `
      <blockquote class="custom-call">

        <h3>&#9888; Title</h3>
        Callout contents/descriptions

      </blockquote>
    `,
  },
  "description-list" : {
    desc: "Modified description list element using 2 column table layout.",
    cosmetic: false,
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
          <a href="#">Creative coder</a>,
          <a href="#">Proficient programmer</a>
        </dd>

      </dl>

      <hr class="spacing">

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
    cosmetic: false,
    sampleHTML: `
      Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy

      <hr class="spacing">

      <kbd>W</kbd>,
      <kbd>A</kbd>,
      <kbd>S</kbd>,
      <kbd>D</kbd>

      <hr class="spacing">

      <hr class="spacing">

      <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>N</kbd>
    `,
  },
  "label" : {
    desc: "Highlight genres, tags, tools, or jam. Can be applied to hyperlinks or plain text.",
    cosmetic: false,
    sampleHTML: `
      <i class="custom-lb">
        🎃 Halloween
      </i>
      <span class="custom-lb">
        #OpenSource
      </span>
      <span class="custom-lb">
        Made with ☕
      </span>

      <h1>
        Exciting Features
        <small class="custom-lb">New</small>
      </h1>
      <h2>
        Another Features
        <small class="custom-lb">Beta</small>
      </h2>
      <h3>
        New Features?
        <small class="custom-lb">Alpha</small>
      </h3>
    `,
  },
  "spoiler" : {
    desc: "Hide any lines of text. Hover over it, to show the content. Can be applied to any inline element.",
    cosmetic: false,
    sampleHTML: `
    `,
  },
  "table" : {
    desc: "Modified default table element, that takes the full width of the page.",
    cosmetic: false,
    sampleHTML: `
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>900</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Godette</td>
            <td>850</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Charles</td>
            <td>700</td>
          </tr>
        </tbody>
      </table>
      `,
  },
  "variables" : {
    cosmetic: false,
    desc: "",
  },

  // ============================================================
  // Cosmetic Components

  "dev-banner" : {
    desc: "---",
    cosmetic: true,
    sampleHTML: `
      <hr class="custom-dev-banner">
    `,
  },
  "drop-cap" : {
    desc: "---",
    cosmetic: true,
    sampleHTML: `
    `,
  },
}