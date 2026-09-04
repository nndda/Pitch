import { mount } from "svelte";
import "./styles/critical.scss";
// import "./scripts/init";

document.addEventListener("DOMContentLoaded", async () => {

  const
    loadingText = document.getElementById("loading-text")!
  , placeholderEl = document.getElementById("placeholder")!
  ;

  loadingText.textContent = "storage";
  const db = await import("./storage/db");
  await db.init();

  loadingText.textContent = "styling";
  await import("./app.scss");

  const { constructRule } = await import("./pages/elements/input")
  const { inputStyling } = await import("./states/runtime")

  constructRule().then(rules => {
    inputStyling.replaceSync(
      "#wrapper {"
      + rules
      + "}",
    );
  });

  loadingText.textContent = "app";
  const { default: App, } = await import("./app.svelte");

  placeholderEl.animate({
    opacity: 0,
  }, {
    duration: 500,
    fill: "forwards",
    easing: "ease-out",
  }).finished.then(() => {
    placeholderEl.remove();

    mount(App, {
      target: document.body,
    });
  });
});
