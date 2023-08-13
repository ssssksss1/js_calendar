import dateTypeToString4Y2M2D from "./dateTypeToString4Y2M2D.js";
import dayIntervalCalc from "./dayIntervalCalc.js";
import { todoDataList, todoId, changeTodoId, calendarWeekStartDateList } from "./app.js";
import { modalOpen } from "./modalFunction.js";
/**
 * @content 달력에 일정을 추가해주는 함수
 * - 데이터는 무조건 startDate 기준을 오름차순으로 보내주어야 한다.(중요)
 */
let showTodoBarOnCalendar = function showTodoBarOnCalendar() {
  let removeTodoBar = document.getElementsByClassName("todoBar");
  // 2. 기존에 보이는 todoBar들을 모두 삭제
  for (let i = removeTodoBar.length - 1; i >= 0; i--) {
    removeTodoBar[i].remove();
  }
  let barLayer = 1;
  let standardEndDate = "1950-01-01";
  let todoDataListCopy = [...todoDataList];
  // 3. 아직 화면에 보여줄 UI가 남아있을때까지 그려주는 것을 반복
  while (todoDataListCopy.length !== 0) {
    let weekLayer = 0;
    // 막대바 1층을 다 그리고 나서 다시 그 다음층부터 그려야 한다. 그래서 기준점 날짜를 변경한다. ( 1950년 전에 일정은 없을테니까 초기화 기준)
    standardEndDate = "1950-01-01";
    let removeIndex = [];
    // 4. 일정을 반복하면서 todoBar 1층부터 그려주는 것을 확인하고 점차 2층,3층으로 올라감
    todoDataListCopy.map((i, index) => {
      // 5. 보이지는 달력과 상관없는 일정은 제외한다.
      if (
        i.endDate.substring(0, 10) > dateTypeToString4Y2M2D(calendarWeekStartDateList[0]) &&
        i.startDate.substring(0, 10) <
          dateTypeToString4Y2M2D(
            new Date(calendarWeekStartDateList[calendarWeekStartDateList.length - 1].getTime() + 6 * 24 * 3600 * 1000)
          )
      ) {
        if (standardEndDate < i.startDate.substring(0, 10)) {
          let lastDayOfMonth = dateTypeToString4Y2M2D(
            new Date(calendarWeekStartDateList[calendarWeekStartDateList.length - 1].getTime() + 6 * 24 * 3600 * 1000)
          );
          let firstDayOfMonth = dateTypeToString4Y2M2D(new Date(calendarWeekStartDateList[0].getTime()));
          let todoStartDate = new Date(
            i.startDate.substring(0, 10) < firstDayOfMonth ? firstDayOfMonth : i.startDate.substring(0, 10)
          );
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
              // 현재 줄에 들어가야할 블록의 갯수
              let numberOfExtraBlocks = todoInterval;
              let blocksNumberOfCurrentLine =
                todoStartDateIndex + todoInterval > 7 ? 7 - todoStartDateIndex : todoInterval;
              while (blocksNumberOfCurrentLine > 0) {
                let weekStartDateToString = dateTypeToString4Y2M2D(
                  new Date(calendarWeekStartDateList[weekLayer].getTime() + todoStartDateIndex * 24 * 3600 * 1000)
                );
                let dayContainerElement = document.getElementById(weekStartDateToString);
                let todoBarElement = document.createElement("div");
                todoBarElement.setAttribute("class", "todoBar");
                todoBarElement.setAttribute("data-id", i.id);
                let padding = 4;
                if ((numberOfExtraBlocks -= blocksNumberOfCurrentLine <= 0) && numberOfExtraBlocks < 7) {
                  todoBarElement.style.width =
                    "calc(" + 100 * blocksNumberOfCurrentLine + "% - " + (padding * 2 + 3) + "px)";
                } else {
                  todoBarElement.style.width = "calc(" + 100 * blocksNumberOfCurrentLine + "% - " + 6 + "px)";
                }

                todoBarElement.style.gridRowStart = barLayer;
                todoBarElement.style.paddingLeft = "4px";
                todoBarElement.style.marginLeft = "1px";
                if (i.isExist === false) {
                  todoBarElement.style.backgroundColor = i.backgroundColor.substring(0, 7) + "44";
                } else {
                  todoBarElement.style.backgroundColor = i.backgroundColor.substring(0, 7);
                }
                todoBarElement.innerText = i.title;
                todoBarElement.addEventListener("click", (e) => {
                  e.stopPropagation();
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
                dayContainerElement.append(todoBarElement);

                let gridTemplateRowsStyle = document.getElementsByClassName("week_" + weekLayer);
                for (let k = 0; k < gridTemplateRowsStyle.length; k++) {
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
              // 한 층의 막대바를 그리고 그 다음 막대바를 같은 층에 잇기 위해서 기준점으로 사용하는 것이다. ===(기준점) ====(다음막대는 기준점 옆으로)
              standardEndDate =
                i.endDate.substring(0, 10) < lastDayOfMonth ? i.endDate.substring(0, 10) : lastDayOfMonth;
              removeIndex.unshift(index);
              break;
            }
          }
        }
      } else {
        // 5. 보이지는 달력과 상관없는 일정은 제외한다. => 제외된 일정들을 배열에 모아서 한번에 제거
        removeIndex.unshift(index);
      }
    });
    // let temp = document.getElementsByClassName("dayContainer");
    // for (let i = 0; i < temp.length; i++) {
    //   temp[i].style.gridTemplateRows = "repeat(" + barLayer + ", 1fr)";
    // }
    barLayer += 1;
    removeIndex.map((k) => {
      todoDataListCopy.splice(k, 1);
    });
  }
};

export default showTodoBarOnCalendar;
