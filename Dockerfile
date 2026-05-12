# Stage 1: Build landing app
FROM node:20-alpine AS builder

WORKDIR /app

ENV NODE_OPTIONS="--max-old-space-size=6144"

COPY landing/package.json landing/package-lock.json* ./
RUN npm ci 2>/dev/null || npm install

COPY landing/ ./
RUN npm run build

# Copy post images into dist for production
RUN mkdir -p /app/dist/content-images \
  && find /app/content/posts -maxdepth 2 -type f \( \
       -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o \
       -name "*.gif" -o -name "*.webp" -o -name "*.svg" -o -name "*.heic" \
     \) -exec sh -c 'slug=$(basename "$(dirname "$1")"); mkdir -p "/app/dist/content-images/$slug"; cp "$1" "/app/dist/content-images/$slug/"' _ {} \; \
  || true

# Stage 2: Serve with nginx + CMS auth
FROM node:20-alpine

RUN apk add --no-cache nginx \
  && mkdir -p /etc/nginx/conf.d /var/log/nginx /var/cache/nginx

WORKDIR /app

COPY --from=builder /app/dist /usr/share/nginx/html

COPY cms-auth/package.json cms-auth/server.js ./cms-auth/
WORKDIR /app/cms-auth
RUN npm install --omit=dev
WORKDIR /app

RUN echo 'events { worker_connections 1024; } \
http { \
  include /etc/nginx/mime.types; \
  default_type application/octet-stream; \
  sendfile on; \
  keepalive_timeout 65; \
  server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    # Serve CMS files (config.yml, index.html, preview.css) as static files \
    location /cms { \
      try_files $uri $uri/ /cms/index.html; \
    } \
    # Proxy GitHub OAuth auth endpoints to cms-auth service \
    location /auth { \
      proxy_pass http://127.0.0.1:3000; \
      proxy_http_version 1.1; \
      proxy_set_header Host $host; \
      proxy_set_header X-Real-IP $remote_addr; \
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
      proxy_set_header X-Forwarded-Proto $scheme; \
    } \
    # SPA routing - serve index.html for all other routes \
    location / { \
      try_files $uri $uri/ /index.html; \
    } \
  } \
}' > /etc/nginx/nginx.conf

COPY landing/docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80

# No-op update to trigger landing deploy workflow.
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
