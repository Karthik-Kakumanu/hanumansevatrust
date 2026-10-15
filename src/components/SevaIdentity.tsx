import TranslatedContent from '../TranslatedContent'

type SevaIdentityContext = 'home' | 'about' | 'donation'

type SevaIdentityProps = {
  context: SevaIdentityContext
}

const identityContent: Record<SevaIdentityContext, {
  eyebrow: string
  title: React.ReactNode
  copy: string
  href?: string
  linkLabel?: string
}> = {
  home: {
    eyebrow: 'Faith expressed through seva',
    title: <>Devotion is not only what we <i>pray.</i><br />It is what we do for <i>others.</i></>,
    copy: 'For Jai Hanuman Seva Trust, faith finds its clearest expression in practical compassion — a meal shared, a scripture placed in a waiting hand, a community cared for.'
  },
  about: {
    eyebrow: 'Our purpose',
    title: <>Faith, lived through <i>service.</i></>,
    copy: 'Inspired by Lord Hanuman’s humility and service to Sri Rama, the trust connects spiritual life with practical care for people and community.',
    href: '/seva',
    linkLabel: 'Explore the seva activities'
  },
  donation: {
    eyebrow: 'Giving with clarity',
    title: <>Support the trust’s <i>work.</i></>,
    copy: 'Your offering supports Jai Hanuman Seva Trust’s charitable and devotional work. Contact the trust if you have questions about its activities or donation details.',
    href: '/contact',
    linkLabel: 'Ask the trust a question'
  }
}

export default function SevaIdentity({ context }: SevaIdentityProps) {
  const content = identityContent[context]

  return (
    <TranslatedContent><section className={`seva-identity seva-identity--${context}`} aria-label={content.eyebrow}>
      <span className="eyebrow">{content.eyebrow}</span>
      <div className="seva-identity__copy">
        <h2>{content.title}</h2>
        <p>{content.copy}</p>
      </div>
      {content.href && content.linkLabel && (
        <a className="premium-text-link" href={content.href}>
          {content.linkLabel} <span aria-hidden="true">↗</span>
        </a>
      )}
    </section></TranslatedContent>
  )
}
