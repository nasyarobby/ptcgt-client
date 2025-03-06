import Phaser from "phaser";
import { HEIGHT, WIDTH } from "../config";

export class Background extends Phaser.Scene {
  constructor() {
    super("Background");
  }

  create() {
    // this.add.image(796/2, 1280/2, 'playmat')
    // .setDepth(-100)
    // .preFX.addBlur(0, 0.2, 0.2, 30)
    this.registry.set('menu', 'mainmenu')
    this.add.rectangle(0,0,HEIGHT*4, WIDTH*4)
    this.add.text(30,10, 'AnyTCG', {
      fontFamily: 'leaguespartan',
      fontSize: '64px'
    })
    const text = this.add.text(-270,900, 'DeckManager', {
      fontFamily: 'leaguespartan',
      fontSize: '32px'
    })
    text.setRotation(-Math.PI * 0.9 /2)
    const chariz = this.add.image(WIDTH-100,HEIGHT-180, "charizard_outline").setRotation(-0.25).setScale(0.8)
    const basicCard = this.add.image(WIDTH-100,HEIGHT-100, "basic_card_outline").setRotation(-0.25)

    this.registry.events.on('changedata', (p, k, v) => {
      if(k === 'menu') {
        if(v === 'dm')
        this.cameras.main.rotateTo(Math.PI * 0.9 / 2, true)
      if(v==='mainmenu')
        this.cameras.main.rotateTo(0, true)

      }
    })
  }

}
