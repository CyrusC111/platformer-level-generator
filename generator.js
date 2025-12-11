function generateLevel(width, height) {
    // Create empty grid
    let grid = [];
    for (let y = 0; y < height; y++) {
        grid[y] = [];
        for (let x = 0; x < width; x++) {
            grid[y][x] = 0; // empty
        }
    }

    // --- PLATFORM GENERATOR ---
    let y = Math.floor(height * 0.8); // start near bottom
    let x = 0;

    while (x < width) {
        let platformLength = Math.floor(Math.random() * 8) + 6; // 6–14 tiles
        let platformHeightChange = Math.floor(Math.random() * 3) - 1; // up/down/same

        // Adjust height, but keep inside grid
        y += platformHeightChange;
        y = Math.min(height - 2, Math.max(3, y));

        // Create platform section
        for (let i = 0; i < platformLength && x < width; i++) {
            grid[y][x] = 1;
            x++;
        }

        // Random gap between platforms
        x += Math.floor(Math.random() * 3); // 0–2 empty tiles
    }

    // --- WALLJUMP SECTIONS ---
    for (let i = 0; i < 4; i++) {
        let wx = Math.floor(Math.random() * (width - 3)) + 1;
        let wy = Math.floor(height * 0.4);

        // tall vertical walls facing each other
        for (let h = 0; h < 8; h++) {
            if (wy + h < height) {
                grid[wy + h][wx] = 1;
                grid[wy + h][wx + 3] = 1;
            }
        }
    }

    return grid;
}

// BUTTON HANDLER (HTML calls this)
function generate() {
    let width = parseInt(document.getElementById("width").value);
    let height = parseInt(document.getElementById("height").value);

    let grid = generateLevel(width, height);

    let output = {
        width: width,
        height: height,
        tiles: grid
    };

    document.getElementById("result").value = JSON.stringify(output, null, 2);
}


function rand(max) {
    return Math.floor(Math.random() * max);
}
