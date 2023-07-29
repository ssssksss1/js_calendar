window.onload = function () {
  let year = new Date().getFullYear();
  let month = new Date().getMonth() + 1;
  document.getElementById("year").innerText = year + "년";
  document.getElementById("month").innerText = month + "월";

  let dayContainer = document.getElementById("dayContainer");
  for (let i = 0; i < 35; i++) {
    let temp = document.createElement("button");
    temp.append((document.createElement("span").innerText = i));
    dayContainer.append(temp);
  }
};
