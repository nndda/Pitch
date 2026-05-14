import { mount } from "svelte";
import "./styles/critical.scss";
// import "./scripts/init";

document.addEventListener("DOMContentLoaded", async () => {

  const
    loadingText = document.getElementById("loading-text")!
  , placeholderEl = document.getElementById("placeholder")!
  ;

  loadingText.textContent = "styling";
  await import("./app.scss");

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
