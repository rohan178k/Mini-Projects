// JS for gamemode option buttons and end game button
let localModeBtn = document.querySelector(".local-option");
let localModeHead = document.querySelector(".local-mode-head");
let compModeBtn = document.querySelector(".comp-option");
let compModeHead = document.querySelector(".comp-mode-head");
let tossBox = document.querySelector(".toss-div");
let tossBtn = document.querySelector(".toss-btn");
let endGameBtn = document.querySelector(".end-option");
let gameModeTitle = document.querySelector(".gamemode-title");
let resultBox = document.querySelector(".gamemode-option-div");
let localWinP1 = document.querySelector(".local-p1-win");
let localWinP2 = document.querySelector(".local-p2-win");
let compWin = document.querySelector(".comp-win");
let compLose = document.querySelector(".comp-lose");
let tieHead = document.querySelector(".tie");
let localGameArena = document.querySelector(".local-main-container");
let compGameArena = document.querySelector(".comp-main-container");

// functions to add/remove "hide" as class that sets display to none
function addHide(item) {
  if (!item.classList.contains("hide")) {
    item.classList.add("hide");
  }
}
function removeHide(item) {
  if (item.classList.contains("hide")) {
    item.classList.remove("hide");
  }
}

// Adding events for respective btns

localModeBtn.addEventListener("click", () => {
  modeSelection();
  gameModeTitle.innerText = "Gamemode : Local 1v1";
  removeHide(localModeHead);
  removeHide(localGameArena);
});

compModeBtn.addEventListener("click", () => {
  modeSelection();
  gameModeTitle.innerText = "Gamemode : v/s Computer";
  removeHide(tossBox);
});

endGameBtn.addEventListener("click", () => {
  gameModeTitle.innerText = "Select The Game Mode :";
  removeHide(localModeBtn);
  removeHide(compModeBtn);
  addHide(endGameBtn);
  localReset();
  compReset();
  if (resultBox.classList.contains("result-box")) {
    resultBox.classList.remove("result-box");
    endGameBtn.classList.remove("green-btn");
    endGameBtn.innerText = "Restart";
    addHide(localWinP1);
    addHide(localWinP2);
    addHide(compWin);
    addHide(compLose);
    addHide(tieHead);
  }
});

// Creating function to hide/show btns after selecting gamemode
function modeSelection() {
  addHide(localModeBtn);
  addHide(compModeBtn);
  removeHide(endGameBtn);
}

// Creating Game Reset functions

// Local gamemode reset
function localReset() {
  addHide(localModeHead);
  addHide(localGameArena);
  blueIds = [];
  redIds = [];
  for (container of localContainers) {
    container.classList.remove("p1-marked-container");
    container.classList.remove("p2-marked-container");
  }
  localPlayerTurn = "p1";
  playerTurn();
}

// Computer gamemode reset
function compReset() {
  addHide(tossBox);
  addHide(compModeHead);
  addHide(compGameArena);
  for (container of compContainers) {
    container.classList.remove("player-marked-container");
    container.classList.remove("computer-marked-container");
  }
  unmarked = [
    "22000020",
    "20020000",
    "20000202",
    "02200000",
    "00220022",
    "00200200",
    "02002002",
    "00022000",
    "00002220",
  ];
  playerMarked = [];
  computerMarked = [];
  playerCountArr = [0, 0, 0, 0, 0, 0, 0, 0];
  computerCountArr = [0, 0, 0, 0, 0, 0, 0, 0];
}

// function to create blinking effect on game arena and others
function blink(blinkItem, gap, duration) {
  let id = setInterval(() => {
    blinkItem.classList.toggle("blink");
  }, gap);
  setTimeout(() => {
    clearInterval(id);
  }, duration);
}

// Local Gamemode

// Creating function to check and callout result
let blueIds = [];
let redIds = [];

function checkLocalResult(colorArr) {
  // Checking if there is a tie between players
  if (blueIds.length + redIds.length == 9) {
    blink(localGameArena, 150, 900);
    setTimeout(() => {
      showLocalResult(tieHead);
    }, 1200);
  } else {
    // Creating new array to tally the count
    const localCounts = new Array(8).fill(0);

    // Count the occurrences of '1' at each index of each id
    for (let i = 0; i < colorArr.length; i++) {
      for (let j = 0; j < 8; j++) {
        if (colorArr[i][j] == "1") {
          localCounts[j]++;
        }
      }
    }
    // Check if any index has a count of 3 or more '1's
    return localCounts.some((count) => count >= 3);
  }
}

