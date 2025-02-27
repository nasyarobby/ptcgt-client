import Phaser, { Scene } from "phaser"
import { HEIGHT } from "./config";

 
export class Card extends Phaser.GameObjects.Sprite {
    /**
     * @param {Phaser.Scene} scene
     * @param {string} url 
     */
    constructor(scene, id, imageId, url, x, y, preferredWidth) {
        super(scene, x, y)

        this.state  = {
            location: "hand",
            isSelected: false
        }

        var name = imageId;
        // texture needs to be loaded to create a placeholder card
        this.x = x
        this.y = y
        this.setDataEnabled()

        this.data.set('isSelected', null)

        const ratio = 325/225
        
        this.displayWidth = preferredWidth || 90
        this.displayHeight = this.displayWidth * ratio

        this.setTexture("placeholder")
        scene.add.existing(this)

        let loader = new Phaser.Loader.LoaderPlugin(scene);
        // ask the LoaderPlugin to load the texture
        loader.image(name, url);
        this.shadowCard = null

        loader.once(Phaser.Loader.Events.COMPLETE, () => {
            // texture loaded so use instead of the placeholder
            this.setTexture(name)
            this.displayWidth = preferredWidth || 90          
            this.displayHeight = this.displayWidth * ratio
            this.shadowCard = scene.add.image(this.x, this.y-200, name).setAlpha(0.5).setScale(this.scale).setVisible(false)
        });
        loader.start();

        this.data.set(this.state)

        this.data.events.on('changedata', (p,e,v) => {
            if(e === 'isSelected') {
                if(v) {
                    this.y = HEIGHT - 120
                }
                else {
                    this.y = HEIGHT - 10
                }
            }
        })
    }


}