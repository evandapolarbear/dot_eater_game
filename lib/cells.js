import MovingObject from './moving_objects';
import {gameVars} from './game';

class Cell extends MovingObject{
  constructor (options) {
    options.color = "green";
    options.radius = 15;
    super(options);
  }

  revector(){
    if (this.pos[0] <= 0 || this.pos[0] >= gameVars.X_SIZE) {
      this.vel[0] = this.vel[0] * -1;
    } else if (this.pos[1] <= 0 || this.pos[1] >= gameVars.Y_SIZE){
      this.vel[1] = this.vel[1] * -1;
    }
  }
}

export default Cell;