// Creating function to show local gamemode results after callout
function showLocalResult(result) {
  addHide(localModeHead);
  localPlayerTurn = "";
  resultBox.classList.add("result-box");
  endGameBtn.classList.add("green-btn");
  endGameBtn.innerText = "Play Again";
  removeHide(result);
}

// Logic for adding respective marks of players
// according to their interchanging turns
let localPlayerTurn = "p1";
let p1Li = document.querySelector(".p1-li");
let p2Li = document.querySelector(".p2-li");

function playerTurn() {
  if (localPlayerTurn == "p1") {
    p1Li.classList.add("p1-turn");
    p2Li.classList.remove("p2-turn");
  } else if (localPlayerTurn == "p2") {
    p1Li.classList.remove("p1-turn");
    p2Li.classList.add("p2-turn");
  }
}

// Adding event listener on local containers
// for adding respective player's marks
// when unmarked containers are clicked
let localContainers = document.querySelectorAll(".local-container");
for (container of localContainers) {
  container.addEventListener("click", function (event) {
    let clickedContainer = event.target;
    if (
      localPlayerTurn == "p1" &&
      !clickedContainer.classList.contains("p1-marked-container") &&
      !clickedContainer.classList.contains("p2-marked-container")
    ) {
      // Adding class to add O mark in the container
      // Also it cant be marked again
      clickedContainer.classList.add("p1-marked-container");

      // Storing the clicked container id in blueIds array
      let blueId = clickedContainer.getAttribute("id");
      blueIds.push(blueId);

      // Checking for player 1's victory
      if (checkLocalResult(blueIds)) {
        // Showing result
        blink(localGameArena, 150, 900);
        setTimeout(() => {
          showLocalResult(localWinP1);
        }, 1200);
      } else {
        // Changing the player's turn
        localPlayerTurn = "p2";
        playerTurn();
      }
    } else if (
      localPlayerTurn == "p2" &&
      !clickedContainer.classList.contains("p1-marked-container") &&
      !clickedContainer.classList.contains("p2-marked-container")
    ) {
      // Adding class to add mark X in the container
      // Also it cant be marked again
      clickedContainer.classList.add("p2-marked-container");

      // Storing the clicked container id in redIds array
      let redId = clickedContainer.getAttribute("id");
      redIds.push(redId);

      // Checking for player 2's victory
      if (checkLocalResult(redIds)) {
        // showing result
        blink(localGameArena, 150, 900);
        setTimeout(() => {
          showLocalResult(localWinP2);
        }, 1200);
      } else {
        // Changing player's turn
        localPlayerTurn = "p1";
        playerTurn();
      }
    }
  });
}

// Computer Gamemode

// Creating required elements/ arrays
let compTurn = "";
let unmarked = [
  "22000020",
  "20020000",
  "20000202",
  "02200000",
  "00220022",
  "00200200",
  "02002002",
  "00022000",
  "00002220",
];
let playerMarked = [];
let computerMarked = [];
let playerCountArr = [0, 0, 0, 0, 0, 0, 0, 0];
let computerCountArr = [0, 0, 0, 0, 0, 0, 0, 0];

// Creating functions to check and show result
function checkCompResult(check, countArr) {
  let compCounts = new Array(8).fill(0);
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < check.length; j++) {
      if (check[j][i] == "2") {
        compCounts[i]++;
      }
    }
  }
  if (countArr == "player") {
    playerCountArr = [...compCounts];
  } else if (countArr == "computer") {
    computerCountArr = [...compCounts];
  }
  return compCounts.some((element) => element >= 3);
}

function showCompResult(result) {
  compTurn = "";
  blink(compGameArena, 150, 900);
  setTimeout(() => {
    removeHide(result);
    addHide(compModeHead);
    resultBox.classList.add("result-box");
    endGameBtn.classList.add("green-btn");
    endGameBtn.innerText = "Play Again";
  }, 1200);
}

// Creating toss to decide first turn in comp mode
let tossHead = document.querySelector(".toss-head");
let tossResult = "";

function toss() {
  let randNum = Math.floor(Math.random() * 2);
  return randNum;
}

function tossOver() {
  addHide(tossBox);
  removeHide(tossBtn);
  removeHide(compModeHead);
  removeHide(compGameArena);
  removeHide(endGameBtn);
  tossHead.innerText = "Decide who plays first";
  tossHead.classList.remove("comp-toss-win");
  tossHead.classList.remove("comp-toss-lose");
  if (compTurn == "computer") {
    computerPlays();
  }
}

