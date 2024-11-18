// Character Class
class Character {
  constructor(x, y, health) {
    this.x = x;
    this.y = y;
    this.health = (health);
    this.maxHealth = (health) 
  }

  draw() {
    rect(this.x, this.y, 200, 200); // Draw character
    this.drawHealthBar();
  }

  drawHealthBar() {
    push();
    fill(255, 0, 0);
    textSize(20);
    const displayHealth = Math.round(this.health)
    text(`Health = ${displayHealth}`, this.x + 50, this.y - 30);
    rect(this.x + 45, this.y - 25, map(this.health,0,this.maxHealth,0, 100), 20, 10); // Dynamic health bar
    pop();
  }

  takeDamage(amount) {
    this.health = max(0, this.health - amount); // Ensure health does not go below zero
  }
  resetHealth() { 
    this.health = this.maxHealth
  }
}

// Attack Class
class Attack {
  constructor(damageRange, x, y, maxUses,name) {
    this.damageRange = damageRange;
    this.x = x;
    this.y = y;
    this.width = 250;
    this.height = 50;
    this.maxUses = maxUses
    this.usesRemaining = maxUses;
    this.name = name 
  }

  use() {
    if(this.usesRemaining >0) {
    this.usesRemaining--;
    return round(random(this.damageRange[0], this.damageRange[1]));
    }
    return 0;
  }

  displayButton() {
    push()

      // Disable button if no uses remaining
  if (this.usesRemaining > 0) {
    fill(50,150,255)
  }else {
    fill(200); // Gray out the button when it's unavailable
    rect(this.x, this.y, this.width, this.height, 5); // Re-draw the button
    fill(255); // White text color
    text("No Uses Left", this.x + 90, this.y + 30);
  }
    
        rect(this.x, this.y, this.width, this.height, 5);
    fill(255)
    textSize(16)
text(`${this.name} (${this.usesRemaining}/${this.maxUses})`, this.x + this.width/2, this.y + this.height/2);
  
  pop();
  }
    
    
  

  isClicked(mx, my) {
    return (
      mx > this.x &&
      mx < this.x + this.width &&
      my > this.y &&
      my < this.y + this.height
    );
  }
}

// Game Class
class Game {
  constructor() {
    this.player = new Character(80, 350, 1000);
    this.opponent = new Character(480, 100, 1000);
    this.attacks = [
      new Attack([300, 500], 50, 700,1, "Strike"),
      new Attack([300, 500], 50, 600,20,"IDK"),
      new Attack([20, 20], 350, 700,20,"IDK"),
      new Attack([20, 100], 350, 600,20,"idk"),
    ];
    this.myTurn = true;
    this.gameOver = false;
    this.wonOrLost = null;
    this.showAttackInfo = false
  }
  setOpponent(opponentData) { 
    this.opponent = new Character(480,100, opponentData.health)
  }

  display() {
    if (this.gameOver) return this.displayGameOver();

    // Display characters
    this.player.draw();
    this.opponent.draw();

    // Display attack options
    for (let i = 0; i < this.attacks.length; i++) {
      this.attacks[i].displayButton();
    }

    this.displayTurn();
    this.displayMouseCoordinates();
    this.displayAttackInfo()
    this.displayToggleButton()
  }

  playerAttack(index) {
    if (!this.myTurn || this.gameOver) return;

    const damage = this.attacks[index].use();
    this.opponent.takeDamage(damage);

    // Immediately check for game over after the attack
    if (this.opponent.health <= 0) {
      this.checkGameOver();
      return;
    }

    this.myTurn = false;

    setTimeout(() => this.opponentTurn(), 2000); // 5-second delay
  }

  opponentTurn() {
    if (this.myTurn || this.gameOver) return;
   const currentOpponent = scene.opponents[scene.currentOpponent];

const damage = random(currentOpponent.damageRange[0], currentOpponent.damageRange[1]);    
    this.player.takeDamage(damage);

    this.myTurn = true;
    this.checkGameOver();
  }

  checkGameOver() {
    if (this.opponent.health <= 0) { 
      this.gameOver = true;
      this.wonOrLost = true;

      // Mark the opponent as defeated in the map
      if (scene.currentOpponent !== null) {
        scene.markOpponentDefeated(scene.currentOpponent);
      }
    } else if (this.player.health <= 0) {
      this.gameOver = true;
      this.wonOrLost = false;
    }
    console.log(this.wonOrLost);
  }

  displayGameOver() {
    push();
    background(0);
    fill(255);
    textSize(25);
    textAlign(CENTER, CENTER);
    text(
      this.player.health <= 0 ? "YOU LOST!" : "YOU WON!",
      width / 2,
      height / 2
    );
    pop();

    // Reset game state after 3 seconds and return to the map scene
    setTimeout(() => {
      this.resetGame();
      scene.sceneActive = true; // Switch back to the map scene
    }, 3000); // 3-second delay before returning to map scene
  }

  resetGame() {
    this.player.resetHealth()
    this.myTurn = true;
    this.gameOver = false;
    this.wonOrLost = null;
    
  }

  displayMouseCoordinates() {
    push();
    fill(0);
    text(`X: ${mouseX} | Y: ${mouseY}`, 10, height - 20);
    pop();
  }

