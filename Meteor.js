// Bug class
class Meteor1 {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.diameter = random(10, 30);
    this.speed = random(1,2);
    this.color = '#ff00ff';
  }

  move() {
    this.y += this.speed;
  }

  display() {
    push();
    fill(this.color);
    ellipse(this.x, this.y, this.diameter, this.diameter);
    pop();
  }
}

class Meteor2 {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.diameter = random(30, 50);
    this.speed = random(1,2);
    this.color = '#A9A9A9';
  }

  move() {
    this.y += this.speed;
  }

  display() {
    push();
    fill(this.color);
    ellipse(this.x, this.y, this.diameter, this.diameter);
    pop();
  }
}