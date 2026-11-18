import { state, $, money } from "../state.js";
import { updateFooter, updateNextButtonState } from "../ui/screens.js";

/* カレンダー */

export function renderCalendar() {
  const grid = $("calendar-grid");
  grid.innerHTML = "";

  ["日", "月", "火", "水", "木", "金", "土"].forEach(day => {
    const el = document.createElement("div");
    el.className = "weekday";
    el.textContent = day;
    grid.appendChild(el);
  });

  const firstDay = new Date(state.year, state.month, 1).getDay();
  const lastDate = new Date(state.year, state.month + 1, 0).getDate();

  $("month-label").textContent =
    `${state.year}年${state.month + 1}月`;

  // カレンダーを5週間分表示
  for (let i = 0; i < 35; i++) {
    const date = new Date(
      state.year,
      state.month,
      i - firstDay + 1
    );

    const day = date.getDate();
    const isCurrentMonth = date.getMonth() === state.month;
    const el = document.createElement("button");

    el.className = "day";
    el.textContent = day;

    // 前月・翌月の日付
    if (!isCurrentMonth) {
      el.classList.add("disabled");
      el.disabled = true;
      grid.appendChild(el);
      continue;
    }

    // サンプル用の空き状況
    const weekday = date.getDay();
    const closed = weekday === 0;
    const status = closed ? "ー" :
      day % 7 === 0 ? "×" :
      day % 3 === 0 ? "△" : "○";

    const small = document.createElement("small");
    small.textContent = status;
    el.appendChild(small);

    // 定休日・空きなし
    if (closed || status === "×") {
      el.classList.add("disabled");
      el.disabled = true;
    } else {
      // 日付選択
      el.addEventListener("click", () => {
        state.date = day;
        state.time = null;

        renderCalendar();
        renderSlots();
        updateFooter();
        updateNextButtonState();
      });
    }

    // 選択中の日付
    if (state.date === day) {
      el.classList.add("selected");
    }

    grid.appendChild(el);
  }
}

/* 時間選択 */

export function renderSlots() {
  const slots = $("slots");
  const guide = $("slot-guide");

  slots.innerHTML = "";

  // 日付未選択
  if (!state.date) {
    $("slot-date").textContent = "日付を選択してください";
    guide.hidden = false;
    slots.hidden = true;
    return;
  }

  // 日付選択済み
  $("slot-date").textContent =
    `${state.month + 1}月${state.date}日の空き時間`;

  guide.hidden = true;
  slots.hidden = false;

  // サンプル用の時間枠
  const times = [
    { time: "10:00", available: false },
    { time: "11:00", available: true },
    { time: "12:00", available: true },
    { time: "13:00", available: true },
    { time: "14:00", available: true },
    { time: "15:00", available: false },
    { time: "16:00", available: false },
    { time: "17:00", available: true }
  ];

  times.forEach(item => {
    const button = document.createElement("button");
    button.className = "slot";
    button.textContent = item.time;

    // 予約不可
    if (!item.available) {
      button.disabled = true;
    } else {
      // 選択中の時間
      if (state.time === item.time) {
        button.classList.add("selected");
      }

      button.addEventListener("click", () => {
        state.time = item.time;

        renderSlots();
        updateFooter();
        updateNextButtonState();
      });
    }

    slots.appendChild(button);
  });
}

export function setupCalendarEvents() {
  $("prev-month").addEventListener("click", () => {
    state.month--;

    if (state.month < 0) {
      state.month = 11;
      state.year--;
    }

    state.date = null;
    state.time = null;

    renderCalendar();
    renderSlots();
    updateFooter();
    updateNextButtonState();
  });

  $("next-month").addEventListener("click", () => {
    state.month++;

    if (state.month > 11) {
      state.month = 0;
      state.year++;
    }

    state.date = null;
    state.time = null;

    renderCalendar();
    renderSlots();
    updateFooter();
    updateNextButtonState();
  });
}
