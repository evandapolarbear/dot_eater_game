export const Util = {
  randomPosition (dimX, dimY) {
    return [Math.random() * dimX, Math.random() * dimY];
  },

  randomVelocity () {
    let x = Math.random() < .5 ? -1 : 1;
    let y = Math.random() < .5 ? -1 : 1;
    return [Math.random() * x, Math.random() * y];
  }
};