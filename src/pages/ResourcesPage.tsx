import { BlogSection } from '../components/blog/BlogSection'
import { PeopleCornerChip } from '../components/people'

const RESOURCE_EXPLORE_CARDS = [
  {
    to: '/people',
    title: 'Meet the team',
    subtitle: 'Researchers & planners · FLDT',
    kicker: 'People',
    imageUrl: 'https://picsum.photos/seed/fldtpeople/800/500',
    metaSuffix: 'People & partners',
  },
  {
    to: '/blogs',
    title: 'From the blog',
    subtitle: 'Briefs, case studies & initiative news',
    kicker: 'Insights',
    imageUrl: 'https://picsum.photos/seed/fldtblog/800/500',
    metaSuffix: 'Latest posts',
  },
  {
    to: '/communities',
    title: 'Communities',
    subtitle: 'Regional cohorts, pilots & engagement',
    kicker: 'Programs',
    imageUrl: 'https://picsum.photos/seed/fldtcommunity/800/500',
    metaSuffix: 'Get involved',
  },
  {
    to: '/products',
    title: 'Products & tools',
    subtitle: 'Layers, interfaces & analytic workflows',
    kicker: 'Platform',
    imageUrl: 'https://picsum.photos/seed/fldtproducts/800/500',
    metaSuffix: 'Explore capabilities',
  },
] as const

/** Blog “From the Blog” block + featured-style links to key sections. */
export default function ResourcesPage() {
  return (
    <div className="resources-page">
      <BlogSection />
      <div className="resources-page__people">
        <div className="container resources-page__people-inner resources-page__people-grid">
          {RESOURCE_EXPLORE_CARDS.map((card) => (
            <PeopleCornerChip
              key={card.to}
              variant="featured"
              className="people-team-card--resources"
              to={card.to}
              title={card.title}
              subtitle={card.subtitle}
              kicker={card.kicker}
              imageUrl={card.imageUrl}
              metaSuffix={card.metaSuffix}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
