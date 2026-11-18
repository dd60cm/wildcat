// アプリ全体で共有する状態・定数・共通関数

export const state = {
  screen: 0,
  course: "深林アロマコース",
  price: 9900,
  duration: "90分",
  staff: "ハチワレ",
  date: null,
  time: null,
  payment: "店舗",
  year: 2026,
  month: 9
};

export const MODAL_TRANSITION_DURATION = 250;

export const $ = id => document.getElementById(id);

export const money = value => "¥" + value.toLocaleString("ja-JP");

export const sampleBookings = [
  {
    course: "深林アロマコース",
    duration: "90分",
    date: "2026年10月31日（土）10:00〜",
    staff: "ハチワレ",
    payment: "オンライン決済",
    price: 9900
  },
  {
    course: "森のボディケア",
    duration: "60分",
    date: "2026年10月31日（土）17:00〜",
    staff: "サバトラ",
    payment: "お店でお支払い",
    price: 6600
  }
];
