import {gameVars} from './game';

class MovingObject {
  constructor(options){
    this.pos = options.pos;
    this.vel = options.vel;
    this.radius = options.radius;
    this.color = options.color;
    this.game = options.game;
    this.isWrappable = true;
  }

  draw(ctx){
    ctx.fillStyle = this.color;

    ctx.beginPath();
    ctx.arc(
      this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
    );
    ctx.fill();
  }

  move(vel){
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
  }

  revector(){
    if (this.pos[0] <= 0 || this.pos[0] >= gameVars.X_SIZE) {
      this.vel[0] = this.vel[0] * -1;
    } else if (this.pos[1] <= 0 || this.pos[1] >= gameVars.Y_SIZE){
      this.vel[1] = this.vel[1] * -1;
    }
  }
}

export default MovingObject;
