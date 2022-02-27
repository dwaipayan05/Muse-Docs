/* Utilities for MIDI Function */

const everyNote = 'C,C#,D,D#,E,F,F#,G,G#,A,A#,B,'
  .repeat(20)
  .split(',')
  .map(function (x, i) {
    return x + '' + Math.floor(i / 12);
  });

  export function toMidi(note: string | number) {
  return everyNote.indexOf(note.toString());
}

function midiToPitchClass(midi: number): string {
  const scaleIndexToNote = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const note = midi % 12;
  return scaleIndexToNote[note];
}

export function toNote(midi: number): string {
  const octave = Math.floor(midi / 12) - 1;
  return midiToPitchClass(midi) + octave.toString();
}
