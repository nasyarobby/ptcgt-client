import Phaser from "phaser";
import { HEIGHT, WIDTH } from "../config";
import ws from "../socket";
import { Card } from "../Card";

export class DeckManager extends Phaser.Scene {
  constructor() {
    super("DeckManager");
  }

  create() {
    // this.add.image(796/2, 1280/2, 'playmat').setDepth(-100).preFX.addBlur(0, 0.2, 0.2, 30)
    ws.sendCmd("get_decks", {});

    const group = this.add.group()
    const PADDING = 40;
    var overlayBackdrop = document.createElement("div");
    overlayBackdrop.style =
      "background-color: rgba(0,0,0,0.7); height: 100%; width: 100%;";

    const container = document.createElement("div");
    const resultContainer = document.createElement("div");
    resultContainer.textContent = "Creating deck...";
    resultContainer.className = "deck-result";
    resultContainer.style.visibility = 'hidden'
    container.style = "display: flex; flex-direction: column;";
    container.className = "deck-manager-container";
    overlayBackdrop.appendChild(container);

    const deckNameInput = document.createElement("input");
    const textarea = document.createElement("textarea");
    textarea.setAttribute("rows", "20");
    const saveDeckButton = document.createElement("button");
    saveDeckButton.style = "font-size: 25px;";
    saveDeckButton.innerText = "Save";
    saveDeckButton.onclick = () => {
      resultContainer.className = 'deck-result'
      resultContainer.style.visibility = 'visible'
      deckNameInput.style.visibility = 'hidden'
      saveDeckButton.style.visibility = 'hidden'
      textarea.style.visibility = 'hidden'
      ws.sendCmd("save_deck", {
        deckName: deckNameInput.value,
        deck: textarea.value,
      });
    };
    container.appendChild(deckNameInput);
    container.appendChild(textarea);
    container.appendChild(saveDeckButton);
    container.appendChild(resultContainer);
    const dom = this.add.dom(0, 0, overlayBackdrop).setOrigin(0, 0);
    dom.setVisible(false);

    const importButton = this.add.image(20, 20, "button_180x62").setOrigin(0,0)
    this.add.text(importButton.x+56, importButton.y+20, "Import", {
      color: "black",
      fontSize: "24px",
      "font-weight": "bold",
      fontFamily: "Arial",
    })

    importButton.setInteractive().on("pointerdown", () => {
      if(dom.visible) return;
      dom.setVisible(!dom.visible);
    });


    ws.parsers.push({
      cmd: "s_card_found",
      parser: (data) => {
        resultContainer.textContent = data.line;
      },
    });

    ws.parsers.push({
      cmd: "s_ok_save_deck",
      parser: (data) => {
      dom.setVisible(false);
      resultContainer.style.visibility = 'hidden'
      deckNameInput.style.visibility = 'visible'
      saveDeckButton.style.visibility = 'visible'
      textarea.style.visibility = 'visible'
        ws.sendCmd("get_decks", {})
      }
    })

    ws.parsers.push({
      cmd: "s_ok_get_decks",
      parser: (data) => {
        group.clear(true);
        data.decks.forEach((row, index) => {
          const rect = this.add
          .rectangle(PADDING, PADDING+60+(index*250), WIDTH - PADDING * 2, 210, 0xffffff)
          .setAlpha(0.6)
          .setOrigin(0, 0);

          group.add(this.add.image(rect.x+170,rect.y+130, "deck"))
          const card = new Card(this, row.data.deck[0].no,  row.data.cards[row.data.deck[0].id], rect.x+20, rect.y+20, 'dm', 120).setOrigin(0,0)


        const text = this.add.text(rect.x + 250, rect.y+20, row.name, {
          color: "black",
          fontSize: "32px",
          "font-weight": "bold",
          fontFamily: "Arial",
        });
        const button = this.add
        .image(rect.x+250, rect.y+120, 'button_180x62')
        .setOrigin(0, 0);

        const delButton = this.add
        .image(rect.x+440, rect.y+120, 'button_180x62')
        .setOrigin(0, 0);

        const buttonText = this.add.text(rect.x + 298, rect.y+136, "Activate", {
          color: "black",
          fontSize: "24px",
          "font-weight": "bold",
          fontFamily: "Arial",
        });
        const delButtonText = this.add.text(rect.x + 484, rect.y+136, "Remove", {
          color: "#ff7780",
          fontSize: "24px",
          "font-weight": "bold",
          fontFamily: "Arial",
        });
          
          group.add(button)
          group.add(buttonText)
          group.add(delButton)
          group.add(delButtonText)

          group.add(rect)
          group.add(text)
          group.add(card)
        });
      },
    });

    this.isDragStart = false

    this.input.on("pointerdown", () => {
      this.isDragStart = true
      
    })

    this.input.on("pointermove", (pointer) => {
        if(this.isDragStart)
        {
          const distance = pointer.position.y - pointer.prevPosition.y
          const maxScrollY = (((group.countActive()/8)-3)*250)
          if(distance < 0 && this.cameras.main.scrollY - distance > maxScrollY) {
            return;
          }
          if(this.cameras.main.scrollY - distance > 0 )
          this.cameras.main.scrollY -=  distance/this.cameras.main.zoom
        }
         
      })

      this.input.on("pointerup", (pointer) => {
        if(this.isDragStart)
         this.isDragStart = false
      })
    
  }
}
