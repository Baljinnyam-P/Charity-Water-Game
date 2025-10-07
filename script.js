// Impact / Panels references
const impactWells = document.getElementById('impact-wells');
const impactPercent = document.getElementById('impact-percent');
const impactRemaining = document.getElementById('impact-remaining');
const rotatingFactEl = document.getElementById('rotating-fact');
const milestoneListEl = document.getElementById('milestone-list');

const DID_YOU_KNOW = [
  'Women and girls spend 200M hours daily collecting water.',
  'Access to clean water can improve school attendance.',
  'Jerry cans typically carry about 20 liters of water.',
  'Clean water reduces waterborne diseases like cholera.',
  'Every $1 invested in water and sanitation yields up to $4 in economic returns.',
  'Safe water saves time—time that can be used for education.',
  'Groundwater supplies drinking water for about half the global population.',
  'Handwashing with clean water helps prevent illness.',
  'Clean water access empowers communities and women.',
  'Reliable water points reduce dangerous long walks.'
];
let factIndex = 0;
function rotateFact(){
  if(!rotatingFactEl) return;
  factIndex = (factIndex + 1) % DID_YOU_KNOW.length;
  rotatingFactEl.textContent = DID_YOU_KNOW[factIndex];
}
setInterval(rotateFact, 7000);
const miniQuiz = document.getElementById('mini-quiz');

miniQuiz.onclick = () => {
  if (miniGameActive) return;
  miniGameActive = true;
  startMicroQuiz();
};

function startMicroQuiz() {
  // 20+ questions, random 5 per play, +10 WC per correct
  const questions = [
    {q: "How many people lack access to clean water?", a: ["1 in 10","1 in 100","1 in 1000"], c: 0},
    {q: "Who spends 200M hours daily collecting water?", a: ["Men","Women & girls","Children"], c: 1},
    {q: "What does clean water reduce?", a: ["Disease","Traffic","Noise"], c: 0},
    {q: "What is a jerry can used for?", a: ["Carrying water","Cooking","Fishing"], c: 0},
    {q: "Which continent has the most water scarcity?", a: ["Africa","Europe","Australia"], c: 0},
    {q: "How many liters does a typical jerry can hold?", a: ["20L","2L","50L"], c: 0},
    {q: "What is the main cause of waterborne diseases?", a: ["Dirty water","Sunlight","Cold weather"], c: 0},
    {q: "What does charity: water build?", a: ["Wells","Bridges","Schools"], c: 0},
    {q: "How long can a person survive without water?", a: ["3 days","30 days","1 day"], c: 0},
    {q: "What is the color of charity: water’s main brand?", a: ["Yellow","Red","Green"], c: 0},
    {q: "What is the symbol for clean water?", a: ["Drop","Leaf","Star"], c: 0},
    {q: "What is the main benefit of clean water?", a: ["Health","Noise","Speed"], c: 0},
    {q: "What is a water table?", a: ["Underground water","A table for water","A water bottle"], c: 0},
    {q: "What is the main source of drinking water?", a: ["Groundwater","Rainwater","Seawater"], c: 0},
    {q: "What is the main reason girls miss school in some countries?", a: ["Collecting water","Playing games","Cooking"], c: 0},
    {q: "What is the main way to purify water?", a: ["Boiling","Freezing","Shaking"], c: 0},
    {q: "What is the main disease from dirty water?", a: ["Cholera","Asthma","Diabetes"], c: 0},
    {q: "What is the main use of wells?", a: ["Access water","Grow trees","Make bricks"], c: 0},
    {q: "What is the main reason for water projects?", a: ["Save lives","Make money","Grow food"], c: 0},
    {q: "What is the main color of a jerry can?", a: ["Yellow","Blue","Red"], c: 0},
    {q: "What is the main way to carry water in rural Africa?", a: ["Jerry can","Bucket","Bottle"], c: 0},
    {q: "What is the main impact of clean water?", a: ["Better health","More rain","More sun"], c: 0},
    {q: "What is the main reason for water scarcity?", a: ["Drought","Snow","Wind"], c: 0},
    {q: "What is the main way to help?", a: ["Donate","Travel","Sing"], c: 0},
    {q: "What is the main way to get water in a city?", a: ["Tap","River","Well"], c: 0},
    {q: "What is the main way to get water in a village?", a: ["Well","Tap","Lake"], c: 0},
    {q: "What is the main way to store water?", a: ["Tank","Bag","Cup"], c: 0},
    {q: "What is the main way to keep water clean?", a: ["Cover it","Shake it","Freeze it"], c: 0},
    {q: "What is the main way to use water?", a: ["Drink","Paint","Jump"], c: 0},
    {q: "What is the main way to waste water?", a: ["Leave tap on","Drink it","Share it"], c: 0}
  ];
  // Shuffle and pick 5
  let quiz = questions.slice().sort(()=>Math.random()-0.5).slice(0,5);
  let idx = 0, correct = 0;
  function showQ() {
    if (idx >= quiz.length) return endQuiz();
    const q = quiz[idx];
    showModal(`<div class='mini-game' id='quiz-modal'>
      <h2>Micro Quiz</h2>
      <div class='quiz-q'>${q.q}</div>
      <div class='quiz-a'>
        ${q.a.map((ans,i)=>`<button class='cta' onclick='window.quizAnswer(${i})'>${ans}</button>`).join('')}
      </div>
      <div id='quiz-score'>Score: ${correct}</div>
      <button class='cta' onclick='window.endMiniGame()'>Cancel</button>
    </div>`);
    window.quizAnswer = function(i) {
      if (i === q.c) correct++;
      idx++;
      showQ();
    };
  }
  window.endMiniGame = function() {
    miniGameActive = false;
    closeModal();
  };
  function endQuiz() {
    let reward = correct * 10;
    showModal(`<div class='mini-game-result'>
      <img class='icon-embossed' src='images/4.png' alt='Water Drop Icon' style='width:54px;margin-bottom:0.7rem;' />
      <h2>Quiz Over!</h2>
      <p>You got ${correct} / ${quiz.length} correct!</p>
      <p>+${reward} WC</p>
      <button class='cta' onclick='window.finishMiniGame(${reward})'>OK</button>
      <canvas id='confetti-canvas' style='position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;'></canvas>
    </div>`);
    setTimeout(runConfetti, 100);
    miniGameActive = false;
  }
  window.finishMiniGame = function(reward) {
    addWC(reward);
    closeModal();
  };
  showQ();
}


