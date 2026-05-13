import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { keyStatements } from '../../data/keyStatements'

const LOGO_BY_TITLE: Record<string, string> = {
  Definition: '/images/definition.svg',
  Purpose: '/images/purpose.svg',
  Proposition: '/images/proposition.svg',
}

/** Vertical anchor (px from top of hero) so the flyout scrolls with the hero, not the viewport. */
function anchorYInHero(pillarEl: HTMLElement, heroEl: HTMLElement) {
  const elRect = pillarEl.getBoundingClientRect()
  const heroRect = heroEl.getBoundingClientRect()
  const centerInHero = elRect.top + elRect.height / 2 - heroRect.top
  const pad = 72
  const max = heroEl.clientHeight - pad
  return Math.min(Math.max(centerInHero, pad), max)
}

export function HeroMessagingPillars() {
  const [activeTitle, setActiveTitle] = useState<string | null>(null)
  const [flyoutCenterY, setFlyoutCenterY] = useState<number | null>(null)
  const [flyoutHost, setFlyoutHost] = useState<HTMLElement | null>(null)
  const rowRef = useRef<HTMLDivElement>(null)

  const closeFlyout = () => {
    setActiveTitle(null)
    setFlyoutCenterY(null)
    setFlyoutHost(null)
  }

  const handleBlurRow = (e: React.FocusEvent) => {
    const next = e.relatedTarget as Node | null
    if (next && rowRef.current?.contains(next)) return
    closeFlyout()
  }

  const setAnchorFromEl = (el: HTMLElement) => {
    const hero = el.closest('.landing-hero')
    if (!hero) return
    setFlyoutHost(hero as HTMLElement)
    setFlyoutCenterY(anchorYInHero(el, hero as HTMLElement))
  }

  const activeStatement = activeTitle
    ? keyStatements.find((s) => s.title === activeTitle) ?? null
    : null

  const flyoutY = flyoutCenterY ?? 0

  useEffect(() => {
    if (!activeTitle) return
    const onDocPointerDown = (e: MouseEvent | TouchEvent) => {
      const t = e.target
      if (!(t instanceof Node)) return
      if (rowRef.current?.contains(t)) return
      const flyout = document.getElementById('hero-statement-flyout-panel')
      if (flyout?.contains(t)) return
      closeFlyout()
    }
    document.addEventListener('mousedown', onDocPointerDown)
    document.addEventListener('touchstart', onDocPointerDown, { passive: true })
    return () => {
      document.removeEventListener('mousedown', onDocPointerDown)
      document.removeEventListener('touchstart', onDocPointerDown)
    }
  }, [activeTitle])

  const activatePillar = (title: string, el: HTMLElement) => {
    setAnchorFromEl(el)
    setActiveTitle(title)
  }

  const handlePillarClick = (e: React.MouseEvent<HTMLElement>, title: string) => {
    e.preventDefault()
    const el = e.currentTarget
    if (activeTitle === title) {
      closeFlyout()
    } else {
      activatePillar(title, el)
    }
  }

  const handlePillarKeyDown = (e: React.KeyboardEvent<HTMLElement>, title: string) => {
    if (e.key !== 'Enter' && e.key !== ' ') return
    e.preventDefault()
    const el = e.currentTarget
    if (activeTitle === title) {
      closeFlyout()
    } else {
      activatePillar(title, el)
    }
  }

  const flyoutNode =
    activeStatement && flyoutHost ? (
      <aside
        id="hero-statement-flyout-panel"
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
    ) : null

  return (
    <div className="container hero-messaging-wrap">
      <div className="hero-messaging-main">
        <div className="hero-messaging">
          <h1 className="hero-messaging__line1">Florida Digital Twin</h1>
          <h2 className="hero-messaging__line2">Empower Florida Communities</h2>
        </div>

        <div className="hero-pillars-row" ref={rowRef}>
          <div className="hero-pillars">
            {keyStatements.map((item) => (
              <article
                key={item.title}
                role="button"
                tabIndex={0}
                aria-expanded={activeTitle === item.title}
                aria-controls={activeTitle === item.title ? 'hero-statement-flyout-panel' : undefined}
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
        </div>
      </div>
      {flyoutNode && flyoutHost ? createPortal(flyoutNode, flyoutHost) : null}
    </div>
  )
}
