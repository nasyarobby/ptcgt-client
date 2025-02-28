import { Boot } from "./scenes/Boot";
import { Hand } from "./scenes/Hand";
import { GameOver } from "./scenes/GameOver";
import { GameTable } from "./scenes/GameTable";
import { Preloader } from "./scenes/Preloader";
import { HEIGHT, WIDTH } from "./config";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig

const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  parent: "game-container",
  backgroundColor: "#028af8",
  input: {
    activePointers: 3,
    // ...
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Boot, Preloader, GameTable, Hand, GameOver],
};

export default new Phaser.Game(config);
