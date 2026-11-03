/** Audio is created only from a pilot's keyboard or pointer gesture. */
export function createThrusterSound() {
  let context: AudioContext | undefined;
  let volume: GainNode | undefined;
  let enabled = true;
  let playing = false;
  let activated = false;

  function setMoving(moving: boolean) {
    const audible = enabled && moving && context?.state === 'running';
    if (audible === playing || !context || !volume) return;
    playing = audible;
    volume.gain.cancelScheduledValues(context.currentTime);
    volume.gain.setTargetAtTime(audible ? 0.08 : 0, context.currentTime, 0.02);
  }

  function dispose() {
    playing = false;
    if (context) void context.close().catch(() => {});
    context = undefined;
    volume = undefined;
  }

  function unlock() {
    activated = true;
    if (!enabled) return;
    try {
      if (!context) {
        if (!window.AudioContext) return;
        context = new window.AudioContext();
        volume = context.createGain();
        volume.gain.value = 0;
        volume.connect(context.destination);

        const noise = context.createBuffer(1, context.sampleRate, context.sampleRate);
        const samples = noise.getChannelData(0);
        for (let index = 0; index < samples.length; index++) samples[index] = Math.random() * 2 - 1;
        const source = context.createBufferSource();
        source.buffer = noise;
        source.loop = true;
        const filter = context.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 650;
        source.connect(filter);
        filter.connect(volume);
        source.start();
      }
      if (context.state === 'suspended') void context.resume().catch(() => {});
    } catch {
      // Missing or blocked audio must never interrupt navigation.
      dispose();
    }
  }

  return {
    unlock,
    setMoving,
    setEnabled(value: boolean) {
      enabled = value;
      if (!enabled) setMoving(false);
      else if (activated) unlock();
    },
    dispose,
  };
}
