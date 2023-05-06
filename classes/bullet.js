class Bullet {
  constructor(x, y) {
    var options = {
      isStatic: true
    }

    this.r = 25;
    this.body = Bodies.circle(x, y, this.r, options);
    this.image = loadImage("assets/bullet.png");
    this.trajectory = [];
    World.add(world, this.body);
  }

  shoot() {
    var newAngle = soldier.a + 6;
    newAngle = newAngle * (3.14 / 180);
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.5);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, {
      x: velocity.x * (180 / 3.14),
      y: velocity.y * (180 / 3.14)
    });
  }

  remove(c) {
    Matter.Body.setVelocity(this.body, {
      x: 0,
      y: 0
    });

    setTimeout(() => {
      World.remove(world, this.body);
      delete bullets[c];
    }, 0)
  }

  show() {
    var pos = this.body.position;
    push();
    imageMode(CENTER);
    image(this.image, pos.x, pos.y, this.r, this.r);
    pop();

    if (pos.x >= 1200 || pos.y >= 500) {
      this.trajectory = [];
    }

    if (this.body.velocity.x > 0 && pos.x > 10) {
      var position = [pos.x, pos.y];
      this.trajectory.push(position);
    }

    for (var i = 0; i < this.trajectory.length; i++) {
      image(this.image, this.trajectory[i][0], this.trajectory[i][1], 10, 10);
    }
  }
}