const miniWaterDrop = document.getElementById('mini-water-drop');
miniWaterDrop.onclick = () => {
  if (miniGameActive) return;
  miniGameActive = true;
  startWaterDrop();
};

// Game Reset Button
const resetBtn = document.getElementById('reset-btn');
if (resetBtn) {
  resetBtn.onclick = () => {
    if (confirm('Are you sure you want to reset your progress?')) {
      waterCoins = 0;
      wellsBuilt = 0;
      milestoneIndex = 0;
      updateProgress();
      closeModal();
    }
  };
}

function startWaterDrop() {
  // Improved: 30s, more drops, smoother, bonus for streaks, with instructions
  function showInstructions() {
    showModal(`<div class='mini-game-instructions'>
      <h2>How to Play: Water Drop</h2>
      <p>Tap the falling water drops before they reach the bottom!<br>Try to catch as many as you can in 30 seconds.<br>Build a streak for bonus points!</p>
      <button class='cta' onclick='window.startWDGame()'>Start</button>
      <button class='cta' onclick='window.endMiniGame()'>Cancel</button>
    </div>`);
    window.startWDGame = function() {
      closeModal();
      setTimeout(runGame, 100);
    };
    window.endMiniGame = function() {
      miniGameActive = false;
      closeModal();
    };
  }
  function runGame() {
    let drops = 0, caught = 0, time = 30, timeLeft = time, timer, dropTimer, streak = 0, maxStreak = 0;
    showModal(`<div class='mini-game' id='water-drop-modal' style='max-width:400px;'>
      <h2>Water Drop!</h2>
      <div id='wd-timer'>Time: ${timeLeft}s</div>
      <div id='wd-board' style='position:relative;width:320px;height:320px;background:#e0eaf1;border-radius:1.2rem;overflow:hidden;margin:1.2rem auto;'></div>
      <div id='wd-score'>Caught: 0</div>
      <div id='wd-streak'>Streak: 0</div>
      <button class='cta' onclick='window.endMiniGame()'>Quit</button>
    </div>`);
    const board = document.getElementById('wd-board');

    function spawnDrop() {
      if (drops >= 30) return;
      drops++;
      const isObstacle = Math.random() < 0.2;
      const drop = document.createElement('img');
      drop.src = isObstacle ? 'images/muddy.png' : 'images/jerrycan.png';
      drop.alt = isObstacle ? 'Muddy Drop (Obstacle)' : 'Drop';
      if (isObstacle) drop.style.filter = 'grayscale(0.7) brightness(0.7)';
      drop.style.position = 'absolute';
      drop.style.left = Math.floor(Math.random() * (320 - 44)) + 'px';
      drop.style.top = '-50px';
      drop.style.width = '44px';
      drop.style.cursor = 'pointer';
      drop.dataset.falling = '1';
      drop.onclick = function() {
        if (!drop.dataset.falling) return;
        if (isObstacle) {
          caught = Math.max(0, caught - 2);
          streak = 0;
          drop.style.filter = 'drop-shadow(0 0 8px #a0522d)';
        } else {
          caught++; streak++; maxStreak = Math.max(maxStreak, streak);
          drop.style.filter = 'drop-shadow(0 0 8px #FFC907)';
        }
        document.getElementById('wd-score').textContent = `Caught: ${caught}`;
        document.getElementById('wd-streak').textContent = `Streak: ${streak}`;
        drop.dataset.falling = '';
        setTimeout(()=> drop.remove(), 120);
      };
      board.appendChild(drop);
      const fallDuration = 1700; // ms
      const start = performance.now();
      function fallFrame(now){
        const elapsed = now - start;
        const prog = Math.min(1, elapsed / fallDuration);
        drop.style.top = (-50 + prog * 350) + 'px';
        if (prog < 1 && drop.dataset.falling) {
          requestAnimationFrame(fallFrame);
        } else if (prog >= 1 && drop.dataset.falling) {
          streak = 0;
          document.getElementById('wd-streak').textContent = `Streak: ${streak}`;
          drop.remove();
        }
      }
      requestAnimationFrame(fallFrame);
    }
    dropTimer = setInterval(spawnDrop, 1300);
    timer = setInterval(()=>{
      timeLeft--;
      document.getElementById('wd-timer').textContent = `Time: ${timeLeft}s`;
      if (timeLeft <= 0 || drops >= 30) endWaterDrop();
    }, 1000);
    window.endMiniGame = function() {
      clearInterval(timer); clearInterval(dropTimer);
      miniGameActive = false;
      closeModal();
    };
    function endWaterDrop() {
      clearInterval(timer); clearInterval(dropTimer);
      let reward = Math.min(60, caught * 2 + maxStreak * 2);
      showModal(`<div class='mini-game-result'>
        <img class='icon-embossed' src='images/jerrycan.png' alt='Jerry Can Icon' style='width:54px;margin-bottom:0.7rem;' />
        <h2>Water Drop Over!</h2>
        <p>You caught ${caught} drops!</p>
        <p>Max Streak: ${maxStreak}</p>
        <p>+${reward} WC</p>
        <button class='cta' onclick='window.finishMiniGame(${reward})'>OK</button>
        <canvas id='confetti-canvas' style='position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;'></canvas>
      </div>`);
      setTimeout(runConfetti, 100);
      miniGameActive = false;

    }
    window.finishMiniGame = function(reward) {
      addWC(reward);
      closeModal();
    };
  }
  showInstructions();
}
// --- Interactive Cans Logic ---
const canRow = document.getElementById('can-row');
if (canRow) {
  Array.from(canRow.getElementsByClassName('can-img')).forEach((can, idx) => {
    can.addEventListener('click', () => collectCan(can));
    can.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        collectCan(can);
      }
    });
  });
}
function collectCan(can) {
  if (can.classList.contains('collected')) return;
  can.classList.add('collected');
  // Animate and give points
  addWC(10);
  can.style.background = '#FFC907';
  can.style.boxShadow = '0 0 0 6px #ffe9a3';
  setTimeout(() => {
    can.classList.remove('collected');
    can.style.background = '';
    can.style.boxShadow = '';
  }, 600);
}
// Well Builder Game Logic
const WC_PER_TAP = 1;
const WELL_GOAL = 1000;
const MILESTONES = [0.25, 0.5, 0.75, 1];
const MILESTONE_FACTS = [
  "1 in 10 people lack access to clean water.",
  "Women and girls spend 200M hours daily collecting water.",
  "Clean water reduces disease and saves lives.",
  "You just built a well! That's life-changing!"
];

