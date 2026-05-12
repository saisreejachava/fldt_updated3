import { FooterAnimatic } from './FooterAnimatic'
import { FOOTER_ACKNOWLEDGEMENT } from '../../data/footerCopy'

function scrollToTop() {
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-shell-footer">
      <div className="site-shell-footer__canvas">
        <FooterAnimatic />
        <div className="site-shell-footer__scrim" aria-hidden />
        <div className="container site-shell-footer__inner">
          <div className="site-shell-footer__top-bar">
            <button
              type="button"
              className="site-shell-footer__back-top"
              onClick={scrollToTop}
              aria-label="Back to top of page"
            >
              Back to top
              <svg
                className="site-shell-footer__back-top-icon"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                aria-hidden={true}
              >
                <path
                  d="M6 16l6-6 6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <div className="site-shell-footer__stack">
            <div className="site-shell-footer__cta-row">
              <p className="site-shell-footer__kicker">For further information and enquiries</p>
              <a href="#subscribe" className="site-shell-footer__subscribe">
                <span className="site-shell-footer__subscribe-label">
                  Subscribe
                  <span aria-hidden>→</span>
                </span>
              </a>
            </div>
            <p className="site-shell-footer__ack">{FOOTER_ACKNOWLEDGEMENT}</p>
            <div className="site-shell-footer__legal-row">
              <span className="site-shell-footer__copyright">© {year} University of Florida</span>
              <span className="site-shell-footer__legal-dot" aria-hidden>
                ·
              </span>
              <a className="site-shell-footer__legal-link" href="#privacy">
                Privacy
              </a>
              <span className="site-shell-footer__legal-dot" aria-hidden>
                ·
              </span>
              <a className="site-shell-footer__legal-link" href="#terms">
                Terms of use
              </a>
            </div>
            <p className="site-shell-footer__wordmark">
              <abbr title="Florida Digital Twin">FLDT</abbr>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
