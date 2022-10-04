// Start button clicked,timer starts and questions appear
// Multiple choices should appear per question
// One of the choices should be selectable
// Submit answer button
// Should warn user if no choice is selected
// if wrong answer, deduct time -> possibly show a warning
// if correct, show correct and move on
// when all Q's answered or timer runs out, game ends
// user should be able to input their initials/name and submit
// when user checks highscore tab, should be able to see all local highscores
var main = document.querySelector("#main");
var quiz = document.querySelector("#quiz");
var highscoreBtn = document.querySelector("#highscoreBtn");
var startBtn = document.querySelector("#start");
var timer = document.querySelector("#time");
var questions = document.querySelector("#questions");
var instructions = document.querySelector("#instructions");
var choices = document.querySelector("#choices");
var inputDiv = document.querySelector("#input-div");
var inputForm = document.querySelector("#input-form");
var inputName = document.querySelector("#input-name");
var timeLeft = 300000; // defaults quiz time to 5 minutes
var defaultStatus = "visible";
var currentQuestionIndex = 0;
var correctQuestions = 0;
var finalTime = 0;
var timerInterval;
var highscoreArray = [];
var highscoreListVisible = false;
var startBtnFunctionality = true;

var questionList = 
[
    {
        question: "Question 1",
        answers: [
            {choice: "answer", correct: true},
            {choice: "Choice 2", correct: false},
            {choice: "Choice 3", correct: false},
            {choice: "Choice 4", correct: false},
        ]
    },
    {
        question: "Question 2",
        answers: [
            {choice: "Choice 1", correct: false},
            {choice: "Choice 2", correct: false},
            {choice: "answer", correct: true},
            {choice: "Choice 4", correct: false},
        ]
    },
    {
        question: "Question 3",
        answers: [
            {choice: "Choice 1", correct: false},
            {choice: "Choice 2", correct: false},
            {choice: "answer", correct: true},
            {choice: "Choice 4", correct: false},
        ]
    },
    {
        question: "Question 4",
        answers: [
            {choice: "Choice 1", correct: false},
            {choice: "answer", correct: true},
            {choice: "Choice 3", correct: false},
            {choice: "Choice 4", correct: false},
        ]
    },
    {
        question: "Question 5",
        answers: [
            {choice: "Choice 1", correct: false},
            {choice: "Choice 2", correct: false},
            {choice: "answer", correct: true},
            {choice: "Choice 4", correct: false},
        ]
    },
    {
        question: "Question 6",
        answers: [
            {choice: "Choice 1", correct: false},
            {choice: "Choice 2", correct: false},
            {choice: "Choice 3", correct: false},
            {choice: "answer", correct: true},
        ]
    },
    {
        question: "Question 7",
        answers: [
            {choice: "answer", correct: true},
            {choice: "Choice 2", correct: false},
            {choice: "Choice 3", correct: false},
            {choice: "Choice 4", correct: false},
        ]
    },
    {
        question: "Question 8",
        answers: [
            {choice: "Choice 1", correct: false},
            {choice: "Choice 2", correct: false},
            {choice: "answer", correct: true},
            {choice: "Choice 4", correct: false},
        ]
    },
    {
        question: "Question 9",
        answers: [
            {choice: "Choice 1", correct: false},
            {choice: "answer", correct: true},
            {choice: "Choice 3", correct: false},
            {choice: "Choice 4", correct: false},
        ]
    },
    {
        question: "Question 10",
        answers: [
            {choice: "Choice 1", correct: false},
            {choice: "answer", correct: true},
            {choice: "Choice 3", correct: false},
            {choice: "Choice 4", correct: false},
        ]
    }
]

startBtn.addEventListener("click", defaultDisplay); // hides starting html elements when button is clicked
startBtn.addEventListener("click", quizStart); // starts quiz

// Give start button functionality after hiding/reloading it
function checkStartButton() 
{
    if (startBtnFunctionality === false)
    {
        startBtnFunctionality = true;
        startBtn.addEventListener("click", defaultDisplay); // hides starting html elements when button is clicked
        startBtn.addEventListener("click", quizStart); // starts quiz     
    }
}
checkStartButton();

// startBtn.addEventListener("click", defaultDisplay); // hides starting html elements when button is clicked
// startBtn.addEventListener("click", quizStart);

