import { Link } from 'react-router-dom'
import type { BlogPostMeta } from '../../lib/blog'
import { categoryConfig, formatDate, calculateReadingTime } from '../../lib/blog'

interface BlogCardProps {
  post: BlogPostMeta
  variant?: 'default' | 'featured' | 'compact'
}

export function BlogCard({ post, variant = 'default' }: BlogCardProps) {
  const category = categoryConfig[post.category] || { label: post.category, color: '#6b7280' }

  const placeholderImages: Record<string, string> = {
    research: 'https://picsum.photos/seed/research/600/400',
    technology: 'https://picsum.photos/seed/technology/600/400',
    community: 'https://picsum.photos/seed/community/600/400',
    news: 'https://picsum.photos/seed/news/600/400',
    'case-study': 'https://picsum.photos/seed/casestudy/600/400',
  }

  const coverImage = post.coverImage || placeholderImages[post.category] || placeholderImages['news']

  if (variant === 'compact') {
    return (
      <Link to={`/blogs/${post.slug}`} className="blog-card blog-card--compact">
        <div className="blog-card__image">
          <img src={coverImage} alt={post.title} loading="lazy" />
        </div>
        <div className="blog-card__content">
          <span
            className="blog-card__category"
            style={{ backgroundColor: `${category.color}15`, color: category.color }}
          >
            {category.label}
          </span>
          <h4 className="blog-card__title">{post.title}</h4>
          <span className="blog-card__date">{formatDate(post.publishedAt)}</span>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link to={`/blogs/${post.slug}`} className="blog-card blog-card--featured">
        <div className="blog-card__image">
          <img src={coverImage} alt={post.title} loading="lazy" />
          <div className="blog-card__overlay"></div>
        </div>
        <div className="blog-card__content">
          <span className="blog-card__category" style={{ backgroundColor: category.color }}>
            {category.label}
          </span>
          <h3 className="blog-card__title">{post.title}</h3>
          <p className="blog-card__excerpt">{post.excerpt}</p>
          <div className="blog-card__meta">
            <div className="blog-card__author">
              <div className="blog-card__author-avatar">
                {post.author.avatar ? (
                  <img src={post.author.avatar} alt={post.author.name} />
                ) : (
                  post.author.name.charAt(0)
                )}
              </div>
              <span>{post.author.name}</span>
            </div>
            <span className="blog-card__date">{formatDate(post.publishedAt)}</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link to={`/blogs/${post.slug}`} className="blog-card">
      <div className="blog-card__image">
        <img src={coverImage} alt={post.title} loading="lazy" />
      </div>
      <div className="blog-card__content">
        <div className="blog-card__header">
          <span
            className="blog-card__category"
            style={{ backgroundColor: `${category.color}15`, color: category.color }}
          >
            {category.label}
          </span>
          <span className="blog-card__reading-time">
            {calculateReadingTime(post.excerpt)} min read
          </span>
        </div>
        <h3 className="blog-card__title">{post.title}</h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <div className="blog-card__footer">
          <div className="blog-card__author">
            <div className="blog-card__author-avatar">
              {post.author.avatar ? (
                <img src={post.author.avatar} alt={post.author.name} />
              ) : (
                post.author.name.charAt(0)
              )}
            </div>
            <div className="blog-card__author-info">
              <span className="blog-card__author-name">{post.author.name}</span>
              <span className="blog-card__date">{formatDate(post.publishedAt)}</span>
            </div>
          </div>
          <span className="blog-card__arrow">→</span>
        </div>
      </div>
    </Link>
  )
}

export default BlogCard
