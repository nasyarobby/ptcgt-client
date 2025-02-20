import useWebSocket from "react-use-websocket";
import React from "react";
import MainMenuScene from "./MainMenuScene";
import DeckManager from "./DeckManager";
import "./App.css"
import Game from "./Game";
import NetworkWatcher from "./NetworkStatus";

export default function App() {
  const [socketUrl] = React.useState("ws://localhost:8080");
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
    onOpen: () => console.log('opened'),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: () => true,
  });

  const [decks, setDecks] = React.useState([])

  const [playerId, setPlayerId] = React.useState(() => {
    const storedName = localStorage.getItem("pid");
    return storedName || "";
  });

  const [roomId, setRoomId] = React.useState(() => {
    const storedName = localStorage.getItem("roomId");
    return storedName || "";
  });

  React.useEffect(() => {
    if (playerId) {
      sendCmd("auth", {});
    }

    if(roomId) {
        setScene("GAME")
    }
  }, []);

  React.useEffect(() => {
    if (lastMessage) {
      const { c: cmd, d: data } = JSON.parse(lastMessage.data);
      if (cmd === "s_ok_auth") {
        localStorage.setItem("pid", data.pid);
        setPlayerId(data.pid);
      }

      if(cmd === 's_ok_create_game' || cmd === 's_ok_join_game') {
        localStorage.setItem("roomId", data.roomId);
        setRoomId(data.roomId)
        setScene("GAME")
      }
    }
  }, [lastMessage]);

  React.useEffect(() => {
    if(!roomId &&playerId && decks.length === 0) {
        setScene("DECK_MANAGER")
    }
  }, [playerId, decks.length])

  function sendCmd(cmd, data = {}) {
    const _data = { ...data, cmd, pid: playerId, roomId: roomId };
    console.log("Sending command", cmd, _data);
    sendMessage(JSON.stringify(_data));
  }

  const [scene, setScene] = React.useState("MAIN_MENU");

  console.log({readyState})

  if(scene === "GAME") {
    return <NetworkWatcher socketState={readyState}>
      <Game playerId={playerId} sendCmd={sendCmd} lastMessage={lastMessage}/>
      </NetworkWatcher>
  }

  if (scene === "MAIN_MENU") {
    return (
      <MainMenuScene
        socketUrl={socketUrl}
        setScene={setScene}
        sendCmd={sendCmd}
      />
    );
  }

  if(scene === 'DECK_MANAGER') {
    return (
        <DeckManager
        decks={decks}
        lastMessage={lastMessage}
        socketUrl={socketUrl}
        setScene={setScene}
        sendCmd={sendCmd}
        setDecks={setDecks}
        />
    );
  }
}
