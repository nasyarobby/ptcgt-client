import React, { useEffect } from "react";
import useWebSocket from "react-use-websocket";
import Card from "./Card";
import App from "./Game";

export default function MainMenu() {
  const [playerName, setPlayerName] = React.useState("NSRB");
  const [playerState, setPlayerState] = React.useState({
    cards: [],
    deck: [],
  });
  const [playerNameInput, setPlayerNameInput] = React.useState("");
  const [playerDeckString, setPlayerDeckString] = React.useState("");
  /**
   * @type {[
   * 'HOSTING' | 'EMPTY' | 'JOINING' | 'SETUP', React.Dispatch<React.SetStateAction<'HOSTING' | 'EMPTY' | 'JOINING' | 'SETUP'>>]}
   */
  const [roomState, setRoomState] = React.useState("EMPTY");
  const [roomCode, setRoomCode] = React.useState("");
  const [gameStart, setGameStart] = React.useState(false)

  const [roomId, setRoomId] = React.useState(() => {
    const data = localStorage.getItem("roomId");
    return data;
  });
  const [roomCodeInput, setRoomCodeInput] = React.useState("");

  const { sendMessage, lastMessage, readyState } = useWebSocket("");

  function sendCmd(cmd, data) {
    const _data = roomId ? {...data, roomId} : (data ? data : {})
    console.log("Sending command", cmd, _data)
    sendMessage(cmd + ";;" + JSON.stringify(_data));
  }

  useEffect(() => {
    if (roomState === "EMPTY" && roomId) {
      console.log("Reconnecting");
      sendCmd("reconnect", { roomId });
    }
  }, [roomState, roomId]);

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      console.log("Messsage", data)

      if (data.c === "ROOM_CREATED") {
        localStorage.setItem("roomId", data.d.roomId);
        setRoomId(data.d.roomId);
        setRoomState("SETUP");
        setPlayerState({
          cards: null,
          deckstring: null,
          deck: null,
        });
      }

      if (data.c === "PLAYER_READINESS") {
        if(data.d.player && data.d.opp) {
          setGameStart(true)
        }
      }

      if (data.c === "ROOM_JOINED") {
        localStorage.setItem("roomId", data.d.roomId);
        setRoomId(data.d.roomId);
        setRoomState("SETUP");
        setPlayerState({
          cards: null,
          deckstring: null,
          deck: null,
        });
      }

      if (data.c === "STATE") {
        setRoomCode(data.d.c)
        setPlayerState({
          cards: data.d.own.c,
          deckstring: data.d.own.ds,
          deck: data.d.own.d,
        });
      }
    }
  }, [lastMessage]);

  useEffect(() => {
    if (roomState === "HOSTING") {
      console.log("Hosting room");
    }
  }, [playerName, roomState]);


  if(gameStart) {
    return <App></App>
  }

  if (playerState.deck === null) {
    return (
      <>
      <div>Room: {roomCode}</div>
        <textarea
          style={{ width: "100%" }}
          rows={20}
          onChange={(e) => setPlayerDeckString(e.target.value)}
        >
          {playerDeckString}
        </textarea>
        <button
          onClick={() => {
            sendCmd("update-deck", { deck: playerDeckString, roomId });
          }}
        >
          Submit Deck
        </button>
      </>
    );
  }

  if (playerState.deck.length === 60) {
    return (
      <>
        <h1>Your deck is ready.</h1>
        <button onClick={e => {
          sendCmd('start_game')
        }}>Start game</button>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {playerState.deck.map((card) => {
            return (
              <Card
                bench
                key={card.no}
                imageL={playerState.cards[card.id].images.large}
              />
            );
          })}
        </div>
      </>
    );
  }


  if (playerName && roomState === "CREATE_GAME") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          gap: 20,
        }}
      >
        {roomId ?  'Room created' : 'Creating game'}
      </div>
    );
  }

  if (playerName && roomState === "JOIN_GAME") {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          gap: 20,
        }}
      >
        <input
          style={{ fontSize: "2em", textAlign: "center" }}
          value={roomCodeInput}
          onChange={(e) => setRoomCodeInput(e.target.value)}
        ></input>
        <button
          style={{ fontSize: "2em" }}
          onClick={(e) => {
            sendCmd("join", { code: roomCodeInput, name: playerName });
          }}
        >
          Enter Room Code
        </button>
      </div>
    );
  }

  if (playerName)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          gap: 20,
        }}
      >
        <button
          style={{ fontSize: "1.5em" }}
          onClick={(e) => {
            sendCmd("create-game", { name: playerName });
            setRoomState("CREATE_GAME");
          }}
        >
          Create Game
        </button>
        <button
          style={{ fontSize: "1.5em" }}
          onClick={(e) => {
            setRoomState("JOIN_GAME");
          }}
        >
          Join A Game
        </button>
      </div>
    );


  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: 20,
      }}
    >
      <input
        style={{ fontSize: "2em", textAlign: "center" }}
        value={playerNameInput}
        onChange={(e) => setPlayerNameInput(e.target.value)}
      ></input>
      <button
        style={{ fontSize: "2em" }}
        onClick={(e) => {
          setPlayerName(playerNameInput);
        }}
      >
        Set Nickname
      </button>
    </div>
  );
}
