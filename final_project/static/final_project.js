let dstX;   // x pos that ghost follows
let dstY;   // y pos that ghost follows
let winWidth;   // window width
let winHeight;  // window height
let ghostCenterX;   // ghost center x coordinate
let ghostCenterY;   // ghost center y coordinate
let ghostX = 0;  
let ghostY = 0;
const ghost = document.querySelector("#ghost");
let animation = requestAnimationFrame(follow);


function follow() {
    animation = requestAnimationFrame(follow);

    // y_diff / x_diff
    const x_diff = dstX - ghostCenterX;
    const y_diff = dstY - ghostCenterY;

    if (Math.abs(x_diff) > 5) {
        ghostX += Math.sign(x_diff) * 6 * Math.cos(Math.atan(Math.abs(y_diff) / Math.abs(x_diff)));
    }

    if (Math.abs(y_diff) > 5) {
        ghostY += Math.sign(y_diff) * 6 * Math.sin(Math.atan(Math.abs(y_diff) / Math.abs(x_diff)));
    }

    // if (ghostCenterX - dstX > 5) {
    //     ghostX -= 4; 
    // } else if (dstX - ghostCenterX > 5) {
    //     ghostX += 4;
    // }

    // if (ghostCenterY - dstY > 5) {
    //     ghostY -= 4; 
    // } else if (dstY - ghostCenterY > 5) {
    //     ghostY += 4;
    // }

    ghost.style.left = ghostX + "px";
    ghost.style.top = ghostY + "px";
    setSvgCenter();
}

function setSvgCenter() {
    const rect = ghost.getBoundingClientRect(); 
    ghostCenterX = rect.x + rect.width / 2;
    ghostCenterY = rect.y + rect.height / 2;
}

function setWinSize() {
    winWidth = window.innerWidth;
    winHeight = window.innerHeight;
    setSvgCenter();
}

function mouseInteraction(evt) {
    dstX = evt.clientX;
    dstY = evt.clientY;
}


window.addEventListener("load", setWinSize);
window.addEventListener("resize", setWinSize);

window.addEventListener('pointermove', mouseInteraction);
window.addEventListener('pointerdown', mouseInteraction);
