// Sketch container - DOM, values and style
const sketchContainer = document.querySelector('.sketch-container');

let allGridSquares; // Updated in createGrid()
let bordersEnabled; // Updated in sketchBorder functions

const defaultGridSize = 16;

sketchContainer.style.gridTemplateRows = `repeat(${defaultGridSize} 1fr)`;
sketchContainer.style.gridTemplateColumns = `repeat(${defaultGridSize}, 1fr)`;

// Settings container els- inputs, title and buttons
const textGridSize = document.querySelector('.input-sketch-value');
textGridSize.textContent = `${defaultGridSize} x ${defaultGridSize}`;   
const inputGridSize = document.querySelector('.input-sketch-size')
const inputColorPick = document.querySelector('.input-color-picker');
const inputCheckBorders = document.querySelector('.input-enable-borders');
const btnChangeBackground = document.querySelector('.btn-change-bg');
const btnColorMode = document.querySelector('.btn-color-mode');
const btnRainbowMode = document.querySelector('.btn-rainbow-mode');
const btnEraseMode = document.querySelector('.btn-erase-mode');
const btnClearSketch = document.querySelector('.btn-clear-sketch');


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

function clearGridContainer () {
    sketchContainer.innerHTML = '';
}

// Settings - functions for different modes 

function colorSquare (squareEl) {
    let selectedColor = inputColorPick.value;

    squareEl.style.background = selectedColor;
}

function enableColorMode () {
    if (allGridSquares) {
        allGridSquares.forEach(square => {
            square.addEventListener('mouseover', () => colorSquare(square));
        })
    }
}

function disableColorMode () {
    if (allGridSquares) {
        allGridSquares.forEach(square => {
            square.removeEventListener('mouseover', () => colorSquare(square));
        })
    } 
}

// Color entire grid
function changeSketchBackground () {
    allGridSquares.forEach(square => colorSquare(square));
}

function randomColorSquare (squareEl) {
    const randomR = Math.floor(Math.random() * 256)
    const randomG = Math.floor(Math.random() * 256)
    const randomB = Math.floor(Math.random() * 256)

    squareEl.style.background = `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function enableRandomColorMode () {
    if (allGridSquares) {
        allGridSquares.forEach(square => {
            square.addEventListener('mouseover', () => randomColorSquare(square));
        })
    }
}

function disableRandomColorMode () {
    if (allGridSquares) {
        allGridSquares.forEach(square => {
            square.removeEventListener('mouseover', () => randomColorSquare(square));
        })
    } 
}


function eraseSquare (squareEl) {
    squareEl.style.background = '#fff'; // white
}

function enableEraseMode () {
    if (allGridSquares) {
        allGridSquares.forEach(square => {
            square.addEventListener('mouseover', () => eraseSquare(square));
        })
    }
}

function disableEraseMode () {
    if (allGridSquares) {
        allGridSquares.forEach(square => {
            square.removeEventListener('mouseover', () => eraseSquare(square));
        })
    }   
}

// Clear sketch button

function resetSquareColors () {
    allGridSquares.forEach(square => {
        eraseSquare(square);
    })
}

// Add sketch borders functionality

function enableSketchBorders () {
    inputCheckBorders.checked = true;
    bordersEnabled = true;

    const defaultBorderCss = '1px solid #000000';
    allGridSquares.forEach(square => {
        square.style.border = defaultBorderCss;
    })
}

function disableSketchBorders () {
    inputCheckBorders.checked = false;
    bordersEnabled = false;

    allGridSquares.forEach(square => {
        square.style.border = 'none';
    });
}

inputCheckBorders.addEventListener('change', function() {
    if (this.checked) enableSketchBorders();
    else disableSketchBorders();
});

// Settings els event listeners
btnColorMode.addEventListener('click', () => {
    disableRandomColorMode();
    disableEraseMode();
    enableColorMode();
})

btnRainbowMode.addEventListener('click', () => {
    disableColorMode();
    disableEraseMode();
    enableRandomColorMode();
})

btnEraseMode.addEventListener('click', () => {
    disableColorMode();
    disableRandomColorMode();
    enableEraseMode();
})

btnClearSketch.addEventListener('click', () => {
    resetSquareColors();
})

btnChangeBackground.addEventListener('click', () => changeSketchBackground())

// Track the value of inputGridSize and dynamically manage squares based on input
inputGridSize.addEventListener('change', () => {
    let rangeValue = inputGridSize.value;

    sketchContainer.style.gridTemplateRows = `repeat(${rangeValue}, 1fr)`;
    sketchContainer.style.gridTemplateColumns = `repeat(${rangeValue}, 1fr)`;

    clearGridContainer();
    createGrid(rangeValue);
    enableColorMode();

    textGridSize.textContent = `${rangeValue} x ${rangeValue}`;

    // Manage sketch borders
    if (bordersEnabled) enableSketchBorders();
    else disableSketchBorders();
})

// Create default, colorable 16x16 grid with borders when page is loaded
window.onload = () => {
    createGrid(defaultGridSize);
    enableColorMode();
    enableSketchBorders();
}