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
var highscoreList = document.querySelector("#highscoreList");
var highscorePage = document.querySelector("#highscorePage");
var timeLeft = 300000; // defaults quiz time to 5 minutes
var defaultStatus = "visible";
var currentQuestionIndex = 0;
var correctQuestions = 0;
var finalTime = 0;
var timerInterval;
var highscoreArray = [];
var highscoreListVisible = false;
var startBtnFunctionality = true;
var highscoreName;
var questionList = 
[
    {
        question: "How long is this array: [5,1,2,4]",
        answers: [
            {choice: "4", correct: true},
            {choice: "3", correct: false},
            {choice: "1", correct: false},
            {choice: "2", correct: false},
        ]
    },
    {
        question: "What does Math.floor() do?",
        answers: [
            {choice: "rounds up", correct: false},
            {choice: "do nothing", correct: false},
            {choice: "rounds down", correct: true},
            {choice: "rounds to 1st decimal", correct: false},
        ]
    },
    {
        question: "Which of these is a boolean value?",
        answers: [
            {choice: "5", correct: false},
            {choice: "A", correct: false},
            {choice: "true", correct: true},
            {choice: "Farley 4", correct: false},
        ]
    },
    {
        question: "What is the symbol associated with id?",
        answers: [
            {choice: "$", correct: false},
            {choice: "#", correct: true},
            {choice: "!", correct: false},
            {choice: ".", correct: false},
        ]
    },
    {
        question: "Fill in the blank ___.querySelector()",
        answers: [
            {choice: "app", correct: false},
            {choice: "form", correct: false},
            {choice: "document", correct: true},
            {choice: "script", correct: false},
        ]
    },
    {
        question: "Which is not a valid programming language?",
        answers: [
            {choice: "Python", correct: false},
            {choice: "JavaScript", correct: false},
            {choice: "HTML", correct: false},
            {choice: "Cheetos", correct: true},
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            {choice: "Cascading Style Sheet", correct: true},
            {choice: "Custom Style Sheet", correct: false},
            {choice: "Custom Style Script", correct: false},
            {choice: "Cascading Style Script", correct: false},
        ]
    },
    {
        question: "What does HTML stands for?",
        answers: [
            {choice: "Hypertext Machine Language", correct: false},
            {choice: "Hypertext and links markup language", correct: false},
            {choice: "Hypertext Markup Language", correct: true},
            {choice: "Hightest Machine Language", correct: false},
        ]
    },
    {
        question: "Which of the following HTML Elements is used for making any text bold?",
        answers: [
            {choice: "<p>", correct: false},
            {choice: "<b>", correct: true},
            {choice: "<ul>", correct: false},
            {choice: "<li>", correct: false},
        ]
    },
    {
        question: "How is document type initialized in HTML5?",
        answers: [
            {choice: "</DOCTYPE HTML>", correct: false},
            {choice: "<!DOCTYPE HTML>", correct: true},
            {choice: "</DOCTYPE>", correct: false},
            {choice: "</DOCTYPE html>", correct: false},
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
                timer.innerText = minutes + "m " + seconds + "s ";
            }
            else {
                stopTimer();
                timer.innerText = "Time's up!";
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
        defaultStatus = "visible";

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
    correctQuestions = 0;
    quiz.style.display = "Block";
    quizTimer();
    writeQuestion(currentQuestionIndex);
}

function writeQuestion(i) {
    // console.log("This is current index: "+currentQuestionIndex);
    var answersIndex=0;
    if (choices.hasChildNodes){
        resetAnswers();
    }
    questions.innerText = questionList[i].question;
    questionList[i].answers.forEach(createAnswer);
    
    function createAnswer() {
        var button = document.createElement("button");
        button.innerText = questionList[i].answers[answersIndex].choice;
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
            timer.innerText = "Time's up!";
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
    finalTime = timeLeft;
    resetAnswers();
    // stop the timer
    stopTimer();
    // load the "end" screen
    questions.innerText = "Submit your score!";
    highScoreInputForm();
}

// highscore input form
function highScoreInputForm()
{
    console.log(main.children)
    inputDiv.style.display = "Block";
    inputForm.style.display = "Block";
    inputForm.addEventListener("submit", function(event) {
        event.preventDefault();
        highscoreName = inputName.value.trim();
        if (highscoreName == "") 
        {
            alert("Enter your name");
        }
        else {
            highscoreArray.push([highscoreName, correctQuestions, finalTime]);
        }
        storeHighscore();
        clearMain();
        defaultDisplay();
    }
    );
    inputName.value = "";
}

function storeHighscore(){
    localStorage.setItem("highscore", JSON.stringify(highscoreArray));
    // console.log(sortHighscore());
}

function filterHighscore() {
    var tempArray = [];
    for (i=0; i<highscoreArray.length; i++)
    {
        if (tempArray.includes(highscoreArray[i]) === false)
        {
            tempArray.push(highscoreArray[i])
        }
    }
    console.log(tempArray);
    highscoreArray = tempArray;
    console.log(highscoreArray);
    return highscoreArray;
}

function sortHighscore() {
    var tempArrayElement;
    // sorts highscores with highest correct questions taking priority, then time left
    for (i=0; i<highscoreArray.length - 1; i++)
    {
        for (j=0; j<highscoreArray.length - i - 1; j++)
        {
            if (highscoreArray[j][1] <= highscoreArray[j+1][1])
            {
                tempArrayElement = highscoreArray[j+1];
                highscoreArray[j+1] = highscoreArray[j];
                highscoreArray[j] = tempArrayElement;
            }
            else if (highscoreArray[j][2] <= highscoreArray[j+1][2])
            {
                tempArrayElement = highscoreArray[j+1];
                highscoreArray[j+1] = highscoreArray[j];
                highscoreArray[j] = tempArrayElement;
            }                
        }
    }
}

function getHighscore() {    
    sortHighscore(filterHighscore());
    for (i=0; i<highscoreArray.length; i++)
        {
            // create li elements per array element, then append to #highscoreList
            var listElement = document.createElement("li");
            listElement.innerText = highscoreArray[i][0] + " + Score: " + highscoreArray[i][1] + " correct questions, " + highscoreArray[i][2]/1000 +" seconds left";
            highscoreList.appendChild(listElement);
        }
}

function clearHighscore() {
    while (highscoreList.firstChild)
    {
        highscoreList.removeChild(highscoreList.firstChild)
    }
}

highscoreBtn.addEventListener("click", toggleHighscore);
// when highscore button is clicked, display highscore list. when clicked again, reset to the default page
function toggleHighscore() {
    if (highscoreListVisible === false)
    {
        clearMain();
        // create the highscore list
        highscoreListVisible = true;
        highscorePage.style.display = "Block";
        highscoreList.style.display = "Block";
        getHighscore();

    }
    else {
        highscorePage.style.display = "none";
        highscoreList.style.display = "none";
        clearHighscore();
        // recreate default page
        defaultDisplay();
        highscoreListVisible = false;
    }
}

function clearMain () {
    for (i=0; i < main.children.length; i++)
        {
            // if (main.children[i] !== )
            // clears elements from main
            main.children[i].style.display = "none";
        }
        defaultStatus = "hidden";
}