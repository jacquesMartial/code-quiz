var startContainer = document.getElementById("start-container");
var questionContainer = document.getElementById("question-container");
var startBtn = document.getElementById("startBtn");
var questionTitle = document.getElementById("question-title");
var answersContainer = document.getElementById("answers-container");
var answerStateEl = document.getElementById("answerState");
var questionIndex = 0;
var timerValue = 150;
var timerEl = document.querySelector("#timerEl");
var score = 0;

var questions = [
  {
    questionTitle: "Question 1",
    answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
    correctAnswer: "answer 4",
  },
  {
    questionTitle: "Question 2",
    answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
    correctAnswer: "answer 3",
  },
  {
    questionTitle: "Question 3",
    answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
    correctAnswer: "answer 2",
  },
  {
    questionTitle: "Question 4",
    answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
    correctAnswer: "answer 1",
  },
];

//create a timer
// decrement timerValue by 1 every 1000ms
function decrement() {
  var timeInterval = setInterval(function () {
    timerValue--;
    timerEl.textContent = "Time:" + timerValue;

    if (timerValue === 0 || questionIndex === questions.length) {
      clearInterval(timeInterval);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  console.log("quiz is over");
  questionTitle.innerHTML = "";
  answersContainer.innerHTML = "";

  var name = document.createElement("input");
  name.setAttribute("placeholder", "Your Name");
  questionTitle.appendChild(name);

  var saveScoreBtn = document.createElement("button");
  saveScoreBtn.textContent = "Save";
  questionTitle.appendChild(saveScoreBtn);

  saveScoreBtn.addEventListener("click", function () {
    var userObj = {
      username: name.value,
      finalScore: score,
    };

    var storage = JSON.parse(localStorage.getItem("quizHighscores"));
    if (storage === null) {
      storage = [];
    }

    storage.push(userObj);
    localStorage.setItem("quizHighscores", JSON.stringify(storage));

    window.location.href = "highscores.html";
  });
}

function answerChecking() {
  if (currentAnswer === currentQuestion) {
    console.log("correct!");
  } else {
    console.log("wrong!");
  }
}
answerStateEl.textContent = answerChecking;

var renderQuestion = function () {
  questionTitle.innerHTML = "";
  answersContainer.innerHTML = ""; //this is  removing any html from the targeted element (empties the answers element/removes the old button)
  if (questionIndex === questions.length) {
    return;
  }

  var currentQuestion = questions[questionIndex];

  // displays the current question title
  questionTitle.innerHTML = currentQuestion.questionTitle;

  // looping over the answers of the current question
  for (let index = 0; index < currentQuestion.answers.length; index++) {
    var button = document.createElement("button"); //creating button
    button.innerHTML = currentQuestion.answers[index]; //assigning button text
    button.setAttribute("data-index", index); //setting data attribute for each button

    //putting the buttons in the container
    answersContainer.appendChild(button);
    button.addEventListener("click", function (event) {
      var currentAnswer = event.target.textContent;
      if (currentAnswer === currentQuestion.correctAnswer) {
        // render next q
        score += 25;
        console.log("correct score now equals " + score);
      } else {
        console.log("incorrect");
        // decrease time from timer
        timerValue-- - 25;
      }
      questionIndex++;
      renderQuestion();
    });
  }
};
//

// store the current value of the time in local storage

var startQuiz = function () {
  startContainer.classList.add("hide");
  questionContainer.classList.remove("hide");
  renderQuestion();
  decrement();
};

startBtn.addEventListener("click", startQuiz);
