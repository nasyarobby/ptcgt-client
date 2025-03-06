// this screen to wait for another player or loading assets

import Phaser, { Scene } from 'phaser';
import { HEIGHT, WIDTH } from '../config';
import ws from '../socket';

export class Lobby extends Scene {
    constructor() {
        super('Lobby');
    }

    create() {
        const deckName = localStorage.getItem("deck")
        ws.parsers.push(
            {
                cmd: 's_ok_create_game',
                parser: (data, cmd) => {
                    console.log(data, cmd)
                    localStorage.setItem('roomId', data.roomId)
                    localStorage.setItem('roomCode', data.code)
                    this.statusText.setText("Waiting for other player...\nRoom code: " + data.code)
                }
            }
        )

        ws.parsers.push(
            {
                cmd: 's_game_setup',
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

                    console.log(cardsToLoad)
                    this.fileLoaded = 0
                    let loader = new Phaser.Loader.LoaderPlugin(this);
                    // ask the LoaderPlugin to load the texture
                    // console.log(data.id)
                    cardsToLoad.forEach(data => {
                        console.log("Loading " + data.images.large)
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
            }
        )

        const magentaBdrop = this.add.rectangle(0, 0, WIDTH, HEIGHT, 0xf5008b).setOrigin(0, 1)
        const blueBdrop = this.add.rectangle(0, HEIGHT, WIDTH, HEIGHT, 0x00aaff).setOrigin(0, 0)
        this.tweens.add({
            targets: magentaBdrop,
            y: HEIGHT / 2,
            duration: 500,
            delay: 100,
            onComplete: (tween) => {
                ws.sendCmd('create_game', { deckName })
                // this.tweens.add({
                //     targets: magentaBdrop,
                //     y: 0,
                //     duration: 500,
                //     delay: 1000,
                // });
                // this.tweens.add({
                //     targets: blueBdrop,
                //     y: HEIGHT,
                //     duration: 500,
                //     delay: 1000,
                // });

            }
        });

        this.tweens.add({
            targets: blueBdrop,
            y: HEIGHT / 2,
            duration: 500,
            delay: 100,
        });

        this.statusText = this.add.text(WIDTH / 2, HEIGHT / 2 + 20, "Waiting for other player...", {
            color: "white",
            fontSize: "32px",
            fontFamily: 'leaguespartan'
        }).setOrigin(0.5, 0)

        ws.parsers.push(
            {
                cmd: 's_p2_joined',
                parser: (data, cmd) => {
                    console.log(data, cmd)
                    this.statusText.setText(data.name + " has joined! \nLoading Cards: 0%")
                    console.log("Getting deck info to load textures")
                }
            }
        )
    }
}
