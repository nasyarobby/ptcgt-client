import { Scene } from "phaser";
import { Card } from "../Card";
import { HAND_HEIGHT, HEIGHT, WIDTH } from "../config";

export class Hand extends Scene {
  constructor() {
    super({ key: "Game", active: true });
  }

  create() {

    // this.add.rectangle(WIDTH/2,HEIGHT-HAND_HEIGHT/2, WIDTH, HAND_HEIGHT, 0xFFFFFF)

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
    ];

    let handWidth = 0

    cards.forEach((card, index) => {
      const cardInfo = new Card(this, card.id, card.url, 0, 1500 - 100, 200);
      cardInfo.setX((cardInfo.displayWidth + 5) * (index + 1));
      cardInfo.setY(HEIGHT - 10);
      handWidth = ((cardInfo.displayWidth + 5) * (index + 1) - 400)
    });

    this.registry.set("playerHands", cards);

    this.input.on("pointermove", (pointer) => {
      console.log(pointer);
      if (pointer.downY <= HEIGHT - HAND_HEIGHT) {
        return;
      }

      if (pointer.isDown) {
        const distance = (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom
        if(this.cameras.main.scrollX - distance >= (-800/2)+150 && this.cameras.main.scrollX - distance <= handWidth)
        this.cameras.main.scrollX -= distance;
        return;
      }
    });

    // console.log(card)
  }
}
