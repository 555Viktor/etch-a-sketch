// DOM Elements

let sketchContainer = document.querySelector('.sketch-container');
// Function to dynamically create gridSquares inside sketchContainer

function createGrid (n) {

    for (let i = 0; i < n; i++) {
        let newGridSquare = document.createElement('div');
        newGridSquare.className = 'grid-square'; 
        sketchContainer.appendChild(newGridSquare);
    }
}

createGrid(55)