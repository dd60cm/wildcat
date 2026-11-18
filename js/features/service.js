import { state, $ } from "../state.js";
import { updateFooter } from "../ui/screens.js";

/* コース・スタッフ・支払い方法 */

function selectCourse(button) {
  document.querySelectorAll(".course-card").forEach(el => {
    el.classList.remove("selected");
  });

  button.classList.add("selected");

  state.course = button.dataset.course;
  state.price = Number(button.dataset.price);
  state.duration = button.dataset.duration;

  updateFooter();
}

export function setupServiceEvents() {
  document.querySelectorAll(".course-card").forEach(button => {
    button.addEventListener("click", () => selectCourse(button));
  });

  document.querySelectorAll(".staff-card").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".staff-card").forEach(el => {
        el.classList.remove("selected");
      });

      button.classList.add("selected");
      state.staff = button.dataset.staff;
    });
  });

  // 支払い方法の選択
  document.querySelectorAll(".payment-card").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".payment-card").forEach(el => {
        el.classList.remove("selected");
      });

      button.classList.add("selected");
      state.payment = button.dataset.payment;

      // カード決済フォームの表示切り替え
      $("card-payment-panel").hidden =
        state.payment !== "オンライン決済";
    });
  });
}
