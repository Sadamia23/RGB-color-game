// selecting elements

const h1El = document.querySelector("h1");
const newGameEl = document.querySelector("button");
const hardModeChilds = document.querySelectorAll(".child");
const colorGameEl = document.querySelector(".color-game");
const easyMode = document.querySelector(".easy");
const hardMode = document.querySelector(".hard");
const deleteChild = document.querySelectorAll(".delete-child");

// node list გადავაკეთე მასივად ... ამის გამოყენებით. (spread operator) და გამოვაკელი ბოლო სამი ელემენტი ამ მასივს
const easyModeChilds = [...hardModeChilds];
easyModeChilds.splice(3, 5);

// თამაში დასაწყისში არის რთულ რეჟიმზე ამიტომ თავიდანვე ავირჩიოთ ის.
let currentMode = "hard";

chooseMode(hardModeChilds);

// Generate random color

function rgb() {
  const r = Math.round(Math.random() * 255);
  const g = Math.round(Math.random() * 255);
  const b = Math.round(Math.random() * 255);

  return `rgb(${r},${g},${b})`;
}

// თითოეულ წევრს მივანიჭოთ რენდომ ფერი და ფუნქციონალი

function chooseMode(childsArr) {
  childsArr.forEach((child) => {
    // ფერი
    child.style.backgroundColor = rgb();
    child.style.opacity = "100";

    // ფუნქციონალი
    child.addEventListener("click", function () {
      if (h1El.textContent !== child.style.backgroundColor) {
        child.style.opacity = "0";
      } else {
        colorGameEl.style.backgroundColor = child.style.backgroundColor;

        newGameEl.textContent = "Play Again?";

        childsArr.forEach((div) => {
          div.style.backgroundColor = h1El.textContent;
          div.style.opacity = "100";
        });
      }
    });
  });

  const randNum = Math.floor(Math.random() * childsArr.length);
  const randColor = childsArr[randNum].style.backgroundColor;

  h1El.textContent = randColor;

  newGameEl.textContent = "New colors";

  colorGameEl.style.backgroundColor = "rgb(0, 179, 255)";
  // console.log(randNum);
}

// ყველა ღილაკს მივანიჭოთ თავისი ფუნქცია

// მარტივი რეჟიმი
easyMode.addEventListener("click", function () {
  deleteChild.forEach((child) => (child.style.display = "none"));
  chooseMode(easyModeChilds);
  currentMode = "easy";
});

// რთული რეჟიმი
hardMode.addEventListener("click", function () {
  deleteChild.forEach((child) => (child.style.display = "block"));
  chooseMode(hardModeChilds);
  currentMode = "hard";
});

// ახლიდან დაწყება
newGameEl.addEventListener("click", function () {
  if (currentMode === "hard") {
    chooseMode(hardModeChilds);
  } else {
    chooseMode(easyModeChilds);
  }
});
