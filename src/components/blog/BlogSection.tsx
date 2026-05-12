import { Link } from 'react-router-dom'
import { BlogCard } from './BlogCard'
import { getFeaturedPosts } from '../../lib/blog'

export function BlogSection() {
  const featuredPosts = getFeaturedPosts(3)

  return (
    <section className="landing-section blog-section" id="blog">
      <div className="container">
        <div className="section-heading">
          <div className="section-heading__top">
            <span className="section-eyebrow">Latest Insights</span>
            <Link to="/blogs" className="view-all-link">
              View All Posts
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <h2>From the Blog</h2>
          <p>
            Stay updated with the latest research, case studies, and news from the Florida Digital
            Twin initiative.
          </p>
        </div>

        <div className="blog-grid">
          {featuredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} variant="featured" />
          ))}
        </div>

        <div className="blog-section__cta">
          <Link to="/blogs" className="btn primary">
            Explore All Articles
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogSection
