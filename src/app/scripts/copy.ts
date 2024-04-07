const copyNotif = document.getElementById("copy-notification");

export function copyComponentsCSS(css : string) {
  console.log(css);
  copyNotif.textContent = "Copying...";
  copyNotif.classList.remove("copy-notif-show");

  navigator.clipboard.writeText(css).then(() => {
    copyNotif.classList.add("copy-notif-show");
    console.log('copied');
    copyNotif.textContent = "Copied to clipboard!";
  },() => {
    copyNotif.classList.add("copy-notif-show-failed");
    console.error('failed');
    copyNotif.textContent = "Failed to copy";
  });
};