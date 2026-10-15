import { useEffect, useMemo, useState } from 'react'
import './App.css'
import { galleryItems, galleryCategories } from './data/galleryData'
import PremiumHome from './components/PremiumHome'
import SevaIdentity from './components/SevaIdentity'
import { useLanguage } from './LanguageContext'
import TranslatedContent from './TranslatedContent'
import { translateText } from './data/uiTranslations'

type Route = '/' | '/about' | '/seva' | '/gallery' | '/events' | '/donation' | '/contact'
const nav = [['About','/about'],['Seva','/seva'],['Gallery','/gallery'],['Events','/events'],['Contact','/contact']] as const
const activities = [
  ['Annadaan','Free food distribution with dignity and warmth.','/uploads/gallery/1775715457491-WhatsApp_Image_2026-04-09_at_00.37.51.webp'],
  ['Goshala Seva','Cow protection and compassionate care.','/uploads/gallery/1775715398133-WhatsApp_Image_2026-04-09_at_00.37.52__2_.webp'],
  ['Bhajan & Harikatha','Music, story, chanting and shared remembrance.','/uploads/gallery/1775715427232-WhatsApp_Image_2026-04-09_at_00.37.52.webp'],
  ['Rathayatra','Sacred processions that gather the community.','/uploads/gallery/1775715354729-WhatsApp_Image_2026-04-09_at_00.37.51.webp'],
  ['Scripture Distribution','Making the wisdom of scripture accessible.','/uploads/gallery/1775715404947-WhatsApp_Image_2026-04-09_at_00.37.50__2_.webp'],
  ['Satsang','Prayer, Parayanam and fellowship.','/uploads/gallery/1775715346201-WhatsApp_Image_2026-04-09_at_00.37.51__3_.webp']
]
const go = (p:string) => { document.body.classList.add('is-transitioning'); window.setTimeout(() => document.body.classList.remove('is-transitioning'), 760); window.history.pushState({},'',p); window.dispatchEvent(new PopStateEvent('popstate')); window.scrollTo({top:0,behavior:'smooth'}) }
const Eyebrow = ({children}:{children:React.ReactNode}) => <TranslatedContent><span className="eyebrow">{children}</span></TranslatedContent>
const Arrow = () => <span className="arrow">↗</span>
const SupportIcon = () => (
  <svg className="support-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d="M7.5 12.5 4.9 9.9a2.7 2.7 0 0 1 3.8-3.8l3 3 1.9-1.9a2.7 2.7 0 0 1 3.8 3.8l-4.9 4.9a3.9 3.9 0 0 1-5.5 0l-2.2-2.2" />
    <path d="m8.2 10.8 2.2 2.2a2.7 2.7 0 0 0 3.8 0l2.1-2.1" />
    <path d="m10.4 9.1 1.2-1.2a2.7 2.7 0 0 1 3.8 0l2.1 2.1" />
  </svg>
)
function Header({path,menu,setMenu}:{path:string;menu:boolean;setMenu:(v:boolean)=>void}){
  const { language, setLanguage } = useLanguage()
  useEffect(()=>{
    if(!menu)return
    const closeOnEscape=(event:KeyboardEvent)=>{if(event.key==='Escape')setMenu(false)}
    window.addEventListener('keydown',closeOnEscape)
    return()=>window.removeEventListener('keydown',closeOnEscape)
  },[menu,setMenu])

  const navigate=(destination:Route)=> (event:React.MouseEvent<HTMLAnchorElement>)=>{
    event.preventDefault()
    setMenu(false)
    go(destination)
  }

  return <TranslatedContent><>
    <div className="topline"><span>JAI SHRI RAM</span><span className="topline-center">Serving humanity through Annadaan & Dharma Prachar</span><span>ॐ श्री हनुमते नमः</span></div>
    <header className="site-header">
      <a className="brand" href="/" onClick={navigate('/')}><img src="/images/logo.png" alt="Jai Hanuman Seva Trust logo"/><span><b>Jai Hanuman</b><em>Seva Trust</em></span></a>
      <nav id="site-navigation" aria-label="Main navigation" className={menu?'nav-open':''}>
        <a className={path==='/'?'active':''} aria-current={path==='/'?'page':undefined} href="/" onClick={navigate('/')}>Home</a>
        {nav.map(([label,href])=><a className={path===href?'active':''} aria-current={path===href?'page':undefined} key={href} href={href} onClick={navigate(href)}>{label}</a>)}
        <a className="nav-cta" href="/donation" onClick={navigate('/donation')}>Support the Trust <SupportIcon/></a>
      </nav>
      <div className="header-actions">
        <div className={`language-toggle ${language === 'te' ? 'language-toggle--te' : 'language-toggle--en'}`} role="group" aria-label="Language">
          <button className={language === 'en' ? 'active' : ''} onClick={() => setLanguage('en')} aria-pressed={language === 'en'}>EN</button>
          <button className={language === 'te' ? 'active' : ''} onClick={() => setLanguage('te')} aria-pressed={language === 'te'}>తెలుగు</button>
        </div>
        <button type="button" className="menu-button" onClick={()=>setMenu(!menu)} aria-label={menu?'Close menu':'Open menu'} aria-expanded={menu} aria-controls="site-navigation">{menu?'×':'☰'}</button>
      </div>
    </header>
  </></TranslatedContent>
}
function Footer(){return <TranslatedContent><footer className="footer"><div className="footer-grid wrap"><div><img className="footer-logo" src="/images/logo.png" alt=""/><p>A registered charitable trust serving hunger relief, dharma prachar and compassionate seva from Kalluru, Telangana.</p><a className="footer-cta" href="/donation">Join us in seva ↗</a></div><div><Eyebrow>Explore</Eyebrow><a href="/about">Our story</a><a href="/seva">Seva & activities</a><a href="/gallery">Gallery</a><a href="/donation">Donate</a></div><div><Eyebrow>Visit the trust</Eyebrow><p>7-62, Kalluru Vi., Kalluru Md.<br/>Khammam, Telangana – 507209</p><a href="mailto:jaihanumansevatrust@gmail.com">jaihanumansevatrust@gmail.com</a><a href="tel:+917095999915">+91 7095 9999 15</a></div></div><div className="footer-bottom wrap"><span>© 2026 Jai Hanuman Seva Trust</span><span>ॐ · Seva is worship</span></div></footer></TranslatedContent>}
function Intro({eyebrow,title,copy,tone='dark',singleRowTitle=false}:{eyebrow:string;title:React.ReactNode;copy:string;tone?:'dark'|'light';singleRowTitle?:boolean}){return <TranslatedContent><section className={`page-intro page-intro--${tone}`}><div className={`wrap intro-content${singleRowTitle?' same-row-heading__container':''}`}><Eyebrow>{eyebrow}</Eyebrow><h1 className={singleRowTitle?'same-row-heading':undefined}>{title}</h1><p>{copy}</p></div></section></TranslatedContent>}
function About(){return <TranslatedContent><><Intro eyebrow="The trust · 2023" title={<>A life of faith,<br/><i>offered in service.</i></>} copy="Jai Hanuman Seva Trust exists to translate devotion into practical compassion, preserving the values of dharma through daily action." tone="light"/><section className="section"><div className="wrap"><div className="two-col"><div><Eyebrow>Our story</Eyebrow><h2>Rooted in<br/><i>Hanuman's spirit.</i></h2><p>Founded in 2023, Jai Hanuman Seva Trust is a government-registered charitable organisation based in Kalluru, Telangana. Inspired by Lord Hanuman's courage, humility and unwavering service to Sri Rama, the trust works at the meeting point of spiritual life and human need.</p><p>Our seva includes Annadaan, scripture distribution, Goshala Seva, bhajans, satsang and cultural programmes.</p></div><figure className="about-devotional-figure"><img src="/images/hanuman/hanuman-3d-prayer.png" alt="AI devotional artwork of Lord Hanuman in prayer" loading="lazy"/><figcaption>Lord Hanuman in prayer</figcaption></figure></div><SevaIdentity context="about"/></div></section><section className="sand-section"><div className="wrap values"><div><Eyebrow>Mission</Eyebrow><h3>Serve with compassion.</h3><p>To nourish, support and uplift communities through Annadaan, spiritual education and compassionate care.</p></div><div><Eyebrow>Vision</Eyebrow><h3>Let dharma flourish.</h3><p>To create a culture where devotion inspires responsible action, shared learning and care for every living being.</p></div></div></section><section className="section"><div className="wrap"><Eyebrow>Registration & legal information</Eyebrow><h2>Transparent in<br/><i>our identity.</i></h2><div className="legal-grid">{[['Established','2023'],['Book 4 Doc No','6/2025'],['NGO ID','TG/00048783'],['Darpan','TS/2025/0768831'],['Unique Registration','BK04 6/2025'],['PAN (80G)','AAFTJ3275R'],['CSR','CSR00096404']].map(([l,v])=><div key={l}><span>{l}</span><strong>{v}</strong></div>)}</div></div></section></></TranslatedContent>}
function Seva(){return <TranslatedContent><><Intro eyebrow="Seva & activities" title={<>Six paths.<br/><i>One offering.</i></>} copy="From a warm meal to a shared chant, every activity is an invitation to serve with presence."/><section className="section seva-list"><div className="wrap">{activities.map(([title,text,img],i)=><article className={'seva-row '+(i%2?'reverse':'')} key={title}><div className="seva-photo"><img src={img} alt={`Trust-provided activity photographs associated with ${title}`} loading="lazy"/></div><div><Eyebrow>0{i+1} · Seva pillar</Eyebrow><h2>{title}</h2><p>{text}</p></div></article>)}</div></section><section className="dharma mini-dharma"><div className="wrap"><Eyebrow>Beyond the six pillars</Eyebrow><h2>Dharma Prachar</h2><p>Bhajans and music · Traditional dance · Yoga centres · Ramayana and Mahabharata Parayanam</p></div></section></></TranslatedContent>}
function Gallery({setLightbox}:{setLightbox:(v:string|null)=>void}){const [filter,setFilter]=useState('All Photos');const items=useMemo(()=>filter==='All Photos'?galleryItems:galleryItems.filter(x=>x.category===filter),[filter]);return <TranslatedContent><><Intro eyebrow="Documentary gallery" title={<>Seva, seen <i>in the world.</i></>} copy="Photographs published in the trust's activity collection, grouped by the activities named by the trust." tone="light" singleRowTitle/><section className="section gallery-section"><div className="wrap"><div className="filters">{galleryCategories.map(c=><button className={filter===c?'selected':''} key={c} onClick={()=>setFilter(c)}>{c}</button>)}</div><div className="gallery-grid">{items.map(item=><button className="gallery-item" key={item.src} onClick={()=>setLightbox(item.src)}><img src={item.src} alt={`Trust-provided activity photographs associated with ${item.category}`} loading="lazy"/><span><b>{item.category}</b><strong>{item.title}</strong></span></button>)}</div></div></section></></TranslatedContent>}
function Events(){return <TranslatedContent><><Intro eyebrow="Gatherings & festivals" title={<>When hearts<br/><i>gather.</i></>} copy="Festivals, satsangs and spiritual programmes will be announced here as dates are confirmed."/><section className="section empty-state"><div className="wrap"><span className="bell-mark">♢</span><Eyebrow>Events calendar</Eyebrow><h2>New gatherings<br/><i>will be announced soon.</i></h2><p>There are no upcoming events published at this time. Please check back for future satsangs, Annadaan programmes and festival observances.</p></div></section></></TranslatedContent>}
function CopyButton({value}:{value:string}){
  const [status,setStatus]=useState<'idle'|'copied'|'failed'>('idle')
  const copy=async()=>{
    try{
      if(!navigator.clipboard)throw new Error('Clipboard access is unavailable in this browser.')
      await navigator.clipboard.writeText(value)
      setStatus('copied')
    }catch(error){
      console.error('Unable to copy donation detail.',error)
      setStatus('failed')
    }
    window.setTimeout(()=>setStatus('idle'),1800)
  }
  return <TranslatedContent><button type="button" className="copy-button" onClick={()=>void copy()} aria-label={`${status==='copied'?'Copied':status==='failed'?'Copy failed':'Copy'} ${value}`} aria-live="polite">{status==='copied'?'Copied':status==='failed'?'Copy failed':'Copy'}</button></TranslatedContent>
}
function Donation(){
  const [amount,setAmount]=useState('501')
  const [customAmount,setCustomAmount]=useState('')
  const [status,setStatus]=useState('')
  const [isSubmitting,setIsSubmitting]=useState(false)
  const submit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const form=e.currentTarget
    setIsSubmitting(true)
    setStatus('Submitting securely…')
    try{
      const response=await fetch('/api/donations',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form).entries()))})
      const result:{ok?:boolean;error?:string}=await response.json()
      setStatus(response.ok&&result.ok?'Your offering has been recorded for verification.':result.error||'No record was created. Please use the bank or UPI details below.')
    }catch(error){
      console.error('Donation enquiry submission failed.',error)
      setStatus('The donation service is unavailable. No donation record was created.')
    }finally{
      setIsSubmitting(false)
    }
  }
  return <TranslatedContent><>
    <Intro eyebrow="Offerings" title={<>Give with<br/><i>devotion.</i></>} copy="Your support helps turn faith into food, learning, care and community." tone="light"/>
    <section className="section donation-page"><div className="wrap"><SevaIdentity context="donation"/><div className="two-col">
      <div className="donation-offering"><Eyebrow>Direct transfer</Eyebrow><h2 className="same-row-heading">Every offering <i>helps seva continue.</i></h2>
        <div className="bank"><h3>Union Bank of India · Kalluru</h3><p>Account number <strong>080011010000095</strong> <CopyButton value="080011010000095"/></p><p>IFSC <strong>UBIN0808008</strong> <CopyButton value="UBIN0808008"/></p></div>
        <div className="bank"><h3>HDFC Bank</h3><p>Account number <strong>50200114783410</strong> <CopyButton value="50200114783410"/></p><p>IFSC <strong>HDFC0006729</strong> <CopyButton value="HDFC0006729"/></p></div>
        <div className="upi"><img src="/images/donation-qr.jpg" alt="Official donation QR code"/><div><Eyebrow>UPI ID</Eyebrow><strong>7095999915-3@ybl</strong> <CopyButton value="7095999915-3@ybl"/></div></div>
        <p className="note">Please verify your transfer details before sending. Donation receipts and any tax documentation are subject to official trust verification.</p>
      </div>
      <div className="form-card"><Eyebrow>Donation enquiry</Eyebrow><h3>Tell us about your offering.</h3>
        <div className="amounts">{['501','1001','2501','5001'].map(x=><button type="button" className={amount===x&&!customAmount?'chosen':''} key={x} onClick={()=>{setAmount(x);setCustomAmount('')}}>₹{x}</button>)}</div>
        <form onSubmit={submit}>
          <input type="hidden" name="amount" value={amount}/>
          <label className="custom-amount-label">Custom amount (₹)<input className="custom-amount-input" type="number" min="1" max="10000000" step="1" inputMode="numeric" value={customAmount} onChange={event=>{setCustomAmount(event.target.value);setAmount(event.target.value||'501')}} placeholder="Enter any amount"/></label>
          <label>Name<input name="name" autoComplete="name" required/></label>
          <label>Phone<input name="phone" type="tel" autoComplete="tel" minLength={7} maxLength={30} required/></label>
          <label>Email<input name="email" type="email" autoComplete="email" required/></label>
          <label>Purpose<select name="purpose" defaultValue="General"><option value="Annadaan">Annadaan</option><option value="Goshala">Goshala</option><option value="Temple">Temple</option><option value="General">General</option><option value="Festival">Festival</option><option value="Poor Aid">Poor Aid</option></select></label>
          <button className="button full" disabled={isSubmitting}>{isSubmitting?'Submitting…':'Submit offering'} <Arrow/></button>
          {status&&<p className="form-status" role="status" aria-live="polite">{status}</p>}
        </form>
      </div>
    </div></div></section>
  </></TranslatedContent>}
