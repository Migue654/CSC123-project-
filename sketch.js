let attack1 = false 
let attack2= false 
let attack3= false 
let attack4 = false 

 function setup() {
  createCanvas(800, 800);
  
}
// Variables for "Characters"

let xPosCharacter = 80 
let yPosCharcter = 350 
let xPosCharacter2 = xPosCharacter+400
let yPosCharacter2 = yPosCharcter - 250 


function draw() {
  background(225);
// Widgets for attacks 
playeroptions(50,700) 
playeroptions(50,600) 
playeroptions(350,700)
playeroptions(350,600)
// Drawing the characters 
drawCharacters(xPosCharacter, yPosCharcter, xPosCharacter2, yPosCharacter2)
// Drawing the healthbars 
healthBar(xPosCharacter, yPosCharcter, xPosCharacter2, yPosCharacter2)
displayMouseCoordinates()
trueOrFalse()
}
// Function to create player attacks 
function playeroptions(xpos,ypos){
  rect(xpos,ypos,250,50,5)

}
  // Function to draw characters 
function drawCharacters(xPosC1, yPosC1, xPosc2, yPosC2) { 
  rect(xPosC1,yPosC1, 200, 200)
  rect(xPosc2, yPosC2, 200, 200 )

}
//function to draw health bar above characters 
function healthBar(xPos,yPos, xPos2, yPos2){
  push()
  textSize(20)
  fill(255,0,0)
  strokeWeight(20)
  text('Health Bar', xPos +50, yPos-30)
  text('Health Bar', xPos2 + 50, yPos2-30)
  pop()
  push()
  fill(255,0,0)
  rect(xPos + 45, yPos-25, 100, 20, 10)
  rect(xPos2 +45, yPos2-25, 100,20,10)
  pop()
}
  
function mouseClicked() { 
  if (mouseX>50 && mouseX<300 && mouseY>600 && mouseX<650) { 
    attack1=!attack1
  }
}
  
function trueOrFalse() { 
  if (attack1==true) { 
    console.log("true")
  }

}


function displayMouseCoordinates() {
  push()
  fill(0);
  text("X: " + mouseX + " | Y: " + mouseY, 10, height - 20);
  pop()
}
// function attack1(){ 
//   if(attack= true){

// }

