// DOM Elements

let sketchContainer = document.querySelector('.sketch-container');
// Function to dynamically create gridSquares inside sketchContainer

function createGrid (n) {

    for (let i = 1; i <= n; i++) {

        let newGridRow = document.createElement('div');
        newGridRow.className = 'grid-row';

        for (let j = 1; j <= n; j++) {
            let newGridCol = document.createElement('div');
            newGridCol.className = 'grid-col';

            newGridRow.appendChild(newGridCol);
        }

        sketchContainer.appendChild(newGridRow);

    }
}

createGrid(16)