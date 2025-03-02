import Phaser from "phaser";
import { HEIGHT, WIDTH } from "../config";
import ws from "../socket";
import { Card } from "../Card";

export class DeckManager extends Phaser.Scene {
  constructor() {
    super("DeckManager");
  }

  create() {
    ws.sendCmd('get_decks', {})
    const PADDING = 40;

    const rect = this.add.rectangle(PADDING, 10, WIDTH - PADDING * 2, 240, 0xFFFFFF).setOrigin(0,0)
    this.add.text(rect.x+170,rect.y+10, 'Deck 1', {color: "RED", fontSize: "24px", fontFamily: 'Sans Serif'})
    new Card(this, 'c-01',  {
      id: "sv1-181",
      imageL: "https://images.pokemontcg.io/sv1/181_hires.png",
      imageS: "https://images.pokemontcg.io/sv1/181.png",
      name: "Nest Ball",
      subtype: ["Item"],
      supertype: "Trainer",
    }, rect.x+10, rect.y+10, 'dm', 150).setOrigin(0,0)
    
    this.add.rectangle(0,0,100,50, 0x00FF00)

    var deckImport = document.createElement('div');
    deckImport.style = 'background-color: rgba(0,0,0,0.7); height: 100%; width: 100%;';

    const container = document.createElement('div')
    const resultContainer = document.createElement('div')
    resultContainer.textContent = "Test"
    resultContainer.className = "deck-result"

    container.style = 'display: flex; flex-direction: column;'
    container.className = 'deck-manager-container'
    deckImport.appendChild(container)
    const deckNameInput = document.createElement('input')
        const textarea = document.createElement('textarea')
        textarea.setAttribute('rows', '20')
        const button = document.createElement('button')
        button.style = 'font-size: 25px;'
        button.innerText = 'Save'
        button.onclick = () => {
            ws.sendCmd("save_deck", {
              deckName: deckNameInput.value,
              deck: textarea.value,
            })
        }
        container.appendChild(deckNameInput)
        container.appendChild(textarea)
        container.appendChild(button)
        container.appendChild(resultContainer)
        const dom = this.add.dom(0, 0, deckImport).setOrigin(0,0)
        dom.setVisible(true)

        const buttonImport = this.add.rectangle(0,0,200,80, 0x00FF00).setDepth(10)
        const textButtonImport = this.add.text(0,0, "Import", {color: "black"}).setDepth(50)
        buttonImport.setInteractive().on("pointerdown", () => {
          dom.setVisible(!dom.visible)
        })

      ws.parsers['s_card_found'] = (data) => {
        resultContainer.textContent = data.line
      }
  }

  

}
