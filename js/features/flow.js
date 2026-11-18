import { state, $, money } from "../state.js";
import { showScreen } from "../ui/screens.js";

/* 確認画面 */

export function updateConfirmation() {
  $("confirm-course").textContent = state.course;
  $("confirm-duration").textContent = state.duration;
  $("confirm-staff").textContent = state.staff;
  $("confirm-payment").textContent =
    state.payment === "店舗" ? "お店でお支払い" : "オンライン決済";
  $("confirm-price").textContent = money(state.price);

  const date = new Date(state.year, state.month, state.date);
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];

  $("confirm-date").innerHTML =
    `${state.year}年${state.month + 1}月${state.date}日（${weekdays[date.getDay()]}）<br>${state.time}〜`;
}

export function setupFlowEvents() {
  $("next-button").addEventListener("click", () => {
    if (state.screen === 4) {
      showScreen(5);
      return;
    }

    if (state.screen === 3) updateConfirmation();

    showScreen(state.screen + 1);
  });

  $("back-button").addEventListener("click", () => {
    showScreen(state.screen - 1);
  });

  $("restart").addEventListener("click", () => {
    state.screen = 0;
    state.course = "深林アロマコース";
    state.price = 9900;
    state.duration = "90分";
    state.staff = "ハチワレ";
    state.date = null;
    state.time = null;
    state.payment = "店舗";
    state.year = 2026;
    state.month = 9;

    $("card-payment-panel").hidden = true;

    document.querySelectorAll(".course-card").forEach((el, i) => {
      el.classList.toggle("selected", i === 0);
    });

    document.querySelectorAll(".staff-card").forEach((el, i) => {
      el.classList.toggle("selected", i === 0);
    });

    document.querySelectorAll(".payment-card").forEach((el, i) => {
      el.classList.toggle("selected", i === 0);
    });

    // カレンダー表示の再初期化は app 側から渡す
    window.dispatchEvent(new CustomEvent("booking:restart"));
  });
}
