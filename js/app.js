import { renderCalendar, renderSlots } from "./features/calendar.js";
import { setupEvents } from "./events.js";
import { showScreen } from "./ui/screens.js";

/* アプリ初期化 */

function initializeApp() {
  setupEvents();

  renderCalendar();
  renderSlots();
  showScreen(0);

  // 完了画面から最初に戻ったときの表示更新
  window.addEventListener("booking:restart", () => {
    renderCalendar();
    renderSlots();
    showScreen(0);
  });
}

initializeApp();
