import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const products = JSON.parse(fs.readFileSync(path.join(root, 'src/data/products.json'), 'utf8'))
const categories = JSON.parse(fs.readFileSync(path.join(root, 'src/data/categories.json'), 'utf8'))

const palette = {
  ink: '#1E1412',
  cream: '#FFFBF2',
  red: '#E4163A',
  sky: '#29B6E8',
  peach: '#FBD9C4',
  yellow: '#F6C445',
}

const escapeXml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')

const commonDefs = `
  <defs>
    <pattern id="freckles" width="46" height="46" patternUnits="userSpaceOnUse">
      <circle cx="5" cy="5" r="3.5" fill="${palette.ink}" opacity="0.08"/>
    </pattern>
    <pattern id="stripes" width="56" height="56" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="28" height="56" fill="#FFFFFF" opacity="0.35"/>
      <rect x="28" width="28" height="56" fill="${palette.sky}" opacity="0.18"/>
    </pattern>
  </defs>`

const label = (title, subtitle = '') => `
  <g transform="translate(400 522)">
    <rect x="-310" y="-46" width="620" height="82" rx="26" fill="${palette.ink}"/>
    <text x="0" y="2" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="34" fill="${palette.cream}" letter-spacing="0.5">${escapeXml(title)}</text>
    ${subtitle ? `<text x="0" y="200" text-anchor="middle" font-family="Arial, sans-serif" font-weight="700" font-size="20" fill="${palette.ink}" opacity="0.55">${escapeXml(subtitle)}</text>` : ''}
  </g>`

const burger = `
  <g stroke="${palette.ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
    <path d="M252 238 Q252 128 400 128 Q548 128 548 238 L548 248 Q400 282 252 248 Z" fill="#F0A63A"/>
    <ellipse cx="330" cy="184" rx="11" ry="6" fill="${palette.cream}" stroke="none"/>
    <ellipse cx="400" cy="162" rx="11" ry="6" fill="${palette.cream}" stroke="none"/>
    <ellipse cx="468" cy="187" rx="11" ry="6" fill="${palette.cream}" stroke="none"/>
    <path d="M240 264 Q270 296 300 268 Q330 240 360 268 Q390 296 420 268 Q450 240 480 268 Q510 296 540 268 Q555 256 562 270" fill="#7CC576"/>
    <path d="M252 288 L548 288 L520 326 L280 326 Z" fill="${palette.yellow}"/>
    <rect x="252" y="326" width="296" height="42" rx="20" fill="#6B3E26"/>
    <path d="M252 382 L548 382 Q548 440 400 440 Q252 440 252 382 Z" fill="#E0993A"/>
  </g>`

const taco = `
  <g stroke="${palette.ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
    <path d="M208 356 L258 188 Q400 148 542 188 L592 356 Q530 310 470 320 Q430 328 400 340 Q370 328 330 320 Q270 310 208 356 Z" fill="#F2C14E"/>
    <path d="M246 282 Q280 318 314 286 Q348 254 382 286 Q416 318 450 286 Q484 254 518 286 Q540 302 558 288" fill="#7CC576"/>
    <circle cx="315" cy="312" r="25" fill="#E4163A"/>
    <circle cx="400" cy="326" r="27" fill="#E4163A"/>
    <circle cx="485" cy="312" r="25" fill="#E4163A"/>
    <path d="M290 350 Q330 326 370 350 Q330 366 290 350 Z" fill="#6B3E26"/>
    <path d="M430 350 Q470 326 510 350 Q470 366 430 350 Z" fill="#6B3E26"/>
    <path d="M330 370 Q400 396 470 370" fill="none" stroke="#F6C445" stroke-width="16"/>
  </g>`

const sandwich = `
  <g stroke="${palette.ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
    <path d="M228 240 Q228 158 400 158 Q572 158 572 240 Z" fill="#F0A63A"/>
    <path d="M228 240 Q300 262 400 248 Q500 234 572 240 L548 280 Q400 302 252 280 Z" fill="#7CC576"/>
    <rect x="250" y="278" width="300" height="32" rx="16" fill="${palette.yellow}"/>
    <rect x="258" y="306" width="284" height="38" rx="18" fill="#6B3E26"/>
    <circle cx="320" cy="300" r="18" fill="#E4163A"/>
    <circle cx="400" cy="302" r="18" fill="#E4163A"/>
    <circle cx="480" cy="300" r="18" fill="#E4163A"/>
    <path d="M250 342 L550 342 Q550 424 400 424 Q250 424 250 342 Z" fill="#E0993A"/>
  </g>`

