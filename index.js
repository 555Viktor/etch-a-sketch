// Sketch container - DOM, values and style
const sketchContainer = document.querySelector('.sketch-container');

let allGridSquares; // Holds Nodelist for all grid squares (Updated in createGrid())
let bordersEnabled; // Updated in sketchBorder functions

const defaultGridSize = 16;

const deepSkyBlueHex = '#00BFFF'
const defaultSelectedColor = deepSkyBlueHex; 

sketchContainer.style.gridTemplateRows = `repeat(${defaultGridSize} 1fr)`;
sketchContainer.style.gridTemplateColumns = `repeat(${defaultGridSize}, 1fr)`;

// DOM Elements for settings and controls
const textGridSize = document.querySelector('.input-sketch-value');
textGridSize.textContent = `${defaultGridSize} x ${defaultGridSize}`;  

const inputGridSize = document.querySelector('.input-sketch-size')
const inputColorPick = document.querySelector('.input-color-picker');
const inputCheckBorders = document.querySelector('.input-enable-borders');

const btnChangeBackground = document.querySelector('.btn-change-bg');
const allBtnsColorMode = document.querySelectorAll('.btn-mode');

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

// Settings - functions for all modes
// Enable/disable color, random color and erase mode by adding/removing event listeners
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

function changeSketchBackground () { // Color entire grid
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
    const linenWhiteHex = '#FFFFF0';
    squareEl.style.background = linenWhiteHex;
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

function resetSquareColors () { // Clear sketch
    allGridSquares.forEach(square => {
        eraseSquare(square);
    })
}

// Manage sketch borders
function enableSketchBorders () {
    inputCheckBorders.checked = true;
    bordersEnabled = true;

    const blackHex = '#000000'
    const defaultBorderCss = `1px solid ${blackHex}`;
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

// Add event listeners to setting elements
inputCheckBorders.addEventListener('change', event => {
    if (event.target.checked) enableSketchBorders();
    else disableSketchBorders();
});

btnColorMode.addEventListener('click', () => {
    disableRandomColorMode();
    disableEraseMode();
    enableColorMode();

    btnColorMode.style.background = inputColorPick.value;
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

// Initialize the default grid and settings on page load
window.onload = () => {
    createGrid(defaultGridSize);
    enableColorMode();
    enableSketchBorders();
}

inputColorPick.addEventListener('change', () => {
        let selectedColor = inputColorPick.value;

        btnColorMode.style.background = selectedColor;
})
