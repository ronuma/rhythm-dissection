// TODO: Add bass sound that starts from the beginning of the sound, which is the one that will be played when the user presses the spacebar
let bass, gameBass, vocals, other, drums, piano
let cx, cy
function preload() {
   soundFormats("mp3", "ogg")
   bass = loadSound("assets/Bass")
   gameBass = loadSound("assets/GameBass")
   vocals = loadSound("assets/Vocal")
   other = loadSound("assets/Other")
   drums = loadSound("assets/Drum")
   piano = loadSound("assets/Piano")
}

const soundsArePlaying = () =>
   vocals.isPlaying() || other.isPlaying() || drums.isPlaying() || piano.isPlaying() || bass.isPlaying()

function setup() {
   const cnv = createCanvas(600, 600)
   cnv.mousePressed(playAll)
   background(220)
   cx = width / 2
   cy = height / 2
   textSize(20)
   text("Click on the canvas to start", cx - 150, cy)
   text("Press spacebar to play/stop bass", cx - 150, cy + 40)
}

function keyPressed() {
   if (key === " ") {
      if (bass.isPlaying()) {
         bass.stop()
      } else {
         if (!gameBass.isPlaying()) {
            gameBass.play()
         } else {
            gameBass.stop()
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
   vocals.loop()
   other.loop()
   drums.loop()
   piano.loop()
   bass.loop()
}

const pauseAll = () => {
   vocals.pause()
   other.pause()
   drums.pause()
   piano.pause()
   bass.pause()
}
