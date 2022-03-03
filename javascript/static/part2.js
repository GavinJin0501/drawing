// DOM
const url = window.location.href;
const img = document.querySelector("img");
const background = document.querySelector("body");

// Global Variable
const PICS = ["coca-cola", "pepsi", "sprite"];
const imgPath = "./static/" + parseUrl(url) + ".png";
let winWidth;
let winHeight;
let hueBrowserRatio;
let lightnessBrowserRatio;

let posX = 0;
let posY = 0;
let speedX = getRandomInt(4, 7);
let speedY = getRandomInt(4, 7);
let animation = requestAnimationFrame(screenSaver);

img.src = imgPath;


// functions
function parseUrl(url) {
    if (!url.includes("?")) {
        return "coca-cola";
    }
    const uarr = url.split("?");
    const potential = uarr[uarr.length - 1].split("=");
    const ans = potential[potential.length - 1];

    if (PICS.includes(ans)) {
        return ans;
    }
    return "coca-cola";
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
  
function screenSaver() {

    animation = requestAnimationFrame(screenSaver);

    if (posX + speedX + 50 < 0 || posX + speedX + img.width - 50 > winWidth) {
        speedX = -1 * getRandomInt(4, 7) * Math.sign(speedX);
    }
    
    if (posY + speedY < 0 || posY + speedY + img.height > winHeight) {
        speedY = -1 * getRandomInt(4, 7) * Math.sign(speedY);
    }

    posX += speedX;
    posY += speedY;

    img.style.top = posY + "px";
    img.style.left = posX + "px";

    updateColor(posX, posY);
}

function updateColor(posX, posY) {
    const hue = Math.ceil(posX / hueBrowserRatio);
    const lightness = Math.ceil(posY / lightnessBrowserRatio);

    background.style.backgroundColor = `hsl(${hue}, 30%, ${lightness}%)`;
}

function setSize() {
    // reset the window size
    winHeight = window.innerHeight;
    winWidth = window.innerWidth;

    // reset the image size according to the window size
    const properSize = Math.floor(Math.min(winHeight, winWidth) / 4);
    img.style.width = properSize + "px";
    img.style.height = properSize + "px";

    // constrain the position of the image
    posX = Math.max(0, Math.min(posX, winWidth - img.width));
    posY = Math.max(0, Math.min(posY, winHeight - img.height));
}

function randomColor() {
    background.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%`;
}

function colorScale() {
    hueBrowserRatio = winWidth / 360;
    lightnessBrowserRatio = winHeight / 100;
}

// events
window.addEventListener("load", () => {
    setSize();
    randomColor();
    colorScale();
});

window.addEventListener("resize", () => {
    setSize();
    colorScale();
});
