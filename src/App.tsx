import { useState, useEffect } from 'react'
import './App.css'
import CinematicLoader from './components/CinematicLoader'
import AudioController from './components/AudioController'
import Temple3DStage from './components/Temple3DStage'
import { AboutPage, SevaPage, GalleryPage, EventsPage, DonationPage, ContactPage } from './components/PageViews'
import { tData } from './data/translations'

// Navigation links for router
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

export default function App() {
  const [lang, setLang] = useState<'en' | 'te'>('en')
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loadingComplete, setLoadingComplete] = useState(false)

  const t = tData[lang]

  // Router listener
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
      window.scrollTo(0, 0)
    }

    const handleLinkClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href]')
      if (!link) return
      const href = link.getAttribute('href')
      if (href && href.startsWith('/') && !href.startsWith('//') && !href.startsWith('/uploads') && !href.startsWith('/images') && !href.startsWith('/audio')) {
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

  // Navigation route helper
  const navigate = (path: string) => {
    window.history.pushState(null, '', path)
    setCurrentPath(path)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`app-root-container ${lang === 'te' ? 'font-telugu-active' : ''}`}>
      {/* 1. CINEMATIC LOADER */}
      {!loadingComplete && (
        <CinematicLoader onComplete={() => setLoadingComplete(true)} />
      )}

      {/* 2. DEVOTIONAL AUDIO CONTROLLER */}
      <AudioController />

      {/* 3. SACRED MANTRA TOP MARQUEE */}
      <div className="top-mantra-bar" role="region" aria-label="Sacred Mantra">
        <div className="mantra-track">
          <span>{t.mantra}</span>
          <span aria-hidden="true">{t.mantra}</span>
        </div>
      </div>

      {/* 4. REFINED BRIGHT & REGAL TEMPLE HEADER */}
      <header className="bright-temple-header">
        <div className="wrap header-inner">
          <a className="brand-logo-lockup" href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
            <span className="logo-ring">
              <img src="/images/logo.png" alt="Trust Logo" className="logo-img" />
            </span>
            <div className="brand-text">
              <span className="brand-om">ॐ</span>
              <span className="brand-name">Jai Hanuman <em className="brand-serif">Seva Trust</em></span>
            </div>
          </a>

          <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`} aria-label="Main Navigation">
            {navLinks.map(({ key, labelEn, labelTe, path }) => (
              <a
                key={key}
                href={path}
                className={`nav-link ${currentPath === path ? 'active-link' : ''}`}
                onClick={(e) => { e.preventDefault(); navigate(path); }}
              >
                {lang === 'en' ? labelEn : labelTe}
              </a>
            ))}
            <a
              href="/donation"
              className="btn-nav-donate"
              onClick={(e) => { e.preventDefault(); navigate('/donation'); }}
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

      {/* 5. ROUTE VIEW DISPATCHER */}
      <main id="main-content">
        {currentPath === '/' && (
          /* =================================================================
             PAGE A: HOME — BRIGHT GOLDEN TEMPLE ENTRANCE & CINEMATIC 3D HERO
             ================================================================= */
          <div className="page-home-view">
            {/* 1. Luminous 3D Temple Entrance Hero */}
            <section className="home-luminous-hero">
              <div className="wrap home-hero-grid">
                <div className="home-hero-content">
                  <span className="sacred-eyebrow-bright">{t.hero.eyebrow}</span>
                  <h1 className="home-hero-headline">
                    {t.hero.heading}<br />
                    <span className="serif-highlight">{t.hero.subheading}</span>
                  </h1>
                  <p className="home-hero-subline">{t.hero.description}</p>
                  <div className="home-hero-cta-row">
                    <a href="/donation" className="btn-primary-bright" onClick={(e) => { e.preventDefault(); navigate('/donation'); }}>
                      {t.hero.donateCta} <Arrow />
                    </a>
                    <a href="/seva" className="btn-secondary-bright" onClick={(e) => { e.preventDefault(); navigate('/seva'); }}>
                      {t.hero.exploreCta} <Arrow />
                    </a>
                  </div>
                </div>

                {/* Staged 3D Lord Hanuman Model in Blessing Abhaya Mudra */}
                <div className="home-hero-3d-stage">
                  <Temple3DStage theme="home" pose="blessing" cameraPos={[0, 1.6, 5.0]} hanumanScale={1.12} />
                </div>
              </div>
            </section>

            {/* 2. Impact Statistics on Marigold & Warm Sandstone */}
            <section className="home-stats-banner">
              <div className="wrap home-stats-grid">
                {t.stats.map((s, idx) => (
                  <div key={idx} className="home-stat-tile">
                    <span className="home-stat-number">{s.num}</span>
                    <span className="home-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. About Trust Summary Editorial (Warm Ivory) */}
            <section className="home-editorial-summary">
              <div className="wrap home-summary-grid">
                <div>
                  <span className="sacred-eyebrow-bright">{t.story.eyebrow}</span>
                  <h2 className="section-title-dark">{t.story.title}</h2>
                  <p className="body-paragraph">{t.story.body}</p>
                  <div className="summary-actions">
                    <a href="/about" className="btn-secondary-bright" onClick={(e) => { e.preventDefault(); navigate('/about'); }}>
                      Read Complete Story & Legal Credentials <Arrow />
                    </a>
                  </div>
                </div>

                <div className="bright-card summary-credentials-card">
                  <h3 className="sidebar-card-title">Institutional Credentials</h3>
                  <div className="summary-cred-item">
                    <span>Registered NGO ID:</span>
                    <strong>TG/00048783</strong>
                  </div>
                  <div className="summary-cred-item">
                    <span>Darpan Registration:</span>
                    <strong>TS/2025/0768831</strong>
                  </div>
                  <div className="summary-cred-item">
                    <span>80G PAN:</span>
                    <strong>AAFTJ3275R</strong>
                  </div>
                  <div className="summary-cred-item">
                    <span>CSR Number:</span>
                    <strong>CSR00096404</strong>
                  </div>
                  <div className="summary-cred-item">
                    <span>Established Year:</span>
                    <strong>2023</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Six Pillars Preview Grid */}
            <section className="home-pillars-preview">
              <div className="wrap">
                <div className="section-head-dark">
                  <span className="sacred-eyebrow-bright">{t.pillarsTitle}</span>
                  <h2 className="section-title-dark">Devotion in Every Deed</h2>
                  <p className="section-subtitle-dark">{t.pillarsSub}</p>
                </div>

                <div className="bright-pillars-grid">
                  {t.pillars.slice(0, 3).map((p) => (
                    <div key={p.id} className="bright-pillar-card">
                      <div className="b-pillar-num">{p.id}</div>
                      <h3 className="b-pillar-title">{p.title}</h3>
                      <p className="b-pillar-desc">{p.desc}</p>
                      <a href="/seva" className="b-pillar-action" onClick={(e) => { e.preventDefault(); navigate('/seva'); }}>
                        Learn More <Arrow />
                      </a>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-30">
                  <a href="/seva" className="btn-primary-bright" onClick={(e) => { e.preventDefault(); navigate('/seva'); }}>
                    View All Six Pillars & Dharma Prachar <Arrow />
                  </a>
                </div>
              </div>
            </section>

            {/* 5. Annadaan Spotlight Callout */}
            <section className="home-annadaan-spotlight">
              <div className="wrap">
                <div className="annadaan-gold-card">
                  <span className="diya-badge">ॐ</span>
                  <h2 className="annadaan-sanskrit-heading">{t.annadaan.sanskrit}</h2>
                  <p className="annadaan-sub-text">{t.annadaan.sub}</p>
                  <a href="/donation" className="btn-primary-bright" onClick={(e) => { e.preventDefault(); navigate('/donation'); }}>
                    Support Daily Annadaan Kitchens <Arrow />
                  </a>
                </div>
              </div>
            </section>

            {/* 6. Testimonials */}
            <section className="home-testimonials-section">
              <div className="wrap">
                <h3 className="testimonials-title-dark">{t.testimonialsTitle}</h3>
                <div className="bright-testimonials-grid">
                  {t.testimonials.map((item, idx) => (
                    <div key={idx} className="bright-testimonial-card">
                      <span className="b-quote-icon">“</span>
                      <p className="b-quote-text">{item.quote}</p>
                      <footer className="b-quote-author">— {item.author}</footer>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {currentPath === '/about' && <AboutPage lang={lang} />}
        {currentPath === '/seva' && <SevaPage lang={lang} />}
        {currentPath === '/gallery' && <GalleryPage />}
        {currentPath === '/events' && <EventsPage lang={lang} />}
        {currentPath === '/donation' && <DonationPage lang={lang} />}
        {currentPath === '/contact' && <ContactPage lang={lang} />}
      </main>

      {/* 6. BRIGHT & REGAL TEMPLE FOOTER */}
      <footer className="bright-temple-footer">
        <div className="wrap footer-grid">
          <div>
            <div className="brand-logo-lockup">
              <span className="logo-ring">
                <img src="/images/logo.png" alt="Trust Logo" className="logo-img" />
              </span>
              <div className="brand-text">
                <span className="brand-om">ॐ</span>
                <span className="brand-name">Jai Hanuman <em className="brand-serif">Seva Trust</em></span>
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
                    onClick={(e) => { e.preventDefault(); navigate(path); }}
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
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="Facebook">FB</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="Instagram">IG</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="footer-social-icon" aria-label="YouTube">YT</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar wrap">
          <p>© 2026 Jai Hanuman Seva Trust. All Rights Reserved. Strength in Devotion, Compassion in Service.</p>
          <p className="footer-sacred-blessing">जय श्री राम · जय बजरंगबली 🚩</p>
        </div>
      </footer>

      {/* 7. FLOATING MOBILE SHORTCUTS */}
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
          onClick={(e) => { e.preventDefault(); navigate('/donation'); }}
        >
          🙏
        </a>
      </div>
    </div>
  )
}
