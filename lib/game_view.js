import {Game} from './game';

class GameView {
  constructor (ctx) {
    this.ctx = ctx;
    this.game = new Game;
  }

  start(){
    setInterval(() => {
      this.game.step(this.ctx);
      this.game.draw(this.ctx);
    }, 20);
  }
}

export default GameView;
