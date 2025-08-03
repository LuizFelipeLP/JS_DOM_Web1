const config = {
    gridSize: 4,
    gameDuration: 30, //segundos
    colors: ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown'],
    pointsPerHit: 10,
    pointsPerMiss: -5
};

// Elementos do DOM
const startBtn = document.getElementById('startBtn');
const playAgainBtn = document.getElementById('playAgainBtn');
const colorGrid = document.getElementById('colorGrid');
const scoreElement = document.getElementById('score');
const timeElement = document.getElementById('time');
const targetColorElement = document.getElementById('targetColor');
const gameOverElement = document.getElementById('gameOver');
const finalScoreElement = document.getElementById('finalScore');
const playerNameInput = document.getElementById('playerName');

// Variáveis do jogo
let score = 0;
let timeLeft = 0;
let timer = null;
let targetColor = '';
let isGameRunning = false;

function initColorGrid() {
    colorGrid.innerHTML = '';
    colorGrid.style.gridTemplateColumns = `repeat(${config.gridSize}, 1fr)`;
    
    for (let i = 0; i < config.gridSize * config.gridSize; i++) {
        const colorSquare = document.createElement('div');
        colorSquare.className = 'color-square';
        colorSquare.addEventListener('click', handleColorClick);
        colorGrid.appendChild(colorSquare);
    }
}

function generateRandomColors() {
    const squares = document.querySelectorAll('.color-square');
    squares.forEach(square => {
        const randomColor = config.colors[Math.floor(Math.random() * config.colors.length)];
        square.style.backgroundColor = randomColor;
        square.dataset.color = randomColor;
    });
}

function setTargetColor() {
    targetColor = config.colors[Math.floor(Math.random() * config.colors.length)];
    targetColorElement.style.backgroundColor = targetColor;
    targetColorElement.textContent = targetColor;
}

function handleColorClick(e) {
    if (!isGameRunning) return;
    
    const clickedColor = e.target.dataset.color;
    
    if (clickedColor === targetColor) {
        score += config.pointsPerHit;
        scoreElement.textContent = score;
        generateRandomColors();
        setTargetColor();
    } else {
        score += config.pointsPerMiss;
        scoreElement.textContent = score;
    }
}

function startGame() {
    const playerName = playerNameInput.value.trim();
    if (!playerName) {
        alert('Por favor, digite seu nome!');
        return;
    }
    
    score = 0;
    timeLeft = config.gameDuration;
    isGameRunning = true;
    
    scoreElement.textContent = score;
    timeElement.textContent = timeLeft;
    
    initColorGrid();
    generateRandomColors();
    setTargetColor();
    
    document.querySelector('.game-controls').classList.add('hidden');
    gameOverElement.classList.add('hidden');
    
    timer = setInterval(() => {
        timeLeft--;
        timeElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame(playerName);
        }
    }, 1000);
}

function endGame(playerName) {
    clearInterval(timer);
    isGameRunning = false;
    
    finalScoreElement.textContent = `${playerName}, sua pontuação final foi: ${score}`;
    gameOverElement.classList.remove('hidden');
}

startBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', () => {
    document.querySelector('.game-controls').classList.remove('hidden');
    gameOverElement.classList.add('hidden');
});