  let playState;
  let instState;
  let exitState;
  const DEFAULT = 0;
  const HOVER = 1;
  const CLICK = 2; 





  class StartMenu {
    constructor() {
      this.playButton = new playButton();
      this.instButton = new instButton();
     
    }

    display() {
      push();
      background(225);
      fill(0);
      textSize(60);
      textAlign(CENTER, CENTER);
      text("Game Title", width/2, height/4);
      pop();
      
      this.playButton.checkCollision();
      this.instButton.checkCollision();
      
      if (this.playButton.gameActive) {
        gameStarted = true;
      }
      if (gameStarted = true) {
        this.prologue.display()
      }
      if (this.instButton.instActive) {
        this.instButton.exitDisplay();
      }
    }
  }
  const preDefault = 0;
  const preHover= 1;
  const PreClick = 2; 
  class Prologue {
    constructor() {
      this.buttonstate =preDefault;
      this.prologuecomplete = false;
    }
    display() {
      this.prologuebackground();
      this.prologueupdadate();
      this.nextbuttoncollision()
      this.Button();
    }
    prologuebackground() {
      push();
      fill('black');
      rect(100, 100, 600, 600);
      pop();
      push();
      fill('white')
      textSize(50);
      text("!Welcome to Etherland!", 150, 200);
      pop();
      push();
      fill('white')
      textSize(20);
      text("prologue information", 320, 400);
      pop()
    }
    prologueupdadate() {
      if (this.buttonstate == PreClick) {
        this.prologuecomplete = true;
      }
    }
    Button() {
      push();
  
      if (this.buttonstate == preHover) {
        fill("orange");
      } else if (this.buttonstate == preDefault) {
        fill("red");
      }
      rect(540, 600, 150, 60, 20);
      pop();
      push();
      text("Next...",580,635);
      pop();
    }
    nextbuttoncollision() {
      if (mouseX > 540 && mouseX < 690 && mouseY > 600 && mouseY < 660) {
        if (mouseIsPressed) {
          this.buttonstate = PreClick;
        } else {
          this.buttonstate = preHover;
        }
      } else {
        this.buttonstate = preDefault;
      }
    }
  }
  class playButton {
      constructor() {
          this.gameActive = false;
          push();
          rectMode(CENTER);
          textAlign(CENTER, CENTER);
          textSize(50);
          rect(width/2, height/2, 200, 100);
          text("PLAY", width/2, height/2);
          pop();
      }

      checkCollision() {
          push();
          rectMode(CENTER);
          textAlign(CENTER, CENTER);
          textSize(50);
          rect(width/2, height/2, 200, 100);
          
          if (mouseX > (width/2) - 100 && mouseX < (width/2)+100 && 
              mouseY > height/2-50 && mouseY < (height/2)+50) {
              if (mouseIsPressed) {
                  playState = CLICK;
                  this.gameActive = true;
              } else {
                  playState = HOVER;
              }
          } else {
              playState = DEFAULT;
          }
          
          this.playState();
          rect(width/2, height/2, 200, 100);
          fill(0);
          text("PLAY", width/2, height/2);
          fill(255);
          pop();
      }

      playState() {
          if (playState == DEFAULT) {
              fill(128, 0, 0);
          } else if (playState == HOVER) {
              fill(0, 0, 128);
          } else if (playState == CLICK) {
              fill(255);
          }
      }
  }

  class instButton {
      constructor() {
          this.instActive = false;
          push();
          rectMode(CENTER);
          textAlign(CENTER, CENTER);
          textSize(35);
          rect(width/2, 3*height/4, 200, 100);
          text("How To Play", width/2, 3*height/4);
          pop();
      }

      checkCollision() {
          push();
          rectMode(CENTER);
          textAlign(CENTER, CENTER);
          rect(width/2, 3*height/4, 200, 100);
          
          if (mouseX > (width/2) - 100 && mouseX < (width/2)+100 && 
              mouseY > (3*height/4) - 50 && mouseY < (3*height/4) + 50) {
              if (mouseIsPressed) {
                  instState = CLICK;
                  this.instActive = true;
              } else {
                  instState = HOVER;
              }
          } else {
              instState = DEFAULT;
          }
          
          this.instState();
          rect(width/2, 3*height/4, 200, 100);
          fill(0);
          textSize(35);
          text("How To Play", width/2, 3*height/4);
          fill(255);
          pop();
      }

      instState() {
          if (instState == DEFAULT) {
              fill(128, 0, 0);
          } else if (instState == HOVER) {
              fill(0, 0, 128);
          } else if (instState == CLICK) {
              fill(255);
          }
      }

      exitDisplay() {
          push();
          fill(180);
          rectMode(CENTER);
          textAlign(CENTER, CENTER);
          rect(width/2, height/2, 700, 700);
          textSize(15);
          fill(255);
          text("This is how you play the game!", width/2, height/2);
          this.exitCollision();
          pop();
      }

      exitCollision() {
          push();
          rect(740, 60, 20, 20);
          if (mouseX > 730 && mouseX < 750 && mouseY > 50 && mouseY < 70) {
              if (mouseIsPressed) {
                  exitState = CLICK;
                  this.instActive = false;
              } else {
                  exitState = HOVER;
              }
          } else {
              exitState = DEFAULT;
          }
          
          this.exitState();
          rect(740, 60, 20, 20);
          textSize(15);
          fill(0);
          text("X", 740, 60);
          pop();
      }

      exitState() {
          if (exitState == DEFAULT) {
              fill(180, 0, 0);
          } else if (exitState == HOVER) {
              fill(180, 0, 0, 50);
          } else if (exitState == CLICK) {
              fill(255);
          }   
      }
  }


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
      this.drawHealthBar(); // runs the function that draws the healthbar 
    }

    drawHealthBar() {
      push();
      fill(255, 0, 0);
      textSize(20);
      const displayHealth = Math.round(this.health)
      text(`Health = ${displayHealth}`, this.x + 50, this.y - 30);
      rect(this.x + 45, this.y - 25, map(this.health,0,this.maxHealth,0, 100), 20, 10); // Dynamic health bar the use of map is used to constatnly change the size as the variables for health and max change as the player takes damage 
      pop();
    }

    takeDamage(amount) {
      this.health = max(0, this.health - amount); // Fixes the bug where the players health goes belows 0 and still runs a turn fixed it lol 
    }
    resetHealth() { 
      this.health = this.maxHealth // this resets the health after a battle 
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
    // Calculate normal damage using weighted average I literally do not know how I got this to work do not touch it and still kinda fucking sucks cuz even if you're slightly in the green you still get a good damge attack but this I got it to work so don't touch it. Its also 3 am and I don't think i can do this anymore 
        const minDamage = this.damageRange[0];
        const maxDamage = this.damageRange[1];
        // Use weighted average: 70% min damage + 30% random bonus up to max
        const baseDamage = minDamage + (random(0, maxDamage - minDamage) * 0.3);
        return round(baseDamage);
      }
    }

    displayButton() {
      push()

        // Makes sure the button doesn't work anymore if no uses remaining 
    if (this.usesRemaining > 0) {
      fill(50,150,255)
    }else {
      fill(200); // For polish make the button white out so players know that the button can no longer by used
      rect(this.x, this.y, this.width, this.height, 5); // Draws the button again 
    }
      
          rect(this.x, this.y, this.width, this.height, 5);
      fill(255)
      textSize(16)
  text(`${this.name} (${this.usesRemaining}/${this.maxUses})`, this.x + this.width/2, this.y + this.height/2);
    
    pop();
    }
      
      
    
  // This checks if the button is being clicked or not 
    isClicked(mx, my) {
      return (
        mx > this.x &&
        mx < this.x + this.width &&
        my > this.y &&
        my < this.y + this.height
      );
    }
  }


  // This class handles the minigame element that we are using 
  class MiniGame {
    constructor() {
      this.barX = 300;
      this.barY = 500;
      this.barWidth = 200;
      this.barHeight = 30;

      this.sliderX = 300;
      this.sliderWidth = 20;
      this.direction = 2;
    
      const hitZoneWidth = 40;
      const hitZoneStart = this.barX + (this.barWidth - hitZoneWidth) / 2;
      this.hitZone = [hitZoneStart, hitZoneStart + hitZoneWidth];
      
      this.active = false;
      this.damageMultiplier = 0;
      this.callback = null;
      this.minimumMultiplier = 0.2;
      this.baseSpeed = 2;
      this.currentSpeed = this.baseSpeed;
    }
  // This function starts the 
    start(callback) {
      this.active = true;
      this.sliderX = this.barX;
      this.direction = Math.abs(this.currentSpeed);
      this.callback = callback;
    }

    increaseDifficulty(opponentIndex) {
      this.currentSpeed = this.baseSpeed * (1 + opponentIndex * 0.5);
      
      const baseHitZoneWidth = 40;
      const newHitZoneWidth = Math.max(20, baseHitZoneWidth - (opponentIndex * 3));
      
      const hitZoneStart = this.barX + (this.barWidth - newHitZoneWidth) / 2;
      this.hitZone = [hitZoneStart, hitZoneStart + newHitZoneWidth];
    }

    update() {
      if (!this.active) return;

      this.sliderX += this.direction;

      if (this.sliderX <= this.barX) {
        this.sliderX = this.barX;
        this.direction = Math.abs(this.currentSpeed);
      } else if (this.sliderX >= this.barX + this.barWidth - this.sliderWidth) {
        this.sliderX = this.barX + this.barWidth - this.sliderWidth;
        this.direction = -Math.abs(this.currentSpeed);
      }
    }

    draw() {
      if (!this.active) return;

      push();
      // Draw the background bar
      fill(200);
      rect(this.barX, this.barY, this.barWidth, this.barHeight);

      // Draw the hit zone
      fill(0, 255, 0);
      rect(this.hitZone[0], this.barY, this.hitZone[1] - this.hitZone[0], this.barHeight);

      // Draw the slider
      fill(255, 0, 0);
      rect(this.sliderX, this.barY, this.sliderWidth, this.barHeight);

      // Draw the multiplier value for feedback
      if (this.damageMultiplier > 0) {
        fill(0);
        textAlign(CENTER);
        textSize(16);
        text(`${round(this.damageMultiplier * 100)}%`, this.barX + this.barWidth / 2, this.barY - 10);
      }
      pop();
    }

    checkHit() {
      if (!this.active) return;

      const center = (this.hitZone[0] + this.hitZone[1]) / 2;
      const sliderCenter = this.sliderX + this.sliderWidth / 2;
      const distanceFromCenter = abs(sliderCenter - center);
      
      // Calculate the maximum possible distance from center
      const maxPossibleDistance = this.barWidth / 2;
      
      // Calculate zones
      const perfectZone = (this.hitZone[1] - this.hitZone[0]) / 2;
      const goodZone = perfectZone * 2;
      const fairZone = perfectZone * 3;
      
      // Calculate multiplier based on zones
      if (distanceFromCenter <= perfectZone) {
        // Perfect hit - 100% damage
        this.damageMultiplier = 1;
      } else if (distanceFromCenter <= goodZone) {
        // Good hit - 60-99% damage
        this.damageMultiplier = map(distanceFromCenter, perfectZone, goodZone, 0.99, 0.6);
      } else if (distanceFromCenter <= fairZone) {
        // Fair hit - 40-59% damage
        this.damageMultiplier = map(distanceFromCenter, goodZone, fairZone, 0.59, 0.4);
      } else {
        // Poor hit - 20-39% damage
        this.damageMultiplier = map(
          distanceFromCenter,
          fairZone,
          maxPossibleDistance,
          0.39,
          this.minimumMultiplier
        );
      }
      
      // Ensure multiplier stays within bounds
      this.damageMultiplier = constrain(this.damageMultiplier, this.minimumMultiplier, 1);

      this.end();
    }

    end() {
      this.active = false;
      if (this.callback) {
        const finalMultiplier = this.damageMultiplier;
        this.callback(finalMultiplier);
        this.callback = null;
        this.damageMultiplier = 0;
      }
    }
  }


  // Game Class
  class Game {
    constructor() {
      this.player = new Character(80, 350, 1000);
      this.opponent = new Character(480, 100, 1000);
      this.attacks = [
        new Attack([250, 400], 50, 700,1, "Strike"),
        new Attack([150, 300], 50, 600,20,"IDK"),
        new Attack([100, 200], 350, 700,20,"IDK"),
        new Attack([50, 150], 350, 600,20,"idk"),
      ];
      this.myTurn = true;
      this.gameOver = false;
      this.wonOrLost = null;
      this.showAttackInfo = false
      this.miniGame = new MiniGame(); // Mini-game instance
    }
    setOpponent(opponentData) { 
      this.opponent = new Character(480,100, opponentData.health)
    }

    display() {
      if (this.gameOver) return this.displayGameOver();

      // Display characters
      this.player.draw();
      this.opponent.draw();
        // Display mini-game if active
      if (this.miniGame.active) {
        this.miniGame.update();
        this.miniGame.draw();
      } else {
        // Display attack options
        for (let i = 0; i < this.attacks.length; i++) {
          this.attacks[i].displayButton();
        }

        this.displayTurn();
        this.displayMouseCoordinates();
        this.displayAttackInfo()
        this.displayToggleButton()
      
    }
    }

  playerAttack(index) {
      if (!this.myTurn || this.gameOver) return;

      const attack = this.attacks[index];
      if (attack.usesRemaining > 0) {
        this.miniGame.increaseDifficulty(scene.currentOpponent || 0);
        const baseDamage = attack.use();
        
        this.miniGame.start((multiplier) => {
          // Adjusted damage calculation:
          // 1. Base minimum is now 40% of base damage
          const minimumDamage = Math.ceil(baseDamage * 0.4);
          // 2. Apply multiplier more consistently
          const calculatedDamage = round(baseDamage * (0.4 + (multiplier * 0.6)));
          // 3. Ensure damage stays within reasonable bounds
          const finalDamage = Math.min(
            Math.max(minimumDamage, calculatedDamage),
            attack.damageRange[1]
          );
          
          console.log(`Base damage: ${baseDamage}, Multiplier: ${multiplier}, Final damage: ${finalDamage}`);
          
          if (this.opponent) {
            this.opponent.takeDamage(finalDamage);
            console.log(`Opponent health after damage: ${this.opponent.health}`);
          }

          if (this.opponent.health <= 0) {
            this.checkGameOver();
            return;
          }

          this.myTurn = false;
          setTimeout(() => this.opponentTurn(), 2000);
        });
      }
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
      }, 2000); // 3-second delay before returning to map scene
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
      text("Attack Info", width - 80, height - 35); // Button label
      pop();
    }
    displayAttackInfo() {
      if (!this.showAttackInfo) return;

      push();
      fill(0, 0, 255, 150);
      rect(width / 2 - 200, height / 2 - 100, 400, 200);
      fill(255);
      textSize(16);
      textAlign(CENTER, CENTER);
      
      // Title
      textSize(20);
      text("Attack Information", width / 2, height / 2 - 80);
      textSize(16);
      
      for (let i = 0; i < this.attacks.length; i++) {
        const attack = this.attacks[i];
        const minDamage = Math.ceil(attack.damageRange[0] * 0.4); // Minimum possible damage
        const maxDamage = attack.damageRange[1]; // Maximum possible damage
        
        text(
          `${attack.name}: ${minDamage}-${maxDamage} dmg (${attack.usesRemaining}/${attack.maxUses} uses)`,
          width / 2,
          height / 2 - 40 + i * 30
        );
      }
      pop();
    }

    toggleAttackInfo() {
      this.showAttackInfo = !this.showAttackInfo; // Toggle the flag
    }
  }
  function mouseClicked() {
    if (!scene.sceneActive) {
      if (game.miniGame.active) {
        // Handle mini-game click
        game.miniGame.checkHit();
      } else if (game.myTurn) {
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
        push()
        fill(this.color)
        square(this.xPos, this.yPos, this.size);
        line(0, this.yPos + this.size, width, this.yPos + this.size);
        pop()
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

let prologue= new Prologue 
  let scene;
  let game;
  let startMenu;
  let gameStarted = false;

  function setup() {
    createCanvas(800, 800);
    scene = new ShowMap();
    game = new Game();
    startMenu = new StartMenu();

  }

  function draw() {
    if (!gameStarted) {
      startMenu.display();
    } else {
      background(225);
      if (scene.sceneActive) {
        scene.display(); // Display map scene if active
      } else {
        game.display(); // Display battle scene if collision occurred
      }
    }
  }