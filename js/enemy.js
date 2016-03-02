// Baddies for our player to avoid
var Baddy = function() {
  // The image sprite for the Baddies
  this.sprite = 'images/enemy-bug.png';
  // Determine direction of Baddy based on random x value
  var randLocVal = function() {
    var left;
    var right;
    var xVals = [left, right];
    var yVals = [50, 100, 150, 200, 250];
    this.x = Math.floor((Math.random() * xVals.length));
    console.log(this.x + " is the baddies x loc");
  }
  randLocVal();
}

new Baddy();
