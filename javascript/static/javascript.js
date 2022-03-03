// DOM queries
const squares = document.querySelectorAll(".square");
const background = document.querySelector("body");
const grid = document.querySelector(".vending-machine");
const ch = document.getElementById("name");

// global variables
const TABLE = {"coca-cola": "red", "pepsi": "blue", "sprite": "green"};

// functions for events
const resetGrid = () => {
    ch.textContent = "Hover a beverage";
    background.style.background = "antiquewhite";
    squares.forEach(element => element.style.opacity = "1.0");
}

function hoverGrid(event) {
    squares.forEach(element => element.style.opacity = "0.5");
    event.target.style.opacity = "1.0";
    
    ch.textContent = event.target.id + " (click to see screen saver)";
    background.style.background = TABLE[event.target.id];
    
    event.target.addEventListener("pointerout", resetGrid, false);
    event.stopPropagation();
}

// event listener
grid.addEventListener("pointerover", hoverGrid, false);