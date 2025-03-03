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

    var deckImport = document.createElement("div");
    deckImport.style =
      "background-color: rgba(0,0,0,0.7); height: 100%; width: 100%;";

    const container = document.createElement("div");
    const resultContainer = document.createElement("div");
    resultContainer.textContent = "Test";
    resultContainer.className = "deck-result";

    container.style = "display: flex; flex-direction: column;";
    container.className = "deck-manager-container";
    deckImport.appendChild(container);

    const deckNameInput = document.createElement("input");
    const textarea = document.createElement("textarea");
    textarea.setAttribute("rows", "20");
    const button = document.createElement("button");
    button.style = "font-size: 25px;";
    button.innerText = "Save";
    button.onclick = () => {
      ws.sendCmd("save_deck", {
        deckName: deckNameInput.value,
        deck: textarea.value,
      });
    };
    container.appendChild(deckNameInput);
    container.appendChild(textarea);
    container.appendChild(button);
    container.appendChild(resultContainer);
    const dom = this.add.dom(0, 0, deckImport).setOrigin(0, 0);
    dom.setVisible(false);

    const buttonImport = this.add
      .rectangle(0, 0, 200, 80, 0x00ff00)
      .setDepth(10);

    const textButtonImport = this.add
      .text(0, 0, "Import", { color: "black" })
      .setDepth(50);
    buttonImport.setInteractive().on("pointerdown", () => {
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

        ws.sendCmd("get_decks", {})
      }
    })

    ws.parsers.push({
      cmd: "s_ok_get_decks",
      parser: (data) => {
        group.clear();
        data.decks.forEach((row, index) => {
          const rect = this.add
            .rectangle(PADDING, PADDING+40+(index*250), WIDTH - PADDING * 2, 240, 0xffffff)
            .setAlpha(0.6)
            .setOrigin(0, 0);
          const text = this.add.text(rect.x + 180, rect.y+20, row.name, {
            color: "black",
            fontSize: "24px",
            "font-weight": "bold",
            fontFamily: "Sans Serif",
          });

          const card = new Card(this, row.data.deck[0].no,  row.data.cards[row.data.deck[0].id], rect.x+10, rect.y+10, 'dm', 150).setOrigin(0,0)
          const button = this.add
            .image(rect.x+180, rect.y+100, 'activate_deck_button_0')
            .setOrigin(0, 0);

            const button2 = this.add
            .rectangle(rect.x+350, rect.y+100, 160, 50,0xffffff)
            .setOrigin(0, 0);
          group.add(button)
          group.add(button2)
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
          const maxScrollY = (((group.countActive()/3)-3)*250)
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
