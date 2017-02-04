import { Util } from './utils';
import Cell from './cells';
import PlayerCell from './player_cell';


export class Game {
  constructor() {
    this.moveObjects = this.moveObjects.bind(this);
    this.collisionCheck = this.collisionCheck.bind(this);
    this.addPlayerCell = this.addPlayerCell.bind(this);
    this.addMoreCells = this.addMoreCells.bind(this);

    let playerStart = Util.randomPosition(gameVars.X_SIZE, gameVars.Y_SIZE);
    this.playerCell = new PlayerCell({pos: playerStart, vel: [0,0]});

    this.cells = [];
    this.addPlayerCell();
    this.cells = this.cells.concat(this.addCells());
  }

  addCells(){
    this.keyBindings();
    let cells = [];

    let i = 0;

    while (i < gameVars.NUM_CELLS) {
      let cellVel = Util.randomVelocity();
      let cellPos = Util.randomPosition(gameVars.X_SIZE, gameVars.Y_SIZE);
      let cellRad = Util.randomRadius();

      let newCell = new Cell({vel: cellVel, pos: cellPos, radius: cellRad});

      if (Util.clearsPlayerCell(this.playerCell, newCell)) {
        cells.push(newCell);
        i++;
      }
    }
    return cells;
  }

  addPlayerCell(){


    for(var i = 0; i < this.cells.length; i++){

    }

    let playerStart = Util.randomPosition(gameVars.X_SIZE, gameVars.Y_SIZE);
    this.cells.push(this.playerCell);
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
      if(cell2 === this.playerCell){
        gameVars.score += cell1.radius;
      } else if (cell1===this.playerCell) {
        let modal = document.getElementById('ending-modal');
        const canvas = document.getElementById("canvas");
        let opening = document.getElementById('opening-modal');


        console.log(opening.classList.contains('hidden'));
        if(opening.classList.contains('hidden')){
          canvas.classList.add('opening-hide');
          modal.classList.remove('hidden');
        }
      }


      cell2.radius += cell1.radius;
      this.cells.splice(cell1Idx, 1);
    }
  }

  updateScore(){
    document.getElementById('score-counter').innerHTML = "Score: " + Math.floor(gameVars.score);
    document.getElementById("level-counter").innerHTML = 'Level: ' + gameVars.level;
  }

  step(ctx){
    this.collisionCheck();
    this.updateScore();
    this.moveObjects();
    this.draw(ctx);
    this.addMoreCells();
  }

  addMoreCells(){
    if (this.cells.length < 3) {

      this.fadeOut();

      setTimeout(() => (this.fadeIn()), 2000);

      gameVars.level += 1;
      document.getElementById("level-counter").innerHTML = 'Level: ' + gameVars.level;



      setTimeout(() => {
        this.playerCell.vel[0] = 0;
        this.playerCell.vel[1] = 0;

        this.cells.map(cell => {
          cell.radius = 30;
          return cell;
        });
        this.cells = this.cells.concat(this.addCells());
      }, 2000);
    }
  }

  fadeOut(){
    let canvas = document.getElementById('canvas');
    canvas.classList.add('faded');
  }

  fadeIn(){
    let canvas = document.getElementById('canvas');
    canvas.classList.remove('faded');
  }


  keyBindings(){
    key('w', () => this.playerCell.navigate([0, -1]));
    key('s', () => this.playerCell.navigate([0, 1]));
    key('a', () => this.playerCell.navigate([-1, 0]));
    key('d', () => this.playerCell.navigate([1, 0]));
  }
}

export let gameVars = {
  X_SIZE: window.innerWidth,
  Y_SIZE: window.innerHeight,
  NUM_CELLS: 10,
  level: 1,
  score: 0,
};
