import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { BlogCard } from '../components/blog/BlogCard'
import {
  getAllPosts,
  searchPosts,
  categoryConfig,
  getCategoriesWithCounts,
  getAllTags,
} from '../lib/blog'
import '../styles/blogs.css'

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const allPosts = getAllPosts()
  const categoriesWithCounts = getCategoriesWithCounts()
  const allTags = getAllTags()

  const filteredPosts = useMemo(() => {
    let posts = searchQuery ? searchPosts(searchQuery) : allPosts
    if (selectedCategory) {
      posts = posts.filter((post) => post.category === selectedCategory)
    }
    if (selectedTag) {
      posts = posts.filter((post) => post.tags.includes(selectedTag))
    }
    return posts
  }, [searchQuery, selectedCategory, selectedTag, allPosts])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory(null)
    setSelectedTag(null)
  }

  const hasActiveFilters = searchQuery || selectedCategory || selectedTag

  return (
    <div className="blogs-page">
      <header className="blogs-header">
        <div className="container">
          <Link to="/" className="blogs-back-link">
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
            Back to Home
          </Link>
          <div className="blogs-header__content">
            <h1>Blog & Insights</h1>
            <p>
              Explore the latest research, case studies, technology updates, and news from the
              Florida Digital Twin initiative.
            </p>
          </div>
        </div>
      </header>

      <div className="blogs-content container">
        <aside className="blogs-sidebar">
          <div className="blogs-search">
            <div className="search-input-wrapper">
              <svg
                className="search-icon"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="blogs-search__input"
              />
              {searchQuery && (
                <button
                  className="search-clear"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          <div className="blogs-filter-section">
            <h3>Categories</h3>
            <div className="blogs-categories">
              {categoriesWithCounts.map(({ category, count }) => {
                const config = categoryConfig[category]
                const isActive = selectedCategory === category
                return (
                  <button
                    key={category}
                    className={`category-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(isActive ? null : category)}
                    style={
                      {
                        '--category-color': config?.color || '#6b7280',
                      } as React.CSSProperties
                    }
                  >
                    <span className="category-dot"></span>
                    {config?.label || category}
                    <span className="category-count">{count}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="blogs-filter-section">
            <h3>Popular Tags</h3>
            <div className="blogs-tags">
              {allTags.slice(0, 10).map((tag) => {
                const isActive = selectedTag === tag
                return (
                  <button
                    key={tag}
                    className={`tag-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setSelectedTag(isActive ? null : tag)}
                  >
                    {tag}
                  </button>
                )
              })}
            </div>
          </div>

          {hasActiveFilters && (
            <button className="clear-filters-btn" onClick={clearFilters}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
              Clear All Filters
            </button>
          )}
        </aside>

        <main className="blogs-main">
          <div className="blogs-results-info">
            <span>
              {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
              {hasActiveFilters && ' found'}
            </span>
            {hasActiveFilters && (
              <div className="active-filters">
                {searchQuery && (
                  <span className="filter-tag">
                    Search: "{searchQuery}"
                    <button onClick={() => setSearchQuery('')}>×</button>
                  </span>
                )}
                {selectedCategory && (
                  <span className="filter-tag">
                    {categoryConfig[selectedCategory]?.label || selectedCategory}
                    <button onClick={() => setSelectedCategory(null)}>×</button>
                  </span>
                )}
                {selectedTag && (
                  <span className="filter-tag">
                    {selectedTag}
                    <button onClick={() => setSelectedTag(null)}>×</button>
                  </span>
                )}
              </div>
            )}
          </div>

          {filteredPosts.length > 0 ? (
            <div className="blogs-grid">
              {filteredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="blogs-empty">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <h3>No articles found</h3>
              <p>Try adjusting your search or filter criteria</p>
              <button className="btn" onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
