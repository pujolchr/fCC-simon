// create web audio api context

const DURATION = 0.3;

const AUDIO_CTX = new (window.AudioContext || window.webkitAudioContext)();


const FREQ = {
  blue: 329.628,
  green: 277.183,
  red: 440,
  yellow: 659.255,

};


const DELAY = 500;

function playTheSound(color) {
  if (color === 'wrong') {
    playTheSound('red');
    playTheSound('green');
    playTheSound('blue');
    playTheSound('yellow');
  } else {
    const osci = AUDIO_CTX.createOscillator();

    osci.frequency.value = FREQ[color];
    osci.connect(AUDIO_CTX.destination);
    osci.start(0, 0);
    osci.stop(AUDIO_CTX.currentTime + DURATION);
  }
}

function lightTheButton(color) {
  document.getElementById(`btn-${color}`).style.filter = 'brightness(100%)';
  setTimeout(() => {
    document.getElementById(`btn-${color}`).style.filter = 'brightness(80%)';
  },
             DELAY / 2);
}

function playAllNotes(colors) {
  for (let i = 0; i < colors.length; i += 1) {
    setTimeout(() => {
      playTheSound(colors[i]);
      lightTheButton(colors[i]);
    }, (i + 1) * DELAY);
  }
}

export { lightTheButton, playTheSound, playAllNotes };