function Contact(){
  const [status,setStatus]=useState('')
  const [isSubmitting,setIsSubmitting]=useState(false)
  const [sent,setSent]=useState(false)
  const submit=async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const form=e.currentTarget
    setIsSubmitting(true)
    setStatus('Sending enquiry…')
    try{
      const response=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(form).entries()))})
      const result:{ok?:boolean;error?:string}=await response.json()
      if(response.ok&&result.ok){
        setSent(true)
        setStatus('Thank you. Your enquiry has been sent.')
      }else{
        setSent(false)
        setStatus(result.error||'Your enquiry could not be sent. Please email the trust directly.')
      }
    }catch(error){
      console.error('Contact enquiry submission failed.',error)
      setSent(false)
      setStatus('The contact service is unavailable. Please email the trust directly.')
    }finally{
      setIsSubmitting(false)
    }
  }
  return <TranslatedContent><><Intro eyebrow="Come closer" title={<>Let us serve<br/><i>together.</i></>}   copy="For trust enquiries, seva collaboration and donation support, reach us at the details below."/><section className="section contact-page"><div className="wrap two-col"><div><Eyebrow>Visit or write to us</Eyebrow><h2>We would love<br/><i>to hear from you.</i></h2><div className="contact-details"><div><span>Address</span><p>7-62, Kalluru Vi., Kalluru Md.<br/>Khammam, Telangana – 507209</p></div><div><span>Email</span><a href="mailto:jaihanumansevatrust@gmail.com">jaihanumansevatrust@gmail.com</a></div><div><span>Phone</span><a href="tel:+917095999915">+91 7095 9999 15</a><a href="tel:+917095999916">+91 7095 9999 16</a></div><div><span>Office hours</span><p>Monday–Saturday · 9:00 AM–6:00 PM</p></div></div></div><form className="form-card" onSubmit={submit}><Eyebrow>Contact form</Eyebrow><label>Name<input name="name" autoComplete="name" required/></label><label>Phone<input name="phone" type="tel" autoComplete="tel" minLength={7} maxLength={30} required/></label><label>Email<input name="email" type="email" autoComplete="email" required/></label><label>Message<textarea name="message" required minLength={5} maxLength={4000} rows={5}/></label><button className="button full" disabled={isSubmitting}>{isSubmitting?'Sending…':sent?'Enquiry sent':'Send enquiry'} <Arrow/></button>{status&&<p className="form-status" role="status" aria-live="polite">{status}</p>}</form></div></section></></TranslatedContent>}
