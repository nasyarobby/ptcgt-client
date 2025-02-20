import { useEffect, useState } from "react";
import CoinFlip from "./CoinFlip";
import Modal from "./Modal";
import "./Chat.css";

export default function ChatRoom({ sendCmd, lastMessage, setOpenChats }) {
  const [stats, setStats] = useState({ heads: 0, tails: 0 });
  const [lastResult, setLastResult] = useState("");

  const [chats, setChats] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    sendCmd("get_chats")
  }, [])

  useEffect(() => {
    if (lastMessage) {
      const msg = JSON.parse(lastMessage.data);
      if (msg.c === "s_chat") {
        setChats((chat) => {
          return [...chat, msg.d];
        });
      }

      if(msg.c === 's_get_chats') {
        setChats(msg.d.chats);
      }
    }
  }, [lastMessage]);

  const handleSend = () => {
    if (input.trim() !== "") {
      sendCmd("chat", { message: input });
      setInput("");
    }
  };

  return (
    <Modal>
      <h1>Chats</h1>
      <div className="chat-container">
        <div className="chat-messages">
          {chats.map((c, index) => {
            if (c.fromId === "system")
              return (
                <div key={index} className="chat-message">
                  <span
                    style={{ fontStyle: "italic", color: "#444" }}
                  >
                    {c.message}
                  </span>
                </div>
              );

            return (
              <div key={index} className="chat-message">
                <span className="chat-username">{c.fromName}:</span> {c.message}
              </div>
            );
          })}
        </div>
        <div className="chat-input-area">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chat-input"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }} // Send on Enter
          />
          <button onClick={handleSend} className="chat-send-button">
            Send
          </button>
        </div>
      </div>
      <div style={{marginTop: 20}}>
        <button onClick={e => {
            e.preventDefault();
            setOpenChats(false);
        }}>Close</button>
        </div>
    </Modal>
  );
}
