export default function setClickAction(scene, button, text, action) {
  button.setInteractive({
    useHandCursor: true,
  }).on('pointerdown', () => {
    scene.clicked = button
    scene.clickedText = text
    scene.originalTextPosition = {x: text.x, y: text.y}
    text.y+=4
    text.x+=4
  }).on("pointerup", () => {
    if(scene.clicked === button)
     action()
  })
}