// Variablesvar 
let bg;//background
let song;//background music

var screen = 0;
var playerHeight = 80//visual
var playerWidth = 20//visual
var playerSpeed = 8
var playerL = 200
var playerR = 200

var scoreL = 0
var scoreR = 0

var ballX = 300 //starting point for X axis
var ballY = 200 //staring point for Y axis
var ballSize = 20
var ballXSpeed = 4
var ballYSpeed = -2

function preload() {
  scoreUp = loadSound("electronic.wav");
  bg = loadImage('elec.png');
  //song = loadSound('PongmusicBackground.mp3');
  //song = loadSound('dance.mp3');
}

function setup() {
  createCanvas(600, 400);
  bg.loadPixels();
}


function startScreen(){
        background(bg) 
		//background(96, 157, 255)
		fill(255)
		textAlign(CENTER);
        textSize(18);
		text('PONG!', width / 2, height / 2)
		text('Click to start', width / 2, height / 2 + 20);	
}


function draw() {
	if(screen == 0){
    startScreen()
  }else if(screen == 1){
  	gameOn()
  }else if(screen==2){
  	endScreen()
  }	
}



function gameOn() {
  //song.play();//song comes out weirdly
  background(bg);
  
  // draw left player
  rect(0, playerL, playerWidth, playerHeight);
  noStroke();
  
  // draw right player
  rect(width-playerWidth, playerR, playerWidth, playerHeight);
  noStroke();
  
  // draw ball
  fill(255);
  //fill('#A7EEFF');
  ellipse(ballX, ballY, ballSize)
  noStroke();
  
  
  /* User Input */
  // 'W' key
  if (keyIsDown(87)) {
    playerL = playerL - playerSpeed
  }
  // 'S' key
  if (keyIsDown(83)) {
    playerL = playerL + playerSpeed
  }
  
  if (keyIsDown(UP_ARROW)) {
    playerR = playerR - playerSpeed
  }
  if (keyIsDown(DOWN_ARROW)) {
    playerR = playerR + playerSpeed
  }
  
  /* Game logic */
  if (playerL <= 0) {
    playerL = 0;
  }
  if (playerL > height - playerHeight) {
    playerL = height - playerHeight;
  }
  
  if (playerR <= 0) {
    playerR = 0;
  }
  if (playerR > height - playerHeight) {
    playerR = height - playerHeight;
  }
  
  ballX = ballX + ballXSpeed
  ballY = ballY + ballYSpeed
  
  // Bounce off top wall
  if (ballY < 0) {
    ballY = 0;
    ballYSpeed = -ballYSpeed;
  }

  // Bounce off bottom wall
  if (ballY > height) {
    ballY = height;
    ballYSpeed = -ballYSpeed;
  }
  
  
  // bounce off right player
  if (ballX > width - playerWidth && ballY >= playerR && ballY <= playerR + playerHeight ) //>= means it can be equal or bigger
  {
    ballX = width - playerWidth
    ballXSpeed = -ballXSpeed
    scoreR = scoreR + 1
    scoreUp.play();
  }
  
  //bounce off left player
    if (ballX < 0  + playerWidth && ballY >= playerL && ballY <= playerL + playerHeight ) {
    ballX = 0 + playerWidth
    ballXSpeed = -ballXSpeed
    scoreL = scoreL + 1
    scoreUp.play();
  }
  
  // playerR scores!
  if (ballX > width) {
    ballX = width/2
    ballY = height/2
    scoreR = scoreR + 1
    ballXSpeed = - ballXSpeed 
  }
  
  //playerL scores!
  if (ballX > width) {
    ballX = width/2
    ballY = height/2
    scoreL = scoreL + 1
    ballXSpeed = - ballXSpeed 
  }
  
  //Score
    fill(255);
    text('1st player score = ',10,10,100);//PlayerL
    text('2nd player score = ',440,10,100);//PlayerR
  //score,x,y,size // actul text
    text(scoreL,60,35,100)
    text(scoreR,500,35,100);//actual number of score
 
  
if (ballX > width - playerWidth ){
  //this means that the ball is going over the player  
  //talking about right wall
  screen =2
}

if (ballX < 0 + playerWidth){
  //this means that the ball is going over the player
  //talking about left wall
  screen =2
}

}


function endScreen(){
		background(150)
		textAlign(CENTER);
        textSize(16);
		text('GAME OVER', width / 2, height / 2)
     	text("1st Player Score = " + scoreL, width / 2, height / 2 + 20)
        text("2nd Player Score = " + scoreR, width / 2, height / 2 + 40)
}

function mousePressed(){
	if(screen==0){
  	screen=1
  }else if(screen==2){
  	screen=0
  }
}
