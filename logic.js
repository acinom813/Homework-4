
// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = questions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var startScreenEl = document.getElementById("start-screen");
var endScreenEl = document.getElementById("end-screen");
var finalScoreEl = document.getElementById("final-score");
var questionTitleEl = document.getElementById("question-title");


// sound effects
var sfxRight = new Audio("Assets/correct.wav");
var sfxWrong = new Audio("Assets/incorrect.wav");

// Step 1: Quiz begins, question appears, intro screen goes away
// Step 2: Timer begins
// Step 3: User answers question, shows correct or incorrect
// Step 4: if correct moves to next question, if incorrect deducts 15 secs
// Step 5: At end of questions hide all questions, stop timer
// Step 6: Alert user they are done, display score, 
// Step 7: user types initials and clicks submit, 
// Step 8: displays high scores
// Setp 9: button to go back 

startBtn.addEventListener("click", startQuiz)

function startQuiz()
 { 
   startScreenEl.classList.add("hide")
   questionsEl.classList.remove("hide")
  timerId = setInterval(clockTick,1000)
  getQuestion();
}

function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex].title;
  questionTitleEl.textContent = currentQuestion
  choicesEl.textContent = ""
   for (let i = 0; i < questions[currentQuestionIndex].choices.length; i++) {
        
         var button = document.createElement("button")
         button.textContent =  questions[currentQuestionIndex].choices[i]
         button.addEventListener("click", questionClick) 

         choicesEl.append(button)
   }
}

function questionClick() {
  if (this.value === questions[currentQuestionIndex].answer) {
    time -= 15;
  
    if (time < 0) {
      time = 0;
    }

  feedbackEl.textContent = "Wrong!";
  } 
  else {

  feedbackEl.textContent = "Correct!";
  }
  currentQuestionIndex++  

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd ()
  {
endScreenEl.setAttribute("class", "end-screen");
  // stop timer
  
  // show end screen

  // show final score
    finalScoreEl.setAttribute("class", "final-score");
  // hide questions section
  questionsEl.setAttribute("class", "hide");
  }


function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box

  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage

    // redirect to next page
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.addEventListener("click", saveHighscore);

// user clicks button to start quiz
startBtn.addEventListener("click", startQuiz);

initialsEl.addEventListener("onkeyup", checkForEnter);
