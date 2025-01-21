const burger = document.querySelector(".menu_body");
const burger_body = document.querySelector(".burger");
let count = 0;

function burgerClick() {
  burger.addEventListener("click", burgerApear);
}

function burgerApear() {
  if (count % 2 === 0) {
    count += 1;
    burger_body.style.display = "block";
  } else {
    count -= 1;
    burger_body.style.display = "none";
  }
}

burgerClick();
