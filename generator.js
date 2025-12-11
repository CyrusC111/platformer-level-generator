function generate() {
  document.getElementById("output").textContent =
    "Level generated! (placeholder)";
}

// ---------------------------
// CONFIG
// ---------------------------
const GRID_WIDTH = 100;      // number of tiles horizontally
const GRID_HEIGHT = 100;     // number of tiles vertically
const EMPTY = 0;
const BLOCK = 1;

// ---------------------------
// GENERATE EMPTY GRID
// ---------------------------
function createEmptyGrid() {
    const grid = [];
    for (let y = 0; y < GRID_HEIGHT; y++) {
        const row = [];
        for (let x = 0; x < GRID_WIDTH; x++) {
            row.push(EMPTY);
        }
        grid.push(row);
    }
    return grid;
}

// ---------------------------
// ADD RANDOM PLATFORMS
// ---------------------------
function addRandomPlatforms(grid, density = 0.12) {
    for (let y = 3; y < GRID_HEIGHT; y++) {
        for (let x = 0; x < GRID_WIDTH; x++) {
            if (Math.random() < density) {
                grid[y][x] = BLOCK;
            }
        }
    }
}

// ---------------------------
// ADD WALL-JUMP SECTION
// ---------------------------
// Creates a vertical gap between two walls (like a narrow corridor)
function addWallJumpSection(grid) {
    const corridorX = Math.floor(Math.random() * (GRID_WIDTH - 6)) + 3;

    for (let y = 5; y < GRID_HEIGHT - 5; y++) {
        // Left wall of corridor
        grid[y][corridorX] = BLOCK;

        // Right wall of corridor
        grid[y][corridorX + 3] = BLOCK;
    }
}

// ---------------------------
// GENERATOR ENTRY POINT
// ---------------------------
function generateLevel() {
    let grid = createEmptyGrid();
    addRandomPlatforms(grid);
    addWallJumpSection(grid);

    return grid;
}

// ---------------------------
// EXPORT JSON
// ---------------------------
function exportJSON() {
    const level = generateLevel();
    const json = JSON.stringify({ grid: level }, null, 2);

    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "level.json";
    a.click();
}

// ---------------------------
// BUTTON HANDLER
// ---------------------------
document.getElementById("generateBtn").addEventListener("click", () => {
    exportJSON();
});
