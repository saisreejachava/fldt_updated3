# Florida Digital Twin — Landing site

A React + Vite front end for the **Florida Digital Twin (FLDT)** initiative: home page, product framework, about story, team directory, and a file-based blog. The UI uses a dark “aether” themed design system with hero video/frame sequences, tabbed product visuals, and optional ArcGIS integration.

## Tech stack

- **React 18** + **TypeScript**
- **Vite 7** (`@vitejs/plugin-react`)
- **react-router-dom** (layout + routes)
- **@arcgis/core** (~4.32) — map SDK; assets are copied into `dist/arcgis-assets` at build time
- **yaml** — parsing blog front matter
- Blog bodies use **`.mdoc`** (Markdown) alongside **`index.yaml`** per post

## Prerequisites

- **Node.js** (LTS recommended)
- **npm** (project uses `package-lock.json` if present)

## Scripts

| Command | Description |
| -------- | ----------- |
| `npm run dev` | Dev server (default port **5175**) |
| `npm run build` | Production build to `dist/` (Node heap raised for the static copy step) |
| `npm run preview` | Serve `dist/` locally on port **5175** |
| `npm run jax-sequence:mp4` | Optional: encode `public/jax_sequence/jax_*.png` into an MP4 via ffmpeg |

## Local development

```bash
npm install
npm run dev
```

Open **http://localhost:5175**.

### API proxy

`vite.config.ts` proxies **`/api/v1`** to **`http://localhost:8081`** (useful if you run a separate backend).

### CMS (Decap)

In dev, **`/cms`** is served from `public/cms/` (static Decap CMS shell + `config.yml`). Use this only when you are wiring or authoring against that workflow.

### Blog images

Dev middleware serves:

- `/content-images/:slug/:file` → `content/posts/:slug/:file`
- `/images/blog/*` and some root image paths → `public/images/blog` or co-located post assets

## Production build

```bash
npm run build
```

Output is **`dist/`**, including copied ArcGIS assets (`arcgis-assets/**`).

## Routes

| Path | Page |
|------|------|
| `/` | Landing — hero, insight feed, communities, product layers strip, resources, blog teaser, partners |
| `/products` | Product framework — Platforms / Tools / Interfaces tabs + copy |
| `/about` | About — institutional pillars with SVG illustrations |
| `/people` | Team grid (sample data; cards link-style UI) |
| `/blogs` | Blog index |
| `/blogs/:slug` | Single post from `content/posts` |

All of the above render inside **`SiteLayout`** (navbar + footer).

## Project layout (high level)

```
src/
  App.tsx              # Route table
  main.tsx             # React root + BrowserRouter
  pages/               # LandingPage, ProductsPage, AboutPage, PeoplePage, BlogsPage, BlogPostPage
  components/
    layout/            # SiteLayout, SiteNavbar, SiteFooter, FooterAnimatic
    landing/           # Hero sequence, typing headline, insight feed, Jax scroll sequence, partners, …
    blog/              # Blog cards + home section
    products/          # ProductsTabVisual (tab SVGs)
    about/             # AboutPillarVisual
    people/            # PeopleCard, PeopleCornerChip
  data/                # e.g. product layer copy
  lib/                 # e.g. blog loading (`content/posts` via import.meta.glob)
  styles/              # global.css imports design-system, landing, blogs, people, about, …
content/
  posts/<slug>/        # index.yaml + content.mdoc (+ images)
public/
  cms/                 # Decap CMS static files
  images/, jax_sequence/, …
```

## Blog content

Each post lives under **`content/posts/<slug>/`**:

- **`index.yaml`** — front matter (title, date, excerpt, tags, etc.)
- **`content.mdoc`** — Markdown body

Posts are discovered at build/dev time through Vite glob imports (`src/lib/blog.ts`).

## Environment notes

- **ArcGIS**: Large asset tree is excluded from pre-bundling (`optimizeDeps.exclude`) and duplicated into `dist` by **`vite-plugin-static-copy`**.
- **Memory**: `build` uses `node --max-old-space-size=6144` so the copy step can complete on large trees.

## License / ownership

This repository is marked **private** in `package.json`. Add your organization’s license or usage terms here if you publish or redistribute the code.
