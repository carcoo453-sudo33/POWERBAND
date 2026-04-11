# Deployment Guide

This guide covers various deployment options for POWERBAND, from simple static hosting to advanced CI/CD pipelines.

## 🚀 Quick Deployment Options

### GitHub Pages (Recommended)

GitHub Pages provides free hosting for static sites directly from your repository.

#### Automatic Deployment (CI/CD)

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages:

1. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "GitHub Actions" as source

2. **Push to main branch**:
   ```bash
   git push origin main
   ```

3. **Access your site**:
   - URL: `https://yourusername.github.io/POWERBAND`
   - Custom domain supported

#### Manual Deployment

```bash
# Build the project
npm run build

# Install gh-pages (if not already installed)
npm install -g gh-pages

# Deploy to GitHub Pages
gh-pages -d dist
```

### Netlify

Netlify offers excellent static site hosting with automatic deployments.

#### Method 1: Git Integration
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on git push

#### Method 2: Manual Deploy
```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### Vercel

Vercel provides zero-configuration deployments for modern web projects.

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Configuration in `vercel.json`:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## 🏗️ Build Configuration

### Environment Variables

Create environment-specific configurations:

#### Production Environment
```env
# .env.production
VITE_APP_TITLE=POWERBAND
VITE_API_URL=https://api.powerband.com
VITE_ENVIRONMENT=production
VITE_GA_TRACKING_ID=GA_MEASUREMENT_ID
```

#### Staging Environment
```env
# .env.staging
VITE_APP_TITLE=POWERBAND (Staging)
VITE_API_URL=https://staging-api.powerband.com
VITE_ENVIRONMENT=staging
```

### Build Scripts

Add deployment-specific scripts to `package.json`:

```json
{
  "scripts": {
    "build": "vite build",
    "build:staging": "vite build --mode staging",
    "build:production": "vite build --mode production",
    "preview": "vite preview",
    "deploy:netlify": "npm run build && netlify deploy --prod --dir=dist",
    "deploy:vercel": "npm run build && vercel --prod"
  }
}
```

## 🐳 Docker Deployment

### Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration

Create `nginx.conf`:
```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        # Handle client-side routing
        location / {
            try_files $uri $uri/ /index.html;
        }

        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header Referrer-Policy "no-referrer-when-downgrade" always;
    }
}
```

### Docker Commands

```bash
# Build image
docker build -t powerband .

# Run container
docker run -p 8080:80 powerband

# Docker Compose
docker-compose up -d
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  powerband:
    build: .
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

## ☁️ Cloud Platform Deployment

### AWS S3 + CloudFront

#### S3 Bucket Setup
```bash
# Create S3 bucket
aws s3 mb s3://powerband-app

# Enable static website hosting
aws s3 website s3://powerband-app --index-document index.html --error-document index.html

# Upload files
aws s3 sync dist/ s3://powerband-app --delete
```

#### CloudFront Distribution
```json
{
  "Origins": [{
    "DomainName": "powerband-app.s3-website-us-east-1.amazonaws.com",
    "Id": "S3-powerband-app",
    "CustomOriginConfig": {
      "HTTPPort": 80,
      "OriginProtocolPolicy": "http-only"
    }
  }],
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-powerband-app",
    "ViewerProtocolPolicy": "redirect-to-https"
  }
}
```

### Google Cloud Platform

```bash
# Build the project
npm run build

# Deploy to Google Cloud Storage
gsutil -m rsync -r -d dist/ gs://powerband-app

# Set up load balancer and CDN
gcloud compute backend-buckets create powerband-backend --gcs-bucket-name=powerband-app
```

### Azure Static Web Apps

```bash
# Install Azure CLI
npm install -g @azure/static-web-apps-cli

# Deploy
swa deploy --app-location "." --output-location "dist"
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow

The project includes a comprehensive CI/CD pipeline in `.github/workflows/ci.yml`:

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

### GitLab CI/CD

Create `.gitlab-ci.yml`:
```yaml
stages:
  - test
  - build
  - deploy

test:
  stage: test
  image: node:18
  script:
    - npm ci
    - npm run lint
    - npm run test

build:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - dist/

deploy:
  stage: deploy
  image: node:18
  script:
    - npm install -g netlify-cli
    - netlify deploy --prod --dir=dist --auth=$NETLIFY_AUTH_TOKEN --site=$NETLIFY_SITE_ID
  only:
    - main
```

## 🔧 Performance Optimization

### Build Optimization

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-button', '@radix-ui/react-dialog']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
});
```

### Asset Optimization

```bash
# Optimize images before deployment
npm install -g imagemin-cli
imagemin public/*.{jpg,png} --out-dir=public/optimized
```

### Compression

Enable gzip compression in your server configuration:

```nginx
# Nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

## 📊 Monitoring and Analytics

### Google Analytics

Add to your environment variables:
```env
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

### Performance Monitoring

```typescript
// Add to main.tsx
if (import.meta.env.PROD) {
  // Web Vitals
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  });
}
```

## 🔒 Security Considerations

### Content Security Policy

Add to your HTML head:
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
">
```

### Environment Security

- Never commit sensitive environment variables
- Use secrets management for production
- Rotate API keys regularly
- Enable HTTPS everywhere

## 🚨 Troubleshooting

### Common Deployment Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Routing Issues (404 on refresh)
Configure your server to serve `index.html` for all routes:

```nginx
# Nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

#### Environment Variables Not Working
- Ensure variables start with `VITE_`
- Check environment file is in the correct location
- Verify build command includes environment

### Performance Issues

```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist/assets/*.js
```

## 📋 Deployment Checklist

Before deploying to production:

- [ ] Run tests: `npm run test`
- [ ] Check linting: `npm run lint`
- [ ] Build successfully: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Verify environment variables
- [ ] Check responsive design
- [ ] Test on multiple browsers
- [ ] Verify SEO meta tags
- [ ] Enable analytics
- [ ] Set up monitoring
- [ ] Configure error tracking
- [ ] Test performance
- [ ] Verify security headers

---

**Ready to deploy?** Choose your preferred platform and follow the guide above! 🚀