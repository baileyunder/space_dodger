// Bullet class
class Bullet {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.vdiameter = 15;
    this.hdiameter = 5;
    this.speed = 5;
    this.color = 'white';
  }

  move() {
    this.y = this.y - this.speed;
  }

  display() {
    push();
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.hdiameter, this.vdiameter);
    pop();
  }
  
  intersect(meteor) {
    let d = dist(this.x, this.y, meteor.x, meteor.y);
    if (d < this.vdiameter / 2 + meteor.diameter / 2 && d < this.hdiameter / 2 + meteor.diameter / 2) {
      return true;
    } 
      return false;
    }
}