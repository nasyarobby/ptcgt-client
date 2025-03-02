import Phaser from "phaser";
import { HEIGHT, WIDTH } from "../config";
import ws from "../socket";

export class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    this.add.image(796/2, 1280/2, 'playmat').setDepth(-100).preFX.addBlur(0, 0.2, 0.2, 30)

    if(ws.token) {
        this.scene.start('DeckManager');
    }

    var div = document.createElement('div');
    div.style = 'background-color: rgba(0,255,0,0.2); display: flex';
    const input = document.createElement('input')
    input.style = 'font-size: 25px;'
    const button = document.createElement('button')
    button.style = 'font-size: 25px;'
    button.innerText = 'Login'
    button.onclick = () => {
        ws.sendCmd('auth', {name: input.value})
    }
    div.appendChild(input)
    div.appendChild(button)

    const dom = this.add.dom(WIDTH/2,HEIGHT/2, div)
    
  }

}
