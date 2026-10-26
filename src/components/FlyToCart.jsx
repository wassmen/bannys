import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useCart } from '../context/CartContext'

/**
 * Animates a small product image from the click point to the navbar cart icon.
 * Uses a fixed-position overlay and only animates transform/opacity.
 */
export default function FlyToCart() {
  const { fly, clearFly } = useCart()
  const reduceMotion = useReducedMotion()
  const [target, setTarget] = useState(null)

  useEffect(() => {
    if (!fly) {
      setTarget(null)
      return
    }

    if (reduceMotion) {
      clearFly()
      return
    }

    const frame = window.requestAnimationFrame(() => {
      const cartTarget = document.querySelector('[data-cart-target="true"]')
      if (!cartTarget) {
        clearFly()
        return
      }
      const rect = cartTarget.getBoundingClientRect()
      setTarget({
        x: rect.left + rect.width / 2 - fly.x,
        y: rect.top + rect.height / 2 - fly.y,
      })
    })

    return () => window.cancelAnimationFrame(frame)
  }, [fly, reduceMotion, clearFly])

  if (!fly || !target || reduceMotion) return null

  return (
    <motion.img
      key={fly.id}
      src={fly.image}
      alt=""
      aria-hidden="true"
      initial={{ x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 }}
      animate={{ x: target.x, y: target.y, scale: 0.18, opacity: 0.15, rotate: 18 }}
      transition={{ duration: 0.68, ease: [0.2, 0.75, 0.2, 1] }}
      onAnimationComplete={clearFly}
      style={{ left: fly.x - 32, top: fly.y - 32 }}
      className="pointer-events-none fixed z-[80] h-16 w-16 rounded-full border-[3px] border-ink bg-cream object-cover shadow-retro"
    />
  )
}
