/**
 *
 * @param {Phaser.Scene} scene
 */
export default function setupGameState(scene) {
  scene.registry.set({
    playerHands: [], // player's hand
    playerCards: [
      {
        id: "sv1-181",
        imageL: "https://images.pokemontcg.io/sv1/181_hires.png",
        imageS: "https://images.pokemontcg.io/sv1/181.png",
        name: "Nest Ball",
        subtype: ["Item"],
        supertype: "Trainer",
      },
      {
      "id": "sv8pt5-4",
      "imageL": "https://images.pokemontcg.io/sv8pt5/4_hires.png",
      "imageS": "https://images.pokemontcg.io/sv8pt5/4.png",
      "name": "Budew",
      "subtype": [
        "Basic"
      ],
      "type": [
        "Grass"
      ],
      "supertype": "Pokémon"
    },
    {
      "id": "sv6-105",
      "imageL": "https://images.pokemontcg.io/sv6/105_hires.png",
      "imageS": "https://images.pokemontcg.io/sv6/105.png",
      "name": "Conkeldurr",
      "subtype": [
        "Stage 2"
      ],
      "type": [
        "Fighting"
      ],
      "supertype": "Pokémon"
    },
     {
      "id": "sv6pt5-38",
      "imageL": "https://images.pokemontcg.io/sv6pt5/38_hires.png",
      "imageS": "https://images.pokemontcg.io/sv6pt5/38.png",
      "name": "Fezandipiti ex",
      "subtype": [
        "Basic",
        "ex"
      ],
      "type": [
        "Darkness"
      ],
      "supertype": "Pokémon"
    },
   {
      "id": "sv6pt5-47",
      "imageL": "https://images.pokemontcg.io/sv6pt5/47_hires.png",
      "imageS": "https://images.pokemontcg.io/sv6pt5/47.png",
      "name": "Kyurem",
      "subtype": [
        "Basic"
      ],
      "type": [
        "Dragon"
      ],
      "supertype": "Pokémon"
    },
    {
      "id": "sve-13",
      "imageL": "https://images.pokemontcg.io/sve/13_hires.png",
      "imageS": "https://images.pokemontcg.io/sve/13.png",
      "name": "Basic Psychic Energy",
      "subtype": [
        "Basic"
      ],
      "type": [
        "Psychic"
      ],
      "supertype": "Energy"
    },
    ],
    playerCardsInPlay: [{index: 1}, {index: 2}, {index: 3, attachedCards: [5]}],
    playerSelectedCards: [],
  });
}
