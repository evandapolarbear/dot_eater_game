import { gameVars } from './game';
import GameView from './game_view';



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  canvas.width = gameVars.X_SIZE;
  canvas.height = gameVars.X_SIZE;

  const ctx = canvas.getContext("2d");
  let game = new GameView(ctx);
  game.start();

});
