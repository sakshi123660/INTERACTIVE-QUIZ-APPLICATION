// Quiz Questions Database
const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
        correct: 0,
        explanation: "HTML stands for Hyper Text Markup Language. It's the standard markup language used to create web pages and structure content on the internet."
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["text-color", "color", "font-color", "text-style"],
        correct: 1,
        explanation: "The 'color' property in CSS is used to set the color of text. For example: color: red; changes the text to red."
    },
    {
        question: "What is the correct JavaScript syntax to declare a variable?",
        options: ["var x = 5;", "variable x = 5;", "v x = 5;", "declare x = 5;"],
        correct: 0,
        explanation: "The correct syntax to declare a variable in JavaScript is using 'var', 'let', or 'const' keyword. For example: var x = 5;"
    },
    {
        question: "Which HTTP method is used to request data from a specified resource?",
        options: ["POST", "GET", "PUT", "DELETE"],
        correct: 1,
        explanation: "GET is an HTTP method used to retrieve data from a server. It requests data without modifying it on the server."
    },
    {
        question: "What does REST API stand for?",
        options: ["Representational State Transfer API", "Reliable Efficient Server Transfer API", "Remote Elementary Storage Transfer API", "Resource Server Transmission API"],
        correct: 0,
        explanation: "REST API stands for Representational State Transfer API. It's an architectural style for designing networked applications using HTTP requests."
    },
    {
        question: "Which JavaScript method is used to find an HTML element by its ID?",
        options: ["getElementByID()", "getElementById()", "getElement('id')", "findElementByID()"],
        correct: 1,
        explanation: "The getElementById() method returns an element with a specified ID. For example: document.getElementById('myId');"
    },
    {
        question: "What is the purpose of the CSS box model?",
        options: ["To organize HTML elements", "To define how elements are displayed and spaced", "To create animations", "To handle server requests"],
        correct: 1,
        explanation: "The CSS box model is a concept that describes how elements are displayed on a web page, including content, padding, border, and margin."
    },
    {
        question: "Which of the following is a JavaScript framework?",
        options: ["Django", "React", "Laravel", "Flask"],
        correct: 1,
        explanation: "React is a JavaScript library (often called a framework) developed by Facebook for building user interfaces with reusable components."
    },
    {
        question: "What does JSON stand for?",
        options: ["JavaScript Object Notation", "Java Server Output Network", "JavaScript Output Notation", "Java Standard Object Network"],
        correct: 0,
        explanation: "JSON stands for JavaScript Object Notation. It's a lightweight data format used for exchanging data between servers and web applications."
    },
    {
        question: "Which CSS property is used to make text bold?",
        options: ["text-weight", "font-weight", "bold-text", "font-bold"],
        correct: 1,
        explanation: "The 'font-weight' property is used to specify the weight of a font. A value of 'bold' or 700 makes the text bold."
    }
];

// Quiz State Variables
let currentQuestionIndex = 0;
let score = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let answered = false;
let selectedAnswer = null;

// Initialize Quiz
function initializeQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    answered = false;
    selectedAnswer = null;
    
    // Hide score section, show quiz content
    document.getElementById('scoreSection').classList.add('hidden');
    document.querySelector('.quiz-content').style.display = 'block';
    
    // Reset form
    const radioButtons = document.querySelectorAll('input[name="answer"]');
    radioButtons.forEach(radio => radio.checked = false);
    
    // Load first question
    loadQuestion();
}

// Load Current Question
function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    
    // Update question text
    document.getElementById('questionText').textContent = question.question;
    
    // Update options
    question.options.forEach((option, index) => {
        document.getElementById(`optionLabel${index + 1}`).textContent = option;
        document.getElementById(`option${index + 1}`).value = index;
    });
    
    // Update progress
    const progressPercentage = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    document.querySelector('.progress-fill').style.width = progressPercentage + '%';
    document.getElementById('currentQuestion').textContent = currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = quizQuestions.length;
    
    // Reset UI
    answered = false;
    selectedAnswer = null;
    document.getElementById('feedbackSection').classList.add('hidden');
    document.getElementById('submitBtn').classList.remove('hidden');
    document.getElementById('nextBtn').classList.add('hidden');
    document.getElementById('submitBtn').disabled = false;
    
    // Remove all styling from options
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('correct', 'incorrect', 'disabled');
    });
    
    // Reset radio buttons
    document.querySelectorAll('input[name="answer"]').forEach(radio => {
        radio.checked = false;
    });
}

