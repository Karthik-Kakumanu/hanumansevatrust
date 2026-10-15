import { useEffect, useState } from 'react'

const SIDE_ASSET = '/images/hanuman/hanuman-sanjeevani.png'

export default function HanumanSideDecor() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const update = () => setPath(window.location.pathname)
    window.addEventListener('popstate', update)
    return () => window.removeEventListener('popstate', update)
  }, [])

  if (path === '/gallery' || path === '/donation') return null
  return <div className="hanuman-side-decor" aria-hidden="true">
    <img className="hanuman-side-decor__image hanuman-side-decor__image--left" src={SIDE_ASSET} alt="" />
    <img className="hanuman-side-decor__image hanuman-side-decor__image--right" src={SIDE_ASSET} alt="" />
  </div>
}
