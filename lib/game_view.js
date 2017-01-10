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
          this.fadeOut();
          this.paused = true;

          setTimeout(() => {
            this.game.step(this.ctx);
          }, 2000);

          setTimeout(this.fadeIn, 2000);

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
    console.log("fade out");
    let canvas = document.getElementById('black-out');
    canvas.classList.add('faded');
  }

  fadeIn(){
    console.log("fade in");
    let canvas = document.getElementById('black-out');
    canvas.classList.remove('faded');
  }
}

export default GameView;
