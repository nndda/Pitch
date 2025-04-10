import { wrapper } from "../index";

function initializeThemeButtons(): void {
  const themeBtnContainer: JQuery<HTMLElement> = $(".theme-selector-container > .theme-buttons");

  [
    `
    --thm: #fc3a78;

    --ff: 'Lato';
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
    --thm: #f7f7f6;

    --ff: 'Lato';
    --b: #f7f7f6;
    --b2: rgba(247, 247, 246, 1);
    --b2s: #dededd;
    --t: #2f2841;
    --l: #f61960;
    --br: #d2d2ce;
    --btn: #f61960;
    --btn_f: #ffffff;
    --btn_s: #ff3077;
    font-family: var(--ff);
    `,
    `
    --thm: #f16f19;

    --ff: 'Lora';
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
    --thm: #166255;

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
    --thm: #da2acd;

    --ff: 'Pixelify Sans';
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
  ].forEach((n: string, i: number) => {
    const btnEl: JQuery<HTMLElement> = $(`
      <input
        type="radio"
        name="component-theme-preview"
        id="component-theme-preview-${i}"
        ${i === 0 ? "checked" : ""}
      >
      <label for="component-theme-preview-${i}" class="theme-ext button-general" style="${n
        .replace("font-family: var(--ff);", "")
      }">
        <i class="fa-solid fa-paint-roller"></i>
      </label>
    `)
    , fontName: string = new RegExp(/--ff:\s*'(.+)'/).exec(n)[1]
    ;

    btnEl.on("input", () => {
      wrapper.setAttribute("style", n);
      wrapper.setAttribute("data-font", fontName);
    });

    themeBtnContainer.append(btnEl);

    if (i === 0) {
      wrapper.setAttribute("style", n);
      wrapper.setAttribute("data-font", fontName);
    }

    if (i == 1) {
      const btnThemeCol: JQuery<HTMLElement> = $(`
        <input
          type="checkbox"
          id="component-theme-more"
          class="hidden"
        >
        <label class="theme-more button-general tooltip" for="component-theme-more">
          <i class="fa-solid fa-caret-right"></i>
          <span class="tooltip-content">More themes</span>
        </label>
      `);

      themeBtnContainer.append(btnThemeCol);
    }
  });
}

initializeThemeButtons();