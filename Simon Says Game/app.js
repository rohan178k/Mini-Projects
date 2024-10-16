// Creating required elements
let gameSequence = [];
let userSequence = [];
let btns = ["red", "green", "yellow", "blue"];
let gameStarted = false;
let level = 0;
let highestlvl = 0;

// Accessing required elements from doc
let startbtn = document.querySelector(".startbtn");
let description = document.querySelector(".description");
let body = document.querySelector("body");
let highscore = document.querySelector(".highscore");
let scoreList = document.querySelector(".scores");

// Accessing the sound effects from doc
let btnPressSound = document.querySelector("#btn-sound");
let wrongSound = document.querySelector("#error-sound");
let levelUpSound = document.querySelector("#levelup-sound");
let startbtnSound = document.querySelector("#click-sound");

// Creating button flash effect function
// which takes the button element as argument
// by adding and removing respective class names
// according to the button color (by checking class)
function btnFlash(flashBtn) {
  if (flashBtn.classList.contains("red")) {
    flashBtn.classList.add("red-flash");
    setTimeout(function () {
      flashBtn.classList.remove("red-flash");
    }, 350);
  } else if (flashBtn.classList.contains("green")) {
    flashBtn.classList.add("green-flash");
    setTimeout(function () {
      flashBtn.classList.remove("green-flash");
    }, 350);
  } else if (flashBtn.classList.contains("yellow")) {
    flashBtn.classList.add("yellow-flash");
    setTimeout(function () {
      flashBtn.classList.remove("yellow-flash");
    }, 350);
  } else if (flashBtn.classList.contains("blue")) {
    flashBtn.classList.add("blue-flash");
    setTimeout(function () {
      flashBtn.classList.remove("blue-flash");
    }, 350);
  }
}

// Creating levelup function that
// updates the level and description
// generates a random number from 0 to 3
// to get a color from btns array
// and accessing that respective color button element
// then calling flash function on that button element
// also adding sound effect
// then pushing the new color to the gamesequence
//and clearing the user input sequence
function levelUp() {
  level++;
  description.innerText = `Level  ${level}`;
  let randIdx = Math.floor(Math.random() * 4);
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`);
  btnFlash(randBtn);
  btnPressSound.play();
  gameSequence.push(randColor);
  userSequence = [];
}

// Creating a reset funtion that
// resets the game when ended including
// the basic game values and array sequences
// also updating description, highscore and scoreboard
function reset() {
  let score = level - 1;
  description.innerText = `Game Ended! Your Score was  ${score} !`;
  if (score > highestlvl) {
    highscore.innerHTML = `Your Highscore was <b> ${score} </b> !!`;
    highestlvl = score;
  } else if (score <= highestlvl) {
    highscore.innerHTML = `Your Highscore was <b> ${highestlvl} </b> !!`;
  }
  let newScore = document.createElement("li");
  newScore.innerText = `${score} pts`;
  scoreList.appendChild(newScore);
  startbtn.innerText = "START";
  gameStarted = false;
  level = 0;
  gameSequence = [];
  userSequence = [];
}

// adding clicking effect on start btn
// calling levelup and reset functions for start and end
startbtn.addEventListener("click", function () {
  startbtnSound.play();
  startbtn.classList.add("startbtn-click");
  setTimeout(function () {
    startbtn.classList.remove("startbtn-click");
  }, 250);
  if (gameStarted == false) {
    startbtn.innerText = "END";
    gameStarted = true;
    levelUp();
  } else if (gameStarted == true) {
    reset();
  }
});

// Creating function that checks if user input sequence is matching with the game sequence
// calling levelup when sequence is finished
// adding sound effects for btn press and levelup
// calling reset funtion and wrong screen effect when pressed wrong btn
// adding sound effect for wrong ans
function checkSeq(idx) {
  if (userSequence[idx] == gameSequence[idx]) {
    if (userSequence.length == gameSequence.length) {
      levelUpSound.play();
      setTimeout(levelUp, 1000);
    } else {
      btnPressSound.play();
    }
  } else if (userSequence[idx] != gameSequence[idx]) {
    wrongSound.play();
    body.classList.add("wrong-screen");
    setTimeout(function () {
      body.classList.remove("wrong-screen");
    }, 200);
    reset();
  }
}

// creatinng function for btn click
// adding flashing effect to btns when respective btn is clicked
// if game is started calling checkSeq function
// getting color of clicked btn by its id
// pushing the color in user input sequence
function btnPress() {
  let userBtn = this;
  btnFlash(userBtn);
  if (gameStarted == true) {
    let userColor = userBtn.getAttribute("id");
    userSequence.push(userColor);
    checkSeq(userSequence.length - 1);
  }
}

// calling btnPress function for each button when clicked
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}
