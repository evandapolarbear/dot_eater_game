import MovingObject from './moving_object';

class cells extends MovingObject{
  constructor (options) {
    options.color = "green";
    options.radius = 20;
    super(options);
  }
}
