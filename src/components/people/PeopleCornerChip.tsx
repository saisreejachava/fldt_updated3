import { Link } from 'react-router-dom'

type Props = {
  /** Extra class names (e.g. placement modifiers). */
  className?: string
  to?: string
  imageUrl?: string
  title?: string
  subtitle?: string
  /** Pill label over the image area (like blog category). */
  kicker?: string
  /** Second line in the meta row (next to the avatar), e.g. org name. */
  metaAuthor?: string
  /** Right-hand meta text (like a date line on blog cards). */
  metaSuffix?: string
  /** Overrides default link description for assistive tech. */
  ariaLabel?: string
  /** `row`: compact strip. `featured`: same layout as blog featured cards + corner arrow. */
  variant?: 'row' | 'featured'
}

const DEFAULT_IMG_ROW = 'https://picsum.photos/seed/team1/96/96'
const DEFAULT_IMG_FEATURED = 'https://picsum.photos/seed/team1/800/500'

export function PeopleCornerChip({
  className = '',
  to = '/people',
  imageUrl,
  title = 'Meet the team',
  subtitle = 'Researchers & planners · FLDT',
  kicker = 'People',
  metaAuthor = 'FLDT',
  metaSuffix = 'People & partners',
  ariaLabel,
  variant = 'row',
}: Props) {
  const initial = title.trim().charAt(0) || 'T'
  const coverSrc = imageUrl ?? (variant === 'featured' ? DEFAULT_IMG_FEATURED : DEFAULT_IMG_ROW)
  const linkAria = ariaLabel ?? `${title}. ${subtitle}`

  if (variant === 'featured') {
    return (
      <Link
        to={to}
        className={['blog-card', 'blog-card--featured', 'people-team-card', className].filter(Boolean).join(' ')}
        aria-label={linkAria}
      >
        <div className="blog-card__image">
          <img src={coverSrc} alt="" width={800} height={500} loading="lazy" decoding="async" />
          <div className="blog-card__overlay" aria-hidden />
          <span className="people-team-card__corner" aria-hidden>
            <span className="people-team-card__corner-inner">↗</span>
          </span>
        </div>
        <div className="blog-card__content">
          <span className="blog-card__category people-team-card__kicker">{kicker}</span>
          <h3 className="blog-card__title">{title}</h3>
          <p className="blog-card__excerpt">{subtitle}</p>
          <div className="blog-card__meta">
            <div className="blog-card__author">
              <div className="blog-card__author-avatar">{initial}</div>
              <span>{metaAuthor}</span>
            </div>
            <span className="blog-card__date">{metaSuffix}</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link to={to} className={['people-corner-chip', className].filter(Boolean).join(' ')}>
      <img
        className="people-corner-chip__thumb"
        src={coverSrc}
        alt=""
        width={44}
        height={44}
        loading="lazy"
        decoding="async"
      />
      <span className="people-corner-chip__text">
        <span className="people-corner-chip__title">{title}</span>
        <span className="people-corner-chip__sub">{subtitle}</span>
      </span>
    </Link>
  )
}
