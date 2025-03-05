import Phaser from "phaser";
import { HEIGHT, WIDTH } from "../config";
import ws from "../socket";
import { Card } from "../Card";
import setClickAction from "./setClickAction";

export class MainMenu extends Phaser.Scene {
  constructor() {
    super("MainMenu");
  }

  create() {
    this.scene.launch("Background")
    const activeDeck = localStorage.getItem('deck')
    const magenta = this.add.image(0,0,'magenta_up').setOrigin(0,1)
    const blueBdrop = this.add.image(0,HEIGHT,'blue_down').setOrigin(0,0)

    if(activeDeck) {
      ws.sendCmd('get_deck_by_name', {deckName: activeDeck})

      ws.parsers.push(({
        cmd: 's_ok_get_deck_by_name',
        parser: (incomingData,cmd) => {
          const data = incomingData.deck.data;
          console.log(data)
          const card = new Card(this, data.deck[0].no,  data.cards[data.deck[0].id], WIDTH/2-100, HEIGHT/2+180, 'dm', 120)
        }
      }))
    }

    


    if(ws.token) {
      const newGameButton = this.add.image((WIDTH/2)-100,HEIGHT/2-100, "button_180x62")
      const newGameButtonText = this.add.text(newGameButton.x-60, newGameButton.y-12, "New Game", {color: "black", fontSize: "24px", fontFamily: "Arial"})

      setClickAction(this, newGameButton, newGameButtonText, () => {
        ws.sendCmd('create_game', {deckName: activeDeck})
        this.tweens.add({
          targets: magenta,
          y: HEIGHT/2+200,
          duration: 250,
          onLoop: (tween) => {
              console.log('Tween Loop: ' + tween.loopCounter)
          }
      });
    
      this.tweens.add({
        targets: blueBdrop,
        y: HEIGHT/2-200,
        duration: 250,
        onLoop: (tween) => {
            console.log('Tween Loop: ' + tween.loopCounter)
          }
        });
      })

      const joinGameButton = this.add.image((WIDTH/2)+100,HEIGHT/2-100, "button_180x62")
      this.add.text(joinGameButton.x-60, joinGameButton.y-12, "Join Game", {color: "black", fontSize: "24px", fontFamily: "Arial"})
      const deckButton = this.add.image((WIDTH/2),HEIGHT/2, "button_180x62")
      const deckButtonText = this.add.text(deckButton.x-40, deckButton.y-12, "Decks", {color: "black", fontSize: "24px", fontFamily: "Arial"})
      deckButton.setInteractive({
        useHandCursor: true,
      }).on('pointerdown', () => {
        this.clicked = deckButton
        this.clickedText = deckButtonText
        this.originalTextPosition = {x: deckButtonText.x, y: deckButtonText.y}
        deckButtonText.y+=4
        deckButtonText.x+=4
      }).on("pointerup", () => {
        this.scene.switch('DeckManager')
      })


      this.input.on('pointerup', () => {
        if(this.clicked) {
          this.clickedText.x = this.originalTextPosition.x
          this.clickedText.y = this.originalTextPosition.y
        }
      })

      this.add.image(WIDTH/2, HEIGHT/2+200, "deck")
      
      return;
    }

    var mainMenu = document.createElement('div');
    mainMenu.style = 'background-color: rgba(0,0,0,0.7); height: 100%; width: 100%;';

    const container = document.createElement('div')
    container.style = 'display: flex; flex-direction: column;'
    container.className = 'deck-manager-container'

    ws.parsers.push(({
      cmd: 's_ok_auth',
      parser: (data,cmd) => {
        this.scene.switch("DeckManager")
      }
    }))

    const input = document.createElement('input')
    input.style = 'font-size: 32px;text-align:center'
    const button = document.createElement('button')
    button.style = 'font-size: 32px;'
    button.innerText = 'Login'
    button.onclick = () => {
        ws.sendCmd('auth', {name: input.value})
    }
    mainMenu.appendChild(container)
    container.appendChild(input)
    container.appendChild(button)

    const dom = this.add.dom(WIDTH/2,HEIGHT/2, mainMenu)
    
  }

}
