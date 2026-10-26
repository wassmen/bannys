import { motion, useReducedMotion } from 'framer-motion'

/** Scroll-reveal wrapper that respects prefers-reduced-motion. */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className = '',
  once = true,
  amount = 0.2,
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.42, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
