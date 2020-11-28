import * as View from "./view.js";

View.Init();
console.log(navigator.getGamepads(0));

var audioCtx = new(window.AudioContext || window.webkitAudioContext)();

// async function playNote(frequency, duration) {
//   // create Oscillator node
//   var oscillator = audioCtx.createOscillator();
//
//   oscillator.type = 'triangle';
//   oscillator.frequency.value = frequency; // value in hertz
//   oscillator.connect(audioCtx.destination);
//   oscillator.start();
//   await sleep(duration);
//   oscillator.frequency.value *=2;
//   await sleep(duration);
//   oscillator.stop();
// }

// playNote(440, 100);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

navigator.getGamepads()

// create nodes
var amplitude = audioCtx.createGain();
var oscillator = audioCtx.createOscillator();

// set params
oscillator.frequency.value = 440;
oscillator.type = 'triangle';
amplitude.gain.value = 0;

// connect graph
oscillator.connect(amplitude);
amplitude.connect(audioCtx.destination);

// start
oscillator.start();


function step(timestamp) {
  // const delta = timestamp - start;
  if (navigator.getGamepads().length > 0) {
    let gp = navigator.getGamepads()[0]
    console.log(gp.buttons[0].pressed)
    amplitude.gain.value = 1 * gp.buttons[0].pressed;
  }
  window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);
