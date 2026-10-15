import { useEffect } from 'react'

export default function HeroBellController() {
  useEffect(() => {
    const update = () => {
      const bells = document.querySelectorAll<HTMLElement>('.hero .temple-bell')
      const visible = window.scrollY <= 50 && document.querySelector('.hero') !== null
      bells.forEach((bell) => bell.classList.toggle('is-visible', visible))
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  return null
}
