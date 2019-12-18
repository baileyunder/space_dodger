//Player's ship
class Ship {
  constructor(x, y, _height, _width) {
    this.x = x;
    this.y = y;
    //hitbox for ship
    this.vdiameter = _height;
    this.hdiameter = _width;
    this.health = 3;
  }

  vmove(speed) {
      this.y += speed;
  }
  
  hmove(speed) {
    this.x += speed;
  }

  display() {
    image(shipImg, this.x, this.y, 40, 50);
    //ship boundaries
    if (this.x + 40 > width) {
      this.x = width - 40;
    }
    if (this.x < 0) {
      this.x = 0;
    }
    if (this.y < 0) {
      this.y = 0;
    }
    if (this.y + 50 > height) {
      this.y = height - 50;
    }
    //hitbox for ship
    push();
    noStroke();
    noFill();
    ellipse(this.x + 20, this.y + 25, this.hdiameter, this.vdiameter);
    pop();
  }
  
  intersect(meteor) {
    let d = dist(this.x + 20, this.y + 25, meteor.x, meteor.y);
    if (d < this.vdiameter / 2 + meteor.diameter / 2 && d < this.hdiameter / 2 + meteor.diameter / 2) {
      return true;
    } else {
      return false;
  }
  }
}