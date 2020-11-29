var amplitude;
var oscillator;

function Start() {
  var audioCtx = new(window.AudioContext || window.webkitAudioContext)();

  navigator.getGamepads()

  // create nodes
  amplitude = audioCtx.createGain();
  oscillator = audioCtx.createOscillator();

  // set params
  oscillator.frequency.value = 440;
  oscillator.type = 'triangle';
  amplitude.gain.value = 0;

  // connect graph
  oscillator.connect(amplitude);
  amplitude.connect(audioCtx.destination);

  // start
  oscillator.start();

  // do update
  window.requestAnimationFrame(Update);
}

function Update(timestamp) {
  // const delta = timestamp - start;
  if (navigator.getGamepads().length > 0) {
    let gp = navigator.getGamepads()[0]
    // console.log(gp.buttons[0].pressed)
    amplitude.gain.value = 1 - gp.buttons[7].value;
    oscillator.frequency.value = 440 * (1 + gp.buttons[6].value);
  }
  window.requestAnimationFrame(Update);
}
