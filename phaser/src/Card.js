import Phaser from "phaser"

 
export class Card extends Phaser.GameObjects.Image {
    /**
     * @param {Phaser.Scene} scene
     * @param {string} url 
     */
    constructor(scene, url) {
        super(scene)
        var name = 'xxx';
        // texture needs to be loaded to create a placeholder card
        /**
         * @type {Phaser.GameObjects.Image}
         */
        const card = scene.add.image(this.x, this.y, 'logo');
        card.displayHeight = 375
        card.displayWidth = 275

        card.setInteractive({ useHandCursor: true })
        .on('pointerdown', function(pointer, localX, localY, event){
            console.log(pointer, localX, localY, event)
        })


        let loader = new Phaser.Loader.LoaderPlugin(scene);
        // ask the LoaderPlugin to load the texture
        loader.image(name, url);

        loader.once(Phaser.Loader.Events.COMPLETE, () => {
            // texture loaded so use instead of the placeholder
            card.setTexture(name)
        });
        loader.start();
    }
}