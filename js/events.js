import { $ } from "./state.js";
import { openModal, closeModal, setupModalEvents } from "./ui/modal.js";
import { setupProfileEvents } from "./features/profile.js";
import { setupBookingEvents } from "./features/booking.js";
import { setupServiceEvents } from "./features/service.js";
import { setupCalendarEvents } from "./features/calendar.js";
import { setupFlowEvents } from "./features/flow.js";

/* イベント登録のまとめ */

export function setupEvents() {
  setupModalEvents();

  // メニュー
  $("menu-button").addEventListener("click", () => {
    openModal("menu-modal");
  });

  // プロフィール
  $("profile-button").addEventListener("click", () => {
    closeModal($("menu-modal"));
    openModal("profile-modal");
  });

  // 予約一覧
  $("bookings-button").addEventListener("click", () => {
    closeModal($("menu-modal"));
    openModal("bookings-modal");
  });

  setupProfileEvents();
  setupBookingEvents();
  setupServiceEvents();
  setupCalendarEvents();
  setupFlowEvents();
}
