var highscoresContainer = document.getElementById("highscores-container");
var storage = JSON.parse(localStorage.getItem("quizHighscores"));

if (storage === null) {
  highscoresContainer.textContent = "No Scores";
} else {
  highscoresContainer.textContent = "";

  for (var i = 0; i < storage.length; i++) {
    var scoreData = document.createElement("p");
    scoreData.textContent =
      "Name: " +
      storage[i].username +
      " ----- Highscore: " +
      storage[i].finalScore;

    highscoresContainer.append(scoreData);
  }
}
