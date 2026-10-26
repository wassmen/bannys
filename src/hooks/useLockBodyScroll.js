import { useEffect } from 'react'

/**
 * Locks page scroll while a drawer or mobile menu is open,
 * without causing a layout jump when the scrollbar disappears.
 */
export default function useLockBodyScroll(locked) {
  useEffect(() => {
    if (!locked) return undefined

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const previousOverflow = document.body.style.overflow
    const previousPadding = document.body.style.paddingRight

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPadding
    }
  }, [locked])
}
