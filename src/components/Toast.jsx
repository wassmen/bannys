import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCart } from '../context/CartContext'
import Icon from './Icon'

export default function Toast() {
  const { toast, dismissToast } = useCart()
  const reduceMotion = useReducedMotion()

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[70] flex justify-center px-4 sm:bottom-8"
    >
      <AnimatePresence>
        {toast ? (
          <motion.div
            key={toast.id}
            role="status"
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 10, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto flex max-w-md items-center gap-3 rounded-2xl border-[3px] border-ink bg-ink px-4 py-3 text-cream shadow-retro"
          >
            <span
              className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-cream ${
                toast.type === 'info' ? 'bg-sky' : 'bg-mint'
              } text-ink`}
            >
              <Icon name={toast.type === 'info' ? 'info' : 'check'} size={18} strokeWidth={3} />
            </span>
            <p className="flex-1 text-sm font-semibold">{toast.message}</p>
            <button
              type="button"
              onClick={dismissToast}
              aria-label="Fermer"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-cream/70 transition hover:bg-cream/10 hover:text-cream"
            >
              <Icon name="close" size={16} strokeWidth={2.6} />
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
