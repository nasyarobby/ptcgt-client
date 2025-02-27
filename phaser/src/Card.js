import Phaser from "phaser"

 
export class Card extends Phaser.GameObjects.Sprite {
    /**
     * @param {Phaser.Scene} scene
     * @param {string} url 
     */
    constructor(scene, id, url, x, y, preferredWidth) {
        super(scene, x, y)
        var name = id;
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
        

        // const scale = 3;
        // image.displayHeight = 375/scale
        // image.displayWidth = 275/scale

        // this.setInteractive({ useHandCursor: true })
        // .on('pointerdown', function(pointer, localX, localY, event){
        //     scene.registry.set('selectedCard', [this])
        //     console.log(scene.registry.get('selectedCard'))
        // })
        // .on('pointerup', function(pointer, localX, localY, event){
        //     scene.registry.set('selectedCard', [])
        //     console.log(scene.registry.get('selectedCard'))
        // })

        // .on("pointermove", (pointer, localX, localY) => {
        //     if(scene.registry.get('selectedCard').length) {
        //     this.x += (pointer.x - pointer.prevPosition.x) / scene.cameras.main.zoom;
        //     this.y += (pointer.y - pointer.prevPosition.y) / scene.cameras.main.zoom;
        //     }
        // })


        let loader = new Phaser.Loader.LoaderPlugin(scene);
        // ask the LoaderPlugin to load the texture
        loader.image(name, url);

        loader.once(Phaser.Loader.Events.COMPLETE, () => {
            // texture loaded so use instead of the placeholder
            this.setTexture(name)
            this.displayWidth = preferredWidth || 90          
            this.displayHeight = this.displayWidth * ratio
        });
        loader.start();

        this.on('changedata', (p,e,v) => {
            if(e === 'isSelected') {
                if(v === true)
                this.y -=100
            else {
                this.y +=100
                }
            }
        })
    }

    selectFromHand() {
        this.data.set('isSelected', true)
    }

    unselectFromHand() {
        this.data.set('isSelected', false)
    }
}