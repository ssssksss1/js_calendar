import todoMain from "./todo/main.js";
import { calendarYear, calendarMonth } from "./app.js";
import createAndUpdateCalendar from "./createAndUpdateCalendar.js";
import showTodoBarOnCalendar from "./showTodoBarOnCalendar.js";

/**
 * @content 달력의 형태를 변경
 */
let changeCalendarShape = function changeCalendarShape() {
  document.getElementById("calendarShape").addEventListener("change", () => {
    let select = document.getElementById("calendarShape");
    for (let i = 1; i < select.options.length; i++) {
      if (select.options[i].selected === true) {
        if (select.options[i].value === "month") {
          document.getElementById("calendarShapeMonth").style.display = "block";
          document.getElementById("calendarShapeTodo").style.display = "none";
          document.getElementById("year").innerText = calendarYear + "년";
          document.getElementById("month").innerText = calendarMonth + 1 + "월";
          monthContainer.innerHTML = "";
          createAndUpdateCalendar(calendarYear, calendarMonth);
          showTodoBarOnCalendar();
          break;
        } else if (select.options[i].value === "todo") {
          document.getElementById("calendarShapeMonth").style.display = "none";
          document.getElementById("calendarShapeTodo").style.display = "block";
          todoMain();
          break;
        }
      }
    }
  });
};

export default changeCalendarShape;
