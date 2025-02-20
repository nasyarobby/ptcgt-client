import useWindowDimensions from "./useWindowDimensions";
import Proptypes from "prop-types";
import React, { useRef, forwardRef } from "react";
import { useEventListener } from "usehooks-ts";

import { Menu, MenuItem, MenuButton, SubMenu } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/zoom.css";
import Card from "./Card";
import HandCard from "./HandCard";
import EmptyZone from "./EmptyZone";
import MainMenu from "./MainMenu";

function StackCards({ tight, number }) {
  const { height, width } = useWindowDimensions();
  const cardWidth = width / 8;
  const cardHeight = (91 / 66) * cardWidth;
  if (tight) {
    return (
      <div
        style={{ position: "relative", height: cardHeight, width: cardWidth }}
      >
        {Array(number > 12 ? 12 : number)
          .fill(0)
          .map((_, index) => (
            <Card bench absolute={"absolute"} x={0} y={index} />
          ))}
      </div>
    );
  }

  return (
    <div style={{ position: "relative", height: cardHeight, width: cardWidth }}>
      {Array(number)
        .fill(0)
        .map((_, index) => (
          <Card bench absolute={"absolute"} x={0} y={index * 10} />
        ))}
    </div>
  );
}

function App() {
  const cards = {
    "sv8-76": {
      id: "sv8-76",
      imageL: "https://images.pokemontcg.io/sv8/76_hires.png",
      imageS: "https://images.pokemontcg.io/sv8/76.png",
      name: "Latias ex",
      subtype: ["Basic", "ex"],
      type: ["Psychic"],
      supertype: "Pokémon",
    },
    "sv5-109": {
      id: "sv5-109",
      imageL: "https://images.pokemontcg.io/sv5/109_hires.png",
      imageS: "https://images.pokemontcg.io/sv5/109.png",
      name: "Roaring Moon",
      subtype: ["Basic", "Ancient"],
      type: ["Darkness"],
      supertype: "Pokémon",
    },
    "sv4-124": {
      id: "sv4-124",
      imageL: "https://images.pokemontcg.io/sv4/124_hires.png",
      imageS: "https://images.pokemontcg.io/sv4/124.png",
      name: "Roaring Moon ex",
      subtype: ["Basic", "ex", "Ancient"],
      type: ["Darkness"],
      supertype: "Pokémon",
    },
    "sv2-169": {
      id: "sv2-169",
      imageL: "https://images.pokemontcg.io/sv2/169_hires.png",
      imageS: "https://images.pokemontcg.io/sv2/169.png",
      name: "Squawkabilly ex",
      subtype: ["Basic", "ex"],
      type: ["Colorless"],
      supertype: "Pokémon",
    },
    "sv5-140": {
      id: "sv5-140",
      imageL: "https://images.pokemontcg.io/sv5/140_hires.png",
      imageS: "https://images.pokemontcg.io/sv5/140.png",
      name: "Ancient Booster Energy Capsule",
      subtype: ["Pokémon Tool", "Ancient"],
      supertype: "Trainer",
    },
    "sv1-166": {
      id: "sv1-166",
      imageL: "https://images.pokemontcg.io/sv1/166_hires.png",
      imageS: "https://images.pokemontcg.io/sv1/166.png",
      name: "Arven",
      subtype: ["Supporter"],
      supertype: "Trainer",
    },
    "sv2-172": {
      id: "sv2-172",
      imageL: "https://images.pokemontcg.io/sv2/172_hires.png",
      imageS: "https://images.pokemontcg.io/sv2/172.png",
      name: "Boss's Orders (Ghetsis)",
      subtype: ["Supporter"],
      supertype: "Trainer",
    },
    "swsh10-139": {
      id: "swsh10-139",
      imageL: "https://images.pokemontcg.io/swsh10/139_hires.png",
      imageS: "https://images.pokemontcg.io/swsh10/139.png",
      name: "Dark Patch",
      subtype: ["Item"],
      supertype: "Trainer",
    },
    "sv4-163": {
      id: "sv4-163",
      imageL: "https://images.pokemontcg.io/sv4/163_hires.png",
      imageS: "https://images.pokemontcg.io/sv4/163.png",
      name: "Earthen Vessel",
      subtype: ["Item", "Ancient"],
      supertype: "Trainer",
    },
    "sv5-147": {
      id: "sv5-147",
      imageL: "https://images.pokemontcg.io/sv5/147_hires.png",
      imageS: "https://images.pokemontcg.io/sv5/147.png",
      name: "Explorer's Guidance",
      subtype: ["Supporter", "Ancient"],
      supertype: "Trainer",
    },
    "sv1-181": {
      id: "sv1-181",
      imageL: "https://images.pokemontcg.io/sv1/181_hires.png",
      imageS: "https://images.pokemontcg.io/sv1/181.png",
      name: "Nest Ball",
      subtype: ["Item"],
      supertype: "Trainer",
    },
    "pgo-68": {
      id: "pgo-68",
      imageL: "https://images.pokemontcg.io/pgo/68_hires.png",
      imageS: "https://images.pokemontcg.io/pgo/68.png",
      name: "PokéStop",
      subtype: ["Stadium"],
      supertype: "Trainer",
    },
    "sv4-170": {
      id: "sv4-170",
      imageL: "https://images.pokemontcg.io/sv4/170_hires.png",
      imageS: "https://images.pokemontcg.io/sv4/170.png",
      name: "Professor Sada's Vitality",
      subtype: ["Supporter", "Ancient"],
      supertype: "Trainer",
    },
    "sv6-162": {
      id: "sv6-162",
      imageL: "https://images.pokemontcg.io/sv6/162_hires.png",
      imageS: "https://images.pokemontcg.io/sv6/162.png",
      name: "Scoop Up Cyclone",
      subtype: ["Item", "ACE SPEC"],
      supertype: "Trainer",
    },
    "swsh10-156": {
      id: "swsh10-156",
      imageL: "https://images.pokemontcg.io/swsh10/156_hires.png",
      imageS: "https://images.pokemontcg.io/swsh10/156.png",
      name: "Trekking Shoes",
      subtype: ["Item"],
      supertype: "Trainer",
    },
    "sv1-196": {
      id: "sv1-196",
      imageL: "https://images.pokemontcg.io/sv1/196_hires.png",
      imageS: "https://images.pokemontcg.io/sv1/196.png",
      name: "Ultra Ball",
      subtype: ["Item"],
      supertype: "Trainer",
    },
    "sve-15": {
      id: "sve-15",
      imageL: "https://images.pokemontcg.io/sve/15_hires.png",
      imageS: "https://images.pokemontcg.io/sve/15.png",
      name: "Basic Darkness Energy",
      subtype: ["Basic"],
      type: ["Darkness"],
      supertype: "Energy",
    },
    "sv6-82": {
      id: "sv6-82",
      imageL: "https://images.pokemontcg.io/sv6/82_hires.png",
      imageS: "https://images.pokemontcg.io/sv6/82.png",
      name: "Alakazam",
      subtype: ["Stage 2"],
      type: ["Psychic"],
      supertype: "Pokémon",
    },
    "sv8pt5-4": {
      id: "sv8pt5-4",
      imageL: "https://images.pokemontcg.io/sv8pt5/4_hires.png",
      imageS: "https://images.pokemontcg.io/sv8pt5/4.png",
      name: "Budew",
      subtype: ["Basic"],
      type: ["Grass"],
      supertype: "Pokémon",
    },
    "sv6-105": {
      id: "sv6-105",
      imageL: "https://images.pokemontcg.io/sv6/105_hires.png",
      imageS: "https://images.pokemontcg.io/sv6/105.png",
      name: "Conkeldurr",
      subtype: ["Stage 2"],
      type: ["Fighting"],
      supertype: "Pokémon",
    },
    "sv6pt5-38": {
      id: "sv6pt5-38",
      imageL: "https://images.pokemontcg.io/sv6pt5/38_hires.png",
      imageS: "https://images.pokemontcg.io/sv6pt5/38.png",
      name: "Fezandipiti ex",
      subtype: ["Basic", "ex"],
      type: ["Darkness"],
      supertype: "Pokémon",
    },
    "sv6pt5-47": {
      id: "sv6pt5-47",
      imageL: "https://images.pokemontcg.io/sv6pt5/47_hires.png",
      imageS: "https://images.pokemontcg.io/sv6pt5/47.png",
      name: "Kyurem",
      subtype: ["Basic"],
      type: ["Dragon"],
      supertype: "Pokémon",
    },
    "sv4-71": {
      id: "sv4-71",
      imageL: "https://images.pokemontcg.io/sv4/71_hires.png",
      imageS: "https://images.pokemontcg.io/sv4/71.png",
      name: "Natu",
      subtype: ["Basic"],
      type: ["Psychic"],
      supertype: "Pokémon",
    },
    "sv8pt5-86": {
      id: "sv8pt5-86",
      imageL: "https://images.pokemontcg.io/sv8pt5/86_hires.png",
      imageS: "https://images.pokemontcg.io/sv8pt5/86.png",
      name: "Regigigas",
      subtype: ["Basic"],
      type: ["Colorless"],
      supertype: "Pokémon",
    },
    "sv7-58": {
      id: "sv7-58",
      imageL: "https://images.pokemontcg.io/sv7/58_hires.png",
      imageS: "https://images.pokemontcg.io/sv7/58.png",
      name: "Slowking",
      subtype: ["Stage 1"],
      type: ["Psychic"],
      supertype: "Pokémon",
    },
    "sv8pt5-18": {
      id: "sv8pt5-18",
      imageL: "https://images.pokemontcg.io/sv8pt5/18_hires.png",
      imageS: "https://images.pokemontcg.io/sv8pt5/18.png",
      name: "Slowpoke",
      subtype: ["Basic"],
      type: ["Water"],
      supertype: "Pokémon",
    },
    "sv4pt5-75": {
      id: "sv4pt5-75",
      imageL: "https://images.pokemontcg.io/sv4pt5/75_hires.png",
      imageS: "https://images.pokemontcg.io/sv4pt5/75.png",
      name: "Squawkabilly ex",
      subtype: ["Basic", "ex"],
      type: ["Colorless"],
      supertype: "Pokémon",
    },
    "sv6-131": {
      id: "sv6-131",
      imageL: "https://images.pokemontcg.io/sv6/131_hires.png",
      imageS: "https://images.pokemontcg.io/sv6/131.png",
      name: "Tatsugiri",
      subtype: ["Basic"],
      type: ["Dragon"],
      supertype: "Pokémon",
    },
    "sv4-72": {
      id: "sv4-72",
      imageL: "https://images.pokemontcg.io/sv4/72_hires.png",
      imageS: "https://images.pokemontcg.io/sv4/72.png",
      name: "Xatu",
      subtype: ["Stage 1"],
      type: ["Psychic"],
      supertype: "Pokémon",
    },
    "sv6pt5-54": {
      id: "sv6pt5-54",
      imageL: "https://images.pokemontcg.io/sv6pt5/54_hires.png",
      imageS: "https://images.pokemontcg.io/sv6pt5/54.png",
      name: "Academy at Night",
      subtype: ["Stadium"],
      supertype: "Trainer",
    },
    "sv5-144": {
      id: "sv5-144",
      imageL: "https://images.pokemontcg.io/sv5/144_hires.png",
      imageS: "https://images.pokemontcg.io/sv5/144.png",
      name: "Buddy-Buddy Poffin",
      subtype: ["Item"],
      supertype: "Trainer",
    },
    "sv5-145": {
      id: "sv5-145",
      imageL: "https://images.pokemontcg.io/sv5/145_hires.png",
      imageS: "https://images.pokemontcg.io/sv5/145.png",
      name: "Ciphermaniac's Codebreaking",
      subtype: ["Supporter", "Future"],
      supertype: "Trainer",
    },
    "sv4-160": {
      id: "sv4-160",
      imageL: "https://images.pokemontcg.io/sv4/160_hires.png",
      imageS: "https://images.pokemontcg.io/sv4/160.png",
      name: "Counter Catcher",
      subtype: ["Item"],
      supertype: "Trainer",
    },
    "sv8-174": {
      id: "sv8-174",
      imageL: "https://images.pokemontcg.io/sv8/174_hires.png",
      imageS: "https://images.pokemontcg.io/sv8/174.png",
      name: "Drayton",
      subtype: ["Supporter"],
      supertype: "Trainer",
    },
    "sv4pt5-80": {
      id: "sv4pt5-80",
      imageL: "https://images.pokemontcg.io/sv4pt5/80_hires.png",
      imageS: "https://images.pokemontcg.io/sv4pt5/80.png",
      name: "Iono",
      subtype: ["Supporter"],
      supertype: "Trainer",
    },
    "sv6-155": {
      id: "sv6-155",
      imageL: "https://images.pokemontcg.io/sv6/155_hires.png",
      imageS: "https://images.pokemontcg.io/sv6/155.png",
      name: "Lana's Aid",
      subtype: ["Supporter"],
      supertype: "Trainer",
    },
    "sv6pt5-61": {
      id: "sv6pt5-61",
      imageL: "https://images.pokemontcg.io/sv6pt5/61_hires.png",
      imageS: "https://images.pokemontcg.io/sv6pt5/61.png",
      name: "Night Stretcher",
      subtype: ["Item"],
      supertype: "Trainer",
    },
    "sv8pt5-123": {
      id: "sv8pt5-123",
      imageL: "https://images.pokemontcg.io/sv8pt5/123_hires.png",
      imageS: "https://images.pokemontcg.io/sv8pt5/123.png",
      name: "Professor's Research",
      subtype: ["Supporter"],
      supertype: "Trainer",
    },
    "sv5-159": {
      id: "sv5-159",
      imageL: "https://images.pokemontcg.io/sv5/159_hires.png",
      imageS: "https://images.pokemontcg.io/sv5/159.png",
      name: "Rescue Board",
      subtype: ["Pokémon Tool"],
      supertype: "Trainer",
    },
    "swsh9-150": {
      id: "swsh9-150",
      imageL: "https://images.pokemontcg.io/swsh9/150_hires.png",
      imageS: "https://images.pokemontcg.io/swsh9/150.png",
      name: "Ultra Ball",
      subtype: ["Item"],
      supertype: "Trainer",
    },
    "sve-13": {
      id: "sve-13",
      imageL: "https://images.pokemontcg.io/sve/13_hires.png",
      imageS: "https://images.pokemontcg.io/sve/13.png",
      name: "Basic Psychic Energy",
      subtype: ["Basic"],
      type: ["Psychic"],
      supertype: "Energy",
    },
    "sv2-190": {
      id: "sv2-190",
      imageL: "https://images.pokemontcg.io/sv2/190_hires.png",
      imageS: "https://images.pokemontcg.io/sv2/190.png",
      name: "Jet Energy",
      subtype: ["Special"],
      type: ["Colorless"],
      supertype: "Energy",
    },
    "sv6-167": {
      id: "sv6-167",
      imageL: "https://images.pokemontcg.io/sv6/167_hires.png",
      imageS: "https://images.pokemontcg.io/sv6/167.png",
      name: "Legacy Energy",
      subtype: ["Special", "ACE SPEC"],
      supertype: "Energy",
    },
  };
  const stadium = {
    card: "pgo-68",
    owner: "",
  };
  const player = {
    active: [],
    bench: [
      {
        cardId: "sv8-76",
        attachments: [
          {
            cardId: "sve-13",
          },
          {
            cardId: "sve-13",
          },
          {
            cardId: "sv5-140",
          },
        ],
      },
      {
        cardId: "sv8-76",
        attachments: [
          {
            cardId: "sve-13",
          },
          {
            cardId: "sve-13",
          },
        ],
      },
      {
        cardId: "sv8-76",
        attachments: [
          {
            cardId: "sve-13",
          },
          {
            cardId: "sve-13",
          },
          {
            cardId: "sv5-140",
          },
        ],
      },
      {
        cardId: "sv8-76",
        attachments: [
          {
            cardId: "sve-13",
          },
          {
            cardId: "sve-13",
          },
        ],
      },
      {
        cardId: "sv8-76",
        attachments: [
          {
            cardId: "sve-13",
          },
          {
            cardId: "sve-13",
          },
          {
            cardId: "sv5-140",
          },
        ],
      },
      {
        cardId: "sv8-76",
        attachments: [
          {
            cardId: "sve-13",
          },
          {
            cardId: "sve-13",
          },
        ],
      },
      {
        cardId: "sv8-76",
        attachments: [
          {
            cardId: "sve-13",
          },
          {
            cardId: "sve-13",
          },
          {
            cardId: "sv5-140",
          },
        ],
      },
      {
        cardId: "sv8-76",
        attachments: [
          {
            cardId: "sve-13",
          },
          {
            cardId: "sve-13",
          },
        ],
      },
      {
        cardId: "sv8-76",
        attachments: [
          {
            cardId: "sve-13",
          },
          {
            cardId: "sve-13",
          },
          {
            cardId: "sv5-140",
          },
        ],
      },
      {
        cardId: "sv8-76",
        attachments: [
          {
            cardId: "sve-13",
          },
          {
            cardId: "sve-13",
          },
        ],
      },
      {
        cardId: "sv8-76",
        attachments: [
          {
            cardId: "sve-13",
          },
          {
            cardId: "sve-13",
          },
          {
            cardId: "sv5-140",
          },
        ],
      },
      {
        cardId: "sv8-76",
        attachments: [
          {
            cardId: "sve-13",
          },
          {
            cardId: "sve-13",
          },
        ],
      },
    ],
    trash: ["sve-13"],
    prize: ["sv8-76", "sc123"],
    hands: [
      "sv8-76",
      "sv4-71",
      "sv8pt5-86",
      "sv7-58",
      "sv8pt5-18",
      "sv4pt5-75",
      "sv7-58",
      "sv8pt5-18",
      "sv4pt5-75",
    ],
  };

  return (
    <>
      <div
        style={{ display: "flex", justifyContent: "space-between", margin: 10 }}
      >
        <div>
          <StackCards number={5} />
        </div>
        <div style={{ display: "flex" }}>
          <div>
            <Card bench />
          </div>
          <div>
            <Card bench />
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
        }}
      >
        <Card bench />
        <Card bench />
        <Card bench />
        <Card bench />
      </div>
      <div
        style={{
          display: "flex",
          backgroundColor: "yellow",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          {stadium.card ? (
            <Card imageL={cards[stadium.card].imageL} />
          ) : (
            <EmptyZone />
          )}
        </div>
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              margin: 10,
            }}
          >
            {stadium.card ? (
              <Card imageL={cards[stadium.card].imageL} />
            ) : (
              <EmptyZone />
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              margin: 10,
            }}
          >
            {player.active.length ? (
              <Card imageL={cards[player.active[0]].imageL} />
            ) : (
              <EmptyZone />
            )}
          </div>
        </div>
        <div>
          <Card />
        </div>
      </div>

      <div
        style={{
          marginTop: 10,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          gap: 4,
          flexWrap: 'wrap',
          backgroundColor: "#ccc",
        }}
      >
        {player.bench.map((card, index) => {
          console.log({ card });
          return (
            <HandCard
              key={index}
              imageL={cards[card.cardId].imageL}
              attachments={card.attachments.map((c) => {
                return cards[c.cardId];
              })}
            />
          );
        })}
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
            <StackCards number={player.prize.length} />
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
            <StackCards number={2 || player.deck.length} tight={true} />
            <div>
              <Menu menuButton={<MenuButton>Deck: 2</MenuButton>} transition>
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
            {player.trash.length ? (
              <Card
                bench
                imageL={cards[player.trash[player.trash.length - 1]].imageL}
              />
            ) : (
              <EmptyZone />
            )}
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
          flexWrap: "wrap",
          gap: 2
        }}
      >
        {player.hands.map((card, index) => {
          return <HandCard key={index} imageL={cards[card].imageL} />;
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
    </>
  );
}

export default App;
