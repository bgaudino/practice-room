function calculateScale() {
  let tempo = 60000/document.querySelector('#tempo').value;
  // get user input
  var clef = document.querySelector('#clef').value;
  var clefOctave = document.querySelector('#clef').selectedIndex;
  var tonic = document.querySelector("#tonic").value;
  var accidental = document.querySelector("#accidental").value;
  var scaleType = document.querySelector("#scaleType").value;

  // reorder scale
  let scale = {
    notes: ["C", "D", "E", "F", "G", "A", "B"],
    steps: [2, 2, 1, 2, 2, 2, 1],
    octave: []
  };

  scale.octave = findOctave(clefOctave, scale.notes);
  while (tonic != scale.notes[0]) {
    scale.notes.push(scale.notes.shift());
    scale.steps.push(scale.steps.shift());
    scale.octave.push(scale.octave.shift() + 1);
  }

  // add octave
  scale.notes.push(scale.notes[0]);
  scale.octave.push(scale.octave[0] + 1);

  // find steps for selected scale and mode
  var newSteps;

  switch (scaleType) {
    case "major":
      newSteps = [2, 2, 1, 2, 2, 2, 1];
      break;
    case "harmonicMinor":
      newSteps = [2, 1, 2, 2, 1, 3, 1];
      break;
    case "melodicMinor":
      newSteps = [2, 1, 2, 2, 2, 2, 1];
      break;
    case "harmonicMajor":
      newSteps = [2, 2, 1, 2, 1, 3, 1];
      break;
  }
  n = document.querySelector("#modes").selectedIndex;
  for (let i = 0; i < n; i++) {
    newSteps.push(newSteps.shift());
  }

  // accidentals
  scale = addAccidentals(scale, accidental, newSteps);

  // form answer
  var answer = symbols(scale.notes);

  // play notes and draw staff
  var sound = document.getElementById('sound')
  if (sound.checked) {
    play(scale.notes, scale.octave, answer, '#scale', 'scale', tempo);
  } else {
      let display = '';
      for (let i = 0; i < answer.length; i++) {
        display += answer[i] + ' ';
      } document.querySelector('#scale').innerHTML = display.trim();
  }
  draw('staff', scale.notes, scale.octave, 400, 380, clef);
}


function calculateInterval() {

  // get user input
  let tempo = 60000/document.querySelector('#tempo').value;
  var clef = document.querySelector('#clef2').value;
  var clefOctave = document.querySelector('#clef2').selectedIndex;
  var root = document.querySelector("#intervalStart").value;
  var accidental = document.querySelector("#accidental3").value;
  var size = document.querySelector("#size").selectedIndex;
  var quality = document.querySelector("#intervalQuality").value;

  // reorder scale
  let scale = {
    notes: ["C", "D", "E", "F", "G", "A", "B"],
    steps: [2, 2, 1, 2, 2, 2, 1],
    octave: []
  };
  var majorSteps = [2, 2, 1, 2, 2, 2, 1];
  scale.octave = findOctave(clefOctave, scale.notes);
  while (root != scale.notes[0]) {
    scale.notes.push(scale.notes.shift());
    scale.steps.push(scale.steps.shift());
    scale.octave.push(scale.octave.shift() + 1);
  }

  //form generic interval tally steps
  var interval = {
    notes: [scale.notes[0]],
    octave: [scale.octave[0]],
    steps: 0
  }
  var totalSteps = 0;
  interval.notes[1] = scale.notes[(size + 1) % scale.notes.length];
  interval.octave[1] = scale.octave[(size + 1) % scale.octave.length];
  for (let i = 0; i < size + 1; i++) {
    interval.steps += scale.steps[i];
    totalSteps += majorSteps[i];
  }

  // add accidentals to 1st note
  switch(accidental) {
    case 'sharp':
      interval.notes[0] += '#';
      interval.steps--;
      break;
    case 'flat':
      interval.notes[0] += 'b';
      interval.steps++;
      break;
    default:
      break;
  }

  // adjust steps
  switch (quality) {
    case 'up':
      totalSteps++;
      break;
    case 'down':
      totalSteps--;
      break;
    case 'downTwo':
      totalSteps -= 2;
      break;
    default:
      break;
  }

  // add accidentals to 2nd note
  if (interval.steps == totalSteps + 1) {
    interval.notes[1] += 'b';
  } else if (interval.steps == totalSteps - 1) {
    interval.notes[1] += '#';
  } else if (interval.steps == totalSteps + 2) {
    interval.notes[1] += 'bb';
  } else if (interval.steps == totalSteps - 2) {
    interval.notes[1] += '##';
  }

  // check for octave
  if (interval.notes[0] == interval.notes[1]) {
    interval.octave[1]++;
  }
  // play and draw answer
  var answer = symbols(interval.notes);

  var sound = document.getElementById('sound')
  if (sound.checked) {
    play(interval.notes, interval.octave, answer, '#interval', scale, tempo);
  } else {
      let display = '';
      for (let i = 0; i < answer.length; i++) {
        display += answer[i] + ' ';
      } document.querySelector('#interval').innerHTML = display.trim();
  }

  draw('intervalStaff', interval.notes, interval.octave, 200, 150, clef);
}


