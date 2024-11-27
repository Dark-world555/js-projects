const grid = document.getElementById("sudoku-grid");
const solveButton = document.getElementById("solve-btn");
const clearButton = document.getElementById("clear-btn");

// Create 9x9 grid of input fields
for (let i = 0; i < 81; i++) {
  const cell = document.createElement("input");
  cell.type = "number";
  cell.min = 1;
  cell.max = 9;
  grid.appendChild(cell);
}

// Function to get the values from the grid
function getGridValues() {
  const values = [];
  const cells = grid.getElementsByTagName("input");
  for (let i = 0; i < 81; i++) {
    values.push(cells[i].value ? parseInt(cells[i].value) : 0);
  }
  return values;
}

// Function to set the grid with solved values
function setGridValues(values) {
  const cells = grid.getElementsByTagName("input");
  for (let i = 0; i < 81; i++) {
    cells[i].value = values[i] === 0 ? "" : values[i];
  }
}

// Backtracking solver function
function solveSudoku(board) {
  const findEmptyCell = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) return [row, col];
      }
    }
    return null;
  };

  const isValid = (board, num, row, col) => {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num || board[i][col] === num) return false;
    }

    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let r = startRow; r < startRow + 3; r++) {
      for (let c = startCol; c < startCol + 3; c++) {
        if (board[r][c] === num) return false;
      }
    }
    return true;
  };

  const backtrack = (board) => {
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) return true; // All cells are filled

    const [row, col] = emptyCell;
    for (let num = 1; num <= 9; num++) {
      if (isValid(board, num, row, col)) {
        board[row][col] = num;
        if (backtrack(board)) return true;
        board[row][col] = 0;
      }
    }
    return false;
  };

  backtrack(board);
  return board;
}

// Solve button event listener
solveButton.addEventListener("click", () => {
  const values = getGridValues();
  const board = [];
  for (let i = 0; i < 9; i++) {
    board.push(values.slice(i * 9, i * 9 + 9));
  }
  const solvedBoard = solveSudoku(board);
  const solvedValues = solvedBoard.flat();
  setGridValues(solvedValues);
});

// Clear button event listener
clearButton.addEventListener("click", () => {
  const cells = grid.getElementsByTagName("input");
  for (let cell of cells) {
    cell.value = "";
  }
});
