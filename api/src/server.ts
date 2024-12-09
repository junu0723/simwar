import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// core server test
app.get('/api/python', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('http://core:5001/api/game'); // call core server
    res.json(response.data); // send core server response to client
  } catch (error) {
    console.error('Error connecting to Python server:', error);
    res.status(500).json({ error: 'Failed to connect to Python server' });
  }
});

// test character
interface Character {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

let characters: Character[] = [
  { id: 1, x: 100, y: 100, size: 20, color: 'red' },
  { id: 2, x: 200, y: 150, size: 20, color: 'blue' }
];

app.get('/api/characters', (req: Request, res: Response) => {
  res.json(characters);
});

app.post('/api/move', (req: Request, res: Response) => {
  const { id, target } = req.body;
  const character = characters.find(c => c.id === id);
  if (!character) {
    res.status(404).json({ error: 'Character not found' });
    return;
  }
  character.x = target.x;
  character.y = target.y;
  res.json(character);
});

//
// Game state
type GameState = "start" | "game" | "end";

let currentState: GameState = "start";

// Squares' initial state
const gameState = {
  red: { x: 750, y: 175, width: 10, height: 10, color: "red", speed: -1, health: 10 },
  blue: { x: 0, y: 175, width: 10, height: 10, color: "blue", speed: 1, health: 10 }
};

// Update game state logic
function updateGameLogic(): void {
  if (currentState === "game") {
    // Update positions
    gameState.red.x += gameState.red.speed;
    gameState.blue.x += gameState.blue.speed;

    // Check for collision
    if (
      gameState.red.x < gameState.blue.x + gameState.blue.width &&
      gameState.red.x + gameState.red.width > gameState.blue.x &&
      gameState.red.y < gameState.blue.y + gameState.blue.height &&
      gameState.red.y + gameState.red.height > gameState.blue.y
    ) {
      // Reduce health of both squares
      gameState.red.health -= 1;
      gameState.blue.health -= 1;

      console.log(`Collision! Red HP: ${gameState.red.health}, Blue HP: ${gameState.blue.health}`);

      // End the game if either square is out of health
      if (gameState.red.health <= 0 || gameState.blue.health <= 0) {
        currentState = "end";
        console.log("Game Over!");
      }
    }
  }
}

// API to get the current state
app.get("/api/state", (req: Request, res: Response) => {
  if (currentState === "game") {
    updateGameLogic();
  }
  res.json({ state: currentState, gameState });
});

// API to start the game
app.post("/api/start", (req: Request, res: Response) => {
  currentState = "game";
  gameState.red = { x: 750, y: 175, width: 50, height: 50, color: "red", speed: -1, health: 10 };
  gameState.blue = { x: 0, y: 175, width: 50, height: 50, color: "blue", speed: 1, health: 10 };
  res.json({ message: "Game started!" });
});

// API to reset the game
app.post("/api/reset", (req: Request, res: Response) => {
  currentState = "start";
  res.json({ message: "Game reset to start state." });
});



app.listen(3001, () => {
  console.log('Node.js server running on port 3000');
});