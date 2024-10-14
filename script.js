const allQuestions = [
    {
        question: "¿Cuál es el río más largo del mundo?",
        options: ["Amazonas", "Nilo", "Yangtsé", "Misisipi"],
        correctAnswer: 1
    },
    {
        question: "¿En qué año comenzó la Primera Guerra Mundial?",
        options: ["1914", "1916", "1918", "1920"],
        correctAnswer: 0
    },
    {
        question: "¿Cuál es el planeta más grande del sistema solar?",
        options: ["Tierra", "Marte", "Júpiter", "Saturno"],
        correctAnswer: 2
    },
    {
        question: "¿Quién pintó La Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Miguel Ángel"],
        correctAnswer: 2
    },
    {
        question: "¿Cuál es el elemento químico más abundante en la Tierra?",
        options: ["Oxígeno", "Carbono", "Hierro", "Silicio"],
        correctAnswer: 0
    },
    {
        question: "¿En qué año se fundó la ONU?",
        options: ["1945", "1950", "1955", "1960"],
        correctAnswer: 0
    },
    {
        question: "¿Cuál es la capital de Australia?",
        options: ["Sídney", "Melbourne", "Brisbane", "Canberra"],
        correctAnswer: 3
    },
    {
        question: "¿Quién escribió 'Cien años de soledad'?",
        options: ["Jorge Luis Borges", "Gabriel García Márquez", "Mario Vargas Llosa", "Julio Cortázar"],
        correctAnswer: 1
    },
    {
        question: "¿Cuál es el océano más grande?",
        options: ["Atlántico", "Índico", "Ártico", "Pacífico"],
        correctAnswer: 3
    },
    {
        question: "¿En qué año llegó el hombre a la Luna?",
        options: ["1965", "1969", "1972", "1975"],
        correctAnswer: 1
    },
    {
        question: "¿Cuál es el animal terrestre más rápido?",
        options: ["León", "Guepardo", "Gacela", "Avestruz"],
        correctAnswer: 1
    },
    {
        question: "¿Quién fue el primer presidente de Estados Unidos?",
        options: ["Thomas Jefferson", "John Adams", "George Washington", "Benjamin Franklin"],
        correctAnswer: 2
    },
    {
        question: "¿Cuál es la montaña más alta del mundo?",
        options: ["K2", "Kangchenjunga", "Monte Everest", "Lhotse"],
        correctAnswer: 2
    },
    {
        question: "¿En qué país se encuentra la Torre Eiffel?",
        options: ["Italia", "España", "Alemania", "Francia"],
        correctAnswer: 3
    },
    {
        question: "¿Cuál es el hueso más largo del cuerpo humano?",
        options: ["Fémur", "Húmero", "Tibia", "Radio"],
        correctAnswer: 0
    },
    {
        question: "¿Quién escribió 'Romeo y Julieta'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: 1
    },
    {
        question: "¿Cuál es el metal más caro del mundo?",
        options: ["Oro", "Platino", "Rodio", "Paladio"],
        correctAnswer: 2
    },
    {
        question: "¿En qué año cayó el Muro de Berlín?",
        options: ["1987", "1989", "1991", "1993"],
        correctAnswer: 1
    },
    {
        question: "¿Cuál es el país más pequeño del mundo?",
        options: ["Mónaco", "San Marino", "Liechtenstein", "Ciudad del Vaticano"],
        correctAnswer: 3
    },
    {
        question: "¿Quién pintó 'La noche estrellada'?",
        options: ["Claude Monet", "Salvador Dalí", "Vincent van Gogh", "Pablo Picasso"],
        correctAnswer: 2
    }
];

let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft;
let players = [];

const startScreen = document.getElementById('startScreen');
const questionScreen = document.getElementById('questionScreen');
const endScreen = document.getElementById('endScreen');
const playerNameInput = document.getElementById('playerName');
const startButton = document.getElementById('startButton');
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const nextButton = document.getElementById('nextButton');
const finalScoreElement = document.getElementById('finalScore');
const leaderboardElement = document.getElementById('leaderboard');
const playAgainButton = document.getElementById('playAgainButton');

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', nextQuestion);
playAgainButton.addEventListener('click', resetGame);

document.addEventListener('DOMContentLoaded', () => {
    startScreen.classList.add('active');
});

function startGame() {
    const playerName = playerNameInput.value.trim();
    if (playerName === '') return;

    currentQuestions = shuffleArray(allQuestions).slice(0, 5);
    currentQuestionIndex = 0;
    score = 0;

    startScreen.classList.remove('active');
    questionScreen.classList.add('active');
    endScreen.classList.remove('active');

    displayQuestion();
}

function displayQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => selectAnswer(index));
        optionsElement.appendChild(button);
    });

    nextButton.style.display = 'none';
    scoreElement.textContent = `Puntuación: ${score}`;
    startTimer();
}

function startTimer() {
    timeLeft = 5;
    updateTimerDisplay();
    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        if (timeLeft === 0) {
            clearInterval(timer);
            showCorrectAnswer();
        }
    }, 1000);
}

function updateTimerDisplay() {
    timerElement.textContent = `Tiempo: ${timeLeft}s`;
}

function selectAnswer(index) {
    clearInterval(timer);
    const options = optionsElement.children;
    for (let i = 0; i < options.length; i++) {
        options[i].disabled = true;
        if (i === currentQuestions[currentQuestionIndex].correctAnswer) {
            options[i].classList.add('correct');
        } else if (i === index) {
            options[i].classList.add('incorrect');
        }
    }

    if (index === currentQuestions[currentQuestionIndex].correctAnswer) {
        score++;
        scoreElement.textContent = `Puntuación: ${score}`;
        showConfetti();
    }

    nextButton.style.display = 'block';
}

function showCorrectAnswer() {
    const options = optionsElement.children;
    for (let i = 0; i < options.length; i++) {
        options[i].disabled = true;
        if (i === currentQuestions[currentQuestionIndex].correctAnswer) {
            options[i].classList.add('correct');
        }
    }
    nextButton.style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuestions.length) {
        displayQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    questionScreen.classList.remove('active');
    endScreen.classList.add('active');

    const playerName = playerNameInput.value.trim();
    players.push({ name: playerName, score: score });
    players.sort((a, b) => b.score - a.score);

    finalScoreElement.textContent = `Tu puntuación final: ${score}`;
    updateLeaderboard();
}

function updateLeaderboard() {
    const tbody = leaderboardElement.querySelector('tbody');
    tbody.innerHTML = '';
    players.forEach(player => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = player.name;
        row.insertCell(1).textContent = player.score;
    });
}

function resetGame() {
    playerNameInput.value = '';
    startScreen.classList.add('active');
    endScreen.classList.remove('active');
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function showConfetti() {
    const confettiCount = 200;
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-5vh';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '1000';
        document.body.appendChild(confetti);

        const animation = confetti.animate(
            [
                { transform: 'translate3d(0, 0, 0)', opacity: 1 },
                { transform: `translate3d(${Math.random() * 100 - 50}px, 100vh, 0)`, opacity: 0 }
            ],
            {
                duration: Math.random() * 1000 + 1000,
                easing: 'cubic-bezier(0, .9, .57, 1)',
                delay: Math.random() * 500
            }
        );

        animation.onfinish = () => confetti.remove();
    }
}