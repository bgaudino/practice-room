function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


function setCookie(str) {
  document.cookie = str;
  theme();
}


function symbols(notes) {
  var newNotes = [];
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].includes('bb')) {
      newNotes[i] = notes[i].replace('bb', '𝄫');
    } else if (notes[i].includes('b')) {
      newNotes[i] = notes[i].replace('b', '♭');
    } else if (notes[i].includes('##')) {
      newNotes[i] = notes[i].replace('##', '𝄪');
    } else if (notes[i].includes('#')) {
      newNotes[i] = notes[i].replace('#', '♯');
    } else {
      newNotes [i] = notes[i];
    }
  } return newNotes;
}


function findOctave(clef, notes) {
    var octave = [];
    for (let i = 0; i < notes.length; i++) {
      octave.push(4 - clef);
    } return octave;
}


function addAccidentals(scale, accidental, newSteps) {
    if (accidental == "sharp") {
    scale.steps[0]--;
    scale.notes[0] += "#";
    if (scale.notes.length > 6) {
      scale.steps[6]++;
      scale.notes[7] += "#"
    }

  } else if (accidental == "flat") {
    scale.steps[0]++;
    scale.notes[0] += "b";
    if (scale.notes.length > 6) {
      scale.steps[6]--;
      scale.notes[7] += 'b';
    }
  }

    for (let i = 0; i < scale.steps.length; i++) {
    if (scale.steps[i] == newSteps[i] - 1) {
      scale.notes[(i + 1) % scale.notes.length] += "#";
      scale.steps[(i + 1) % scale.steps.length]--;
    } else if (scale.steps[i] == newSteps[i] - 2) {
      scale.notes[(i + 1) % scale.notes.length] += "##";
      scale.steps[(i + 1) % scale.steps.length] -= 2;
    } else if (scale.steps[i] == newSteps[i] + 1) {
      scale.notes[(i + 1) % scale.notes.length] += "b";
      scale.steps[(i + 1) % scale.steps.length]++;
    } else if (scale.steps[i] == newSteps[i] + 2) {
      scale.notes[(i + 1) % scale.notes.length] += "bb";
      scale.steps[(i + 1) % scale.steps.length] += 2;
    }
  } return scale;
}

function progAccidentals() {
  var key = document.querySelector("#key").value;
  switch (key) {
    case "A":
    case "B":
    case "D":
    case "E":
    case "G":
      $('#sharp4').attr('disabled', true);
      $('#flat4').attr('disabled', false);
      break;
    case "F":
      $('#flat4').attr('disabled', true);
      $('#sharp4').attr('disabled', false);
      break;
    default:
      $('#flat4').attr('disabled', false);
      $('#sharp4').attr('disabled', false);
      break;
  }
}


function chordAccidentals() {
  var roots = document.querySelector("#roots").value;
  var chord = document.querySelector('#quality').selectedIndex;

  switch (roots) {
    case "B":
    case "E":
      $('#flat3').attr('disabled', false);
      $('#sharp3').attr('disabled', true);
      break;
    case "C":
    case "F":
      $('#flat3').attr('disabled', true);
      $('#sharp3').attr('disabled', false);
      break;
    default:
      $('#flat3').attr('disabled', false);
      $('#sharp3').attr('disabled', false);
      break;
  }

  if (chord > 3) {
    $('#thirdInversion').attr('disabled', false);
  } else {
      $('#thirdInversion').attr('disabled', true);
  }
}



function intervalAccidentals() {
  var note = document.querySelector("#intervalStart").value;

  switch (note) {
    case "B":
    case "E":
      $('#flat2').attr('disabled', false);
      $('#sharp2').attr('disabled', true);
      break;
    case "C":
    case "F":
      $('#flat2').attr('disabled', true);
      $('#sharp2').attr('disabled', false);
      break;
    default:
      $('#flat2').attr('disabled', false);
      $('#sharp2').attr('disabled', false);
      break;
    }
}


