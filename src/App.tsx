import { useState, useEffect, useRef } from 'react'
import './App.css'
import CinematicLoader from './components/CinematicLoader'
import AudioController from './components/AudioController'
import ImmersiveWorld from './components/ImmersiveWorld'
import { CHAPTER_TRAJECTORY } from './data/chapterData'
import { AboutPage, SevaPage, GalleryPage, EventsPage, DonationPage, ContactPage } from './components/PageViews'
import { galleryItems, galleryCategories } from './data/galleryData'
import { tData } from './data/translations'

const navLinks = [
  { key: 'home', labelEn: 'Home', labelTe: 'హోమ్', path: '/' },
  { key: 'about', labelEn: 'About', labelTe: 'మా గురించి', path: '/about' },
  { key: 'seva', labelEn: 'Seva & Activities', labelTe: 'సేవా కార్యక్రమాలు', path: '/seva' },
  { key: 'gallery', labelEn: 'Gallery', labelTe: 'గ్యాలరీ', path: '/gallery' },
  { key: 'events', labelEn: 'Events', labelTe: 'కార్యక్రమాలు', path: '/events' },
  { key: 'donation', labelEn: 'Donate', labelTe: 'విరాళం', path: '/donation' },
  { key: 'contact', labelEn: 'Contact', labelTe: 'సంప్రదించండి', path: '/contact' }
]

function Arrow() {
  return <span className="arrow-icon" aria-hidden="true">→</span>
}

function CopyBtn({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      className="btn-copy-chip"
      onClick={() => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(value)
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        }
      }}
      title={`Copy ${value}`}
    >
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  )
}

