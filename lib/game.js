import {Util} from './utils';
import Cell from './cells';
import PlayerCell from './player_cell';

export class Game {
  constructor() {
    this.moveObjects = this.moveObjects.bind(this);
    this.collisionCheck = this.collisionCheck.bind(this);

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
      let cellRad = Util.randomRadius();
      console.log(cellRad);
      cells.push(new Cell({vel: cellVel, pos: cellPos, radius: cellRad}));
    }

    let playerStart = Util.randomPosition(gameVars.X_SIZE, gameVars.Y_SIZE);

    cells.push(this.playerCell);
    console.log(cells);
    return cells;
  }

  draw(ctx){
    ctx.clearRect(0,0, gameVars.X_SIZE, gameVars.Y_SIZE);
    this.cells.forEach(cell => {
      cell.draw(ctx);
    });
  }

  moveObjects(){
    this.cells.forEach(cell => {
      cell.revector();
      cell.move(cell.vel);
    });
  }

  collisionCheck(){
    for (let i = 0; i < this.cells.length; i++){
      for (var j = 0; j < this.cells.length; j++) {
        let cell1 = this.cells[i];
        let cell2 = this.cells[j];

        if (i !== j && cell1.isColliding(cell2)) {
          this.eat(cell1, cell2, i, j);
        }
      }
    }
  }

  eat(cell1, cell2, cell1Idx, cell2Idx){
    if(cell1.radius === cell2.radius) {
      return;
    } else if ( cell1.radius < cell2.radius ) {
      console.log("cell 2");
      cell2.radius += cell1.radius;
      this.cells.splice(cell1Idx, 1);
    }
    console.log(this.cells);
  }

  step(ctx){
    this.collisionCheck();
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
  NUM_CELLS: 10
};
