let canvas;
let canvasContext;

const FPS = 30;

let player = new Player("Player");

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  document.getElementById("playerName").innerHTML = player.name;
  document.getElementById("playerNameControls").innerHTML = player.name;

  this.initInput();
  this.loadImages();

  canvas.addEventListener('mousedown', handleMouseClick);
}

function handleMouseClick(e) {
  player.reset();
}

function launchIfReady() {
  if (imagesToLoad === 0) {
    startGame();
  }
}

function startGame() {
  setInterval(function() {
    animate();
    draw();
  }, 1000/FPS);

  player.init(playerPic);
}

function animate() {
  player.move();
}

function draw() {	
  // background
  drawRectangle(0,0,canvas.width,canvas.height,'black');

  // if(winner !== null) {
  //   canvasContext.fillStyle = 'white';

  //   canvasContext.fillText(winner.name + " won! Congratulations", 350, 200);

  //   canvasContext.fillText("click to continue", 360, 500);
  //   return;
  // } 

  drawRoom();

  // player
  player.draw();

  // canvasContext.fillStyle = 'white';
  // canvasContext.fillText("Score: " + playerScore, canvas.width - 100, 10)
}