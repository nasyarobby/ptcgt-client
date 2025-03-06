import Phaser, { Scene } from "phaser";
import { Card } from "../Card";
import { HAND_HEIGHT, HEIGHT, WIDTH } from "../config";

export class GameTable extends Scene {
  constructor() {
    super("GameTable");
  }

  create() {
    const playmat = this.add.image(WIDTH/2, HEIGHT/2, 'playmat').setOrigin(0, 0)

    const cards = this.registry.get("cards")
    /**
     * @type {{id: string, name: string, deck: {cards: any[], deck: any[]}}[]}
     */
    const players = this.registry.get("players")

    players[0].deck.deck.forEach((card, index) => {
      const cardData = cards.find(c=>c.id === '0-'+card.id)
      const isRevealed = card.v === 'Y' ? true: false
      console.log(cardData, isRevealed, 0+index*10)
      const cardObj = new Card(this, cardData.id, cardData, playmat.x+index*10+28,playmat.y+60,'table', 54)
      cardObj.setInteractive({
        useHandCursor: true,
      })
      .on("pointerdown", () => {
        this.objectClicked = cardObj

        if(this.selectedCard && this.selectedCard !== cardObj) this.selectedCard.setHighlight(false)
        this.selectedCard = cardObj
      })
      .on("pointerup", () => {
        this.objectClicked = null
        if(this.selectedCard === cardObj) {
          console.log("same card");
          cardObj.setHighlight(true)
        }
        else {
          this.selectedCard = null;
        }
      })
    })

    this.add.line(0,0,100,100,200,200,0xfff)
    
    // move around
    const drag = (pointer) => {
      console.log("dragging")
      if(this.selectedCard && this.objectClicked === this.selectedCard && this.selectedCard.isHighlighted) {
        this.objectClicked.x += (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
        this.objectClicked.y += (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
        this.objectClicked.update();
        return;
      }
      this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
      this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
    }
    this.input.on("pointerdown", (pointer) => {
      console.log("set listener", pointer.x, pointer.y)
      this.input.on('pointermove', drag)
    })

    this.input.on('pointerup', () => {
      if(this.objectClicked) {
        this.objectClicked = null
      }
      console.log("removing")
      this.input.removeListener('pointermove', drag)
    })

    this.cameras.main.scrollX = playmat.width/2
    this.cameras.main.scrollY = playmat.height/2
    this.cameras.main.zoomTo(0.65, 1000, Phaser.Math.Easing.Bounce.Out)
      const ZOOM_STEP = 0.2
      const ZOOM_STEP_MOBILE =  0.05

    this.input.on("wheel", (pointer, gameObjects, deltaX, deltaY, deltaZ) => {
      var keyObject = this.input.keyboard.addKey("CTRL"); // Get key object
      var isDown = keyObject.isDown;

      if(isDown) {
        if(deltaY > 0)
        this.cameras.main.rotation -= Math.PI / 10
      else {
        this.cameras.main.rotation += Math.PI / 10
      }
        return;
      }

      if (deltaY > 0) {
        if (this.cameras.main.zoom - ZOOM_STEP > 0.2) this.cameras.main.zoom -= ZOOM_STEP;

      }

      if (deltaY < 0) {
        this.cameras.main.zoom += ZOOM_STEP;
      }
      console.log("Zooming", this.cameras.main.zoom)

      //this.camera.centerOn(pointer.x, pointer.y);
    });
    
  }

}
