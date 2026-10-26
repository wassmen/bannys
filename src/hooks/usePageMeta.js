import { useEffect } from 'react'

function setMeta(attribute, key, content) {
  if (!content) return
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

/**
 * Lightweight client-side SEO for a Vite SPA.
 * Updates the title, description and social preview tags per page.
 */
export default function usePageMeta({ title, description, image } = {}) {
  useEffect(() => {
    if (title) {
      document.title = title
      setMeta('property', 'og:title', title)
      setMeta('name', 'twitter:title', title)
    }

    if (description) {
      setMeta('name', 'description', description)
      setMeta('property', 'og:description', description)
      setMeta('name', 'twitter:description', description)
    }

    if (image) {
      setMeta('property', 'og:image', image)
      setMeta('name', 'twitter:image', image)
    }

    setMeta('property', 'og:url', window.location.href)
  }, [title, description, image])
}
