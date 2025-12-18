import { driver, type Driver } from "driver.js";

export function introFirsttimeInit(): void {
  const flagKeyFirsttime: string = "pitch-flagKeyFirsttime";

  document.getElementById("help-button").addEventListener("click", () => {
    driverFirsttime.drive();
  });

  const driverFirsttime: Driver = driver({
    showProgress: true,
    overlayOpacity: 1.0,
    allowClose: false,
    steps: [
      { popover: {
        align: "center",
        description: `
        <div class="intro-popover">
          <img src="./pitch-logo.svg" class="pitch-logo">
          Welcome to Pitch.
          <br>
          CSS components and tweaks, designed specifically for your itch.io project pages.
        </div>`,
      }},
      { element: "#components-list", popover: {
        title: "find ur perfec components",
        description: `
          Click on the component's name to see
          live preview and its HTML codes.
        `,
        side: "right",
        align: "center",
      }},
      { element: "#components-list > .onboard-check-dummy", popover: {
        title: "Add the components",
        description: `
          Tick the checkbox to add it to your selection.
        `,
        side: "right",
        align: "center",
      }},
      { element: "#compile-components-btn", popover: {
        title: "Copy the CSS",
        description: `
          Copy the CSS codes of your selected components.
        `,
        side: "top",
        align: "end",
      }},
      { element: "#show-css-btn", popover: {
        title: "Can't copy the CSS?",
        description: `
          Click here, and copy the CSS codes manually, if you're unable to copy it via the button.
        `,
        side: "top",
        align: "end",
      }},
      { element: ".theme-selector-container", popover: {
        title: "Theme preview",
        description: `
          The components are designed to adapt to your page's theme.
          Click on the various theme preset to see how they would look on different themes.
        `,
        side: "bottom",
        align: "end",
      }},
      { element: "#help-button", popover: {
        title: "Help",
        description: `
          Click on this button to re-run this guide again.
        `,
        side: "bottom",
        align: "end",
      }},
    ],
  });

  if (localStorage.getItem(flagKeyFirsttime) === null) {
    driverFirsttime.drive();
    localStorage.setItem(flagKeyFirsttime, "");
  }
}

// Tweaks-related info

export const flagKeyTweaksfirsttime: string = "pitch-flagKeyTweaksfirsttime";

export const driverTweaksfirsttimeGet: () => Driver = (): Driver => driver({
  showProgress: false,
  overlayOpacity: 1.0,
  allowClose: true,
  steps: [
    { popover: {
      align: "center",
      description: `
      <div class="tweaks-intro">
        <h1>Here be dragons!</h1>
        <p>
          Pitch's Tweaks relies on itch.io's HTML structures,
          which can change in the future if the site got updated, and might possibly breaks the Tweaks' functionalities!!
        </p>
        <p>
          We'll keep you updated if there's breaking changes, and update the Tweaks as soon as possible.
        </p>
        <p>
          Follow the project, so you won't miss it!!
        </p> 
      </div>`,
    }},
  ],
});
