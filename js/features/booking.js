import { $, money, sampleBookings, MODAL_TRANSITION_DURATION } from "../state.js";
import { closeModal, openModal } from "../ui/modal.js";
import { showToast } from "../ui/toast.js";
import { showScreen } from "../ui/screens.js";

/* 予約一覧・予約詳細・予約操作 */

export function setupBookingEvents() {
  // 予約カードをクリック
  document.querySelectorAll("[data-booking]").forEach(button => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.booking);
      const booking = sampleBookings[index];

      if (!booking) return;

      // 予約詳細に情報を反映
      $("detail-course").textContent = booking.course;
      $("detail-duration").textContent = booking.duration;
      $("detail-date").textContent = booking.date;
      $("detail-staff").textContent = booking.staff;
      $("detail-payment").textContent = booking.payment;
      $("detail-price").textContent = money(booking.price);

      closeModal($("bookings-modal"));
      openModal("booking-detail-modal");
    });
  });

  /* 予約変更 */
  const bookingChangeButton = $("booking-change");
  const bookingCancelButton = $("booking-cancel");

  bookingChangeButton.addEventListener("click", () => {
    // 二重クリック防止
    if (bookingChangeButton.disabled) return;

    bookingChangeButton.disabled = true;
    bookingCancelButton.disabled = true;

    showToast("変更する項目を選び直してください。", () => {
      closeModal($("booking-detail-modal"));

      // モーダルが閉じた後に有効化
      setTimeout(() => {
        bookingChangeButton.disabled = false;
        bookingCancelButton.disabled = false;
      }, MODAL_TRANSITION_DURATION);
    });
  });

  /* 予約キャンセル */
  bookingCancelButton.addEventListener("click", () => {
    // 二重クリック防止
    if (bookingCancelButton.disabled) return;

    bookingChangeButton.disabled = true;
    bookingCancelButton.disabled = true;

    showToast("予約がキャンセルされました。", () => {
      closeModal($("booking-detail-modal"));

      // モーダルが閉じた後に有効化
      setTimeout(() => {
        bookingChangeButton.disabled = false;
        bookingCancelButton.disabled = false;
      }, MODAL_TRANSITION_DURATION);
    });
  });
}
