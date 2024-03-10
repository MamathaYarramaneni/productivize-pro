chrome.alarms.create('pomodoroTimer', {
    periodInMinutes: 1 / 60
})

const audioNotification = () => {
    var yourSound = new Audio('./samsung.mp3');
    yourSound.play();
}

chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "pomodoroTimer") {
        chrome.storage.local.get(["timer", "isRunning"], (res) => {
            if (res.isRunning) {
                let timer = res.timer + 1;
                let isRunning = true;
                console.log(timer);
                if (timer === 60 * 25) {
                    // audioNotification();
                    this.registration.showNotification("Pomodoro Timer", {
                        body: "You've been productive for 25 minutes!",
                        icon: "logo.png"
                    });
                    timer = 0;
                    isRunning = false;
                }
                chrome.storage.local.set({
                    timer,
                    isRunning
                })
            }
        })
    }
})

chrome.storage.local.get(["timer", "isRunning"], (res) => {
    chrome.storage.local.set({
        timer: "timer" in res ? res.timer : 0,
        isRunning: "isRunning" in res === true ? res.isRunning : false,
    });
});
