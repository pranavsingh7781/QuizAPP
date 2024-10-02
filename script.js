const quizData = [
    {
        question: "Which team has won the IPL title the most number of times?",
        a: "Mumbai Indians",
        b: "Chennai Super Kings",
        c: "Kolkata Knight Riders",
        d: "Royal Challengers Bangalore",
        correct: "b",
    },
    {
        question: "What does CSK stand for?",
        a: "Chennai Super Kings",
        b: "Chennai Sports Kings",
        c: "Chennai Super Kicks",
        d: "Chennai Sports Kings",
        correct: "a",
    },
    {
        question: "Who is the captain of the Mumbai Indians?",
        a: "Rohit Sharma",
        b: "MS Dhoni",
        c: "Virat Kohli",
        d: "Kane Williamson",
        correct: "a",
    },
    {
        question: "Which player has the most runs in IPL history?",
        a: "Virat Kohli",
        b: "Rohit Sharma",
        c: "Suresh Raina",
        d: "David Warner",
        correct: "a",
    },
    {
        question: "Which team is known as the 'Yellow Brigade'?",
        a: "Kolkata Knight Riders",
        b: "Sunrisers Hyderabad",
        c: "Chennai Super Kings",
        d: "Delhi Capitals",
        correct: "c",
    },
    {
        question: "What is the maximum number of players allowed in an IPL squad?",
        a: "25",
        b: "30",
        c: "24",
        d: "18",
        correct: "b",
    },
    {
        question: "Who won the IPL in 2020?",
        a: "Chennai Super Kings",
        b: "Mumbai Indians",
        c: "Delhi Capitals",
        d: "Sunrisers Hyderabad",
        correct: "b",
    },
    {
        question: "What is the name of the IPL trophy?",
        a: "IPL Cup",
        b: "Mahatma Gandhi Trophy",
        c: "Champions Trophy",
        d: "IPL Championship Trophy",
        correct: "d",
    },
    {
        question: "Who has the record for the highest individual score in an IPL match?",
        a: "Chris Gayle",
        b: "Brendon McCullum",
        c: "Rohit Sharma",
        d: "AB de Villiers",
        correct: "a",
    },
    {
        question: "Which city is home to the Delhi Capitals?",
        a: "Mumbai",
        b: "Delhi",
        c: "Bengaluru",
        d: "Hyderabad",
        correct: "b",
    },
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const timerEl = document.getElementById('timer');

let currentQuiz = 0;
let score = 0;
let timer;
const timeLimit = 30;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

    startTimer();
}

function startTimer() {
    let timeLeft = timeLimit;
    timerEl.innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerEl.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            showNextQuestion(); // Handle time up
        }
    }, 1000);
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function showNextQuestion() {
    currentQuiz++;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        showResults();
    }
}

function submitAnswer() {
    clearInterval(timer);
    const answer = getSelected();
    const correctAnswer = quizData[currentQuiz].correct;

    if (answer) {
        if (answer === correctAnswer) {
            score++;
        }
    }

    // Load next question
    showNextQuestion();
}

submitBtn.addEventListener('click', submitAnswer);

function showResults() {
    let resultHTML = `<h2>You answered ${score}/${quizData.length} questions correctly!</h2><h3>Correct Answers:</h3>`;
    quizData.forEach((questionData, index) => {
        resultHTML += `<p>Q${index + 1}: ${questionData.question} <br> Correct Answer: ${questionData[questionData.correct]}</p>`;
    });
    resultHTML += `<button onclick="location.reload()">Reload</button>`;
    
    quiz.innerHTML = resultHTML;
}
