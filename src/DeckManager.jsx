import { useEffect, useState } from "react";
import Card from "./Card";
import { MenuButton } from "@szhsin/react-menu";

function NewDeckForm({ sendCmd }) {
  const [input, setInput] = useState("");
  const [deckName, setDeckName] = useState("");
  return (
    <div className="container">
      <input
        placeholder="Name"
        onChange={(e) => {
          setDeckName(e.target.value);
        }}
      />
      <textarea
        onChange={(e) => setInput(e.target.value)}
        rows={20}
        style={{
          width: "100%",
        }}
      >
        {input}
      </textarea>
      <button
        onClick={() => {
          sendCmd("save_deck", {
            deckName: deckName,
            deck: input,
          });
        }}
      >
        Import Deck
      </button>
    </div>
  );
}

function JoinForm({ sendCmd, deckName }) {
  const [input, setInput] = useState("");
  return (
    <div className="container">
      <input
        placeholder="Room Code"
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      <button
        onClick={() => {
          sendCmd("join_game", {
            deckName,
            code: input,
          });
        }}
      >
        Enter Code
      </button>
    </div>
  );
}

/**
 *
 * @param {React.PropsWithChildren<{decks: import("./type").Deck[]}>} param0
 * @returns
 */
function DeckManager({ decks, sendCmd, lastMessage, setDecks }) {
  const [showNewForm, setShowNewForm] = useState(false);
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedDeck, setSelectedDeck] = useState("");

  useEffect(() => {
    sendCmd("get_decks", {});
  }, []);

  useEffect(() => {
    if (lastMessage) {
      const { c: cmd, d: data } = JSON.parse(lastMessage.data);
      if (cmd === "s_pending_save_deck") {
        setShowNewForm(false);
        setIsLoading(true);
      }

      if (cmd === "s_ok_save_deck") {
        setShowNewForm(false);
        setIsLoading(false);
        sendCmd("get_decks", {});
      }

      if (cmd === "s_ok_get_decks") {
        setShowNewForm(false);
        setIsLoading(false);
        setDecks(data.decks);
      }

      if (cmd === "s_card_found") {
        setMessage(
          "Processing: " +
            data.line +
            " (" +
            Math.round(((data.index + 1) / data.count) * 100) +
            "%)"
        );
      }
    }
  }, [lastMessage]);

  return (
    <div>
      <h1>Deck Manager</h1>

      <div>
        <button
          disabled={isLoading}
          onClickCapture={() => {
            if (!isLoading) setShowNewForm((state) => !state);
          }}
        >
          {isLoading ? "Creating..." : showNewForm ? "close" : "New Deck"}
        </button>

        <MenuButton
          disabled={!selectedDeck}
          onClickCapture={() => {
            sendCmd("create_game", {
              deckName: selectedDeck,
            });
          }}
        >
          Create Game
        </MenuButton>

        <MenuButton
          disabled={!selectedDeck}
          onClickCapture={() => {
            setShowJoinForm((state) => !state);
          }}
        >
          Join Game
        </MenuButton>
      </div>

      {message && (
        <div
          className="container"
          style={{
            backgroundColor: "#cecece",
            border: "2px solid #666",
            padding: 4,
            marginBottom: 10,
          }}
        >
          {message}
        </div>
      )}

      {showNewForm && <NewDeckForm sendCmd={sendCmd} />}
      {showJoinForm && <JoinForm deckName={selectedDeck} sendCmd={sendCmd} />}

      <div style={{}}>
        {decks.map((deck) => {
          const cardIds = Object.keys(deck.data.cards);
          const cards = Array.from(
            new Set(cardIds.map((c) => deck.data.cards[c].images.small))
          );
          console.log(cards);
          return (
            <div
              key={deck.name}
              style={{
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                border: "1px solid #ccc",
                display: "flex",
              }}
            >
              <div>
                <Card imageL={cards[0]} />
              </div>
              <div>
                <Card imageL={cards[1]} />
              </div>
              <div style={{ marginLeft: 10, fontSize: "1.2em" }}>
                <h3>{deck.name}</h3>
                <MenuButton>Delete</MenuButton>
                <MenuButton
                  disabled={selectedDeck === deck.name}
                  onClick={() => {
                    setSelectedDeck(deck.name);
                  }}
                >
                  {selectedDeck === deck.name ? "Active" : "Activate"}
                </MenuButton>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DeckManager;
