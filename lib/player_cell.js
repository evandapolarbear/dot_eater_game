import MovingObject from './moving_objects';

class PlayerCell extends MovingObject {
  constructor(options){
    options.vel = [0,0];
    options.color = "red";
    options.radius = 20;
    super(options);
  }

  move(impulse){

  }
}

export default PlayerCell;
