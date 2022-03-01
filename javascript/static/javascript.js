// DOM queries
const squares = document.querySelectorAll(".square");
const background = document.querySelector("body");
const grid = document.querySelector(".vending-machine");
const ch = document.getElementById("name");

// global variables
// const TABLE = {"s1": "coke", "s2": "pepsi"};
const TABLE = {"coke": "red", "pepsi": "blue", "sprite": "green"};


// functions for events
const resetGrid = () => {
    ch.textContent = "Hover a beverage";
    background.style.background = "white";
    squares.forEach(element => {
        element.style.border = "none";
        element.style.opacity = "1.0";
    });
}

function hoverGrid(event) {
    squares.forEach(element => element.style.opacity = "0.5");
    event.target.style.opacity = "1.0"
    
    ch.textContent = event.target.id;
    background.style.background = TABLE[event.target.id];
    event.target.style.border = "1px solid black";
    
    event.target.addEventListener("pointerout", resetGrid, false);
    event.stopPropagation();
}


// event listener
grid.addEventListener("pointerover", hoverGrid, false);

