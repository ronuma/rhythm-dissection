let bass, drums, basePerc, shaker, guitarMain, guitarIntro, guitarHarmony
let cx, cy
// Constante para que el loop tenga sentido. Por alguna razón se exportaron más largos de lo que son
const LOOP_DURATION = 4.17391304347826

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
   background(220)
   cx = width / 2
   cy = height / 2
   textSize(20)
   text("Click on the canvas to start", cx - 150, cy)
   text("Press spacebar to play/stop bass", cx - 150, cy + 40)
   text("Press P to play/pause all sounds", cx - 150, cy + 80)
   text("Press G to play a random guitar part on next loop", cx - 150, cy + 120)
   setPlayMode()
}

function keyPressed() {
   if (key === " ") {
      if (bass.isPlaying()) {
         bass.stop()
      } else {
         bass.loop(undefined, undefined, undefined, undefined, LOOP_DURATION)
      }
   }
   if (key === "p" || key === "P") {
      if (soundsArePlaying()) {
         pauseAll()
      } else {
         playAll()
      }
   }

   if (key === "g" || key === "G") {
      const randomGuitar = random([guitarMain, guitarIntro, guitarHarmony])
      randomGuitar.play(LOOP_DURATION - drums.currentTime())
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
