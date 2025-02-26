import { Scene } from "phaser";

export class MainMenu extends Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    const image = this.add.image(512, 300, "logo");
image.displayHeight = 375
image.displayWidth = 275
    const x = this.add
      .text(512, 460, "Main Menu", {
        fontFamily: "Arial Black",
        fontSize: 38,
        color: "#ffffff",
        stroke: "#000000",
        strokeThickness: 8,
        align: "center",
      })
      .setOrigin(0.5);

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
        if (this.cameras.main.zoom - 0.1 > 0.1) this.cameras.main.zoom -= 0.1;
      }

      if (deltaY < 0) {
        this.cameras.main.zoom += 0.1;
      }

      //this.camera.centerOn(pointer.x, pointer.y);
    });

    this.input.on("pointermove", (pointer) => {
      var amount = this.input.manager.pointersTotal;
      x.setText(amount)
      
      if (amount > 1 && this.input.pointer1.isDown && !this.input.pointer2.isDown ) {
        // this.cameras.main.worldView.x += pointer.position.x - pointer.prevPosition.x;
        // this.cameras.main.worldView.y += pointer.position.y - pointer.prevPosition.y;

        this.cameras.main.scrollX -= (pointer.x - pointer.prevPosition.x) / this.cameras.main.zoom;
        this.cameras.main.scrollY -= (pointer.y - pointer.prevPosition.y) / this.cameras.main.zoom;

        return
      }

      if (amount > 1 && this.input.pointer1.isDown && this.input.pointer2.isDown ) {
        const {pointer1, pointer2} = this.input
        if(pointer1.position.distance(pointer2.position) < pointer1.prevPosition.distance(pointer2.prevPosition)) {
        if (this.cameras.main.zoom - 0.025 > 0.5) this.cameras.main.zoom -= 0.025;
          
        }

        if(pointer1.position.distance(pointer2.position) > pointer1.prevPosition.distance(pointer2.prevPosition)) {
          this.cameras.main.zoom += 0.025;
        }

        return
      }

      if ((pointer.isDown && pointer.button === 1)) {
        this.cameras.main.x += pointer.position.x - pointer.prevPosition.x;
        this.cameras.main.y += pointer.position.y - pointer.prevPosition.y;
      }
    });
  }
}
