import { useEffect, useState } from 'react'
import App from './App'
import LoadingMarquee from './components/LoadingMarquee'
import MantraMarquee from './components/MantraMarquee'
import { LanguageProvider } from './LanguageContext'
import HeroBellController from './components/HeroBellController'
import HanumanSideDecor from './components/HanumanSideDecor'

export default function ApplicationRoot() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancelled = false
    const criticalAssets = ['/images/logo.png', '/images/logo-mark.png', '/images/loading/hanuman-sanjeevani.png']
    const loadImage = (src: string) => new Promise<void>((resolve) => {
      const image = new Image()
      image.onload = () => resolve()
      image.onerror = () => resolve()
      image.src = src
    })
    const boot = async () => {
      await Promise.allSettled(criticalAssets.map(loadImage))
      if (document.fonts?.ready) await document.fonts.ready
      if (!cancelled) setReady(true)
    }
    void boot()
    return () => { cancelled = true }
  }, [])

  return <LanguageProvider><LoadingMarquee ready={ready} /><MantraMarquee /><App /><HeroBellController /><HanumanSideDecor /></LanguageProvider>
}
