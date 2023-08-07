import createAndUpdateCalendar from "./createAndUpdateCalendar.js";
import showTodoBarOnCalendar from "./showTodoBarOnCalendar.js";
import { changeCalendarWeekStartDateList } from "./app.js";

/**
 * @content 달력에서 이전 달, 다음 달 버튼 클릭시 달력날짜 바꿔주는 함수
 * - 이후에 changeCalendar() 함수를 작동시켜 달력의 날짜 등을 모두 변경시킨다.
 */
let moveCalendar = function moveCalendar(calendarYear, calendarMonth) {
  let prevMonth = document.getElementById("prevMonthMoveBtn");
  let nextMonth = document.getElementById("nextMonthMoveBtn");
  let monthContainer = document.getElementById("monthContainer");

  prevMonth.addEventListener("click", () => {
    if (calendarMonth === 0) {
      calendarYear -= 1;
      calendarMonth = 11;
    } else {
      calendarMonth -= 1;
    }
    monthContainer.innerHTML = "";
    createAndUpdateCalendar(calendarYear, calendarMonth);
    showTodoBarOnCalendar();
  });

  nextMonth.addEventListener("click", () => {
    if (calendarMonth === 11) {
      calendarYear += 1;
      calendarMonth = 0;
    } else {
      calendarMonth += 1;
    }
    monthContainer.innerHTML = "";
    createAndUpdateCalendar(calendarYear, calendarMonth);
    showTodoBarOnCalendar();
  });
};

export default moveCalendar;
