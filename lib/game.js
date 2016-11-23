import {Util} from './utils';
import Cell from './cells';
import PlayerCell from './player_cell';

export class Game {
  constructor() {
    this.cells = this.addCells();
    this.moveObjects = this.moveObjects.bind(this);

    let playerStart = Util.randomPosition(gameVars.X_SIZE, gameVars.Y_SIZE);
    this.playerCell = new PlayerCell({pos: playerStart, vel: [0,0]});
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
    debugger;
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
    debugger;
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
    key('w', function(){ alert(this.playerCell.vel)});
    key('s', function(){this.playerCell.move([-1,0])});
    key('a', function(){PlayerCell.move([0,1])});
    key('d', function(){PlayerCell.move([0,-1])});
  }

}

export const gameVars = {
  X_SIZE: window.innerWidth,
  Y_SIZE: window.innerHeight,
  NUM_CELLS: 20
};
