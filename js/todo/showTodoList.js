import { todoDataList, calendarYear, calendarMonth, changeTodoId } from "../app.js";
import { modalCloseAddHandler, modalOpen } from "../modalFunction.js";

/**
 * @content 오늘의 날짜를 기준으로 d-day 계산하는 함수
 * @param {Date} date
 */
let calculateDDay = function calculateDDay(date) {
  let returnValue;
  let today = new Date();
  if (today < date) {
    returnValue = Math.ceil(Math.abs(date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  } else {
    returnValue = -1 * Math.ceil(Math.abs(date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  }
  return returnValue;
};

/**
 * @content 달력 일정 리스트로 뿌려주기
 */
let showTodoList = function showTodoList() {
  document.getElementById("todoListContainer").innerHTML = "";
  let todoLegendStandard = 0;
  todoDataList.map((i) => {
    if (i.startDate.substring(0, 4) != calendarYear) return;
    if (todoLegendStandard !== Number(i.startDate.substring(5, 7))) {
      let tempMonth = Number(i.startDate.substring(5, 7));
      let tempLegendMonthElement = document.createElement("span");
      tempLegendMonthElement.setAttribute("class", "todoLegendMonth");
      tempLegendMonthElement.innerText = tempMonth + "월";
      document.getElementById("todoListContainer").appendChild(tempLegendMonthElement);
      todoLegendStandard = tempMonth;
    }
    let temp = document.createElement("li");
    temp.setAttribute("class", "todoItem");
    temp.setAttribute("data-id", i.id);
    //
    temp.addEventListener("click", (e) => {
      if (i.isExist === false) {
        document.getElementById("todoBarIntroCheckBox").checked = true;
      } else {
        document.getElementById("todoBarIntroCheckBox").checked = false;
      }
      document.getElementById("todoBarIntroContainerOverlay").classList.toggle("isTodoBarIntro");
      let w = document.getElementById("calendarContainer").clientWidth;
      if (w < e.clientX + 300) {
        document.getElementById("todoBarIntroContainer").style.left =
          ((w - 320) / w) * ((100 * w) / window.innerWidth) + "%";
        if (window.innerHeight / 2 < e.clientY) {
          document.getElementById("todoBarIntroContainer").style.top = e.clientY - 162 + "px";
        } else {
          document.getElementById("todoBarIntroContainer").style.top = e.clientY + 22 + "px";
        }
      } else {
        document.getElementById("todoBarIntroContainer").style.left =
          ((e.clientX - 20) / w) * ((100 * w) / window.innerWidth) + "%";
        if (window.innerHeight / 2 < e.clientY) {
          document.getElementById("todoBarIntroContainer").style.top = e.clientY - 162 + "px";
        } else {
          document.getElementById("todoBarIntroContainer").style.top = e.clientY + 22 + "px";
        }
      }
      document.getElementById("todoBarIntroContent").innerText = i.content;
      document.getElementById("todoBarIntroDate").innerText = i.startDate + " ~ " + i.endDate;

      // 미리 수정할 값들을 넣어두기
      changeTodoId(i.id);
      document.getElementById("todoTitle").value = i.title;
      document.getElementById("todoContent").value = i.content;
      document.querySelector("select[name='startYear']").value = Number(i.startDate.substring(0, 4));
      document.querySelector("select[name='startMonth']").value = Number(i.startDate.substring(5, 7));
      document.querySelector("select[name='endYear']").value = Number(i.endDate.substring(0, 4));
      document.querySelector("select[name='endMonth']").value = Number(i.endDate.substring(5, 7));
      document.querySelector("select[name='startDay']").value = Number(i.startDate.substring(8, 10));
      document.querySelector("select[name='endDay']").value = Number(i.endDate.substring(8, 10));
      document.querySelector("select[name='startHour']").value = Number(i.startDate.substring(11, 13));
      document.querySelector("select[name='startMinute']").value = Number(i.startDate.substring(14, 16));
      document.querySelector("select[name='endHour']").value = Number(i.endDate.substring(11, 13));
      document.querySelector("select[name='endMinute']").value = Number(i.endDate.substring(14, 16));
      let backgroundColors = document.querySelectorAll("input[name='todoColor']");
      backgroundColors.forEach((t, index) => {
        if (t.value === i.backgroundColor) {
          backgroundColors[index].checked = true;
        }
      });
      document.getElementById("submitAddCalendarHandler").innerText = "일정 수정";
    });
    //
    Object.entries(i)?.map(([key, value], index) => {
      // id, isExist, startDate, endDate, content, backgroundColor, title
      let div = document.createElement("div");
      if (key === "title") {
        div.innerText = "제목 : " + value;
      } else if (key === "content") {
        div.innerText = "내용 : " + value;
      } else if (key === "startDate") {
        div.innerText = "시작일 : " + value + " (D-Day : " + calculateDDay(new Date(value.substring(0, 10))) + " )";
      } else if (key === "endDate") {
        div.innerText = "종료일 : " + value + " (D-Day : " + calculateDDay(new Date(value.substring(0, 10))) + " )";
      } else if (key === "backgroundColor") {
        temp.style.border = "solid " + value + " 4px";
      } else if (key === "isExist") {
        if (value === false) {
          temp.style.textDecoration = "line-through";
        }
      }
      temp.appendChild(div);
    });
    document.getElementById("todoListContainer").appendChild(temp);
  });
};

export default showTodoList;
