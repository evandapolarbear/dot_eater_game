import MovingObject from './moving_objects';

class PlayerCell extends MovingObject {
  constructor(options){
    options.vel = [0,0];
    options.color = "#ea5252";
    options.radius = 30;
    super(options);

    this.navigate = this.navigate.bind(this);
  }

  navigate(key){

    if (this.speedLimiter(this.vel[0], key[0])){
      this.vel[0] += key[0];
    }

    if (this.speedLimiter(this.vel[1], key[1])) {
      this.vel[1] += key[1];
    }
  }

  speedLimiter(vel, move){
    const speedLimit = 3;

    if ((vel < speedLimit && vel > -speedLimit) || (vel + move < speedLimit && vel + move > -speedLimit)) {
      return true;
    }
    return false;
  }
}

export default PlayerCell;
