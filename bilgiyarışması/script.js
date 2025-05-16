const questions = [
  {
    question: "Türkiye'nin başkenti neresidir?",
    options: ["İstanbul", "Ankara", "İzmir", "Bursa"],
    answer: "B",
    image: "fotoğraflar/Turk-Bayragi.jpg"
  },
  {
    question: "En büyük gezegen hangisidir?",
    options: ["Dünya", "Mars", "Jüpiter", "Venüs"],
    answer: "C",
    image: "fotoğraflar/gezegen.jpeg"
  },
  {
    question: "HTML açılımı nedir?",
    options: ["HyperText Machine Language", "HyperText Markup Language", "HighText Markup Language", "None"],
    answer: "B",
    image: "fotoğraflar/html.jpeg"
  },
  {
    question: "Türkiye'nin en uzun nehri?",
    options: ["Kızılırmak", "Fırat", "Dicle", "Sakarya"],
    answer: "A",
    image: "fotoğraflar/6.jpeg"
  },
  {
    question: "Atatürk hangi yılda doğmuştur?",
    options: ["1881", "1876", "1890", "1901"],
    answer: "A",
    image: "fotoğraflar/atatürk.jpeg"
  },
  {
    question: "1 GB kaç MB'dir?",
    options: ["512", "1000", "1024", "2048"],
    answer: "C",
    image: "fotoğraflar/network.jpeg"
  },
  {
    question: "Python nedir?",
    options: ["Yılan", "Yazılım dili", "Tarayıcı", "Oyun motoru"],
    answer: "B",
    image: "fotoğraflar/pth.jpeg"
  },
  {
    question: "En küçük asal sayı?",
    options: ["0", "1", "2", "3"],
    answer: "C",
    image: "fotoğraflar/math.jpeg"
  },
  {
    question: "Javascript hangi alanda kullanılır?",
    options: ["Donanım", "Web", "Veri tabanı", "Ağ"],
    answer: "B",
    image: "fotoğraflar/js.jpeg"
  },
  {
    question: "Ay'a ilk çıkan insan?",
    options: ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin", "Shepard"],
    answer: "B",
    image: "fotoğraflar/ay.jpeg"
  }
];


let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 15;
let userName = "";

const letterMap = ["A", "B", "C", "D"];


const loginScreen = document.getElementById("login-screen");
const startBtn = document.getElementById("start-btn");
const usernameInput = document.getElementById("username");
const userDisplay = document.getElementById("user-display");

const quizBox = document.getElementById("quiz-box");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const timerEl = document.getElementById("timer");

const resultEl = document.getElementById("result");
const leaderboard = document.getElementById("leaderboard");
const scoreList = document.getElementById("score-list");

startBtn.addEventListener("click", () => {
  const val = usernameInput.value.trim();
  if (val) {
    userName = val;
    loginScreen.classList.add("hidden");
    quizBox.classList.remove("hidden");
    userDisplay.textContent = `Oyuncu: ${userName}`;
    currentQuestion = 0;
    score = 0;
    loadQuestion();
    startTimer();
  }
});

function loadQuestion() {
  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  nextBtn.classList.add("hidden");

  document.getElementById("question-image").src = q.image;

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.classList.add("option");
    btn.innerHTML = `<span class="label">${letterMap[index]}</span> ${opt}`;
    btn.addEventListener("click", () => selectOption(btn, letterMap[index], q.answer));
    optionsEl.appendChild(btn);
  });

  timeLeft = 15;
  timerEl.textContent = `Süre: ${timeLeft}`;
}


function selectOption(selectedBtn, selectedLetter, correctLetter) {
  clearInterval(timer);
  const isCorrect = selectedLetter === correctLetter;

  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach(btn => {
    btn.disabled = true;
    const label = btn.querySelector(".label").textContent;
    if (label === correctLetter) {
      btn.classList.add("correct");
    } else if (btn === selectedBtn && !isCorrect) {
      btn.classList.add("incorrect");
    }
  });

  if (isCorrect) score++;

  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
    startTimer();
  } else {
    finishQuiz();
  }
});

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `Süre: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextBtn.click(); 
    }
  }, 1000);
}

function finishQuiz() {
  quizBox.classList.add("hidden");
  resultEl.classList.remove("hidden");
  resultEl.innerHTML = `
    <h2>Tebrikler ${userName}!</h2>
    <p>Skorun: ${score} / ${questions.length}</p>
  `;
  saveScore(userName, score);
  showLeaderboard();
}

function saveScore(name, point) {
  const scores = JSON.parse(localStorage.getItem("scores") || "[]");
  scores.push({ name, point });
  scores.sort((a, b) => b.point - a.point);
  const topScores = scores.slice(0,10);
  localStorage.setItem("scores", JSON.stringify(scores));
}

function showLeaderboard() {
  const scores = JSON.parse(localStorage.getItem("scores") || "[]");
  const scoreList = document.getElementById("score-list");

 
  scoreList.innerHTML = "";


  scores.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${index + 1}. ${item.name} - ${item.point} puan`;
    scoreList.appendChild(li);
  });

  
  document.getElementById("leaderboard").classList.remove("hidden");
}
