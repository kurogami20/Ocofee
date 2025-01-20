const button = document.querySelector(".button_plus");
let count = 0;

function coffeeApear() {
  addEventListener("click", cofeeApear);
}

function cofeeApear() {
  const cofees = document.querySelectorAll(".coffee_article");

  if (count % 2 === 0) {
    count += 1;
    cofees.forEach((coffee) => {
      coffee.style.display = "block";
    });
    button.textContent = "Réduire";
    console.log("click");
  } else {
    count -= 1;
    cofees.forEach((coffee) => {
      coffee.style.display = "none";
    });
    button.textContent = "Voir plus";
    console.log("click");
  }
}

coffeeApear();
