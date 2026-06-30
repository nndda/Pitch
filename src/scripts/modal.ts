import "./modal.scss";

import {
  mount,
  type Component,
} from "svelte";

const
  dlgEl = document.getElementById("dialog") as HTMLDialogElement
, dlgContentEl = document.getElementById("dialog-content") as HTMLDialogElement
, dlgCloseBtnEl = document.getElementById("dialog-close-btn") as HTMLDialogElement
;

export function showModal(
  component: Component,
  componentProps?: any,
): void {

  // TODO: when 'closing'(?) the dialog/modal via 'esc' keyboard,
  // the content doesn't get cleared, and stacked :/
  //
  // is there like a 'close' event for <dialog> too???
  dlgContentEl.innerHTML = "";

  mount(component, {
    target: dlgContentEl,
    props: componentProps,
  });
  dlgEl.showModal();
}

dlgCloseBtnEl.addEventListener("click", () => {
  dlgEl.close();
  dlgContentEl.innerHTML = "";
});
