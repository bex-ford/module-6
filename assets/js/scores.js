var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

highscores.sort(function (x, y) {
  return y.score - x.score;
});

highscores.forEach(function (score) {
  var liTag = document.createElement("li");
  liTag.textContent = score.initials + " - " + score.score;

  var olTag = document.getElementById("highscores");
  olTag.appendChild(liTag);
});

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}

document.getElementById("clear").onclick = clearHighscores;
