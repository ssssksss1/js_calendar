/**
import { createAndUpdateCalendar } from './createAndUpdateCalendar';
 * @content 일정 추가시 나오는 모달 화면 창에서 연,월,일,시,분 option 태그의 값들을 넣어주는 함수
*/
let createCalendarForm = function createCalendarForm() {
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

  for (let i = 1990; i < 2050; i++) {
    let temp = document.createElement("option");
    temp.setAttribute("value", i);
    temp.innerText = i + " 년";
    startYear.append(temp);
  }
  for (let i = 1; i <= 12; i++) {
    let temp = document.createElement("option");
    temp.setAttribute("value", i);
    temp.innerText = i + " 월";
    startMonth.append(temp);
  }
  for (let i = 1; i <= 31; i++) {
    let temp = document.createElement("option");
    temp.setAttribute("value", i);
    temp.innerText = i + " 일";
    startDay.append(temp);
  }
  for (let i = 0; i <= 23; i++) {
    let temp = document.createElement("option");
    temp.setAttribute("value", i);
    if (i === 0) {
      temp.setAttribute("selected", true);
    }
    temp.innerText = i + " 시";
    startHour.append(temp);
  }
  for (let i = 0; i <= 55; i += 5) {
    let temp = document.createElement("option");
    temp.setAttribute("value", i);
    if (i === 0) {
      temp.setAttribute("selected", true);
    }
    temp.innerText = i + " 분";
    startMinute.append(temp);
  }
  for (let i = 1990; i < 2050; i++) {
    let temp = document.createElement("option");
    temp.setAttribute("value", i);
    temp.innerText = i + " 년";
    endYear.append(temp);
  }
  for (let i = 1; i <= 12; i++) {
    let temp = document.createElement("option");
    temp.setAttribute("value", i);
    temp.innerText = i + " 월";
    endMonth.append(temp);
  }
  for (let i = 1; i <= 31; i++) {
    let temp = document.createElement("option");
    temp.setAttribute("value", i);
    temp.innerText = i + " 일";
    endDay.append(temp);
  }
  for (let i = 0; i <= 23; i++) {
    let temp = document.createElement("option");
    temp.setAttribute("value", i);
    if (i === 0) {
      temp.setAttribute("selected", true);
    }
    temp.innerText = i + " 시";
    endHour.append(temp);
  }
  for (let i = 0; i <= 55; i += 5) {
    let temp = document.createElement("option");
    temp.setAttribute("value", i);
    if (i === 0) {
      temp.setAttribute("selected", true);
    }
    temp.innerText = i + " 분";
    endMinute.append(temp);
  }
};
export default createCalendarForm;
