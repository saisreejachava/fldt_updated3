import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'node_modules/@arcgis/core/assets/**',
          dest: 'arcgis-assets',
        },
      ],
    }),
    // Serve /cms/ as static HTML (Decap CMS)
    {
      name: 'serve-cms',
      enforce: 'pre',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url || ''
          const urlPath = url.split('?')[0]
          
          if (urlPath.startsWith('/cms')) {
            let filePath: string
            if (urlPath === '/cms' || urlPath === '/cms/') {
              filePath = path.join(__dirname, 'public/cms/index.html')
            } else {
              // /cms/config.yml -> public/cms/config.yml
              filePath = path.join(__dirname, 'public', urlPath)
            }
            
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const ext = path.extname(filePath).toLowerCase()
              const contentTypes: Record<string, string> = {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'application/javascript',
                '.yml': 'text/yaml; charset=utf-8',
                '.yaml': 'text/yaml; charset=utf-8',
                '.json': 'application/json',
              }
              res.setHeader('Content-Type', contentTypes[ext] || 'application/octet-stream')
              res.setHeader('Cache-Control', 'no-cache')
              res.end(fs.readFileSync(filePath))
              return
            }
          }
          next()
        })
      },
    },
    // Serve images from content/posts and public/images/blog
    {
      name: 'serve-content-images',
      enforce: 'pre',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url || ''
          const urlPath = url.split('?')[0]

          const contentMatch = urlPath.match(/^\/content-images\/([^/]+)\/(.+)/)
          if (contentMatch) {
            const [, slug, filename] = contentMatch
            const imagePath = path.join(__dirname, 'content/posts', slug, filename)
            if (fs.existsSync(imagePath)) {
              return serveImage(imagePath, res)
            }
          }

          const blogMatch = urlPath.match(/^\/images\/blog\/(.+)/)
          if (blogMatch) {
            const filename = blogMatch[1]
            const publicPath = path.join(__dirname, 'public/images/blog', filename)
            if (fs.existsSync(publicPath)) {
              return serveImage(publicPath, res)
            }
            const found = searchInContentPosts(filename, res)
            if (found) return
          }

          const rootImageMatch = urlPath.match(/^\/([^/]+\.(jpg|jpeg|png|gif|webp|svg))$/i)
          if (rootImageMatch) {
            const filename = rootImageMatch[1]
            const found = searchInContentPosts(filename, res)
            if (found) return
          }

          next()

          function searchInContentPosts(filename: string, res: { setHeader: (a: string, b: string) => void; end: (b: Buffer) => void }): boolean {
            const postsDir = path.join(__dirname, 'content/posts')
            if (fs.existsSync(postsDir)) {
              const postFolders = fs.readdirSync(postsDir, { withFileTypes: true })
                .filter((d) => d.isDirectory())
                .map((d) => d.name)
              for (const folder of postFolders) {
                const imagePath = path.join(postsDir, folder, filename)
                if (fs.existsSync(imagePath)) {
                  serveImage(imagePath, res)
                  return true
                }
              }
            }
            return false
          }

          function serveImage(imagePath: string, res: { setHeader: (a: string, b: string) => void; end: (b: Buffer) => void }) {
            const ext = path.extname(imagePath).toLowerCase()
            const contentTypes: Record<string, string> = {
              '.jpg': 'image/jpeg',
              '.jpeg': 'image/jpeg',
              '.png': 'image/png',
              '.gif': 'image/gif',
              '.webp': 'image/webp',
              '.svg': 'image/svg+xml',
            }
            res.setHeader('Content-Type', contentTypes[ext] || 'application/octet-stream')
            res.setHeader('Cache-Control', 'public, max-age=31536000')
            res.end(fs.readFileSync(imagePath))
          }
        })
      },
    },
  ],
  optimizeDeps: {
    exclude: ['@arcgis/core'],
  },
  server: {
    port: 5175,
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        ws: true,
      },
    },
  },
})
