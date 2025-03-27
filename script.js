let timer;
let startTime;
let elapsedTime = 0;
let running = false;
let lapCount = 0;

const progressRing = document.querySelector('.progress-ring circle');
const radius = progressRing.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

// Set the initial properties
progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
progressRing.style.strokeDashoffset = circumference;

// Initialize with zeros
document.getElementById('hours').innerText = "00";
document.getElementById('minutes').innerText = "00";
document.getElementById('seconds').innerText = "00";
document.getElementById('milliseconds').innerText = "00";

function setProgress(percent) {
    const offset = circumference - (percent / 100 * circumference);
    progressRing.style.strokeDashoffset = offset;
}

function updateTime() {
    const now = Date.now() - startTime + elapsedTime;
    const hours = Math.floor(now / (1000 * 60 * 60));
    const minutes = Math.floor((now / (1000 * 60)) % 60);
    const seconds = Math.floor((now / 1000) % 60);
    const milliseconds = Math.floor((now % 1000) / 10);

    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    document.getElementById('milliseconds').innerText = milliseconds.toString().padStart(2, '0');

    // Calculate progress percentage for the 60-second cycle
    const totalSeconds = seconds + (milliseconds / 100);
    const percentComplete = (totalSeconds % 60) * (100 / 60);
    setProgress(percentComplete);
}

function startPause() {
    const startPauseBtn = document.getElementById('startPauseBtn');
    
    if (!running) {
        startTime = Date.now();
        timer = setInterval(updateTime, 10);
        running = true;
        startPauseBtn.textContent = 'Pause';
        startPauseBtn.classList.add('active');
    } else {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        running = false;
        startPauseBtn.textContent = 'Start';
        startPauseBtn.classList.remove('active');
    }
}

function reset() {
    clearInterval(timer);
    running = false;
    elapsedTime = 0;
    lapCount = 0;
    
    // Reset display to zeros
    document.getElementById('hours').innerText = "00";
    document.getElementById('minutes').innerText = "00";
    document.getElementById('seconds').innerText = "00";
    document.getElementById('milliseconds').innerText = "00";
    
    // Reset progress ring
    setProgress(0);
    
    document.getElementById('laps').innerHTML = "";
    document.getElementById('startPauseBtn').textContent = 'Start';
    document.getElementById('startPauseBtn').classList.remove('active');
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = `${document.getElementById('hours').innerText}:${document.getElementById('minutes').innerText}:${document.getElementById('seconds').innerText}.${document.getElementById('milliseconds').innerText}`;
        const lapElement = document.createElement('div');
        lapElement.className = 'lap-item';
        lapElement.innerHTML = `
            <span class="lap-number">Lap ${lapCount}</span>
            <span class="lap-time">${lapTime}</span>
        `;
        document.getElementById('laps').insertBefore(lapElement, document.getElementById('laps').firstChild);
    }
}

// Initialize the ring at 0%
setProgress(0);