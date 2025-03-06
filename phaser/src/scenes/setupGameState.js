/**
 *
 * @param {Phaser.Scene} scene
 */
export default function setupGameState(scene) {
  const roomId = localStorage.getItem("roomId")
  const playerId = localStorage.getItem("token")
  const deckName = localStorage.getItem("deck")

  scene.registry.set({
    roomId,
    playerId,
    deckName
  })
}
