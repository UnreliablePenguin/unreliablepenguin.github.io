//Main Star field
function nebula() {
    this.container = null;
    this.canvas = null;
    this.width = 0;
    this.height = 0;
    this.capacity = 100;
    this.velocity = 20;
    this.updateRate = 144;
    this.intervalId = 0;
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
  self.canvas = canvas;

  //Expand the canvas to match window size
  self.canvas.width = self.width - 20; //To accomodate the scroll bar
  self.canvas.height = self.height;

  //Assign a listener to listen for a screen size change
  window.addEventListener('resize', function resize(event) {
    self.width = window.innerWidth;
    self.height = window.innerHeight;
    self.canvas.width = self.width-20;
    self.canvas.height = self.height;
    self.draw()
  });
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

  var self = this;

  //Update Position Timer
  this.intervalId = setInterval(function() {
    self.update();
    self.draw();
  }, 1000 / self.updateRate);
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

//Add Position Update function
nebula.prototype.update = function() {
  //Move each star
  for(var i=0; i<this.capacity; i++) {
    var star = this.stars[i];
    star.y += this.velocity*star.size/144;
    if(star.y > this.height) {
      this.stars[i].x = Math.random()*this.width;
      this.stars[i].y = 0;
    }
  }
}
