import { driver } from "driver.js";

document.getElementById("help-button").addEventListener("click", () => {
  driverInitialIntro.drive();
});

const driverInitialIntro = driver({
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
      title: "Grab the components",
      description: `
        Copy the CSS codes of your selected components.
      `,
      side: "top",
      align: "end",
    }},
    { element: "#show-css-btn", popover: {
      title: "Grab the components",
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
        Click on these various theme preset to see how they would look on different themes.
      `,
      side: "bottom",
      align: "end",
    }},
    { element: "#help-button", popover: {
      title: "Help",
      description: `
        Click on this button to re-run this guides again.
      `,
      side: "bottom",
      align: "end",
    }},
  ],
});

const introFlagKey = "userIntroFinished";

if (localStorage.getItem(introFlagKey) === null) {
  driverInitialIntro.drive();
  localStorage.setItem(introFlagKey, "");
}