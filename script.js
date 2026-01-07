// Variables chrono
let t = null;
let ms = 0, s = 0, mn = 0, h = 0;

// Stockage des laps
let laps = [];

// Références DOM
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const millisecondsEl = document.getElementById("milliseconds");
const lapsEl = document.getElementById("laps");

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");

const themeLink = document.getElementById("theme-style");
const themeButtons = document.querySelectorAll(".theme-btn");

// --- Chrono ---
function update_chrono() {
    ms += 1;
    if (ms >= 10) { ms = 0; s += 1; }
    if (s >= 60) { s = 0; mn += 1; }
    if (mn >= 60) { mn = 0; h += 1; }

    hoursEl.textContent = h.toString().padStart(2,'0');
    minutesEl.textContent = mn.toString().padStart(2,'0');
    secondsEl.textContent = s.toString().padStart(2,'0');
    millisecondsEl.textContent = ms;
}

// --- Actions ---
function start() {
    if (!t) {
        t = setInterval(update_chrono, 100);
        startBtn.disabled = true;
        lapBtn.disabled = false;
    }
}

function stop() {
    clearInterval(t);
    t = null;
    startBtn.disabled = false;
}

function reset() {
    stop();
    ms = 0; s = 0; mn = 0; h = 0;
    laps = [];

    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    millisecondsEl.textContent = "0";

    lapsEl.innerHTML = "";
    lapBtn.disabled = true;
}

function lap() {
    const lapTime = `${h.toString().padStart(2,'0')}:${mn.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}.${ms}`;
    laps.push(lapTime);

    const li = document.createElement("li");
    li.textContent = `Lap ${laps.length}: ${lapTime}`;
    lapsEl.appendChild(li);
}

// --- Keyboard shortcuts ---
window.addEventListener("keydown", (e) => {
    switch(e.code) {
        case "Enter": if (!t) start(); break;
        case "Space": stop(); e.preventDefault(); break;
        case "Backspace": reset(); e.preventDefault(); break;
        case "KeyL": if (!lapBtn.disabled) lap(); break;
    }
});

// --- Theme switch ---
themeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const theme = btn.dataset.theme;
        themeLink.href = `css/style-option-${theme}.css`;

        // Transition fluide
        document.body.style.transition = "all 0.4s ease";

        // Bouton actif
        themeButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
    });
});

// Initialiser le bouton actif au chargement (B = par défaut)
document.addEventListener("DOMContentLoaded", () => {
    const defaultBtn = document.querySelector('.theme-b');
    if (defaultBtn) defaultBtn.classList.add("active");
});

// --- Button clicks ---
startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);
