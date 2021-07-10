
let days = 0;
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let countingMode = false;
let timeCount; //Amount of milliseconds the clock has been running for(adds stop time - start time while clock is running)
let startTime; //Time since epoch of when start button was last pressed
let stopTime; // Measures urrent time since epoch(in ms) while clock is running, then pauses when clock pauses
let stopQueued = false;
let splitQueued = false;
let Interval;
let buttonStartStop = document.getElementById("start-stop-button");
let buttonResetSplit = document.getElementById("reset-split-button");
let timerText = document.getElementById("timer");
let splitBox = document.getElementById("split-box");
let newSplit;
let splitCount = 0;

buttonStartStop.onclick = () => {
    // For when you press the button to pause
    if (countingMode){
        buttonStartStop.textContent = 'Start';
        buttonResetSplit.textContent = 'Reset';
        buttonStartStop.classList.remove("start-toggled");
        countingMode = false;
        clearInterval(Interval);
        // For when you press the button to start/unpause
    } else {
        buttonStartStop.textContent = 'Stop';
        buttonResetSplit.textContent = 'Split';
        buttonStartStop.className = "start-toggled";
        countingMode = true;
        //timeCount stores the amount of time the clock has run for, so it starts at 0
        // but then will 
        timeCount = stopTime + timeCount - startTime || 0; 
        startTime = Date.now();
        clearInterval(Interval);
        Interval = setInterval(countTimer,1);

    }

    
};

buttonResetSplit.onclick = () => {
    // For when you press the button to pause
    if (countingMode){
        newSplit = document.createElement("P");
        splitCount++;
        splitText = document.createTextNode(splitCount + ". " + updateTime(false));
        newSplit.appendChild(splitText);
        newSplit.className = "split-child";
        splitBox.appendChild(newSplit);
    } else {
        timeCount = 0;
        startTime = undefined;
        stopTime = undefined;
        timerText.textContent = updateTime(true);
        while(splitBox.firstChild){
            splitBox.removeChild(splitBox.firstChild);
        }

    }
}


function countTimer() {
    stopTime = Date.now();
    let timeInMillisecond = stopTime + timeCount - startTime
    let timeInSeconds = Math.floor(timeInMillisecond/1000);
    let timeInMinutes = Math.floor(timeInSeconds/60);
    let timeInHours = Math.floor(timeInMinutes/60);
    let timeInDays = Math.floor(timeInHours/24);
    milliseconds = timeInMillisecond - timeInSeconds*1000;
    seconds = timeInSeconds - timeInMinutes*60;
    minutes = timeInMinutes - timeInHours*60;
    hours = timeInHours - timeInDays*24;
    days = timeInDays;
    timerText.textContent = updateTime(false);
}



function getUnitLength(unit){
    let length = Math.floor(Math.log10(unit)) + 1;
    if (length == Number.NEGATIVE_INFINITY){
        return 1;
    } else{
        return length;
    }
}

function setMinDigits(value, minDigits){
    unitLength = getUnitLength(value);
    if (unitLength < minDigits){
        valueAsString = String(value);
        for(let i = 0;i<(minDigits-unitLength);i++){
            valueAsString = "0" + valueAsString;
        }
        return valueAsString;
    }
    return value;
}

function updateTime(resetTimer){
    
    if (resetTimer){
        return "00:00:00:00.000";
    }
    return `${setMinDigits(days, 2)}:${setMinDigits(hours, 2)}:${setMinDigits(minutes, 2)}:${setMinDigits(seconds, 2)}.${setMinDigits(milliseconds, 3)}`;
}

timerText.textContent = updateTime(true);
