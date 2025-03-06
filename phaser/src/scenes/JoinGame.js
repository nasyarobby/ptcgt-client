// this screen to wait for another player or loading assets

import { Scene } from 'phaser';
import { HEIGHT, WIDTH } from '../config';
import ws from '../socket';
import setClickAction from './setClickAction';

export class JoinGame extends Scene
{
    constructor ()
    {
        super('JoinGame');
    }

    init ()
    {
    }

    preload ()
    {
    }

    create ()
    {

        this.input.on('pointerup', () => {
            if(this.clicked) {
              this.clickedText.x = this.originalTextPosition.x
              this.clickedText.y = this.originalTextPosition.y
            }
          })

         var overlayBackdrop = document.createElement("div");
            overlayBackdrop.style =
              "background-color: rgba(0,0,0,0.7); height: 100%; width: 100%;";
        
            const container = document.createElement("div");
            const resultContainer = document.createElement("div");
            resultContainer.textContent = "Creating deck...";
            resultContainer.className = "deck-result";
            resultContainer.style.visibility = 'hidden'
            container.style = "display: flex; flex-direction: column; max-width: 400px;margin: auto";
            container.className = "deck-manager-container";
            overlayBackdrop.appendChild(container);
        
            const roomCodeInput = document.createElement("input");
            roomCodeInput.autofocus = true
            roomCodeInput.onkeydown = (e) => {
                if(roomCodeInput.value.length > 5) roomCodeInput.value = roomCodeInput.value.slice(0,5);
            }
            const saveDeckButton = document.createElement("button");
            saveDeckButton.style = "font-size: 25px;";
            saveDeckButton.innerText = "OK";
            saveDeckButton.onclick = () => {
              dom.setVisible(false)
              this.code = roomCodeInput.value || "______"
              this.codeText.setText("Room Code\n"+this.code.split("").join(" "))
            };
            container.appendChild(roomCodeInput);
            container.appendChild(saveDeckButton);
            container.appendChild(resultContainer);
            const dom = this.add.dom(0, 0, overlayBackdrop).setOrigin(0, 0);
            dom.setVisible(false);
            this.box = this.add.rectangle(WIDTH/2, HEIGHT/2-100, 240,150, 0xfff).setOrigin(0.5, 0.5).setInteractive().on('pointerdown', () => {
                dom.setVisible(true)
            })
            this.codeText = this.add.text(WIDTH/2, HEIGHT/2-100, "Room Code\n_ _ _ _ _ _", {
                fontFamily: "leaguespartan",
                color: "#ffffff",
                fontSize: '32px',
                align: "center"
            }).setOrigin(0.5, 0.5)

            this.okButton = this.add.image(this.box.x,this.box.y+150, "button")
            this.textOkButton = this.add.text(this.okButton.x, this.okButton.y, "OK",  {
                fontFamily: "leaguespartan",
                color: "#ffffff",
                fontSize: '16px',
                align: "center"
            }).setOrigin(0.5,0.5)

            setClickAction(this, this.okButton, this.textOkButton, () => {
                if(this.code && this.code.length === 6) {
                    const deckName = localStorage.getItem('deck')
                    ws.sendCmd('join_game', {code: this.code, deckName})
                    return;
                }
                dom.setVisible(true)
            })

            this.cancelButton = this.add.image(this.okButton.x,this.okButton.y+80, "button")
            this.textCancelButton = this.add.text(this.cancelButton.x, this.cancelButton.y, "Cancel",  {
                fontFamily: "leaguespartan",
                color: "#ffffff",
                fontSize: '16px',
                align: "center"
            }).setOrigin(0.5,0.5)

            setClickAction(this, this.cancelButton, this.textCancelButton, () => {
                this.scene.start("MainMenu")
            })
    }
}
