import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { SiteNavbar } from '../components/layout/SiteNavbar'
import { HeroMessagingPillars } from '../components/landing/HeroMessagingPillars'
import { LandingHeroFrameSequence } from '../components/landing/LandingHeroFrameSequence'
import { BlogSection } from '../components/blog/BlogSection'
import { HomePartners } from '../components/landing/HomePartners'
import { ProductsTabVisual } from '../components/products/ProductsTabVisual'
import { PRODUCT_LAYER_COPY, PRODUCT_LAYER_ORDER } from '../data/productLayers'
import '../styles/fldt-sections.css'

const components = [
  'Platforms',
  'Tools',
  'Interfaces',
  'Communities',
  'Digital Twins',
  'Data Infrastructure',
]

const productTracks = [
  {
    label: 'Infrastructure',
    items: [
      'Urban Shade Analysis',
      'Heat Island Analysis',
      'Flood Risk Analysis',
      'Tree Life Cycle Generation',
      '3D City Modeling',
    ],
  },
  {
    label: 'Urban Experience',
    items: [
      'Desktop Online',
      'Mobile / AR',
      'Hazard Risk Viewer',
      'Transportation Planning',
      'Storm Surge Impact Tool',
    ],
  },
  {
    label: 'Programs',
    items: [
      'University Research',
      'Professional Training',
      'Decision Maker Institute',
      'Community Resilience Workshops',
    ],
  },
]

const kpis = [
  'Faculty usability',
  'Student usability',
  'Publications',
  'Web traffic',
  'Subscriptions',
  'Communities assisted',
  'Program adoption',
  'Grants community work',
]

export default function LandingPage() {
  return (
    <div className="landing-page">
      <main>
        <section className="landing-hero">
          <SiteNavbar />
          <div className="hero-backdrop-layer">
            <LandingHeroFrameSequence />
            <div className="hero-backdrop-overlay" aria-hidden="true"></div>
          </div>
          <HeroMessagingPillars />
        </section>

        <section className="landing-section alt home-communities" id="communities">
          <div className="container home-communities__grid">
            <div>
              <h2>Communities</h2>
  
            </div>
            <div>
              <p>
                We partner with local stakeholders to align priorities, data, and tools—from hazard
                mitigation to planning workshops—so digital twins serve real places, not just models.
              </p>
              <p style={{ marginTop: 16, marginBottom: 0, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                <Link className="btn primary" to="/communities" style={{ display: 'inline-flex' }}>
                  Communities program
                </Link>
                <a className="btn" href="#partners" style={{ display: 'inline-flex' }}>
                  See partners
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="landing-section alt product-layers-strip" id="product-layers">
          <div className="container">
            <div className="section-heading">
              <h2>Platforms + Tools + Interfaces</h2>
              <p>
                Three complementary layers—the same model used across FLDT—to move from shared
                foundations to focused tools and the experiences that put them to work.
              </p>
            </div>
            <div className="product-layers-strip__row">
              {PRODUCT_LAYER_ORDER.map((layer, i) => (
                <Fragment key={layer}>
                  <article className="product-layers-strip__cell">
                    <div className="product-layers-strip__art">
                      <ProductsTabVisual tab={layer} />
                    </div>
                    <h3>{PRODUCT_LAYER_COPY[layer].headline}</h3>
                    <div className="product-layers-strip__body">{PRODUCT_LAYER_COPY[layer].body}</div>
                  </article>
                  {i < PRODUCT_LAYER_ORDER.length - 1 ? (
                    <span className="product-layers-strip__plus" aria-hidden="true">
                      +
                    </span>
                  ) : null}
                </Fragment>
              ))}
            </div>
            <div style={{ marginTop: 28 }}>
              <Link className="btn primary" to="/products">
                Explore the product framework
              </Link>
            </div>
          </div>
        </section>

        <section className="landing-section" id="resources">
          <div className="container">
            <div className="section-heading">
              <h2>Resources</h2>
              <p>Stories, updates, and program materials from the FLDT initiative.</p>
            </div>
            <div className="home-resources__grid">
              <Link to="/blogs" className="home-resource-card">
                <span className="tag">Library</span>
                <h3>Blog &amp; insights</h3>
                <p>Articles, research highlights, and project updates from the team.</p>
              </Link>
              <a className="home-resource-card" href="#measures">
                <span className="tag">Program</span>
                <h3>Measures &amp; KPIs</h3>
                <p>How we track progress across adoption, research, and community impact.</p>
              </a>
              <Link to="/products" className="home-resource-card">
                <span className="tag">Product</span>
                <h3>Platforms, tools &amp; interfaces</h3>
                <p>Explore how FLDT packages capabilities for different delivery modes.</p>
              </Link>
            </div>
          </div>
        </section>

        <section className="landing-section alt" id="components">
          <div className="container">
            <div className="section-heading">
              <h2>Components</h2>
              <p>Reusable building blocks for scalable, impactful digital twins.</p>
            </div>
            <div className="pill-grid">
              {components.map((item) => (
                <span className="pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
            <div className="section-grid three">
              {productTracks.map((track) => (
                <div className="section-card" key={track.label}>
                  <h3>{track.label}</h3>
                  <ul>
                    {track.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 22 }}>
              <Link className="btn primary" to="/products">
                View product framework
              </Link>
            </div>
          </div>
        </section>

        <section className="landing-section" id="measures">
          <div className="container">
            <div className="section-heading">
              <h2>Measures / KPIs</h2>
              <p>How FLDT success is measured across research, adoption, and delivery.</p>
            </div>
            <div className="pill-grid">
              {kpis.map((item) => (
                <span className="pill muted" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </section>

        <HomePartners />

        <BlogSection />
      </main>
    </div>
  )
}
