const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// // 캔버스 초기화
// ctx.fillStyle = 'lightblue';
// ctx.fillRect(0, 0, canvas.width, canvas.height);

// ctx.fillStyle = 'green';
// ctx.fillRect(100, 100, 200, 150); // x, y, width, height

// ctx.fillStyle = 'white';
// ctx.font = '20px Arial';
// ctx.fillText('Hello, Canvas!', 150, 200);

// function render() {

//     console.log('Canvas initialized!');

//     // 배경 지우기
//     ctx.fillStyle = 'lightblue';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // 게임 요소 그리기
//     ctx.fillStyle = 'green';
//     ctx.fillRect(100, 100, 200, 150);

//     // 다음 프레임 요청
//     requestAnimationFrame(render);
// }

// render();

const player = { x: 50, y: 50, size: 20, color: 'red' };

function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.size, player.size);
}

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowUp': player.y -= 10; break;
    case 'ArrowDown': player.y += 10; break;
    case 'ArrowLeft': player.x -= 10; break;
    case 'ArrowRight': player.x += 10; break;
  }
});

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
  drawPlayer();
  requestAnimationFrame(render);
}

render();