let bass, drums, basePerc, shaker, guitarMain, guitarIntro, guitarHarmony
let cx, cy
let drumTime = 0,
   bassTime = 0
// Constante para que el loop tenga sentido. Por alguna razón se exportaron más largos de lo que son
const LOOP_DURATION = 4.17391304347826
const PASS_RANGE = 0.5
const SCORE_DURATION = 2000
let score = 0
let showBassText = false,
   scored = false,
   failed = false

function preload() {
   soundFormats("mp3", "ogg")
   bass = loadSound("assets/Bass")
   drums = loadSound("assets/Drums")
   basePerc = loadSound("assets/BasePerc")
   shaker = loadSound("assets/Shaker")
   guitarMain = loadSound("assets/GuitarMain")
   guitarIntro = loadSound("assets/GuitarIntro")
   guitarHarmony = loadSound("assets/GuitarHarm")
}

const soundsArePlaying = () => bass.isPlaying() || drums.isPlaying() || basePerc.isPlaying() || shaker.isPlaying()

function setup() {
   const cnv = createCanvas(800, 600)
   cnv.mousePressed(playAll)
   cx = width / 2
   cy = height / 2
   setPlayMode()
}

function draw() {
   if (scored) {
      background(6, 153, 50)
   } else if (failed) {
      background(255, 0, 0)
   } else {
      background(30, 2, 245)
   }
   drumTime = drums.currentTime()
   bassTime = bass.currentTime()
   textSize(20)
   fill(255)
   text("Cada que el bajo entre a tiempo, ganas un punto", cx - 200, cy - 80)
   text("Puntuación: " + score, cx - 200, cy - 40)
   text("Para la mejor experiencia, usa audífonos", cx - 200, cy)
   text("Haz click en el canvas para comenzar", cx - 200, cy + 40)
   if (showBassText) {
      text('Pulsa "Espacio" para detener y reaundar el bajo', cx - 200, cy + 80)
   }
   text("Presiona P para play/pausa de todos los sonidos", cx - 200, height - 40)
   if (scored) {
      textSize(40)
      text("¡Punto!", cx - 200, cy - 120)
   } else if (failed) {
      textSize(40)
      text("¡Fallaste!", cx - 200, cy - 120)
   }
}

function keyPressed() {
   if (key === " ") {
      if (bass.isPlaying()) {
         bass.stop()
      } else {
         bass.loop(undefined, undefined, undefined, undefined, LOOP_DURATION)
         const timeDiff = abs(bassTime - drumTime)
         if (
            timeDiff <= PASS_RANGE ||
            timeDiff >= LOOP_DURATION - PASS_RANGE ||
            (timeDiff <= LOOP_DURATION / 2 + PASS_RANGE && timeDiff >= LOOP_DURATION / 2 - PASS_RANGE)
         ) {
            score++
            scored = true
            setTimeout(() => {
               scored = false
            }, SCORE_DURATION)
         } else {
            failed = true
            setTimeout(() => {
               failed = false
            }, SCORE_DURATION)
         }
      }
   }
   if (key === "p" || key === "P") {
      if (soundsArePlaying()) {
         pauseAll()
      } else {
         playAll()
      }
   }
}

const playAll = () => {
   guitarMain.play(undefined, undefined, undefined, undefined, LOOP_DURATION)
   showBassText = true
   guitarIntro.play(LOOP_DURATION, undefined, undefined, undefined, LOOP_DURATION)
   guitarHarmony.play(LOOP_DURATION * 2, undefined, undefined, undefined, LOOP_DURATION)
   guitarMain.loop(LOOP_DURATION * 3, undefined, undefined, undefined, LOOP_DURATION)
   bass.loop(LOOP_DURATION, undefined, undefined, undefined, LOOP_DURATION)
   basePerc.loop(LOOP_DURATION, undefined, undefined, undefined, LOOP_DURATION)
   shaker.loop(LOOP_DURATION, undefined, undefined, undefined, LOOP_DURATION)
   drums.loop(LOOP_DURATION, undefined, undefined, undefined, LOOP_DURATION)
}

const pauseAll = () => {
   basePerc.stop()
   shaker.stop()
   drums.stop()
   bass.stop()
   guitarHarmony.stop()
   guitarIntro.stop()
   guitarMain.stop()
}

const setPlayMode = () => {
   bass.playMode("restart")
   basePerc.playMode("restart")
   shaker.playMode("restart")
   drums.playMode("restart")
   guitarHarmony.playMode("restart")
   guitarIntro.playMode("restart")
   guitarMain.playMode("restart")
}
