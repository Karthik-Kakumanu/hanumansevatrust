import { useState, useRef, useEffect } from 'react'

export default function AudioController() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const [volume, setVolume] = useState(0.4)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // CC-BY-SA 3.0 verified authentic Zenkō-ji temple bell recording
    const audio = new Audio('/audio/temple-bell.mp3')
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio

    return () => {
      audio.pause()
      audio.src = ''
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
        setHasStarted(true)
      }).catch((e) => {
        console.warn('Audio playback error / gesture required:', e)
      })
    }
  }

  return (
    <div className="audio-controller-container">
      {!hasStarted && (
        <button
          type="button"
          className="audio-start-banner"
          onClick={togglePlay}
          aria-label="Begin Devotional Sound Experience"
        >
          <span className="bell-icon">🔔</span>
          <span>Enable Devotional Temple Bells</span>
        </button>
      )}

      <div className="audio-dock">
        <button
          type="button"
          className={`audio-toggle-btn ${isPlaying ? 'playing' : ''}`}
          onClick={togglePlay}
          aria-label={isPlaying ? 'Mute devotional audio' : 'Play devotional audio'}
          title={isPlaying ? 'Mute temple bells' : 'Play temple bells'}
        >
          <span className="audio-icon">{isPlaying ? '🔔' : '🔕'}</span>
          <span className="audio-label">{isPlaying ? 'Temple Audio On' : 'Sound Off'}</span>
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
            />
          </div>
        )}
      </div>
    </div>
  )
}
