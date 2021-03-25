function draw(element, notes, octave, canvas, size, clef) {
  // VF boilerplate
  var VF = Vex.Flow;

  // Create an SVG renderer and attach it to the DIV element named "boo".
  var div = document.getElementById(element);
  div.innerHTML = "";
  var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

  // Configure the rendering context.
  renderer.resize(canvas, 100);
  var context = renderer.getContext();
  context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

  // Create a stave of width 300 at position -10, 200 on the canvas.
  var stave = new VF.Stave((canvas - size) / 2, -10, size);
  var ticks = [];
  // Add a clef and time signature.
  stave.addClef(clef);
  stave.setContext(context).draw();



    for (let i = 0; i < notes.length; i++) {
      if (notes[i].charAt(2)) {
        ticks.push(
          new VF.StaveNote({
            clef: clef,
            keys: [notes[i].charAt(0) + '/' + octave[i]],
            duration: "w"
          }).addAccidental(0, new VF.Accidental(notes[i].substr(1, 2))));
      } else if (notes[i].charAt(1)) {
        ticks.push(
          new VF.StaveNote({
            clef: clef,
            keys: [notes[i].charAt(0) + '/' + octave[i]],
            duration: "w"
          }).addAccidental(0, new VF.Accidental(notes[i].substr(1, 1))));
      } else {
        ticks.push(
          new VF.StaveNote({
            clef: clef,
            keys: [notes[i].charAt(0) + '/' + octave[i]],
            duration: "w"
          }));
      }
    }


  // Connect it to the rendering context and draw!
  var voice = new VF.Voice({ num_beats: ticks.length, beat_value: 1 });
  voice.addTickables(ticks);
    // Format and justify the notes to 400 pixels.
  var formatter = new VF.Formatter().format([voice], size - 40);
  // Render voice
  voice.draw(context, stave);
}