let userScore = 0;
let computerScore = 0;

try {
  userScore = localStorage.getItem('userScore') ? parseInt(localStorage.getItem('userScore')) : 0;
  computerScore = localStorage.getItem('computerScore') ? parseInt(localStorage.getItem('computerScore')) : 0;
} catch (e) {
  console.error("Failed to retrieve scores from localStorage:", e);
}

try {
  document.getElementById('userScore').textContent = userScore;
  document.getElementById('computerScore').textContent = computerScore;
} catch (e) {
  console.error("Score elements not found in DOM:", e);
}


function toggleRules() {
  const box = document.getElementById("rulesBox");
  if (!box) {
    console.warn("Rules box element not found.");
    return;
  }
  box.style.display = box.style.display === "none" ? "block" : "none";
}


function goToCongrats() {
  try {
    window.location.href = "./cup_page.html";
  } catch (e) {
    console.error("Navigation failed:", e);
  }
}


function playerChoice(playerChoice) {
  const choices = ['rock', 'paper', 'scissors'];
  if (!choices.includes(playerChoice)) {
    console.warn(`Invalid player choice: ${playerChoice}`);
    return;
  }

  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  const result = determineWinner(playerChoice, computerChoice);

  const triangleContainer = document.querySelector('.triangle-container');
  const resultContainer = document.getElementById('resultContainer');

  if (!triangleContainer || !resultContainer) {
    console.error("Game containers not found in DOM.");
    return;
  }

  triangleContainer.style.display = 'none';
  resultContainer.style.display = 'block';

  if (result === 'win') userScore++;
  else if (result === 'lose') computerScore++;

  try {
    localStorage.setItem('userScore', userScore);
    localStorage.setItem('computerScore', computerScore);
  } catch (e) {
    console.warn("Failed to store scores:", e);
  }

  document.getElementById('userScore').textContent = userScore;
  document.getElementById('computerScore').textContent = computerScore;

  document.getElementById('resultTitle').textContent = `YOU ${result.toUpperCase()}`;
  document.getElementById('resultMessage').textContent = `AGAINST PC`;

  showPickedChoice('userPick', playerChoice, result === 'win');
  showPickedChoice('computerPick', computerChoice, result === 'lose');

  const nextBtn = document.getElementById('nextBtn');
  if (nextBtn && userScore > computerScore) {
    nextBtn.style.display = 'inline-block';
  }
}


function showPickedChoice(elementId, choice, isWinner = false) {
  injectRippleStyles();

  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with ID '${elementId}' not found.`);
    return;
  }

  const icon = getIconId(choice);
  if (!icon) {
    console.warn(`Invalid icon mapping for choice: ${choice}`);
    return;
  }

  element.innerHTML = `
    <div class="picked-choice ${choice}" style="position: relative;">
      <img src="../assets/${icon}" alt="${choice}">
      ${isWinner ? '<div class="circle-ripple"></div>' : ''}
    </div>
  `;
}


function getIconId(choice) {
  const icons = {
    rock: 'fist.png',
    paper: 'hand-paper.png',
    scissors: 'scissors.png'
  };
  return icons[choice] || '';
}


function determineWinner(player, computer) {
  if (!player || !computer) return 'draw';
  if (player === computer) return 'draw';
  if (
    (player === 'rock' && computer === 'scissors') ||
    (player === 'scissors' && computer === 'paper') ||
    (player === 'paper' && computer === 'rock')
  ) {
    return 'win';
  }
  return 'lose';
}


function injectRippleStyles() {
  if (document.getElementById('rippleStyles')) return;

  const rippleStyle = document.createElement('style');
  rippleStyle.id = 'rippleStyles';
  rippleStyle.innerHTML = `
    .circle-ripple {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 7rem;
      height: 7rem;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color:rgb(2, 82, 26);
      animation: ripple 0.7s linear infinite;
      z-index: -1;
    }

    @keyframes ripple {
      0% {
        box-shadow: 0 0 0 0 rgba(3, 105, 33, 0.3),
                    0 0 0 1em rgba(3, 105, 33, 0.3),
                    0 0 0 3em rgba(3, 105, 33, 0.3),
                    0 0 0 5em rgba(3, 105, 33, 0.3);
      }
      100% {
        box-shadow: 0 0 0 1em rgba(53, 255, 195, 0.3),
                    0 0 0 3em rgba(53, 255, 195, 0.3),
                    0 0 0 5em rgba(53, 255, 195, 0.3),
                    0 0 0 8em rgba(53, 255, 195, 0);
      }
    }
  `;
  document.head.appendChild(rippleStyle);
}


function resetGame() {
  const triangleContainer = document.querySelector('.triangle-container');
  const resultContainer = document.getElementById('resultContainer');

  if (triangleContainer && resultContainer) {
    triangleContainer.style.display = 'block';
    resultContainer.style.display = 'none';
  } else {
    console.warn("Unable to reset game. Some elements not found.");
  }
}