let waterCoins = 0;
let wellsBuilt = 0;
let milestoneIndex = 0;

// --- Persistence Keys ---
const LS_KEY = 'wellBuilderState.v1';

function saveState() {
  try {
    const state = { waterCoins, wellsBuilt, milestoneIndex };
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  } catch(e) { /* ignore quota / private mode */ }
}

function loadState() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    if (typeof data.waterCoins === 'number') waterCoins = data.waterCoins;
    if (typeof data.wellsBuilt === 'number') wellsBuilt = data.wellsBuilt;
    if (typeof data.milestoneIndex === 'number') milestoneIndex = data.milestoneIndex;
  } catch(e) { /* ignore parse errors */ }
}

function clearState() {
  try { localStorage.removeItem(LS_KEY); } catch(e){}
}

const titleScreen = document.getElementById('title-screen');
const gameScreen = document.getElementById('game-screen');
const startBtn = document.getElementById('start-btn');
const waterBtn = document.getElementById('water-btn');
const wcCount = document.getElementById('wc-count');
const progressBar = document.getElementById('progress-bar');
const progressPercent = document.getElementById('progress-percent');
const modalContainer = document.getElementById('modal-container');

// Load persisted state early
loadState();

function showScreen(screen) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  screen.classList.add('active');
}

function updateProgress() {
  let wcThisWell = waterCoins % WELL_GOAL;
  let percent = Math.min(100, Math.floor((wcThisWell / WELL_GOAL) * 100));
  wcCount.textContent = wcThisWell;
  progressBar.style.width = percent + '%';
  progressPercent.textContent = percent;
  // Panel updates
  if (impactPercent) impactPercent.textContent = percent + '%';
  if (impactWells) impactWells.textContent = wellsBuilt;
  if (impactRemaining) impactRemaining.textContent = (WELL_GOAL - wcThisWell) <= 0 ? 0 : (WELL_GOAL - wcThisWell);
  if (milestoneListEl) {
    Array.from(milestoneListEl.querySelectorAll('li')).forEach(li => {
      const m = parseInt(li.getAttribute('data-m'),10);
      const wasReached = li.classList.contains('reached');
      if (percent >= m) {
        li.classList.add('reached');
        if (!wasReached) {
          li.classList.add('just-reached');
          setTimeout(()=> li.classList.remove('just-reached'), 900);
        }
      } else {
        li.classList.remove('reached');
        li.classList.remove('just-reached');
      }
    });
  }
  // Radial progress
  const radialFg = document.querySelector('.radial-fg');
  const radialText = document.getElementById('radial-text');
  if (radialFg) {
    const circumference = 2 * Math.PI * 52;
    const offset = circumference * (1 - percent / 100);
    radialFg.style.strokeDasharray = circumference;
    radialFg.style.strokeDashoffset = offset;
  }
  if (radialText) radialText.textContent = percent + '%';
  // Next milestone line update
  const impactNext = document.getElementById('impact-next');
  if (impactNext) {
    const remainingPercMilestones = MILESTONES.map(m=> Math.round(m*100)).filter(p => p>percent);
    if (remainingPercMilestones.length === 0) {
      impactNext.textContent = 'Next milestone: Well completion reached';
    } else {
      const nextPerc = remainingPercMilestones[0];
      const targetWC = Math.floor(WELL_GOAL * (nextPerc/100));
      const remainWC = Math.max(0, targetWC - wcThisWell);
      impactNext.textContent = `Next milestone: ${nextPerc}% (${remainWC} WC to go)`;
    }
  }
  // Check for milestone
  if (milestoneIndex < MILESTONES.length) {
    let nextMilestone = Math.floor(WELL_GOAL * MILESTONES[milestoneIndex]);
    if (wcThisWell >= nextMilestone) {
      showMilestone(milestoneIndex);
      milestoneIndex++;
      saveState();
    }
  }
  // Well built
  if (wcThisWell >= WELL_GOAL) {
    showWellBuilt();
  }
  saveState();
}

