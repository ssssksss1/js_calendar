// 각 주의 첫째날짜(일요일)들을 모은 배열
let calendarWeekStartDateList = [];
// 각 주마다 어떤 할일들이 공간을 차지하고 있는지를 담은 배열(가로막대로 길게 표시하기 위한 용도)
let calendarWeekTodoList = [];

let dummy = [
  {
    title: "제목1",
    content: "내용",
    startDate: "2023-07-31-00-00",
    endDate: "2023-08-14-00-00",
    backgroundColor: "red",
  },
  {
    title: "제목2",
    content: "내용",
    startDate: "2023-08-14-00-00",
    endDate: "2023-08-15-00-00",
    backgroundColor: "blue",
  },

  {
    title: "제목2",
    content: "내용",
    startDate: "2023-08-14-00-00",
    endDate: "2023-08-15-00-00",
    backgroundColor: "blue",
  },
  {
    title: "제목3",
    content: "내용",
    startDate: "2023-08-17-00-00",
    endDate: "2023-08-22-00-00",
    backgroundColor: "green",
  },
  {
    title: "제목3",
    content: "내용",
    startDate: "2023-08-17-00-00",
    endDate: "2023-08-19-00-00",
    backgroundColor: "skyblue",
  },
  {
    title: "제목4",
    content: "내용4",
    startDate: "2023-08-29-00-00",
    endDate: "2023-09-05-00-00",
    backgroundColor: "chocolate",
  },
  {
    title: "제목5",
    content: "내용4",
    startDate: "2024-01-01-00-00",
    endDate: "2024-01-02-00-00",
    backgroundColor: "chocolate",
  },
];

/**
 * @content 일정 추가시 나오는 모달 화면 창에서 연,월,일,시,분 option 태그의 값들을 넣어주는 함수
 */
let showAddCalendar = function () {
  let startYear = document.querySelector("select[name='startYear']");
  for (let i = 1990; i < 2050; i++) {
    let temp = document.createElement("option");
    temp.setAttribute("value", i);
    temp.innerText = i + " 년";
    startYear.append(temp);
  }
  let startMonth = document.querySelector("select[name='startMonth']");
  for (let i = 1; i <= 12; i++) {
    let temp = document.createElement("option");
    temp.setAttribute("value", i);
    temp.innerText = i + " 월";
    startMonth.append(temp);
  }
  let startDay = document.querySelector("select[name='startDay']");
  for (let i = 1; i <= 31; i++) {
    let temp = document.createElement("option");
    temp.setAttribute("value", i);
    temp.innerText = i + " 일";
    startDay.append(temp);
  }
  let startHour = document.querySelector("select[name='startHour']");
  for (let i = 0; i <= 23; i++) {
    let temp = document.createElement("option");
    temp.setAttribute("value", i);
    if (i === 0) {
      temp.setAttribute("selected", true);
    }
    temp.innerText = i + " 시";
    startHour.append(temp);
  }
  let startMinute = document.querySelector("select[name='startMinute']");
  for (let i = 0; i <= 55; i += 5) {
    let temp = document.createElement("option");
    temp.setAttribute("value", i);
    if (i === 0) {
      temp.setAttribute("selected", true);
    }
    temp.innerText = i + " 분";
    startMinute.append(temp);
  }
  let endYear = document.querySelector("select[name='endYear']");
  for (let i = 1990; i < 2050; i++) {
    let temp = document.createElement("option");
    temp.setAttribute("value", i);
    temp.innerText = i + " 년";
    endYear.append(temp);
  }
  let endMonth = document.querySelector("select[name='endMonth']");
  for (let i = 1; i <= 12; i++) {
    let temp = document.createElement("option");
    temp.setAttribute("value", i);
    temp.innerText = i + " 월";
    endMonth.append(temp);
  }
  let endDay = document.querySelector("select[name='endDay']");
  for (let i = 1; i <= 31; i++) {
    let temp = document.createElement("option");
    temp.setAttribute("value", i);
    temp.innerText = i + " 일";
    endDay.append(temp);
  }
  let endHour = document.querySelector("select[name='endHour']");
  for (let i = 0; i <= 23; i++) {
    let temp = document.createElement("option");
    temp.setAttribute("value", i);
    if (i === 0) {
      temp.setAttribute("selected", true);
    }
    temp.innerText = i + " 시";
    endHour.append(temp);
  }
  let endMinute = document.querySelector("select[name='endMinute']");
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

/**
 * @content 달력 형태 구성하고, 달력에 날짜 클릭시 모달화면과 날짜 input 값에 넣어주는 함수
 */
let changeCalendar = (calendarYear, calendarMonth) => {
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
      modalToggle();
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
  calendarWeekStartDateList = tempCalendarWeekStartDateList;
};

/**
 * - 일정을 submit할 때 실행하는 함수
 */
let submitAddTodoHandler = function () {
  // TODO 문제 있음
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
    alert("일정이 추가되었습니다.");

    // 일정을 추가할 때 기존 데이터에서 시작날짜 순으로 넣어야 한다.
    let tempIndex;
    for (let i = 0; i < dummy.length; i++) {
      if (dummy[i].startDate >= todoStartDate) {
        tempIndex = i;
        break;
      }
    }
    dummy.splice(tempIndex, 0, {
      title: todoTitle,
      content: todoContent,
      startDate: todoStartDate,
      endDate: todoEndDate,
      backgroundColor: todoBackgroundColor,
    });
    console.log("추가된거 확인 dummy : ", dummy);
    document.getElementById("todoTitle").value = "";
    document.getElementById("todoContent").value = "";
    modalToggle();
    showTodoBarOnCalendar();
  });
};

