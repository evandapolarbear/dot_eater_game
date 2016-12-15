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
      }
    }, 20);
  }

  end(){
    this.stillPlaying = false;
  }
}

export default GameView;