function addWC(amount) {
  waterCoins += amount;
  updateProgress();
}

function showMilestone(idx) {
  // Choose icon for each milestone
  const icons = [
    "<img class='icon-embossed' src='images/jerrycan.png' alt='Jerry Can Icon' style='width:54px;margin-bottom:0.7rem;' />",
    "<img class='icon-embossed' src='images/4.png' alt='Water Drop Icon' style='width:54px;margin-bottom:0.7rem;' />",
    "<img class='icon-embossed' src='images/3.png' alt='Water Quest Icon' style='width:54px;margin-bottom:0.7rem;' />",
    "<img class='icon-embossed' src='images/1.png' alt='Well Built Icon' style='width:54px;margin-bottom:0.7rem;' />"
  ];
  showModal(`<div class='milestone-popup'>
    ${icons[idx]}
    <h2>Milestone!</h2>
    <p>${MILESTONE_FACTS[idx]}</p>
    <button class='cta' onclick='closeModal()'>OK</button>
  </div>`);
}

function showWellBuilt() {
  showModal(`<div class='well-built'>
    <h2>Well Built!</h2>
    <img class='icon-embossed' src='images/1.png' alt='Well built logo' style='width:80px;margin:1rem auto;' />
    <p>${MILESTONE_FACTS[3]}</p>
    <a href='https://www.charitywater.org/donate' target='_blank' class='cta donate'>Donate</a>
    <button class='cta' onclick='resetWell()'>Keep Playing</button>
    <canvas id='confetti-canvas' style='position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;'></canvas>
  </div>`);
  setTimeout(runConfetti, 100);
}

