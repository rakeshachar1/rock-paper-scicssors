const buttons = Array.from(document.getElementsByClassName("selectable"));
const user_results = document.querySelector("#user-results");
const ai_results = document.querySelector("#ai-results");
const won_text = document.querySelector("#won-text");
const the_game = document.querySelector(".gameCont");
const display_results = document.querySelector(".winner-container");
const player_score_display = document.querySelector("#player-score");
const ai_score_display = document.querySelector("#ai-score");
const reset_game = document.querySelector("#reset");
const next_button = document.querySelector("#next");
const hurray_container = document.querySelector(".hurray-container");
const play_again_button = document.querySelector("#play-again");
const remhead = document.querySelector(".heading-container");
const ruleBox = document.querySelector(".ruleBox");
const closeButton = document.querySelector(".close");
const toggleButton = document.querySelector("#c21");

const WINNER_COMBO = [
  { selected: "rock", beats: "scissors", icon: "👊" },
  { selected: "paper", beats: "rock", icon: "👋" },
  { selected: "scissors", beats: "paper", icon: "✌" },
];

let PLAYER_SCORE = localStorage.getItem("playerScore")
  ? parseInt(localStorage.getItem("playerScore"))
  : 0;
let AI_SCORE = localStorage.getItem("aiScore")
  ? parseInt(localStorage.getItem("aiScore"))
  : 0;

player_score_display.textContent = PLAYER_SCORE;
ai_score_display.textContent = AI_SCORE;

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const userChoice = WINNER_COMBO.find((item) => item.selected === button.id);
    calculateWinner(userChoice, ai_selected());
  });
});

function ai_selected() {
  const randomIndex = Math.floor(Math.random() * WINNER_COMBO.length);
  return WINNER_COMBO[randomIndex];
}

function hidePropertiesForZeroEndIds() {
  const idsZero = ["out0", "mid0", "in0"];

  idsZero.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.boxShadow = "none";
      element.style.borderRadius = "0";
    }
  });
}

function hidePropertiesForOneEndIds() {
  const idsOne = ["out1", "mid1", "in1"];

  idsOne.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.boxShadow = "none";
      element.style.borderRadius = "0";
    }
  });
}
let originalStyles = {};
function originalPropertiesForZeroEndIds() {
  const idsZero = ["out0", "mid0", "in0"];

  idsZero.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      originalStyles[id] = {
        boxShadow:
          element.style.boxShadow || window.getComputedStyle(element).boxShadow,
        borderRadius:
          element.style.borderRadius ||
          window.getComputedStyle(element).borderRadius,
      };
    }
  });
}
function originalPropertiesForOneEndIds() {
  const idsOne = ["out1", "mid1", "in1"];

  idsOne.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      originalStyles[id] = {
        boxShadow:
          element.style.boxShadow || window.getComputedStyle(element).boxShadow,
        borderRadius:
          element.style.borderRadius ||
          window.getComputedStyle(element).borderRadius,
      };
    }
  });
}
function restoreOriginalStyles() {
  Object.keys(originalStyles).forEach((id) => {
    const element = document.getElementById(id);
    if (element && originalStyles[id]) {
      element.style.boxShadow = originalStyles[id].boxShadow;
      element.style.borderRadius = originalStyles[id].borderRadius;
    }
  });
}

document
  .getElementById("reset")
  .addEventListener("click", restoreOriginalStyles);

function calculateWinner(user, ai) {
  if (user.beats === ai.selected) {
    PLAYER_SCORE++;
    localStorage.setItem("playerScore", PLAYER_SCORE);
    player_score_display.textContent = PLAYER_SCORE;
    updateUI(user, "You Win!", ai);
    if (PLAYER_SCORE > 15) {
      next_button.classList.remove("hide");
    }
    hidePropertiesForOneEndIds();
    originalPropertiesForZeroEndIds();
  } else if (user.selected === ai.selected) {
    updateUI(user, "Draw", ai);
    next_button.classList.add("hide");
    hidePropertiesForZeroEndIds();
    hidePropertiesForOneEndIds();
  } else {
    AI_SCORE++;
    localStorage.setItem("aiScore", AI_SCORE);
    ai_score_display.textContent = AI_SCORE;
    updateUI(user, "You Lose!", ai);
    next_button.classList.add("hide");
    hidePropertiesForZeroEndIds();
    originalPropertiesForOneEndIds();
  }
}

function updateUI(user, outcome_text, ai) {
  user_results.innerHTML = user.icon;
  user_results.className = "selectable ${user.selected}";

  ai_results.innerHTML = ai.icon;
  ai_results.className = "selectable ${ai.selected}";
  won_text.textContent = outcome_text;
  the_game.classList.add("hide");
  display_results.classList.remove("hide");
}

reset_game.addEventListener("click", () => {
  resetRound();
  display_results.classList.add("hide");
  the_game.classList.remove("hide");
});

next_button.addEventListener("click", () => {
  remhead.classList.add("hide");

  display_results.classList.add("hide");
  hurray_container.classList.remove("hide");
});

play_again_button.addEventListener("click", () => {
  resetGame();
  hurray_container.classList.add("hide");
  the_game.classList.remove("hide");
  remhead.classList.remove("hide");
});

function openRuleBox() {
  if (ruleBox.classList.contains("hidden")) {
    ruleBox.classList.remove("hidden");
    ruleBox.classList.add("open");
  }
}

function hideRuleBox() {
  ruleBox.classList.remove("open");
  ruleBox.classList.add("hidden");
}

toggleButton.addEventListener("click", openRuleBox);
closeButton.addEventListener("click", hideRuleBox);

function resetRound() {
  user_results.className = "selectable";
  ai_results.className = "selectable";
  won_text.textContent = "";
}

function resetGame() {
  PLAYER_SCORE = 0;
  AI_SCORE = 0;
  localStorage.setItem("playerScore", PLAYER_SCORE);
  localStorage.setItem("aiScore", AI_SCORE);
  player_score_display.textContent = PLAYER_SCORE;
  ai_score_display.textContent = AI_SCORE;
  resetRound();
  next_button.classList.add("hide");
}
