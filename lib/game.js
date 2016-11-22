import {Util} from './utils';
import Cell from './cells';
import PlayerCell from './player_cell';

export class Game {
  constructor() {
    this.cells = this.addCells();

    this.moveObjects = this.moveObjects.bind(this);
  }

  addCells(){
    let cells = [];

    for (var i = 0; i < gameVars.NUM_CELLS; i++) {
      let cellVel = Util.randomVelocity();
      let cellPos = Util.randomPosition(gameVars.X_SIZE, gameVars.YSIZE);
      cells.push(new Cell({vel: cellVel, pos: cellPos}));
    }

    let playerStart = Util.randomPosition(gameVars.X_SIZE, gameVars.YSIZE);
    cells.push(new PlayerCell({pos: playerStart}));

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
      cell.revector();
      cell.move(cell.vel);
    });
  }

  step(ctx){
    this.moveObjects();
    this.draw(ctx);
  }

}

export const gameVars = {
  X_SIZE: window.innerWidth,
  Y_SIZE: window.innerHeight,
  NUM_CELLS: 20
};
