const startTimerBtn = document.getElementById('start-btn');
const stopTimerBtn = document.getElementById('stop-btn');
const resetTimerBtn = document.getElementById('reset-btn');

const updateTime = () => {
    chrome.storage.local.get(["timer"], (res) => {
        const time = document.getElementById("timer");
        const minutes = `${25 - Math.ceil(res.timer / 60)}`.padStart(2, '0');
        let seconds = "00";
        if ((res.timer % 60) != 0) {
            seconds = `${60 - (res.timer % 60)}`.padStart(2, '0');
        }
        time.textContent = `${minutes}:${seconds}`;
    });
};

updateTime();
setInterval(updateTime, 1000);

startTimerBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        isRunning: true
    });
});

stopTimerBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        isRunning: false
    });
});

resetTimerBtn.addEventListener("click", () => {
    chrome.storage.local.set({
        timer: 0,
        isRunning: false
    });
});