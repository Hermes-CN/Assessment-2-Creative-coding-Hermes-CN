let p1, p2, target;
let p1Score = 0, p2Score = 0;
let winScore = 10;
let gameOver = false;
let winner = "";

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  resetGame();
}

function resetGame() {
  p1 = {x: 100, y: height/2, c: color(0, 200, 255), s: 6};
  p2 = {x: width-100, y: height/2, c: color(255, 50, 150), s: 6};
  spawnTarget();
  p1Score = 0;
  p2Score = 0;
  gameOver = false;
  winner = "";
}

function spawnTarget() {
  target = {
    x: random(50, width-50),
    y: random(50, height-50)
  };
}

function draw() {
  background(20);
  
  if (gameOver) {
    fill(255);
    textSize(50);
    text(winner + " WINS!", width/2, height/2 - 30);
    textSize(20);
    fill(200);
    text("Press R to restart", width/2, height/2 + 30);
    return;
  }
  
  // Draw target
  noStroke();
  fill(255, 200, 0);
  ellipse(target.x, target.y, 20);
  fill(255, 255, 150, 100);
  ellipse(target.x, target.y, 35);
  
  // Move players
  movePlayer(p1, {up: 87, down: 83, left: 65, right: 68}); // WASD
  movePlayer(p2, {up: UP_ARROW, down: DOWN_ARROW, left: LEFT_ARROW, right: RIGHT_ARROW}); // Arrows
  
  // Check collisions
  if (dist(p1.x, p1.y, target.x, target.y) < 20) {
    p1Score++;
    if (p1Score >= winScore) {
      gameOver = true;
      winner = "CYAN";
    } else {
      spawnTarget();
    }
  }
  
  if (dist(p2.x, p2.y, target.x, target.y) < 20) {
    p2Score++;
    if (p2Score >= winScore) {
      gameOver = true;
      winner = "MAGENTA";
    } else {
      spawnTarget();
    }
  }
  
  // Draw players
  fill(p1.c);
  ellipse(p1.x, p1.y, 30);
  fill(255);
  ellipse(p1.x, p1.y, 10);
  
  fill(p2.c);
  ellipse(p2.x, p2.y, 30);
  fill(255);
  ellipse(p2.x, p2.y, 10);
  
  // HUD
  textAlign(LEFT);
  textSize(24);
  fill(p1.c);
  text("CYAN (W-A-S-D): " + p1Score, 20, 30);
  fill(p2.c);
  text("MAGENTA (Arrows): " + p2Score, 20, 60);
  
  // Target score
  fill(255, 200, 0);
  text("First one to reach " + winScore + " , WINS!", 20, 90);
}

function movePlayer(p, keys) {
  if (keyIsDown(keys.up)) p.y -= p.s;
  if (keyIsDown(keys.down)) p.y += p.s;
  if (keyIsDown(keys.left)) p.x -= p.s;
  if (keyIsDown(keys.right)) p.x += p.s;
  
  // Keep on screen
  p.x = constrain(p.x, 15, width-15);
  p.y = constrain(p.y, 15, height-15);
}

function keyPressed() {
  if (keyCode === 82) resetGame(); // R to restart
}