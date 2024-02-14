import Game from "./assets/scenes/Game.js";
import Preload from "./assets/scenes/Preload.js";
import Menu from "./assets/scenes/Menu.js";
import LevelSelector from "./assets/scenes/LevelSelector.js";
import Tutorial from "./assets/scenes/Tutorial.js";
import GameOver from "./assets/scenes/GameOver.js";
import Win from "./assets/scenes/Win.js";
import Score from "./assets/scenes/Score.js";
import Credits from "./assets/scenes/Credits.js";
import Outro from "./assets/scenes/Outro.js";
import Introduction from "./assets/scenes/Introduction.js";
const config = {
  type: Phaser.AUTO,
  width: 1220,
  height: 763,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    min: {
      width: 1220,
      height: 763,
    },
    max: {
      width: 1220,
      height: 763,
    },
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 720 },
      debug: false,
    },
  },

  scene: [Preload, Menu, Game,LevelSelector,Tutorial,GameOver,Win,Score,Introduction,Outro, Credits],
};

window.game = new Phaser.Game(config);