function showModal(html) {
  modalContainer.innerHTML = html;
  modalContainer.classList.add('active');
}
function closeModal() {
  modalContainer.classList.remove('active');
  modalContainer.innerHTML = '';
}
window.closeModal = closeModal;

function resetWell() {
  milestoneIndex = 0;
  wellsBuilt++;
  waterCoins = wellsBuilt * WELL_GOAL;
  closeModal();
  updateProgress();
  saveState();
}
window.resetWell = resetWell;

startBtn.onclick = () => {
  showScreen(gameScreen);
  updateProgress();
};
// Hook reset button to clear all state (if present) - single declaration
if (!window.__resetBound) {
  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      waterCoins = 0;
      wellsBuilt = 0;
      milestoneIndex = 0;
      clearState();
      updateProgress();
    });
  }
  window.__resetBound = true;
}
waterBtn.onclick = (e) => {
  addWC(WC_PER_TAP);
  // Ripple effect
  const ripple = waterBtn.querySelector('.ripple');
  ripple.style.width = ripple.style.height = '0px';
  ripple.style.opacity = '1';
  setTimeout(() => {
    ripple.style.width = ripple.style.height = '120px';
    ripple.style.opacity = '0';
  }, 10);
};

// --- Mini-Game Logic ---
const miniWaterQuest = document.getElementById('mini-water-quest');
let miniGameActive = false;

miniWaterQuest.onclick = () => {
  if (miniGameActive) return;
  miniGameActive = true;
  startWaterQuest();
};

