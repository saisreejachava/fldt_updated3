import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import type { NavMegaMenuGroup } from '../../data/navMegaMenu'
import { NAV_MEGA_MENUS } from '../../data/navMegaMenu'
import { NavMegaMenuIcon } from './NavMegaMenuIcon'

const CLOSE_DELAY_MS = 120

export type NavMegaMenuController = {
  openId: string | null
  openGroup: NavMegaMenuGroup | null
  openMenu: (id: string) => void
  scheduleClose: () => void
  cancelClose: () => void
}

function isGroupActive(group: NavMegaMenuGroup, pathname: string) {
  if (pathname === group.to || pathname.startsWith(`${group.to}/`)) return true
  return group.sections.some((section) =>
    section.items.some((item) => pathname === item.to || pathname.startsWith(`${item.to}/`))
  )
}

export function useNavMegaMenu(): NavMegaMenuController {
  const [openId, setOpenId] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { pathname } = useLocation()

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }, [])

  const scheduleClose = useCallback(() => {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpenId(null), CLOSE_DELAY_MS)
  }, [cancelClose])

  const openMenu = useCallback(
    (id: string) => {
      cancelClose()
      setOpenId(id)
    },
    [cancelClose]
  )

  useEffect(() => {
    setOpenId(null)
  }, [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenId(null)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => () => cancelClose(), [cancelClose])

  const openGroup = openId ? NAV_MEGA_MENUS.find((m) => m.id === openId) ?? null : null

  return { openId, openGroup, openMenu, scheduleClose, cancelClose }
}

