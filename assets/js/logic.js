var startScreen = document.getElementById("start-screen");
var startButton = document.getElementById("start");
var askedQuestion = 0;
var timerElement = document.getElementById("time");
var timeRemaining = 0;

function startQuiz() {
  startScreen.innerHTML = "";
  timeCaclulation()
}
function questionAsked() {
}
function timer() {
  timeRemaining-- 
  timerElement.textContent = timeRemaining
  if (timeRemaining <= 0)
  return;
}
function timeCaclulation(){
  timeRemaining = questions.length * 15 
}
console.log(questions);

startButton.addEventListener("click", startQuiz);


// when i click start quiz
// then a timer starts and i am presented with the question 
// when i answer a question 
// then i am presented with another question 
// then time is subtracted from the clock 
// when all questions are answered or the timer reaches 0 
// then the game is over 
// when the game is over 
// then i can save my initals and scor 