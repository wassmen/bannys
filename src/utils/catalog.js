import products from '../data/products.json'
import categories from '../data/categories.json'
import sauces from '../data/sauces.json'
import extras from '../data/extras.json'
import config from '../data/config.json'

export { products, categories, sauces, extras, config }

export function getProductById(id) {
  return products.find((product) => product.id === id)
}

export function getCategoryById(id) {
  return categories.find((category) => category.id === id)
}

export function getSauceById(id) {
  return sauces.find((sauce) => sauce.id === id)
}

export function getExtraById(id) {
  return extras.find((extra) => extra.id === id)
}

export function getProductsByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return products
  return products.filter((product) => product.category === categoryId)
}

export function getBestSellers(limit = 8) {
  return products.filter((product) => product.bestSeller).slice(0, limit)
}

export function getRelatedProducts(product, limit = 4) {
  const sameCategory = products.filter(
    (candidate) => candidate.category === product.category && candidate.id !== product.id,
  )
  const bestSellers = products.filter(
    (candidate) =>
      candidate.id !== product.id &&
      candidate.bestSeller &&
      !sameCategory.some((item) => item.id === candidate.id),
  )
  return [...sameCategory, ...bestSellers].slice(0, limit)
}

const categoryNameKey = { fr: 'nameFr', en: 'nameEn', ar: 'nameAr' }
const categoryDescriptionKey = {
  fr: 'descriptionFr',
  en: 'descriptionEn',
  ar: 'descriptionAr',
}

export function getCategoryName(category, language = 'fr') {
  if (!category) return ''
  return category[categoryNameKey[language] || 'nameFr'] || category.nameFr
}

export function getCategoryDescription(category, language = 'fr') {
  if (!category) return ''
  return (
    category[categoryDescriptionKey[language] || 'descriptionFr'] ||
    category.descriptionFr
  )
}

const ingredientEmojis = [
  [/pain|brioch|galette|pâte|tortilla/i, '🍞'],
  [/steak|viande|kebab|merguez/i, '🥩'],
  [/poulet|tender|wing|aile/i, '🍗'],
  [/cheddar|mozzarella|fromage|fromag/i, '🧀'],
  [/salade|laitue|roquette/i, '🥬'],
  [/tomate/i, '🍅'],
  [/oignon/i, '🧅'],
  [/cornichon/i, '🥒'],
  [/frite|pomme de terre|patate/i, '🍟'],
  [/œuf|oeuf/i, '🍳'],
  [/champignon/i, '🍄'],
  [/bacon|pepperoni/i, '🥓'],
  [/jalape|harissa|piment/i, '🌶️'],
  [/olive/i, '🫒'],
  [/poivron/i, '🫑'],
  [/thon|poisson/i, '🐟'],
  [/chocolat|brownie|cookie|noix/i, '🍫'],
  [/glace|lait|chantilly|milkshake/i, '🥛'],
  [/eau/i, '💧'],
  [/coca|fanta|boisson/i, '🥤'],
  [/sauce|mayonnaise|ketchup/i, '🥫'],
  [/origan|basilic|ciboulette/i, '🌿'],
  [/fleur|farine|sucre/i, '🌾'],
]

export function ingredientEmoji(name = '') {
  const match = ingredientEmojis.find(([pattern]) => pattern.test(name))
  return match ? match[1] : '✨'
}

export function getSizeLabel(product, sizeId) {
  if (!product?.sizes?.length) return null
  return product.sizes.find((size) => size.id === sizeId) || product.sizes[0]
}
