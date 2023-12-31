import showTodoBarOnCalendar from "./showTodoBarOnCalendar.js";
import { todoDataList, todoId } from "./app.js";
import { modalToggle } from "./modalFunction.js";
import todoMain from "./todo/main.js";

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
    // 유효성 검사
    if (todoTitle === "") {
      document.getElementById("inputItemTitleErrorMsg").innerText = "제목을 작성해주세요";
      return;
    }
    if (todoContent === "") {
      document.getElementById("inputItemTitleErrorMsg").innerText = "";
      document.getElementById("inputItemContentErrorMsg").innerText = "내용을 작성해주세요";
      return;
    }
    if (todoStartDate > todoEndDate) {
      document.getElementById("inputItemTitleErrorMsg").innerText = "";
      document.getElementById("inputItemContentErrorMsg").innerText = "";
      document.getElementById("inputItemDateErrorMsg").innerText = "시작날짜가 끝나는날짜보다 더 늦습니다";
      return;
    }
    document.getElementById("inputItemTitleErrorMsg").innerText = "";
    document.getElementById("inputItemContentErrorMsg").innerText = "";
    document.getElementById("inputItemDateErrorMsg").innerText = "";
    todoId !== null
      ? Toastify({
          text: "일정이 수정되었습니다.",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          className: "info",
          duration: 2000,
        }).showToast()
      : Toastify({
          text: "일정이 추가되었습니다.",
          backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
          className: "info",
          duration: 2000,
        }).showToast();

    var myToast = Toastify({
      text: "This is a toast message",
      duration: 5000,
    });

    let isExist = true;
    // 수정
    if (todoId !== null) {
      let removeIndex;
      todoDataList.map((i, index) => {
        if (i.id === todoId) {
          removeIndex = index;
          isExist = i.isExist;
        }
      });
      todoDataList.splice(removeIndex, 1);
    }
    // 일정을 추가할 때 기존 데이터에서 시작날짜 순으로 넣어야 한다.
    let tempIndex = todoDataList.length;
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
      isExist: isExist,
    });
    showTodoBarOnCalendar();
    modalToggle();
    todoMain();
  });
};

export default submitTodoHandler;