tossBtn.addEventListener("click", () => {
  addHide(tossBtn);
  addHide(endGameBtn);
  tossResult = toss();
  if (tossResult == 0) {
    tossHead.classList.add("comp-toss-win");
    tossHead.innerText = "You Play First!";
    compTurn = "player";
  } else {
    tossHead.classList.add("comp-toss-lose");
    tossHead.innerText = "Computer Plays First!";
    compTurn = "computer";
  }
  blink(tossHead, 150, 900);
  setTimeout(tossOver, 1800);
});

// Computer gamemode - Player's turn

let compContainers = document.querySelectorAll(".comp-container");
for (container of compContainers) {
  container.addEventListener("click", (event) => {
    let chosenContainer = event.target;
    let containerId = chosenContainer.getAttribute("id");
    let idx = unmarked.indexOf(containerId);
    // Adding O mark only if container is unmarked and compTurn = player
    if (idx != -1 && compTurn == "player") {
      chosenContainer.classList.add("player-marked-container");
      playerMarked.push(unmarked[idx]);
      unmarked.splice(idx, 1);
      if (checkCompResult(playerMarked, "player")) {
        showCompResult(compWin);
      } else if (unmarked.length == 0) {
        showCompResult(tieHead);
      } else {
        compTurn = "computer";
        computerPlays();
      }
    }
  });
}

// Computer gamemode - Computer's turn

// Creating function to add X mark to container
function addXmark(box) {
  let id = setInterval(() => {
    box.classList.toggle("computer-marked-container");
  }, 150);
  setTimeout(() => {
    clearInterval(id);
  }, 750);
}

function computerPlays() {
  // Creating logic to  respond according to current game situation

  // First- checking if computer is winning in current turn and respond
  if (computerMarked.length != 0 && compTurn == "computer") {
    for (let j = 0; j < 8; j++) {
      if (
        computerCountArr[j] == 2 &&
        unmarked.some((element) => element[j] == "2")
      ) {
        let availableIds = unmarked.filter((element) => element[j] == "2");
        let randomIdx = Math.floor(Math.random() * availableIds.length);
        let boxId = availableIds[randomIdx];
        let box = document.getElementById(boxId);
        let unmarkedIdx = unmarked.indexOf(boxId);
        computerMarked.push(boxId);
        unmarked.splice(unmarkedIdx, 1);
        compTurn = "player";
        addXmark(box);
        break;
      }
    }
  }

  // Second- checking if player is winning on next turn and respond
  for (let i = 0; i < 8; i++) {
    if (
      playerCountArr[i] == 2 &&
      unmarked.some((element) => element[i] == "2") &&
      compTurn == "computer"
    ) {
      let availableIds = unmarked.filter((element) => element[i] == "2");
      let randomIdx = Math.floor(Math.random() * availableIds.length);
      let boxId = availableIds[randomIdx];
      let box = document.getElementById(boxId);
      let unmarkedIdx = unmarked.indexOf(boxId);
      computerMarked.push(boxId);
      unmarked.splice(unmarkedIdx, 1);
      compTurn = "player";
      addXmark(box);
      break;
    }
  }

  // Third- random selection after 1st turn
  if (computerMarked.length != 0 && compTurn == "computer") {
    for (let l = 0; l < computerMarked.length; l++) {
      for (let m = 0; m < 8; m++) {
        let markedIdx = computerMarked[l][m];
        if (markedIdx == "2" && unmarked.some((element) => element[m] == "2")) {
          let availableIds = unmarked.filter((element) => element[m] == "2");
          let randomIdx = Math.floor(Math.random() * availableIds.length);
          let newMarkId = availableIds[randomIdx];
          let newMark = document.getElementById(newMarkId);
          let unmarkedIdx = unmarked.indexOf(newMarkId);
          computerMarked.push(newMarkId);
          unmarked.splice(unmarkedIdx, 1);
          compTurn = "player";
          addXmark(newMark);
          break;
        }
      }
      if (compTurn == "player") {
        break;
      }
    }
  }

  // Fourth- random selection for 1st turn
  if (computerMarked.length == 0 && compTurn == "computer") {
    let randomIdx = Math.floor(Math.random() * unmarked.length);
    let randomBoxId = unmarked[randomIdx];
    let randomBox = document.getElementById(randomBoxId);
    computerMarked.push(randomBoxId);
    unmarked.splice(randomIdx, 1);
    compTurn = "player";
    addXmark(randomBox);
  }

  // Checking results if computer wins after the turn
  if (checkCompResult(computerMarked, "computer")) {
    setTimeout(() => {
      showCompResult(compLose);
    }, 900);
  } else if (unmarked.length == 0) {
    setTimeout(() => {
      showCompResult(tieHead);
    }, 900);
  }
}
