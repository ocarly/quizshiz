const questions = [
    {
        question: "What does 'DOM' stand for in JavaScript?",
        options: ["Document Object Model", "Data Object Model", "Database Object Model", "Document Oriented Model"],
        correctAnswer: "0"
    },
    {
        question: "Which method is used to add new elements to an array in JavaScript?",
        options: ["push()", "append()", "insert()", "add()"],
        correctAnswer: "0"
    },
    {
        question: "What is a closure in JavaScript?",
        options: ["A way to lock a variable", "A private function", "A function that has access to its outer scope variables", "A function with no return value"],
        correctAnswer: "2"
    },
    {
        question: "What is the purpose of 'console.log()' in JavaScript?",
        options: ["Display a message box", "Print text to the console", "Open a new web page", "Create a pop-up window"],
        correctAnswer: "1"
    }
];

let currentQuestion = 0;
let timer = 60; // 60 seconds for the quiz
let score = 0; 

const questionElement = document.getElementById('question');
const timerElement = document.getElementById('timer');
const nextButton = document.getElementById('next-button');
const inputThings = document.querySelectorAll(`input[name="answer"]`)
const userAnswer = document.querySelector(`input[value]`)
const endScreen = document.querySelector(".end-view")
const inputBox = document.querySelector("#initials")
const endNotification = document.querySelector("#end-notification")
const userScoreEl = document.querySelector("#lil-score")


function displayQuestion() {
    endScreen.style.display = 'none';

    if (currentQuestion < questions.length) {
        questionElement.textContent = questions[currentQuestion].question;
        const options = questions[currentQuestion].options;

        const labels = document.querySelectorAll('.option-label');
        labels.forEach((label, index) => {
            label.textContent = options[index];
        });
    } else {
        endQuiz();
    }
}

// Event listener for the next button
nextButton.addEventListener('click', () => {
    const selectedAnswer = document.querySelector('input[name="options"]:checked');
    console.log(selectedAnswer)
    if (selectedAnswer) {
        const selectedValue = selectedAnswer.value;
        console.log("selectedAnswer" , selectedValue)
        const correctAnswer = questions[currentQuestion].correctAnswer;
        console.log("correctAnswer" , correctAnswer)
        if (selectedValue === correctAnswer) {
            console.log(selectedValue, correctAnswer)
            score+= 50;
            console.log(score)
        }

        if (selectedValue !== correctAnswer){
            timer -= 10;
        }
        
        currentQuestion++;
        displayQuestion();
        
        // Clear the radio button selection
        selectedAnswer.checked = false;
    } else {
        alert("Please select an answer before proceeding.");
    }
    
    // Check if the quiz has ended
    if (currentQuestion >= questions.length) {
        endQuiz();
    }
});



function startTimer() {
    const interval = setInterval(function () {
        timer--;
        timerElement.textContent = timer;
        if (timer <= 0) {
            clearInterval(interval);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    console.log("running?")
    endScreen.style.display = "block"
    endNotification.textContent = 'Quiz completed!';
    userScoreEl.textContent = "You Scored: " + score
    document.getElementById('question-container').style.display = 'none';
    nextButton.style.display = 'none';
}

displayQuestion();
startTimer();