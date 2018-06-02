//Main Star field
function nebula() {
    this.container = null;
    this.canvas = null;
    this.width = 0;
    this.height = 0;
    this.capacity = 100;
}

//Init
nebula.prototype.init = function() {
  //Declare THIS
  var self = this;

  //Get DIV
  var div = document.getElementById('nebula');

  //Match Window Size *NOT DIV SIZE*
  self.width = window.innerWidth;
  self.height = window.innerHeight;

  //Create canvas
  var canvas = document.createElement('canvas');

  //Put it inside the DIV
  div.appendChild(canvas);

  //Add canvas to THIS
  this.canvas = canvas;

  //Expand the canvas to match window size
  this.canvas.width = this.width - 20; //To accomodate the scroll bar
  this.canvas.height = this.height;
}

//Star
function star(x, y, size) {
  this.x = x;
  this.y = y;
  this.size = size;
}

//Not initializing, but actuall making the cluster of STARS
nebula.prototype.create = function() {
  //Not really a nebula... BUT A CLUSTER OF STARS
  var stars = [];
  var x, y, size;

  //Create a bunch of STARS
  for(var i=0; i<this.capacity; i++) {
    x = Math.random()*this.width;
    y = Math.random()*this.height;
    size = Math.random()*10; // :D

    stars[i] = new star(x, y, size)
  }
  this.stars = stars;
}

//Actually drawing stuff
nebula.prototype.draw = function() {
  //Get drawing context
  var context = this.canvas.getContext("2d");

  //Draw background
  context.fillStyle = "#000000";
  context.fillRect(0, 0, this.width, this.height);

  //Draw the things
  context.fillStyle = "#EEEEFF";
  for(var i=0; i<this.stars.length; i++) {
    var star = this.stars[i];
    context.fillRect(star.x, star.y, star.size, star.size);
  }

}
