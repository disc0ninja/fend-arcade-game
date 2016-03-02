// Enemies our player must avoid
// Variable to keep Count of living enemies
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Randomly select spawn x location
    var spawnSelectX = function() {
      var xLoc = Math.random();
      console.log(xLoc);
      if (xLoc >= 0.5) {
        console.log("Left should be the x value");
        xLoc = 0;
      } else if (xLoc < 0.5) {
        console.log("Right it is!");
        xLoc = 505;
      } else {
        console.log("something seems to have gone wrong");
      }
      return xLoc;
    };

      // Randomly select enemy y location
      var spawnSelectY = function() {
        var yLoc = Math.random();
        console.log(yLoc);
        if (yLoc >= 0.5) {
          console.log("First lane it is");
          yLoc = 50;
        } else if (yLoc < 0.5) {
          console.log("Second lane it is!");
          yLoc = 100;
        } else {
          console.log("something seems to have gone wrong");
        }
        return yLoc;
      };
    // Calls spawnSelectX and Y and sets spawn location for enemy
    this.y = spawnSelectY();
    this.x = spawnSelectX();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //console.log(this.x++ * dt);
    this.x++ * dt;

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.update = function(dt) {
  //console.log("Update");
};

Player.prototype.render = function() {
  //console.log("player render");
};

Player.prototype.handleInput = function() {
  console.log("handling input");
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
allEnemies[0] = new Enemy();
allEnemies[1] = new Enemy();
allEnemies[2] = new Enemy();
allEnemies[3] = new Enemy();
allEnemies[4] = new Enemy();
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
