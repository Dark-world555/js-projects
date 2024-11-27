// script.js

let workDuration = 25 * 60; // 25 minutes in seconds
let breakDuration = 5 * 60;  // 5 minutes in seconds
let currentTime = workDuration;
let timer;
let isWorkTime = true;
let isRunning = false;

const timerDisplay = document.getElementById("timer-display");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");

// Load stored time on page load
document.addEventListener("DOMContentLoaded", () => {
    const storedTime = localStorage.getItem("currentTime");
    const storedMode = localStorage.getItem("isWorkTime");
    if (storedTime) {
        currentTime = parseInt(storedTime);
        isWorkTime = storedMode === "true";
        updateDisplay();
    }
});

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    currentTime = isWorkTime ? workDuration : breakDuration;
    updateDisplay();
}

function updateTimer() {
    currentTime--;
    updateDisplay();

    if (currentTime === 0) {
        isWorkTime = !isWorkTime;
        currentTime = isWorkTime ? workDuration : breakDuration;
        alert(isWorkTime ? "Time to focus!" : "Take a break!");
        updateDisplay();
    }
    // Store current state in localStorage
    localStorage.setItem("currentTime", currentTime);
    localStorage.setItem("isWorkTime", isWorkTime);
}

function updateDisplay() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Event Listeners
startButton.addEventListener("click", startTimer);
resetButton.addEventListener("click", resetTimer);
