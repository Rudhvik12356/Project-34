class Zombie {
  constructor(x, y, w, h, zombiePos) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    var options = {
      restitution: 0.1
    }
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.image = loadImage("assets/walking_zombie.gif");
    this.w = w;
    this.h = h;
    this.zombiePos = zombiePos;
    World.add(world, this.body);
  }

  remove(i) {
    setTimeout(() => {
      World.remove(world, this.body);
      delete zombies[i];
    }, 0);
  }
  show() {
    var pos = this.body.position;

    push();
    translate(pos.x, pos.y);
    imageMode(CENTER);
    image(this.image, 0, this.zombiePos, this.w, this.h);
    pop();
  }
}