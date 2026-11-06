interface ThrusterGraph {
  context: AudioContext;
  volume: GainNode;
}
function createNoise(context: AudioContext): AudioBuffer {
  const noise = context.createBuffer(1, context.sampleRate, context.sampleRate);

  const samples = noise.getChannelData(0);

  for (let index = 0; index < samples.length; index++) samples[index] = Math.random() * 2 - 1;
  return noise;
}

function createGraph(): ThrusterGraph {
  const context = new window.AudioContext();

  try {
    return connectGraph(context);
  } catch (error) {
    void context.close().catch(() => {});
    throw error;
  }
}

function connectGraph(context: AudioContext): ThrusterGraph {
  const volume = context.createGain();

  volume.gain.value = 0;
  volume.connect(context.destination);
  const source = context.createBufferSource();

  source.buffer = createNoise(context);
  source.loop = true;
  const filter = context.createBiquadFilter();

  filter.type = 'lowpass';
  filter.frequency.value = 650;
  source.connect(filter);
  filter.connect(volume);
  source.start();
  return { context, volume };
}

function setVolume(graph: ThrusterGraph, playing: boolean) {
  graph.volume.gain.cancelScheduledValues(graph.context.currentTime);
  graph.volume.gain.setTargetAtTime(playing ? 0.08 : 0, graph.context.currentTime, 0.02);
}

class ThrusterSound {
  private graph?: ThrusterGraph;
  private enabled = true;
  private playing = false;
  private activated = false;
  private shouldPlay(moving: boolean): boolean {
    return this.enabled && moving && this.graph?.context.state === 'running';
  }

  setMoving(moving: boolean) {
    const audible = this.shouldPlay(moving);

    if (audible === this.playing || !this.graph) return;
    this.playing = audible;
    setVolume(this.graph, audible);
  }

  dispose() {
    this.playing = false;
    if (this.graph) void this.graph.context.close().catch(() => {});
    this.graph = undefined;
  }

  private prepare() {
    if (this.graph || !window.AudioContext) return;
    this.graph = createGraph();
  }

  private resume() {
    if (this.graph?.context.state === 'suspended') void this.graph.context.resume().catch(() => {});
  }

  unlock() {
    this.activated = true;
    if (!this.enabled) return;
    try {
      this.prepare();
      this.resume();
    } catch {
      this.dispose();
    }
  }

  setEnabled(value: boolean) {
    this.enabled = value;
    if (!this.enabled) this.setMoving(false);
    else if (this.activated) this.unlock();
  }
}
/** Create the audio graph only after a pilot's keyboard or pointer gesture. */
export function createThrusterSound() {
  return new ThrusterSound();
}
