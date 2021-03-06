function bird({ height, width, birdY, birdX, birdSize, rotation}) {
  let y = birdY;
  let size = birdSize;
  image(gameState.img1, width / 6, y , size ,40);
}

function updatePos(gs) {
  gs.birdY = gs.birdY + (gs.upForce * deltaTime) / 1000;
  gs.birdX += ((gs.birdX / 80 + 70) * deltaTime) / 1000;

  if (gs.birdY >= gs.height - gs.birdSize / 2) {
    gs.birdY = gs.height - gs.birdSize / 2;
    gs.speed = 0;
  }

  if (gs.birdY < gs.birdSize / 2) {
    gs.birdY = gs.birdSize / 2;
    gs.speed = 0;
  }
}

function keyReleased() {
  if (key === "p") {
    gameState.running = !gameState.running;
  }
  if (key === " ") {
    gameState.upForce = 70;

  }
}

function keyPressed() {
  if (key === " ") {
    if (gameState.gameOver) {      
      gameState.birdX = 1
      gameState.score = 0
      gameState.gameOver = false
      gameState.pipes = [{ y: 350, s: 90, x: 210}]
      generatePipes()
    }
    gameState.running = true;
    gameState.upForce = -70;
    gameState.rotation = 30;

  }
}

function drawPipes(gs) {
  gs.pipes.map((p) => pipe(gs, p));
}

function pipe(gs, { x, y, s }) {
  fill(0, 152, 0);
  strokeWeight(2);
  rect(x - gs.birdX, 0, gs.wide, y - s/2);
  rect(x - gs.birdX, y + s/2, gs.wide, gs.height - y - s/2);
  rect(x - gs.wide / 2 - gs.birdX + 5, y - s / 2 - 20, gs.wide + 10, 20);
  rect(x - gs.wide / 2 - gs.birdX + 5, y + s / 2, gs.wide + 10, 20);

}

function nextPipe(lastPipe) {
  const p = {
    y: lastPipe.y + (Math.random() * 100 - 50),
    s: Math.random() * 100 + 50,
    x: lastPipe.x + width / 6 + Math.random() * 50 + 50,
  };
  if (p.y - p.s < 0) {
    p.y = p.s;
  }
  if (p.y + p.s > gameState.height) {
    p.y = gameState.height - p.s;
  }
  return p;
}

function updatePipes(gs) {
  if (gs.pipes[0].x < gs.birdX - gs.wide) {
    gs.pipes.shift();
    const lastPipe = gs.pipes[gs.pipes.length - 1];
    gs.pipes.push(nextPipe(lastPipe));
    gs.score++;
  }
}

function updatePipe(gs) {
  gs.pipeX = gs.pipeX - (gs.pipeSpeed * deltaTime) / 30;
}

function checkColision(gs) {
  let x = gameState.pipes[0].x;
  let y = gameState.pipes[0].y;
  let s = gameState.pipes[0].s;

  return ((gs.birdX >= x - gs.wide - 50 - gs.birdSize / 2 - 10 && gs.birdX < x - 50) && (
    (gs.birdY >= 0 && gs.birdY <= y - (s / 2))
      || (gs.birdY >= y + (s / 2) - gs.birdSize / 2 && gs.birdY < gs.height)))
}
function preload(){
  gameState.img = loadImage('bg_5.png');
  gameState.img1 = loadImage('flapB.png');
  gameState.img2 = loadImage('birdUp.png');
  const lastScores = localStorage.getItem('scores')
  if (lastScores)
    gameState.scores = JSON.parse(lastScores)
}
function setup() {
  createCanvas(gameState.width, gameState.height);
  frameRate(30);
  generatePipes();
}

function generatePipes() {
  for (var i = 0; i < 10; i++) {
    const lastPipe = gameState.pipes[gameState.pipes.length - 1];
    gameState.pipes.push(nextPipe(lastPipe));
  }  
}

let gameState = {
  height: 600,
  width: 400,
  gravity: 5,
  speed: 0,
  birdSize: 50,
  scores: [],
  birdX: 400 / 6,
  birdY: 300,
  upForce: 50,
  pipes: [{ y: 350, s: 90, x: 210}],
  running: false,
  wide: 20,
  pipeSpeed: 2,
  pipeX: 400,
  top: 0,
  bottom: 0,
  score: 0,
  gameOver: false,
  lastName: '',
};

function draw() {  
  image(gameState.img, 0, 0, gameState.width, gameState.height);
  if (gameState.running) {
    updatePos(gameState);
    updatePipes(gameState);
    if (checkColision(gameState)) {
      gameState.running = false;
      gameState.gameOver = true;
      const lowerScore = gameState.scores.find(s => s.score < gameState.score)
      if (gameState.scores.length < 3 || lowerScore) {
        const name = prompt("Congrats, you made it to the top! What is your name?", gameState.lastName)
        if (name) {
          if (gameState.scores.length > 2) {
            gameState.scores.splice(gameState.scores.length - 1, 1)
          }
          gameState.scores.push({score: gameState.score, name: name.trim()})
          gameState.scores.sort((a, b) => b.score - a.score)
          gameState.lastName = name.trim()
          localStorage.setItem('scores', JSON.stringify(gameState.scores))
        }
      }
    }
  }
  drawPipes(gameState);
  bird(gameState);
  textStyle(BOLD);
  textFont('Georgia');
  if(gameState.gameOver){    
    fill(255, 255, 255, 196)
    rect(gameState.width / 2 - 100, gameState.height / 2 - 30, 200, 80 + gameState.scores.length * 24 + 24)
    textAlign(CENTER, CENTER)
    fill(0, 0, 0);
    textSize(24);
    text('Game Over', gameState.width / 2, gameState.height / 2);
    textSize(18);
    text(`Score: ${gameState.score}`, gameState.width / 2, gameState.height / 2 + 24);
    textAlign(LEFT, TOP)
    gameState.scores.forEach((s, index) => {
      text(`${s.name}: ${s.score}`, gameState.width / 2 - 70, gameState.height / 2 + 50 + 24 * index)
    })
  } else {
    fill(0, 0, 0);
    textSize(12);    
    textAlign(LEFT, TOP)
    text(`Score: ${gameState.score}`, 5, 5);    
  }
}
