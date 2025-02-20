import React from "react";

export default function MainMenuScene(props) {
  const [playerNameInput, setPlayerNameInput] = React.useState(() => {
    const storedName = localStorage.getItem("playerName");
    return storedName || ''
  });

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
        onClick={() => {
          localStorage.setItem("playerName", playerNameInput);
          props.sendCmd("auth", { name: playerNameInput });
        }}
      >
        Set Nickname
      </button>
    </div>
  );
}
