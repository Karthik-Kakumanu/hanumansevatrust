import { useEffect, useRef } from 'react'
import type { MouseEvent } from 'react'
import SevaIdentity from './SevaIdentity'
import TranslatedContent from '../TranslatedContent'

const activities = [
  ['Annadaan', 'Free food distribution with dignity and warmth.', '/uploads/gallery/1775715457491-WhatsApp_Image_2026-04-09_at_00.37.51.webp'],
  ['Goshala Seva', 'Cow protection and compassionate care.', '/uploads/gallery/1775715398133-WhatsApp_Image_2026-04-09_at_00.37.52__2_.webp'],
  ['Bhajan & Harikatha', 'Devotional singing, music and spiritual discourse.', '/uploads/gallery/1775715427232-WhatsApp_Image_2026-04-09_at_00.37.52.webp'],
  ['Rathayatra', 'Sacred processions that gather the community.', '/uploads/gallery/1775715354729-WhatsApp_Image_2026-04-09_at_00.37.51.webp'],
  ['Scripture Distribution', 'Gita, Ramayana, Hanuman Chalisa and more.', '/uploads/gallery/1775715404947-WhatsApp_Image_2026-04-09_at_00.37.50__2_.webp'],
  ['Satsang', 'Spiritual gatherings and Parayanam programs.', '/uploads/gallery/1775715346201-WhatsApp_Image_2026-04-09_at_00.37.51__3_.webp']
]
const gallery = [
  { src: '/uploads/gallery/1775715346201-WhatsApp_Image_2026-04-09_at_00.37.51__3_.webp', category: 'Satsang' },
  { src: '/uploads/gallery/1775715354729-WhatsApp_Image_2026-04-09_at_00.37.51.webp', category: 'Rathayatra' },
  { src: '/uploads/gallery/1775715427232-WhatsApp_Image_2026-04-09_at_00.37.52.webp', category: 'Bhajans & Kirtans' }
]
const darshanImages = [
  {
    src: '/images/hanuman/hanuman-3d-blessing.png',
    alt: 'AI devotional artwork of Lord Hanuman offering a blessing'
  },
  {
    src: '/images/hanuman/hanuman-3d-prayer.png',
    alt: 'AI devotional artwork of Lord Hanuman in prayer'
  },
  {
    src: '/images/hanuman/hanuman-3d-sanjeevani.png',
    alt: 'AI devotional artwork of Lord Hanuman carrying the Sanjeevani mountain'
  }
]
const jump = (path: string) => (event: MouseEvent<HTMLAnchorElement>) => { event.preventDefault(); window.history.pushState({}, '', path); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo({ top: 0, behavior: 'smooth' }) }

