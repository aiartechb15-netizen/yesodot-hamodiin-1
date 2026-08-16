// אייקוני קו פשוטים — currentColor בלבד, ללא צבע מיותר.
const P = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }

const paths = {
  file: (
    <>
      <path {...P} d="M7 3.5h6.5L17 7v13.5H7z" />
      <path {...P} d="M13.5 3.5V7H17" />
      <path {...P} d="M9.5 12h5M9.5 15.5h5" />
    </>
  ),
  book: (
    <>
      <path {...P} d="M12 6.5c-1.7-1.3-3.7-2-6-2v12c2.3 0 4.3.7 6 2 1.7-1.3 3.7-2 6-2v-12c-2.3 0-4.3.7-6 2z" />
      <path {...P} d="M12 6.5v12" />
    </>
  ),
  link: (
    <>
      <path {...P} d="M10.5 13.5a3.5 3.5 0 0 0 5 0l2.5-2.5a3.5 3.5 0 0 0-5-5l-1 1" />
      <path {...P} d="M13.5 10.5a3.5 3.5 0 0 0-5 0L6 13a3.5 3.5 0 0 0 5 5l1-1" />
    </>
  ),
  target: (
    <>
      <circle {...P} cx="12" cy="12" r="7.5" />
      <circle {...P} cx="12" cy="12" r="3.5" />
      <path {...P} d="M12 4.5v-2M12 21.5v-2M4.5 12h-2M21.5 12h-2" />
    </>
  ),
  people: (
    <>
      <circle {...P} cx="9.5" cy="9" r="2.8" />
      <path {...P} d="M4.5 19c0-2.6 2.2-4.5 5-4.5s5 1.9 5 4.5" />
      <path {...P} d="M15.5 7.2a2.6 2.6 0 0 1 0 5" />
      <path {...P} d="M16.5 14.9c1.8.5 3 2 3 4.1" />
    </>
  ),
  map: (
    <>
      <path {...P} d="M3.5 6.5 9 4.5l6 2 5.5-2v13l-5.5 2-6-2-5.5 2z" />
      <path {...P} d="M9 4.5v13M15 6.5v13" />
    </>
  ),
  news: (
    <>
      <path {...P} d="M4 6h13v13H5.5A1.5 1.5 0 0 1 4 17.5z" />
      <path {...P} d="M17 9h3v8.5a1.5 1.5 0 0 1-3 0z" />
      <path {...P} d="M7 9.5h7M7 13h7M7 16h4" />
    </>
  ),
  chart: (
    <>
      <path {...P} d="M4 19.5h16" />
      <path {...P} d="M7 16v-4M11.5 16V7M16 16v-6.5" />
    </>
  ),
  building: (
    <>
      <path {...P} d="M5 20V6.5L12 4l7 2.5V20" />
      <path {...P} d="M3.5 20h17" />
      <path {...P} d="M9 10.5h1.5M13.5 10.5H15M9 14h1.5M13.5 14H15" />
      <path {...P} d="M10.5 20v-3h3v3" />
    </>
  ),
  shield: (
    <>
      <path {...P} d="M12 3.5 19 6v5.5c0 4.2-2.8 7.3-7 9-4.2-1.7-7-4.8-7-9V6z" />
      <path {...P} d="m9 12 2.2 2.2L15.5 10" />
    </>
  ),
  antenna: (
    <>
      <path {...P} d="M12 13.5V20" />
      <path {...P} d="M8.5 20h7" />
      <circle {...P} cx="12" cy="11" r="2" />
      <path {...P} d="M7.8 6.8a6 6 0 0 0 0 8.4M16.2 6.8a6 6 0 0 1 0 8.4" />
    </>
  ),
  grid: (
    <>
      <rect {...P} x="4" y="4" width="7" height="7" rx="1.5" />
      <rect {...P} x="13" y="4" width="7" height="7" rx="1.5" />
      <rect {...P} x="4" y="13" width="7" height="7" rx="1.5" />
      <rect {...P} x="13" y="13" width="7" height="7" rx="1.5" />
    </>
  ),
  eye: (
    <>
      <path {...P} d="M2.8 12S6 6.5 12 6.5 21.2 12 21.2 12 18 17.5 12 17.5 2.8 12 2.8 12z" />
      <circle {...P} cx="12" cy="12" r="2.8" />
    </>
  ),
  scale: (
    <>
      <path {...P} d="M12 4.5v15M7 19.5h10" />
      <path {...P} d="M5 8.5h14" />
      <path {...P} d="M5 8.5 2.8 13.5h4.4zM19 8.5l-2.2 5h4.4z" />
    </>
  ),
  share: (
    <>
      <circle {...P} cx="17" cy="6" r="2.5" />
      <circle {...P} cx="7" cy="12" r="2.5" />
      <circle {...P} cx="17" cy="18" r="2.5" />
      <path {...P} d="m9.2 10.8 5.6-3.3M9.2 13.2l5.6 3.3" />
    </>
  ),
  search: (
    <>
      <circle {...P} cx="11" cy="11" r="6.5" />
      <path {...P} d="m15.8 15.8 4.2 4.2" />
      <path {...P} d="M8.6 9.2a2.8 2.8 0 0 1 2.4-1.7" />
    </>
  ),
  clock: (
    <>
      <circle {...P} cx="12" cy="12" r="8.5" />
      <path {...P} d="M12 7.2V12l3.4 2" />
    </>
  ),
  globe: (
    <>
      <circle {...P} cx="12" cy="12" r="8.5" />
      <path {...P} d="M12 3.5c3 3.4 3 13.6 0 17M12 3.5c-3 3.4-3 13.6 0 17" />
      <path {...P} d="M4 9h16M4 15h16" />
    </>
  ),
  cycle: (
    <>
      <path {...P} d="M19.5 12a7.5 7.5 0 1 1-2.6-5.7" />
      <path {...P} d="M17.5 3.2v3.6h-3.6" />
    </>
  ),
  ladder: (
    <>
      <path {...P} d="M8 3.5v17M16 3.5v17" />
      <path {...P} d="M8 7.5h8M8 12h8M8 16.5h8" />
    </>
  ),
  bookOpen: (
    <>
      <path {...P} d="M4 5.5h5.5A2.5 2.5 0 0 1 12 8v11a2.2 2.2 0 0 0-2.2-2H4z" />
      <path {...P} d="M20 5.5h-5.5A2.5 2.5 0 0 0 12 8v11a2.2 2.2 0 0 1 2.2-2H20z" />
    </>
  ),
  play: <path d="M9 6.5 18 12l-9 5.5z" fill="currentColor" />,
  check: <path {...P} d="m5 12.5 4.5 4.5L19 7" />,
  flag: (
    <>
      <path {...P} d="M6.5 21V4" />
      <path {...P} d="M6.5 5h11l-2.2 3.6L17.5 12h-11z" />
    </>
  ),
  menu: <path {...P} d="M4 7h16M4 12h16M4 17h16" />,
  close: <path {...P} d="M6 6l12 12M18 6L6 18" />,
  chevron: <path {...P} d="m8 10 4 4 4-4" />,
}

export default function Icon({ name, size = 24, className, title }) {
  const glyph = paths[name] || paths.file
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      role={title ? 'img' : 'presentation'}
      aria-hidden={title ? undefined : 'true'}
      aria-label={title}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {glyph}
    </svg>
  )
}
