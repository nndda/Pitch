export const copyNotif: HTMLElement = document.getElementById("copy-notification");

const copyCSSBtn: HTMLButtonElement = document.getElementById("show-css-btn") as HTMLButtonElement;

export const CSSCopyOutput: JQuery<HTMLTextAreaElement> = $("#css-output-textarea");

const CSSCopyContainerClasses: DOMTokenList = document.getElementById("css-output-container").classList;

let copyContToggle: boolean = false;

import toast from "./toast";

copyCSSBtn.addEventListener("click", () => {
  copyContToggle = !copyContToggle;
  CSSCopyContainerClasses.toggle("hidden", !copyContToggle);
  copyCSSBtn.toggleAttribute("data-isvisible", copyContToggle);
});

export function copyComponentsCSS(css : string) {
  CSSCopyOutput.val("");
  copyNotif.textContent = "Copying...";
  // copyNotif.classList.add("copy-notif-show");

  if (navigator.clipboard) {
    navigator.clipboard.writeText(css).then(() => {
      // copyNotif.classList.remove("copy-notif-show");
      copyNotif.textContent = "";
      toast("CSS Copied to clipboard!", "fa-clipboard-check");

    },() => {
      copyNotif.classList.remove("copy-notif-show-failed");
      copyNotif.textContent = "";
      toast("Failed to copy CSS!", "fa-xmark");

    });
  } else {
    copyNotif.textContent = "Unable to copy!";
  }

  CSSCopyOutput.val(css);
}

export let copyTimeout: NodeJS.Timeout;

export function copyComponentHTML(str: string, elCopyNotif: HTMLElement) {
  elCopyNotif.textContent = "Copying...";

  navigator.clipboard.writeText(str).then(() => {
    elCopyNotif.textContent = "";
    toast("HTML Copied to clipboard!", "fa-clipboard-check");

  },() => {
    elCopyNotif.textContent = "";
    toast("Failed to copy HTML!", "fa-xmark");

  });
}
