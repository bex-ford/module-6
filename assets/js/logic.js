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
    // create new button for each choice
    var choiceBtn = document.createElement("button");
    choiceBtn.setAttribute("class", "choice");
    choiceBtn.setAttribute("value", choice);

    choiceBtn.textContent = i + 1 + ". " + choice;

    // attach click event listener to each choice
    choiceBtn.onclick = choiceClick;

    // display on the page
    choicesEl.appendChild(choiceBtn);
  });
}
function choiceClick() {
  if (this.value !== questions[questionIndex].correctAnswer) {
    // penalize time
    timeRemaining -= 15;

    if (timeRemaining < 0) {
      timeRemaining = 0;
    }

    // display new time on page
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
  // get value of input box
  var playerInitials = initials.value.trim();

  // make sure value wasn't empty
  if (playerInitials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: timeRemaining,
      initials: playerInitials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
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


// when i click start quiz
// then a timer starts and i am presented with the question
// when i answer a question
// then i am presented with another question
// then time is subtracted from the clock
// when all questions are answered or the timer reaches 0
// then the game is over
// when the game is over
// then i can save my initals and scor
