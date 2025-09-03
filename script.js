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

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}


var loadedMessages = []

readTextFile("./charity_reasons_pl.json", function (text) {

    var data = JSON.parse(text);

    for (const [key, value] of Object.entries(data)) {
        loadedMessages.push(value)
    }

    populatePage()
});


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
    if (isNaN(idNum) || idNum < 1 || idNum > loadedMessages.length) return;
    
    const hearts = document.getElementsByClassName('heart-id');
    if (hearts[idNum - 1]) {
        hearts[idNum - 1].parentElement.classList.add('highlighted');
        hearts[idNum - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
function populatePage() {
    grid.innerHTML = Array.from({ length: loadedMessages.length }, (_, i) =>
        `<div class="heart" data-msg="${loadedMessages[i % loadedMessages.length]}"><span class="heart-id">${i + 1}</span></div>`
    ).join('');

    Array.from(document.getElementsByClassName('heart')).forEach(heart => {
        heart.addEventListener('click', function (e) {
            popupMessage.textContent = this.getAttribute('data-msg');
            popup.style.display = 'flex';
        });
    });

    highlightHeartById();
}

closePopup.onclick = function () {
    popup.style.display = 'none';
};

window.onclick = function (event) {
    if (event.target === popup) {
        popup.style.display = 'none';
    }
};
