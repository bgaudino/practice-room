async function play(arr, octave, display, location, method, tempo) {

    for (let i = 0; i < arr.length; i++) {
      $(location).html(display[i]);
      Synth.play(0, arr[i], octave[i], 2);
      display[i]+= ' '
      await sleep(tempo);
    } $(location.trim()).html(display);
}
