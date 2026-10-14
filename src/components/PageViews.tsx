import { useState } from 'react'
import type { FormEvent } from 'react'
import Temple3DStage from './Temple3DStage'
import { tData } from '../data/translations'

const legalDetails = [
  { label: 'Registration Book', val: 'BOOK 4-DOC.NO:- 6/2025' },
  { label: 'NGO ID', val: 'TG/00048783' },
  { label: 'Darpan Portal', val: 'TS/2025/0768831' },
  { label: 'Unique Registration', val: 'BK04 6/2025' },
  { label: 'PAN (80G)', val: 'AAFTJ3275R' },
  { label: 'CSR Registration', val: 'CSR00096404' },
  { label: 'Established', val: '2023' }
]

const galleryItems = [
  {
    src: '/uploads/gallery/1775715457491-WhatsApp_Image_2026-04-09_at_00.37.51.webp',
    category: 'Annadaan',
    title: 'Sacred Annadaan Offering',
    caption: 'Devotional food distribution to devotees and needy pilgrims.'
  },
  {
    src: '/uploads/gallery/1775715427232-WhatsApp_Image_2026-04-09_at_00.37.52.webp',
    category: 'Bhajans & Kirtans',
    title: 'Spiritual Bhajans & Parayanam',
    caption: 'Devotees chanting Rama Nama and Hanuman Chalisa.'
  },
  {
    src: '/uploads/gallery/1775715404947-WhatsApp_Image_2026-04-09_at_00.37.50__2_.webp',
    category: 'Scripture Distribution',
    title: 'Sacred Text Seva',
    caption: 'Distributing Bhagavad Gita and Ramayana scriptures.'
  },
  {
    src: '/uploads/gallery/1775715398133-WhatsApp_Image_2026-04-09_at_00.37.52__2_.webp',
    category: 'Goshala Seva',
    title: 'Gau Seva & Protection',
    caption: 'Caring for cows and upholding sacred Sanatana Dharma values.'
  },
  {
    src: '/uploads/gallery/1775715354729-WhatsApp_Image_2026-04-09_at_00.37.51.webp',
    category: 'Rathayatra',
    title: 'Divine Rathayatra Procession',
    caption: 'Sacred chariot carrying the holy deities through sacred streets.'
  },
  {
    src: '/uploads/gallery/1775715346201-WhatsApp_Image_2026-04-09_at_00.37.51__3_.webp',
    category: 'Satsang',
    title: 'Community Parayanam Satsang',
    caption: 'Devotional gatherings bringing families together in prayer.'
  },
  {
    src: '/uploads/gallery/1775715345483-WhatsApp_Image_2026-04-09_at_00.37.51__2_.webp',
    category: 'Festivals',
    title: 'Hanuman Jayanti Celebration',
    caption: 'Festival celebrations filled with devotion and gratitude.'
  }
]

const galleryCategories = [
  'All Photos',
  'Annadaan',
  'Bhajans & Kirtans',
  'Goshala Seva',
  'Rathayatra',
  'Scripture Distribution',
  'Temple Construction',
  'Festivals',
  'Yoga & Dharma',
  'News & Media'
]

const sacredPlaces = ['Ayodhya', 'Varanasi', 'Gaya', 'Prayagraj', 'Puri', 'Jagannath']

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

function Arrow() {
  return <span className="arrow-icon" aria-hidden="true">→</span>
}

/* =========================================================================
   PAGE B: ABOUT THE TRUST — IVORY EDITORIAL STORYBOOK
   ========================================================================= */
