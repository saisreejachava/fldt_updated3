import { useEffect, useRef, useState } from 'react'
import { keyStatements } from '../../data/keyStatements'

const LOGO_BY_TITLE: Record<string, string> = {
  Definition: '/images/definition.svg',
  Purpose: '/images/purpose.svg',
  Proposition: '/images/proposition.svg',
}

export function HeroMessagingPillars() {
  const [activeTitle, setActiveTitle] = useState<string | null>(null)
  const rowRef = useRef<HTMLDivElement>(null)

  const activeStatement = activeTitle
    ? keyStatements.find((s) => s.title === activeTitle) ?? null
    : null

  const closeFlyout = () => {
    setActiveTitle(null)
  }

  const handleBlurRow = (e: React.FocusEvent) => {
    const next = e.relatedTarget as Node | null
    if (next && rowRef.current?.contains(next)) return
    closeFlyout()
  }

  useEffect(() => {
    if (!activeTitle) return
    const onDocPointerDown = (e: MouseEvent | TouchEvent) => {
      const t = e.target
      if (!(t instanceof Node)) return
      if (rowRef.current?.contains(t)) return
      closeFlyout()
    }
    document.addEventListener('mousedown', onDocPointerDown)
    document.addEventListener('touchstart', onDocPointerDown, { passive: true })
    return () => {
      document.removeEventListener('mousedown', onDocPointerDown)
      document.removeEventListener('touchstart', onDocPointerDown)
    }
  }, [activeTitle])

  const handlePillarClick = (e: React.MouseEvent<HTMLElement>, title: string) => {
    e.preventDefault()
    if (activeTitle === title) {
      closeFlyout()
    } else {
      setActiveTitle(title)
    }
  }

  const handlePillarKeyDown = (e: React.KeyboardEvent<HTMLElement>, title: string) => {
    if (e.key !== 'Enter' && e.key !== ' ') return
    e.preventDefault()
    if (activeTitle === title) {
      closeFlyout()
    } else {
      setActiveTitle(title)
    }
  }

  return (
    <div className="container hero-messaging-wrap">
      <div className="hero-messaging-main">
        <div className="hero-messaging">
          <h1 className="hero-messaging__line1">Florida Digital Twin.</h1>
          <h2 className="hero-messaging__line2">Empower Our Communities..</h2>
        </div>
      </div>

      <div
        className={`hero-pillars-row${activeStatement ? ' hero-pillars-row--open' : ''}`}
        ref={rowRef}
      >
        <div className="hero-pillars">
          {keyStatements.map((item) => (
            <article
              key={item.title}
              role="button"
              tabIndex={0}
              aria-expanded={activeTitle === item.title}
              aria-controls={
                activeTitle === item.title ? 'hero-statement-flyout-panel' : undefined
              }
              className={`hero-pillar${activeTitle === item.title ? ' is-active' : ''}`}
              onClick={(e) => handlePillarClick(e, item.title)}
              onKeyDown={(e) => handlePillarKeyDown(e, item.title)}
              onBlur={handleBlurRow}
            >
              <div className="hero-pillar__logo-wrap" aria-hidden>
                <img
                  className="hero-pillar__logo"
                  src={LOGO_BY_TITLE[item.title] ?? '/images/splash-logo-image.svg'}
                  alt=""
                  width={22}
                  height={22}
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
          <div className="hero-statement-slot">
            <aside
              id="hero-statement-flyout-panel"
              key={activeStatement.title}
              className="hero-statement-flyout"
              aria-live="polite"
              aria-label={`${activeStatement.title} statement`}
            >
              <div className="hero-statement-flyout__inner">
                <p className="hero-statement-flyout__kicker">{activeStatement.title}</p>
                <p className="hero-statement-flyout__body">{activeStatement.body}</p>
              </div>
            </aside>
          </div>
        ) : null}
      </div>
    </div>
  )
}
