const
  d: Document = document
, toastEl: HTMLElement = d.getElementById("toast") as HTMLElement
, toastIcon: HTMLElement = d.getElementById("toast-icon") as HTMLElement
, toastDesc: HTMLElement = d.getElementById("toast-desc") as HTMLElement
// TODO: Close button kinda buggy rn :/
// , toastCloseBtn: HTMLButtonElement = d.getElementById("toast-close-button") as HTMLButtonElement
, toastTimeoutBar: HTMLElement = d.getElementById("toast-timeout-bar") as HTMLElement
, toastTimeoutAnim: Animation = toastTimeoutBar.animate([
    {
      width: "100%",
    },
    {
      width: "0%",
    },
  ], {
    fill: "forwards",
    duration: 5526,
  })
, toastPopUpAnim: Animation = toastEl.animate([
    {
      transform: "translateY(100%)",
      opacity: 0,
    },
    {
      width: "translateY(0)",
      opacity: 1,
    },
  ], {
    fill: "both",
    duration: 500,
    easing: "ease"
  })
;

let
  currentIconClass: string = ""
;

// toastPopUpAnim.pause();
// toastPopUpAnim.cancel();

// Uncomment for styling development
// toastTimeoutAnim.pause();
// toastTimeoutAnim.cancel();

// Comment for styling development
resetToast();

toastTimeoutAnim.addEventListener("finish", resetToast);

function resetToast(): void {
  // toastEl.classList.toggle("active", false);

  toastTimeoutAnim.pause();
  // toastTimeoutAnim.cancel();

  toastPopUpAnim.pause();
  toastPopUpAnim.cancel();
  toastPopUpAnim.reverse();
}

toastEl.addEventListener("mouseover", (): void => {
  if (toastTimeoutAnim.playState === "running") {
    toastTimeoutAnim.pause();
  }
});

toastEl.addEventListener("mouseleave", (): void => {
  if (toastTimeoutAnim.playState === "paused") {
    toastTimeoutAnim.play();
  }
});

// toastCloseBtn.addEventListener("click", resetToast);

export default function (desc: string, faIcon: string = "fa-circle-check"): void {
  if (toastTimeoutAnim.playState === "running") {
    resetToast();
  }

  requestAnimationFrame((): void => {
    if (currentIconClass !== "") {
      toastIcon.classList.toggle(currentIconClass, false);
    }

    currentIconClass = faIcon

    toastIcon.classList.toggle(currentIconClass, true)
    toastDesc.textContent = desc;

    toastPopUpAnim.reverse();
    toastPopUpAnim.cancel();
    toastPopUpAnim.play();

    // toastEl.classList.toggle("active", true);

    toastTimeoutAnim.cancel();
    toastTimeoutAnim.play();
  });
};
