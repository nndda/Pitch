import {
  copyFailed,
  copySuccess,
} from "./toast";

export const isCopyAllowed = navigator.clipboard;

export function copyStr(str: string): void {
  if (isCopyAllowed) {
    navigator.clipboard.writeText(str)
      .then(
        () => { copySuccess() },
        () => { copyFailed() }
      )
  } else {
    copyFailed();
  }
}
