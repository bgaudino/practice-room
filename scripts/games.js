var score = 0;
var problems = 0;
var NOTES;
var OCTAVES;


function play_again() {
  play(NOTES, OCTAVES, 'hi', 'world', 'scale', 750);
}


function noteID() {
  $('#noteIDSubmit').attr('disabled', true);
  document.querySelector('#noteIDSubmit').value = 'Next';
  $('#noteButtons').attr('hidden', false);
  $('#score').attr('hidden', false);
  $('#numCorrect').attr('readonly', true);
  $('#problems').attr('readonly', true);
  let accidentals = document.querySelector('#noteIDAccidentals')
  document.querySelector('#feedback').innerHTML = '';
  var clef = document.querySelector('#clef4').value;
  var notes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  var index = Math.floor(Math.random() * 7);
  var oIndex = Math.floor(Math.random() * 2)
  document.querySelector('#noteButtons').innerHTML = '';
  document.querySelector('#sharpButtons').innerHTML = '';
  document.querySelector('#flatButtons').innerHTML = '';
  for (let i = 0; i < notes.length; i++) {
      document.querySelector('#noteButtons').innerHTML += `<button type='button' name='noteID' value='${ notes[i] }' class="answer_btn">${ notes[i] }</button>`;
      document.querySelector('#sharpButtons').innerHTML += `<button type='button' name='noteID' value='${ notes[i] }#' class="answer_btn">${ notes[i] }♯</button>`;
      document.querySelector('#flatButtons').innerHTML += `<button type='button' name='noteID' value='${ notes[i] }b' class="answer_btn">${ notes[i] }♭</button>`;
    }



  switch(clef) {
    case 'treble':
      var octave = [4, 5];
      break;
    case 'alto':
      var octave = [3, 4];
      break;
    case 'bass':
      var octave = [2, 3];
  }

  var q = [];
  var octaveQ = [];
  q.push(notes[index]);
  let sharpOrFlat = ['', '#', 'b'];
  octaveQ.push(octave[oIndex]);
  if (accidentals.checked) {
    q[0] += sharpOrFlat[Math.floor(Math.random() * 3)];
    $('#flatButtons').attr('hidden', false);
    $('#sharpButtons').attr('hidden', false);
  } else {
      $('#flatButtons').attr('hidden', true);
      $('#sharpButtons').attr('hidden', true);
  }
  draw('noteID', q, octaveQ, 400, 200, clef);

  var buttons = document.getElementsByClassName('answer_btn');
  document.addEventListener('DOMContentLoaded', check(q[0], buttons, document.querySelector('#feedback'), document.getElementById('numCorrect'), document.getElementById('problems')));
}


function intervalID() {
    $('#score').attr('hidden', false);
    $('#intervalFeedback')('');
    $('#intervalButtons').attr('hidden', false);
    $('#again').attr('hidden', false);
    $('#intervalStart').attr('disabled', true);
    let direction = document.querySelector('#direction').value;
    let range = document.querySelector('#range').value;
    document.querySelector("#intervalButtons").innerHTML = '';
    document.querySelector('#intervalStart').value = "Next";
    let scale = {
        notes: ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"],
        octave: []
    };

    var clef = Math.floor(Math.random() * 2)
    scale.octave = findOctave(clef, scale.notes);

    var root = Math.floor(Math.random() * 13)
    for (let i = 0; i < root; i++) {
        scale.notes.push(scale.notes.shift());
        scale.octave.push(scale.octave.shift() + 1);
    }
    scale.notes.push(scale.notes[0]);
    scale.octave.push(scale.octave[0] + 1);
    var index = Math.floor(Math.random() * range)

    const qualities = ['Unison', 'Minor 2nd', 'Major 2nd', 'Minor 3rd', 'Major 3rd', 'Perfect 4th', 'Tritone', 'Perfect 5th', 'Minor 6th', 'Major 6th', 'Minor 7th', 'Major 7th', 'Octave'];
    for (let i = 0; i < range; i++) {
      document.querySelector('#intervalButtons').innerHTML += `<button type='button' name='noteID' value='${ i }' class="answer_btn">${ qualities[i] }</button>`;
    }
    var intervalNotes = [];
    var intervalOctave = [];
    intervalNotes.push(scale.notes[0]);
    intervalNotes.push(scale.notes[index]);
    intervalOctave.push(scale.octave[0]);
    intervalOctave.push(scale.octave[index]);
    if (direction == 'down') {
      intervalNotes.push(intervalNotes.shift());
      intervalOctave.push(intervalOctave.shift());
    }
    
    answer = "What's the interval";
    NOTES = intervalNotes;
    OCTAVES = intervalOctave;
    play(intervalNotes, intervalOctave, answer, '', scale, 750);
    var buttons = document.getElementsByClassName('answer_btn');
    document.addEventListener('DOMContentLoaded', check(index, buttons, document.querySelector('#intervalFeedback'), document.getElementById('intervalNumCorrect'), document.getElementById('intervalProblems')));
}


function check(answer, buttons, feedback, nom, denom) {
  for (let i = 0; i < buttons.length; i++) {
    var emoji;
    if (answer == buttons[i].value) {
      buttons[i].onclick = function(){
        buttons[i].style.backgroundColor = 'green';
        buttons[i].style.color = 'black';
        buttons[i].innerHTML = '✓';
        feedback.innerHTML = 'Correct!';
        score++;
        problems++;
        $('#noteIDSubmit').attr('disabled', false);
        $('#intervalStart').attr('disabled', false);
      }
    } else {
        buttons[i].onclick = function(){
        buttons[i].style.backgroundColor = 'red';
        buttons[i].style.color = 'white';
        buttons[i].innerHTML = '𐄂';
        feedback.innerHTML = 'Incorrect, try again!';
        problems++;
      }
    }
    if (problems < 1) {
      emoji = '';
    } else if (score / problems > 0.9) {
      emoji = ' 😄';
    } else if (score/problems > 0.8) {
      emoji = ' 😊';
    } else if (score/problems > 0.7) {
      emoji = ' 😐';
    } else if (score/problems > 0.6) {
      emoji = ' 😟';
    } else {
      emoji = ' 😩';
    }
  }

  nom.value = score;
  denom.value = problems;

  var p = score / problems;
  var emoji;
  switch(p) {
    case p < 90:
      emoji = '😁'
      break;
    case p < 80:
      emoji = '😊'
      break;
    case p < 70:
      emoji = '😐'
      break;
    case p < 60:
      emoji = '😕'
      break;
    case p < 50:
      emoji = '😦'
      break;
    case p < 40:
      emoji = '😩'
      break;
  } if (problems > 0) {
    p *= 100;
    document.getElementById('emoji').innerHTML = `Score: ${p.toFixed(0)}% ${emoji}`;
  }

  // if (problems > 0) {
  //  $('#submitScore').attr('hidden', false);
 // }
}


