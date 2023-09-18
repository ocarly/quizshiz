const questions = [
    {
        question: "What is JavaScript used for?",
        choices: ["Styling HTML elements", "Programming web pages", "Creating databases", "Making coffee"],
        correctAnswer: "Programming web pages"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        choices: ["var", "let", "const", "variable"],
        correctAnswer: "var"
    },
    {
        question: "What does 'DOM' stand for?",
        choices: ["Document Object Model", "Data Object Model", "Document Order Model", "Dynamic Object Management"],
        correctAnswer: "Document Object Model"
    },
	{
        question: "What is the result of 10 + '5' in JavaScript?",
        choices: ["15", "105", "1050", "Error"],
        correctAnswer: "105"
    }
];

let currentQuestionIndex = 0;
let timer;
let timeLeft = 60;
let highScore = localStorage.getItem("highScore") || Infinity;

const startButton = document.getElementById("start-btn");
const timerDisplay = document.getElementById("timer");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const choicesElement = document.getElementById("choices");
const resultElement = document.getElementById("result");
const highScoreElement = document.getElementById("high-score");
// const inputBox = document.querySelector("#initials")

startButton.addEventListener("click", startQuiz);

function startQuiz() {
    startButton.style.display = "none";
    displayQuestion();
    timer = setInterval(updateTimer, 1000);
   
}

function updateTimer() {
    timeLeft--;

    if (timeLeft <= 0) {
        clearInterval(timer);
        endQuiz();
    } else {
        timerDisplay.textContent = timeLeft + " seconds";
    }
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        endQuiz();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    choicesElement.innerHTML = "";

    currentQuestion.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.addEventListener("click", () => checkAnswer(choice));
        choicesElement.appendChild(choiceButton);
    });
}

function checkAnswer(choice) {
    const currentQuestion = questions[currentQuestionIndex];

    if (choice === currentQuestion.correctAnswer) {
        resultElement.textContent = "Correct!";
    } else {
        resultElement.textContent = "Incorrect!";
        timeLeft -= 10;
    }

    currentQuestionIndex++;
    setTimeout(displayQuestion, 1000);
}

function endQuiz() {
    clearInterval(timer);
    timerDisplay.textContent = "0 seconds";

    if (timeLeft < highScore) {
        highScore = timeLeft;
        localStorage.setItem("highScore", highScore);
    }

    if (highScore === Infinity) {
        highScoreElement.textContent = "No high score";
    } else {
        highScoreElement.textContent = highScore + " seconds";
    }

    questionContainer.style.display = "none";
    resultElement.textContent = "Quiz Completed!";
}

highScoreElement.textContent = highScore + " seconds";
