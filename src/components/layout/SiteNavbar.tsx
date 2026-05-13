import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

function navClass(isActive: boolean) {
  return `site-shell-nav__link${isActive ? ' is-active' : ''}`
}

export function SiteNavbar() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="site-shell-nav site-shell-nav--floating">
      <div className="site-shell-nav__pill">
        <Link to="/" className="site-shell-nav__brand" onClick={close} aria-label="Florida Digital Twin home">
          <img
            className="site-shell-nav__logo"
            src="/images/splash-logo-image.svg"
            alt=""
            width={26}
            height={26}
          />
          <span className="site-shell-nav__brand-text">
            <span className="site-shell-nav__brand-mark">FLDT</span>
            <span className="site-shell-nav__brand-sub">Florida Digital Twin</span>
          </span>
        </Link>

        <button
          type="button"
          className={`site-shell-nav__toggle${open ? ' is-open' : ''}`}
          aria-expanded={open}
          aria-controls="site-shell-nav-center"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="site-shell-nav-center"
          className={`site-shell-nav__center${open ? ' is-open' : ''}`}
        >
          <NavLink to="/products" className={({ isActive }) => navClass(isActive)} onClick={close}>
            Products
          </NavLink>
          <NavLink to="/communities" className={({ isActive }) => navClass(isActive)} onClick={close}>
            Communities
          </NavLink>
          <NavLink to="/resources" className={({ isActive }) => navClass(isActive)} onClick={close}>
            Resources
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => navClass(isActive)} onClick={close}>
            About
          </NavLink>
        </nav>

        <div className="site-shell-nav__auth">
          <a href="#login" className="site-shell-nav__text-link" onClick={close}>
            Log in
          </a>
          <a href="#signup" className="site-shell-nav__signup" onClick={close}>
            <span>Sign up</span>
            <span className="site-shell-nav__signup-icon" aria-hidden>
              ↗
            </span>
          </a>
        </div>
      </div>
    </header>
  )
}
