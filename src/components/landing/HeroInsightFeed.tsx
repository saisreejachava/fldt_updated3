import { Link } from 'react-router-dom'

export type HeroInsightItem = {
  tag: string
  title: string
  subtitle: string
  /** Optional — rows become links when set */
  to?: string
}

type HeroInsightFeedProps = {
  items: readonly HeroInsightItem[]
  /** Screen-reader label for the marquee region */
  label?: string
}

function OutLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M7 7h10v10M7 17 17 7"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function FeedRow({ item }: { item: HeroInsightItem }) {
  const body = (
    <>
      <div className="hero-insight-feed__row-top">
        <span className="hero-insight-feed__tag">{item.tag}</span>
        {item.to ? <OutLinkIcon className="hero-insight-feed__link-ico" /> : null}
      </div>
      <span className="hero-insight-feed__title">{item.title}</span>
      <span className="hero-insight-feed__sub">{item.subtitle}</span>
    </>
  )

  if (item.to) {
    return (
      <Link className="hero-insight-feed__row" to={item.to}>
        {body}
      </Link>
    )
  }

  return <div className="hero-insight-feed__row">{body}</div>
}

/**
 * Minimal vertical ticker of blog highlights (CSS marquee — GPU-friendly).
 */
export function HeroInsightFeed({ items, label = 'Blog highlights' }: HeroInsightFeedProps) {
  if (items.length === 0) return null

  const looped = [...items, ...items]

  return (
    <div className="hero-insight-feed" aria-label={label}>
      <div className="hero-insight-feed__head">
        <div className="hero-insight-feed__eyebrow">
          <span className="hero-insight-feed__eyebrow-dot" aria-hidden />
          <span className="hero-insight-feed__eyebrow-label">Blog feed</span>
        </div>
        <span className="hero-insight-feed__head-rule" aria-hidden />
        <p className="hero-insight-feed__subhead">Posts · Stories · Updates</p>
      </div>

      <div className="hero-insight-feed__chrome">
        <div className="hero-insight-feed__viewport">
          <div className="hero-insight-feed__track">
            {looped.map((item, i) => (
              <FeedRow key={`${item.title}-${i}`} item={item} />
            ))}
          </div>
        </div>
      </div>

      <div className="hero-insight-feed__footer">
        <Link to="/blogs" className="hero-insight-feed__all">
          <span>View all blogs</span>
          <OutLinkIcon className="hero-insight-feed__all-ico" />
        </Link>
      </div>
    </div>
  )
}
