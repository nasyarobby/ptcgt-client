import Phaser from "phaser"
import { Boot } from "./scenes/Boot";
import { Hand } from "./scenes/Hand";
import { GameOver } from "./scenes/GameOver";
import { GameTable } from "./scenes/GameTable";
import { Preloader } from "./scenes/Preloader";
import { HEIGHT, WIDTH } from "./config";
import { MainMenu } from "./scenes/MainMenu";
import './index.css'
import { DeckManager } from "./scenes/DeckManager";

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
  },
  dom: {
    createContainer: true
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Boot, Preloader, MainMenu, DeckManager, GameTable, Hand, GameOver],
};

export default new Phaser.Game(config);
