// DOM Elements
let sketchContainer = document.querySelector('.sketch-container');

let gridSize = 16;
sketchContainer.style.gridTemplateRows = `repeat(${gridSize}, 1fr)`;
sketchContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;


function createGrid (n) {

    for (let i = 1; i <= n * n; i++) { 
        let newGridSquare = document.createElement('div');
        newGridSquare.className = 'grid-square';

        sketchContainer.appendChild(newGridSquare);
    }

}

createGrid(16)