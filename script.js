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
var timeLeft = 0;

startBtn.addEventListener("click", test);

function test()
{
    timer.innerHTML = "5 minutes left";
}
    
function setTime(){
    var timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft + " seconds left.";
    
        if (timeLeft === 0) 
        {
            clearInterval(timerInterval);

        }
}, 6000);
    return timerInterval;
}

