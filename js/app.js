// Enemies our player must avoid
// Variable to keep Count of living enemies

var score = 0;
var spawnInterval = 1000;
var maxTime = 15000;
var currentTime = 0;
var timeSinceSpawn = 0;

var timeRemaining;
// function to calculate timeRemaining
var checkTime = function() {
  timeRemaining = maxTime - currentTime;
  return timeRemaining;
}

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // Randomly select spawn x location
    var spawnSelectX = function() {
      var xLoc = Math.random();
      if (xLoc < 0.2) {
        xLoc = 0;
      } else if (xLoc >= 0.2 && xLoc <= 0.4) {
        xLoc = -2;
      } else if (xLoc >=0.4 && xLoc <= 0.6) {
        xLoc = -4;
      } else if (xLoc >= 0.6 && xLoc <= 0.8) {
        xLoc = -6;
      } else if (xLoc >= 0.8 && xLoc <= 1) {
        xLoc = -0;
      } else {
        console.log("something seems to have gone wrong");
      }
      return xLoc;
    };

      // Randomly select enemy y location
    var spawnSelectY = function() {
      var yLoc = Math.random();
      if (yLoc < 0.2) {
        yLoc = 50;
      } else if (yLoc >= 0.2 && yLoc <= 0.4) {
        yLoc = 100;
      } else if (yLoc >=0.4 && yLoc <= 0.6) {
        yLoc = 150;
      } else if (yLoc >= 0.6 && yLoc <= 0.8) {
        yLoc = 200;
      } else if (yLoc >= 0.8 && yLoc <= 1) {
        yLoc = 250;
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
  var collisionCheckLeft = this.x - 50;
  var collisionCheckRight = this.x + 50;
  var collisionCheckAbove = this.y - 50;
  var collisionCheckBelow = this.y + 50;
  // if player's x and y locations are within the margin of this enemy's x and y location check reset game
  var checkCollision = function() {
    if (player.x >= collisionCheckLeft && player.x <= collisionCheckRight) {
      console.log("player is in the same column as me");
      if (player.y > collisionCheckAbove && player.y < collisionCheckBelow) {
        console.log("HIT we 'av a hit!!!!!");
        currentTime = maxTime;
      }
    }
  }

  checkCollision();


  this.x++ * dt;
  timeSinceSpawn++;
  currentTime++;
  if (currentTime >= maxTime) {
    console.log(currentTime);
    location.reload();
  }
  //console.log(timeSinceSpawn);
  if (timeSinceSpawn === spawnInterval) {
    spawnBaddies(1);
    timeSinceSpawn = 0;
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 400;
};

Player.prototype.update = function() {
  // Update's the players score
    document.getElementById('score').innerHTML = score;
    checkTime();
    document.getElementById('time').innerHTML = Math.round(timeRemaining / 100);
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key, dt) {
    console.log(key);
    if (key === 'up' && this.y >= 50) {
      console.log("Move up!" + this.y);
      player.update(this.y = this.y - 50);
    } else if (key === 'up' && this.y < 50) {
      this.y = 400;
      this.x = 200;
      score++;
    } else if (key === 'down' && this.y <= 350) {
      console.log("Move down!");
      player.update(this.y = this.y + 50);
    } else if (key === 'left' && this.x >= 100) {
      console.log("Move left!");
      player.update(this.x = this.x - 100);
    } else if (key === 'right' && this.x <= 300) {
      console.log("Move right!");
      player.update(this.x = this.x + 100);
    }
    console.log(score);

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var allEnemies = [];
// loop through enemy creation >]
var spawnBaddies = function(arg) {
  var i = 0;
  while (i < arg) {
    allEnemies[allEnemies.length] = new Enemy();
    i++;
  };
}

spawnBaddies(1);



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
