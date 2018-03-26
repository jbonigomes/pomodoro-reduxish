define([], () => ({
  formatTime (time) {
    const h = Math.floor(+time / 3600);
    const m = Math.floor(+time % 3600 / 60);
    const s = Math.floor(+time % 3600 % 60);

    return ((h>0?h+':'+(m<10?'0':''):'')+m+':'+(s<10?'0':'')+s);
  },

  formatPercentage (time, length) {
    const perc = Math.floor((time * 100) / (length * 60));
    return `${perc}%`;
  },

  audio: new window.AudioContext(),

  playSound () {
    const oscillator = this.audio.createOscillator();

    oscillator.type = 'square';
    oscillator.connect(this.audio.destination);
    oscillator.start(0);

    setTimeout(() => oscillator.stop(), 100);
  },
}));
