const burger = document.querySelector(".menu_body");
const burger_body = document.querySelector(".burger");
let count2 = 0;

function burgerClick() {
  burger.addEventListener("click", burgerApear);
}

function burgerApear() {
  if (count2 % 2 === 0) {
    count2 += 1;
    burger_body.style.display = "block";
  } else {
    count2 -= 1;
    burger_body.style.display = "none";
  }
}

burgerClick();
