// Grid size
const ROWS = 100;
const COLS = 100;

// Level stored here
let level = [];

// Canvas
const canvas = document.getElementById("preview");
const ctx = canvas.getContext("2d");
const cellSize = canvas.width / COLS;

// Generate button
document.getElementById("generateButton").onclick = () => {
    level = generateLevel();
    drawLevel();
};

// Download button
document.getElementById("downloadButton").onclick = () => {
    const json = JSON.stringify(level);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "level.json";
    a.click();
};

// ===================================
// LEVEL GENERATION LOGIC
// ===================================
function generateLevel() {
    // create empty grid
    let grid = [];
    for (let r = 0; r < ROWS; r++) {
        const row = new Array(COLS).fill(0); // 0 = empty
        grid.push(row);
    }

    // random blocks
    for (let i = 0; i < 80; i++) {
        grid[rand(ROWS)][rand(COLS)] = 1; // 1 = normal block
    }

    // create a forced wall-jump tunnel
    createWallJumpSection(grid);

    return grid;
}

// Creates a narrow corridor requiring wall jump
function createWallJumpSection(grid) {
    const x = rand(COLS-3) + 1;
    for (let y = 5; y < 15; y++) {
        grid[y][x] = 1;
        grid[y][x+2] = 1;
    }
}

// Draw level on canvas
function drawLevel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            if (level[r][c] === 1) {
                ctx.fillStyle = "white";
                ctx.fillRect(c * cellSize, r * cellSize, cellSize, cellSize);
            }
        }
    }
}

function rand(max) {
    return Math.floor(Math.random() * max);
}
