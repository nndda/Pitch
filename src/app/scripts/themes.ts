const themes: string[] = [
  `
  --ff: 'Lato', serif;
  --b: #131120;
  --b2: rgba(19, 17, 32, 1);
  --b2s: #2a2837;
  --t: #eaeaea;
  --l: #fc3a78;
  --br: #332f4e;
  --btn: #fc3a78;
  --btn_f: #ffffff;
  --btn_s: #ff4d8b;
  font-family: var(--ff);
  `,
  `
  --ff: 'Lora', serif;
  --b: #e3e3e3;
  --b2: #3f2832;
  --b2s: #533c46;
  --t: #f8fac6;
  --l: #f16f19;
  --br: #694957;
  --btn: #f16f19;
  --btn_f: #fff;
  --btn_s: #dc5a03;
  font-family: var(--ff);
  `,
  `
  --ff: 'Courgette', cursive;
  --b: #f7fbfa;
  --b2: rgba(237, 237, 237, 1);
  --b2s: #d5d5d5;
  --t: #1c2f2f;
  --l: #166255;
  --br: #c6c6c6;
  --btn: #166255;
  --btn_f: #ffffff;
  --btn_s: #317d70;
  font-family: var(--ff);
  `,
  `
  --ff: 'Pixelify Sans', monospace;
  --b: #000000;
  --b2: rgba(14, 17, 56, 1);
  --b2s: #25284f;
  --t: #52ebf6;
  --l: #da2acd;
  --br: #262b6c;
  --btn: #da2acd;
  --btn_f: #ffffff;
  --btn_s: #ef3fe2;
  font-family: var(--ff);
  `,
]

import { wrapper } from "../index";

function initializeThemeButtons(): void {
  const themeBtnContainer: JQuery<HTMLElement> = $(".theme-selector-container > .theme-buttons");

  themes.forEach((n: string, i: number) => {
    const btnEl = $(`
      <input
        type="radio"
        name="component-theme-preview"
        id="component-theme-preview-${i}"
        ${i === 0 ? "checked" : ""}
      >
      <label for="component-theme-preview-${i}" style="${n
        .replace("font-family: var(--ff);", "")
      }">
        <i class="fa-solid fa-paint-roller"></i>
      </label>
    `)

    btnEl.on("input", () => {
      wrapper.setAttribute("style", n);
    });

    themeBtnContainer.append(btnEl);

    if (i === 0) {
      wrapper.setAttribute("style", n);
    }
  });
}

initializeThemeButtons();