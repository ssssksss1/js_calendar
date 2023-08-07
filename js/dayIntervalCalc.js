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

export default dayIntervalCalc;
