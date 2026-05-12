import { useInView } from '../hooks/useInView'
import { AboutPillarVisual } from '../components/about/AboutPillarVisual'
import '../styles/about-page.css'

const PILLARS = [
  {
    title: 'Technology & Research',
    body:
      "FLDT will support, build, and leverage UF's research and computational capacities and become a central hub for geospatial digital twin technologies within and beyond UF. Through full realization of the computational power of HiPerGator, FLDT will provide a data-rich and AI-enabled platform to perform hazard scenarios and forecasts across social, environmental, and infrastructural models. This resource will facilitate community development as well as university-led research, providing lasting service to Florida communities.",
  },
  {
    title: 'Project & Product Development',
    body:
      'FLDT will rapidly prototype solutions through private sector partnership, patents, and tech transfer to enable developers, architects, urban designers, ecologists and engineers to better assemble, model, compare, and visualize urban information in service of project-defined needs. By supporting professional design practice, FLDT will catalyze action around hazard mitigation, planning, and design through web-based tools, specific software applications, and other customizable products.',
  },
  {
    title: 'Impact, Training & Education',
    body:
      'FLDT will incorporate digital twin technologies into university pedagogy and curriculum to transform design practice, inform community-engaged decision making, and reshape development processes connecting data-enriched visualization through human-centered, community-focused, and experiential applications. UF students will participate directly in this transformation through new academic programs, research opportunities, and professional advancement.',
  },
]

function PillarBlock({
  pillar,
  index,
  reverse,
}: {
  pillar: (typeof PILLARS)[number]
  index: number
  reverse: boolean
}) {
  const { ref, inView } = useInView<HTMLDivElement>({
    threshold: 0.12,
    rootMargin: '0px 0px -5% 0px',
  })

  return (
    <article
      ref={ref}
      className={`about-pillar-block about-pillar-block--${reverse ? 'reverse' : 'normal'}${index === 2 ? ' about-pillar-block--impact' : ''}${inView ? ' is-visible' : ''}`}
    >
      <div className="about-pillar-block__visual" aria-hidden>
        <AboutPillarVisual index={index} />
      </div>
      <div className="about-pillar-block__copy">
        <h3>{pillar.title}</h3>
        <p>{pillar.body}</p>
      </div>
    </article>
  )
}

export default function AboutPage() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container">
          <p className="section-eyebrow">About</p>
          <h1>Florida Digital Twin</h1>
          <p className="lede">
            A research and development program advancing geospatial digital twins to understand and
            manage complex social, urban, and environmental systems.
          </p>
        </div>
      </section>

      <section className="about-pillars">
        <div className="container">
          <header className="about-pillars__header">
            <h2>Institutional pillars</h2>
            <p className="about-pillars__question">
              What are the overarching goal and institutional alignments needed for lasting
              achievement?
            </p>
          </header>

          <div className="about-pillars__stack">
            {PILLARS.map((p, i) => (
              <PillarBlock key={p.title} pillar={p} index={i} reverse={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
