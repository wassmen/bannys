const icons = {
  cart: (
    <>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L21 7H6" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  minus: <path d="M5 12h14" />,
  trash: (
    <>
      <path d="M4 7h16" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M6 7l1 13h10l1-13" />
      <path d="M9 7V4h6v3" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  arrowLeft: (
    <>
      <path d="M19 12H5" />
      <path d="M11 6l-6 6 6 6" />
    </>
  ),
  arrowUpRight: (
    <>
      <path d="M7 17L17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  check: <path d="M5 12l5 5L20 6" />,
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l3 3 5-6" />
    </>
  ),
  phone: (
    <path d="M5 3h3l2 5-2 1a13 13 0 0 0 7 7l1-2 5 2v3a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z" />
  ),
  whatsapp: (
    <>
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 21l1.8-4.8a8.5 8.5 0 1 1 15.7-4.5z" />
      <path d="M8.4 8.2c.3-.5 1.3-.5 1.6 0l.8 1.3c.1.2.1.5-.1.8l-.6.7c.7 1.3 1.7 2.3 3 3l.7-.6c.2-.2.5-.2.7-.1l1.3.8c.5.3.5 1.3 0 1.6-1.3.8-3 .3-4.7-1.1a11 11 0 0 1-3.4-4.7c-.3-1-.1-1.5.7-1.7z" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path d="M15 8h2V4h-2c-3 0-5 2-5 5v2H7v4h3v7h4v-7h3l1-4h-4V9c0-.6.4-1 1-1z" />
  ),
  tiktok: (
    <>
      <path d="M14 4v10a4 4 0 1 1-3-3.9" />
      <path d="M14 4c.6 2.7 2.4 4.3 5 4.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  star: <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3 6.4 20.2l1.1-6.2L3 9.6l6.2-.9L12 3z" fill="currentColor" />,
  flame: (
    <path d="M12 3s1 4 4.5 6.5A6.5 6.5 0 1 1 5.5 14C5.5 9 12 8 12 3z" />
  ),
  truck: (
    <>
      <path d="M3 6h11v10H3z" />
      <path d="M14 9h4l3 3v4h-7z" />
      <circle cx="7" cy="18" r="1.7" />
      <circle cx="18" cy="18" r="1.7" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4c-8 0-14 4-14 10a6 6 0 0 0 6 6c6 0 8-7 8-16z" />
      <path d="M4 21c2-6 6-9 12-11" />
    </>
  ),
  share: (
    <>
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="M8.2 10.8l7.6-4.4" />
      <path d="M8.2 13.2l7.6 4.4" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-4-4" />
    </>
  ),
  chevronDown: <path d="M6 9l6 6 6-6" />,
  chevronLeft: <path d="M15 5l-7 7 7 7" />,
  chevronRight: <path d="M9 5l7 7-7 7" />,
  sparkles: (
    <>
      <path d="M12 3l1.4 4.6L18 9l-4.6 1.4L12 15l-1.4-4.6L6 9l4.6-1.4L12 3z" />
      <path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15z" />
      <path d="M5 3l.6 2L8 5.6 6 6.2 5 8l-.6-1.8L2 5.6 4 5 5 3z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l8 3v5c0 5-3.4 8.6-8 10-4.6-1.4-8-5-8-10V6l8-3z" />
      <path d="M9 12l2 2 4-5" />
    </>
  ),
  card: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M3 10h18" />
      <path d="M7 15h3" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14l1 13H4L5 8z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3l10 18H2L12 3z" />
      <path d="M12 9v5" />
      <circle cx="12" cy="17.5" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <circle cx="12" cy="7.8" r="0.9" fill="currentColor" stroke="none" />
    </>
  ),
  home: (
    <>
      <path d="M3 11l9-8 9 8" />
      <path d="M5 10v10h14V10" />
      <path d="M9 20v-6h6v6" />
    </>
  ),
  utensils: (
    <>
      <path d="M7 3v7a2 2 0 0 0 4 0V3" />
      <path d="M9 10v11" />
      <path d="M17 3c-2 2-2 5-2 7a2 2 0 0 0 4 0c0-2 0-5-2-7z" />
      <path d="M17 12v9" />
    </>
  ),
  scooter: (
    <>
      <circle cx="6" cy="17" r="3" />
      <circle cx="18" cy="17" r="3" />
      <path d="M9 17h6l3-8h2" />
      <path d="M14 6h3l1 3" />
    </>
  ),
  heart: <path d="M12 21s-8-4.5-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 6.5-8 11-8 11z" />,
  copy: (
    <>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M20 4L10 14" />
      <path d="M20 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h5" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3c2.5 3 2.5 15 0 18" />
      <path d="M12 3c-2.5 3-2.5 15 0 18" />
    </>
  ),
  send: (
    <>
      <path d="M21 3L3 10l7 3 3 7 8-17z" />
      <path d="M10 13l5-5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20v-2a6 6 0 0 1 12 0v2" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M17 14a5 5 0 0 1 4 5v1" />
    </>
  ),
}

export default function Icon({
  name,
  size = 24,
  strokeWidth = 2.2,
  className = '',
  title,
  ...props
}) {
  const content = icons[name]
  if (!content) return null

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {content}
    </svg>
  )
}
