const startBtn = document.getElementById("start-btn");
const homeScreen = document.getElementById("home");
const gameScreen = document.getElementById("game");
const gameBoard = document.getElementById("game-board");
const timerDisplay = document.getElementById("timer");
const gameOverScreen = document.getElementById("game-over");
const gameClearScreen = document.getElementById("game-clear");

const correctImageSrc = "assets/角下あり.png";
const wrongImageSrc = "assets/角下なし.png";

let round = 0;
let timer;
let timeLeft;
let score = 0;
const startTime = 60;
const bonusTime = 5;

startBtn.addEventListener("click", startGame);

function startGame() {
  homeScreen.classList.add("hidden");
  gameOverScreen.classList.add("hidden");
  gameClearScreen.classList.add("hidden");
  gameScreen.classList.remove("hidden");
  round = 0;
  score = 0;
  timeLeft = startTime;
  startRound();
  startTimer();
}

function startRound() {
  gameBoard.innerHTML = "";

  const rows = 9;
  const cols = 8;
  const total = rows * cols;

  gameBoard.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
  gameBoard.style.maxHeight = "100vh";
  gameBoard.style.overflow = "hidden";

  const indices = Array.from({ length: total }, (_, i) => i);
  const correctIndex = indices.splice(Math.floor(Math.random() * indices.length), 1)[0];

  for (let i = 0; i < total; i++) {
    const img = document.createElement("img");
    img.src = i === correctIndex ? correctImageSrc : wrongImageSrc;
    img.alt = "角";
    img.style.width = "60%";
    img.style.height = "auto";
    img.style.aspectRatio = "1 / 1";
    img.onclick = () => {
      // 一時的に全画像を非表示
      const allImages = document.querySelectorAll('#game-board img');
      allImages.forEach(img => img.style.visibility = 'hidden');

      setTimeout(() => {
        allImages.forEach(img => img.style.visibility = 'visible');

        if (i === correctIndex) {
          score++;
          timeLeft += bonusTime;
          startRound();
        } else {
          gameOver();
        }
      }, 20); // 0.02秒
    };

    const wrapper = document.createElement("div");
    wrapper.style.display = "flex";
    wrapper.style.justifyContent = "center";
    wrapper.style.alignItems = "center";
    wrapper.appendChild(img);
    gameBoard.appendChild(wrapper);
  }
}

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft -= 0.1;
    if (timeLeft <= 0) {
      timeLeft = 0;
      clearInterval(timer);
      gameOver();
    }
    updateTimerDisplay();
  }, 100);
}

function updateTimerDisplay() {
  timerDisplay.textContent = timeLeft.toFixed(1) + " s";
  timerDisplay.style.position = "fixed";
  timerDisplay.style.top = "50%";
  timerDisplay.style.left = "50%";
  timerDisplay.style.transform = "translate(-50%, -50%)";
  timerDisplay.style.zIndex = "0";
  timerDisplay.style.color = "#ccc";
  timerDisplay.style.fontSize = `${Math.min(window.innerWidth, window.innerHeight) / 5}px`;
  timerDisplay.style.pointerEvents = "none";
}

function gameOver() {
  gameScreen.classList.add("hidden");
  gameOverScreen.classList.remove("hidden");
  gameOverScreen.innerHTML = `
    <div class="center">
      <h1>GAME OVER</h1>
      <p>正解数：${score} 回</p>
      <button onclick="restartGame()">もう一度プレイ</button>
    </div>
  `;
}

function showGameClear() {
  gameScreen.classList.add("hidden");
  gameClearScreen.classList.remove("hidden");
}

function restartGame() {
  homeScreen.classList.remove("hidden");
  gameOverScreen.classList.add("hidden");
  gameClearScreen.classList.add("hidden");
}

// Group 2.png DVD風アニメーション（画面内のみ）
window.addEventListener('DOMContentLoaded', () => {
  const deco = document.getElementById('floating-deco');
  if (!deco) return;

  const container = document.body;

  function startFloating() {
    const decoRect = deco.getBoundingClientRect();
    const decoWidth = decoRect.width;
    const decoHeight = decoRect.height;

    const maxX = window.innerWidth - decoWidth;
    const maxY = window.innerHeight - decoHeight;

    let x = Math.random() * maxX;
    let y = Math.random() * maxY;
    let vx = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);
    let vy = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);

    function move() {
      x += vx;
      y += vy;

      if (x <= 0 || x >= maxX) vx *= -1;
      if (y <= 0 || y >= maxY) vy *= -1;

      deco.style.left = x + 'px';
      deco.style.top = y + 'px';

      requestAnimationFrame(move);
    }

    deco.style.position = 'absolute';
    move();
  }

  if (deco.complete) {
    startFloating();
  } else {
    deco.onload = startFloating;
  }
});

// const startBtn = document.getElementById("start-btn");
// const homeScreen = document.getElementById("home");
// const gameScreen = document.getElementById("game");
// const gameBoard = document.getElementById("game-board");
// const timerDisplay = document.getElementById("timer");
// const gameOverScreen = document.getElementById("game-over");
// const gameClearScreen = document.getElementById("game-clear");

// const correctImageSrc = "assets/角下あり.png";
// const wrongImageSrc = "assets/角下なし.png";

// let round = 0;
// let timer;
// let timeLeft;
// let score = 0;
// const startTime = 60;
// const bonusTime = 5;

