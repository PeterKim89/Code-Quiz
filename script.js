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

var startBtn = document.querySelector(".start");
var timer = document.querySelector(".time");
var questions = document.querySelector(".questions");
var instructions = document.querySelector("#instructions");
var timeLeft = 300000; // defaults quiz time to 5 minutes
var quizQuestionAnswerList = {
    quizQuestionList: [this.Q1,this.Q2,this.Q3,this.Q4,this.Q5,this.Q6,this.Q7,this.Q8,this.Q9,this.Q10],
    Q1: ["Actual question here", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    Q2: ["Actual question here", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    Q3: ["Actual question here", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    Q4: ["Actual question here", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    Q5: ["Actual question here", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    Q6: ["Actual question here", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    Q7: ["Actual question here", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    Q8: ["Actual question here", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    Q9: ["Actual question here", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
    Q10: ["Actual question here", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],   
}

startBtn.addEventListener("click", quizTimer); // change to eventually be a quiz starter function
startBtn.addEventListener("click", toggleDisplay); // hides starting html elements when button is clicked
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

// function to hide the start quiz button and the instructions
function toggleDisplay() {
    var toggleArray = document.getElementsByClassName("toggle");
    console.log(toggleArray);
    for(i=0; i<toggleArray.length; i++)
    {
        toggleArray[i].style.display = "none";
    }
}