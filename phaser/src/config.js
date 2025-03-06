const IS_PORTRAIT = window.innerWidth < window.innerHeight
const HEIGHT =!IS_PORTRAIT ? window.innerHeight : 1280
const WIDTH = !IS_PORTRAIT ? window.innerWidth : 800
const HAND_HEIGHT = 200

export {WIDTH, HEIGHT, HAND_HEIGHT}