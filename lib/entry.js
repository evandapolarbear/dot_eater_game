import { gameVars } from './game';
import GameView from './game_view';

let game;

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  canvas.width = gameVars.X_SIZE;
  canvas.height = gameVars.X_SIZE;

  const ctx = canvas.getContext("2d");
  game = new GameView(ctx);
  game.start();

});

// document.getElementById('start-button').addEventListener("click", () => {
//   console.log('fuckkkkkkkkkkk');
//   const canvas = document.getElementById("canvas");
//   canvas.classList.remove('opening-hide');
//   document.getElementById('start-button').classList.add('hidden');
//   canvas.width = gameVars.X_SIZE;
//   canvas.height = gameVars.X_SIZE;
//
//   const ctx = canvas.getContext("2d");
//   game = new GameView(ctx);
//   game.start();
//
// });

document.getElementById("pause-button").addEventListener('click', () => {

  let button = document.getElementById("pause-button");

  if (!game.paused){
    game.paused = true;
    button.innerHTML = "play";
  } else {
    game.paused = false;
    button.innerHTML = "pause";
  }
});
