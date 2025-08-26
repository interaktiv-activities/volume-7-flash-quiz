// The following variables below are all the sound variables and mute/unmute fucntions 
let backgroundMusic = new Audio();
let portalEnterSound = new Audio();
let portalExitSound = new Audio();

backgroundMusic.src = "sounds/bg-music.mp3";
portalEnterSound.src = "sounds/warp-entrance.mp3";
portalExitSound.src = "sounds/warp-exit.mp3";
let backgroundMusicStatus = 0;
let backgroundMusicInterval;

function playBackgroundMusic() {
    backgroundMusic.play();
    if (backgroundMusicStatus == 1) {
        backgroundMusic.volume = 0;
    } else {
        backgroundMusic.volume = 1;
    }
}

function muteBackgroundMusic() {
    const muteBtnImg = document.getElementById("mute-btn-img");
    if (backgroundMusicStatus == 0) {
        muteBtnImg.setAttribute("src", "assets/HEADER/mute.png");
        backgroundMusic.volume = 0;
        backgroundMusicStatus++;
    } else {
        muteBtnImg.setAttribute("src", "assets/HEADER/unmute.png");
        backgroundMusic.volume = 1;
        backgroundMusicStatus--;
    }
}

document.getElementById("mute-header-btn").addEventListener("click", muteBackgroundMusic)
//END HERE


// The following lines of codes are for the start animation (click to start)
document.addEventListener('click', () => {
    const portal = document.getElementById('portal');
    const burst = document.getElementById('portal-burst');

    void burst.offsetWidth;
    
    burst.classList.add('expand');
    portal.classList.add('show');

    setTimeout(() => {
    portalEnterSound.play();
    document.getElementById('start-title').style.opacity = '0';
    document.getElementById('start-header').style.opacity = '0';
    document.getElementById('bottom-ct').style.bottom = '-80px';
    document.getElementById('top-ct').style.top = '-80px';
    }, 0);

    setTimeout(() => {
        portal.classList.add('zoom');
    }, 600);

    setTimeout(() => {
        portalExitSound.play();
        document.getElementById('background-img').style.opacity = '0';
        document.getElementById('bottom-ct').style.bottom = '-480px';
        document.getElementById('top-ct').style.top = '-480px';
        portal.classList.add('shrink');
    }, 1900);

    setTimeout(() => {
        document.getElementById('background-img').style.opacity = '0';
    }, 2600);

    setTimeout(() => {
        hideStartScreen();
        startCountdown();
        changeDisplay();
        burst.classList.remove('expand');
        portal.classList.remove('show', 'zoom', 'shrink');
    }, 2600);
}, { once: true });
//END HERE


// The following variables below are all the timer fucntions 
let timer = 30;
let timeRemaining = timer;

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Function to start the countdown
function startCountdown() {
    const countdownInterval = setInterval(() => {
        timeRemaining--;

        if (timeRemaining < 0) {
            clearInterval(countdownInterval);
            if (roundIndex <= 8) {
                roundIndex++;
                changeDisplay();
                startCountdown();
            } else {
                endGame();
            }
            return;
        }

        updateTimerDisplay();
    }, 1000);
}
//END HERE


// The following lines of codes include all of the functions and variables needed for you to transition from the start screen to the game board
let startScreenTimer;

function hideStartScreen() {
    document.getElementById("start-screen").style.display = "none";
    playBackgroundMusic();
    backgroundMusicInterval = setInterval(playBackgroundMusic, 120000);
    clearInterval(startScreenTimer);
}
//END HERE

// The following lines of codes hides all the header and gameboard elements, and shows the end message
function endGame(){
    const portal = document.getElementById('portal2');
    
    portal.classList.add('show');

    scoreCounter
    document.getElementById("game-board").style.display = "none"
    document.getElementById("header").style.display = "none"
    clearInterval(backgroundMusicInterval)
    backgroundMusic.volume = 0
    if (scoreCounter >= 7){
        document.getElementById("pass-end-screen").style.display = "flex"

        const scrambled = "REVTVElOWQ==";
        const secretCode = atob(scrambled);

        const secretMessage = document.getElementById("secret-message");
        if (secretMessage) {
            secretMessage.innerHTML = "SECRET MESSAGE: <b>" 
                + secretCode + "</b>.";
        }

    } else {
        document.getElementById("fail-end-screen").style.display = "flex"
    }
}