/**
 * @content 달력에서 이전 달, 다음 달 버튼 클릭시 달력날짜 바꿔주는 함수
 * - 이후에 changeCalendar() 함수를 작동시켜 달력의 날짜 등을 모두 변경시킨다.
 */
let moveCalendarHandler = function (calendarYear, calendarMonth) {
  document.getElementById("prevMonthMoveBtn").addEventListener("click", () => {
    console.log("달력 이전달로 이동");
    if (calendarMonth === 0) {
      calendarYear -= 1;
      calendarMonth = 11;
    } else {
      calendarMonth -= 1;
    }
    document.getElementById("monthContainer").innerHTML = "";
    changeCalendar(calendarYear, calendarMonth);
    showTodoBarOnCalendar();
  });
  document.getElementById("nextMonthMoveBtn").addEventListener("click", () => {
    console.log("달력 다음달로 이동");
    if (calendarMonth === 11) {
      calendarYear += 1;
      calendarMonth = 0;
    } else {
      calendarMonth += 1;
    }
    document.getElementById("monthContainer").innerHTML = "";
    changeCalendar(calendarYear, calendarMonth);
    showTodoBarOnCalendar();
  });
};

/**
 * @content 모달 창을 끌때 자주 사용하는 함수
 */
let modalToggle = function () {
  document.getElementById("modal").classList.toggle("modal");
};

/**
 * @content 모달 페이지에서 취소나 x 버튼, 오버레이(외부에 검은화면) 클릭시 모달창을 안보이게해주는 함수
 */
let modalCloseAddHandler = function () {
  let modalCloseBtn = document.getElementsByClassName("modalCloseBtn");
  for (let i = 0; i < modalCloseBtn.length; i++) {
    modalCloseBtn[i].addEventListener("click", () => {
      modalToggle();
    });
  }
};

/**
 * @content 시작날짜와 마지막 날짜 사이의 일수를 보여준다.
 * @param start 시작날짜(Date타입)
 * @param end 마지막날짜(Date타입)
 * - 날짜가 같은 경우 0의 값이 출력이 된다.
 */
let dayIntervalCalc = function (start, end) {
  if (start.getTime() - end.getTime() < 0) {
    return -1 * Math.ceil(Math.abs(start.getTime() - end.getTime()) / (1000 * 3600 * 24));
  } else {
    return Math.ceil(Math.abs(start.getTime() - end.getTime()) / (1000 * 3600 * 24));
  }
};

/**
 *
 * Date 타입을 String "2000-11-11" 형식으로 바꾸어주는 함수
 * @returns "yyyy-mm-dd"
 */
let dateTypeTo4Y2M2D = function (date) {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0")
  );
};

/**
 * @content 달력에 일정을 추가해주는 함수
 * - 데이터는 무조건 startDate 기준을 오름차순으로 보내주어야 한다.(중요)
 */

