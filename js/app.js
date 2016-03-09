"use strict";
// Variables to help keep track of and display score and time
var score = 0;
var maxTime = 15000;
var currentTime = 0;
var timeRemaining;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Call the functions that set x and y spawn values for the enemy
    this.y = this.spawnSelectY();
    this.x = this.spawnSelectX();
};

// function that determines enemy x spawn location
Enemy.prototype.spawnSelectX = function() {
  var xLoc = Math.round(Math.random() * 10);
  return xLoc;
};

// function that determines enemy y spawn location
Enemy.prototype.spawnSelectY = function() {
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
  }
  return yLoc;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // Call function for collision check
  this.checkCollision();
  this.checkBounds();
  var speed = 75;
  // Move enemy
  this.x+= speed * dt;

};

// function that keeps enemies in boundaries
Enemy.prototype.checkBounds = function() {
  if (this.x >= 500) {
    this.x = this.spawnSelectX();
  }
};

// function that compares players x and y location relative to enemy's location
Enemy.prototype.checkCollision = function() {
  // Variables used to determine if the player and enemy are in the same space
  var collisionCheckLeft = this.x - 50;
  var collisionCheckRight = this.x + 50;
  var collisionCheckAbove = this.y - 75;
  var collisionCheckBelow = this.y + 75;

  if (player.x >= collisionCheckLeft && player.x <= collisionCheckRight) {
    if (player.y > collisionCheckAbove && player.y < collisionCheckBelow) {
      location.reload();
    }
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

Player.prototype.update = function(dt) {
  // Update's the players score on screen
    document.getElementById('score').innerHTML = score;
    this.checkTime();
  // Update time remaining on screen
    document.getElementById('time').innerHTML = Math.round(timeRemaining / 100);
};

// Function that determines how much time is remaining
Player.prototype.checkTime = function() {
  timeRemaining = maxTime - currentTime;

  // manage difficulty / add enemies
  var difficulty = 5;
  if (score > 500) {
    difficulty = 2;
  }
  //
  var arg = Math.round((allEnemies.length + score) / difficulty);

  if (allEnemies.length < 100) {
    while (allEnemies.length < arg) {
      allEnemies[allEnemies.length] = new Enemy();
    }
  }

  if (timeRemaining <= 0) {
    location.reload();
  } else {
    currentTime++;
  }

};

// Draw the player on screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Takes keyboard input and acts on player accordingly
Player.prototype.handleInput = function(key, dt) {
    if (key === 'up' && this.y >= 50) {
      this.update(this.y = this.y - 50);
      this.update(this.y = this.y - 50);
    } else if (key === 'up' && this.y < 50) {
      this.y = 400;
      this.x = 200;
      score+= 10;
    } else if (key === 'down' && this.y <= 350) {
      this.update(this.y = this.y + 50);
      this.update(this.y = this.y + 50);
    } else if (key === 'left' && this.x >= 100) {
      this.update(this.x = this.x - 100);
    } else if (key === 'right' && this.x <= 300) {
      this.update(this.x = this.x + 100);
    }
};

// Now instantiate your objects.

// Array that stores all enemies
var allEnemies = [];
// function that loops through enemy creation >]
allEnemies[0] = new Enemy();

// player stored in a variable
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
