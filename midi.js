var midi, data, r, g, b;
// request MIDI access
if (navigator.requestMIDIAccess) {
  navigator.requestMIDIAccess({
    sysex: false
  }).then(onMIDISuccess, onMIDIFailure);
} else {
  alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
  // when we get a succesful response, run this code
  midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

  var inputs = midi.inputs.values();
  // loop over all available inputs and listen for any MIDI input
  for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
    // each time there is a midi message call the onMIDIMessage function
    input.value.onmidimessage = onMIDIMessage;
  }
}

function onMIDIFailure(error) {
  // when we get a failed response, run this code
  console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

function onMIDIMessage(message) {
  data = message.data; // this gives us our [command/channel, note, velocity] data.
  console.log('MIDI data', data); // MIDI data [144, 63, 73]


  // SINE
  if (data[1] == 2) {
    var wght = 900 - (data[2] * 800 / 127);
    var sine = document.querySelector('.sine');
    sine.style.fontWeight = wght;
  }

  if (data[1] == 1) {
    var wdth = 200 - (data[2] * 150 / 127);
    var sine = document.querySelector('.sine');
    sine.style.fontStretch = wdth + '%';
  }

  if (data[1] == 4) {
    var alpha = data[2] * 1 / 127;
    var sine = document.querySelector('.sine');
    sine.style.color = "rgba(255, 255, 255, " + alpha + ")";
  }

  // TRIANGLE
  if (data[1] == 6) {
    var wght = 900 - (data[2] * 800 / 127);
    var triangle = document.querySelector('.triangle');
    triangle.style.fontWeight = wght;
  }

  if (data[1] == 5) {
    var wdth = 200 - (data[2] * 150 / 127);
    var triangle = document.querySelector('.triangle');
    triangle.style.fontStretch = wdth + '%';
  }

  if (data[1] == 8) {
    var alpha = data[2] * 1 / 127;
    var triangle = document.querySelector('.triangle');
    triangle.style.color = "rgba(255, 255, 255, " + alpha + ")";
  }

  // SAWTOOTH
  if (data[1] == 10) {
    var wght = 900 - (data[2] * 800 / 127);
    var sawtooth = document.querySelector('.sawtooth');
    sawtooth.style.fontWeight = wght;
  }

  if (data[1] == 9) {
    var wdth = 200 - (data[2] * 150 / 127);
    var sawtooth = document.querySelector('.sawtooth');
    sawtooth.style.fontStretch = wdth + '%';
  }

  if (data[1] == 12) {
    var alpha = data[2] * 1 / 127;
    var sawtooth = document.querySelector('.sawtooth');
    sawtooth.style.color = "rgba(255, 255, 255, " + alpha + ")";
  }

  // SQUARE
  if (data[1] == 14) {
    var wght = 900 - (data[2] * 800 / 127);
    var square = document.querySelector('.square');
    square.style.fontWeight = wght;
  }

  if (data[1] == 13) {
    var wdth = 200 - (data[2] * 150 / 127);
    var square = document.querySelector('.square');
    square.style.fontStretch = wdth + '%';
  }

  if (data[1] == 16) {
    var alpha = data[2] * 1 / 127;
    var square = document.querySelector('.square');
    square.style.color = "rgba(255, 255, 255, " + alpha + ")";
  }

  /*
      if (data[1] == 17) {
        r = data[2] * 255 / 127;
      }

      if (data[1] == 18) {
        g = data[2] * 255 / 127;
      }

      if (data[1] == 19) {
        b = data[2] * 255 / 127;
      }

      document.body.style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
      */
}