const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var engine, world;
var scene, zombie, tower, ground, walking_zombie, killed_zombie, soldier, bullet;
var sceneImage, towerImage, angle, score;
var bullets = [];
var zombies = [];

function preload() {
  sceneImage = loadImage("assets/background.png");
  towerImage = loadImage("assets/tower.png");
}

function setup() {
  createCanvas(1200, 600);

  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  angle = 15;

  var options = {
    isStatic: true
  }

  ground = Bodies.rectangle(600, 600, 1200, 10, options);
  World.add(world, ground);

  tower = Bodies.rectangle(200, 440, 200, 400, options);
  World.add(world, tower);

  soldier = new Soldier(220, 250, 100, 100, angle);
  bullet = new Bullet(soldier.x, soldier.y - 30);

  zombie = new Zombie(300, height - 70, 300, 300);

  score = 0;

  rectMode(CENTER);
}


function draw() {
  background(sceneImage);
  Engine.update(engine);

  textSize(20);
  fill("black");
  text(`Score: ${score}`, 1000, 100);

  push();
  rect(ground.position.x, ground.position.y, 1200, 10);
  pop();

  push();
  imageMode(CENTER);
  image(towerImage, tower.position.x, tower.position.y, 200, 400);
  pop();

  soldier.show();
  zombie.show();
  showZombie();

  if (keyCode === 32) {
    bullet.shoot();
  }

  for (var i = 0; i < bullets.length; i++) {
    showBullets(bullets[i], i);
    collisionWithZombies(i);
  }
}

function keyPressed() {
  if (keyCode === 32) {
    bullet = new Bullet(soldier.x, soldier.y - 30);
    bullets.push(bullet);
  }
}

function showBullets(bullet, i) {
  if (bullet) {
    bullet.show();
  }
}

function keyReleased() {
  if (keyCode === 32) {
    bullets[bullets.length - 1].shoot();
  }
}

function collisionWithZombies(c) {
  for (var i = 0; i < zombies.length; i++) {
    if (zombies[i] != undefined && bullets[c] != undefined) {
      var collision = Matter.SAT.collides(zombies[i].body, bullets[c].body);

      if (collision.collided) {
        bullets[c].remove(c);
        zombies[i].remove(i);

        score += 1
      }
    }
  }
}

function showZombie() {
  if (zombies.length > 0) {
    if (zombies[zombies.length - 1] == undefined || zombies[zombies.length - 1].body.position.x > width - 500) {
      var pos = [-20, -40, -60];
      var posRandom = random(pos);
      var zombie = new Zombie(300, height - 70, 100, 100, posRandom);
      zombies.push(zombie);
    }
    for (var i = 0; i < zombies.length; i++) {
      if (zombies[i]) {
        Matter.Body.setVelocity(zombies[i].body, {
          x: 0.9,
          y: 0
        });
        zombies[i].show();
      } else {
        zombies[i];
      }
    }
  } else {
    var zombie = new Zombie(300, height - 90, 100, 100, -60);
    zombies.push(zombie);
  }
}