import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Node.js 서버와 Python 서버 연결
app.get('/api/python', async (req: Request, res: Response) => {
  try {
    const response = await axios.get('http://engine:5001/api/game'); // Python 서버 호출
    res.json(response.data); // Python 서버의 응답 데이터를 클라이언트로 전달
  } catch (error) {
    console.error('Error connecting to Python server:', error);
    res.status(500).json({ error: 'Failed to connect to Python server' });
  }
});

// 테스트용 캐릭터 데이터
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

// 서버 시작
app.listen(3001, () => {
  console.log('Node.js server running on port 3000');
});