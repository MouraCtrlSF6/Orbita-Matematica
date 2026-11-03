import { afterEach, describe, expect, it, vi } from 'vitest';
import { createThrusterSound } from './thrusterSound';

afterEach(() => vi.unstubAllGlobals());

function mockAudio() {
  const gain = { value: 0, cancelScheduledValues: vi.fn(), setTargetAtTime: vi.fn() };
  const connect = vi.fn();
  const context = {
    state: 'running',
    currentTime: 1,
    sampleRate: 8,
    destination: {},
    createGain: () => ({ gain, connect }),
    createBuffer: () => ({ getChannelData: () => new Float32Array(8) }),
    createBufferSource: () => ({ connect, start: vi.fn() }),
    createBiquadFilter: () => ({ frequency: { value: 0 }, connect }),
    resume: vi.fn().mockResolvedValue(undefined),
    close: vi.fn().mockResolvedValue(undefined),
  };
  const constructor = vi.fn(function () {
    return context;
  });
  vi.stubGlobal('AudioContext', constructor);
  return { context, gain, constructor };
}

describe('thruster audio', () => {
  it('closes a partially created audio graph when initialization fails', () => {
    const { context } = mockAudio();
    vi.spyOn(context, 'createGain').mockImplementation(() => {
      throw Error('blocked');
    });
    const sound = createThrusterSound();
    expect(() => sound.unlock()).not.toThrow();
    expect(context.close).toHaveBeenCalledOnce();
  });
  it('initializes on a gesture, changes volume only on movement transitions and closes on disposal', () => {
    const { constructor, gain, context } = mockAudio();
    const sound = createThrusterSound();
    sound.setMoving(true);
    expect(constructor).not.toHaveBeenCalled();
    sound.unlock();
    expect(gain.value).toBe(0);
    sound.setMoving(true);
    sound.setMoving(true);
    expect(gain.setTargetAtTime).toHaveBeenCalledTimes(1);
    expect(gain.setTargetAtTime).toHaveBeenLastCalledWith(0.08, 1, 0.02);
    sound.setMoving(false);
    expect(gain.setTargetAtTime).toHaveBeenLastCalledWith(0, 1, 0.02);
    sound.dispose();
    expect(context.close).toHaveBeenCalledOnce();
  });

  it('mutes immediately and does not initialize audio while muted', () => {
    const { constructor, gain } = mockAudio();
    const sound = createThrusterSound();
    sound.setEnabled(false);
    sound.unlock();
    sound.setMoving(true);
    expect(constructor).not.toHaveBeenCalled();
    sound.setEnabled(true);
    sound.unlock();
    sound.setMoving(true);
    sound.setEnabled(false);
    expect(gain.setTargetAtTime).toHaveBeenLastCalledWith(0, 1, 0.02);
  });

  it('continues safely when audio is missing, creation fails or playback is blocked', async () => {
    vi.stubGlobal('AudioContext', undefined);
    const sound = createThrusterSound();
    expect(() => {
      sound.unlock();
      sound.setMoving(true);
      sound.dispose();
    }).not.toThrow();
    vi.stubGlobal(
      'AudioContext',
      vi.fn(function () {
        throw Error('denied');
      }),
    );
    expect(() => sound.unlock()).not.toThrow();
    const { context, gain } = mockAudio();
    context.state = 'suspended';
    context.resume.mockRejectedValue(Error('blocked'));
    sound.unlock();
    sound.setMoving(true);
    await Promise.resolve();
    expect(gain.setTargetAtTime).not.toHaveBeenCalled();
    context.close.mockRejectedValue(Error('closed'));
    sound.dispose();
    await Promise.resolve();
  });
});
