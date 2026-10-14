import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { LordHanumanFigure } from './ImmersiveWorld'

export default function CinematicLoader({
  onComplete,
  forceSkip = false
}: {
  onComplete: () => void
  forceSkip?: boolean
}) {
  const [progress, setProgress] = useState(12)
  const [phase, setPhase] = useState('PREPARING THE SANCTUM')
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (forceSkip) {
      onComplete()
      return
    }

    const timer1 = setTimeout(() => {
      setProgress(45)
      setPhase('LIGHTING THE TEMPLE DIYAS')
    }, 450)

    const timer2 = setTimeout(() => {
      setProgress(78)
      setPhase('INVOKING SACRED MANTRAS')
    }, 950)

    const timer3 = setTimeout(() => {
      setProgress(100)
      setPhase('ENTERING LORD HANUMAN’S SANCTUM')
    }, 1450)

    const timer4 = setTimeout(() => {
      setFadeOut(true)
    }, 1800)

    const timer5 = setTimeout(() => {
      onComplete()
    }, 2250)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
      clearTimeout(timer5)
    }
  }, [forceSkip, onComplete])

  return (
    <div className={`cinematic-loader ${fadeOut ? 'fade-out' : ''}`} role="dialog" aria-modal="true" aria-label="Preparing the Sanctum">
      <div className="loader-backdrop" />
      <div className="loader-mandala" />

      {/* 3D Gada / Mini Sanctum Preview in Loader */}
      <div className="loader-3d-preview" aria-hidden="true">
        <Canvas camera={{ position: [0, 1.8, 4.2], fov: 38 }} gl={{ alpha: true }}>
          <ambientLight intensity={0.6} color="#ffe2b0" />
          <pointLight position={[2, 3, 2]} intensity={4} color="#f5c542" />
          <LordHanumanFigure position={[0, -0.6, 0]} scale={0.72} chapter="sanctum" />
        </Canvas>
      </div>

      <div className="loader-content">
        <div className="loader-om">ॐ</div>
        <p className="loader-brand">JAI HANUMAN SEVA TRUST</p>
        <h2 className="loader-title">{phase}</h2>
        <p className="loader-quote">“May devotion guide every act of service.”</p>

        {/* Real progress bar */}
        <div className="loader-bar-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="loader-bar-fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="loader-progress-text">{progress}%</div>

        <button
          type="button"
          className="loader-skip"
          onClick={() => {
            setFadeOut(true)
            setTimeout(onComplete, 350)
          }}
        >
          Skip Intro →
        </button>
      </div>
    </div>
  )
}

