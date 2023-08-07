import showTodoBarOnCalendar from "./showTodoBarOnCalendar.js";
import { todoDataList, todoId } from "./app.js";
import { modalToggle } from "./modalFunction.js";

/**
 * - 일정을 submit할 때 실행하는 함수
 */
let submitTodoHandler = function submitTodoHandler() {
  let test = todoId;
  document.getElementById("submitAddCalendarHandler").addEventListener("click", () => {
    let startYear = document.querySelector("select[name='startYear']").value;
    let startMonth = document.querySelector("select[name='startMonth']").value;
    let startDay = document.querySelector("select[name='startDay']").value;
    let startHour = document.querySelector("select[name='startHour']").value;
    let startMinute = document.querySelector("select[name='startMinute']").value;
    let endYear = document.querySelector("select[name='endYear']").value;
    let endMonth = document.querySelector("select[name='endMonth']").value;
    let endDay = document.querySelector("select[name='endDay']").value;
    let endHour = document.querySelector("select[name='endHour']").value;
    let endMinute = document.querySelector("select[name='endMinute']").value;
    let todoTitle = document.getElementById("todoTitle").value;
    let todoContent = document.getElementById("todoContent").value;
    let todoStartDate =
      startYear +
      "-" +
      startMonth.padStart(2, "0") +
      "-" +
      startDay.padStart(2, "0") +
      "-" +
      startHour.padStart(2, "0") +
      "-" +
      startMinute.padStart(2, "0");
    let todoEndDate =
      endYear +
      "-" +
      endMonth.padStart(2, "0") +
      "-" +
      endDay.padStart(2, "0") +
      "-" +
      endHour.padStart(2, "0") +
      "-" +
      endMinute.padStart(2, "0");
    let todoBackgroundColor = document.querySelector("input[name='todoColor']:checked").value;
    if (todoTitle === "" || todoContent === "") {
      alert("일정의 제목이나 내용이 비어있습니다.");
      return;
    }
    if (todoStartDate > todoEndDate) {
      alert("시작날짜가 마지막날짜보다 더 늦습니다");
      return;
    }
    todoId !== null ? alert("일정이 수정되었습니다.") : alert("일정이 추가되었습니다.");
    // 수정
    if (todoId !== null) {
      let removeIndex;
      todoDataList.map((i, index) => {
        if (i.id === todoId) {
          removeIndex = index;
        }
      });
      todoDataList.splice(removeIndex, 1);
    }
    // 일정을 추가할 때 기존 데이터에서 시작날짜 순으로 넣어야 한다.
    let tempIndex;
    for (let i = 0; i < todoDataList.length; i++) {
      if (todoDataList[i].startDate >= todoStartDate) {
        tempIndex = i;
        break;
      }
    }
    // 추가
    todoDataList.splice(tempIndex, 0, {
      id: todoId || uuidv4(),
      title: todoTitle,
      content: todoContent,
      startDate: todoStartDate,
      endDate: todoEndDate,
      backgroundColor: todoBackgroundColor,
    });
    showTodoBarOnCalendar();
    modalToggle();
  });
};

export default submitTodoHandler;
