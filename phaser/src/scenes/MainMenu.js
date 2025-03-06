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
    if(activeDeck) {
      ws.sendCmd('get_deck_by_name', {deckName: activeDeck})

      ws.parsers.push(({
        cmd: 's_ok_get_deck_by_name',
        parser: (incomingData,cmd) => {
          console.log(incomingData, cmd)
          const data = incomingData.deck.data;
          const card = new Card(this, data.deck[0].no,  data.cards[data.deck[0].id], WIDTH/2-100, HEIGHT/2+180, 'dm', 120)
        }
      }))
    }

    if(ws.token) {
      const newGameButton = this.add.image((WIDTH/2)-100,HEIGHT/2-100, "button")
      const newGameButtonText = this.add.text(newGameButton.x, newGameButton.y, "New Game", {color: "white", fontSize: "24px", fontFamily: "leaguespartan"}).setOrigin(0.5, 0.5)

      setClickAction(this, newGameButton, newGameButtonText, () => {
        this.scene.start('Lobby')
      })

      const joinGameButton = this.add.image((WIDTH/2)+100,HEIGHT/2-100, "button")
      this.add.text(joinGameButton.x-60, joinGameButton.y-18, "Join Game", {color: "white", fontSize: "24px", fontFamily: "leaguespartan"})
      
      setClickAction(this, joinGameButton, joinGameButton, () => {
        this.scene.start('JoinGame')
      })

      const deckButton = this.add.image((WIDTH/2),HEIGHT/2, "button")
      const deckButtonText = this.add.text(deckButton.x-36, deckButton.y-18, "Decks", {color: "white", fontSize: "24px", fontFamily: "leaguespartan"})
      deckButton.setInteractive({
        useHandCursor: true,
      }).on('pointerdown', () => {
        this.clicked = deckButton
        this.clickedText = deckButtonText
        this.originalTextPosition = {x: deckButtonText.x, y: deckButtonText.y}
        deckButtonText.y+=4
        deckButtonText.x+=4
      }).on("pointerup", () => {
        this.registry.set('menu', 'dm')
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

    ws.parsers.push({
      cmd: 's_ok_auth',
      parser: () => {
        this.scene.switch("DeckManager")
      }
    }
    )

    const input = document.createElement('input')
    input.style = 'font-size: 32px;text-align:center'
    const button = document.createElement('button')
    button.style = 'font-size: 32px;font-family: leaguespartan'
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
