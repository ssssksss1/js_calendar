import { modalToggle } from "./modalFunction.js";
import { todoId, changeTodoId, changeCalendarWeekStartDateList } from "./app.js";

/**
 * @content 달력 형태 구성하고, 달력에 날짜 클릭시 모달화면과 날짜 input 값에 넣어주는 함수
 */
let createAndUpdateCalendar = function createAndUpdateCalendar(calendarYear, calendarMonth) {
  document.getElementById("year").innerText = calendarYear + "년";
  document.getElementById("month").innerText = calendarMonth + 1 + "월";
  let baseDate = new Date(calendarYear, calendarMonth);
  let baseDateStartDayW = baseDate.getDay(); // 0-6
  let baseDateEndDay = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 0).getDate(); // 28-31
  let prevDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), 0);
  let prevDateEndDay = prevDate.getDate(); // 28-31
  let prevEndDayW = prevDate.getDay(); // 0-6
  let nextDateStartDate = new Date(baseDate.getFullYear(), baseDate.getMonth() + 1, 1);
  let nextDateStartDayW = nextDateStartDate.getDay(); // 0-6
  let calendarDays = {};

  let dateString = (year, month, day) => {
    // 13개월이 되면 1월로 만들고 1년을 더해준다.
    // 출력 형식은 2000-12-31 과 같이 반환
    if (month === 13) {
      year = year + 1;
      month = 1;
    } else if (month === 0) {
      year = year - 1;
      month = 12;
    }
    return year.toString() + "-" + ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2);
  };

  let temp = {};
  if (baseDateStartDayW === 0) {
    // 이번달
    for (let i = 1; i <= baseDateEndDay; i++) {
      temp[dateString(calendarYear, calendarMonth + 1, i)] = {
        day: i,
        dayW: (i - 1) % 7,
        isThisMonth: false,
      };
    }

    // 다음달(일요일로 시작하면 제외)
    if (nextDateStartDayW !== 0) {
      for (let i = 1; i <= 7 - nextDateStartDayW; i++) {
        temp[dateString(calendarYear, calendarMonth + 2, i)] = {
          day: i,
          dayW: nextDateStartDayW + i - 1,
          isThisMonth: false,
        };
      }
    }
  }
  // [2]시작일이 일요일이 아닌 경우
  else {
    // 저번달
    for (let i = prevDateEndDay - prevEndDayW, j = 0; i <= prevDateEndDay; i++, j++) {
      temp[dateString(calendarYear, calendarMonth, i)] = {
        day: i,
        dayW: j,
        isThisMonth: false,
      };
    }
    // 이번달
    for (let i = 1; i <= baseDateEndDay; i++) {
      temp[dateString(calendarYear, calendarMonth + 1, i)] = {
        day: i,
        dayW: (i - 1 + baseDateStartDayW) % 7,
        isThisMonth: true,
      };
    }
    // 다음달
    if (nextDateStartDayW !== 0) {
      for (let i = 1; i <= 7 - nextDateStartDayW; i++) {
        temp[dateString(calendarYear, calendarMonth + 2, i)] = {
          day: i,
          dayW: nextDateStartDayW + i - 1,
          isThisMonth: false,
        };
      }
    }
  }
  calendarDays = Object.assign({}, temp);

  // 여기까지 달력 날짜에 맞게 날짜 구성완료
  // 아래는 html로 보여줄 수 있게 UI 구성

  let monthContainer = document.getElementById("monthContainer");
  let weekContainer = document.createElement("div");
  weekContainer.setAttribute("class", "weekContainer");
  let tempCalendarWeekStartDateList = [];
  Object.entries(calendarDays).map((i, index) => {
    if (index % 7 === 0) {
      tempCalendarWeekStartDateList.push(
        new Date(i[0].substring(0, 4), Number(i[0].substring(5, 7)) - 1, i[0].substring(8, 10), 0, 0)
      );
    }
    let btn = document.createElement("button");
    let dayContainerElement = document.createElement("div");
    btn.setAttribute("type", "button");
    dayContainerElement.setAttribute("class", "dayContainer week_" + Math.floor(index / 7));
    dayContainerElement.setAttribute("id", i[0]);
    let span = document.createElement("span");

    btn.addEventListener("click", () => {
      changeTodoId(null);
      modalToggle();
      document.getElementById("todoTitle").value = "";
      document.getElementById("todoContent").value = "";
      document.querySelector("select[name='startYear']").value = Number(i[0].substring(0, 4));
      document.querySelector("select[name='startMonth']").value = Number(i[0].substring(5, 7));
      document.querySelector("select[name='endYear']").value = Number(i[0].substring(0, 4));
      document.querySelector("select[name='endMonth']").value = Number(i[0].substring(5, 7));
      document.querySelector("select[name='startDay']").value = i[1].day;
      document.querySelector("select[name='endDay']").value = i[1].day;
      document.querySelector("select[name='startHour']").value = 0;
      document.querySelector("select[name='startMinute']").value = 0;
      document.querySelector("select[name='endHour']").value = 0;
      document.querySelector("select[name='endMinute']").value = 0;
      document.getElementById("submitAddCalendarHandler").innerText = "일정 추가";
    });
    span.innerText = i[1].day;
    btn.append(span);
    btn.append(dayContainerElement);
    weekContainer.append(btn);

    if ((index + 1) % 7 === 0) {
      monthContainer.append(weekContainer);
      weekContainer = document.createElement("div");
      weekContainer.setAttribute("class", "weekContainer");
    }
  });
  changeCalendarWeekStartDateList(tempCalendarWeekStartDateList);
};

export default createAndUpdateCalendar;
