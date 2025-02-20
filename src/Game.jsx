import { Menu, MenuButton, MenuItem, SubMenu } from "@szhsin/react-menu";
import Card from "./Card";
import CardPrize from "./CardPrize";
import EmptyZone from "./EmptyZone";
import HandCard from "./HandCard";

import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/zoom.css";
import useWindowDimensions from "./useWindowDimensions";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import CoinFlip from "./CoinFlip";
import CoinFlipRoom from "./CoinFlipRoom";
import ChatRoom from "./ChatRoom";

export default function Game({ playerId, roomId, code, sendCmd, lastMessage }) {
  const { width, height } = useWindowDimensions();
  const [callCoinFlip, setCallCoinFlip] = useState(null);
  const [openChats, setOpenChats] = useState(false);
  const [roomState, setRoomState] = useState({
    players: [],
  });

  const [gamestate, setGameState] = useState({
    players: [],
  });

  const opp = roomState.players.find((p) => p.id !== playerId);
  const playerCardData = roomState.players.find((p) => p.id == playerId)?.deck.cards || {};

  const defaultState = {
    deck: [],
    hand: [],
  };

  const playerState =
    gamestate.players.find((p) => p.id === playerId) || defaultState;
  const oppState =
    gamestate.players.find((p) => p.id !== playerId) || defaultState;

  useEffect(() => {
    sendCmd("get_room_info");
  }, []);

  useEffect(() => {
    if (lastMessage) {
      const data = JSON.parse(lastMessage.data);
      if (data.c === "s_ok_get_room_info") {
        setRoomState(data.d.roomInfo);
        console.log(data.d.roomInfo);
        setCallCoinFlip(data.d.roomInfo.coinFlip);
      }

      if (data.c === "s_p2_joined") {
        sendCmd("get_room_info");
      }

      if (data.c === "s_call_coin_flip") {
        setCallCoinFlip(data.d.who);
      }

      if (data.c === "s_close_coin_flip") {
        setCallCoinFlip(null);
      }

      if (data.c === "s_latest_state") {
        setGameState(data.d.state);
      }
    }
  }, [lastMessage]);

  return (
    <div>
      {roomState?.code && opp.id ? null : (
        <Modal>
          {" "}
          <div>
            Waiting for other player to join.
            <br />
            Code: {roomState.code}
          </div>
        </Modal>
      )}
      <div>{opp?.name}</div>
      {callCoinFlip ? (
        <CoinFlipRoom lastMessage={lastMessage} sendCmd={sendCmd} />
      ) : null}
      {openChats ? (
        <ChatRoom
          setOpenChats={setOpenChats}
          lastMessage={lastMessage}
          sendCmd={sendCmd}
        />
      ) : null}

      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        {oppState.hand.length ? (
          <CardPrize small number={oppState.hand.length} />
        ) : (
          <div>Empty hand</div>
        )}
      </div>

      <div
        style={{ display: "flex", justifyContent: "space-between", margin: 10 }}
      >
        <div style={{ flexGrow: 3 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <CardPrize number={0} small />
            <div>
              <Menu menuButton={<MenuButton>Prize: 2</MenuButton>} transition>
                <MenuItem>Info</MenuItem>
                <MenuItem>Play</MenuItem>
                <SubMenu label="Move to">
                  <MenuItem>Active</MenuItem>
                  <MenuItem>Bench</MenuItem>
                  <MenuItem>Deck</MenuItem>
                  <MenuItem>Trash</MenuItem>
                  <MenuItem>Stadium</MenuItem>
                  <MenuItem>Lost Zone</MenuItem>
                  <MenuItem>Prize</MenuItem>
                </SubMenu>
                <MenuItem>Flip Face Down</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <div style={{ flexGrow: 0, marginRight: 10 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <CardPrize number={oppState.deck.length} tight={true} />
            <div>
              <Menu
                menuButton={
                  <MenuButton>Deck: {oppState.deck.length}</MenuButton>
                }
                transition
              >
                <MenuItem>Info</MenuItem>
                <MenuItem>Play</MenuItem>
                <SubMenu label="Move to">
                  <MenuItem>Active</MenuItem>
                  <MenuItem>Bench</MenuItem>
                  <MenuItem>Deck</MenuItem>
                  <MenuItem>Trash</MenuItem>
                  <MenuItem>Stadium</MenuItem>
                  <MenuItem>Lost Zone</MenuItem>
                  <MenuItem>Prize</MenuItem>
                </SubMenu>
                <MenuItem>Flip Face Down</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <div style={{ flexGrow: 0 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <EmptyZone small text="Trash" />
            <div>
              <Menu menuButton={<MenuButton>Trash: 2</MenuButton>} transition>
                <MenuItem>Info</MenuItem>
                <MenuItem>Play</MenuItem>
                <SubMenu label="Move to">
                  <MenuItem>Active</MenuItem>
                  <MenuItem>Bench</MenuItem>
                  <MenuItem>Deck</MenuItem>
                  <MenuItem>Trash</MenuItem>
                  <MenuItem>Stadium</MenuItem>
                  <MenuItem>Lost Zone</MenuItem>
                  <MenuItem>Prize</MenuItem>
                </SubMenu>
                <MenuItem>Flip Face Down</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyItems: "flex-start",
          justifyContent: "center",
          gap: 4,
          backgroundColor: "#ccc",
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <Card small empty />
        <Card small empty />
        <Card small empty />
        <Card small empty />
        <Card small empty />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          backgroundColor: "yellow",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <EmptyZone text="STADIUM" />
        </div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            justifyItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              margin: 10,
            }}
          >
            <EmptyZone />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              margin: 10,
            }}
          >
            <EmptyZone />
          </div>
        </div>
        <div
          style={{
            justifyContent: "center",
            alignItems: "center",
            justifyItems: "center",
          }}
        ></div>
      </div>
      <div
        style={{
          display: "flex",
          justifyItems: "flex-start",
          justifyContent: "center",
          gap: 4,
          backgroundColor: "#ccc",
          paddingTop: 5,
          paddingBottom: 5,
        }}
      >
        <Card small empty />
        <Card small empty />
        <Card small empty />
        <Card small empty />
        <Card small empty />
      </div>

      <div
        style={{ display: "flex", justifyContent: "space-between", margin: 10 }}
      >
        <div style={{ flexGrow: 3 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <CardPrize number={0} small />
            <div>
              <Menu menuButton={<MenuButton>Prize: 2</MenuButton>} transition>
                <MenuItem>Info</MenuItem>
                <MenuItem>Play</MenuItem>
                <SubMenu label="Move to">
                  <MenuItem>Active</MenuItem>
                  <MenuItem>Bench</MenuItem>
                  <MenuItem>Deck</MenuItem>
                  <MenuItem>Trash</MenuItem>
                  <MenuItem>Stadium</MenuItem>
                  <MenuItem>Lost Zone</MenuItem>
                  <MenuItem>Prize</MenuItem>
                </SubMenu>
                <MenuItem>Flip Face Down</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <div style={{ flexGrow: 0, marginRight: 10 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <CardPrize number={playerState.deck.length} tight={true} />
            <div>
              <Menu
                menuButton={
                  <MenuButton>Deck: {playerState.deck.length}</MenuButton>
                }
                transition
              >
                <MenuItem>Info</MenuItem>
                <MenuItem
                  onClick={() => {
                    sendCmd("draw_from_deck_top", {n: 7});
                  }}
                >
                  Draw cards from top
                </MenuItem>
                <MenuItem>Play</MenuItem>
                <SubMenu label="Move to">
                  <MenuItem>Active</MenuItem>
                  <MenuItem>Bench</MenuItem>
                  <MenuItem>Deck</MenuItem>
                  <MenuItem>Trash</MenuItem>
                  <MenuItem>Stadium</MenuItem>
                  <MenuItem>Lost Zone</MenuItem>
                  <MenuItem>Prize</MenuItem>
                </SubMenu>
                <MenuItem>Flip Face Down</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <div style={{ flexGrow: 0 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <EmptyZone small text="Trash" />
            <div>
              <Menu menuButton={<MenuButton>Trash: 2</MenuButton>} transition>
                <MenuItem>Info</MenuItem>
                <MenuItem>Play</MenuItem>
                <SubMenu label="Move to">
                  <MenuItem>Active</MenuItem>
                  <MenuItem>Bench</MenuItem>
                  <MenuItem>Deck</MenuItem>
                  <MenuItem>Trash</MenuItem>
                  <MenuItem>Stadium</MenuItem>
                  <MenuItem>Lost Zone</MenuItem>
                  <MenuItem>Prize</MenuItem>
                </SubMenu>
                <MenuItem>Flip Face Down</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <div>
        <MenuButton
          onClick={() => {
            sendCmd("call_coin_flip");
          }}
        >
          Flip Coin
        </MenuButton>
      </div>

      <div>
        <MenuButton
          onClick={() => {
            setOpenChats(true);
          }}
        >
          Chat
        </MenuButton>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        {playerState.hand.map((card, index) => {
          console.log({card})
          const cardData = playerCardData[card.id]
          console.log({playerCardData})
          return <HandCard key={card.no} data={cardData} imageL={cardData.images.large} />;
        })}
      </div>
      <div>
        <Menu menuButton={<MenuButton>Hand: 2</MenuButton>} transition>
          <MenuItem>Info</MenuItem>

          <MenuItem>Play</MenuItem>
          <SubMenu label="Move to">
            <MenuItem>Active</MenuItem>
            <MenuItem>Bench</MenuItem>
            <MenuItem>Deck</MenuItem>
            <MenuItem>Trash</MenuItem>
            <MenuItem>Stadium</MenuItem>
            <MenuItem>Lost Zone</MenuItem>
            <MenuItem>Prize</MenuItem>
          </SubMenu>
          <MenuItem>Flip Face Down</MenuItem>
        </Menu>
      </div>
    </div>
  );
}
