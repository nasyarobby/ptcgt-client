// this screen to wait for another player or loading assets

import { Scene } from 'phaser';
import { HEIGHT, WIDTH } from '../config';
import ws from '../socket';

export class Lobby extends Scene
{
    constructor ()
    {
        super('Lobby');
    }

    init ()
    {
        const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);
        this.load.on('progress', (progress) => {
            bar.width = 4 + (460 * progress);
        });
    }

    preload ()
    {
    }

    create ()
    {
        const magentaBdrop = this.add.rectangle(0,0, WIDTH, HEIGHT, 0xf5008b).setOrigin(0,1)
        const blueBdrop = this.add.rectangle(0,HEIGHT, WIDTH, HEIGHT, 0x00aaff).setOrigin(0,0)
        this.tweens.add({
          targets: magentaBdrop,
          y: HEIGHT/2,
          duration: 500,
          delay: 100,
          onLoop: (tween) => {
          }
      });
    
      this.tweens.add({
        targets: blueBdrop,
        y: HEIGHT/2,
        duration: 500,
        delay: 100,
        onLoop: (tween) => {
          },
          callbacks: (a, obj) => {

              }
          });
        const statusText = this.add.text(WIDTH/2, HEIGHT/2+20, "Waiting for other player...", {
            color: "white",
            fontSize: "32px",
            fontFamily: 'leaguespartan'
        }).setOrigin(0.5,0)

        ws.parsers.push(
            {
                cmd: 's_ok_create_game',
                parser: (data,cmd) => {
                    console.log(data, cmd)
                    localStorage.setItem('roomId', data.roomId)
                    localStorage.setItem('roomCode', data.code)
                    statusText.setText("Waiting for other player...\nRoom Code: "+data.code)
                }
              }
        )
       


    }
}
