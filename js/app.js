window.onload = function () {
  // 캘린더 추가하는 공간에서 필요한 html 구성
  var addCalendarHandler = function () {
    let startYear = document.querySelector("select[name='startYear']");
    for (let i = 1990; i < 2050; i++) {
      let temp = document.createElement("option");
      temp.setAttribute("value", i);
      temp.innerText = i + "년";
      startYear.append(temp);
    }
    let startMonth = document.querySelector("select[name='startMonth']");
    for (let i = 1; i <= 12; i++) {
      let temp = document.createElement("option");
      temp.setAttribute("value", i);
      temp.innerText = i + "월";
      startMonth.append(temp);
    }
    let startDay = document.querySelector("select[name='startDay']");
    for (let i = 1; i <= 31; i++) {
      let temp = document.createElement("option");
      temp.setAttribute("value", i);
      temp.innerText = i + "일";
      startDay.append(temp);
    }
    let startHour = document.querySelector("select[name='startHour']");
    for (let i = 0; i <= 23; i++) {
      let temp = document.createElement("option");
      temp.setAttribute("value", i);
      if (i === 0) {
        temp.setAttribute("selected", true);
      }
      temp.innerText = i + "시";
      startHour.append(temp);
    }
    let startMinute = document.querySelector("select[name='startMinute']");
    for (let i = 0; i <= 55; i += 5) {
      let temp = document.createElement("option");
      temp.setAttribute("value", i);
      if (i === 0) {
        temp.setAttribute("selected", true);
      }
      temp.innerText = i + "분";
      startMinute.append(temp);
    }
    let endYear = document.querySelector("select[name='endYear']");
    for (let i = 1990; i < 2050; i++) {
      let temp = document.createElement("option");
      temp.setAttribute("value", i);
      temp.innerText = i + "년";
      endYear.append(temp);
    }
    let endMonth = document.querySelector("select[name='endMonth']");
    for (let i = 1; i <= 12; i++) {
      let temp = document.createElement("option");
      temp.setAttribute("value", i);
      temp.innerText = i + "월";
      endMonth.append(temp);
    }
    let endDay = document.querySelector("select[name='endDay']");
    for (let i = 1; i <= 31; i++) {
      let temp = document.createElement("option");
      temp.setAttribute("value", i);
      temp.innerText = i + "일";
      endDay.append(temp);
    }
    let endHour = document.querySelector("select[name='endHour']");
    for (let i = 0; i <= 23; i++) {
      let temp = document.createElement("option");
      temp.setAttribute("value", i);
      if (i === 0) {
        temp.setAttribute("selected", true);
      }
      temp.innerText = i + "시";
      endHour.append(temp);
    }
    let endMinute = document.querySelector("select[name='endMinute']");
    for (let i = 0; i <= 55; i += 5) {
      let temp = document.createElement("option");
      temp.setAttribute("value", i);
      if (i === 0) {
        temp.setAttribute("selected", true);
      }
      temp.innerText = i + "분";
      endMinute.append(temp);
    }
  };
  addCalendarHandler();

  //
  let calendarYear = new Date().getFullYear();
  let calendarMonth = new Date().getMonth() + 1;
  document.getElementById("prevMonthMoveBtn").addEventListener("click", () => {
    if (calendarMonth === 0) {
      calendarYear -= 1;
      calendarMonth = 11;
    } else {
      calendarMonth -= 1;
    }
    document.getElementById("monthContainer").innerHTML = "";
    changeCalendar(calendarYear, calendarMonth);
  });
  document.getElementById("nextMonthMoveBtn").addEventListener("click", () => {
    if (calendarMonth === 11) {
      calendarYear += 1;
      calendarMonth = 0;
    } else {
      calendarMonth += 1;
    }
    document.getElementById("monthContainer").innerHTML = "";
    changeCalendar(calendarYear, calendarMonth);
  });

  changeCalendar(calendarYear, calendarMonth);

  // modal
  let modalCloseBtn = document.getElementsByClassName("modalCloseBtn");
  for (let i = 0; i < modalCloseBtn.length; i++) {
    modalCloseBtn[i].addEventListener("click", () => {
      document.getElementById("modal").classList.toggle("modal");
      document.getElementById("modalOverlay").classList.toggle("modal");
    });
  }
  document.getElementById("modalOverlay").addEventListener("click", () => {
    document.getElementById("modal").classList.toggle("modal");
    document.getElementById("modalOverlay").classList.toggle("modal");
  });
};

var changeCalendar = (calendarYear, calendarMonth) => {
  document.getElementById("year").innerText = calendarYear + "년";
  document.getElementById("month").innerText = (calendarMonth || 12) + "월";

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
  /* 객체 형태로 아래와 같이 출력
    2023-07-30:  
      day: 30
      dayW: 0
      isThisMonth: false
  */
  let monthContainer = document.getElementById("monthContainer");
  let weekContainer = document.createElement("div");
  weekContainer.setAttribute("class", "weekContainer");
  Object.entries(calendarDays).map((i, index) => {
    let btn = document.createElement("button");
    let span = document.createElement("span");
    btn.addEventListener("click", () => {
      document.getElementById("modal").classList.toggle("modal");
      document.getElementById("modalOverlay").classList.toggle("modal");
    });
    span.innerText = i[1].day;
    btn.append(span);
    let temp = document.createElement("div");
    if (index === 18) {
      btn.append(temp);
    }
    weekContainer.append(btn);
    if ((index + 1) % 7 === 0) {
      monthContainer.append(weekContainer);
      weekContainer = document.createElement("div");
      weekContainer.setAttribute("class", "weekContainer");
    }
  });

  document.getElementById("addCalendarHandlerBtn").addEventListener("click", () => {
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

    console.log("app.js 파일 : ", startYear);
    console.log("app.js 파일 : ", startMonth);
    console.log("app.js 파일 : ", startDay);
    console.log("app.js 파일 : ", startHour);
    console.log("app.js 파일 : ", startMinute);
    console.log("app.js 파일 : ", endYear);
    console.log("app.js 파일 : ", endMonth);
    console.log("app.js 파일 : ", endDay);
    console.log("app.js 파일 : ", endHour);
    console.log("app.js 파일 : ", endMinute);
  });
};
