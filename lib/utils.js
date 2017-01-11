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
    const possibles = [10, 15, 20, 50, 60];

    const zeroToOne = Math.random();
    const rad = possibles[Math.floor(zeroToOne* 5)];
    return rad;
  },

  dist(cell1, cell2){
    const xD = Math.abs(cell1.pos[0] - cell2.pos[0]);
    const yD = Math.abs(cell1.pos[1] - cell2.pos[1]);
    return Math.sqrt((xD * xD) + (yD * yD));
  },

  clearsPlayerCell(player, cell){
    const dist = this.dist(player, cell);
    return (dist > (player.radius + cell.radius + 80));
  }
};
