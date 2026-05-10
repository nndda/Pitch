import toastN from "not-a-toast";
import "not-a-toast/style.css";
import "./toast.scss";

const defaultToast = {
  position: "bottom-right",

  showProgressBar: true,
  entryAnimation: "fadeIn",
  exitAnimation: "fadeOut",

  autoClose: true,
  pauseOnHover: true,
  duration: 3500,

  theme: "customTheme",
  progressBarHeight: "5px",
  progressBarColor: "#fc3a78",
};

export function toast(
  message: string,
  cfg: any = {},
): void {
  toastN({
    ... defaultToast,
    message: message,
    ... cfg,
  })
}

export function copyFailed(): void {
  toastN({
    ... defaultToast,
    message: "Copy failed!",
    iconType: "error",
  });
}

export function copySuccess(): void {
  toastN({
    ... defaultToast,
    message: "Copied!",
    iconType: "success",
  });
}
