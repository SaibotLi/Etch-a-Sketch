const gridWidth = getComputedStyle(document.body).getPropertyValue("--grid-width");
const inactiveColor = getComputedStyle(document.body).getPropertyValue("--inactive-color");
const accentColor = getComputedStyle(document.body).getPropertyValue("--accent-color");


const container = document.querySelector("#container");
const sketchArea = document.querySelector("#sketch-area");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");

const gridToggle = document.querySelector("#grid-toggle");

let squaresPerSide = 16;
let gridVisible = false;

function toggleGrid() {
    gridVisible = gridVisible ? false : true;
    gridToggle.style.color = gridVisible ? accentColor : inactiveColor;

    removeGridCells();
    createGridCells();
}

function setBackgroundColor () {
    this.style.backgroundColor = "black";
}
function createGridCells() {
    const numOfSquares = (squaresPerSide * squaresPerSide);

    for (let i = 0; i < numOfSquares; i++) {
        const gridCell = document.createElement("div");

        if (gridVisible) {
            widthOrHeight = `${(parseInt(gridWidth) / squaresPerSide) - 2}px`;
            gridCell.style.border = "1px solid whitesmoke";
        } else if (!gridVisible) {
            widthOrHeight = `${(parseInt(gridWidth) / squaresPerSide)}px`;
            gridCell.style.border = "none";
        }

        gridCell.style.width = gridCell.style.height = widthOrHeight;

        gridCell.addEventListener("mouseover", setBackgroundColor);

        sketchArea.appendChild(gridCell);
    }
} 

function removeGridCells() {
    while (sketchArea.firstChild) { // If it has firstChild
        sketchArea.removeChild(sketchArea.firstChild); // Remove it
    }
}

slider.oninput = function () {
    squaresPerSide = this.value;
    let txt = `${this.value} x ${this.value} (Resolution)`;
    sliderValue.innerHTML = txt;
    removeGridCells();
    createGridCells(this.value);
}

gridToggle.addEventListener("click", toggleGrid);

createGridCells();