const pizza = `
  <g stroke="${palette.ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="400" cy="285" r="192" fill="#E8A93C"/>
    <circle cx="400" cy="285" r="162" fill="#D9482B"/>
    <circle cx="400" cy="285" r="150" fill="${palette.yellow}"/>
    <circle cx="338" cy="232" r="25" fill="#C8102E" stroke-width="8"/>
    <circle cx="462" cy="220" r="25" fill="#C8102E" stroke-width="8"/>
    <circle cx="340" cy="330" r="25" fill="#C8102E" stroke-width="8"/>
    <circle cx="480" cy="328" r="25" fill="#C8102E" stroke-width="8"/>
    <circle cx="407" cy="280" r="25" fill="#C8102E" stroke-width="8"/>
    <path d="M312 282 q24 -30 48 0 q-24 20 -48 0 Z" fill="#5F8D4E" stroke-width="6"/>
    <path d="M448 272 q24 -30 48 0 q-24 20 -48 0 Z" fill="#5F8D4E" stroke-width="6"/>
    <path d="M300 405 L500 165 M240 350 L560 220 M290 430 L535 290" stroke="${palette.cream}" stroke-width="7" opacity="0.55"/>
  </g>`

const chicken = `
  <g stroke="${palette.ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
    <path d="M468 170 Q556 158 586 232 Q612 300 556 352 Q500 404 430 376 Q360 348 356 290 Q350 230 408 200 Q438 184 468 170 Z" fill="#C77B3A"/>
    <path d="M382 386 Q330 430 286 470" fill="none" stroke="${palette.cream}" stroke-width="34"/>
    <path d="M382 386 Q330 430 286 470" fill="none" stroke="${palette.ink}" stroke-width="10"/>
    <circle cx="286" cy="470" r="24" fill="${palette.cream}"/>
    <circle cx="500" cy="264" r="17" fill="#E0993A" stroke-width="7"/>
    <circle cx="456" cy="330" r="14" fill="#E0993A" stroke-width="7"/>
    <circle cx="540" cy="316" r="12" fill="#E0993A" stroke-width="7"/>
    <path d="M210 190 l12 28 l30 4 l-22 20 l7 30 l-27 -16 l-27 16 l7 -30 l-22 -20 l30 -4 Z" fill="${palette.red}" stroke-width="7"/>
  </g>`

const fries = `
  <g stroke="${palette.ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
    <rect x="300" y="150" width="40" height="170" rx="12" transform="rotate(-12 320 235)" fill="#F6C445"/>
    <rect x="360" y="126" width="40" height="190" rx="12" fill="#F6C445"/>
    <rect x="425" y="142" width="40" height="175" rx="12" transform="rotate(9 445 230)" fill="#F6C445"/>
    <rect x="480" y="166" width="40" height="155" rx="12" transform="rotate(16 500 243)" fill="#F6C445"/>
    <path d="M270 240 L530 240 L492 452 L308 452 Z" fill="${palette.red}"/>
    <path d="M294 300 L506 300" stroke="${palette.cream}" stroke-width="18"/>
    <path d="M400 320 l-34 48 l22 0 l-14 32 l52 -56 l-24 0 l18 -24 Z" fill="${palette.cream}" stroke-width="6"/>
  </g>`

