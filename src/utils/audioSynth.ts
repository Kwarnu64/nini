// Web Audio API synth generator for relaxing romantic music box & ambient pads

class RomanticAudioSynth {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private timerId: number | null = null;
  private step = 0;
  private masterGain: GainNode | null = null;

  // Romantic Pentatonic Chord Progression frequencies (C major / A minor soft romantic tones)
  private melodyNotes = [
    523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, // C5, D5, E5, G5, A5, C6
    659.25, 783.99, 523.25, 880.00, 587.33, 659.25,
    783.99, 880.00, 1046.50, 1174.66, 1318.51
  ];

  private padChords = [
    [261.63, 329.63, 392.00, 493.88], // Cmaj7
    [220.00, 261.63, 329.63, 392.00], // Am7
    [174.61, 220.00, 261.63, 329.63], // Fmaj7
    [196.00, 246.94, 293.66, 392.00]  // G
  ];

  public init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public togglePlay(): boolean {
    this.init();
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    if (!this.ctx) return;
    this.isPlaying = true;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    this.step = 0;
    this.scheduleNextNote();
  }

  private scheduleNextNote = () => {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    
    // Play a gentle music box chime
    const noteFreq = this.melodyNotes[this.step % this.melodyNotes.length];
    this.playChime(noteFreq, now);

    // Every 8 steps play a soft swell chord pad
    if (this.step % 8 === 0) {
      const chordIndex = Math.floor(this.step / 8) % this.padChords.length;
      this.playPadChord(this.padChords[chordIndex], now);
    }

    this.step++;
    // Schedule next note every 450ms
    this.timerId = window.setTimeout(this.scheduleNextNote, 450);
  };

  private playChime(freq: number, time: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    // Gentle bell-like envelope
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.18, time + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.8);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 2.0);
  }

  private playPadChord(notes: number[], time: number) {
    if (!this.ctx || !this.masterGain) return;

    notes.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, time);

      // Warm ambient swell
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(0.04, time + 1.2);
      gain.gain.linearRampToValueAtTime(0.0001, time + 3.4);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(time);
      osc.stop(time + 3.6);
    });
  }

  public playHeartSound() {
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    
    // Quick double heartbeat chime
    this.playChime(523.25, now); // C5
    this.playChime(659.25, now + 0.12); // E5
    this.playChime(783.99, now + 0.24); // G5
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.5);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }
}

export const romanticSynth = new RomanticAudioSynth();