  displayTurn() {
    push();
    textSize(30);
    text(this.myTurn ? "Your Turn" : "Opponent's Turn", 480, 370);
    pop();
  }
   displayToggleButton() {
    push();
    fill(0, 255, 0);
    rect(width - 150, height - 60, 140, 50, 10); // Draw button
    fill(255);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("Toggle Info", width - 80, height - 35); // Button label
    pop();
  }
    displayAttackInfo() {
    if (!this.showAttackInfo) return; // Only display if toggle is on

    push();
    fill(0, 0, 255, 150);
    rect(width / 2 - 150, height / 2 - 50, 500, 300); // Info box
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    for (let i = 0; i < this.attacks.length; i++) {
      const attack = this.attacks[i];
      text(`Attack ${i + 1}: Damage: ${attack.damageRange[0]}-${attack.damageRange[1]}, Uses: ${attack.usesRemaining}/${attack.maxUses}`, width / 2, height / 2 - 30 + i * 25);
    }
    pop();
  }
   toggleAttackInfo() {
    this.showAttackInfo = !this.showAttackInfo; // Toggle the flag
  }
}
function mouseClicked() {
  if (game.myTurn && !scene.sceneActive) {
    for (let i = 0; i < game.attacks.length; i++) {
      // Check if the button is clicked and the attack has remaining uses
      if (game.attacks[i].isClicked(mouseX, mouseY) && game.attacks[i].usesRemaining > 0) {
        game.playerAttack(i);
        break;
      }
    }
  }
    // Check if the toggle button is clicked
  if (mouseX > width - 150 && mouseX < width - 10 && mouseY > height - 60 && mouseY < height - 10) {
    game.toggleAttackInfo();
  }

}

// Player Class
class Player {
  constructor(xPos, yPos, size) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
    this.speed = 1.5; // Speed Movement
  }

  draw() {
    square(this.xPos, this.yPos, this.size);
  }

update() {
  let newXPos = this.xPos;
  let newYPos = this.yPos;

  if (keyIsDown(87)) newYPos -= this.speed; // 'W' key (move up)
  if (keyIsDown(83)) newYPos += this.speed; // 'S' key (move down)
  if (keyIsDown(65)) newXPos -= this.speed; // 'A' key (move left)
  if (keyIsDown(68)) newXPos += this.speed; // 'D' key (move right)

  // Check canvas boundaries
  if (newXPos < 0 || newXPos > width - this.size) newXPos = this.xPos;
  if (newYPos < 0 || newYPos > height - this.size) newYPos = this.yPos;

  // Check for collisions with opponent lines
  for (let opponent of scene.opponents) {
    if (!opponent.defeated) {
      let opponentLineY = opponent.yPos + opponent.size;

      // Block player from moving past the opponent's line
      if (this.yPos >= opponentLineY && newYPos < opponentLineY) {
        newYPos = this.yPos; // Prevent moving up past the line
      } else if (this.yPos + this.size <= opponentLineY && newYPos + this.size > opponentLineY) {
        newYPos = this.yPos; // Prevent moving down past the line
      }
    }
  }

  this.xPos = newXPos;
  this.yPos = newYPos;
}

  checkCollision(opponent) {
    // Check if player's bounding box intersects with opponent's bounding box
    if (
      this.xPos < opponent.xPos + opponent.size &&
      this.xPos + this.size > opponent.xPos &&
      this.yPos < opponent.yPos + opponent.size &&
      this.yPos + this.size > opponent.yPos
    ) {
    this.xPos+=10
      return true;
    }
    return false;
  }
}

// Opponent Class
class Opponent {
  constructor(xPos, yPos, size, health, damageRange,color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.size = size;
    this.size = size;
    this.health = health;
    this.damageRange = damageRange;
    this.defeated = false;
    this.color = color;

  }

  draw() {
    if (!this.defeated) {
      square(this.xPos, this.yPos, this.size);
      line(0, this.yPos + this.size, width, this.yPos + this.size);
    }
  }
}

// ShowMap Class
class ShowMap {
  constructor() {
    this.player = new Player(200, 20, 20);
   this.opponents = [
      new Opponent(50, 100, 20, 500, [50, 100], '#FF0000'),
      new Opponent(50, 200, 20, 750, [75, 150], '#00FF00'),
      new Opponent(50, 300, 20, 1000, [100, 200], '#0000FF'),
      new Opponent(50, 400, 20, 1250, [150, 250], '#FFFF00'),
      new Opponent(50, 500, 20, 1500, [200, 300], '#FF00FF'),
      new Opponent(50, 600, 20, 1750, [250, 350], '#00FFFF'),
      new Opponent(50, 700, 20, 2000, [300, 400], '#FF8800')
    ];
    this.sceneActive = true; // Track if the map scene is active
    this.currentOpponent = null;
  }

  display() {
    if (!this.sceneActive) return; // Exit if collision detected and scene is inactive

    this.player.draw();
    this.player.update();
    for (let i = 0; i < this.opponents.length; i++) {
      if (!this.opponents[i].defeated) { // Only draw active opponents
        this.opponents[i].draw();
        if (this.player.checkCollision(this.opponents[i])) {
          console.log("Collision detected with " + i);
          this.currentOpponent = i; // Track the index of the current opponent
          this.sceneActive = false; // Stop showing map on collision
          game.setOpponent({health: this.opponents[i].health});
          break;
        }
      }
    }
  }

  markOpponentDefeated(index) {
    if (index >= 0 && index < this.opponents.length) {
      this.opponents[index].defeated = true;
    }
  }
}

let scene;
let game;

function setup() {
  createCanvas(800, 800);
  scene = new ShowMap();
  game = new Game();
}

function draw() {
  background(225);
  if (scene.sceneActive) {
    scene.display(); // Display map scene if active
  } else {
    game.display(); // Display battle scene if collision occurred
  }
}

