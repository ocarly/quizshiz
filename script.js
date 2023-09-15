const questions = [
    {
        question: "What does 'DOM' stand for in JavaScript?",
        options: ["Document Object Model", "Data Object Model", "Database Object Model", "Document Oriented Model"],
        correctAnswer: "Data Object Model"
    },
    {
        question: "Which method is used to add new elements to an array in JavaScript?",
        options: ["push()", "append()", "insert()", "add()"],
        correctAnswer: "push()"
    },
    {
        question: "What is a closure in JavaScript?",
        options: ["A way to lock a variable", "A private function", "A function that has access to its outer scope variables", "A function with no return value"],
        correctAnswer: "A function that has access to its outer scope variables"
    },
    {
        question: "What is the purpose of 'console.log()' in JavaScript?",
        options: ["Display a message box", "Print text to the console", "Open a new web page", "Create a pop-up window"],
        correctAnswer: "Print text to the console"
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


function displayQuestion() {
    if (currentQuestion < questions.length) {
        questionElement.textContent = questions[currentQuestion].question;
        const options = questions[currentQuestion].options;

        const labels = document.querySelectorAll('.option-label');
        labels.forEach((label, index) => {
            label.textContent = options[index];
            const radioInput = label.querySelector('input[type="radio"]');
            radioInput.addEventListener('change', () => {
                const selectedAnswer = radioInput.value;
                const correctAnswer = questions[currentQuestion].correctAnswer;
                
                if (selectedAnswer === correctAnswer) {
                    // Increase the score when the answer is correct
                    score++;
                } else {
                    // Deduct ten seconds from the timer when the answer is wrong
                    timer -= 10;
                }
                
                // Move to the next question
                currentQuestion++;
                displayQuestion();
            });
        });
    } else {
        endQuiz();
    }
}

console.log(score)
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
    questionElement.textContent = 'Quiz completed!';
    document.getElementById('question-container').style.display = 'none';
    nextButton.style.display = 'none';
}

nextButton.addEventListener('click', function () {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        const selectedAnswer = parseInt(selectedOption.value);
        if (selectedAnswer === questions[currentQuestion].correctAnswer) {
            // Handle correct answer logic here
            // For example, you can increment a score variable.
        }
        currentQuestion++;
        displayQuestion();
        selectedOption.checked = false;
    }
});

displayQuestion();
startTimer();
