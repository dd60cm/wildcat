import { $ } from "../state.js";

/* トースト通知 */

let toastTimer = null;

export function showToast(message, callback = null) {
  const toast = $("toast");

  clearTimeout(toastTimer);

  toast.textContent = message;
  toast.classList.add("show");

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");

    // トーストが消えた後に実行
    if (callback) {
      setTimeout(callback, 300);
    }
  }, 2500);
}
