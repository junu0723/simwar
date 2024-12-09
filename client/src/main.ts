// Canvas and screens
const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

const startScreen = document.getElementById("startScreen")!;
const gameScreen = document.getElementById("gameScreen")!;
const endScreen = document.getElementById("endScreen")!;

const startButton = document.getElementById("startButton")!;
const restartButton = document.getElementById("restartButton")!;

// Game state type
interface Square {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  speed: number;
  health: number;
}

interface ServerResponse {
  state: "start" | "game" | "end";
  gameState: { red: Square; blue: Square };
}

// Function to switch screens
function switchScreen(state: "start" | "game" | "end"): void {
  startScreen.style.display = "none";
  gameScreen.style.display = "none";
  endScreen.style.display = "none";

  if (state === "start") {
    startScreen.style.display = "block";
  } else if (state === "game") {
    gameScreen.style.display = "block";
    canvas.style.display = "block"; // Ensure canvas is visible
  } else if (state === "end") {
    endScreen.style.display = "block";
    canvas.style.display = "none"; // Hide canvas when not in game
  }
}

// Function to draw squares
function drawSquare(square: Square): void {
  ctx.fillStyle = square.color;
  ctx.fillRect(square.x, square.y, square.width, square.height);

  // Draw health above the square
  ctx.fillStyle = "black";
  ctx.font = "14px Arial";
  ctx.fillText(`HP: ${square.health}`, square.x, square.y - 10);
}

// Fetch game state from API
async function fetchGameState(): Promise<ServerResponse> {
  const response = await fetch("http://localhost:3001/api/state");
  const data = await response.json();
  console.log("Fetched state:", data); // Debug API response
  return data;
}

// Start game API call
async function startGame(): Promise<void> {
  await fetch("http://localhost:3001/api/start", { method: "POST" });
  switchScreen("game"); // Switch to game screen
  gameLoop(); // Start the game loop
}

// Reset game API call
async function resetGame(): Promise<void> {
  await fetch("http://localhost:3001/api/reset", { method: "POST" });
  switchScreen("start");
}

// Game loop
async function gameLoop(): Promise<void> {
  try {
    const { state, gameState } = await fetchGameState();

    console.log("Rendering game state:", gameState);

    if (state === "end") {
      switchScreen("end");
      return;
    }

    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw squares
    drawSquare(gameState.red);
    drawSquare(gameState.blue);

    // Continue game loop
    requestAnimationFrame(gameLoop);
  } catch (error) {
    console.error("Error in game loop:", error);
  }
}

// Event listeners
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", resetGame);
