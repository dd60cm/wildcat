import { $, MODAL_TRANSITION_DURATION } from "../state.js";
import { closeModal } from "../ui/modal.js";
import { showToast } from "../ui/toast.js";

/* プロフィール */

export function setupProfileEvents() {
  const profileSaveButton = $("profile-save");

  profileSaveButton.addEventListener("click", () => {
    // 二重クリック防止
    if (profileSaveButton.disabled) return;

    profileSaveButton.disabled = true;

    showToast("保存しました。", () => {
      closeModal($("profile-modal"));

      // モーダルが閉じた後に有効化
      setTimeout(() => {
        profileSaveButton.disabled = false;
      }, MODAL_TRANSITION_DURATION);
    });
  });
}
