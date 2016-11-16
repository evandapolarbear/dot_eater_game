import MovingObject from './moving_objects';

class Cell extends MovingObject{
  constructor (options) {
    options.color = "green";
    options.radius = 20;
    super(options);
  }
}

export default Cell;
