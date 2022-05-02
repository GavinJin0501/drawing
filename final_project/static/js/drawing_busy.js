let winWidth;   // window width
let winHeight;  // window height
const ghostArr = [];
const ghostNum = 10;
const body = document.querySelector("body");
let number = 3;
class Ghost {
    constructor() {
        // create svg element and append it to the body
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const use = document.createElementNS("http://www.w3.org/2000/svg", "use");
        svg.id = "ghost";
        number += 1;
        if (number>6) {
            number = 3;
        }
        // let number = Math.floor(Math.random() * 4 + 3)
        const ghostImage = "./static/svgs/ghost"+number.toString()+".svg#ghost" + number.toString()
        if (number === 4|| number === 6 ) {
            svg.style.height = '40vh'
        }
    
        use.setAttribute("href", ghostImage);
        svg.appendChild(use);
        body.appendChild(svg);
        this.element = svg;

        use.addEventListener("mouseover", function(evt) {
            evt.target.classList.toggle("active");
        });
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
        this.element.style.left = `${this.X}px`;

        this.animation = requestAnimationFrame(() => this.walk());
    }

    startWalk() {
        // set initial random position
        const p = Math.floor(Math.random() * 2);
        let rect = this.element.getBoundingClientRect();
        const rdX = Math.floor(Math.random() * winWidth - rect.width / 2);
        const rdY = Math.floor(Math.random() * (winHeight - rect.height));
        this.X = rdX;
        this.Y = rdY;
        this.speed = winWidth / 2000 * 6;
        if (p === 0) { // start form left
            this.direction = this.speed;
            this.element.style.left = `${-rect.width / 2}px`;
            this.element.style.top = `${rdY}px`;
            // this.X = - rect.width / 2;
        } else { // start form right
            this.direction = -this.speed;
            this.element.style.left = `${winWidth - rect.width / 2}px`;
            this.element.style.top = `${rdY}px`;
            // this.X = winWidth - rect.width / 2;
        }
        
        rect = this.element.getBoundingClientRect();
        this.centerX = rect.x + rect.width / 2;
        this.centerY = rect.y + rect.height / 2;
        this.dstX = 0;
        this.dstY = 0;

        this.animation = requestAnimationFrame(() => this.walk());
    }

    cancelWalk() {
        cancelAnimationFrame(this.animation);
    }
}


function setWinSize() {
    winWidth = window.innerWidth;
    winHeight = window.innerHeight;

    
    if (ghostArr.length === 0) {
        // init ghosts
        for (let i = 0; i < ghostNum; i++) {
            const g = new Ghost();
            g.startWalk();
            ghostArr.push(g);
        }
    } else {
        for (let i = 0; i < ghostNum; i++) {
            ghostArr[i].cancelWalk();
            ghostArr[i].startWalk();
        }
    }
    
}


window.addEventListener("load", setWinSize);
window.addEventListener("resize", setWinSize);