function perfectOrImperfect() {
  size = document.querySelector("#size").selectedIndex;

  switch (size) {
    case 2:
    case 3:
    case 6:
      document.querySelector("#intervalQuality").innerHTML =
        '<option value="stay">perfect</option><option value="up">augmented</option><option value="down">diminished</option>';
      break;
    default:
      document.querySelector("#intervalQuality").innerHTML =
        '<option value="stay">major</option><option value="down">minor</option><option value="up">augmented</option><option value="downTwo">diminished</option>';
      break;
  }
}


function listModes(scale) {
  const majorModes = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'];
  const harmonicMinorModes = ['Harmonic Minor', 'Locrian ♮6', 'Ionian ♯6', 'Dorian ♯4', 'Phrygian Dominant', 'Lydian ♯2', 'super-Locrian 𝄫7'];
  const melodicMinorModes = ['Melodic Minor', 'Dorian ♭2', 'Lydian Augmented', 'Lydian Dominant', 'Mixolydian ♭6', 'Locrian ♮2', 'Altered (super-Locrian)'];
  const harmonicMajorModes = ['Harmonic Major', 'Dorian ♭5', 'Altered ♮5', 'Melodic Minor ♯4', 'Mixolydian ♭2', 'Lydian Augmented ♯2', 'Locrian 𝄫7'];
  var scaleType = document.querySelector("#scaleType").value;
  var modes = document.querySelector('#modes');
  modes.innerHTML = '';
  switch (scaleType) {
    case "major":
      for (let i = 0; i < majorModes.length; i++) {
        document.querySelector('#modes').innerHTML += `<option>${majorModes[i]}</option>`
      } break;
    case "harmonicMinor":
      for (let i = 0; i < majorModes.length; i++) {
        document.querySelector('#modes').innerHTML += `<option>${harmonicMinorModes[i]}</option>`
      } break;
    case "melodicMinor":
      for (let i = 0; i < majorModes.length; i++) {
        document.querySelector('#modes').innerHTML += `<option>${melodicMinorModes[i]}</option>`
      } break;
    case "harmonicMajor":
      for (let i = 0; i < majorModes.length; i++) {
        document.querySelector('#modes').innerHTML += `<option>${harmonicMajorModes[i]}</option>`
      } break;
  }

}


$(function(){
  theme();
})

function theme() {
var themeCookie = document.cookie;
  var colors = themeCookie.split(' ');
  color1 = colors[0];
  color2 = colors[1];
  color3 = colors[2];
  var section = document.getElementsByTagName('section');
  if (themeCookie == 'default') {
    $('#nav').css('background-color', '#dddddd');
    $('#nav').css('color', '#000000');
    $('main').css('background-color', '#ffffff');
    $('body').css('background-color', '#ffffff');
    $('a').css('color', '#000000');
    $('table').css('color', '#000000');
    $('.dropbtn').css('background-color', '#dddddd');
    $('.dropbtn').css('color', '#000000');
    for (let i = 0; i < section.length; i ++) {
      section[i].style.color = '#000000';
      section[i].style.backgroundColor = '#dddddd';
    }
  }

  document.body.style.backgroundColor = color1;
  $('#nav').css('background-color', color2);
  $('main').css('background-color', color1);
  $('.dropbtn').css('background-color', color2);
  $('.dropbtn').css('color', color1);
  $('main').css('background-color', color1);
  $('.intervalID').css('background-color', color1);
  $('.intervalID').css('color', color2);

  for (let i = 0; i < section.length; i ++) {
    section[i].style.color = color1;
    section[i].style.backgroundColor = color2;
  }

  // text color
  $('a').css('color', color1);
  $('#nav').css('color', color1);
  document.body.style.color = color2;

  $('table').css('color', color3);

}



function intervalRange() {
  let range = document.querySelector("#intervalRange");
  let value = document.querySelector("#range").value;
  let intervals = ['P1', 'P1', 'm2', 'M2', 'm3', 'M3', 'P4', 'TT', 'P5', 'm6', 'M6', 'm7', 'M7', 'P8'];
    range.innerHTML = `${intervals[0]} to ${intervals[value]}`;
}
