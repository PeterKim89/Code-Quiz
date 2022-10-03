// Start button clicked,timer starts and questions appear
// Multiple choices should appear per question
// One of the choices should be selectable
// Submit answer button
// Should warn user if no choice is selected
// if wrong answer, deduct time -> possibly show a warning
// if correct, show correct and move on
// when all Q's answered or timer runs out, game ends
// user should be able to input their initials and submit
// when user checks highscore tab, should be able to see all local highscores

var startBtn = document.querySelector("#start");
var timer = document.querySelector(".time");
var questions = document.querySelector("#questions");
var instructions = document.querySelector("#instructions");
var choices = document.querySelector("#choices");
var timeLeft = 300000; // defaults quiz time to 5 minutes
var toggleStatus = "visible";
var quizQuestionList =   
[
     ["Question 1", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
     ["Question 2", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
     ["Question 3", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
     ["Question 4", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
     ["Question 5", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
     ["Question 6", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
     ["Question 7", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
     ["Question 8", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
     ["Question 9", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
     ["Question 10", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],   
];
var answerList = ["Answer1","Answer2","Answer3","Answer4","Answer5","Answer6","Answer7","Answer8","Answer9","Answer10"];
startBtn.addEventListener("click", quizTimer); // change to eventually be a quiz starter function
startBtn.addEventListener("click", toggleDisplay); // hides starting html elements when button is clicked
startBtn.addEventListener("click", quizStart);

// creates a timer than ticks down from 5 minutes to 0, then displaying a Time's up message.
function quizTimer() {
    var timerInterval = setInterval(function(event) {
        timeLeft = timeLeft - 1000;
        var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        document.getElementsByClassName("time")[0].innerHTML = minutes + "m " + seconds + "s ";
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            document.getElementsByClassName("time")[0].innerHTML = "Time's Up";
        }
        // include another condition for when quiz is finished
    },1000 );
}

// function to hide the start quiz button and the instructions and make visible again later
function toggleDisplay() {
    var toggleArray = document.getElementsByClassName("toggle");
    if (toggleStatus === "visible") {
        for(i=0; i<toggleArray.length; i++)
        {
            toggleArray[i].style.display = "none";
        }
        toggleStatus = "hidden";
    }
    else {
        toggleStatus = "visible"
        for(i=0; i<toggleArray.length; i++)
        {
            toggleArray[i].style.display = "block";
        }        
    }
}

// loads questions and answers, one at a time.
function quizStart() {
    var currentQuestionIndex = 0;
    writeQuestion();
}

function writeQuestion(i){
    questions.innerHTML = quizQuestionList[i][0];
    for (j=1; j<=5; j++){
        var answerBtn = document.createElement("button");
        answerBtn.innerHTML = quizQuestionList[i][j];
        answerBtn.addEventListener("click", selectAnswer())
        choices.appendChild(answerBtn);
    }
}

function selectAnswer() {

}

function resetWindow(){
    
}