import MovingObject from './moving_objects';

class PlayerCell extends MovingObject {
  constructor(options){
    options.vel = [0,0];
    options.color = "red";
    options.radius = 20;
    super(options);
  }

  navigate(key){
    this.vel[0] += key[0];
    this.vel[1] += key[1];
  }
}

export default PlayerCell;
