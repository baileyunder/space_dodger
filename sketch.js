let ship;
let shipImg;
let bullets = [];
let meteors1 = [];
let meteors2 = [];
let score = 0;
let gamestate = 0;

function preload() {
  shipImg = loadImage("starship.png");
}

function setup() {
  createCanvas(600, 600);
  ship = new Ship(width / 2, height - 50, 40, 30);
}

//Initialization of interactive game screen 
function init() {
  meteors1 = [];
  meteors2 = [];
  for (let i = 0; i < 100; i++) {
    meteors1.push(new Meteor1(random(width), random(-height / 2)));
  }

  for (let i = 0; i < 10; i++) {
    meteors2.push(new Meteor2(random(width), random(-height / 2)));
  }
}

function draw() {
  background(0);
  if (gamestate === 0) {
    push();
    fill('white');
    textSize(30);
    text('SPACE DODGER', width / 2 - 125, height / 4, 300, 300);
    pop();
    push();
    rect(width / 2 - 40, height / 2 - 30, 80, 60);
    fill(0);
    text('Start', width / 2 - 15, height / 2 + 5);
    pop();
    if (mouseIsPressed && mouseX > width / 2 - 40 && mouseX < width / 2 + 40 && mouseY > height / 2 - 30 && mouseY < height / 2 + 30) {
      gamestate = 1;
      init();
    }
  } // End of gamestate 0

  if (gamestate === 1 || gamestate === 2) {
    ship.display();

    //ship controls
    if (keyIsDown(65) && gamestate === 1) {
      ship.hmove(-4);
    }
    if (keyIsDown(68) && gamestate === 1) {
      ship.hmove(4);
    }
    if (keyIsDown(87) && gamestate === 1) {
      ship.vmove(-4);
    }
    if (keyIsDown(83) && gamestate === 1) {
      ship.vmove(4);
    }

    for (let i = bullets.length - 1; i >= 0; i--) {
      bullets[i].move();
      bullets[i].display();
      //Remove bullets from array when they leave screen.
      if (bullets[i].y < 0) {
        bullets.splice(i, 1);
      }
    }

    //display type 1 meteors
    for (let i = meteors1.length - 1; i >= 0; i--) {
      if (gamestate === 1) {
        meteors1[i].move();
      }
      meteors1[i].display();
      if (ship.intersect(meteors1[i]) === true) {
        gamestate = 2;
      }
      if (meteors1[i].y > height) {
        meteors1.push(new Meteor1(random(width), random(-height / 2)));
        meteors1.splice(i, 1);
      }
      for (let j = 0; j < bullets.length; j++) {
        if (bullets[j].intersect(meteors1[i])) {
          meteors1.push(new Meteor1(random(width), random(-height / 2)));
          meteors1.splice(i, 1);
          bullets.splice(j, 1);
          score += 5;
          break;
        }
      }
    }

    //display type 2 meteors
    for (let i = meteors2.length - 1; i >= 0; i--) {
      if (gamestate === 1) {
        meteors2[i].move();
      }
      meteors2[i].display();
      if (ship.intersect(meteors2[i]) === true) {
        gamestate = 2;
      }
      if (meteors2[i].y > height) {
        meteors2.push(new Meteor2(random(width), random(-height / 2)));
        meteors2.splice(i, 1);
      }
      for (let j = 0; j < bullets.length; j++) {
        if (bullets[j].intersect(meteors2[i])) {
          bullets.splice(j, 1);
          break;
        }
      }
    }

    //Score display
    push();
    fill('white');
    textSize(20);
    text('Score:' + score, 500, 25);
    pop();

    if (ship.health === 0) {
      gamestate = 3;
    }

  } // End of gamestate 1 and gamestate 2

  if (gamestate === 3) { //GameOver screen
    push();
    fill('white');
    textSize(70);
    text('GAME OVER', 85, 75);
    text('Score:' + score, width / 4, height / 2 + 5);
    pop();
  } // End of gamestate 3

} // End of draw

function keyPressed() {
  if (keyCode === 32 && gamestate === 1) {
    bullets.push(new Bullet(ship.x + 20, ship.y));
  }

  if (keyCode === 13 && gamestate === 2) {
    gamestate = 1;
    init();
    ship.health--;
    ship.x = width / 2;
    ship.y = height - 50;
    score = score;
  }

  if (keyCode === 13 && gamestate === 3) {
    gamestate = 0;
    ship.health = 3;
    score = 0;
  }
}