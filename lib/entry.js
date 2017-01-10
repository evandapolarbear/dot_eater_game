import { gameVars } from './game';
import GameView from './game_view';

(function(){
  let game, ctx;

  const canvas = document.getElementById('canvas')
  let startModal = document.getElementById('opening-modal');
  let endModal = document.getElementById('ending-modal');
  let button = document.getElementById("pause-button");


  document.addEventListener("DOMContentLoaded", () => {
    // const canvas = document.getElementById("canvas");
    canvas.width = gameVars.X_SIZE;
    canvas.height = gameVars.X_SIZE;

    ctx = canvas.getContext("2d");
    game = new GameView(ctx);
    game.start();
  });

  document.getElementById('start-button').addEventListener("click", () => {

    // let modal = document.getElementById('opening-modal');
    // const canvas = document.getElementById("canvas");

    canvas.classList.remove('opening-hide');
    startModal.classList.add('hidden');

    game.end();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx = canvas.getContext("2d");
    game = new GameView(ctx);
    game.start();
  });

  document.getElementById('start-over-button').addEventListener("click", () => {

    canvas.classList.remove('opening-hide');
    endModal.classList.add('hidden');

    game.end();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx = canvas.getContext("2d");
    game = new GameView(ctx);

    game.start();
  });

  document.getElementById("pause-button").addEventListener('click', () => {

    if (!game.paused){
      game.paused = true;
      pauseButton.innerHTML = "play";
    } else {
      game.paused = false;
      pauseButton.innerHTML = "pause";
    }
  });
}());
