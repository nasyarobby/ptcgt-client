import Phaser, { Scene } from "phaser";
import { HAND_HEIGHT, HEIGHT, WIDTH } from "./config";

export class Card extends Phaser.GameObjects.Sprite {
  /**
   * @param {Phaser.Scene} scene
   * @param {{url: string, name: string}} data
   */
  constructor(scene, id, data, x, y, location, preferredWidth) {
    super(scene, x, y);
    const HIGHLIGHT_PADDING = 4;
    this.state = {
      location: location,
      isSelected: false,
    };

    var name = data.id;
    // texture needs to be loaded to create a placeholder card
    this.x = x;
    this.y = y;
    this.setDataEnabled();

    this.data.set("isSelected", null);

    const ratio = 325 / 225;

    this.displayWidth = preferredWidth || 90;
    this.displayHeight = this.displayWidth * ratio;

    this.setTexture("placeholder");
    this.timeout = null;
    this.cardData = data

    scene.add.existing(this);

    let loader = new Phaser.Loader.LoaderPlugin(scene);
    // ask the LoaderPlugin to load the texture
    console.log(data.id)
    loader.image(data.id, data.images.large);
    this.shadowCard = null;

    loader.once(Phaser.Loader.Events.COMPLETE, () => {
      // texture loaded so use instead of the placeholder
      this.setTexture(name);
      this.displayWidth = preferredWidth || 90;
      this.displayHeight = this.displayWidth * ratio;
      this.shadowCard = scene.add
        .image(this.x, this.y - 200, name)
        .setAlpha(0.5)
        .setScale(this.scale)
        .setVisible(false);

      // scene.add
      //   .rectangle(
      //     this.x,
      //     this.y,
      //     this.displayWidth + HIGHLIGHT_PADDING,
      //     this.displayHeight + HIGHLIGHT_PADDING,
      //     0xff0000
      //   )
        // .setDepth(-5);
      // scene.add.line(
      //   this.x,
      //   this.y,
      //   0,
      //   0,
      //   this.displayWidth,
      //   this.displayHeight,
      //   0xff0000
      // );
    });
    loader.start();

    this.data.set(this.state);

    this.data.events.on("changedata", (p, e, v) => {
      if (e === "isSelected") {
        if (v) {
          this.y = HEIGHT - 120;
        } else {
          this.y = HEIGHT - 10;
        }
      }
    });

    this.setInteractive({
      useHandCursor: true,
    })
      .on("pointerdown", (pointer, localX, localY) => {
        this.setDepth(1000)
      })
      .on("pointerup", (pointer) => {
        this.setDepth(1)
      })
      .on(
        "pointermove",
        (pointer, x,y) => {
          if(this.location === 'table') {
            this.setX(pointer.worldX)
            this.setY(pointer.worldY)
            }
        }
      );
  }
}
