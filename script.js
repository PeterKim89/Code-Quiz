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
var currentQuestionIndex = 0;
var correctQuestions = 0;
// var quizQuestionList =   
// [
//      ["Question 1", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
//      ["Question 2", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
//      ["Question 3", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
//      ["Question 4", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
//      ["Question 5", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
//      ["Question 6", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
//      ["Question 7", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
//      ["Question 8", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
//      ["Question 9", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],
//      ["Question 10", "Choice 1", "Choice 2", "Choice 3", "Choice 4"],   
// ];
// var answerList = ["Choice 1","Answer2","Answer3","Answer4","Answer5","Answer6","Answer7","Answer8","Answer9","Answer10"];
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

console.log(questionList[0])
console.log(questionList[1])
console.log(questionList[0].question)
console.log(questionList[0].answers[1].choice)

// loads questions and answers, one at a time.
function quizStart() {
    
    writeQuestion(currentQuestionIndex);
}

function writeQuestion(i) {
    var answersIndex=0;
    if (choices.hasChildNodes){
        resetAnswers();
    }
    questions.innerHTML = questionList[i].question;
    questionList[i].answers.forEach(answer);
    
    function answer() {
        var button = document.createElement("button");
        button.innerHTML = questionList[i].answers[answersIndex].choice;
        button.classList.add("btn");
        if(questionList[i].answers[answersIndex].correct) {
            button.dataset.correct = questionList[i].answers[answersIndex].correct;
        }
        button.addEventListener("click", selectAnswer);
        choices.appendChild(button);
        answersIndex++;
    }
}

function selectAnswer(element) {

    var selectedButton = element.target;
    var correct = selectedButton.dataset.correct;

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
    currentQuestionIndex++;
    writeQuestion(currentQuestionIndex);
}

function resetAnswers() {
while(choices.firstChild)
    {
        choices.removeChild(choices.firstChild);
    }
}

// function writeQuestion(i){
//     questions.innerHTML = quizQuestionList[i][0];
    
//     for (j=1; j<=4; j++){
//         var answerBtn = document.createElement("button");
//         // console.log(quizQuestionList[i][j]);
//         var temp = j;
//         console.log("This is J: " + temp);
//         answerBtn.innerHTML = quizQuestionList[i][j];
//         answerBtn.setAttribute = ("data-index", 4);
//         console.log("This is attribute: " + answerBtn.getAttribute("data-index"));
//         answerBtn.addEventListener("click", function()
//         {
//             console.log(answerBtn.innerHTML + "= innerHTML"); 
//             console.log(answerBtn.getAttribute("data-index"));
//             console.log(answerList[i] + "= answerList[i]");
//             if (answerBtn.innerHTML == answerList[i])
//             {
//                 correctQuestions++;
//                 console.log("Current score: "+correctQuestions)
//             }
//             else {
//                 timeLeft = timeLeft - 30000;
//             }
//         })
//         choices.appendChild(answerBtn);
//     }
// }


// function selectAnswer(element) {
//     var selectedAnswer = element.target;
//     console.log(selectedAnswer);
//     // checkAnswer(selectedAnswer);
// }

// function checkAnswer(answer){
//     if(answer === answerList[currentQuestionIndex])
//     {
//         correctQuestions++;
//     }
//     else{
//         timeLeft = timeLeft - 30000;
//     }
// }

// function resetWindow(){

// }