// startBtn.addEventListener("click", startGame);

// function startGame() {
//   homeScreen.classList.add("hidden");
//   gameOverScreen.classList.add("hidden");
//   gameClearScreen.classList.add("hidden");
//   gameScreen.classList.remove("hidden");
//   round = 0;
//   score = 0;
//   timeLeft = startTime;
//   startRound();
//   startTimer();
// }

// let currentCorrectIndex = null;

// function startRound() {
//   gameBoard.innerHTML = "";

//   const rows = 9;
//   const cols = 8;
//   const total = rows * cols;

//   gameBoard.style.gridTemplateColumns = `repeat(${cols}, minmax(0, 1fr))`;
//   gameBoard.style.maxHeight = "100vh";
//   gameBoard.style.overflow = "hidden";

//   const indices = Array.from({ length: total }, (_, i) => i);
//   currentCorrectIndex = indices.splice(Math.floor(Math.random() * indices.length), 1)[0];
//   const correctIndex = currentCorrectIndex;

//   for (let i = 0; i < total; i++) {
//     const img = document.createElement("img");
//     img.src = i === correctIndex ? correctImageSrc : wrongImageSrc;
//     img.alt = "角";
//     img.style.width = "40%";
//     img.style.height = "auto";
//     img.style.aspectRatio = "1 / 1";
//     img.onclick = () => {
//       // 一時的に全画像を非表示
//       const allImages = document.querySelectorAll('#game-board img');
//       allImages.forEach(img => img.style.visibility = 'hidden');

//       setTimeout(() => {
//         allImages.forEach(img => img.style.visibility = 'visible');

//         if (i === correctIndex) {
//           score++;
//           timeLeft += bonusTime;
//           startRound();
//         } else {
//           // 正解位置を強調表示
//           const gameImages = document.querySelectorAll('#game-board img');
//           if (gameImages[currentCorrectIndex]) {
//   for (let j = 0; j < gameImages.length; j++) {
//     gameImages[j].src = j === currentCorrectIndex ? "assets/角下あり_正解.png" : wrongImageSrc;
//   }
// }

//           // 2秒後にゲームオーバー
//           setTimeout(() => {
//             gameOver();
//           }, 2000);
//         }
//       }, 20); // 0.02秒
//     };

//     const wrapper = document.createElement("div");
//     wrapper.style.display = "flex";
//     wrapper.style.justifyContent = "center";
//     wrapper.style.alignItems = "center";
//     wrapper.appendChild(img);
//     gameBoard.appendChild(wrapper);
//   }
// }

// function startTimer() {
//   clearInterval(timer);
//   timer = setInterval(() => {
//     timeLeft -= 0.1;
//     if (timeLeft <= 0) {
//       timeLeft = 0;
//       clearInterval(timer);
//       gameOver();
//     }
//     updateTimerDisplay();
//   }, 100);
// }

// function updateTimerDisplay() {
//   timerDisplay.textContent = timeLeft.toFixed(1) + " s";
//   timerDisplay.style.position = "fixed";
//   timerDisplay.style.top = "50%";
//   timerDisplay.style.left = "50%";
//   timerDisplay.style.transform = "translate(-50%, -50%)";
//   timerDisplay.style.zIndex = "0";
//   timerDisplay.style.color = "#ccc";
//   timerDisplay.style.fontSize = `${Math.min(window.innerWidth, window.innerHeight) / 5}px`;
//   timerDisplay.style.pointerEvents = "none";
// }

// function gameOver() {
//   gameScreen.classList.add("hidden");
//   gameOverScreen.classList.remove("hidden");
//   gameOverScreen.innerHTML = `
//     <div class="center">
//       <h1>GAME OVER</h1>
//       <p>正解数：${score} 回</p>
//       <button onclick="restartGame()">もう一度プレイ</button>
//     </div>
//   `;
// }

// function showGameClear() {
//   gameScreen.classList.add("hidden");
//   gameClearScreen.classList.remove("hidden");
// }

// function restartGame() {
//   homeScreen.classList.remove("hidden");
//   gameOverScreen.classList.add("hidden");
//   gameClearScreen.classList.add("hidden");
// }

// // Group 2.png DVD風アニメーション（画面内のみ）
// window.addEventListener('DOMContentLoaded', () => {
//   const deco = document.getElementById('floating-deco');
//   if (!deco) return;

//   const container = document.body;

//   function startFloating() {
//     const decoRect = deco.getBoundingClientRect();
//     const decoWidth = decoRect.width;
//     const decoHeight = decoRect.height;

//     const maxX = window.innerWidth - decoWidth;
//     const maxY = window.innerHeight - decoHeight;

//     let x = Math.random() * maxX;
//     let y = Math.random() * maxY;
//     let vx = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);
//     let vy = (Math.random() * 2 + 1) * (Math.random() < 0.5 ? 1 : -1);

//     function move() {
//       x += vx;
//       y += vy;

//       if (x <= 0 || x >= maxX) vx *= -1;
//       if (y <= 0 || y >= maxY) vy *= -1;

//       deco.style.left = x + 'px';
//       deco.style.top = y + 'px';

//       requestAnimationFrame(move);
//     }

//     deco.style.position = 'absolute';
//     move();
//   }

//   if (deco.complete) {
//     startFloating();
//   } else {
//     deco.onload = startFloating;
//   }
// });
