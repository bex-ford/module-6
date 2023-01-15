var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

  // sort highscores by score property in descending order
  highscores.sort(function(x, y) {
    return y.score - x.score;
  });

  highscores.forEach(function(score) {
    // create li tag for each high score
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    // display on page
    var olTag = document.getElementById("highscores");
    olTag.appendChild(liTag);
  });
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;