const drink = `
  <g stroke="${palette.ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
    <path d="M330 132 L470 132 L450 212 L350 212 Z" fill="${palette.cream}"/>
    <path d="M460 112 L540 62" stroke="${palette.red}" stroke-width="22"/>
    <path d="M460 112 L540 62" stroke="${palette.ink}" stroke-width="8" opacity="0.6"/>
    <path d="M316 220 L484 220 L452 454 Q400 474 348 454 Z" fill="${palette.sky}"/>
    <path d="M300 220 L500 220 L496 262 L304 262 Z" fill="${palette.cream}"/>
    <path d="M336 286 L376 286" stroke="${palette.cream}" stroke-width="14"/>
    <path d="M352 310 L448 310" stroke="${palette.cream}" stroke-width="14" opacity="0.7"/>
    <circle cx="400" cy="370" r="34" fill="${palette.cream}" stroke-width="8"/>
    <text x="400" y="383" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-weight="900" font-size="34" fill="${palette.red}" stroke="none">B</text>
  </g>`

const dessert = `
  <g stroke="${palette.ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
    <rect x="260" y="204" width="280" height="236" rx="34" fill="#6B3E26"/>
    <path d="M260 280 Q320 240 380 286 Q440 330 540 270 L540 406 Q540 440 506 440 L294 440 Q260 440 260 406 Z" fill="#4B2919"/>
    <path d="M300 250 q40 30 80 0 q40 30 80 0 q30 22 60 6" fill="none" stroke="#A86B3C" stroke-width="18"/>
    <circle cx="344" cy="344" r="19" fill="#E4B363" stroke-width="7"/>
    <circle cx="420" cy="386" r="17" fill="#E4B363" stroke-width="7"/>
    <circle cx="470" cy="332" r="15" fill="#E4B363" stroke-width="7"/>
    <path d="M380 160 q40 -44 80 0 q-40 22 -80 0 Z" fill="${palette.red}" stroke-width="8"/>
    <path d="M420 156 q8 -34 42 -44" fill="none" stroke="#5F8D4E" stroke-width="10"/>
  </g>`

const combo = `
  <g stroke="${palette.ink}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">
    <g transform="translate(58 10) scale(0.7)">
      ${burger.replaceAll('stroke-width="10"', 'stroke-width="12"')}
    </g>
    <g transform="translate(388 50) scale(0.62)">
      ${fries.replaceAll('stroke-width="10"', 'stroke-width="13"')}
    </g>
    <g transform="translate(120 10) scale(0.55)">
      ${drink.replaceAll('stroke-width="10"', 'stroke-width="14"')}
    </g>
  </g>`

const art = { burgers: burger, tacos: taco, sandwiches: sandwich, pizza, chicken, 'fries-sides': fries, drinks: drink, desserts: dessert, combos: combo }

const categoryLabel = {
  burgers: 'BURGERS',
  tacos: 'TACOS',
  sandwiches: 'SANDWICHES',
  pizza: 'PIZZAS',
  chicken: 'CHICKEN',
  'fries-sides': 'FRIES & SIDES',
  drinks: 'DRINKS',
  desserts: 'DESSERTS',
  combos: 'COMBOS',
}

const buildSvg = ({ title, category, subtitle = '' }) => {
  const artMarkup = art[category] || burger
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600" role="img" aria-label="${escapeXml(title)}">
  ${commonDefs}
  <rect width="800" height="600" fill="${palette.cream}"/>
  <rect width="800" height="600" fill="url(#freckles)"/>
  <circle cx="128" cy="120" r="88" fill="${palette.peach}" opacity="0.75"/>
  <circle cx="694" cy="178" r="64" fill="${palette.sky}" opacity="0.18"/>
  <path d="M0 486 Q200 440 400 486 T800 486 L800 600 L0 600 Z" fill="url(#stripes)" opacity="0.6"/>
  ${artMarkup}
  ${label(title, subtitle)}
</svg>`
}

const write = (relative, content) => {
  const full = path.join(root, relative)
  fs.mkdirSync(path.dirname(full), { recursive: true })
  fs.writeFileSync(full, content)
}

for (const category of categories) {
  write(
    `public/images/products/category-${category.id}.svg`,
    buildSvg({ title: categoryLabel[category.id] || category.nameFr, category: category.id }),
  )
}

for (const product of products) {
  const relative = product.image.replace(/^\//, '')
  write(`public/${relative}`, buildSvg({ title: product.name, category: product.category, subtitle: 'BENNY\'S • BOUIRA' }))
}

console.log(`Generated ${products.length} product placeholders and ${categories.length} category placeholders.`)
