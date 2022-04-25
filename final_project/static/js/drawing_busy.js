let winWidth;   // window width
let winHeight;  // window height
const ghostArr = [];
const ghostNum = 10;
const body = document.querySelector("body");

class Ghost {
    constructor() {
        // create svg element and append it to the body
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
        svg.class = "svgs";
        svg.id = "ghost";
        use.setAttribute("href", "./static/ghost.svg#svg2");
        svg.appendChild(use);
        body.appendChild(svg);
        this.element = svg;

        // set initial random position
        const p = Math.floor(Math.random() * 2);
        let rect = this.element.getBoundingClientRect();
        const rdY = Math.floor(Math.random() * (winHeight - rect.height));
        this.X = 0;
        this.Y = 0;
        this.speed = 6;
        if (p === 0) { // start form left
            this.direction = this.speed;
            this.element.style.left = -rect.width / 2;
            this.element.style.top = rdY;
            this.X = - rect.width / 2;
            this.Y = rdY;
        } else { // start form right
            this.direction = -this.speed;
            this.element.style.left = winWidth - rect.width / 2;
            this.element.style.top = rdY;
            this.X = winWidth - rect.width / 2;
            this.Y = rdY;
        }
        
        rect = this.element.getBoundingClientRect();
        this.centerX = rect.x + rect.width / 2;
        this.centerY = rect.y + rect.height / 2;
        this.dstX = 0;
        this.dstY = 0;

        requestAnimationFrame(() => this.walk());
    }

    walk() {
        const rect = this.element.getBoundingClientRect();
        this.X += this.direction;
        if (this.direction > 0 && this.X > winWidth) {
            this.X = - rect.width / 2;
        }

        if (this.direction < 0 && this.X < -rect.width) {
            this.X = winWidth - rect.width / 2;
        }
        this.element.style.left = this.X;

        requestAnimationFrame(() => this.walk());
    }

}


function setWinSize() {
    winWidth = window.innerWidth;
    winHeight = window.innerHeight;

    // init ghosts
    for (let i = 0; i < ghostNum; i++) {
        const g = new Ghost();
        ghostArr.push(g);
    }
}


window.addEventListener("load", setWinSize);
window.addEventListener("resize", setWinSize);