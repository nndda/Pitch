import toast from "not-a-toast";
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

export function copyFailed(): void {
  toast({
    ... defaultToast,
    message: "Copy failed!",
    iconType: "error",
  });
}

export function copySuccess(): void {
  toast({
    ... defaultToast,
    message: "Copied!",
    iconType: "success",
  });
}
