/**
 *
 * Date 타입을 String "2000-11-11" 형식으로 바꾸어주는 함수
 * @returns "yyyy-mm-dd"
 */
let dateTypeToString4Y2M2D = function (date) {
  return (
    date.getFullYear() +
    "-" +
    (date.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    date.getDate().toString().padStart(2, "0")
  );
};

export default dateTypeToString4Y2M2D;
