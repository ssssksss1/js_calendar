import { todoDataList, calendarYear, calendarMonth } from "../app.js";
import showTodoList from "./showTodoList.js";
/**
 * @content 달력의 형태 todo main 함수
 */
let todoMain = function todoMain() {
  document.getElementById("year").innerText = calendarYear + "년";
  document.getElementById("month").innerText = "";
  showTodoList();
};

export default todoMain;
