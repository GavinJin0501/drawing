let dstX;   // x pos that ghost follows
let dstY;   // y pos that ghost follows
let winWidth;   // window width
let winHeight;  // window height
let ghostCenterX;   // ghost center x coordinate
let ghostCenterY;   // ghost center y coordinate
let ghostX = 0;  
let ghostY = 0;
const ghost = document.querySelector("#ghost");
const cloud1 = document.querySelector("#cloud1");
const cloud2 = document.querySelector("#cloud2");
let cloud2Pos= 400;
let speed1 = 2;
let speed2 = -2;
let cloud1Pos = 800;
let animation = requestAnimationFrame(follow);
function cloudMove() {
    if (cloud2Pos<100 || cloud2Pos>=600) {
        speed2 *= -1
    }
    if (cloud1Pos<=300 || cloud1Pos>=800) {
        speed1 *= -1
    }
    cloud1Pos += speed1;
    cloud2Pos += speed2;
    cloud1.style.left = cloud1Pos+ "px";
    cloud2.style.left = cloud2Pos + "px";
    requestAnimationFrame(cloudMove);
}
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
window.addEventListener("load", cloudMove);
window.addEventListener("resize", setWinSize);

window.addEventListener('pointermove', mouseInteraction);
window.addEventListener('pointerdown', mouseInteraction);
