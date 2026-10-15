import { useLanguage } from '../LanguageContext'

const mantras = {
  en: 'OM HARE RAMA HARE RAMA · RAMA RAMA HARE HARE | HARE KRISHNA HARE KRISHNA · KRISHNA KRISHNA HARE HARE',
  te: 'ఓం హరే రామ హరే రామ · రామ రామ హరే హరే | హరే కృష్ణ హరే కృష్ణ · కృష్ణ కృష్ణ హరే హరే'
}

export default function MantraMarquee() {
  const { language } = useLanguage()
  const mantra = mantras[language]
  const copies = Array.from({ length: 4 }, (_, index) => (
    <span key={index} aria-hidden={index > 0}>{mantra}</span>
  ))
  return <div className="mantra-marquee" aria-label={language === 'te' ? 'భక్తి మంత్రం' : 'Devotional mantra'}>
    <div className="mantra-marquee__viewport"><div className="mantra-marquee__track">
      <div className="mantra-marquee__group">{copies}</div>
      <div className="mantra-marquee__group" aria-hidden="true">{copies}</div>
    </div></div>
  </div>
}
