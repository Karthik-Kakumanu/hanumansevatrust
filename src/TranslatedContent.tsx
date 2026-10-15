import { cloneElement, Fragment, isValidElement, type ReactNode } from 'react'
import { useLanguage } from './LanguageContext'
import { translateAttribute, translateText } from './data/uiTranslations'

function translateNode(node: ReactNode, language: 'en' | 'te'): ReactNode {
  if (typeof node === 'string') return translateText(node, language)
  if (Array.isArray(node)) return node.map(child => translateNode(child, language))
  if (!isValidElement<{ children?: ReactNode; value?: unknown }>(node)) return node

  if (typeof node.type !== 'string' && node.type !== Fragment) return node

  const props: Record<string, unknown> = {}
  for (const [name, value] of Object.entries(node.props)) {
    if (name === 'children') continue
    if (typeof value === 'string' && ['alt', 'aria-label', 'aria-description', 'placeholder', 'title'].includes(name)) {
      props[name] = translateAttribute(name, value, language)
    }
  }
  if (node.type === 'option' && typeof node.props.value !== 'string' && typeof node.props.children === 'string') {
    props.value = node.props.children
  }

  const children = translateNode(node.props.children, language)
  return Array.isArray(children)
    ? cloneElement(node, props, ...children)
    : cloneElement(node, props, children)
}

export default function TranslatedContent({ children }: { children: ReactNode }) {
  const { language } = useLanguage()
  return <>{translateNode(children, language)}</>
}