export default function PremiumHome() {
  const homeRef = useRef<HTMLDivElement>(null)
  const heroVideoRef = useRef<HTMLVideoElement>(null)
  const darshanRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return

    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPlayback = () => {
      if (motionPreference.matches) {
        video.pause()
        return
      }

      void video.play().catch((error: unknown) => {
        if (error instanceof DOMException && (error.name === 'NotAllowedError' || error.name === 'AbortError')) return
        console.error('Hero background video playback failed.', error)
      })
    }

    syncPlayback()
    motionPreference.addEventListener('change', syncPlayback)
    return () => {
      motionPreference.removeEventListener('change', syncPlayback)
      video.pause()
    }
  }, [])

  useEffect(() => {
    const home = homeRef.current
    if (!home || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = home.querySelectorAll<HTMLElement>('[data-reveal]')
    home.classList.add('has-scroll-reveal')
    let observer: IntersectionObserver | undefined

    const reveal = (target: Element) => {
      target.classList.add('is-visible')
      observer?.unobserve(target)
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) reveal(entry.target)
        })
      }, { rootMargin: '0px 0px -7% 0px', threshold: 0.12 })

      targets.forEach(target => observer?.observe(target))
    }

    const revealInViewport = () => {
      targets.forEach(target => {
        const bounds = target.getBoundingClientRect()
        if (bounds.top < window.innerHeight * .93 && bounds.bottom > 0) reveal(target)
      })
    }

    window.addEventListener('scroll', revealInViewport, { passive: true })
    window.addEventListener('resize', revealInViewport)
    revealInViewport()

    return () => {
      observer?.disconnect()
      window.removeEventListener('scroll', revealInViewport)
      window.removeEventListener('resize', revealInViewport)
      home.classList.remove('has-scroll-reveal')
    }
  }, [])

  useEffect(() => {
    const carousel = darshanRef.current
    if (!carousel) return

    const viewport = window.matchMedia('(max-width: 600px)')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let interval: number | undefined
    let resumeTimer: number | undefined

    const stop = () => {
      if (interval !== undefined) window.clearInterval(interval)
      interval = undefined
    }

    const start = () => {
      stop()
      if (!viewport.matches || reducedMotion.matches || document.hidden) return
      interval = window.setInterval(() => {
        const cards = Array.from(carousel.querySelectorAll<HTMLElement>('.premium-darshan__image'))
        if (cards.length < 2) return
        const viewportLeft = carousel.getBoundingClientRect().left
        const currentIndex = cards.reduce((closestIndex, card, index) => {
          const closestDistance = Math.abs(cards[closestIndex].getBoundingClientRect().left - viewportLeft)
          const distance = Math.abs(card.getBoundingClientRect().left - viewportLeft)
          return distance < closestDistance ? index : closestIndex
        }, 0)
        const nextCard = cards[(currentIndex + 1) % cards.length]
        const offset = nextCard.getBoundingClientRect().left - viewportLeft
        carousel.scrollTo({
          left: currentIndex === cards.length - 1 ? 0 : carousel.scrollLeft + offset,
          behavior: 'smooth'
        })
      }, 4500)
    }

    const pauseBriefly = () => {
      stop()
      if (resumeTimer !== undefined) window.clearTimeout(resumeTimer)
      resumeTimer = window.setTimeout(start, 8000)
    }
    const onVisibilityChange = () => document.hidden ? stop() : start()
    const onPreferencesChange = () => start()

    carousel.addEventListener('pointerenter', stop)
    carousel.addEventListener('pointerleave', start)
    carousel.addEventListener('focusin', stop)
    carousel.addEventListener('focusout', start)
    carousel.addEventListener('pointerdown', pauseBriefly)
    carousel.addEventListener('touchstart', pauseBriefly, { passive: true })
    carousel.addEventListener('wheel', pauseBriefly, { passive: true })
    window.addEventListener('resize', start)
    document.addEventListener('visibilitychange', onVisibilityChange)
    viewport.addEventListener('change', onPreferencesChange)
    reducedMotion.addEventListener('change', onPreferencesChange)
    start()

    return () => {
      stop()
      if (resumeTimer !== undefined) window.clearTimeout(resumeTimer)
      carousel.removeEventListener('pointerenter', stop)
      carousel.removeEventListener('pointerleave', start)
      carousel.removeEventListener('focusin', stop)
      carousel.removeEventListener('focusout', start)
      carousel.removeEventListener('pointerdown', pauseBriefly)
      carousel.removeEventListener('touchstart', pauseBriefly)
      carousel.removeEventListener('wheel', pauseBriefly)
      window.removeEventListener('resize', start)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      viewport.removeEventListener('change', onPreferencesChange)
      reducedMotion.removeEventListener('change', onPreferencesChange)
    }
  }, [])

  return <TranslatedContent><div ref={homeRef} className="premium-home">
    <section className="premium-hero">
      <div className="premium-hero__backdrop" />
      <video ref={heroVideoRef} className="premium-hero__video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
        <source src="/WhatsApp%20Video%202026-10-15%20at%2012.05.46%20PM.mp4" type="video/mp4" />
      </video>
      <div className="premium-hero__veil" />
      <div className="premium-wrap premium-hero__content">
        <div className="premium-actions"><a className="button" href="/donation" onClick={jump('/donation')}>Donate Now <span>↗</span></a><a className="premium-outline-button" href="#seva">Discover Our Seva <span>↓</span></a></div>
      </div>
    </section>

    <section className="premium-credibility" aria-label="Trust registration highlights"><div className="premium-wrap premium-credibility__grid"><div><strong>Established</strong><span>2023</span></div><div><strong>NGO ID</strong><span>TG/00048783</span></div><div><strong>Registered trust</strong><span>Jai Hanuman Seva Trust</span></div><div><strong>Based in</strong><span>Kalluru, Telangana</span></div></div></section>

    <section className="premium-meaning premium-section"><div className="premium-wrap premium-meaning__inner" data-reveal><SevaIdentity context="home"/></div></section>

    <section className="premium-darshan" aria-label="Hanuman devotional imagery"><div ref={darshanRef} className="premium-wrap premium-darshan__grid">{darshanImages.map(image => <figure className="premium-darshan__image" data-reveal key={image.src}><img src={image.src} alt={image.alt} loading="lazy" /></figure>)}</div></section>

    <section className="premium-about premium-section"><div className="premium-wrap premium-about__inner"><div className="premium-copy" data-reveal><h2>Where devotion<br/><i>becomes seva.</i></h2><p>Established in 2023, Jai Hanuman Seva Trust is a registered charitable organisation based in Kalluru, Telangana. Inspired by Lord Hanuman's courage, humility and unwavering service to Sri Rama, the trust works at the meeting point of spiritual life and human need.</p><a className="premium-text-link" href="/about" onClick={jump('/about')}>Read our story <span>↗</span></a></div><div className="premium-mini-columns" data-reveal><div><b>Mission</b><span>Serve with compassion through Annadaan, spiritual education and care.</span></div><div><b>Vision</b><span>Let dharma flourish through responsible action and shared learning.</span></div></div></div></section>

    <section className="premium-service premium-section"><div className="premium-wrap premium-service__inner"><div className="premium-service__copy" data-reveal><h2>Many forms.<br/><i>One spirit.</i></h2><p>From a warm meal to a shared chant, every activity is an invitation to serve with presence, humility and love.</p><a className="premium-text-link" href="/seva" onClick={jump('/seva')}>Explore all seva <span>↗</span></a></div><figure className="premium-service__images" data-reveal><img className="premium-service__image-main" src="/uploads/gallery/1775715457491-WhatsApp_Image_2026-04-09_at_00.37.51.webp" alt="Annadaan service activity"/><img className="premium-service__image-small" src="/uploads/gallery/1775715427232-WhatsApp_Image_2026-04-09_at_00.37.52.webp" alt="Devotional gathering"/><figcaption>Annadaan in action — serving with dignity, warmth and devotion.</figcaption></figure></div></section>

    <section className="premium-pillars premium-section" id="seva"><div className="premium-wrap"><div className="premium-section-heading" data-reveal><div><h2>Every act is<br/><i>an offering.</i></h2></div><p>Distinct paths, one devotional purpose.</p></div><div className="premium-pillar-grid">{activities.map(([title, text, image], index) => <article className={`premium-pillar premium-pillar--${index + 1}`} data-reveal key={title}><div><img src={image} alt={title} loading="lazy" /></div><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="premium-donation-help premium-section"><div className="premium-wrap"><div className="premium-section-heading" data-reveal><div><h2>Small gifts.<br/><i>Real strength.</i></h2></div><p>Your support becomes practical seva for people and communities.</p></div><div className="premium-donation-help__grid"><article data-reveal><strong>01</strong><h3>Meals</h3><p>Help provide warm Annadaan with dignity and care.</p></article><article data-reveal><strong>02</strong><h3>Books</h3><p>Help place the wisdom of scripture in waiting hands.</p></article><article data-reveal><strong>03</strong><h3>Seva</h3><p>Help sustain spiritual programmes and community care.</p></article></div></div></section>

    <section className="premium-dharma premium-section"><div className="premium-wrap premium-dharma__inner"><div className="premium-dharma__photo" data-reveal><img src="/images/hanuman/hanuman-sanjeevani.png" alt="Original devotional artwork of Hanuman carrying the Sanjeevani mountain" /></div><div className="premium-dharma__copy" data-reveal><h2>Keeping the<br/><i>flame alive.</i></h2><p>Bhajans and music. Traditional dance. Yoga centres. Ramayana and Mahabharata Parayanam. We create spaces where devotion can be practised and shared.</p><ul><li>Bhajans & music</li><li>Traditional dance</li><li>Yoga centres</li><li>Ramayana & Mahabharata Parayanam</li></ul></div></div></section>

    <section className="premium-gallery premium-section"><div className="premium-wrap"><div className="premium-section-heading" data-reveal><div><h2>Seva, seen<br/><i>in the world.</i></h2></div><a className="premium-text-link" href="/gallery" onClick={jump('/gallery')}>View gallery <span>↗</span></a></div><div className="premium-gallery-grid">{gallery.map((image, index) => <a href="/gallery" onClick={jump('/gallery')} key={image.src} className={`premium-gallery-item premium-gallery-item--${index + 1}`} data-reveal><img src={image.src} alt={`Trust-provided activity photographs associated with ${image.category}`} loading="lazy" /></a>)}</div></div></section>

    <section className="premium-events premium-section"><div className="premium-wrap premium-events__inner" data-reveal><div><h2>New gatherings<br/><i>will be announced soon.</i></h2></div><div><p>Stay connected with Jai Hanuman Seva Trust for future Annadaan programmes, bhajans, rathayatras and spiritual gatherings.</p><a className="premium-text-link" href="/events" onClick={jump('/events')}>Visit events <span>↗</span></a></div></div></section>

    <section className="premium-annadaan premium-section"><div className="premium-annadaan__image"/><div className="premium-wrap premium-annadaan__inner" data-reveal><h2>Annadaanam<br/><i>is among the greatest gifts.</i></h2><p>Let your support become nourishment, dignity and strength for another person.</p><a className="button" href="/donation" onClick={jump('/donation')}>Give with devotion <span>↗</span></a></div></section>

    <section className="premium-final premium-section"><div className="premium-wrap premium-final__inner" data-reveal><h2>Let devotion<br/><i>become action.</i></h2><h3>Join us in seva.</h3><p>Learn about the trust, support its different seva efforts or reach out for collaboration.</p><div className="premium-actions"><a className="button" href="/donation" onClick={jump('/donation')}>Support the Trust <span>↗</span></a><a className="premium-outline-button" href="/contact" onClick={jump('/contact')}>Contact the trust <span>↗</span></a><a className="premium-whatsapp" href="https://wa.me/917095999915?text=Namaste%20Jai%20Hanuman%20Seva%20Trust" target="_blank" rel="noopener noreferrer">WhatsApp us <span>↗</span></a></div></div></section>
  </div></TranslatedContent>
}
