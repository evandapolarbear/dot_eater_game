import {Game} from './game';

class GameView {
  constructor (ctx) {
    this.ctx = ctx;
    this.game = new Game;
    this.paused = false;
    this.stillPlaying = true;
  }

  start(){
    setInterval(() => {
      if(!this.paused && this.stillPlaying){
        this.game.step(this.ctx);
        this.game.draw(this.ctx);

        if (this.game.cells.length < 3) {
          this.paused = true;
          setTimeout(() => {
            this.game.step(this.ctx);
          }, 2005);

          setTimeout(() => {
            this.paused = false;
          }, 4000);
        }
      }
    }, 20);
  }

  end(){
    this.stillPlaying = false;
  }

  fadeOut(){
    let canvas = document.getElementById('canvas');
    canvas.classList.add('faded');
  }

  fadeIn(){
    let canvas = document.getElementById('canvas');
    canvas.classList.remove('faded');
  }
}

export default GameView;
