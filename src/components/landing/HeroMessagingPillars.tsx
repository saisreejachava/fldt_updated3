import { useRef, useState } from 'react'
import { keyStatements } from '../../data/keyStatements'

const LOGO_BY_TITLE: Record<string, string> = {
  Definition: '/images/definition.svg',
  Purpose: '/images/purpose.svg',
  Proposition: '/images/proposition.svg',
}

function clampCenterY(centerPx: number) {
  if (typeof window === 'undefined') return centerPx
  const pad = 96
  return Math.min(Math.max(centerPx, pad), window.innerHeight - pad)
}

export function HeroMessagingPillars() {
  const [activeTitle, setActiveTitle] = useState<string | null>(null)
  const [flyoutCenterY, setFlyoutCenterY] = useState<number | null>(null)
  const rowRef = useRef<HTMLDivElement>(null)

  const handleBlurRow = (e: React.FocusEvent) => {
    const next = e.relatedTarget as Node | null
    if (next && rowRef.current?.contains(next)) return
    setActiveTitle(null)
    setFlyoutCenterY(null)
  }

  const setAnchorFromEl = (el: HTMLElement) => {
    const r = el.getBoundingClientRect()
    setFlyoutCenterY(clampCenterY(r.top + r.height / 2))
  }

  const activeStatement = activeTitle
    ? keyStatements.find((s) => s.title === activeTitle) ?? null
    : null

  const flyoutY = flyoutCenterY ?? (typeof window !== 'undefined' ? window.innerHeight * 0.42 : 400)

  return (
    <div className="container hero-messaging-wrap">
      <div className="hero-messaging-main">
        <div className="hero-messaging">
          <h1 className="hero-messaging__line1">Florida Digital Twin</h1>
          <h2 className="hero-messaging__line2">Empower Florida Communities</h2>
        </div>

        <div
          className="hero-pillars-row"
          ref={rowRef}
          onMouseLeave={() => {
            setActiveTitle(null)
            setFlyoutCenterY(null)
          }}
        >
          <div className="hero-pillars">
            {keyStatements.map((item) => (
              <article
                key={item.title}
                className={`hero-pillar${activeTitle === item.title ? ' is-active' : ''}`}
                tabIndex={0}
                onMouseEnter={(e) => {
                  setAnchorFromEl(e.currentTarget)
                  setActiveTitle(item.title)
                }}
                onFocus={(e) => {
                  setAnchorFromEl(e.currentTarget)
                  setActiveTitle(item.title)
                }}
                onBlur={handleBlurRow}
              >
                <div className="hero-pillar__logo-wrap" aria-hidden>
                  <img
                    className="hero-pillar__logo"
                    src={LOGO_BY_TITLE[item.title] ?? '/images/splash-logo-image.svg'}
                    alt=""
                    width={28}
                    height={28}
                  />
                </div>
                <div className="hero-pillar__text">
                  <h3 className="hero-pillar__title">{item.title}</h3>
                  <p className="hero-pillar__question">{item.question}</p>
                  <p className="hero-pillar__body-touch">{item.body}</p>
                </div>
              </article>
            ))}
          </div>

          {activeStatement ? (
            <aside
              key={activeStatement.title}
              className="hero-statement-flyout"
              aria-live="polite"
              aria-label={`${activeStatement.title} statement`}
              style={{ '--hero-flyout-y': `${flyoutY}px` } as React.CSSProperties}
            >
              <div className="hero-statement-flyout__inner">
                <p className="hero-statement-flyout__kicker">{activeStatement.title}</p>
                <p className="hero-statement-flyout__body">{activeStatement.body}</p>
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </div>
  )
}
