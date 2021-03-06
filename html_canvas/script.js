const image = document.querySelector('img');
const canvas = document.querySelectorAll("canvas");
const canva1 = canvas[0];
const canva2 = canvas[1];
const context1 = canva1.getContext("2d");
const context2 = canva2.getContext("2d");
const scale = window.devicePixelRatio;
let width1;
let height1;
let width2;
let height2;
const r = 150;
const hourPtr = r - 90;
const minutePtr = hourPtr + 30;

let hour = 0;
let minute = 0;
let fps = 0;


function setup() {
    width1 = canva1.width;
    height1 = canva1.height;
    width2 = canva2.width;
    height2 = canva2.height;

    canva1.style.width = width1 + 'px';
    canva1.style.height = height1 + 'px';
    canva2.style.width = width2 + 'px';
    canva2.style.height = height2 + 'px';

    canva1.width = width1 * scale;
    canva1.height = height1 * scale;
    canva2.width = width2 * scale;
    canva2.height = height2 * scale;

    context1.scale(scale, scale);
    context2.scale(scale, scale);
    context2.drawImage(image, 0, 0, 600, 400);
}


function draw() {
    if (fps % 1 === 0) {
        // draw a static circle
        context1.clearRect(0, 0, 600, 400);
        context1.strokeStyle = "black";
        context1.lineWidth = 2;
        context1.fillStyle = "white";
        context1.font = "30px Arial";
        context1.beginPath();
        context1.ellipse(width1 / 2, height1 / 2, r, r, 0, 0, 2 * Math.PI, false);
        context1.stroke();
        context1.fill();

        // draw dynamic clock pointers
        context1.strokeStyle = "black";
        context1.fillStyle = "white";
        context1.beginPath();
        context1.moveTo(width1 / 2, height1 / 2);
        context1.lineTo(width1 / 2 + Math.sin(minute * Math.PI / 30) * minutePtr, height1 / 2 - Math.cos(minute * Math.PI / 30) * minutePtr);
        context1.moveTo(width1 / 2, height1 / 2);
        context1.lineTo(width1 / 2 + Math.sin(hour % 12 * Math.PI / 6) * hourPtr, height1 / 2 - Math.cos(hour % 12 * Math.PI / 6) * hourPtr);
        context1.stroke();
        context1.fill();
        hour = (hour + Math.floor((minute + 1) / 60)) % 24;
        minute = (minute + 1) % 60;

        // draw static lines for clock
        context1.fillStyle = "black";
        context1.beginPath();
        context1.moveTo(width1 / 2, height1 / 2 - r);
        context1.lineTo(width1 / 2, height1 / 2 - r  + 20);
        context1.strokeText("12", width1 / 2 - 18, height1 / 2 - r  + 45);
        context1.moveTo(width1 / 2 + r, height1 / 2);
        context1.lineTo(width1 / 2 + r - 20, height1 / 2);
        context1.strokeText("3", width1 / 2 + r - 38, height1 / 2 + 10);
        context1.moveTo(width1 / 2, height1 / 2 + r);
        context1.lineTo(width1 / 2, height1 / 2 + r - 20);
        context1.strokeText("6", width1 / 2 - 8, height1 / 2 + r - 25);
        context1.moveTo(width1 / 2 - r, height1 / 2);
        context1.lineTo(width1 / 2 - r + 20, height1 / 2);
        context1.strokeText("9", width1 / 2 - r + 22, height1 / 2 + 10);
        context1.moveTo(width1 / 2, height1 / 2);
        context1.ellipse(width1 / 2, height1 / 2, 2, 2, 0, 0, 2 * Math.PI, false);
        context1.stroke();
        context1.fill();
    } 

    if (fps % 6 === 0) {
        // display picture
        const imageData = context2.getImageData(0, 0, canva2.width, canva2.height);
        // context2.clearRect(0, 0, 600, 400);
        let data = imageData.data;
        
        for (let i = 0; i < data.length; i += 4) {
            data[i + 0] = (data[i + 0] + 1) % 255; 
            data[i + 1] = (data[i + 1] + 1) % 255;
            data[i + 2] = (data[i + 2] + 1) % 255;
        }

        context2.putImageData(imageData, 0, 0);
    }

    fps++;
    requestAnimationFrame(draw);
}


window.addEventListener('load', () => {
    setup();
    draw();
});