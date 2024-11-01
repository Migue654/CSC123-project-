let attack = []
let attackUsed = []
let opponentAttacks = []
let healthValue = 1000;
let healthValueMe = 1000
let gameOver = false;
let myTurn = true 
let numOfAttacks = 4
function setup() {
  createCanvas(800, 800);
  // Create 4 Variables for 4 attacks 
  for(i=0;i<numOfAttacks;i++) {
    attack[i] = false
    opponentAttacks[i] = i+1*100
  }
  for (i=0;i<numOfAttacks;i++) { 
    attackUsed[i] = false
  }
}
// Variables for "Characters"

let xPosCharacter = 80;
let yPosCharcter = 350;
let xPosCharacter2 = xPosCharacter + 400;
let yPosCharacter2 = yPosCharcter - 250;

function draw() {
  background(225);
  // Widgets for attacks
  playeroptions(50, 700);
  playeroptions(50, 600);
  playeroptions(350, 700);
  playeroptions(350, 600);
  // Drawing the characters
  drawCharacters(xPosCharacter, yPosCharcter, xPosCharacter2, yPosCharacter2);
  // Drawing the healthbars
  healthBar(xPosCharacter, yPosCharcter, xPosCharacter2, yPosCharacter2);
  damage();
  checkGameOver();
  displayMouseCoordinates()
  displayTurn()
}
// Function to create player attacks
function playeroptions(xpos, ypos) {
  rect(xpos, ypos, 250, 50, 5);
}
// Function to draw characters
function drawCharacters(xPosC1, yPosC1, xPosc2, yPosC2) {
  rect(xPosC1, yPosC1, 200, 200);
  rect(xPosc2, yPosC2, 200, 200);
}
//function to draw health bar above characters
function healthBar(xPos, yPos, xPos2, yPos2) {
  push();
  textSize(20);
  fill(255, 0, 0);
  strokeWeight(20);
  text("Health Bar = " + healthValueMe, xPos + 50, yPos - 30);
  text("Health Bar = " + healthValue, xPos2 + 50, yPos2 - 30);
  pop();
  push();
  fill(255, 0, 0);
  rect(xPos + 45, yPos - 25, 100, 20, 10);
  rect(xPos2 + 45, yPos2 - 25, 100, 20, 10);
  pop();
}
// Function to check the attack used
function mouseClicked() {
  if (mouseX > 50 && mouseX < 300 && mouseY > 600 && mouseX < 650 && myTurn== true) {
    attackUsed[0] = true;
    myTurn = false 
    //Opponents turn with a delay 
    setTimeout(opponentsTurn, 5000); // 5 second delay 
  } else {
    attackUsed[0] = false;
  }
}
// Function to record the attack damage
function damage() {
  if (attackUsed[0] == true) {
    damageNumber = round(random(20, 100));
    attackUsed[0] = false;
    healthValue = healthValue - damageNumber;
  } 
}
//Functino once battle lost or won
function checkGameOver() {
  if (healthValue < 0) {
    push();
    background(0);
    textSize(25);
    fill(255);
    strokeWeight(25);
    text("YOU WON !", width / 2, height / 2);
    pop();
    noLoop()
  } else if(healthValueMe <0) { 
    push();
    background(0);
    textSize(25);
    fill(255);
    strokeWeight(25);
    text("YOU LOST!", width / 2, height / 2);
    pop();
    noLoop()

  }
}

// Function to record opponents attack 
function opponentsTurn () { 
if (myTurn == false) {
  opponentDamage = random(opponentAttacks)
  myTurn = true
  healthValueMe = healthValueMe - opponentDamage
} 
}



function displayMouseCoordinates() {
  push();
  fill(0);
  text("X: " + mouseX + " | Y: " + mouseY, 10, height - 20);
  pop();
}
// Function to show who's turn it is 
function displayTurn() { 
if (myTurn == true) { 
  push()
  textSize(30)
  strokeWeight(30)
  text("Your Turn", 480, 370); 
  pop()
} else if (myTurn == false) { 
  push()
  textSize(30)
  strokeWeight(10)
  text("Opponents Turn", 480,370)
  pop()
}
}
