const image = document.querySelector('img');
const canvas = document.querySelectorAll("canvas");
const canva1 = canvas[0];
const canva2 = canvas[1];
const context1 = canva1.getContext("2d");
const context2 = canva2.getContext("2d");
const width1 = canva1.width;
const height1 = canva1.height;
const width2 = canva2.width;
const height2 = canva2.height;
const r = 150;
const hourPtr = r - 90;
const minutePtr = hourPtr + 30;

let hour = 0;
let minute = 0;
let fps = 0;


function setup() {
    canva1.style.width = canva1.width + 'px';
    canva1.style.height = canva1.height + 'px';
    canva2.style.width = canva2.width + 'px';
    canva2.style.height = canva2.height + 'px';

    const scale = window.devicePixelRatio;
    canva1.width *= scale;
    canva1.height *= scale;
    canva2.width *= scale;
    canva2.height *= scale;

    context1.scale(scale, scale);
    context2.scale(scale, scale);
    context2.drawImage(image, 0, 0, width2, height2);
}


function draw() {
    if (fps % 1 === 0) {
        // draw a static circle
        context1.clearRect(0, 0, width1, height1);
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
        console.log(hour, minute);
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
        const imageData = context2.getImageData(0, 0, width2, height2);
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