// Submit Answer
function submitAnswer() {
    if (answered) {
        nextQuestion();
        return;
    }
    
    // Get selected answer
    selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    if (!selectedAnswer) {
        alert('Please select an answer before submitting!');
        return;
    }
    
    answered = true;
    const selectedIndex = parseInt(selectedAnswer.value);
    const question = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correct;
    
    // Update score
    if (isCorrect) {
        correctAnswers++;
        score++;
    } else {
        incorrectAnswers++;
    }
    
    // Update answer indicator
    updateAnswerIndicator();
    
    // Show feedback
    showFeedback(isCorrect, question);
    
    // Style the options
    styleAnswerOptions(selectedIndex, question.correct);
    
    // Update button
    document.getElementById('submitBtn').classList.add('hidden');
    document.getElementById('nextBtn').classList.remove('hidden');
    document.getElementById('submitBtn').disabled = true;
}

// Show Feedback
function showFeedback(isCorrect, question) {
    const feedbackSection = document.getElementById('feedbackSection');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const feedbackExplanation = document.getElementById('feedbackExplanation');
    
    if (isCorrect) {
        feedbackMessage.textContent = '✓ Correct!';
        feedbackMessage.className = 'feedback-message correct';
        feedbackSection.style.borderLeftColor = '#22c55e';
        feedbackSection.style.background = '#dcfce7';
    } else {
        feedbackMessage.textContent = '✗ Incorrect';
        feedbackMessage.className = 'feedback-message incorrect';
        feedbackSection.style.borderLeftColor = '#ef4444';
        feedbackSection.style.background = '#fee2e2';
    }
    
    feedbackExplanation.textContent = question.explanation;
    feedbackSection.classList.remove('hidden');
}

// Style Answer Options
function styleAnswerOptions(selectedIndex, correctIndex) {
    const options = document.querySelectorAll('.option');
    
    options.forEach((option, index) => {
        option.classList.add('disabled');
        
        if (index === correctIndex) {
            option.classList.add('correct');
        } else if (index === selectedIndex && selectedIndex !== correctIndex) {
            option.classList.add('incorrect');
        }
    });
}

// Update Answer Indicator
function updateAnswerIndicator() {
    document.getElementById('correctCount').textContent = correctAnswers;
    document.getElementById('incorrectCount').textContent = incorrectAnswers;
}

// Next Question
function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

// End Quiz and Show Results
function endQuiz() {
    // Hide quiz content
    document.querySelector('.quiz-content').style.display = 'none';
    
    // Show score section
    const scoreSection = document.getElementById('scoreSection');
    scoreSection.classList.remove('hidden');
    
    // Calculate percentage
    const percentage = Math.round((score / quizQuestions.length) * 100);
    
    // Update score display
    document.getElementById('finalScore').textContent = score;
    document.getElementById('maxScore').textContent = quizQuestions.length;
    document.getElementById('scorePercentage').textContent = percentage + '%';
    
    // Generate score message based on performance
    const scoreMessage = generateScoreMessage(percentage);
    document.getElementById('scoreMessage').textContent = scoreMessage;
}

// Generate Score Message
function generateScoreMessage(percentage) {
    if (percentage === 100) {
        return "Perfect Score! 🎉 You answered all questions correctly!";
    } else if (percentage >= 90) {
        return "Excellent! 🌟 Outstanding performance!";
    } else if (percentage >= 80) {
        return "Great Job! 👏 Very good understanding!";
    } else if (percentage >= 70) {
        return "Good Work! ✓ You've demonstrated solid knowledge!";
    } else if (percentage >= 60) {
        return "Not Bad! 📚 Keep studying to improve!";
    } else if (percentage >= 50) {
        return "Keep Trying! 💪 There's room for improvement!";
    } else {
        return "Need More Practice! 📖 Try again to improve your score!";
    }
}

// Restart Quiz
function restartQuiz() {
    initializeQuiz();
}

// Initialize quiz when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});

// Add Enter key support for submitting answers
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        if (!answered) {
            submitAnswer();
        } else if (currentQuestionIndex < quizQuestions.length - 1) {
            nextQuestion();
        }
    }
});
