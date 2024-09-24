export const copyNotif = document.getElementById("copy-notification");

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

export let copyTimeout : NodeJS.Timeout;

export function copyComponentHTML(str : string, elCopyNotif : HTMLElement) {
  navigator.clipboard.writeText(str).then(() => {
    elCopyNotif.textContent = "Copied!";
    copyTimeout = setTimeout(() => {
      elCopyNotif.textContent = "Copy";
    }, 2500);

  },() => {
    elCopyNotif.textContent = "Copy failed!";
    copyTimeout = setTimeout(() => {
      elCopyNotif.textContent = "Copy";
    }, 2500);
  });
}

export const CSSCopyOutput : JQuery<HTMLTextAreaElement> = $("#css-output-textarea");