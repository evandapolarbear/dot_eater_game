import MovingObject from './moving_objects';

class PlayerCell extends MovingObject {
  constructor(options){
    options.vel = [0,0];
    options.color = "red";
    options.radius = 20;
    super(options);
  }

  navigate(key){
    if (this.vel[0] < 3 && this.vel[0] > -3){
      this.vel[0] += key[0];
    }
    if (this.vel[1] < 3 && this.vel[1] > -3) {
      this.vel[1] += key[1];
    }
    console.log(this.vel);
  }
}

export default PlayerCell;
