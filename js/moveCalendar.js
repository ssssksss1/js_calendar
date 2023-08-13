import createAndUpdateCalendar from "./createAndUpdateCalendar.js";
import showTodoBarOnCalendar from "./showTodoBarOnCalendar.js";
import {
  changeCalendarWeekStartDateList,
  calendarYear,
  calendarMonth,
  changeCalendarYear,
  changeCalendarMonth,
} from "./app.js";
import todoMain from "./todo/main.js";

/**
 * @content 달력에서 이전 달, 다음 달 버튼 클릭시 달력날짜 바꿔주는 함수
 * - 이후에 changeCalendar() 함수를 작동시켜 달력의 날짜 등을 모두 변경시킨다.
 */
let moveCalendar = function moveCalendar() {
  let prevMonth = document.getElementById("prevMonthMoveBtn");
  let nextMonth = document.getElementById("nextMonthMoveBtn");
  let monthContainer = document.getElementById("monthContainer");

  prevMonth.addEventListener("click", () => {
    let select = document.getElementById("calendarShape");
    for (let i = 1; i < select.options.length; i++) {
      if (select.options[i].selected === true) {
        if (select.options[i].value === "todo") {
          changeCalendarYear(calendarYear - 1);
          document.getElementById("year").innerText = calendarYear;
          todoMain();
        } else if (select.options[i].value === "month") {
          if (calendarMonth === 0) {
            changeCalendarYear(calendarYear - 1);
            changeCalendarMonth(11);
          } else {
            changeCalendarMonth(calendarMonth - 1);
          }
          monthContainer.innerHTML = "";
          createAndUpdateCalendar(calendarYear, calendarMonth);
          showTodoBarOnCalendar();
        }
      }
    }
  });

  nextMonth.addEventListener("click", () => {
    let select = document.getElementById("calendarShape");
    for (let i = 1; i < select.options.length; i++) {
      if (select.options[i].selected === true) {
        if (select.options[i].value === "todo") {
          changeCalendarYear(calendarYear + 1);
          document.getElementById("year").innerText = calendarYear;
          todoMain();
        } else if (select.options[i].value === "month") {
          if (calendarMonth === 11) {
            changeCalendarYear(calendarYear + 1);
            changeCalendarMonth(0);
          } else {
            changeCalendarMonth(calendarMonth + 1);
          }
          monthContainer.innerHTML = "";
          createAndUpdateCalendar(calendarYear, calendarMonth);
          showTodoBarOnCalendar();
        }
      }
    }
  });
};

export default moveCalendar;
