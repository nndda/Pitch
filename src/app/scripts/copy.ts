export const copyNotif = document.getElementById("copy-notification");

export function copyComponentsCSS(css : string) {
  copyNotif.textContent = "Copying...";
  copyNotif.classList.remove("copy-notif-show");

  navigator.clipboard.writeText(css).then(() => {
    copyNotif.classList.add("copy-notif-show");
    copyNotif.textContent = "Copied to clipboard!";
  },() => {
    copyNotif.classList.add("copy-notif-show-failed");
    copyNotif.textContent = "Failed to copy";
  });
}

export function copyComponentHTML(str : string, elCopyNotif : HTMLElement) {
  navigator.clipboard.writeText(str).then(() => {
    elCopyNotif.textContent = "Copied!";
    setTimeout(() => {
      elCopyNotif.textContent = "Copy";
    }, 2500);

  },() => {
    elCopyNotif.textContent = "Copy failed!";
    setTimeout(() => {
      elCopyNotif.textContent = "Copy";
    }, 2500);
  });
}