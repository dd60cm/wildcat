import { $, MODAL_TRANSITION_DURATION } from "../state.js";

/* モーダル制御 */

export function openModal(id) {
  const modal = $(id);
  if (!modal) return;

  // 他のモーダルを閉じる
  document.querySelectorAll(".modal-overlay").forEach(el => {
    el.classList.remove("open");
    el.style.display = "none";
  });

  modal.style.display = "flex";

  // display変更後にアニメーションを開始
  requestAnimationFrame(() => {
    modal.classList.add("open");
  });
}

export function closeModal(modal) {
  if (!modal) return;

  modal.classList.remove("open");

  setTimeout(() => {
    if (!modal.classList.contains("open")) {
      modal.style.display = "none";
    }
  }, MODAL_TRANSITION_DURATION);
}

export function setupModalEvents() {
  // 閉じるボタン
  document.querySelectorAll("[data-close]").forEach(button => {
    button.addEventListener("click", () => {
      closeModal(button.closest(".modal-overlay"));
    });
  });

  // 背景クリックで閉じる
  document.querySelectorAll(".modal-overlay").forEach(modal => {
    modal.addEventListener("click", event => {
      if (event.target === modal) {
        closeModal(modal);
      }
    });
  });

  // ESCキーで閉じる
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      const opened = document.querySelector(".modal-overlay.open");
      if (opened) closeModal(opened);
    }
  });
}
