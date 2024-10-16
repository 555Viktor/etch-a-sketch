// DOM elements, values and style of sketch container
let sketchContainer = document.querySelector('.sketch-container');

let defaultGridSize = 16;
sketchContainer.style.gridTemplateRows = `repeat(${defaultGridSize} 1fr)`;
sketchContainer.style.gridTemplateColumns = `repeat(${defaultGridSize}, 1fr)`;

let inputGridSize = document.querySelector('.input-sketch-size')
let textGridSize = document.querySelector('.input-sketch-value');

textGridSize.textContent = `${defaultGridSize} x ${defaultGridSize}`;


// Function to create grid
function createGrid (n) {

    for (let i = 1; i <= n * n; i++) { 
        let newGridSquare = document.createElement('div');
        newGridSquare.className = 'grid-square';

        sketchContainer.appendChild(newGridSquare);
    }

}

// Default 16x16 grid when page is loaded
createGrid(defaultGridSize)

// Track the value of inputGridSize and dynamically create squares based on input
inputGridSize.addEventListener('input', () => {
    let rangeValue = inputGridSize.value;

    sketchContainer.style.gridTemplateRows = `repeat(${rangeValue}, 1fr)`;
    sketchContainer.style.gridTemplateColumns = `repeat(${rangeValue}, 1fr)`;

    createGrid(rangeValue);
    textGridSize.textContent = `${rangeValue} x ${rangeValue}`;
})