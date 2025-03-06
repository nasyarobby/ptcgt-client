import Phaser, { Scene } from "phaser";
import { HAND_HEIGHT, HEIGHT, WIDTH } from "./config";

export class Card extends Phaser.GameObjects.Sprite {
  /**
   * @param {Phaser.Scene} scene
   * @param {{url: string, name: string}} data
   */
  constructor(scene, id, data, x, y, location, preferredWidth) {
    super(scene, x, y);
    var name = data.id;
    this.x = x;
    this.y = y;

    this.setDataEnabled();
    this.data.set("isHighlighted", null);

    const ratio = 325 / 225;
    this.displayWidth = preferredWidth || 64;
    this.displayHeight = this.displayWidth * ratio;

    this.setTexture(id || "placeholder");
    this.timeout = null;
    this.cardData = data

    scene.add.existing(this);

    let loader = new Phaser.Loader.LoaderPlugin(scene);
    // ask the LoaderPlugin to load the texture
    loader.image(data.id, data.images.large);
    this.shadowCard = null;

    loader.once(Phaser.Loader.Events.COMPLETE, () => {
      // texture loaded so use instead of the placeholder
      this.setTexture(name);
      this.displayWidth = preferredWidth || 64;
      this.displayHeight = this.displayWidth * ratio;
      this.defaultScale = this.scale;
      this.highlighRect = scene.add.rectangle(this.x, this.y, this.displayWidth, this.displayHeight, 0x70ff70).setDepth(-200)
    });
    loader.start();


    this.data.events.on("changedata", (p, e, v) => {
      if (e === "isHighlighted") {
        if (v) {
          this.setScale(this.defaultScale * 0.9)
          this.setDepth(100)
          this.highlighRect.setDepth(99)
        } else {
          this.setScale(this.defaultScale)
          this.setDepth(1)
          this.highlighRect.setDepth(-200)

        }
      }
    });

  //   this.setInteractive({
  //     useHandCursor: true,
  //   })
  //     .on("pointerdown", (pointer, localX, localY) => {
  //       this.setDepth(1000)
  //     })
  //     .on("pointerup", (pointer) => {
  //       this.setDepth(1)
  //     })
  //     .on(
  //       "pointermove",
  //       (pointer, x,y) => {
  //         if(this.location === 'table') {
  //           this.setX(pointer.worldX)
  //           this.setY(pointer.worldY)
  //           }
  //       }
  //     );
  }

  /**
   * 
   * @param {boolean} state 
   */
  setHighlight(state) {
    this.data.set("isHighlighted", state)
  }

  update() {
    this.highlighRect.setX(this.x)
    this.highlighRect.setY(this.y)
  }
}
