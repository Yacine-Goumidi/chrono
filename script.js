// --- Variables chrono ---
let timer = null;
let ms = 0, s = 0, mn = 0, h = 0;

// --- Stockage des laps ---
let laps = [];

// --- Références DOM ---
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

// --- Chrono update ---
function updateChrono() {
    ms++;
    if (ms >= 10) { ms = 0; s++; }
    if (s >= 60) { s = 0; mn++; }
    if (mn >= 60) { mn = 0; h++; }

    hoursEl.textContent = h.toString().padStart(2, '0');
    minutesEl.textContent = mn.toString().padStart(2, '0');
    secondsEl.textContent = s.toString().padStart(2, '0');
    millisecondsEl.textContent = ms;
}

// --- Actions ---
function start() {
    if (!timer) {
        timer = setInterval(updateChrono, 100);
        startBtn.disabled = true;
        lapBtn.disabled = false;
    }
}

function stop() {
    clearInterval(timer);
    timer = null;
    startBtn.disabled = false;
}

function reset() {
    stop();
    ms = s = mn = h = 0;
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
    const li = document.createElement("li");
    li.textContent = `Lap ${laps.length + 1}: ${lapTime}`;
    lapsEl.appendChild(li);
    laps.push(lapTime);
}

// --- Keyboard shortcuts ---
window.addEventListener("keydown", (e) => {
    switch(e.code) {
        case "Enter": if (!timer) start(); break;
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

        // Active visuellement le bouton
        themeButtons.forEach(b => b.dataset.active = "");
        btn.dataset.active = "true";

        document.body.style.transition = "all 0.4s ease";
    });
});

// --- Button clicks ---
startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);

// --- Set default theme A on load ---
window.addEventListener("DOMContentLoaded", () => {
    lapBtn.disabled = true; // désactive lap au départ
    const defaultBtn = document.querySelector(".theme-btn[data-theme='a']");
    if(defaultBtn) defaultBtn.click();
});
