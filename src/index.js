let bass, drums, basePerc, shaker, guitarMain, guitarIntro, guitarHarmony
let cx, cy
let drumTime = 0,
   bassTime = 0
// Constante para que el loop tenga sentido. Por alguna razón se exportaron más largos de lo que son
const LOOP_DURATION = 4.17391304347826
const PASS_RANGE = 0.25
let score = 0

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
   const cnv = createCanvas(600, 600)
   cnv.mousePressed(playAll)
   cx = width / 2
   cy = height / 2
   setPlayMode()
}

function draw() {
   background(220)
   drumTime = drums.currentTime()
   bassTime = bass.currentTime()
   text("Score: " + score, cx - 150, cy - 80)
   textSize(20)
   text("Haz click en el canvas para comenzar", cx - 150, cy)
   text('Pulsa "Espacio" para detener y reaundar el bajo', cx - 150, cy + 40)
   // text("Presiona P para play/pausa de todos los sonidos", cx - 150, cy + 80)
}

function keyPressed() {
   if (key === " ") {
      if (bass.isPlaying()) {
         bass.stop()
      } else {
         bass.loop(undefined, undefined, undefined, undefined, LOOP_DURATION)
         const timeDiff = abs(bassTime - drumTime)
         console.log(timeDiff)
         if (
            timeDiff <= PASS_RANGE ||
            timeDiff >= LOOP_DURATION - PASS_RANGE ||
            (timeDiff <= LOOP_DURATION / 2 + PASS_RANGE && timeDiff >= LOOP_DURATION / 2 - PASS_RANGE)
         ) {
            score++
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
