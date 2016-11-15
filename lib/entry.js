import Game from './game';
import GameView from './game_view';



document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  canvas.width = Game.xSize;
  canvas.height = Game.ySize;

  const ctx = canvas.getContext("2d");
  const game = new Game();

});
