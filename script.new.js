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
      <button class='cta' onclick='window.endMiniGame()'>Quit</button>
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
      <h2>Quiz Over!</h2>
      <p>You got ${correct} / ${quiz.length} correct!</p>
      <p>+${reward} WC</p>
      <button class='cta' onclick='window.finishMiniGame(${reward})'>OK</button>
    </div>`);
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

function startWaterDrop() {
  // Improved: 30s, more drops, smoother, bonus for streaks
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
    let drop = document.createElement('img');
    drop.src = 'images/4.png';
    drop.alt = 'Drop';
    drop.style.position = 'absolute';
    drop.style.left = Math.floor(Math.random()*280)+"px";
    drop.style.top = '-32px';
    drop.style.width = '36px';
    drop.style.transition = 'top 1.1s linear';
    drop.onclick = function() {
      caught++;
      streak++;
      maxStreak = Math.max(maxStreak, streak);
      document.getElementById('wd-score').textContent = `Caught: ${caught}`;
      document.getElementById('wd-streak').textContent = `Streak: ${streak}`;
      drop.style.filter = 'drop-shadow(0 0 8px #FFC907)';
      setTimeout(()=>drop.remove(), 100);
    };
    drop.addEventListener('animationend', () => drop.remove());
    board.appendChild(drop);
    setTimeout(()=>{
      drop.style.top = '300px';
      setTimeout(()=>{
        if (board.contains(drop)) {
          streak = 0;
          document.getElementById('wd-streak').textContent = `Streak: ${streak}`;
          drop.remove();
        }
      },1100);
    },10);
  }
  dropTimer = setInterval(spawnDrop, 900);
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
      <h2>Water Drop Over!</h2>
      <p>You caught ${caught} drops!</p>
      <p>Max Streak: ${maxStreak}</p>
      <p>+${reward} WC</p>
      <button class='cta' onclick='window.finishMiniGame(${reward})'>OK</button>
    </div>`);
    miniGameActive = false;
  }
  window.finishMiniGame = function(reward) {
    addWC(reward);
    closeModal();
  };
}

// ...existing code for cans, main game, and Water Quest (see previous file for full code) ...