// FAIL SCREEN PORTAL RESET
document.addEventListener("DOMContentLoaded", () => {
    const resetPortal = document.getElementById("portal-reset");
    if (resetPortal) {
        resetPortal.addEventListener("click", () => {
            location.reload();
        });
    }
});
// END HERE

// QUESTION BANK (now 8 questions total)
let questionBank =[
    [
        ["Benilde Central Student Government", false],
        ["Center for Social Action", true],
        ["Student Involvement Office", false],
        ["Office of Student Life", false],
        "What is the central resource office for community engagement in Benilde?"
    ],
    [
        ["Special Interest Cluster", false],
        ["Student Artist-Groups", false],
        ["Volunteer/Service Recognized Groups", false],
        ["Student Journalists", true],
        "This cluster of organizations is supervised by the Student Publications Unit (SPU)."
    ],
    [
        ["SROP", false],
        ["SPOT", false],
        ["BDA", true],
        ["BDV", false],
        "Which organization represents and empowers Deaf and hard-of-hearing Benildeans?"
    ],
    [
        ["Theater Acting and Stage Production", false],
        ["Focuses on Animation, Motion Graphics, and Digital Arts", true],
        ["Music Composition and Performance", false],
        ["Sports Management and Athletic Training Programs", false],
        "What does Animotion focus on?"
    ],
    [
        ["Travelers in Progress", true],
        ["Technologists in Practice", false],
        ["Tourism Resource Initiative Program", false],
        ["Training & Recreation in Progress", false],
        "What does TRIP stand for in the SHRIM cluster?"
    ],
    [
        ["Greenergy", false],
        ["SPOT", false],
        ["DULAANG FILIPINO", true],
        ["BIYAYA", false],
        "Which student-led organization in Benilde showcases Filipino artistry and culture through theater productions and performances?"
    ],
    [
        ["CeSG", false],
        ["BeSG", true],
        ["CSG", false],
        ["BSG", false],
        "What is the official student government body of Benilde?"
    ],
    [
        ["Academic Support Volunteer Peer Tutors", true],
        ["Tutor Formation Program", false],
        ["CSA", false],
        ["Peer Power", false],
        "What group offers peer academic support through tutoring?"
    ]
]

// VARIABLES
const choiceButtonA = document.getElementById("answer-txt-1")
const choiceButtonB = document.getElementById("answer-txt-2")
const choiceButtonC = document.getElementById("answer-txt-3")
const choiceButtonD = document.getElementById("answer-txt-4")

let questionPrompt = document.getElementById("question")
let scoreDisplay = document.getElementById("score")

let scoreCounter = 0
let roundIndex = 0

// GAME FUNCTIONS PROPER
function startGame(){
    hideStartScreen()
    changeDisplay()
}

function changeDisplay(){
    choiceButtonA.innerHTML = questionBank[roundIndex][0][0]
    choiceButtonB.innerHTML = questionBank[roundIndex][1][0]
    choiceButtonC.innerHTML = questionBank[roundIndex][2][0]
    choiceButtonD.innerHTML = questionBank[roundIndex][3][0]
    questionPrompt.innerHTML = questionBank[roundIndex][4]

    scoreDisplay.innerHTML = "SCORE: " + scoreCounter
}

// Unified choice handler
function handleChoice(choiceIndex){
    if (questionBank[roundIndex][choiceIndex][1] === true){
        scoreCounter++
    }

    roundIndex++

    if (roundIndex >= questionBank.length){
        endGame()
    } else {
        changeDisplay()
    }
}

// Hook up the buttons
document.getElementById("answer-btn-1").addEventListener("click", () => handleChoice(0))
document.getElementById("answer-btn-2").addEventListener("click", () => handleChoice(1))
document.getElementById("answer-btn-3").addEventListener("click", () => handleChoice(2))
document.getElementById("answer-btn-4").addEventListener("click", () => handleChoice(3))
