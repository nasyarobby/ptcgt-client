// this screen to wait for another player or loading assets

import Phaser, { Scene } from 'phaser';
import { HEIGHT, WIDTH } from '../config';
import ws from '../socket';

export class ContinueGame extends Scene {
    constructor() {
        super('ContinueGame');
    }

    create() {
        const magentaBdrop = this.add.rectangle(0, 0, WIDTH, HEIGHT, 0xf5008b).setOrigin(0, 1)
        const blueBdrop = this.add.rectangle(0, HEIGHT, WIDTH, HEIGHT, 0x00aaff).setOrigin(0, 0)
        this.tweens.add({
            targets: magentaBdrop,
            y: HEIGHT / 2,
            duration: 500,
            delay: 100,
            onComplete: () => {
                ws.sendCmd('continue_game', {})
            }
        });

        this.tweens.add({
            targets: blueBdrop,
            y: HEIGHT / 2,
            duration: 500,
            delay: 100,
        });

        this.statusText = this.add.text(WIDTH / 2, HEIGHT / 2 + 20, "Loading existing game...", {
            color: "white",
            fontSize: "32px",
            fontFamily: 'leaguespartan'
        }).setOrigin(0.5, 0)

        ws.parsers.push({
            cmd: 's_continue_game',
            parser: (data, cmd) => {
                console.log(cmd, data)
                    const cardsToLoad = data.players.reduce((acc, p, pnum) => {
                        const cards = p.deck.cards;
                        const cardIds = Object.keys(cards);
                        cardIds.forEach(cid => {
                            acc.push({ ...cards[cid], id: pnum + "-" + cards[cid].id })
                        })
                        return acc;
                    }, [])

                    this.registry.set("cards", cardsToLoad)
                    this.registry.set("players", data.players)
                    this.fileLoaded = 0
                    let loader = new Phaser.Loader.LoaderPlugin(this);
                    // ask the LoaderPlugin to load the texture
                    // console.log(data.id)
                    cardsToLoad.forEach(data => {
                        loader.image(data.id, data.images.large);
                    })

                    loader.on(Phaser.Loader.Events.FILE_COMPLETE, (a, b, c) => {
                        this.fileLoaded++;
                        const progress = (this.fileLoaded * 100 / cardsToLoad.length).toFixed(0)
                        this.statusText.setText(data.name + " has joined! \nLoading Cards: " + progress + "%")

                    });

                    loader.once(Phaser.Loader.Events.COMPLETE, () => {
                        console.log("Loaded")
                        this.scene.start("GameTable")
                    });
                    loader.start();
            }
        })
    }
}
