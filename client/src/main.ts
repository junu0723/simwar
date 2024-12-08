interface Square {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
}

interface GameState {
red: Square;
blue: Square;
collision: boolean;
}

// Canvas setup
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = 800;
canvas.height = 400;

// Function to draw a square
function drawSquare(square: Square): void {
ctx.fillStyle = square.color;
ctx.fillRect(square.x, square.y, square.width, square.height);
}

// Fetch game state from the server
async function fetchGameState(): Promise<GameState> {
const response = await fetch("http://localhost:3001/api/state");
return response.json();
}

// Game loop
async function gameLoop(): Promise<void> {
try {
    const gameState = await fetchGameState();

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw squares
    drawSquare(gameState.red);
    drawSquare(gameState.blue);

    // Check for collision
    if (gameState.collision) {
    console.log("Collision detected!");
    return; // Stop the loop
    }

    // Continue the loop
    requestAnimationFrame(gameLoop);
} catch (error) {
    console.error("Failed to fetch game state:", error);
}
}

// Start the game
gameLoop();
