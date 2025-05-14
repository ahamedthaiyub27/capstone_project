
let userScore = localStorage.getItem('userScore') ? parseInt(localStorage.getItem('userScore')) : 0;
let computerScore = localStorage.getItem('computerScore') ? parseInt(localStorage.getItem('computerScore')) : 0;

document.getElementById('userScore').textContent = userScore;
document.getElementById('computerScore').textContent = computerScore;


function toggleRules() {
  const box = document.getElementById("rulesBox");
  box.style.display = box.style.display === "none" ? "block" : "none";
}


function goToCongrats() {
  window.location.href = "./cup_page.html";
}


function playerChoice(playerChoice) {
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  const result = determineWinner(playerChoice, computerChoice);

  document.querySelector('.triangle-container').style.display = 'none';
  document.getElementById('resultContainer').style.display = 'block';

  if (result === 'win') userScore++;
  else if (result === 'lose') computerScore++;

  
  localStorage.setItem('userScore', userScore);
  localStorage.setItem('computerScore', computerScore);
  document.getElementById('userScore').textContent = userScore;
  document.getElementById('computerScore').textContent = computerScore;


  document.getElementById('resultTitle').textContent = `YOU ${result.toUpperCase()}`;
  document.getElementById('resultMessage').textContent = `AGAINST PC`;

  
  showPickedChoice('userPick', playerChoice, result === 'win');
  showPickedChoice('computerPick', computerChoice, result === 'lose');

  
  if (userScore > computerScore) {
    document.getElementById('nextBtn').style.display = 'inline-block';
  }
}


function showPickedChoice(elementId, choice, isWinner = false) {
  injectRippleStyles();

  const element = document.getElementById(elementId);
  element.innerHTML = `
    <div class="picked-choice ${choice}" style="position: relative;">
      <img src="../assets/${getIconId(choice)}" alt="${choice}">
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
  return icons[choice];
}


function determineWinner(player, computer) {
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
      width: 1em;
      height: 1em;
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
  document.querySelector('.triangle-container').style.display = 'block';
  document.getElementById('resultContainer').style.display = 'none';
}
