// Info icon popup logic
const infoIcon = document.getElementById('infoIcon');
const infoPopup = document.getElementById('infoPopup');
const closeInfoPopup = document.getElementById('closeInfoPopup');

if (infoIcon && infoPopup && closeInfoPopup) {
    infoIcon.onclick = function () {
        infoPopup.style.display = 'flex';
    };
    closeInfoPopup.onclick = function () {
        infoPopup.style.display = 'none';
    };
    window.addEventListener('click', function (event) {
        if (event.target === infoPopup) {
            infoPopup.style.display = 'none';
        }
    });
}
// Number of hearts in the grid
const HEART_COUNT = 100;
const messages = [
    "Very long statement that one might give for some reason, idk why but some people are like that, this is it the very long message. In this message you can add many thins",
    "Stay strong! 💪",
    "Spread kindness! 🌸",
    "Shine bright! ✨",
    "You matter! 💖",
    "Keep smiling! 😊",
    "Dream big! 🌈",
    "Be yourself! 🦄",
    "Hugs for you! 🤗",
    "You rock! 🤘",
    "Believe in magic! 🪄",
    "Cherish today! 🌞",
    "Peace & love! ☮️",
    "You inspire! 🌟",
    "Never give up! 🏆",
    "Joy is yours! 🎉",
    "You are enough! 🫶",
    "Follow your heart! 💓",
    "Grateful for you! 🙏",
    "You light up lives! 🔆",
    "Stay golden! 🏅",
    "Brave soul! 🦁",
    "Hope is here! 🕊️",
    "Love wins! 🏳️‍🌈"
];

const grid = document.getElementById('heartGrid');
const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popupMessage');
const closePopup = document.getElementById('closePopup');


// Highlight heart by id from URL param
function getUrlParam(name) {
    const url = new URL(window.location.href);
    return url.searchParams.get(name);
}

function highlightHeartById() {
    const idParam = getUrlParam('id');
    if (!idParam) return;
    const idNum = parseInt(idParam, 10);
    if (isNaN(idNum) || idNum < 1 || idNum > HEART_COUNT) return;
    const heart = document.querySelector(`.heart-id`);
    const hearts = document.getElementsByClassName('heart-id');
    if (hearts[idNum - 1]) {
        hearts[idNum - 1].parentElement.classList.add('highlighted');
        hearts[idNum - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// ...existing code...
// Generate hearts
grid.innerHTML = Array.from({ length: HEART_COUNT }, (_, i) =>
    `<div class="heart" data-msg="${messages[i % messages.length]}"><span class="heart-id">${i + 1}</span></div>`
).join('');

Array.from(document.getElementsByClassName('heart')).forEach(heart => {
    heart.addEventListener('click', function (e) {
        popupMessage.textContent = this.getAttribute('data-msg');
        popup.style.display = 'flex';
    });
});

highlightHeartById();

closePopup.onclick = function () {
    popup.style.display = 'none';
};

window.onclick = function (event) {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
};