function startWaterQuest() {
  // 5x5 whack-a-mole: tap 20 targets in 25s, +100 WC if all, +5 WC per hit, count misses
  function showInstructions() {
    showModal(`<div class='mini-game-instructions'>
      <h2>How to Play: Water Quest</h2>
      <p>Tap the water drop as soon as it appears!<br>Try to hit 20 drops before time runs out.<br>Be quick—misses are counted if you tap the wrong spot.</p>
      <button class='cta' onclick='window.startWQGame()'>Start</button>
      <button class='cta' onclick='window.endMiniGame()'>Cancel</button>
    </div>`);
    window.startWQGame = function() {
      closeModal();
      setTimeout(runGame, 100);
    };
    window.endMiniGame = function() {
      miniGameActive = false;
      closeModal();
    };
  }
  function runGame() {
    let hits = 0, total = 20, time = 25, missed = 0;
    let moleIdx = -1, timer, timeLeft = time;
    showModal(`<div class='mini-game' id='water-quest-modal' style='max-width:480px;'>
      <h2>Water Quest!</h2>
      <div id='wq-timer'>Time: ${timeLeft}s</div>
      <div id='wq-board' style='display:grid;grid-template-columns:repeat(5,56px);gap:12px;justify-content:center;margin:1.5rem 0;'></div>
      <div id='wq-score'>Hits: 0 / ${total}</div>
      <div id='wq-missed'>Misses: 0</div>
      <button class='cta' onclick='window.endMiniGame()'>Quit</button>
    </div>`);
    const board = document.getElementById('wq-board');
    for (let i = 0; i < 25; i++) {
      let cell = document.createElement('div');
      cell.className = 'wq-cell';
      cell.style.width = '56px';
      cell.style.height = '56px';
      cell.style.background = '#e0eaf1';
      cell.style.borderRadius = '50%';
      cell.style.display = 'flex';
      cell.style.alignItems = 'center';
      cell.style.justifyContent = 'center';
      cell.style.fontSize = '2rem';
      cell.style.cursor = 'pointer';
      cell.onclick = () => {
        if (moleIdx === i) {
          hits++;
          document.getElementById('wq-score').textContent = `Hits: ${hits} / ${total}`;
          cell.innerHTML = '';
          moleIdx = -1;
          if (hits >= total) endWaterQuest();
        } else {
          missed++;
          document.getElementById('wq-missed').textContent = `Misses: ${missed}`;
          cell.style.background = '#ffc9c9';
          setTimeout(()=>cell.style.background='#e0eaf1',200);
        }
      };
      board.appendChild(cell);
    }
    function showMole() {
      if (moleIdx >= 0) board.children[moleIdx].innerHTML = '';
      moleIdx = Math.floor(Math.random()*25);
      board.children[moleIdx].innerHTML = '<img src="images/jerrycan.png" alt="Drop" style="width:40px;">';
    }
    showMole();
    timer = setInterval(()=>{
      timeLeft--;
      document.getElementById('wq-timer').textContent = `Time: ${timeLeft}s`;
      if (moleIdx >= 0) board.children[moleIdx].innerHTML = '';
      showMole();
      if (timeLeft <= 0) endWaterQuest();
    }, 1100);
    window.endMiniGame = function() {
      clearInterval(timer);
      miniGameActive = false;
      closeModal();
    };
    function endWaterQuest() {
      clearInterval(timer);
      let reward = hits >= total ? 100 : hits * 5;
      showModal(`<div class='mini-game-result'>
        <img class='icon-embossed' src='images/3.png' alt='Water Quest Icon' style='width:54px;margin-bottom:0.7rem;' />
        <h2>Water Quest Over!</h2>
        <p>You hit ${hits} / ${total}!</p>
        <p>Misses: ${missed}</p>
        <p>+${reward} WC</p>
        <button class='cta' onclick='window.finishMiniGame(${reward})'>OK</button>
        <canvas id='confetti-canvas' style='position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;'></canvas>
      </div>`);
      setTimeout(runConfetti, 100);
      miniGameActive = false;
    }
    window.finishMiniGame = function(reward) {
      addWC(reward);
      closeModal();
    };
  }
  showInstructions();
}

function runConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  const confetti = [];
  for (let i = 0; i < 120; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      r: 6 + Math.random() * 8,
      d: 2 + Math.random() * 2,
      color: ['#FFC907','#0099c6','#fff','#222'][Math.floor(Math.random()*4)],
      tilt: Math.random() * 10 - 5
    });
  }
  let frame = 0;
  function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confetti.forEach(c => {
      ctx.beginPath();
      ctx.ellipse(c.x, c.y, c.r, c.r/2, c.tilt, 0, 2*Math.PI);
      ctx.fillStyle = c.color;
      ctx.fill();
    });
    update();
    frame++;
    if (frame < 120) requestAnimationFrame(draw);
    else setTimeout(()=>canvas.remove(), 1200);
  }
  function update() {
    confetti.forEach(c => {
      c.y += c.d + Math.random()*2;
      c.x += Math.sin(frame/10 + c.tilt);
      c.tilt += Math.random()*0.2-0.1;
    });
  }
  draw();
}

// --- Navigation / Global Actions (moved from inline) ---
(function(){
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }
  function triggerAction(action){
    if(action==='play') {
      const waterBtn = document.getElementById('water-btn');
      if (waterBtn) waterBtn.scrollIntoView({behavior:'smooth', block:'center'});
    } else if(action==='milestones') {
      if (typeof showMilestone === 'function') {
        showMilestone(Math.min(milestoneIndex, 0));
      }
    } else if(action==='how') {
      if (typeof showModal === 'function') {
        showModal(`<div class='mini-game-instructions'><h2>How It Works</h2><p>Tap the big Water Button to earn WaterCoins (WC). Reach milestones, play mini‑games for bonus WC, and build wells to learn real-world impact facts.</p><button class='cta' onclick='closeModal()'>Close</button></div>`);
      }
    }
  }
  document.querySelectorAll('[data-action]').forEach(el => {
    el.addEventListener('click', () => {
      const action = el.getAttribute('data-action');
      triggerAction(action);
      if (window.innerWidth < 720 && toggle) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded','false');
      }
    });
  });
})();