let showTodoBarOnCalendar = function () {
  if (dummy.length < 1) return;
  let removeTodoBar = document.getElementsByClassName("todoBar");
  for (let i = removeTodoBar.length - 1; i >= 0; i--) {
    removeTodoBar[i].remove();
  }
  let barLayer = 1;
  let standardEndDate = "1950-01-01";
  let dummyCopy = [...dummy];
  while (dummyCopy.length !== 0) {
    let weekLayer = 0;
    standardEndDate = "1950-01-01";
    let removeIndex = [];
    // console.log("barLayer :" + barLayer);

    // console.log(
    //   "남은 데이터 : ",
    //   dummyCopy.map((i) => "\n" + i)
    // );
    // 일정을 반복하면서 첫번째 줄부터 이어서 나가는 방식
    dummyCopy.map((i, index) => {
      // 보이지는 달력과 상관없는 일정은 제외한다.
      if (
        i.endDate.substring(0, 10) > dateTypeTo4Y2M2D(calendarWeekStartDateList[0]) &&
        i.startDate.substring(0, 10) <
          dateTypeTo4Y2M2D(
            new Date(calendarWeekStartDateList[calendarWeekStartDateList.length - 1].getTime() + 6 * 24 * 3600 * 1000)
          )
      ) {
        // console.log(
        //   "barLayer : " + barLayer,
        //   "\ni.startDate : " + i.startDate,
        //   "\ni.endDate : " + i.endDate,
        //   "\ni.title : " + i.title,
        //   "\npass : " + (standardEndDate < i.startDate.substring(0, 10))
        // );
        if (standardEndDate < i.startDate.substring(0, 10)) {
          let lastDayOfMonth = dateTypeTo4Y2M2D(
            new Date(calendarWeekStartDateList[calendarWeekStartDateList.length - 1].getTime() + 6 * 24 * 3600 * 1000)
          );
          let todoStartDate = new Date(i.startDate.substring(0, 10));
          let todoEndDate = new Date(
            i.endDate.substring(0, 10) > lastDayOfMonth ? lastDayOfMonth : i.endDate.substring(0, 10)
          );
          let todoInterval = dayIntervalCalc(todoEndDate, todoStartDate) + 1;
          // 달력에서 각 주의 첫번째 날짜와 일정 시작날짜를 비교해서 시작 일정 위치를 찾음
          for (; weekLayer < calendarWeekStartDateList.length; weekLayer++) {
            // 열과 행 언제 부터 시작할지 알려주는 함수(결과 값으로는 열의 위치를 알려주고, weekLayer 변수에 행의 위치가 보관된다.)
            let todoStartDateIndex = dayIntervalCalc(todoStartDate, calendarWeekStartDateList[weekLayer]) - 1;
            // 몇번째 주부터 시작할지 찾는 로직
            if (todoStartDateIndex >= 0 && todoStartDateIndex < 7) {
              // console.log(
              //   "일정 개수 : " + todoInterval + ",\n시작칸 : " + todoStartDateIndex + ",\n시작줄 :" + weekLayer
              // );
              // 현재 줄에 들어가야할 블록의 갯수
              let numberOfExtraBlocks = todoInterval;
              let blocksNumberOfCurrentLine =
                todoStartDateIndex + todoInterval > 7 ? 7 - todoStartDateIndex : todoInterval;
              while (blocksNumberOfCurrentLine > 0) {
                // console.log(
                //   "numberOfExtraBlocks : " +
                //     numberOfExtraBlocks +
                //     ",\nblocksNumberOfCurrentLine : " +
                //     blocksNumberOfCurrentLine
                // );
                let weekStartDateToString = dateTypeTo4Y2M2D(
                  new Date(calendarWeekStartDateList[weekLayer].getTime() + todoStartDateIndex * 24 * 3600 * 1000)
                );
                let dayContainerElement = document.getElementById(weekStartDateToString);
                let todoBarElement = document.createElement("div");
                todoBarElement.setAttribute("class", "todoBar");
                let padding = 4;
                if ((numberOfExtraBlocks -= blocksNumberOfCurrentLine <= 0) && numberOfExtraBlocks < 7) {
                  todoBarElement.style.width =
                    "calc(" + 100 * blocksNumberOfCurrentLine + "% - " + (padding * 2 + 3) + "px)";
                } else {
                  todoBarElement.style.width = "calc(" + 100 * blocksNumberOfCurrentLine + "% - " + 6 + "px)";
                }

                // dayContainerElement.style.gridRowStart = barLayer;
                todoBarElement.style.gridRowStart = barLayer;
                todoBarElement.style.paddingLeft = "4px";
                todoBarElement.style.marginLeft = "1px";
                todoBarElement.style.backgroundColor = i.backgroundColor;
                todoBarElement.innerText = i.title;
                todoBarElement.addEventListener("click", (e) => {
                  e.stopPropagation();
                });
                dayContainerElement.append(todoBarElement);

                let gridTemplateRowsStyle = document.getElementsByClassName("week_" + weekLayer);
                for (k = 0; k < gridTemplateRowsStyle.length; k++) {
                  gridTemplateRowsStyle[k].style.gridTemplateRows = "repeat(" + barLayer + ", 1fr)";
                }

                numberOfExtraBlocks -= blocksNumberOfCurrentLine;
                blocksNumberOfCurrentLine = numberOfExtraBlocks >= 7 ? 7 : numberOfExtraBlocks;
                if (blocksNumberOfCurrentLine > 0) {
                  weekLayer += 1;
                  todoStartDateIndex = 0;
                }
                // console.log("끝 numberOfExtraBlocks :", numberOfExtraBlocks);
                // console.log("끝 blocksNumberOfCurrentLine :", blocksNumberOfCurrentLine);
              }
              standardEndDate =
                i.endDate.substring(0, 10) < lastDayOfMonth ? i.endDate.substring(0, 10) : lastDayOfMonth;
              // console.log("standardEndDate : " + standardEndDate);
              removeIndex.unshift(index);
              break;
            }
          }
        }
      } else {
        removeIndex.unshift(index);
      }
    });
    // let temp = document.getElementsByClassName("dayContainer");
    // for (let i = 0; i < temp.length; i++) {
    //   temp[i].style.gridTemplateRows = "repeat(" + barLayer + ", 1fr)";
    // }
    barLayer += 1;
    removeIndex.map((k) => {
      dummyCopy.splice(k, 1);
    });
  }
};

window.onload = function () {
  let calendarYear = new Date().getFullYear();
  let calendarMonth = new Date().getMonth();

  showAddCalendar();
  moveCalendarHandler(calendarYear, calendarMonth);
  changeCalendar(calendarYear, calendarMonth);
  submitAddTodoHandler();
  modalCloseAddHandler();
  showTodoBarOnCalendar();
};
