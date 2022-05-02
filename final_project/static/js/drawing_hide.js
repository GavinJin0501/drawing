let dstX;   // x pos that ghost follows
let dstY;   // y pos that ghost follows
let winWidth;   // window width
let winHeight;  // window height
let ghostCenterX;   // ghost center x coordinate
let ghostCenterY;   // ghost center y coordinate
let ghostX = 0;  
let ghostY = 0;
let shipY = -50;
let speedY = 0.5;
const ghost = document.querySelector("#ghost");
const ship = document.querySelector("#ship");
let count = 0;


function setWinSize() {
    winWidth = window.innerWidth;
    winHeight = window.innerHeight;

    // randomly set the position of the ghost
    const rect = ghost.getBoundingClientRect();
    const rdX = Math.floor(Math.random() * (winWidth - rect.width));
    const rdY = Math.floor(Math.random() * (winHeight - rect.height));
    ghost.style.left = rdX;
    ghost.style.top = rdY;
    ghostX = rdX;
    ghostY = rdY;
    setSvgCenter();
}

function setSvgCenter() {
    const rect = ghost.getBoundingClientRect(); 
    ghostCenterX = rect.x + rect.width / 2;
    ghostCenterY = rect.y + rect.height / 2;
}

function hide() {
    const x_diff = dstX - ghostCenterX;
    const y_diff = dstY - ghostCenterY;

    if (Math.abs(x_diff) > 5 || Math.abs(y_diff) > 5) {
        if (Math.abs(x_diff) > 5) {
            ghostX += Math.sign(x_diff) * 3 * Math.cos(Math.atan(Math.abs(y_diff) / Math.abs(x_diff)));
        }
    
        if (Math.abs(y_diff) > 5) {
            ghostY += Math.sign(y_diff) * 3 * Math.sin(Math.atan(Math.abs(y_diff) / Math.abs(x_diff)));
        }
    
        ghost.style.left = ghostX + "px";
        ghost.style.top = ghostY + "px";
        setSvgCenter();

        requestAnimationFrame(hide);
    }
}
function moveShip(){
    requestAnimationFrame(moveShip);
    if (shipY<=-50||shipY>=70) {
        shipY = -50;
    }
    shipY =shipY+ speedY;
    ship.style.top = shipY + "vh";
}
function startHide() {
    const rect = ghost.getBoundingClientRect(); 
    dstX = Math.floor(Math.random() * (winWidth - rect.width));
    dstY = Math.floor(Math.random() * (winHeight - rect.height));
    requestAnimationFrame(hide);
}


window.addEventListener("load", setWinSize);
window.addEventListener("load", moveShip);
window.addEventListener("resize", setWinSize);

ghost.addEventListener("pointermove", startHide);
ghost.addEventListener("pointerdown", startHide);
