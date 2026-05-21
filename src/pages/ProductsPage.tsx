import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ProductsTabVisual } from '../components/products/ProductsTabVisual'
import '../styles/products-page.css'

const TABS = ['Platforms', 'Tools', 'Interfaces'] as const
type Tab = (typeof TABS)[number]

const TAB_HASH: Record<Tab, string> = {
  Platforms: 'platforms',
  Tools: 'tools',
  Interfaces: 'interfaces',
}

const HASH_TO_TAB: Record<string, Tab> = {
  platforms: 'Platforms',
  platform: 'Platforms',
  tools: 'Tools',
  interfaces: 'Interfaces',
}

function tabFromHash(hash: string): Tab | null {
  const key = hash.replace(/^#/, '').toLowerCase()
  return HASH_TO_TAB[key] ?? null
}

const CONTENT: Record<
  Tab,
  {
    headline: string
    body: React.ReactNode
    cta: string
    icon: 'people' | 'bulb' | 'desk'
  }
> = {
  Platforms: {
    headline: 'A reusable foundation for every FLDT product.',
    cta: 'Explore platforms',
    icon: 'people',
    body: (
      <>
        A reusable, extensible <strong>foundation</strong> designed to support multiple products,
        tools, and future uses. This is FLDT&apos;s <strong>Technical Core</strong>. It enables many
        tools and products to be built, deployed, and sustained.
      </>
    ),
  },
  Tools: {
    headline: 'Focused analytical modules for real-world problems.',
    cta: 'Explore tools',
    icon: 'bulb',
    body: (
      <>
        <strong>Packaged</strong> software modules that perform a <strong>specific task</strong>{' '}
        dealing with a <strong>real-world</strong> use case and problem. These are individual
        analytical components with <em>minimal UI</em> (if any).
      </>
    ),
  },
  Interfaces: {
    headline: 'Experiences that put tools in the right context.',
    cta: 'Explore interfaces',
    icon: 'desk',
    body: (
      <>
        Applications designed for <strong>specific usage modes</strong> that enable users to
        engage tools in different circumstances including desktop, web-based, phone-based, and VR,
        AR.
      </>
    ),
  },
}

function Icon({ kind }: { kind: 'people' | 'bulb' | 'desk' }) {
  const c = { width: 32, height: 32, viewBox: '0 0 24 24' as const, fill: 'none' as const }
  if (kind === 'people') {
    return (
      <svg {...c} aria-hidden>
        <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="16" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M4.5 20c.3-3 2.6-5 5.5-5h1c2.9 0 5.2 2 5.5 5"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
        <circle cx="12" cy="5" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    )
  }
  if (kind === 'bulb') {
    return (
      <svg {...c} aria-hidden>
        <path
          d="M9 18h6M10 22h4M12 3a5 5 0 0 0-2 9.7V15h4v-2.3A5 5 0 0 0 12 3Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
      </svg>
    )
  }
  return (
    <svg {...c} aria-hidden>
      <path
        d="M8 19v-2h8v2M6 13h12l-1 6H7L6 13Zm2-3V8a4 4 0 1 1 8 0v2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function ProductsPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [tab, setTab] = useState<Tab>(() => tabFromHash(location.hash) ?? 'Platforms')

  const selectTab = useCallback(
    (next: Tab) => {
      setTab(next)
      navigate({ pathname: '/products', hash: TAB_HASH[next] }, { replace: true })
    },
    [navigate]
  )

  useEffect(() => {
    const fromHash = tabFromHash(location.hash)
    if (fromHash) setTab(fromHash)
  }, [location.hash])

  const active = CONTENT[tab]

  return (
    <div className="products-page">
      <section className="products-hero">
        <div className="container">
          <p className="section-eyebrow">Products</p>
          <h1>Platforms, tools, and interfaces</h1>
          <p className="lede">
            FLDT organizes delivery across three complementary layers—mirroring how durable
            platforms power focused tools, and how interfaces make them usable in the real world.
          </p>
        </div>
      </section>

      <section className="products-tabs-section">
        <div className="container">
          <div className="products-fme" data-active-tab={tab}>
            <div className="products-tabs-rail" aria-hidden="true" />
            <div className="products-tabs" role="tablist" aria-label="Product categories">
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  className={`products-tab${tab === t ? ' is-active' : ''}`}
                  onClick={() => selectTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="products-fme__panel" role="tabpanel">
              <div className="products-fme__copy" key={tab}>
                <p className="products-fme__label">{tab}</p>
                <h2 className="products-fme__headline">{active.headline}</h2>
                <div className="products-fme__body">{active.body}</div>
                <Link className="products-fme__cta" to="/#components">
                  {active.cta}
                  <span className="products-fme__cta-icon" aria-hidden>
                    →
                  </span>
                </Link>
              </div>

              <div className="products-fme__visual">
                <div className={`products-fme__visual-card products-fme__visual-card--${tab}`}>
                  <div className="products-fme__visual-top">
                    <Icon kind={active.icon} />
                    <span className="products-fme__visual-brand">FLDT</span>
                  </div>
                  <div className="products-fme__visual-art" key={tab}>
                    <ProductsTabVisual tab={tab} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
