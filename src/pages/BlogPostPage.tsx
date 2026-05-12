import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  getPostBySlug,
  categoryConfig,
  formatDate,
  calculateReadingTime,
  getAllPosts,
} from '../lib/blog'
import { BlogCard } from '../components/blog/BlogCard'
import '../styles/blogs.css'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <div className="blog-post-page">
        <div className="blog-post-not-found">
          <h1>Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist or has been removed.</p>
          <Link to="/blogs" className="btn primary">
            Browse All Posts
          </Link>
        </div>
      </div>
    )
  }

  const category = categoryConfig[post.category] || { label: post.category, color: '#6b7280' }
  const readingTime = calculateReadingTime(post.content)

  const relatedPosts = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.category === post.category)
    .slice(0, 3)

  const placeholderImages: Record<string, string> = {
    research: 'https://picsum.photos/seed/research/1200/600',
    technology: 'https://picsum.photos/seed/technology/1200/600',
    community: 'https://picsum.photos/seed/community/1200/600',
    news: 'https://picsum.photos/seed/news/1200/600',
    'case-study': 'https://picsum.photos/seed/casestudy/1200/600',
  }

  const coverImage =
    post.coverImage || placeholderImages[post.category] || placeholderImages['news']

  const renderContent = (content: string) => {
    const lines = content.split('\n')
    const elements: JSX.Element[] = []
    let inList = false
    let listItems: string[] = []

    const flushList = () => {
      if (listItems.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="blog-content__list">
            {listItems.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        )
        listItems = []
        inList = false
      }
    }

    lines.forEach((line, index) => {
      const trimmedLine = line.trim()

      if (!trimmedLine) {
        flushList()
        return
      }

      if (trimmedLine.startsWith('## ')) {
        flushList()
        elements.push(
          <h2 key={`h2-${index}`} className="blog-content__h2">
            {trimmedLine.slice(3).replace(/\*\*/g, '')}
          </h2>
        )
        return
      }

      if (trimmedLine.startsWith('### ')) {
        flushList()
        elements.push(
          <h3 key={`h3-${index}`} className="blog-content__h3">
            {trimmedLine.slice(4).replace(/\*\*/g, '')}
          </h3>
        )
        return
      }

      if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
        inList = true
        listItems.push(trimmedLine.slice(2).replace(/\*\*/g, ''))
        return
      }

      const imageMatch = trimmedLine.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
      if (imageMatch) {
        flushList()
        const [, alt, src] = imageMatch
        const imageSrc = src.startsWith('http')
          ? src
          : `/content-images/${post.slug}/${src.replace(/^\.\//, '')}`
        elements.push(
          <figure key={`img-${index}`} className="blog-content__figure">
            <img
              src={imageSrc}
              alt={alt || post.title}
              className="blog-content__image"
              loading="lazy"
            />
          </figure>
        )
        return
      }

      flushList()
      const formattedText = trimmedLine
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')

      elements.push(
        <p
          key={`p-${index}`}
          className="blog-content__paragraph"
          dangerouslySetInnerHTML={{ __html: formattedText }}
        />,
      )
    })

    flushList()
    return elements
  }

  return (
    <div className="blog-post-page">
      <nav className="blog-post-nav">
        <div className="container">
          <button onClick={() => navigate(-1)} className="blog-post-back">
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
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <Link to="/blogs" className="blog-post-all">
            All Posts
          </Link>
        </div>
      </nav>

      <header className="blog-post-hero">
        <div className="blog-post-hero__image">
          <img src={coverImage} alt={post.title} />
          <div className="blog-post-hero__overlay"></div>
        </div>
        <div className="container blog-post-hero__content">
          <span
            className="blog-post-category"
            style={{ backgroundColor: category.color }}
          >
            {category.label}
          </span>
          <h1>{post.title}</h1>
          <div className="blog-post-meta">
            <div className="blog-post-author">
              <div className="blog-post-author__avatar">
                {post.author.avatar ? (
                  <img src={post.author.avatar} alt={post.author.name} />
                ) : (
                  post.author.name.charAt(0)
                )}
              </div>
              <div className="blog-post-author__info">
                <span className="blog-post-author__name">{post.author.name}</span>
                <span className="blog-post-author__date">
                  {formatDate(post.publishedAt)} · {readingTime} min read
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <article className="blog-post-content">
        <div className="container container--narrow">
          {post.tags.length > 0 && (
            <div className="blog-post-tags">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/blogs?tag=${encodeURIComponent(tag)}`}
                  className="blog-post-tag"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}

          <div className="blog-content">{renderContent(post.content)}</div>

          <div className="blog-post-share">
            <span>Share this article:</span>
            <div className="blog-post-share__buttons">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn share-btn--twitter"
                aria-label="Share on Twitter"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-btn share-btn--linkedin"
                aria-label="Share on LinkedIn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(window.location.href)}
                className="share-btn share-btn--copy"
                aria-label="Copy link"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="blog-post-related">
          <div className="container">
            <h2>Related Articles</h2>
            <div className="blogs-grid blogs-grid--three">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="blog-post-cta">
        <div className="container">
          <div className="blog-post-cta__content">
            <h2>Stay Updated</h2>
            <p>
              Get the latest insights from the Florida Digital Twin initiative delivered to your
              inbox.
            </p>
            <div className="blog-post-cta__actions">
              <Link to="/blogs" className="btn">
                Browse All Articles
              </Link>
              <a href="/login" className="btn primary">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
