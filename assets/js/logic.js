var startScreen = document.getElementById("start-screen");
var startButton = document.getElementById("start");
var questionScreen = document.getElementById("questions");
var askedQuestion = 0;
var timerElement = document.getElementById("time");
var timeRemaining = 0;
var timerID;
var questionIndex = 0;
var questionTitle = document.getElementById("question-title");
var choicesEl = document.getElementById("choices");
var submit = document.getElementById("submit");
var initials = document.getElementById("initials");
var feedBack = document.getElementById("feedBack");

function startQuiz() {
  startScreen.innerHTML = "";
  timeCaclulation();
  timerElement.textContent = timeRemaining;
  timerID = setInterval(oneSecondHandler, 1000);
  questionScreen.removeAttribute("class");
  nextQuestion();
}
function nextQuestion() {
  var currentQuestion = questions[questionIndex];
  questionTitle.textContent = currentQuestion.question;
  choicesEl.innerHTML = "";
  currentQuestion.options.forEach(function (choice, i) {
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.setAttribute("value", choice);
    choiceBtn.textContent = i + 1 + ". " + choice;
    choiceBtn.onclick = choiceClick;
    choicesEl.appendChild(choiceBtn);
  });
}
function choiceClick() {
  if (this.value !== questions[questionIndex].correctAnswer) {
    timeRemaining -= 15;
    if (timeRemaining < 0) {
      timeRemaining = 0;
    }
    timerElement.textContent = timeRemaining;
    alert("wrong answer!! Press OK to continue! ");
  } else {
    alert("correct answer!! Press OK to continue! ");
  }
  questionIndex++;
  if (questionIndex === questions.length) {
    endQuiz();
  } else {
    nextQuestion();
  }
}
function oneSecondHandler() {
  timeRemaining--;
  timerElement.textContent = timeRemaining;
  if (timeRemaining <= 0) {
    endQuiz();
  }
}
function endQuiz() {
  clearInterval(timerID);
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  var finalScore = document.getElementById("final-score");
  finalScore.textContent = timeRemaining;
  questionScreen.setAttribute("class", "hide");
}
function questionAsked() {}
function timer() {
  timeRemaining--;
  timerElement.textContent = timeRemaining;
  if (timeRemaining <= 0);
}
function timeCaclulation() {
  timeRemaining = questions.length * 15;
}
console.log(questions);

function saveScoreWithInitials() {
  var playerInitials = initials.value.trim();
  if (playerInitials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: timeRemaining,
      initials: playerInitials,
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    window.location.href = "highscores.html";
  }
}
function checkForEnter(event) {
  if (event.key === "Enter") {
    saveScoreWithInitials();
  }
}
startButton.addEventListener("click", startQuiz);

submit.onclick = saveScoreWithInitials;
initials.onkeyup = checkForEnter;
