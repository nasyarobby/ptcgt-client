import Phaser, { Scene } from "phaser";
import { Card } from "../Card";
import { HAND_HEIGHT, HEIGHT } from "../config";

export class GameTable extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    this.add.image(796/2, 1280/2, 'playmat').setDepth(-100)
    this.playerCards = this.registry.get("playerCards")
    this.playerCardsInPlay = this.registry.get("playerCardsInPlay").map((data, index) => {
      const cardData = this.playerCards[data.index]
      const card = new Card(this, index, cardData, 100+((index+1)*120), 400, "table")
      const attachments = data.attachedCards ? data.attachedCards.map(n => {
        const attCard = this.playerCards[n]
        new Card(this, n, attCard, card.x, card.y-20, "table-attachment")
        .setDepth(card.depth-0.1)
      }) : []
    })

    this.cameras.main.zoomTo(1.0, 1000, Phaser.Math.Easing.Bounce.Out)


      const ZOOM_STEP = 1
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

    this.input.on('pointerup', () => {
      this.registry.set("playerSelectedCards", [])
    })

    this.input.on("pointermove", (pointer) => {

      if(pointer.downY > HEIGHT-HAND_HEIGHT) {
        return;
      }

      var amount = this.input.manager.pointersTotal;

      /**
       * @type {Card[]}
       */
      const cards = this.registry.get('playerSelectedCards')

      if(cards && cards.length) {
        // cards[0].x += (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
        // cards[0].y += (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
        return;
      }
      
      if (amount > 1 && this.input.pointer1.isDown && !this.input.pointer2.isDown ) {
        // this.cameras.main.worldView.x += pointer.position.x - pointer.prevPosition.x;
        // this.cameras.main.worldView.y += pointer.position.y - pointer.prevPosition.y;

        // this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
        // this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;

        return
      }


      if (amount > 1 && this.input.pointer1.isDown && this.input.pointer2.isDown ) {
        const {pointer1, pointer2} = this.input
        if(pointer1.position.distance(pointer2.position) < pointer1.prevPosition.distance(pointer2.prevPosition)) {
        if (this.cameras.main.zoom - ZOOM_STEP_MOBILE > 0.8) {
          this.cameras.main.zoom -= ZOOM_STEP_MOBILE;
        }
          
        }

        if(pointer1.position.distance(pointer2.position) > pointer1.prevPosition.distance(pointer2.prevPosition)) {
          if (this.cameras.main.zoom + ZOOM_STEP_MOBILE < 7) {
          this.cameras.main.zoom += ZOOM_STEP_MOBILE;
          }
        }

        return
      }

      // if ((pointer.isDown && pointer.button === 0)) {
      //   this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
      //   this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;
      // }
    });


    
  }

}
