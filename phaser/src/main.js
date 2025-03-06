import Phaser from "phaser"
import { Boot } from "./scenes/Boot";
import { Hand } from "./scenes/Hand";
import { GameTable } from "./scenes/GameTable";
import { Preloader } from "./scenes/Preloader";
import { HEIGHT, WIDTH } from "./config";
import { MainMenu } from "./scenes/MainMenu";
import { Background } from "./scenes/Background";
import './index.css'
import { DeckManager } from "./scenes/DeckManager";
import { Lobby } from "./scenes/Lobby";
import { JoinGame } from "./scenes/JoinGame";
import { ContinueGame } from "./scenes/ContinueGame";

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
  scene: [Boot, Preloader, Background, JoinGame, Lobby, ContinueGame,  MainMenu, DeckManager, GameTable, Hand],
};

export default new Phaser.Game(config);
