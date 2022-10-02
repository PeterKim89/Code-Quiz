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
var timeLeft = 300000;

startBtn.addEventListener("click", quizTimer);

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
    },1000 );
}