// creates a timer than ticks down from 5 minutes to 0, then displaying a Time's up message.
function quizTimer() {
    timer.style.display = "Block";
    timeLeft = 300000;
        timerInterval = setInterval(function minutesSeconds()
        {
            timeLeft = timeLeft - 1000;
            var minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
            if (timeLeft >= 0){
                timer.innerHTML = minutes + "m " + seconds + "s ";
            }
            else {
                stopTimer();
                timer.innerHTML = "Time's up!";
                finalQuestion();
            }
        }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timeLeft = 0;
}

// function to hide the start quiz button and the instructions and make visible again later
function defaultDisplay() {
    var defaultArray = document.getElementsByClassName("default");
    if (defaultStatus === "visible") {
        for(i=0; i<defaultArray.length; i++)
        {
            defaultArray[i].style.display = "none";
            defaultArray[i].classList.add("hide");
        }
        defaultStatus = "hidden";
    }
    else {
        defaultStatus = "visible"
        for(i=0; i<defaultArray.length; i++)
        {
            defaultArray[i].style.display = "block";
        }        
    }
}

// loads questions and answers, one at a time.
function quizStart() {
    // console.log(main.children)
    currentQuestionIndex = 0;
    quiz.style.display = "Block";
    quizTimer();
    writeQuestion(currentQuestionIndex);
}

function writeQuestion(i) {
    console.log("This is current index: "+currentQuestionIndex);
    var answersIndex=0;
    if (choices.hasChildNodes){
        resetAnswers();
    }
    questions.innerHTML = questionList[i].question;
    questionList[i].answers.forEach(createAnswer);
    
    function createAnswer() {
        var button = document.createElement("button");
        button.innerHTML = questionList[i].answers[answersIndex].choice;
        button.classList.add("btn");
        if(questionList[i].answers[answersIndex].correct) {
            button.setAttribute("data-correct", questionList[i].answers[answersIndex].correct);
        }
        button.addEventListener("click", selectAnswer);
        choices.appendChild(button);
        answersIndex++;
    }
}

function selectAnswer(element) {
    var selectedButton = element.target;
    var correct = selectedButton.getAttribute("data-correct");
    currentQuestionIndex++;
    if (currentQuestionIndex < questionList.length){
        if (correct == "true")
        {
            correctQuestions++;
            console.log("Correct!");
            console.log(correctQuestions)
        }
        else {
            timeLeft = timeLeft-30000;
            console.log("Wrong!");
        }

        if (timeLeft > 0){
            writeQuestion(currentQuestionIndex);
        }
        else {
            finalQuestion();
            timer.innerHTML = "Time's up!";
        }
    }
    else {
        if (correct == "true"){
            correctQuestions++;
        }
        finalQuestion();
    }
}

function resetAnswers() {
    while(choices.firstChild)
        {
            choices.removeChild(choices.firstChild);
        }
}

function finalQuestion() 
{
    resetAnswers();
    // stop the timer
    stopTimer();
    // load the "end" screen
    questions.innerHTML = "Submit your score!";
    highScoreInputForm();
}

// highscore input form
function highScoreInputForm()
{
    inputDiv.classList.remove("hide");
    inputForm.classList.remove("hide");
    console.log("InputDiv classlist: " + inputDiv.classList);
    console.log("inputForm classlist: " + inputForm.classList);
    inputForm.addEventListener("submit", function(event) {
        event.preventDefault();
        var highscoreName = inputName.value.trim();
        if (highscoreName === "") {
            alert("Enter your name");
        }
        highscoreArray.push([highscoreName, correctQuestions, finalTime]);
        inputName.value = "";

        storeHighscore();
    })
}

function storeHighscore(){
    localStorage.setItem("highscore", JSON.stringify(highscoreArray));
}

function getHighscore() {
    // sort leaderboard
}


console.log(main.children.length);

//TODO: add click event handler to the button
highscoreBtn.addEventListener("click", toggleHighscore);
// when highscore button is clicked, display highscore list. when clicked again, reset to the default page
function toggleHighscore() {

    if (highscoreListVisible === false)
    {
        for (i=0; i < main.children.length; i++)
        {
            // clears elements from main
            main.children[i].style.display = "none";
        }
            // create the highscore list
            highscoreListVisible = true;
            defaultStatus = "hidden";
    }
    else {
        // clear highscore list
        // recreate default page
        defaultDisplay();
        highscoreListVisible = false;
        for (i=0; i < main.children.length; i++)
        {
            // clears elements from main
            // main.children[i].style.removeProperty("display");
        }
    }
}