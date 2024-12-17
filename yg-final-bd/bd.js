//  To-Do 
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("Utga oruulna uu");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Close (delete) button
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

//  Pomodoro
let timer;
let isStudy = true;
let timeRemaining = 1500; // Def 25 min

const studyTittle = document.getElementById('study');
const breakTittle = document.getElementById('break');


window.onload = () => {
    updateTimerDisplay();
    studyTittle.classList.add('active');
    flipCardSetup();
};

function start() {
    if (timer) return;

    document.getElementById('start').style.display = "none";
    document.getElementById('stop').style.display = "block";
    document.getElementById('reset').style.display = "block";

    timer = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            timer = null;
            switchSession();
        }
    }, 1000);
}

function stopTimer() {
    
    clearInterval(timer);
    timer = null;

    document.getElementById('start').style.display = "block";
    document.getElementById('stop').style.display = "none";
    document.getElementById('reset').style.display = "block";
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    timeRemaining = isStudy ? 1500 : 300; //25 es 5
    updateTimerDisplay();

    document.getElementById('start').style.display = "block";
    document.getElementById('stop').style.display = "none";
    document.getElementById('reset').style.display = "none";
}

function switchToStudy() {
    clearInterval(timer);
    timer = null;
    isStudy = true;
    timeRemaining = 1500; // 25 minutes
    updateTimerDisplay();

    studyTittle.classList.add('active');
    breakTittle.classList.remove('active');

    document.getElementById('start').style.display = "block";
    document.getElementById('stop').style.display = "none";
    document.getElementById('reset').style.display = "none";
}


function switchToBreak() {
    clearInterval(timer);
    timer = null;
    isStudy = false;
    timeRemaining = 300; // 5 minute
    updateTimerDisplay();

    breakTittle.classList.add('active');
    studyTittle.classList.remove('active');

    document.getElementById('start').style.display = "block";
    document.getElementById('stop').style.display = "none";
    document.getElementById('reset').style.display = "none";
}

function switchSession() {
    if (isStudy) {
        switchToBreak();
    } else {
        switchToStudy();
    }
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60).toString().padStart(2, '0');
    const seconds = (timeRemaining % 60).toString().padStart(2, '0');
    document.getElementById('minute').textContent = minutes;
    document.getElementById('second').textContent = seconds;
}


function flipCardSetup() {
    const flipCardInner = document.querySelector('.flip-card-inner');
    document.querySelector('.container').addEventListener('dblclick', () => {
        flipCardInner.classList.toggle('flipped');
    });
}
