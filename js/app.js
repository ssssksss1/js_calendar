import createCalendarForm from "./createCalendarForm.js";
import createAndUpdateCalendar from "./createAndUpdateCalendar.js";
import moveCalendar from "./moveCalendar.js";
import showTodoBarOnCalendar from "./showTodoBarOnCalendar.js";
import submitTodoHandler from "./submitTodoHandler.js";
import { modalCloseAddHandler } from "./modalFunction.js";

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
    title: "제목1111111111111111113333333333332222222222222",
    content: "내용",
    startDate: "2023-08-12-12-15",
    endDate: "2023-08-14-00-00",
    backgroundColor: "red",
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
  let modalHeaderContainer = document.getElementById("modalHeaderContainer");
  let modalHeaderTitle = document.getElementById("modalHeaderTitle");
  let submitAddCalendarHandler = document.getElementById("submitAddCalendarHandler");
  //
  createCalendarForm();
  createAndUpdateCalendar(calendarYear, calendarMonth);
  moveCalendar(calendarYear, calendarMonth);
  modalCloseAddHandler();
  showTodoBarOnCalendar();
  submitTodoHandler();
};
