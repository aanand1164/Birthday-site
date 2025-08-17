// --- Slideshow ---
let slideIndex = 0;
showSlides();

function showSlides() {
    const slides = document.getElementsByClassName("slide");
    for (let s of slides) s.style.display = "none";
    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;
    slides[slideIndex - 1].style.display = "block";
    setTimeout(showSlides, 2500);
}

// --- Music toggle ---
const audio = document.getElementById("bg-music");
const musicBtn = document.getElementById("music-toggle");
let musicPlaying = false;
musicBtn.onclick = () => {
    if (!musicPlaying) {
        audio.play();
        musicBtn.textContent = "🔊";
        musicPlaying = true;
    } else {
        audio.pause();
        musicBtn.textContent = "🔇";
        musicPlaying = false;
    }
};

// --- Password + Time Gate Logic ---
const openBtn = document.getElementById("open-letter-btn");
const passwordModal = document.getElementById("password-modal");
const passwordInput = document.getElementById("password-input");
const passwordError = document.getElementById("password-error");
const closePassword = document.getElementById("close-password");

const letterModal = document.getElementById("letter-modal");
const closeLetter = document.getElementById("close-letter");

const countdownText = document.getElementById("countdown");
const PRAISE_TEXT = "Hey! You actually guessed it! Proud of you smarty 😎";
const TAUNT_TEXT = "Well well well... can't even guess the password?\nFine, it's already 3:30 PM, so here's the key: Ivi-Fresca 😏";

const target = new Date("2025-08-18T15:30:00+05:30");
let countdownInterval = null;

// Countdown logic
function updateCountdown() {
    const now = new Date();
    const distance = target - now;
    if (distance <= 0) {
        countdownText.textContent = "Unlocked Time Reached!";
        return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    countdownText.textContent = `Time left: ${days}d ${hours}h ${minutes}m ${seconds}s`;
}

openBtn.onclick = () => {
    const now = new Date();
    if (now >= target) {
        alert(TAUNT_TEXT);
        letterModal.style.display = "block";
    } else {
        passwordModal.style.display = "block";
        updateCountdown();
        countdownInterval = setInterval(updateCountdown, 1000);
    }
};

document.getElementById("submit-password").onclick = () => {
    const pwd = passwordInput.value.trim().toLowerCase();
    if (pwd === "ivi-fresca") {
        clearInterval(countdownInterval);
        passwordModal.style.display = "none";
        alert(PRAISE_TEXT);
        letterModal.style.display = "block";
    } else {
        passwordError.style.display = "block";
    }
};

closePassword.onclick = () => {
    clearInterval(countdownInterval);
    passwordModal.style.display = "none";
};

closeLetter.onclick = () => letterModal.style.display = "none";

window.onclick = (event) => {
    if (event.target === passwordModal) {
        clearInterval(countdownInterval);
        passwordModal.style.display = "none";
    }
    if (event.target === letterModal) {
        letterModal.style.display = "none";
    }
};

window.addEventListener('load', () => {
    const music = document.getElementById('bg-music');
    music.play().catch(() => {
        // If browser blocks autoplay, nothing happens
        console.log("Autoplay blocked, user needs to click to start music");
    });
});