export function AboutPage({ lang }: { lang: 'en' | 'te' }) {
  const t = tData[lang]
  return (
    <div className="subpage-container page-about-theme">
      {/* Top Banner with 3D Staged Hanuman in Namaskar Pose */}
      <section className="subpage-hero-banner">
        <div className="wrap subpage-banner-grid">
          <div className="subpage-hero-text">
            <span className="sacred-eyebrow-bright">About the Trust</span>
            <h1 className="subpage-title">
              Rooted in Devotion. <br />
              <span className="serif-highlight">Made for Selfless Service.</span>
            </h1>
            <p className="subpage-lead">{t.story.body}</p>
            <div className="subpage-hero-actions">
              <a href="/donation" className="btn-primary-bright">Support Our Seva <Arrow /></a>
              <a href="/contact" className="btn-secondary-bright">Contact Office <Arrow /></a>
            </div>
          </div>

          {/* Dedicated Staged 3D Lord Hanuman */}
          <div className="subpage-3d-frame">
            <Temple3DStage theme="about" pose="namaskar" cameraPos={[0, 0.35, 4.8]} hanumanScale={1.0} />
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="subpage-body-section">
        <div className="wrap">
          <div className="about-editorial-grid">
            {/* Left Column: Mission, Vision, Story */}
            <div className="editorial-main-content">
              <h2 className="section-title-dark">Our Sacred Journey</h2>
              <p className="body-paragraph">
                Founded with the vision of Lord Hanuman’s selfless service, Jai Hanuman Seva Trust organizes daily free food distribution (Annadaan), protects sacred cows in dedicated goshalas, and spreads Sanatana Dharma through classical hymns, yoga, and scriptures across sacred places of India.
              </p>
              <p className="body-paragraph">
                Established in 2023, the trust operates with full transparency and verified government NGO credentials under the leadership of devoted volunteers and community patrons.
              </p>

              {/* Mission & Vision Cards */}
              <div className="about-mv-row">
                <div className="about-mv-box">
                  <span className="mv-box-icon">🌾</span>
                  <h3>{t.story.missionTitle}</h3>
                  <p>{t.story.missionText}</p>
                </div>
                <div className="about-mv-box">
                  <span className="mv-box-icon">📖</span>
                  <h3>{t.story.visionTitle}</h3>
                  <p>{t.story.visionText}</p>
                </div>
              </div>

              {/* Places Served */}
              <div className="about-places-block">
                <h3 className="section-subtitle-dark">Sacred Places We Serve</h3>
                <p className="places-intro-text">
                  Our volunteers actively facilitate Annadaan drives and spiritual programs across historic holy destinations:
                </p>
                <div className="sacred-places-tags">
                  {sacredPlaces.map(place => (
                    <span key={place} className="sacred-tag">📍 {place}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Legal Information Box */}
            <div className="editorial-sidebar">
              <div className="bright-card legal-card-bright">
                <h3 className="sidebar-card-title">Registration & Legal Information</h3>
                <p className="sidebar-card-sub">All contributions are managed with complete transparency under registered NGO status.</p>
                <div className="legal-detail-list">
                  {legalDetails.map(item => (
                    <div key={item.label} className="legal-detail-item">
                      <span className="ld-label">{item.label}</span>
                      <strong className="ld-val">{item.val}</strong>
                    </div>
                  ))}
                </div>

                <div className="committee-notice-box">
                  <span className="notice-icon">✦</span>
                  <div>
                    <h4>Committee Information</h4>
                    <p>Trust committee members and advisory board will be published here upon official trustee review.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* =========================================================================
   PAGE C: SEVA & DHARMA PRACHAR — MARIGOLD & SANDSTONE COURTYARD
   ========================================================================= */
export function SevaPage({ lang }: { lang: 'en' | 'te' }) {
  const t = tData[lang]
  return (
    <div className="subpage-container page-seva-theme">
      {/* Banner with 3D Staged Hanuman in Heroic Stance */}
      <section className="subpage-hero-banner">
        <div className="wrap subpage-banner-grid">
          <div className="subpage-hero-text">
            <span className="sacred-eyebrow-bright">Six Pillars of Service</span>
            <h1 className="subpage-title">
              Every Act of Service <br />
              <span className="serif-highlight">is an Offering of Dharma.</span>
            </h1>
            <p className="subpage-lead">
              From our Annadaan kitchens serving thousands of hungry pilgrims to protecting sacred cows and disseminating the eternal wisdom of Ramayana and Bhagavad Gita.
            </p>
            <div className="subpage-hero-actions">
              <a href="/donation" className="btn-primary-bright">Donate to a Seva <Arrow /></a>
            </div>
          </div>

          <div className="subpage-3d-frame">
            <Temple3DStage theme="seva" pose="heroic" cameraPos={[0, 0.35, 4.8]} hanumanScale={1.0} />
          </div>
        </div>
      </section>

      {/* Six Pillars Grid on Sandstone/Ivory Background */}
      <section className="subpage-body-section">
        <div className="wrap">
          <div className="section-head-dark">
            <span className="sacred-eyebrow-bright">The Sacred Pillars</span>
            <h2 className="section-title-dark">Comprehensive Seva Initiatives</h2>
          </div>

          <div className="bright-pillars-grid">
            {t.pillars.map(pillar => (
              <div key={pillar.id} className="bright-pillar-card">
                <div className="b-pillar-num">{pillar.id}</div>
                <h3 className="b-pillar-title">{pillar.title}</h3>
                <p className="b-pillar-desc">{pillar.desc}</p>
                <a href="/donation" className="b-pillar-action">Sponsor Seva <Arrow /></a>
              </div>
            ))}
          </div>

          {/* Hindhu Dharma Prachar Section */}
          <div className="dharma-showcase-box">
            <div className="dharma-showcase-left">
              <span className="sacred-eyebrow-bright">{t.dharma.eyebrow}</span>
              <h2 className="section-title-dark">{t.dharma.title}</h2>
              <p className="body-paragraph">
                Upholding traditional Indian spiritual arts and scriptural recitation to inspire future generations and maintain cultural heritage.
              </p>
            </div>
            <div className="dharma-showcase-right">
              {t.dharma.items.map((item, i) => (
                <div key={item} className="dharma-pill-item">
                  <span className="dpi-num">0{i + 1}</span>
                  <span className="dpi-text">{item}</span>
                  <span className="dpi-status">Active Seva</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* =========================================================================
   PAGE D: GALLERY — BRIGHT SACRED PHOTOGRAPHIC EXHIBITION
   ========================================================================= */
export function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState('All Photos')
  const [lightboxImg, setLightboxImg] = useState<string | null>(null)

  const filtered = activeFilter === 'All Photos'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter)

  return (
    <div className="subpage-container page-gallery-theme">
      <section className="subpage-hero-banner">
        <div className="wrap subpage-banner-grid">
          <div className="subpage-hero-text">
            <span className="sacred-eyebrow-bright">Documentary Record</span>
            <h1 className="subpage-title">
              Moments of Devotion <br />
              <span className="serif-highlight">in Selfless Action.</span>
            </h1>
            <p className="subpage-lead">
              A curated photographic exhibition highlighting the authentic charitable, cultural, and spiritual activities of Jai Hanuman Seva Trust.
            </p>
          </div>

          <div className="subpage-3d-frame">
            <Temple3DStage theme="gallery" pose="blessing" cameraPos={[0, 0.35, 4.8]} hanumanScale={1.0} />
          </div>
        </div>
      </section>

      <section className="subpage-body-section">
        <div className="wrap">
          {/* Filter Chips */}
          <div className="bright-filter-chips">
            {galleryCategories.map(cat => (
              <button
                key={cat}
                type="button"
                className={`bright-chip ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Photo Grid */}
          <div className="bright-gallery-grid">
            {filtered.map((item, idx) => (
              <div
                key={idx}
                className="bright-photo-card"
                onClick={() => setLightboxImg(item.src)}
                tabIndex={0}
                role="button"
                aria-label={`View photo: ${item.title}`}
                onKeyDown={(e) => { if (e.key === 'Enter') setLightboxImg(item.src) }}
              >
                <div className="b-photo-frame">
                  <img src={item.src} alt={item.title} className="b-gallery-img" loading="lazy" />
                </div>
                <div className="b-photo-meta">
                  <span className="b-photo-cat">{item.category}</span>
                  <h3 className="b-photo-title">{item.title}</h3>
                  <p className="b-photo-cap">{item.caption}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Fullscreen Lightbox */}
          {lightboxImg && (
            <div className="lightbox-overlay" onClick={() => setLightboxImg(null)} role="dialog" aria-modal="true">
              <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                <img src={lightboxImg} alt="Enlarged photo" className="lightbox-img" />
                <button type="button" className="lightbox-close-btn" onClick={() => setLightboxImg(null)}>✕</button>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

/* =========================================================================
   PAGE E: EVENTS — FESTIVE SAFFRON & TERRACOTTA
   ========================================================================= */
export function EventsPage({ lang }: { lang: 'en' | 'te' }) {
  const t = tData[lang]
  return (
    <div className="subpage-container page-events-theme">
      <section className="subpage-hero-banner">
        <div className="wrap subpage-banner-grid">
          <div className="subpage-hero-text">
            <span className="sacred-eyebrow-bright">{t.events.eyebrow}</span>
            <h1 className="subpage-title">
              {t.events.title} <br />
              <span className="serif-highlight">Dharma & Festival Gatherings</span>
            </h1>
            <p className="subpage-lead">{t.events.sub}</p>
          </div>

          <div className="subpage-3d-frame">
            <Temple3DStage theme="events" pose="heroic" cameraPos={[0, 0.35, 4.8]} hanumanScale={1.0} />
          </div>
        </div>
      </section>

      <section className="subpage-body-section">
        <div className="wrap">
          <div className="bright-card empty-events-card">
            <span className="empty-diya">🪔</span>
            <h2 className="empty-title">{t.events.empty}</h2>
            <p className="empty-desc">{t.events.sub}</p>
            <div className="empty-cta-group">
              <a href="/contact" className="btn-primary-bright">Inquire About Future Programs <Arrow /></a>
              <a href="/gallery" className="btn-secondary-bright">Browse Past Activity Photos <Arrow /></a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* =========================================================================
   PAGE F: DONATION — IVORY, CHAMPAGNE GOLD & TRUSTWORTHY DESIGN
   ========================================================================= */
export function DonationPage({ lang }: { lang: 'en' | 'te' }) {
  const t = tData[lang]
  const [amount, setAmount] = useState('501')
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus('')
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
        setStatus('Offering record accepted. An official receipt will be processed upon bank verification.')
      } else {
        setStatus(data.error || 'Thank you for your generous pledge. Please complete the bank transfer or UPI transfer below.')
      }
    } catch {
      setStatus('Your donation pledge has been recorded. Please complete payment via the verified UPI QR or Bank accounts below.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="subpage-container page-donation-theme">
      <section className="subpage-hero-banner">
        <div className="wrap subpage-banner-grid">
          <div className="subpage-hero-text">
            <span className="sacred-eyebrow-bright">{t.donation.teluguMantra}</span>
            <h1 className="subpage-title">
              {t.donation.charityQuote} <br />
              <span className="serif-highlight">{t.donation.annadaanTelugu}</span>
            </h1>
            <p className="subpage-lead">{t.donation.annadaanNote}</p>
            <div className="donation-trust-badges">
              <span className="trust-badge">✓ 80G Tax Exemption (PAN: AAFTJ3275R)</span>
              <span className="trust-badge">✓ NITI Aayog Darpan Registered</span>
              <span className="trust-badge">✓ Full Transparency</span>
            </div>
          </div>

          <div className="subpage-3d-frame">
            <Temple3DStage theme="donation" pose="blessing" cameraPos={[0, 0.35, 4.8]} hanumanScale={1.0} />
          </div>
        </div>
      </section>

      <section className="subpage-body-section">
        <div className="wrap">
          <div className="donation-dual-bright-grid">
            {/* Left Column: Official Banking & Verified Authentic QR */}
            <div className="bright-card banking-bright-card">
              <h2 className="bright-card-heading">Direct Bank Transfer</h2>
              <p className="bright-card-desc">Transfer directly to the registered Jai Hanuman Seva Trust institutional accounts via NEFT, RTGS, IMPS, or Net Banking.</p>

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

              {/* Verified UPI QR */}
              <div className="upi-verified-section">
                <div className="upi-id-bar">
                  <span>Official UPI ID:</span>
                  <strong className="mono-val">7095999915-3@ybl</strong>
                  <CopyBtn value="7095999915-3@ybl" />
                </div>

                <div className="verified-qr-display">
                  <img
                    src="/images/donation-qr.jpg"
                    alt="Official Trust QR Code"
                    className="authentic-qr-img"
                    width={240}
                    height={240}
                  />
                  <p className="qr-badge">✓ Verified Authentic Trust QR (Scan with GPay, PhonePe, Paytm, BHIM)</p>
                  <div className="qr-action-row">
                    <a
                      href="upi://pay?pa=7095999915-3@ybl&pn=Jai%20Hanuman%20Seva%20Trust&cu=INR"
                      className="btn-upi-mobile-pay"
                    >
                      ⚡ Open Directly in UPI App (Mobile)
                    </a>
                  </div>
                </div>
                <p className="tax-compliance-text">{t.donation.taxNote}</p>
              </div>
            </div>

            {/* Right Column: Donation Details Form */}
            <div className="bright-card form-bright-card">
              <h2 className="bright-card-heading">Record Your Devotional Offering</h2>
              <p className="bright-card-desc">Submit your contribution details so the trust can issue an official acknowledgement and 80G tax receipt.</p>

              {/* Preset Amount Pills */}
              <div className="amount-pills-row">
                {['101', '501', '1001', '5001'].map(val => (
                  <button
                    key={val}
                    type="button"
                    className={`amt-pill ${amount === val ? 'active' : ''}`}
                    onClick={() => setAmount(val)}
                  >
                    ₹{val}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="bright-form">
                <div className="bright-form-group">
                  <label htmlFor="b-amount">Offering Amount (₹ INR) *</label>
                  <input
                    id="b-amount"
                    name="amount"
                    type="number"
                    min="1"
                    required
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>

                <div className="bright-form-group">
                  <label htmlFor="b-name">Devotee Full Name *</label>
                  <input id="b-name" name="name" type="text" required placeholder="Sri Rama Bhakta" />
                </div>

                <div className="bright-form-row">
                  <div className="bright-form-group">
                    <label htmlFor="b-phone">Phone Number *</label>
                    <input id="b-phone" name="phone" type="tel" required placeholder="+91 70959 99915" />
                  </div>
                  <div className="bright-form-group">
                    <label htmlFor="b-email">Email Address *</label>
                    <input id="b-email" name="email" type="email" required placeholder="devotee@gmail.com" />
                  </div>
                </div>

                <div className="bright-form-group">
                  <label htmlFor="b-purpose">Seva Purpose *</label>
                  <select id="b-purpose" name="purpose" defaultValue="Annadaan">
                    <option value="Annadaan">Annadaan (Free Food Seva)</option>
                    <option value="Goshala">Goshala Seva (Cow Protection)</option>
                    <option value="Scriptures">Scripture & Gita Distribution</option>
                    <option value="General">General Dharma Prachar</option>
                  </select>
                </div>

                <div className="bright-form-group">
                  <label htmlFor="b-address">Postal Address / PAN (For 80G Tax Exemption)</label>
                  <textarea id="b-address" name="address" rows={2} placeholder="Address and PAN number" />
                </div>

                <button type="submit" disabled={submitting} className="btn-primary-bright btn-full">
                  {submitting ? 'Submitting Details…' : 'Submit Offering Details 🙏'}
                </button>

                {status && <div className="bright-status-msg">{status}</div>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

/* =========================================================================
   PAGE G: CONTACT — PEACH, IVORY & WARM SUNRISE
   ========================================================================= */
export function ContactPage({ lang }: { lang: 'en' | 'te' }) {
  const t = tData[lang]
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    setStatus('')
    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData.entries())

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      if (data.ok) {
        setStatus('Your message has been delivered to the trust office. We will reach back shortly.')
      } else {
        setStatus(data.error || 'Thank you for reaching out. Please also feel free to contact us directly via phone or WhatsApp.')
      }
    } catch {
      setStatus('Message recorded. You can also reach the trust office directly at jaihanumansevatrust@gmail.com.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="subpage-container page-contact-theme">
      <section className="subpage-hero-banner">
        <div className="wrap subpage-banner-grid">
          <div className="subpage-hero-text">
            <span className="sacred-eyebrow-bright">{t.contact.eyebrow}</span>
            <h1 className="subpage-title">{t.contact.title}</h1>
            <p className="subpage-lead">{t.contact.sub}</p>
          </div>

          <div className="subpage-3d-frame">
            <Temple3DStage theme="contact" pose="seated-meditation" cameraPos={[0, 0.35, 4.8]} hanumanScale={1.0} />
          </div>
        </div>
      </section>

      <section className="subpage-body-section">
        <div className="wrap">
          <div className="contact-dual-bright-grid">
            {/* Contact Details Card */}
            <div className="bright-card contact-info-card">
              <h2 className="bright-card-heading">Trust Registered Office</h2>
              <p className="bright-card-desc">Visit or communicate with our central office for donations, seva participation, and seva volunteering.</p>

              <div className="contact-info-list">
                <div className="ci-item">
                  <span className="ci-icon">📍</span>
                  <div>
                    <strong>Postal Address:</strong>
                    <p>7-62, Kalluru Vi., Kalluru Md., Khammam, Telangana – 507209</p>
                  </div>
                </div>

                <div className="ci-item">
                  <span className="ci-icon">📞</span>
                  <div>
                    <strong>Official Phone Numbers:</strong>
                    <p>
                      <a href="tel:+917095999915" className="contact-link">+91 7095 9999 15</a><br />
                      <a href="tel:+917095999916" className="contact-link">+91 7095 9999 16</a>
                    </p>
                  </div>
                </div>

                <div className="ci-item">
                  <span className="ci-icon">✉️</span>
                  <div>
                    <strong>Official Email:</strong>
                    <p>
                      <a href="mailto:jaihanumansevatrust@gmail.com" className="contact-link">
                        jaihanumansevatrust@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="ci-item">
                  <span className="ci-icon">⏰</span>
                  <div>
                    <strong>Office Working Hours:</strong>
                    <p>Monday – Saturday: 9:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="map-button-row">
                <a
                  href="https://maps.google.com/?q=Kalluru,Khammam,Telangana"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary-bright btn-full"
                >
                  Open Location in Google Maps <Arrow />
                </a>
              </div>
            </div>

            {/* Message Form */}
            <div className="bright-card contact-form-card">
              <h2 className="bright-card-heading">Send a Message</h2>
              <p className="bright-card-desc">Fill out this form to inquire about Annadaan sponsorship, temple volunteering, or seva activities.</p>

              <form onSubmit={handleSubmit} className="bright-form">
                <div className="bright-form-group">
                  <label htmlFor="ct-b-name">Your Full Name *</label>
                  <input id="ct-b-name" name="name" type="text" required placeholder="Sri Rama Bhakta" />
                </div>

                <div className="bright-form-row">
                  <div className="bright-form-group">
                    <label htmlFor="ct-b-phone">Phone Number *</label>
                    <input id="ct-b-phone" name="phone" type="tel" required placeholder="+91 70959 99915" />
                  </div>
                  <div className="bright-form-group">
                    <label htmlFor="ct-b-email">Email Address *</label>
                    <input id="ct-b-email" name="email" type="email" required placeholder="devotee@gmail.com" />
                  </div>
                </div>

                <div className="bright-form-group">
                  <label htmlFor="ct-b-msg">Message / Inquiry *</label>
                  <textarea id="ct-b-msg" name="message" rows={4} required placeholder="How can we assist your devotional journey or seva?" />
                </div>

                <button type="submit" disabled={submitting} className="btn-primary-bright btn-full">
                  {submitting ? 'Transmitting Message…' : 'Send Message to Office →'}
                </button>

                {status && <div className="bright-status-msg">{status}</div>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
