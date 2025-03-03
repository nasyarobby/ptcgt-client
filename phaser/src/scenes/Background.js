import Phaser from "phaser";

export class Background extends Phaser.Scene {
  constructor() {
    super("Background");
  }

  create() {
    this.add.image(796/2, 1280/2, 'playmat').setDepth(-100).preFX.addBlur(0, 0.2, 0.2, 30)
  }

}
