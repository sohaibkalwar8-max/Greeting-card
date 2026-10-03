
/* =====================================
   1. SELECT ELEMENTS
===================================== */

const scene = document.getElementById("envelopeScene");
const openCard = document.getElementById("openCard");
const openBtn = document.getElementById("openBtn");
const resetBtn = document.getElementById("resetBtn");
const hint = document.getElementById("interactionHint");

const recipientInput = document.getElementById("recipientInput");
const senderInput = document.getElementById("senderInput");
const messageInput = document.getElementById("messageInput");

const letterName = document.getElementById("letterName");
const letterSender = document.getElementById("letterSender");
const letterMessage = document.getElementById("letterMessage");

const updateBtn = document.getElementById("updateBtn");
const updateStatus = document.getElementById("updateStatus");
const characterCount = document.getElementById("characterCount");

const effectsLayer = document.getElementById("effectsLayer");
const starsContainer = document.getElementById("stars");


/* =====================================
   2. DEFAULT GREETING
===================================== */

const defaultGreeting = {
    recipient: "Someone Special",
    sender: "Someone who cares",
    message:
        "May your days be filled with little joys, beautiful memories, and people who make your heart feel at home."
};

let isOpen = false;
let effectsPlayed = false;


/* =====================================
   3. UPDATE THE GREETING
===================================== */

function updateGreeting() {

    const recipient =
        recipientInput.value.trim() || defaultGreeting.recipient;

    const sender =
        senderInput.value.trim() || defaultGreeting.sender;

    const message =
        messageInput.value.trim() || defaultGreeting.message;

    letterName.textContent = recipient;
    letterSender.textContent = sender;
    letterMessage.textContent = message;

    updateStatus.textContent = "Your greeting has been updated.";

    updateCharacterCount();

}


/* =====================================
   4. CHARACTER COUNTER
===================================== */

function updateCharacterCount() {

    characterCount.textContent =
        `${messageInput.value.length} / 350`;

}

messageInput.addEventListener("input", updateCharacterCount);

updateBtn.addEventListener("click", updateGreeting);


/* =====================================
   5. OPEN THE ENVELOPE
===================================== */

function openGreeting() {

    if (isOpen) {
        return;
    }

    isOpen = true;

    scene.classList.add("opened");

    openCard.setAttribute("aria-expanded", "true");

    openBtn.innerHTML = 'Card Opened <span>♥</span>';

    openBtn.disabled = true;

    hint.textContent = "A little message, made just for you.";

    if (!effectsPlayed) {
        createCelebration();
        effectsPlayed = true;
    }

}


/* =====================================
   6. OPEN BUTTONS
===================================== */

openCard.addEventListener("click", openGreeting);

openBtn.addEventListener("click", openGreeting);


/* =====================================
   7. RESET THE CARD
===================================== */

function resetGreeting() {

    isOpen = false;
    effectsPlayed = false;

    scene.classList.remove("opened");

    openCard.setAttribute("aria-expanded", "false");

    openBtn.innerHTML = 'Open Your Card <span>↗</span>';

    openBtn.disabled = false;

    hint.innerHTML =
        '<span>↗</span> Tap the heart to open your card';

    effectsLayer.replaceChildren();

    updateStatus.textContent = "";

    // Keep the personalized names and message.
    // Reset only the envelope's open/closed state.

}

resetBtn.addEventListener("click", resetGreeting);


/* =====================================
   8. CREATE BACKGROUND STARS
===================================== */

function createStars() {

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 38; i++) {

        const star = document.createElement("span");

        star.className = "star";

        star.textContent = Math.random() > 0.5 ? "✦" : "·";

        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;

        star.style.fontSize =
            `${8 + Math.random() * 9}px`;

        star.style.animationDelay =
            `${Math.random() * 4}s`;

        star.style.animationDuration =
            `${2 + Math.random() * 4}s`;

        fragment.appendChild(star);

    }

    starsContainer.appendChild(fragment);

}


/* =====================================
   9. FLOATING HEARTS & SPARKLES
===================================== */

function createCelebration() {

    const symbols = ["♥", "♡", "✦", "✧", "✿", "·"];

    const colors = [
        "#ff91bd",
        "#d1b8ff",
        "#f2d49b",
        "#ffffff"
    ];

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 32; i++) {

        const particle = document.createElement("span");

        particle.className = "particle";

        particle.textContent =
            symbols[Math.floor(Math.random() * symbols.length)];

        particle.style.left = `${Math.random() * 100}%`;

        particle.style.color =
            colors[Math.floor(Math.random() * colors.length)];

        particle.style.fontSize =
            `${12 + Math.random() * 16}px`;

        particle.style.setProperty(
            "--duration",
            `${3 + Math.random() * 3}s`
        );

        particle.style.setProperty(
            "--drift",
            `${Math.random() * 140 - 70}px`
        );

        particle.style.setProperty(
            "--rotation",
            `${Math.random() * 360}deg`
        );

        particle.addEventListener("animationend", () => {
            particle.remove();
        }, { once: true });

        fragment.appendChild(particle);

    }

    effectsLayer.appendChild(fragment);

}


/* =====================================
   10. INITIALIZE
===================================== */

document.getElementById("year").textContent =
    new Date().getFullYear();

createStars();

updateCharacterCount();

updateGreeting();
