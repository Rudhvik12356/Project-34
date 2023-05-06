class Soldier {
  constructor(x, y, w, h, a){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.a = a;

    var options = {
      isStatic: true
    }

    this.body = Bodies.rectangle(x, y, w, h, options);
    this.bodyImage = loadImage("assets/soldier.png");
    World.add(world, this.body);
  }
  show(){
    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.bodyImage, 0, 0, this.w, this.h);
    pop();
  }
}