export default function App() {
  const [lang, setLang] = useState<'en' | 'te'>('en')
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loadingComplete, setLoadingComplete] = useState(false)
  const [activeChapter, setActiveChapter] = useState(0)
  const [scrollPercent, setScrollPercent] = useState(4)
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)
  const [galleryFilter, setGalleryFilter] = useState('All Photos')

  // Donation form state for Chapter 11
  const [donationAmount, setDonationAmount] = useState('501')
  const [donationSubmitting, setDonationSubmitting] = useState(false)
  const [donationStatus, setDonationStatus] = useState('')

  const scrollProgressRef = useRef(0)
  const t = tData[lang]

  // Track real scroll position for continuous 3D camera trajectory
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0
      const clamped = Math.min(Math.max(progress, 0), 1)
      scrollProgressRef.current = clamped
      setScrollPercent(Math.min(Math.max(clamped * 100, 4), 100))

      // Determine active chapter milestone for Igloo-style HUD
      let currentIdx = 0
      for (let i = 0; i < CHAPTER_TRAJECTORY.length; i++) {
        if (clamped >= CHAPTER_TRAJECTORY[i].scrollFrac - 0.04) {
          currentIdx = i
        }
      }
      setActiveChapter(currentIdx)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  // Subpage route listener
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
      window.scrollTo(0, 0)
    }

    const handleLinkClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href]')
      if (!link) return
      const href = link.getAttribute('href')
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !href.startsWith('/uploads') &&
        !href.startsWith('/images') &&
        !href.startsWith('/audio')
      ) {
        e.preventDefault()
        window.history.pushState(null, '', href)
        setCurrentPath(href)
        setMenuOpen(false)
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }

    window.addEventListener('popstate', handlePopState)
    document.addEventListener('click', handleLinkClick)
    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleLinkClick)
    }
  }, [])

  const navigate = (path: string) => {
    window.history.pushState(null, '', path)
    setCurrentPath(path)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleDonationSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setDonationSubmitting(true)
    setDonationStatus('')
    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData.entries())

    try {
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (data.ok) {
        setDonationStatus('Offering record accepted. An official receipt will be processed upon bank verification.')
      } else {
        setDonationStatus(data.error || 'Thank you for your generous pledge. Please complete the transfer via UPI QR or Bank accounts below.')
      }
    } catch {
      setDonationStatus('Your donation pledge has been recorded. Please complete payment via the verified UPI QR or Bank accounts below.')
    } finally {
      setDonationSubmitting(false)
    }
  }

  const filteredGallery =
    galleryFilter === 'All Photos'
      ? galleryItems
      : galleryItems.filter((item) => item.category === galleryFilter)

  return (
    <div className={`app-root-container ${lang === 'te' ? 'font-telugu-active' : ''}`}>
      {/* 1. CINEMATIC LOADER */}
      {!loadingComplete && <CinematicLoader onComplete={() => setLoadingComplete(true)} />}

      {/* 2. PERSISTENT FULL-SCREEN LIVING 3D TEMPLE WORLD (IGLOO.INC STYLE) */}
      <ImmersiveWorld scrollProgress={scrollProgressRef} />

      {/* 3. DEVOTIONAL AUDIO CONTROLLER */}
      <AudioController />

      {/* 4. SACRED MANTRA TOP MARQUEE */}
      <div className="top-mantra-bar" role="region" aria-label="Sacred Mantra">
        <div className="mantra-track">
          <span>{t.mantra}</span>
          <span aria-hidden="true">{t.mantra}</span>
        </div>
      </div>

      {/* 5. BRIGHT & REGAL TEMPLE HEADER */}
      <header className="bright-temple-header">
        <div className="wrap header-inner">
          <a
            className="brand-logo-lockup"
            href="/"
            onClick={(e) => {
              e.preventDefault()
              navigate('/')
            }}
          >
            <span className="logo-ring">
              <img src="/images/logo.png" alt="Trust Logo" className="logo-img" />
            </span>
            <div className="brand-text">
              <span className="brand-om">ॐ</span>
              <span className="brand-name">
                Jai Hanuman <em className="brand-serif">Seva Trust</em>
              </span>
            </div>
          </a>

          <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main Navigation">
            {navLinks.map(({ key, labelEn, labelTe, path }) => (
              <a
                key={key}
                href={path}
                className={`nav-link ${currentPath === path ? 'active-link' : ''}`}
                onClick={(e) => {
                  e.preventDefault()
                  navigate(path)
                }}
              >
                {lang === 'en' ? labelEn : labelTe}
              </a>
            ))}
            <a
              href="/donation"
              className="btn-nav-donate"
              onClick={(e) => {
                e.preventDefault()
                navigate('/donation')
              }}
            >
              {t.hero.donateCta}
            </a>
          </nav>

          <div className="header-actions">
            <div className="lang-switcher" role="group" aria-label="Language Selector">
              <button
                type="button"
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
              <button
                type="button"
                className={`lang-btn ${lang === 'te' ? 'active' : ''}`}
                onClick={() => setLang('te')}
              >
                తెలుగు
              </button>
              <button
                type="button"
                className="header-bell-btn"
                onClick={() => window.dispatchEvent(new CustomEvent('ring-temple-bell'))}
                title="Ring Sacred Temple Bell"
                aria-label="Ring Temple Bell"
              >
                🔔
              </button>
            </div>

            <button
              type="button"
              className="mobile-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={menuOpen}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* 6. IGLOO-STYLE PERSISTENT CHAPTER HUD (ACTIVE ON HOMEPAGE) */}
      {currentPath === '/' && (
        <aside className="chapter-hud" aria-label="Temple Journey Progress">
          <div className="chapter-hud-track">
            <div
              className="chapter-hud-bar"
              style={{
                height: `${scrollPercent}%`
              }}
            />
          </div>
          <div className="chapter-hud-info">
            <span className="chapter-hud-num">
              {String(activeChapter + 1).padStart(2, '0')} / 12
            </span>
            <span className="chapter-hud-title">
              {CHAPTER_TRAJECTORY[activeChapter]?.title || 'Sanctum'}
            </span>
          </div>
        </aside>
      )}

      {/* 7. ROUTE VIEW DISPATCHER */}
      <main id="main-content">
        {currentPath === '/' && (
          /* =================================================================
             CONTINUOUS 12-CHAPTER SCROLL JOURNEY (IGLOO.INC STYLE)
             ================================================================= */
          <div className="chapter-scroll-container">
            {/* CHAPTER 01 — THE AWAKENING */}
            <section id="chapter-01" className="chapter-section align-center">
              <div className="wrap">
                <div className="glass-temple-card wide-card text-center" style={{ margin: '0 auto' }}>
                  <span className="sacred-eyebrow-bright">॥ ॐ श्री हनुमते नमः ॥</span>
                  <h1 className="home-hero-headline" style={{ fontSize: 'clamp(36px, 5vw, 68px)' }}>
                    An Immersive Digital Temple <br />
                    <span className="serif-highlight">Strength in Devotion. Compassion in Seva.</span>
                  </h1>
                  <p className="home-hero-subline" style={{ maxWidth: '680px', margin: '0 auto 28px' }}>
                    Welcome to the living digital sanctuary of Jai Hanuman Seva Trust. As you scroll, journey through connected temple courtyards where prayer manifests into daily Annadaan, cow protection, and Sanatana Dharma prachar.
                  </p>
                  <div className="home-hero-cta-row" style={{ justifyContent: 'center' }}>
                    <a
                      href="/donation"
                      className="btn-primary-bright"
                      onClick={(e) => {
                        e.preventDefault()
                        navigate('/donation')
                      }}
                    >
                      {t.hero.donateCta} <Arrow />
                    </a>
                    <a
                      href="#chapter-02"
                      className="btn-secondary-bright"
                      onClick={(e) => {
                        e.preventDefault()
                        document.getElementById('chapter-02')?.scrollIntoView({ behavior: 'smooth' })
                      }}
                    >
                      Begin Temple Journey ↓
                    </a>
                  </div>
                  <div className="hero-scroll-pill">
                    <span>Scroll to Enter the Temple</span>
                    <span>↓</span>
                  </div>
                </div>
              </div>
            </section>

            {/* CHAPTER 02 — THE TEMPLE ENTRANCE */}
            <section id="chapter-02" className="chapter-section align-left">
              <div className="wrap">
                <div className="glass-temple-card">
                  <span className="sacred-eyebrow-bright">Chapter 02 · Sacred Gateway</span>
                  <h2 className="section-title-dark" style={{ fontSize: '38px', marginBottom: '16px' }}>
                    Through the Monumental Torana
                  </h2>
                  <p className="body-paragraph">
                    Carved in ancient sandstone and illuminated by morning sunbeams, the temple gateway welcomes pilgrims from every walk of life. Here, the holy name of Sri Rama echoes through brass bells, reminding us that selfless service to humanity is the truest worship of the Divine.
                  </p>
                  <p className="body-paragraph" style={{ fontStyle: 'italic', color: 'var(--saffron)' }}>
                    “Where devotion resides, courage never falters; where seva is performed, blessings overflow.”
                  </p>
                </div>
              </div>
            </section>

            {/* CHAPTER 03 — LORD HANUMAN REVEALED */}
            <section id="chapter-03" className="chapter-section align-right">
              <div className="wrap" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div className="glass-temple-card">
                  <span className="sacred-eyebrow-bright">Chapter 03 · Divine Darshan</span>
                  <h2 className="section-title-dark" style={{ fontSize: '40px', marginBottom: '16px' }}>
                    Lord Hanuman Revealed <br />
                    <span className="serif-highlight">In Abhaya Mudra</span>
                  </h2>
                  <p className="body-paragraph">
                    Standing atop the sacred multi-tiered lotus pedestal (*Padma Peetha*), Lord Hanuman raises His right hand in the Abhaya Mudra, dispelling all fears and granting unshakeable spiritual strength. In His left hand rests the golden *Kaumodaki* Gada, radiating victorious dharma.
                  </p>
                  <div className="dharma-showcase-right" style={{ marginTop: '20px' }}>
                    <div className="dharma-pill-item">
                      <span className="dpi-num">01</span>
                      <span className="dpi-text">Kirita Mukuta Crown of Gopuram Spires</span>
                    </div>
                    <div className="dharma-pill-item">
                      <span className="dpi-num">02</span>
                      <span className="dpi-text">Sacred Sindoor Urdhva Pundra Tilak</span>
                    </div>
                    <div className="dharma-pill-item">
                      <span className="dpi-num">03</span>
                      <span className="dpi-text">Yajnopavita & Golden Kaumodaki Gada</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CHAPTER 04 — THE MISSION */}
            <section id="chapter-04" className="chapter-section align-left">
              <div className="wrap">
                <div className="glass-temple-card">
                  <span className="sacred-eyebrow-bright">Chapter 04 · Our Core Purpose</span>
                  <h2 className="section-title-dark" style={{ fontSize: '38px', marginBottom: '14px' }}>
                    Where Devotion <br />
                    <span className="serif-highlight">Becomes Seva.</span>
                  </h2>
                  <p className="body-paragraph" style={{ fontWeight: 600, color: 'var(--saffron)' }}>
                    “Strength in devotion. Compassion in every act of service.”
                  </p>
                  <p className="body-paragraph">
                    Founded in 2023 with the sacred inspiration of Lord Hanuman, Jai Hanuman Seva Trust is a government-registered charitable organization dedicated to eradicating hunger, honoring the sacred cow, and revitalizing Sanatana cultural heritage through direct grassroots action.
                  </p>
                  <div className="summary-actions" style={{ marginTop: '24px' }}>
                    <a
                      href="/about"
                      className="btn-secondary-bright"
                      onClick={(e) => {
                        e.preventDefault()
                        navigate('/about')
                      }}
                    >
                      Read Complete Trust Story <Arrow />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* CHAPTER 05 — IMPACT THROUGH SERVICE */}
            <section id="chapter-05" className="chapter-section align-center">
              <div className="wrap">
                <div className="glass-temple-card wide-card text-center" style={{ margin: '0 auto' }}>
                  <span className="sacred-eyebrow-bright">Chapter 05 · Published Milestones</span>
                  <h2 className="section-title-dark" style={{ fontSize: '38px', marginBottom: '32px' }}>
                    Impact Grounded in Pure Action
                  </h2>
                  <div className="home-stats-grid" style={{ marginBottom: '24px' }}>
                    {t.stats.map((s, idx) => (
                      <div key={idx} className="home-stat-tile" style={{ borderRadius: '16px' }}>
                        <span className="home-stat-number">{s.num}</span>
                        <span className="home-stat-label">{s.label}</span>
                      </div>
                    ))}
                  </div>
                  <p className="footer-legal-micro" style={{ color: 'var(--body-muted)' }}>
                    Figures reported as published by Jai Hanuman Seva Trust charitable operations across Telangana and Andhra Pradesh.
                  </p>
                </div>
              </div>
            </section>

            {/* CHAPTER 06 — THE SEVA COURTYARD */}
            <section id="chapter-06" className="chapter-section align-center">
              <div className="wrap">
                <div className="glass-temple-card wide-card text-center" style={{ margin: '0 auto' }}>
                  <span className="sacred-eyebrow-bright">Chapter 06 · Six Pillars of Service</span>
                  <h2 className="section-title-dark" style={{ fontSize: '38px', marginBottom: '12px' }}>
                    Devotion in Every Deed
                  </h2>
                  <p className="section-subtitle-dark" style={{ maxWidth: '640px', margin: '0 auto 36px' }}>
                    Our six foundational seva programs run daily, ensuring that devotion is directly experienced as compassionate care.
                  </p>
                  <div className="bright-pillars-grid">
                    {t.pillars.map((p) => (
                      <div key={p.id} className="bright-pillar-card" style={{ textAlign: 'left' }}>
                        <div className="b-pillar-num">{p.id}</div>
                        <h3 className="b-pillar-title">{p.title}</h3>
                        <p className="b-pillar-desc">{p.desc}</p>
                        <a
                          href="/seva"
                          className="b-pillar-action"
                          onClick={(e) => {
                            e.preventDefault()
                            navigate('/seva')
                          }}
                        >
                          Learn More <Arrow />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* CHAPTER 07 — THE ANNADAAN HALL */}
            <section id="chapter-07" className="chapter-section align-left">
              <div className="wrap">
                <div className="glass-temple-card">
                  <span className="sacred-eyebrow-bright">Chapter 07 · Food Offering</span>
                  <h2 className="annadaan-sanskrit-heading" style={{ fontSize: '36px', textAlign: 'left' }}>
                    अन्नदानं परं दानम्
                  </h2>
                  <p className="annadaan-sub-text" style={{ textAlign: 'left', margin: '0 0 20px' }}>
                    “Giving food is the highest form of charity, bringing satisfaction to the hungry and divine grace to the giver.”
                  </p>
                  <p className="body-paragraph">
                    Every day, our dedicated volunteer kitchens prepare and serve freshly cooked, nutritious, and sanctified meals to pilgrims, sadhus, destitute elders, and children outside hospitals and temple complexes.
                  </p>
                  <div style={{ marginTop: '26px' }}>
                    <a
                      href="/donation"
                      className="btn-primary-bright"
                      onClick={(e) => {
                        e.preventDefault()
                        navigate('/donation')
                      }}
                    >
                      Sponsor Daily Annadaan <Arrow />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* CHAPTER 08 — THE SACRED KNOWLEDGE CHAMBER */}
            <section id="chapter-08" className="chapter-section align-right">
              <div className="wrap" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <div className="glass-temple-card">
                  <span className="sacred-eyebrow-bright">Chapter 08 · Wisdom & Dharma</span>
                  <h2 className="section-title-dark" style={{ fontSize: '38px', marginBottom: '16px' }}>
                    The Knowledge Chamber
                  </h2>
                  <p className="body-paragraph">
                    Sanatana Dharma thrives when eternal wisdom is made accessible to all. Our volunteers conduct Bhagavad Gita distribution drives, teach Ramayana parayanam to youth, and organize free yoga and Sanskrit study circles.
                  </p>
                  <div className="sacred-places-tags" style={{ marginTop: '18px' }}>
                    <span className="sacred-tag">📍 Ayodhya</span>
                    <span className="sacred-tag">📍 Varanasi</span>
                    <span className="sacred-tag">📍 Gaya</span>
                    <span className="sacred-tag">📍 Prayagraj</span>
                    <span className="sacred-tag">📍 Puri Jagannath</span>
                  </div>
                </div>
              </div>
            </section>

            {/* CHAPTER 09 — THE FESTIVAL COURTYARD */}
            <section id="chapter-09" className="chapter-section align-left">
              <div className="wrap">
                <div className="glass-temple-card">
                  <span className="sacred-eyebrow-bright">Chapter 09 · Festivals & Rathayatra</span>
                  <h2 className="section-title-dark" style={{ fontSize: '38px', marginBottom: '16px' }}>
                    Celebrations of Faith
                  </h2>
                  <p className="body-paragraph">
                    From grand Hanuman Jayanti mahotsavams and Sri Rama Navami celebrations to devotional Rathayatra chariot processions through rural hamlets, our trust brings spiritual harmony, shared joy, and cultural bonding to thousands.
                  </p>
                  <div style={{ marginTop: '24px' }}>
                    <a
                      href="/events"
                      className="btn-secondary-bright"
                      onClick={(e) => {
                        e.preventDefault()
                        navigate('/events')
                      }}
                    >
                      View Upcoming Events <Arrow />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* CHAPTER 10 — THE GALLERY CORRIDOR */}
            <section id="chapter-10" className="chapter-section align-center">
              <div className="wrap">
                <div className="glass-temple-card wide-card text-center" style={{ margin: '0 auto' }}>
                  <span className="sacred-eyebrow-bright">Chapter 10 · Photographic Exhibition</span>
                  <h2 className="section-title-dark" style={{ fontSize: '38px', marginBottom: '12px' }}>
                    Devotion in Action
                  </h2>
                  <p className="section-subtitle-dark" style={{ maxWidth: '640px', margin: '0 auto 28px' }}>
                    Documentary glimpses into authentic on-ground seva drives conducted by Jai Hanuman Seva Trust.
                  </p>

                  {/* Filter chips */}
                  <div className="bright-filter-chips" style={{ marginBottom: '28px' }}>
                    {galleryCategories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        className={`bright-chip ${galleryFilter === cat ? 'active' : ''}`}
                        onClick={() => setGalleryFilter(cat)}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Photo Grid */}
                  <div className="bright-gallery-grid">
                    {filteredGallery.slice(0, 6).map((item, idx) => (
                      <div
                        key={idx}
                        className="bright-photo-card"
                        onClick={() => setLightboxImg(item.src)}
                        tabIndex={0}
                        role="button"
                        aria-label={`View photo: ${item.title}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') setLightboxImg(item.src)
                        }}
                      >
                        <div className="b-photo-frame">
                          <img src={item.src} alt={item.title} className="b-gallery-img" loading="lazy" />
                        </div>
                        <div className="b-photo-meta" style={{ textAlign: 'left' }}>
                          <span className="b-photo-cat">{item.category}</span>
                          <h3 className="b-photo-title">{item.title}</h3>
                          <p className="b-photo-cap">{item.caption}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* CHAPTER 11 — THE DONATION SANCTUM */}
            <section id="chapter-11" className="chapter-section align-center">
              <div className="wrap">
                <div className="glass-temple-card wide-card" style={{ margin: '0 auto' }}>
                  <div className="donation-dual-bright-grid">
                    {/* Official Banking & Verified QR */}
                    <div className="bright-card banking-bright-card">
                      <span className="sacred-eyebrow-bright">Chapter 11 · Sanctum of Giving</span>
                      <h2 className="bright-card-heading">Transparent Bank & UPI Offering</h2>
                      <p className="bright-card-desc">
                        Every rupee is directly deployed toward Annadaan, cow shelter feed, and scripture printing.
                      </p>

                      {/* Account 1 */}
                      <div className="bank-entry-box">
                        <h3 className="bank-org-name">Union Bank of India – Kalluru</h3>
                        <div className="bank-data-row">
                          <span>Account Number:</span>
                          <strong className="mono-val">080011010000095</strong>
                          <CopyBtn value="080011010000095" />
                        </div>
                        <div className="bank-data-row">
                          <span>IFSC Code:</span>
                          <strong className="mono-val">UBIN0808008</strong>
                          <CopyBtn value="UBIN0808008" />
                        </div>
                      </div>

                      {/* Account 2 */}
                      <div className="bank-entry-box">
                        <h3 className="bank-org-name">HDFC Bank</h3>
                        <div className="bank-data-row">
                          <span>Account Number:</span>
                          <strong className="mono-val">50200114783410</strong>
                          <CopyBtn value="50200114783410" />
                        </div>
                        <div className="bank-data-row">
                          <span>IFSC Code:</span>
                          <strong className="mono-val">HDFC0006729</strong>
                          <CopyBtn value="HDFC0006729" />
                        </div>
                      </div>

                      {/* Verified Authentic QR Code */}
                      <div className="verified-qr-display">
                        <img
                          src="/images/donation-qr.jpg"
                          alt="Official Jai Hanuman Seva Trust Donation QR Code"
                          className="authentic-qr-img"
                          width={240}
                          height={240}
                        />
                        <p className="qr-badge">✓ Verified Authentic Trust QR (Scan with any UPI App)</p>
                        <div className="qr-action-row">
                          <a
                            href="upi://pay?pa=7095999915-3@ybl&pn=Jai%20Hanuman%20Seva%20Trust&cu=INR"
                            className="btn-upi-mobile-pay"
                          >
                            ⚡ Open Directly in UPI App (GPay / PhonePe)
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Right column: Offering Record Form */}
                    <div className="bright-card form-bright-card">
                      <h2 className="bright-card-heading">Record Offering Details</h2>
                      <p className="bright-card-desc">
                        Provide contribution details for an official 80G tax exemption receipt.
                      </p>

                      <div className="amount-pills-row">
                        {['101', '501', '1001', '5001'].map((val) => (
                          <button
                            key={val}
                            type="button"
                            className={`amt-pill ${donationAmount === val ? 'active' : ''}`}
                            onClick={() => setDonationAmount(val)}
                          >
                            ₹{val}
                          </button>
                        ))}
                      </div>

                      <form onSubmit={handleDonationSubmit} className="bright-form">
                        <div className="bright-form-group">
                          <label htmlFor="ch11-amt">Offering Amount (₹ INR) *</label>
                          <input
                            id="ch11-amt"
                            name="amount"
                            type="number"
                            min="1"
                            required
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                          />
                        </div>

                        <div className="bright-form-group">
                          <label htmlFor="ch11-name">Devotee Full Name *</label>
                          <input id="ch11-name" name="name" type="text" required placeholder="Sri Rama Bhakta" />
                        </div>

                        <div className="bright-form-row">
                          <div className="bright-form-group">
                            <label htmlFor="ch11-phone">Phone Number *</label>
                            <input id="ch11-phone" name="phone" type="tel" required placeholder="+91 70959 99915" />
                          </div>
                          <div className="bright-form-group">
                            <label htmlFor="ch11-email">Email Address *</label>
                            <input id="ch11-email" name="email" type="email" required placeholder="devotee@gmail.com" />
                          </div>
                        </div>

                        <div className="bright-form-group">
                          <label htmlFor="ch11-purpose">Seva Purpose *</label>
                          <select id="ch11-purpose" name="purpose" defaultValue="Annadaan">
                            <option value="Annadaan">Annadaan (Free Food Seva)</option>
                            <option value="Goshala">Goshala Seva (Cow Protection)</option>
                            <option value="Scriptures">Scripture & Gita Distribution</option>
                            <option value="General">General Dharma Prachar</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          disabled={donationSubmitting}
                          className="btn-primary-bright btn-full"
                        >
                          {donationSubmitting ? 'Recording Offering…' : 'Submit Offering Details 🙏'}
                        </button>

                        {donationStatus && <div className="bright-status-msg">{donationStatus}</div>}
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CHAPTER 12 — THE CONCLUDING COURTYARD */}
            <section id="chapter-12" className="chapter-section align-center">
              <div className="wrap">
                <div className="glass-temple-card wide-card text-center" style={{ margin: '0 auto' }}>
                  <span className="sacred-eyebrow-bright">Chapter 12 · Concluding Courtyard</span>
                  <h2 className="section-title-dark" style={{ fontSize: '38px', marginBottom: '14px' }}>
                    May Divine Blessings Guide Your Path
                  </h2>
                  <p className="body-paragraph" style={{ maxWidth: '640px', margin: '0 auto 28px' }}>
                    Jai Hanuman Seva Trust operates with 100% legal transparency and devoted stewardship. Contact our central trust office for seva visits, volunteering, and inquiries.
                  </p>

                  <div className="contact-info-list" style={{ textAlign: 'left', marginBottom: '32px' }}>
                    <div className="ci-item">
                      <span className="ci-icon">📍</span>
                      <div>
                        <strong>Registered Office Address:</strong>
                        <p>7-62, Kalluru Vi., Kalluru Md., Khammam, Telangana – 507209</p>
                      </div>
                    </div>
                    <div className="ci-item">
                      <span className="ci-icon">📞</span>
                      <div>
                        <strong>Official Trust Helplines:</strong>
                        <p>+91 7095 9999 15 · +91 7095 9999 16</p>
                      </div>
                    </div>
                    <div className="ci-item">
                      <span className="ci-icon">📜</span>
                      <div>
                        <strong>Government NGO Credentials:</strong>
                        <p>Book 4 Doc: 6/2025 · NGO ID: TG/00048783 · NITI Aayog: TS/2025/0768831 · 80G PAN: AAFTJ3275R · CSR: CSR00096404</p>
                      </div>
                    </div>
                  </div>

                  <p className="footer-sacred-blessing" style={{ fontSize: '20px' }}>
                    जय श्री राम · जय बजरंगबली 🚩
                  </p>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* SUBPAGES: SEAMLESS PERSISTENT EXPERIENCE */}
        {currentPath === '/about' && <AboutPage lang={lang} />}
        {currentPath === '/seva' && <SevaPage lang={lang} />}
        {currentPath === '/gallery' && <GalleryPage />}
        {currentPath === '/events' && <EventsPage lang={lang} />}
        {currentPath === '/donation' && <DonationPage lang={lang} />}
        {currentPath === '/contact' && <ContactPage lang={lang} />}
      </main>

      {/* FULLSCREEN LIGHTBOX FOR GALLERY */}
      {lightboxImg && (
        <div className="lightbox-overlay" onClick={() => setLightboxImg(null)} role="dialog" aria-modal="true">
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={lightboxImg} alt="Enlarged photo" className="lightbox-img" />
            <button type="button" className="lightbox-close-btn" onClick={() => setLightboxImg(null)}>
              ✕
            </button>
          </div>
        </div>
      )}

      {/* BRIGHT & REGAL TEMPLE FOOTER */}
      <footer className="bright-temple-footer">
        <div className="wrap footer-grid">
          <div>
            <div className="brand-logo-lockup">
              <span className="logo-ring">
                <img src="/images/logo.png" alt="Trust Logo" className="logo-img" />
              </span>
              <div className="brand-text">
                <span className="brand-om">ॐ</span>
                <span className="brand-name">
                  Jai Hanuman <em className="brand-serif">Seva Trust</em>
                </span>
              </div>
            </div>
            <p className="footer-lead-text">
              Dedicated to serving humanity through Annadaan, goshala protection, scripture distribution, and Sanatana Dharma prachar across Bharat.
            </p>
            <p className="footer-legal-micro">
              Registered NGO ID: TG/00048783 · NITI Aayog Darpan: TS/2025/0768831 · Established: 2023
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Website Navigation</h4>
            <ul className="footer-links">
              {navLinks.map(({ key, labelEn, labelTe, path }) => (
                <li key={key}>
                  <a
                    href={path}
                    className="footer-nav-link"
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(path)
                    }}
                  >
                    {lang === 'en' ? labelEn : labelTe}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Office Information</h4>
            <p className="footer-info-row">📍 7-62, Kalluru Vi., Khammam, Telangana – 507209</p>
            <p className="footer-info-row">📞 +91 7095 9999 15</p>
            <p className="footer-info-row">📞 +91 7095 9999 16</p>
            <p className="footer-info-row">✉️ jaihanumansevatrust@gmail.com</p>

            <div className="footer-social-row">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="Facebook">
                FB
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="Instagram">
                IG
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="YouTube">
                YT
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar wrap">
          <p>© 2026 Jai Hanuman Seva Trust. All Rights Reserved. Strength in Devotion, Compassion in Service.</p>
          <p className="footer-sacred-blessing">जय श्री राम · जय बजरंगबली 🚩</p>
        </div>
      </footer>

      {/* FLOATING MOBILE SHORTCUTS */}
      <div className="floating-mobile-dock" aria-label="Quick Actions">
        <a
          href="https://wa.me/917095999915"
          target="_blank"
          rel="noopener noreferrer"
          className="floating-btn wa-btn"
          aria-label="Chat on WhatsApp"
        >
          💬
        </a>
        <a
          href="/donation"
          className="floating-btn donate-float-btn"
          aria-label="Donate Now"
          onClick={(e) => {
            e.preventDefault()
            navigate('/donation')
          }}
        >
          🙏
        </a>
      </div>
    </div>
  )
}
