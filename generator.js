const canvas = document.getElementById("levelCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateLevel() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const lines = [];

    let x = 100;
    let y = rand(100, 500);

    for (let i = 0; i < 12; i++) {

        let length = rand(80, 200);
        let verticalChance = Math.random() < 0.3;

        let nextX = x + length;
        let nextY = y;

        if (verticalChance) {
            // vertical segment
            nextX = x;
            nextY = y + rand(-150, 150);
        }

        ctx.beginPath();
        ctx.lineWidth = 6;
        ctx.strokeStyle = "white";
        ctx.moveTo(x, y);
        ctx.lineTo(nextX, nextY);
        ctx.stroke();

        lines.push({
            x1: x, y1: y,
            x2: nextX, y2: nextY,
            type: verticalChance ? "vertical" : "horizontal"
        });

        x = nextX;
        y = nextY;
    }

    const jsonOutput = document.getElementById("jsonOutput");
    jsonOutput.value = JSON.stringify({ lines }, null, 2);
}

document.getElementById("generateBtn").addEventListener("click", generateLevel);
