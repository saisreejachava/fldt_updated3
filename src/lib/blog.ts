import YAML from 'yaml';

// Blog post types and utilities
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  coverImage?: string;
  publishedAt: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: 'research' | 'technology' | 'community' | 'news' | 'case-study';
  tags: string[];
  featured: boolean;
  draft: boolean;
  content: string;
}

export interface BlogPostMeta extends Omit<BlogPost, 'content'> {}

// Category display names and colors
export const categoryConfig: Record<string, { label: string; color: string }> = {
  'research': { label: 'Research', color: '#6366f1' },
  'technology': { label: 'Technology', color: '#0ea5e9' },
  'community': { label: 'Community', color: '#10b981' },
  'news': { label: 'News', color: '#f59e0b' },
  'case-study': { label: 'Case Study', color: '#8b5cf6' },
};

type RawData = Record<string, unknown>;

const yamlEntries = import.meta.glob('../../content/posts/**/index.yaml', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const ymlEntries = import.meta.glob('../../content/posts/**/index.yml', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const mdocEntries = import.meta.glob('../../content/posts/**/index.mdoc', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const contentEntries = import.meta.glob('../../content/posts/**/content.mdoc', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>;

const DEFAULT_AUTHOR = 'Florida Digital Twin';
const DEFAULT_CATEGORY: BlogPost['category'] = 'news';

const parseFrontmatter = (raw: string): { data: RawData; content: string } => {
  if (!raw.startsWith('---')) {
    return { data: {}, content: raw };
  }

  const delimiter = '\n---';
  const endIndex = raw.indexOf(delimiter, 3);
  if (endIndex === -1) {
    return { data: {}, content: raw };
  }

  const frontmatter = raw.slice(3, endIndex).trim();
  const content = raw.slice(endIndex + delimiter.length).trimStart();
  const data = (YAML.parse(frontmatter) || {}) as RawData;

  return { data, content };
};

const extractSlugFromPath = (path: string): string => {
  const match = path.match(/content\/posts\/([^/]+)/);
  return match?.[1] || path.split('/').slice(-2, -1)[0];
};

const normalizeCoverImage = (value: unknown, slug?: string): string | undefined => {
  let imagePath: string | undefined;

  if (typeof value === 'string' && value.trim()) {
    imagePath = value.trim();
  } else if (value && typeof value === 'object') {
    const obj = value as { src?: string; url?: string };
    imagePath = obj.src || obj.url;
  }

  if (!imagePath) return undefined;

  if (imagePath.startsWith('http') || imagePath.startsWith('/')) {
    return imagePath;
  }

  if (slug) {
    return `/content-images/${slug}/${imagePath}`;
  }

  return `/images/blog/${imagePath}`;
};

const normalizeAuthor = (value: unknown, slug?: string): BlogPost['author'] => {
  if (typeof value === 'string') {
    return { name: value };
  }
  if (value && typeof value === 'object') {
    const obj = value as { name?: string; avatar?: string | { src?: string; url?: string } };
    return {
      name: obj.name || DEFAULT_AUTHOR,
      avatar: normalizeCoverImage(obj.avatar, slug),
    };
  }
  return { name: DEFAULT_AUTHOR };
};

const normalizeCategory = (value: unknown): BlogPost['category'] => {
  const category = typeof value === 'string' ? value : DEFAULT_CATEGORY;
  if (categoryConfig[category]) return category as BlogPost['category'];
  return DEFAULT_CATEGORY;
};

const normalizeTags = (value: unknown): string[] => {
  if (Array.isArray(value)) {
    return value.map((tag) => String(tag)).filter(Boolean);
  }
  if (typeof value === 'string') {
    return value.split(',').map((tag) => tag.trim()).filter(Boolean);
  }
  return [];
};

const normalizeDate = (value: unknown): string => {
  if (typeof value === 'string' && value.trim()) return value;
  return new Date().toISOString().split('T')[0];
};

const buildPostFromData = (slug: string, data: RawData, content: string): BlogPost => {
  return {
    slug,
    title: String(data.title || slug.replace(/-/g, ' ')),
    excerpt: String(data.excerpt || ''),
    coverImage: normalizeCoverImage(data.coverImage || data.cover || data.image, slug),
    publishedAt: normalizeDate(data.publishedAt || data.date),
    author: normalizeAuthor(data.author, slug),
    category: normalizeCategory(data.category),
    tags: normalizeTags(data.tags),
    featured: Boolean(data.featured),
    draft: Boolean(data.draft),
    content: content || '',
  };
};

const loadPosts = (): BlogPost[] => {
  const posts: BlogPost[] = [];
  const combinedYamlEntries = { ...yamlEntries, ...ymlEntries };

  Object.entries(combinedYamlEntries).forEach(([path, raw]) => {
    const slug = extractSlugFromPath(path);
    const data = (YAML.parse(raw) || {}) as RawData;
    const yamlContent = typeof data.content === 'string' ? data.content : '';
    const contentPath = path.replace(/index\.ya?ml$/, 'content.mdoc');
    const fileContent = contentEntries[contentPath] || '';
    const content = yamlContent || fileContent;
    posts.push(buildPostFromData(slug, data, content));
  });

  Object.entries(mdocEntries).forEach(([path, raw]) => {
    const slug = extractSlugFromPath(path);
    const { data, content } = parseFrontmatter(raw);
    posts.push(buildPostFromData(slug, data, content));
  });

  const uniquePosts = new Map<string, BlogPost>();
  posts.forEach((post) => {
    uniquePosts.set(post.slug, post);
  });

  return Array.from(uniquePosts.values());
};

const blogPosts = loadPosts();

export function getAllPosts(): BlogPostMeta[] {
  return blogPosts
    .filter((post) => !post.draft)
    .map(({ content, ...meta }) => meta)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getFeaturedPosts(limit: number = 3): BlogPostMeta[] {
  return getAllPosts()
    .filter((post) => post.featured)
    .slice(0, limit);
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug && !post.draft);
}

export function searchPosts(query: string): BlogPostMeta[] {
  const lowercaseQuery = query.toLowerCase();
  return getAllPosts().filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.excerpt.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      post.author.name.toLowerCase().includes(lowercaseQuery),
  );
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
}

export function getCategoriesWithCounts(): { category: string; count: number }[] {
  const counts: Record<string, number> = {};
  getAllPosts().forEach((post) => {
    counts[post.category] = (counts[post.category] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
