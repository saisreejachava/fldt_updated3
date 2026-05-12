import { useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteNavbar } from './SiteNavbar'
import { SiteFooter } from './SiteFooter'

export default function SiteLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="site-shell">
      {!isHome && <SiteNavbar />}
      <main className={`site-shell__main${isHome ? ' site-shell__main--flush-top' : ''}`}>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  )
}
