import { Scene } from "phaser";
import { Card } from "../Card";
import { HAND_HEIGHT, HEIGHT, WIDTH } from "../config";

export class Hand extends Scene {
  constructor() {
    super({ key: "Game", active: true });
  }

  create() {

    // this.add.rectangle(WIDTH/2,HEIGHT-HAND_HEIGHT/2, WIDTH, HAND_HEIGHT, 0xFFFFFF)
    let handWidth = 0


    const cards = [
      {
        id: "sv4pt5-232",
        url: "https://images.pokemontcg.io/sv4pt5/232_hires.png",
      },
      {
        id: "sv4pt5-94",
        url: "https://images.pokemontcg.io/sv4pt5/94_hires.png",
      },
      {
        id: "sv4pt5-96",
        url: "https://images.pokemontcg.io/sv4pt5/96_hires.png",
      },
      {
        id: "sv4pt5-102",
        url: "https://images.pokemontcg.io/sv4pt5/102_hires.png",
      },
      {
        id: "sv4pt5-142",
        url: "https://images.pokemontcg.io/sv4pt5/142_hires.png",
      },
      {
        id: "sv4pt5-157",
        url: "https://images.pokemontcg.io/sv4pt5/157_hires.png",
      },
    ].map((card, index) => {
      const cardInstance = new Card(this, card.id, card.url, 0, 1500 - 100, 200);
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
        if(card) {
            console.log("clicked")

            this.registry.set("candidateSelected", null)
            this.registry.set("selectedHand", [card])
        }
      })

      return cardInstance
    });


    this.registry.set("playerHands", cards);
    this.registry.set("candidateSelected", null);
    this.registry.set("selectedHand", [])
            this.registry.events.on('changedata', (p,e,v) => {
                console.log(e, v)
            if(e === 'selectedHand') {
                if(v && v.length) {
                    cards.forEach(card => {
                        if(v.includes(card)) {
                            card.selectFromHand()
                            return;
                        }

                        console.log(card.data.values)

                        if(card.data.values.isSelected === true) card.unselectFromHand()
                    })
                }
                
            }
        })


    this.input.on("pointermove", (pointer) => {
      
      if (pointer.downY <= HEIGHT - HAND_HEIGHT) {
        return;
      }

      if (pointer.isDown) {
          const distance = (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom
          if(distance > 1)
          this.registry.set("candidateSelected", null)
        if(this.cameras.main.scrollX - distance >= (-800/2)+150 && this.cameras.main.scrollX - distance <= handWidth)
        this.cameras.main.scrollX -= distance;
        return;
      }
    });

    // console.log(card)
  }
}
