import { Scene } from "phaser";
import { Card } from "../Card";
import { HAND_HEIGHT, HEIGHT, WIDTH } from "../config";

export class Hand extends Scene {
  constructor() {
    super({ key: "Game", active: true });
  }

  create() {

    this.add.rectangle(WIDTH/2,HEIGHT-HAND_HEIGHT/2, WIDTH, HAND_HEIGHT, 0xFFFFFF)
    let handWidth = 0


    const cards = [

      
    ].map((card, index) => {
      const cardInstance = new Card(this, index, card.id, card.url, 0, 1500 - 100, "hand", 250);
      cardInstance.setX((cardInstance.displayWidth + 5) * (index + 1));
      cardInstance.setY(HEIGHT - 10);
      handWidth = ((cardInstance.displayWidth + 5) * (index + 1) - 400)

      cardInstance.setInteractive({ useHandCursor: true })
        .on('pointerdown', (pointer) => {
          this.registry.set("candidateSelected", cardInstance)
          this.registry.get("candidateSelected")
          this.registry.set("selectedHand", [])
        })
        .on('pointerup', (pointer) => {
          const card = this.registry.get("candidateSelected")
          if (card) {
            this.registry.set("candidateSelected", null)
            this.registry.set("selectedHand", [card])
            card.data.toggle('isSelected')
          }
        })

      return cardInstance
    });


    this.registry.set("playerHands", cards);
    this.registry.set("candidateSelected", null);
    this.registry.set("selectedHand", [])
    this.registry.events.on('changedata', (p, e, v) => {
      if (e === 'selectedHand') {
        if (v && v.length) {
          console.log(v)
          cards.filter(card => {
            return !v.includes(card)
          }).forEach(card => {
            card.data.set('isSelected', false)
          })
        }

      }
    })


    this.input.on("pointermove", (pointer, localX) => {

      if (pointer.downY <= HEIGHT - HAND_HEIGHT) {
        return;
      }



      if (pointer.isDown) {

        if(pointer.y <= HEIGHT - HAND_HEIGHT) {
          /**
           * @type {Card}
           */
          const card = this.registry.get("candidateSelected");
          const shadowCard = card
          shadowCard.x = pointer.worldX
          shadowCard.y = pointer.worldY
          shadowCard.setVisible(true)
          
        }

        const distance = (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom
        // if (Math.abs(distance) > 1)
        //   this.registry.set("candidateSelected", null)
        if (this.cameras.main.scrollX - distance >= (-800 / 2) + 150 && this.cameras.main.scrollX - distance <= handWidth)
          this.cameras.main.scrollX -= distance;
        return;
      }

    });

    // console.log(card)
  }
}
