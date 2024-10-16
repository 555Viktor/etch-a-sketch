// Sketch container - DOM, values and style
const sketchContainer = document.querySelector('.sketch-container');


let allGridSquares; // Updated in createGrid()

let defaultGridSize = 16;
sketchContainer.style.gridTemplateRows = `repeat(${defaultGridSize} 1fr)`;
sketchContainer.style.gridTemplateColumns = `repeat(${defaultGridSize}, 1fr)`;


// Settings elements - inputs, title and buttons
const textGridSize = document.querySelector('.input-sketch-value');
textGridSize.textContent = `${defaultGridSize} x ${defaultGridSize}`;   
const inputGridSize = document.querySelector('.input-sketch-size')
const inputColorPick = document.querySelector('.input-color-picker');
const btnColorMode = document.querySelector('.btn-color-mode');
const btnRainbowMode = document.querySelector('.btn-rainbow-mode');
const btnEraseMode = document.querySelector('.btn-erase-mode');
const btnClearSketch = document.querySelector('.btn-clear-sketch');


// Function to color square
function paintSquare (squareEl) {
    let currentColor = inputColorPick.value;

    squareEl.style.background = currentColor;
}


// Grid creation and management
function createGrid (n) {

    for (let i = 1; i <= n * n; i++) { 
        let newGridSquare = document.createElement('div');
        newGridSquare.className = 'grid-square';

        sketchContainer.appendChild(newGridSquare);
    }

    // Create nodeList of grid-squares
    allGridSquares = sketchContainer.querySelectorAll('.grid-square');
}

function clearGrid () {
    sketchContainer.innerHTML = '';
}

// Enable coloring of squares
function enableSquareColoring () {
    if (allGridSquares) {
        allGridSquares.forEach(square => {
            square.addEventListener('mouseover', () => paintSquare(square));
        })
    }
}

// Default colorable 16x16 grid when page is loaded
createGrid(defaultGridSize)
enableSquareColoring()

// Track the value of inputGridSize and dynamically manage squares based on input
inputGridSize.addEventListener('change', () => {
    let rangeValue = inputGridSize.value;

    sketchContainer.style.gridTemplateRows = `repeat(${rangeValue}, 1fr)`;
    sketchContainer.style.gridTemplateColumns = `repeat(${rangeValue}, 1fr)`;

    clearGrid();
    createGrid(rangeValue);
    enableSquareColoring();

    textGridSize.textContent = `${rangeValue} x ${rangeValue}`;
})

