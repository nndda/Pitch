// @ts-ignore
import itchCSS from "../../itch.css?raw";
// @ts-ignore
import codepenCSS from "../../../codepen-css.css?raw";

const
  codepenInput: HTMLInputElement = document.getElementById("codepen-inp") as HTMLInputElement
, codepenButton: HTMLInputElement = document.getElementById("codepen-btn") as HTMLInputElement

, userInputStyle: HTMLStyleElement = document.getElementById("comp-input-override") as HTMLStyleElement
;

export function constructOptions(name: string, html: string, css: string): void {
  codepenInput.value = `${JSON.stringify(
      {
        title: `Pitch: ${name}`,
        editors: "110",
        layout: "left",
        js: `
          const i = document.createElement("style");
          i.textContent = \`@charset "UTF-8";
            ${ css.replace(":root", "body")
              + userInputStyle.textContent
              + itchCSS
              + codepenCSS
            }\`;
          document.head.appendChild(i);
        `,
        html: html,
      }
    )
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")}`
  ;
  codepenButton.click();
}