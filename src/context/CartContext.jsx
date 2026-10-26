import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react'
import { useLanguage } from './LanguageContext'
import { getProductById } from '../utils/catalog'
import {
  buildSelectionKey,
  calculateUnitPrice,
  uniqueIds,
} from '../utils/pricing'
import { calculateSubtotal, countItems } from '../utils/calculateTotal'

const CartContext = createContext(null)
const STORAGE_KEY = 'bennys-cart-v1'
const MAX_QUANTITY = 20

function clampQuantity(value) {
  const quantity = Number(value) || 1
  return Math.min(MAX_QUANTITY, Math.max(1, Math.round(quantity)))
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'LOAD':
      return { ...state, items: action.items }
    case 'ADD': {
      const existing = state.items.find((item) => item.key === action.item.key)
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.key === action.item.key
              ? { ...item, quantity: clampQuantity(item.quantity + action.item.quantity) }
              : item,
          ),
        }
      }
      return { ...state, items: [...state.items, action.item] }
    }
    case 'SET_QUANTITY':
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.key === action.key
              ? { ...item, quantity: clampQuantity(action.quantity) }
              : item,
          )
          .filter((item) => item.quantity > 0),
      }
    case 'REMOVE':
      return { ...state, items: state.items.filter((item) => item.key !== action.key) }
    case 'CLEAR':
      return { ...state, items: [] }
    default:
      return state
  }
}

function hydrateItem(raw) {
  if (!raw || typeof raw !== 'object') return null
  const product = getProductById(raw.productId)
  if (!product) return null

  const selection = {
    sizeId: raw.sizeId,
    sauceIds: Array.isArray(raw.sauceIds) ? uniqueIds(raw.sauceIds) : [],
    extraIds: Array.isArray(raw.extraIds) ? uniqueIds(raw.extraIds) : [],
    removedIngredients: Array.isArray(raw.removedIngredients) ? raw.removedIngredients : [],
    combo: Boolean(raw.combo),
    instructions: typeof raw.instructions === 'string' ? raw.instructions.slice(0, 250) : '',
  }

  return {
    key: buildSelectionKey(product.id, selection),
    productId: product.id,
    name: product.name,
    image: product.image,
    quantity: clampQuantity(raw.quantity),
    sizeId: selection.sizeId || product.sizes?.[0]?.id || null,
    sauceIds: selection.sauceIds,
    extraIds: selection.extraIds,
    removedIngredients: selection.removedIngredients,
    combo: selection.combo && product.comboAvailable,
    instructions: selection.instructions,
    unitPrice: calculateUnitPrice(product, selection),
  }
}

function loadItems() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
    if (!Array.isArray(stored)) return []
    const items = []
    const keys = new Set()
    stored.forEach((raw) => {
      const item = hydrateItem(raw)
      if (item && !keys.has(item.key)) {
        keys.add(item.key)
        items.push(item)
      }
    })
    return items
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const { t } = useLanguage()
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  const [isOpen, setIsOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const [fly, setFly] = useState(null)
  const toastTimer = useRef(null)

  useEffect(() => {
    dispatch({ type: 'LOAD', items: loadItems() })
  }, [])

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch {
      // localStorage can be unavailable in private mode; the cart still works in memory.
    }
  }, [state.items])

  useEffect(
    () => () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current)
    },
    [],
  )

  const notify = useCallback((message, type = 'success') => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    setToast({ id: Date.now(), message, type })
    toastTimer.current = window.setTimeout(() => setToast(null), 3200)
  }, [])

  const dismissToast = useCallback(() => {
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    setToast(null)
  }, [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])
  const toggleCart = useCallback(() => setIsOpen((open) => !open), [])

  const addItem = useCallback(
    (product, selection = {}) => {
      if (!product) return null

      const options = {
        sizeId: selection.sizeId || product.sizes?.[0]?.id || null,
        sauceIds: uniqueIds(selection.sauceIds),
        extraIds: uniqueIds(selection.extraIds),
        removedIngredients: selection.removedIngredients || [],
        combo: Boolean(selection.combo && product.comboAvailable),
        instructions: (selection.instructions || '').trim().slice(0, 250),
      }

      const item = {
        key: buildSelectionKey(product.id, options),
        productId: product.id,
        name: product.name,
        image: product.image,
        quantity: clampQuantity(selection.quantity),
        ...options,
        unitPrice: calculateUnitPrice(product, options),
      }

      dispatch({ type: 'ADD', item })
      notify(t('common.addedToCart', { name: product.name }))
      return item
    },
    [notify, t],
  )

  const removeItem = useCallback(
    (key) => {
      const item = state.items.find((entry) => entry.key === key)
      dispatch({ type: 'REMOVE', key })
      if (item) notify(t('common.removedFromCart', { name: item.name }), 'info')
    },
    [notify, state.items, t],
  )

  const setQuantity = useCallback((key, quantity) => {
    dispatch({ type: 'SET_QUANTITY', key, quantity })
  }, [])

  const incrementItem = useCallback(
    (key) => {
      const item = state.items.find((entry) => entry.key === key)
      if (item) dispatch({ type: 'SET_QUANTITY', key, quantity: item.quantity + 1 })
    },
    [state.items],
  )

  const decrementItem = useCallback(
    (key) => {
      const item = state.items.find((entry) => entry.key === key)
      if (item && item.quantity > 1) {
        dispatch({ type: 'SET_QUANTITY', key, quantity: item.quantity - 1 })
      }
    },
    [state.items],
  )

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), [])

  const flyToCart = useCallback((point, image) => {
    if (!point) return
    setFly({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      x: point.x,
      y: point.y,
      image,
    })
  }, [])

  const clearFly = useCallback(() => setFly(null), [])

  const value = useMemo(
    () => ({
      items: state.items,
      itemCount: countItems(state.items),
      subtotal: calculateSubtotal(state.items),
      isOpen,
      toast,
      fly,
      addItem,
      removeItem,
      setQuantity,
      incrementItem,
      decrementItem,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
      notify,
      dismissToast,
      flyToCart,
      clearFly,
    }),
    [
      state.items,
      isOpen,
      toast,
      fly,
      addItem,
      removeItem,
      setQuantity,
      incrementItem,
      decrementItem,
      clearCart,
      openCart,
      closeCart,
      toggleCart,
      notify,
      dismissToast,
      flyToCart,
      clearFly,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