function NavMegaMenuPanelContent({
  group,
  onNavigate,
}: {
  group: NavMegaMenuGroup
  onNavigate?: () => void
}) {
  return (
    <div key={group.id} className="nav-mega-menu__content">
      {group.intro ? (
        <header className="nav-mega-menu__intro">
          <p className="nav-mega-menu__intro-text">{group.intro}</p>
          {group.introCta ? (
            <Link to={group.introCta.to} className="nav-mega-menu__intro-cta" onClick={onNavigate}>
              {group.introCta.label}
              <span className="nav-mega-menu__intro-cta-chevron" aria-hidden>
                ›
              </span>
            </Link>
          ) : null}
        </header>
      ) : null}
      <div className="nav-mega-menu__grid">
        {(() => {
          let itemIndex = 0
          return group.sections.map((section) => (
            <div key={section.title} className="nav-mega-menu__column">
              <ul className="nav-mega-menu__list">
                {section.items.map((item) => {
                  const delay = itemIndex * 30
                  itemIndex += 1
                  return (
                    <li
                      key={item.label}
                      className="nav-mega-menu__list-item"
                      style={{ '--nav-item-delay': `${delay}ms` } as CSSProperties}
                    >
                      <Link to={item.to} className="nav-mega-menu__item" onClick={onNavigate}>
                        <span className="nav-mega-menu__item-icon" aria-hidden>
                          {item.icon ? <NavMegaMenuIcon icon={item.icon} /> : null}
                        </span>
                        <span className="nav-mega-menu__item-text">
                          <span className="nav-mega-menu__item-label">{item.label}</span>
                          {item.description ? (
                            <span className="nav-mega-menu__item-desc">{item.description}</span>
                          ) : null}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))
        })()}
      </div>
    </div>
  )
}

export function NavMegaMenuPanel({
  group,
  anchorRef,
  onClose,
  onCancelClose,
  onNavigate,
}: {
  group: NavMegaMenuGroup
  anchorRef: RefObject<HTMLElement | null>
  onClose: () => void
  onCancelClose: () => void
  onNavigate?: () => void
}) {
  const panelId = useId()
  const [anchorPos, setAnchorPos] = useState<{ top: number; left: number } | null>(null)
  const [isEntering, setIsEntering] = useState(true)
  const hasOpenedRef = useRef(false)

  const updateAnchorPos = useCallback(() => {
    const el = anchorRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setAnchorPos({ top: rect.bottom + 12, left: rect.left + rect.width / 2 })
  }, [anchorRef])

  useLayoutEffect(() => {
    updateAnchorPos()
    window.addEventListener('resize', updateAnchorPos)
    window.addEventListener('scroll', updateAnchorPos, true)
    return () => {
      window.removeEventListener('resize', updateAnchorPos)
      window.removeEventListener('scroll', updateAnchorPos, true)
    }
  }, [updateAnchorPos, group.id])

  useEffect(() => {
    if (!hasOpenedRef.current) {
      hasOpenedRef.current = true
      setIsEntering(true)
      const t = window.setTimeout(() => setIsEntering(false), 440)
      return () => window.clearTimeout(t)
    }
    setIsEntering(false)
    return undefined
  }, [])

  const panel = (
    <div
      id={panelId}
      className={[
        'nav-mega-menu__panel',
        'nav-mega-menu__panel--portal',
        `nav-mega-menu__panel--${group.id}`,
        isEntering ? 'is-entering' : '',
      ].join(' ')}
      role="region"
      aria-label={`${group.label} menu`}
      style={
        anchorPos
          ? ({ top: anchorPos.top, left: anchorPos.left } as CSSProperties)
          : undefined
      }
      onMouseEnter={onCancelClose}
      onMouseLeave={onClose}
    >
      <div className="nav-mega-menu__panel-shell">
        <div className="nav-mega-menu__panel-inner">
          <NavMegaMenuPanelContent group={group} onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  )

  if (typeof document === 'undefined') return panel
  return createPortal(panel, document.body)
}

function NavMegaMenuTrigger({
  group,
  isOpen,
  isActive,
  onOpen,
  onClose,
  onNavigate,
  mobileDrawerOpen,
}: {
  group: NavMegaMenuGroup
  isOpen: boolean
  isActive: boolean
  onOpen: () => void
  onClose: () => void
  onNavigate?: () => void
  mobileDrawerOpen?: boolean
}) {
  const [mobileExpanded, setMobileExpanded] = useState(false)

  useEffect(() => {
    if (!mobileDrawerOpen) setMobileExpanded(false)
  }, [mobileDrawerOpen])

  return (
    <div
      className={`site-shell-nav__item${isOpen ? ' is-menu-open' : ''}`}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
      onFocusCapture={onOpen}
    >
      <Link
        to={group.to}
        className={`site-shell-nav__link site-shell-nav__link--mega${isActive ? ' is-active' : ''}${isOpen ? ' is-open' : ''}`}
        aria-expanded={isOpen || mobileExpanded}
        aria-haspopup="true"
        onClick={(e) => {
          if (mobileDrawerOpen) {
            e.preventDefault()
            setMobileExpanded((v) => !v)
          }
        }}
      >
        {group.label}
      </Link>

      {mobileDrawerOpen && mobileExpanded ? (
        <ul className="nav-mega-menu__mobile-list">
          {group.sections.flatMap((section) =>
            section.items.map((item) => (
              <li key={item.label}>
                <Link
                  to={item.to}
                  className="nav-mega-menu__mobile-link"
                  onClick={onNavigate}
                >
                  {item.label}
                </Link>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  )
}

export function NavMegaMenuTriggers({
  mega,
  onNavigate,
  mobileDrawerOpen,
}: {
  mega: NavMegaMenuController
  onNavigate?: () => void
  mobileDrawerOpen?: boolean
}) {
  const { pathname } = useLocation()

  return (
    <>
      {NAV_MEGA_MENUS.map((group) => (
        <NavMegaMenuTrigger
          key={group.id}
          group={group}
          isOpen={mega.openId === group.id}
          isActive={isGroupActive(group, pathname)}
          onOpen={() => mega.openMenu(group.id)}
          onClose={mega.scheduleClose}
          onNavigate={onNavigate}
          mobileDrawerOpen={mobileDrawerOpen}
        />
      ))}
    </>
  )
}
