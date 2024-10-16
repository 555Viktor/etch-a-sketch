// Sketch container - DOM, values and style
let sketchContainer = document.querySelector('.sketch-container');

let inputGridSize = document.querySelector('.input-sketch-size')
let textGridSize = document.querySelector('.input-sketch-value');

let allGridSquares; // Updated in createGrid()

let defaultGridSize = 16;
sketchContainer.style.gridTemplateRows = `repeat(${defaultGridSize} 1fr)`;
sketchContainer.style.gridTemplateColumns = `repeat(${defaultGridSize}, 1fr)`;

textGridSize.textContent = `${defaultGridSize} x ${defaultGridSize}`;

// Input color picker 
let inputColorPick = document.querySelector('.input-color-picker');

function paintSquare (squareEl) {
    let currentColor = inputColorPick.value;

    squareEl.style.background = currentColor;
}


// Function to create grid
function createGrid (n) {

    for (let i = 1; i <= n * n; i++) { 
        let newGridSquare = document.createElement('div');
        newGridSquare.className = 'grid-square';

        sketchContainer.appendChild(newGridSquare);
    }

    // Create nodeList of grid-squares
    allGridSquares = sketchContainer.querySelectorAll('.grid-square');
}

// Default 16x16 grid when page is loaded
createGrid(defaultGridSize)

// Track the value of inputGridSize and dynamically create squares based on input
inputGridSize.addEventListener('change', () => {
    let rangeValue = inputGridSize.value;

    sketchContainer.style.gridTemplateRows = `repeat(${rangeValue}, 1fr)`;
    sketchContainer.style.gridTemplateColumns = `repeat(${rangeValue}, 1fr)`;

    textGridSize.textContent = `${rangeValue} x ${rangeValue}`;
    createGrid(rangeValue);
})