interface Character {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
  }

let characters: Character[] = [];

async function fetchCharacters(): Promise<void> {
const response = await fetch('http://localhost:3001/api/characters');
characters = await response.json();
}

function drawCharacters(ctx: CanvasRenderingContext2D): void {
characters.forEach(character => {
    ctx.fillStyle = character.color;
    ctx.fillRect(character.x, character.y, character.size, character.size);
});
}

function init(): void {
const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

canvas.addEventListener('click', async (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (characters.length > 0) {
    await fetch(`http://localhost:3001/api/move`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: characters[0].id, target: { x: mouseX, y: mouseY } })
    });
    await fetchCharacters();
    }
});

async function gameLoop(): Promise<void> {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCharacters(ctx);
    requestAnimationFrame(gameLoop);
}

fetchCharacters().then(() => gameLoop());
}

fetch('http://localhost:3001/api/python')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error fetching Python server data:', error));

init();
