const textDisplay = document.getElementById('text-display');
const textInput = document.getElementById('text-input');
const timerDisplay = document.getElementById('time');
const resultDisplay = document.getElementById('result');
const restartButton = document.getElementById('restart');

const sampleTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed is a useful skill for coding.",
    "Practice makes perfect.",
    "Never stop learning new things.",
    "A journey of a thousand miles begins with a single step."
];

let startTime, endTime;
let timerInterval;
let isGameActive = false;

// Function to start the game
function startGame() {
    if (isGameActive) return;

    isGameActive = true;
    textInput.value = '';
    textInput.disabled = false;
    resultDisplay.textContent = '';
    timerDisplay.textContent = '0';
    textDisplay.textContent = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];

    startTime = new Date();
    timerInterval = setInterval(updateTimer, 1000);
}

// Function to update the timer
function updateTimer() {
    const timeElapsed = Math.floor((new Date() - startTime) / 1000);
    timerDisplay.textContent = timeElapsed;
}

// Function to check the input text
function checkText() {
    const inputText = textInput.value;
    const originalText = textDisplay.textContent;

    if (inputText === originalText) {
        endGame();
    }
}

// Function to end the game
function endGame() {
    clearInterval(timerInterval);
    const timeTaken = Math.floor((new Date() - startTime) / 1000);
    const wordsPerMinute = Math.round((textDisplay.textContent.split(' ').length / timeTaken) * 60);
    resultDisplay.textContent = `You typed at a speed of ${wordsPerMinute} words per minute.`;
    textInput.disabled = true;
    isGameActive = false;
}

// Event listeners
textInput.addEventListener('input', checkText);
textInput.addEventListener('focus', startGame);
restartButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    startGame();
});
