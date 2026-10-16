type Purpose = {
  label: string
  title: string
  description: string
}

type PurposeCardsProps = {
  purposes: Purpose[]
  compact?: boolean
}

function PurposeIcon({ purpose }: { purpose: 'mission' | 'vision' }) {
  return purpose === 'mission' ? (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 20.2s-7.2-4.4-7.2-10a4.1 4.1 0 0 1 7.2-2.7A4.1 4.1 0 0 1 19.2 10c0 5.8-7.2 10.2-7.2 10.2Z" />
      <path d="M8.2 12.1h7.6M12 8.3v7.6" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M2.8 12s3.3-6 9.2-6 9.2 6 9.2 6-3.3 6-9.2 6-9.2-6-9.2-6Z" />
      <circle cx="12" cy="12" r="2.7" />
      <path d="m12 2 .8 1.7L14.5 4l-1.7.8L12 6.5l-.8-1.7L9.5 4l1.7-.3L12 2Z" />
    </svg>
  )
}

export default function PurposeCards({ purposes, compact = false }: PurposeCardsProps) {
  return (
    <div className={`purpose-grid${compact ? ' purpose-grid--compact' : ''}`}>
      {purposes.map((purpose, index) => (
        <article className="purpose-card" key={purpose.label}>
          <span className="purpose-card__icon"><PurposeIcon purpose={index === 0 ? 'mission' : 'vision'} /></span>
          <span className="purpose-card__label">{purpose.label}</span>
          <h3>{purpose.title}</h3>
          <p>{purpose.description}</p>
        </article>
      ))}
    </div>
  )
}
