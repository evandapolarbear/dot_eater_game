export const Util = {
  randomPosition (dimX, dimY) {
    return [Math.random() * dimX, Math.random() * dimY];
  },

  randomVelocity () {
    let x = Math.random() < .5 ? -1 : 1;
    let y = Math.random() < .5 ? -1 : 1;
    return [Math.random() * x, Math.random() * y];
  },

  randomRadius () {
    const possibles = [10, 15, 20, 50, 60, 70, 80, 90];

    const zeroToOne = Math.random();
    const rad = possibles[Math.floor(zeroToOne* 8)];
    return rad;
  }
};
