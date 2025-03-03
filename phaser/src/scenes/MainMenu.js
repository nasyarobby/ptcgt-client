import Phaser from "phaser";
import { HEIGHT, WIDTH } from "../config";
import ws from "../socket";

export class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    this.scene.start("Background")

    if(ws.token) {
        this.scene.switch('DeckManager');
    }

    var mainMenu = document.createElement('div');
    mainMenu.style = 'background-color: rgba(0,0,0,0.7); height: 100%; width: 100%;';

    const container = document.createElement('div')
    container.style = 'display: flex; flex-direction: column;'
    container.className = 'deck-manager-container'

    ws.parsers.push(({
      cmd: 's_ok_auth',
      parser: (data,cmd) => {
        this.scene.switch("DeckManager")
      }
    }))

    const input = document.createElement('input')
    input.style = 'font-size: 32px;text-align:center'
    const button = document.createElement('button')
    button.style = 'font-size: 32px;'
    button.innerText = 'Login'
    button.onclick = () => {
        ws.sendCmd('auth', {name: input.value})
    }
    mainMenu.appendChild(container)
    container.appendChild(input)
    container.appendChild(button)

    const dom = this.add.dom(WIDTH/2,HEIGHT/2, mainMenu)
    
  }

}
