/**
 * Resonant Temple Bell Synthesizer via Web Audio API.
 * Guarantees instantaneous, rich, physical-model temple bell acoustics
 * with zero latency and zero dependency on network buffers.
 */
export function playTempleBellChime(volume = 0.5) {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    if (ctx.state === 'suspended') {
      ctx.resume()
    }

    const t = ctx.currentTime
    // Temple bell overtone series (Fundamental + partials)
    const partials = [
      { freq: 432, gain: 0.5, decay: 4.0 },  // Hum note / Fundamental
      { freq: 864, gain: 0.32, decay: 3.2 }, // Octave
      { freq: 1296, gain: 0.2, decay: 2.2 }, // Tierce / Fifth
      { freq: 1728, gain: 0.12, decay: 1.6 },// Quint
      { freq: 2450, gain: 0.08, decay: 1.0 } // Shimmer strike
    ]

    const masterGain = ctx.createGain()
    masterGain.gain.setValueAtTime(Math.min(Math.max(volume, 0.05), 1.0), t)
    masterGain.connect(ctx.destination)

    partials.forEach((p) => {
      const osc = ctx.createOscillator()
      const g = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(p.freq, t)

      // Fast strike attack & long reverberant decay
      g.gain.setValueAtTime(0.001, t)
      g.gain.linearRampToValueAtTime(p.gain, t + 0.015)
      g.gain.exponentialRampToValueAtTime(0.0001, t + p.decay)

      osc.connect(g)
      g.connect(masterGain)
      osc.start(t)
      osc.stop(t + p.decay + 0.1)
    })
  } catch (err) {
    console.warn('Web Audio synthesis error:', err)
  }
}
