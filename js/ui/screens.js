import { state, $, money } from "../state.js";

/* 画面・フッター制御 */

export function showScreen(index) {
  state.screen = index;

  document.querySelectorAll(".screen").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });

  $("progress").style.display = index === 5 ? "none" : "flex";

  document.querySelectorAll(".progress-step").forEach((el, i) => {
    el.classList.toggle("active", i === index);
  });

  // 進捗ラインの更新
  const progress = Math.min(index + 1, 5);
  $("progress-fill").style.width = `${progress * 20}%`;

  $("footer").style.display = index === 5 ? "none" : "block";
  $("back-button").hidden = index === 0 || index === 5;

  const nextLabels = [
    "スタッフ選択", "日時を選ぶ", "支払いへ",
    "内容を確認", "予約する", ""
  ];

  $("next-button").textContent = nextLabels[index] || "";

  updateNextButtonState();
  updateFooter();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function updateFooter() {
  const captions = [
    "選択中のコース", "選択中のコース",
    "選択中のコース", "選択中のコース",
    "選択中のコース"
  ];

  $("footer-caption").textContent = captions[state.screen];

  if (state.screen < 2) {
    $("footer-value").textContent =
      state.screen === 0 ? "コースを選択" : money(state.price);
  } else {
    $("footer-value").textContent =
      state.date && state.time
        ? `${state.month + 1}/${state.date} ${state.time}`
        : money(state.price);
  }
}

export function updateNextButtonState() {
  const button = $("next-button");

  button.disabled =
    state.screen === 2 &&
    (!state.date || !state.time);
}
