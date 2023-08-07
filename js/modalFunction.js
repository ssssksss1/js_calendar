/**
 * @content 모달 창을 끌때 자주 사용하는 함수
 */
export let modalToggle = function modalToggle() {
  document.getElementById("modal").classList.toggle("modal");
};

/**
 * @content 모달 창을 켤때 자주 사용하는 함수
 */
export let modalOpen = function modalOpen() {
  let temp = document.getElementById("modal");
  temp.removeAttribute("class", "modal");
};

/**
 * @content 모달 페이지에서 취소나 x 버튼, 오버레이(외부에 검은화면) 클릭시 모달창을 안보이게해주는 함수
 */
export let modalCloseAddHandler = function modalCloseAddHandler() {
  let modalCloseBtn = document.getElementsByClassName("modalCloseBtn");
  for (let i = 0; i < modalCloseBtn.length; i++) {
    modalCloseBtn[i].addEventListener("click", () => {
      modalToggle();
    });
  }
};