function spellChord() {
  // get user input
  let tempo = 60000/document.querySelector('#tempo').value;
  var clef = document.querySelector('#clef3').value;
  var clefOctave = document.querySelector('#clef3').selectedIndex;
  var root = document.querySelector("#roots").value;
  var accidental = document.querySelector("#accidental2").value;
  var quality = document.querySelector("#quality").value;
  var inversion = document.querySelector("#inversion").selectedIndex;

  let scale = {
    notes: ["C", "E", "G", "B", "D", "F", "A"],
    steps: [4, 3, 4, 3, 3, 4, 3],
    octave: []
  };


  scale.octave = findOctave(clefOctave, scale.notes);
  while (root != scale.notes[0]) {
    scale.notes.push(scale.notes.shift());
    scale.steps.push(scale.steps.shift());
    scale.octave.push(scale.octave.shift() + 1);
  }

  var chord = [];

  switch (quality) {
    case "major":
      chord = [4, 3];
      break;
    case "minor":
      chord = [3, 4];
      break;
    case "augmented":
      chord = [4, 4];
      break;
    case "diminished":
      chord = [3, 3];
      break;
    case "major7":
      chord = [4, 3, 4];
      break;
    case "dominant7":
      chord = [4, 3, 3];
      break;
    case "minor7":
      chord = [3, 4, 3];
      break;
    case "minorMajor7":
      chord = [3, 4, 4];
      break;
    case "halfDiminished7":
      chord = [3, 3, 4];
      break;
    case "diminished7":
      chord = [3, 3, 3];
      break;
  }

  switch(root) {
    case 'E':
      scale.octave[3]++;
      break;
    case 'G':
      scale.octave[2]++;
      scale.octave[3]++;
      break;
    case 'B':
      scale.octave[1]++;
      scale.octave[2]++;
      scale.octave[3]++;
      break;
    default:
      break;
  }

  for (let i = 0; i < 6 - chord.length; i++) {
    scale.notes.pop();
    scale.octave.pop();
    scale.steps.pop();
  } scale.steps.pop();

  // accidentals
  addAccidentals(scale, accidental, chord);

  // inversion
  for (let i = 0; i < inversion; i++) {
    scale.notes.push(scale.notes.shift());
    scale.octave.push(scale.octave.shift());
  }
  for (let i = 0; i < inversion; i++) {
      scale.octave[chord.length - i]++;
  }

  for (let i = 0; i < scale.octave.length; i++) {
    if (scale.octave[i] > (5 - clefOctave)) {
      for (let i = 0; i < scale.octave.length; i++) {
        scale.octave[i]--;
      } break;
    }
  }


  var answer = symbols(scale.notes);
  var sound = document.getElementById('sound')
  if (sound.checked) {
    play(scale.notes, scale.octave, answer, '#chord', scale, tempo);
  } else {
      let display = '';
      for (let i = 0; i < answer.length; i++) {
        display += answer[i] + ' ';
      } document.querySelector('#chord').innerHTML = display.trim();
  } draw('chordStaff', scale.notes, scale.octave, 400, 200, clef);
}


