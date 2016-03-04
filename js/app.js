// Variables to keep track of score, time and help control enemy spawns
var score = 0;
var spawnInterval = 1000;
var maxTime = 15000;
var currentTime = 0;
var timeSinceSpawn = 0;
var timeRemaining;


// Function that determines how much time is remaining

var checkTime = function() {
  timeRemaining = maxTime - currentTime;
  return timeRemaining;
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // function that determines enemy x spawn location
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

    // function that determines enemy y spawn location
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

    // Call the functions that set x and y spawn values for the enemy
    this.y = spawnSelectY();
    this.x = spawnSelectX();
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // Variables used to determine if the player and enemy are in the same space
  var collisionCheckLeft = this.x - 50;
  var collisionCheckRight = this.x + 50;
  var collisionCheckAbove = this.y - 50;
  var collisionCheckBelow = this.y + 50;
  // function that compares players x and y location relative to enemy's location
  var checkCollision = function() {
    if (player.x >= collisionCheckLeft && player.x <= collisionCheckRight) {
      console.log("player is in the same column as me");
      if (player.y > collisionCheckAbove && player.y < collisionCheckBelow) {
        console.log("HIT we 'av a hit!!!!!");
        currentTime = maxTime;
      }
    }
  }

  // Call function for collision check
  checkCollision();

  // Move enemy
  this.x++ * dt;
  // Update timeSinceSpawn
  timeSinceSpawn++;
  // Update currentTime
  currentTime++;
  // Check if time remains, and if not reload the page
  if (currentTime >= maxTime) {
    console.log(currentTime);
    location.reload();
  }
  // Determine if it's time to spwan more enemies
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
  // Player sprite and starting locations
  this.sprite = 'images/char-boy.png';
  this.x = 200;
  this.y = 400;
};

Player.prototype.update = function() {
  // Update's the players score on screen
    document.getElementById('score').innerHTML = score;
    checkTime();
  // Update time remaining on screen
    document.getElementById('time').innerHTML = Math.round(timeRemaining / 100);
};
// Draw the player on screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Takes keyboard input and acts on player accordingly
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
    };
};
// Now instantiate your objects.
// Array that stores all enemies
var allEnemies = [];
// function that loops through enemy creation >]
var spawnBaddies = function(arg) {
  var i = 0;
  while (i < arg) {
    allEnemies[allEnemies.length] = new Enemy();
    i++;
  };
}
// Initial enemy spawn call
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