export default function App(){
  const { language } = useLanguage()
  const [path,setPath]=useState<Route>((window.location.pathname as Route)||'/')
  const [menu,setMenu]=useState(false)
  const [lightbox,setLightbox]=useState<string|null>(null)
  useEffect(()=>{
    const updatePath=()=>setPath((window.location.pathname as Route)||'/')
    window.addEventListener('popstate',updatePath)
    return()=>window.removeEventListener('popstate',updatePath)
  },[])
  useEffect(()=>{
    document.body.classList.toggle('no-scroll',!!lightbox)
    if(!lightbox)return
    const returnFocus=document.activeElement instanceof HTMLElement?document.activeElement:null
    const closeOnEscape=(event:KeyboardEvent)=>{if(event.key==='Escape')setLightbox(null)}
    window.addEventListener('keydown',closeOnEscape)
    document.querySelector<HTMLButtonElement>('.lightbox-close')?.focus()
    return()=>{
      window.removeEventListener('keydown',closeOnEscape)
      document.body.classList.remove('no-scroll')
      returnFocus?.focus()
    }
  },[lightbox])
  useEffect(()=>{
    const pageDetails:Record<Route,{title:string;description:string}>={
      '/':{title:'Jai Hanuman Seva Trust | Seva, Annadaan & Dharma Prachar',description:'Jai Hanuman Seva Trust — strength in devotion, compassion in service.'},
      '/about':{title:'About the Trust | Jai Hanuman Seva Trust',description:'Learn about Jai Hanuman Seva Trust, its story, mission, vision and registration information.'},
      '/seva':{title:'Seva & Activities | Jai Hanuman Seva Trust',description:'Explore Annadaan, Goshala Seva, Bhajan, Rathayatra, scripture distribution and satsang.'},
      '/gallery':{title:'Gallery | Jai Hanuman Seva Trust',description:'View moments from Jai Hanuman Seva Trust activities and devotional gatherings.'},
      '/events':{title:'Events | Jai Hanuman Seva Trust',description:'Find event updates and announcements from Jai Hanuman Seva Trust.'},
      '/donation':{title:'Donation | Jai Hanuman Seva Trust',description:'Learn how to support Jai Hanuman Seva Trust through the official bank and UPI details.'},
      '/contact':{title:'Contact | Jai Hanuman Seva Trust',description:'Contact Jai Hanuman Seva Trust for enquiries, seva collaboration and donation support.'}
    }
    document.title=translateText(pageDetails[path].title, language)
    const description=document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if(description)description.content=translateText(pageDetails[path].description, language)
  },[path,language])
  useEffect(()=>{
    if(!('IntersectionObserver'in window))return
    const revealItems=document.querySelectorAll<HTMLElement>('.reveal-card, .reveal-copy, .impact-item, .pillar-card, .event-card')
    const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)entry.target.classList.add('revealed')})},{threshold:0.12,rootMargin:'0px 0px -30px 0px'})
    revealItems.forEach(item=>observer.observe(item))
    return()=>observer.disconnect()
  },[path])
  const selectedImage=lightbox?galleryItems.find(item=>item.src===lightbox):undefined
  const content:React.ReactNode=path==='/'?<PremiumHome/>:path==='/about'?<About/>:path==='/seva'?<Seva/>:path==='/gallery'?<Gallery setLightbox={setLightbox}/>:path==='/events'?<Events/>:path==='/donation'?<Donation/>:<Contact/>
  return <TranslatedContent><div className="app">
    <Header path={path} menu={menu} setMenu={setMenu}/>
    <main>{content}</main>
    <Footer/>
    {lightbox&&<div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image preview" onClick={()=>setLightbox(null)}>
      <button type="button" className="lightbox-close" aria-label="Close image preview" onClick={()=>setLightbox(null)}>×</button>
      <img src={lightbox} alt={selectedImage?.title||'Enlarged trust gallery photograph'} onClick={event=>event.stopPropagation()}/>
    </div>}
  </div></TranslatedContent>
}