function prog() {
  var key = document.querySelector("#key").value;
  var accidental = document.querySelector("#accidental4").value;

  var notes = ["C", "D", "E", "F", "G", "A", "B"];
  var steps = [2, 2, 1, 2, 2, 2, 1];
  var scale = [2, 2, 1, 2, 2, 2, 1];

  while (key != notes[0]) {
    notes.push(notes.shift());
    steps.push(steps.shift());
  }

  if (accidental == "sharp") {
    steps[0]--;
    steps[6]++;
    notes[0] += "♯";
  } else if (accidental == "flat") {
    steps[0]++;
    steps[6]--;
    notes[0] += "♭";
  }

  for (let i = 0; i < notes.length - 1; i++) {
    if (steps[i] == scale[i] - 1) {
      notes[i + 1] += "♯";
      steps[i + 1]--;
    }
    if (steps[i] == scale[i] + 1) {
      notes[i + 1] += "♭";
      steps[i + 1]++;
    }
  }

  var qualities = [
    ["", "maj7", "maj9", "6", "6/9", "add9"],
    ["-", "-7", "-9", "-11", "-add9", "-6"],
    ["-", "-7", "sus", "7sus", "-", "-7"],
    ["", "maj7", "maj9", "maj7(♯11)", "6/9", "add9"],
    ["", "7", "9", "13", "7sus", "7(♯11)"],
    ["-", "-7", "-9", "-11", "-add9", "-"]
  ];

  var n = 0;

  var radio = document.getElementsByName("complexity");

  var length = document.querySelector("#length").value;
  var prog = "𝄆 ";

  for (let i = 0; i < length; i++) {
    let r = Math.floor(Math.random() * 6);
    if (radio[1].checked) {
      n = Math.floor(Math.random() * 5) + 1;
    }
    prog += notes[r] + qualities[r][n];
    if (i < length - 1) {
      prog += " 𝄅 ";
    }
  }
  prog += " 𝄇";
  document.querySelector("#progression").innerHTML = prog;
}


function rhythm () {
  var beats = [1, 2, 3, 4, 6, 8];
  var unit = document.querySelector('#unit').value;
  var denominator = 8 / unit;
  var bars = document.querySelector('#measures').value;
  var notes = [
    "<img src='static/quaversymbol.gif'>",
    "<img src='static/crotchetsymbol.gif'>",
    "<img src='static/crotchetsymbol.gif'>.",
    "<img src='static/minimsymbol.gif'>",
    "<img src='static/minimsymbol.gif'>.",
    "<img src='static/semibreve.gif'>"
  ];
  var sum = 0;
  var measure = document.querySelector('#beats').value;
  var answer = [];
  for (i = 1; i <= bars; i++) {
    while (sum != measure * unit) {
      let n = Math.floor(Math.random() * 6);
      sum += beats[n];
      answer.push(notes[n]);
      if (sum > measure * unit) {
        answer.pop();
        sum -= beats[n];
      }
    } sum = 0;
      if (i == bars) {
        answer.push('𝄇');
    } else {
        answer.push('𝄅');
    }
  }
    var counter = 0;
    var display = '<div>' + measure + '/' + denominator + '𝄆  ';
    for (let i = 0; i < answer.length; i++) {
      display += answer[i]
      if (answer[i] == '𝄅') {
        counter++;
        if (counter > 1) {
          display += '</div>';
          display += '<div>𝄅  ';
          counter = 0;
        }
      }
    }
    document.querySelector('#rhythm').innerHTML = display + '</div>';
}

function toggleTempo() {
  let tempo = document.querySelector('#tempo');
  let sound = document.querySelector('#sound');
  let bpm = document.querySelector('#bpm');
  if (sound.checked) {
    tempo.className = '';
    bpm.className = '';
  } else {
    tempo.className = 'hidden';
    bpm.className = 'hidden';
  }
}
