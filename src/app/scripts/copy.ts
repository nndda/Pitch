export const copyNotif: HTMLElement = document.getElementById("copy-notification");

const copyCSSBtn: HTMLButtonElement = document.getElementById("show-css-btn") as HTMLButtonElement;

export const CSSCopyOutput: JQuery<HTMLTextAreaElement> = $("#css-output-textarea");

const CSSCopyContainerClasses: DOMTokenList = document.getElementById("css-output-container").classList;

let copyContToggle: boolean = false;

copyCSSBtn.addEventListener("click", () => {
  copyContToggle = !copyContToggle;
  CSSCopyContainerClasses.toggle("hidden", !copyContToggle);
  copyCSSBtn.toggleAttribute("data-isvisible", copyContToggle);
});

export function copyComponentsCSS(css : string) {
  CSSCopyOutput.val("");
  copyNotif.textContent = "Copying...";
  copyNotif.classList.remove("copy-notif-show");

  if (navigator.clipboard) {
    navigator.clipboard.writeText(css).then(() => {
      copyNotif.classList.add("copy-notif-show");
      copyNotif.textContent = "Copied to clipboard!";

    },() => {
      copyNotif.classList.add("copy-notif-show-failed");
      copyNotif.textContent = "Failed to copy";
    });
  } else {
    copyNotif.textContent = "Unable to copy!";
  }

  CSSCopyOutput.val(css);
}

export let copyTimeout: NodeJS.Timeout;

export function copyComponentHTML(str: string, elCopyNotif: HTMLElement) {
  navigator.clipboard.writeText(str).then(() => {
    elCopyNotif.textContent = "Copied!";
    copyTimeout = setTimeout(() => {
      elCopyNotif.textContent = "";
    }, 2500);

  },() => {
    elCopyNotif.textContent = "Copy failed!";
    copyTimeout = setTimeout(() => {
      elCopyNotif.textContent = "Copy";
    }, 2500);
  });
}
