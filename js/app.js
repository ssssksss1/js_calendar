import createCalendarForm from "./createCalendarForm.js";
import createAndUpdateCalendar from "./createAndUpdateCalendar.js";
import moveCalendar from "./moveCalendar.js";
import showTodoBarOnCalendar from "./showTodoBarOnCalendar.js";
import submitTodoHandler from "./submitTodoHandler.js";
import { modalCloseAddHandler, modalOpen } from "./modalFunction.js";

// 각 주의 첫째날짜(일요일)들을 모은 배열
export var calendarWeekStartDateList = [];
// 각 주마다 어떤 할일들이 공간을 차지하고 있는지를 담은 배열(가로막대로 길게 표시하기 위한 용도)
// let calendarWeekTodoList = []; // 이거 필요 없는거 같은데?
export var todoId = null;
export let changeTodoId = function changeTodoId(value) {
  todoId = value;
};
export let changeTodoDataList = function changeTodoDataList(value) {
  todoDataList = value;
};
export let changeCalendarWeekStartDateList = function changeCalendarWeekStartDateList(value) {
  calendarWeekStartDateList = value;
};

export var todoDataList = [
  {
    id: 1,
    title: "운동하기",
    content: "달리기",
    startDate: "2023-08-12-12-15",
    endDate: "2023-08-14-00-00",
    backgroundColor: "#ff0000",
    isExist: true,
  },
];

window.onload = function () {
  let calendarYear = new Date().getFullYear();
  let calendarMonth = new Date().getMonth();

  let startYear = document.querySelector("select[name='startYear']");
  let startMonth = document.querySelector("select[name='startMonth']");
  let startDay = document.querySelector("select[name='startDay']");
  let startHour = document.querySelector("select[name='startHour']");
  let startMinute = document.querySelector("select[name='startMinute']");
  let endYear = document.querySelector("select[name='endYear']");
  let endMonth = document.querySelector("select[name='endMonth']");
  let endDay = document.querySelector("select[name='endDay']");
  let endHour = document.querySelector("select[name='endHour']");
  let endMinute = document.querySelector("select[name='endMinute']");
  let todoTitle = document.getElementById("todoTitle");
  let todoContent = document.getElementById("todoContent");
  let submitAddCalendarHandler = document.getElementById("submitAddCalendarHandler");

  document.getElementById("todoBarIntroContainerOverlay").addEventListener("click", (e) => {
    document.getElementById("todoBarIntroContainerOverlay").setAttribute("class", "isTodoBarIntro");
  });

  document.getElementById("todoBarIntroCloseBtn").addEventListener("click", (e) => {
    document.getElementById("todoBarIntroContainerOverlay").setAttribute("class", "isTodoBarIntro");
  });

  document.getElementById("todoBarIntroEditBtn").addEventListener("click", (e) => {
    modalOpen();
  });

  document.getElementById("todoBarIntroCheckBox").addEventListener("click", (e) => {
    e.stopPropagation();
    todoDataList.map((i) => {
      if (i.id === todoId) {
        i.isExist = !i.isExist;
        if (i.isExist === false) {
          i.backgroundColor = i.backgroundColor + "77";
        } else {
          i.backgroundColor = i.backgroundColor.substring(0, 7);
        }
        let temp = document.querySelectorAll("[data-id='" + i.id + "']");
        for (let j = 0; j < temp.length; j++) {
          temp[j].parentElement.childNodes[0].style.backgroundColor = i.backgroundColor;
          if (i.isExist === false) {
            temp[j].parentElement.childNodes[0].style.textDecoration = "line-through";
          } else {
            temp[j].parentElement.childNodes[0].style.textDecoration = "none";
          }
        }
      }
    });
  });

  document.getElementById("todoBarIntroDeleteBtn").addEventListener("click", (e) => {
    if (window.confirm("삭제를 하시겠습니까?")) {
      let removeIndex;
      todoDataList.map((i, index) => {
        if (i.id === todoId) {
          removeIndex = index;
        }
      });
      todoDataList.splice(removeIndex, 1);
      Toastify({
        text: "일정을 삭제했습니다.",
        backgroundColor: "linear-gradient(to right, #ff0000ff, #fd6868)",
        className: "warning",
      }).showToast();
      showTodoBarOnCalendar();
    }
  });

  //
  createCalendarForm();
  createAndUpdateCalendar(calendarYear, calendarMonth);
  moveCalendar(calendarYear, calendarMonth);
  modalCloseAddHandler();
  showTodoBarOnCalendar();
  submitTodoHandler();
};
