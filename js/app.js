window.onload = function () {
  let calendarYear = new Date().getFullYear();
  let calendarMonth = new Date().getMonth() + 1;
  document.getElementById("prevMonthMoveBtn").addEventListener("click", () => {
    if (calendarMonth === 0) {
      calendarYear -= 1;
      calendarMonth = 11;
    } else {
      calendarMonth -= 1;
    }
    document.getElementById("dayContainer").innerHTML = "";
    changeCalendar(calendarYear, calendarMonth);
  });
  document.getElementById("nextMonthMoveBtn").addEventListener("click", () => {
    if (calendarMonth === 11) {
      calendarYear += 1;
      calendarMonth = 0;
    } else {
      calendarMonth += 1;
    }
    document.getElementById("dayContainer").innerHTML = "";
    changeCalendar(calendarYear, calendarMonth);
  });

  changeCalendar(calendarYear, calendarMonth);
};

const changeCalendar = (calendarYear, calendarMonth) => {
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
  let dayContainer = document.getElementById("dayContainer");
  Object.entries(calendarDays).map((i) => {
    let temp = document.createElement("button");
    temp.append((document.createElement("span").innerText = i[1].day));
    dayContainer.append(temp);
  });
};
