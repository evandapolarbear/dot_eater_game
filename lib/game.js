import {Util} from './utils';
import Cell from './cells';

export class Game {
  constructor() {
    this.cells = this.addCells();

    this.moveObjects = this.moveObjects.bind(this);
  }

  addCells(){
    let cells = [];

    for (var i = 0; i < gameVars.NUM_CELLS; i++) {
      cells.push(new Cell({vel: Util.randomVelocity(),
              pos: Util.randomPosition(gameVars.X_SIZE, gameVars.Y_SIZE)}));
    }

    return cells;
  }

  draw(ctx){
    ctx.clearRect(0,0, gameVars.X_SIZE, gameVars.Y_SIZE);
    this.cells.forEach(cell => {
      cell.draw(ctx);
    });
  }

  moveObjects(){
    this.cells.forEach(cell =>{
      cell.move(cell.vel);
    });
  }

  step(ctx){
    this.moveObjects();
    this.draw(ctx);
  }

}

export const gameVars = {
  X_SIZE: 1000,
  Y_SIZE: 600,
  NUM_CELLS: 20
};
