import {Util} from './utils';
import Cell from './cells';
import PlayerCell from './player_cell';

export class Game {
  constructor() {
    this.moveObjects = this.moveObjects.bind(this);

    let playerStart = Util.randomPosition(gameVars.X_SIZE, gameVars.Y_SIZE);
    this.playerCell = new PlayerCell({pos: playerStart, vel: [0,0]});

    this.cells = this.addCells();
  }

  addCells(){
    let cells = [];
    this.keyBindings();


    for (var i = 0; i < gameVars.NUM_CELLS; i++) {
      let cellVel = Util.randomVelocity();
      let cellPos = Util.randomPosition(gameVars.X_SIZE, gameVars.Y_SIZE);
      cells.push(new Cell({vel: cellVel, pos: cellPos}));
    }

    let playerStart = Util.randomPosition(gameVars.X_SIZE, gameVars.Y_SIZE);

    cells.push(this.playerCell);
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

  keyBindings(){
    key('w', () => this.playerCell.navigate([0, -1]));
    key('s', () => this.playerCell.navigate([0, 1]));
    key('a', () => this.playerCell.navigate([-1, 0]));
    key('d', () => this.playerCell.navigate([1, 0]));
  }
}

export const gameVars = {
  X_SIZE: window.innerWidth,
  Y_SIZE: window.innerHeight,
  NUM_CELLS: 20
};
