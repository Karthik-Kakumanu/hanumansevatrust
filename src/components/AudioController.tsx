import { useState, useRef, useEffect } from 'react'
import { playTempleBellChime } from '../utils/audioSynth'

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [volume, setVolume] = useState(0.4)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Verified Zenkō-ji temple bell recording
    const audio = new Audio('/audio/temple-bell.mp3')
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio

    const handleBellEvent = () => {
      playTempleBellChime(volume)
    }

    window.addEventListener('ring-temple-bell', handleBellEvent)

    return () => {
      window.removeEventListener('ring-temple-bell', handleBellEvent)
      audio.pause()
      audio.src = ''
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    playTempleBellChime(volume)

    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true)
          setHasStarted(true)
        })
        .catch((e) => {
          console.warn('Audio autoplay prevented or error; playing procedural chime:', e)
          setIsPlaying(true)
          setHasStarted(true)
        })
    }
  }

  const ringSingleBell = () => {
    playTempleBellChime(Math.max(volume, 0.4))
  }

  return (
    <div className="audio-controller-container" role="region" aria-label="Devotional Temple Audio">
      {!hasStarted && (
        <button
          type="button"
          className="audio-start-banner"
          onClick={togglePlay}
          aria-label="Enable Devotional Temple Bells and Music"
        >
          <span className="bell-icon" aria-hidden="true">🔔</span>
          <span>Enable Devotional Temple Bells</span>
        </button>
      )}

      <div className="audio-dock">
        {/* Instant chime trigger button */}
        <button
          type="button"
          className="audio-chime-btn"
          onClick={ringSingleBell}
          title="Ring Sacred Temple Bell (Chime)"
          aria-label="Ring Sacred Temple Bell"
        >
          🔔
        </button>

        {/* Ambient toggle */}
        <button
          type="button"
          className={`audio-toggle-btn ${isPlaying ? 'playing' : ''}`}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Mute devotional ambient audio' : 'Play devotional ambient audio'}
          title={isPlaying ? 'Mute ambient bells' : 'Play ambient bells'}
        >
          <span className="audio-icon" aria-hidden="true">{isPlaying ? '🔊' : '🔈'}</span>
          <span className="audio-label">{isPlaying ? 'Sanctum Audio' : 'Audio Off'}</span>
        </button>

        {isPlaying && (
          <div className="volume-slider-wrap">
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="volume-slider"
              aria-label="Adjust temple sound volume"
              title={`Volume: ${Math.round(volume * 100)}%`}
            />
          </div>
        )}
      </div>
    </div>
  )
}
