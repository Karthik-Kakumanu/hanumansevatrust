import { useEffect, useState } from 'react'
import TranslatedContent from '../TranslatedContent'

type LoadingMarqueeProps = { ready: boolean }
const MINIMUM_DISPLAY_MS = 1800
const HANUMAN_ASSET = '/images/loading/hanuman-sanjeevani.png'

export default function LoadingMarquee({ ready }: LoadingMarqueeProps) {
  const [assetReady, setAssetReady] = useState(false)
  const [assetFailed, setAssetFailed] = useState(false)
  const [minimumTimePassed, setMinimumTimePassed] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [flightProgress, setFlightProgress] = useState(8)
  const complete = ready && minimumTimePassed && (assetReady || assetFailed)

  useEffect(() => {
    const timer = window.setTimeout(() => setMinimumTimePassed(true), MINIMUM_DISPLAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (complete) {
      setFlightProgress(90)
      return
    }
    let frame = 0
    const startedAt = performance.now()
    const move = (now: number) => {
      const elapsed = now - startedAt
      setFlightProgress((current) => current < 86 ? Math.min(86, 8 + elapsed / 24) : current)
      frame = window.requestAnimationFrame(move)
    }
    frame = window.requestAnimationFrame(move)
    return () => window.cancelAnimationFrame(frame)
  }, [complete])

  useEffect(() => {
    if (!complete) return
    const timer = window.setTimeout(() => setDismissed(true), 650)
    return () => window.clearTimeout(timer)
  }, [complete])

  if (dismissed) return null
  return <TranslatedContent><div className={`loading-marquee ${complete ? 'is-complete' : ''}`} aria-live="polite" aria-busy={!complete}>
    <div className="loading-marquee__wash" aria-hidden="true" />
    <div className="loading-marquee__content">
      <div className={`loading-marquee__flight ${assetReady ? '' : 'is-pending'}`} style={{ '--flight-progress': `${complete ? 90 : flightProgress}%` } as React.CSSProperties}>
        <img src={HANUMAN_ASSET} alt="Lord Hanuman carrying the Sanjeevani mountain" onLoad={() => setAssetReady(true)} onError={() => setAssetFailed(true)} />
      </div>
    </div>
  </div></TranslatedContent>
}
