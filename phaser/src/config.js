const IS_PORTRAIT = window.innerWidth < window.innerHeight
const ratio = window.innerWidth / window.innerHeight
const HEIGHT =!IS_PORTRAIT ? window.innerHeight : 1280
const WIDTH = !IS_PORTRAIT ? window.innerWidth : HEIGHT * ratio
const HAND_HEIGHT = 200

export {WIDTH, HEIGHT, HAND_HEIGHT}