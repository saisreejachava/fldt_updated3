import type { NavMegaMenuIconId } from '../../data/navMegaMenu'

type Props = {
  icon: NavMegaMenuIconId
}

const stroke = 'currentColor'

export function NavMegaMenuIcon({ icon }: Props) {
  switch (icon) {
    case 'platform':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 3L4 7v10l8 4 8-4V7l-8-4z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M12 11v10M4 7l8 4 8-4" stroke={stroke} strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      )
    case 'tools':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17l3 3 5.3-5.3a4 4 0 0 0 5.4-5.4l-2.2 2.2-1.4-1.4 2.2-2.2z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )
    case 'interfaces':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="5" width="18" height="12" rx="2" stroke={stroke} strokeWidth="1.5" />
          <path d="M8 20h8" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'community':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 21s7-4.5 7-10a7 7 0 1 0-14 0c0 5.5 7 10 7 10z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="11" r="2.5" stroke={stroke} strokeWidth="1.5" />
        </svg>
      )
    case 'pillars':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path d="M4 20V8l4-2v14M10 20V4l4 2v14M20 20V10l-4-2v12" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'team':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="9" cy="8" r="3" stroke={stroke} strokeWidth="1.5" />
          <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
          <circle cx="17" cy="9" r="2.5" stroke={stroke} strokeWidth="1.5" />
          <path d="M15 20c.3-2.2 1.8-4 4-4" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'partners':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="7" cy="12" r="3" stroke={stroke} strokeWidth="1.5" />
          <circle cx="17" cy="12" r="3" stroke={stroke} strokeWidth="1.5" />
          <path d="M10 12h4" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    case 'news':
      return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M6 4h12a2 2 0 0 1 2 2v14l-4-2-4 2-4-2-4 2V6a2 2 0 0 1 2-2z"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M9 8h6M9 12h4" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    default:
      return null
  }
}
