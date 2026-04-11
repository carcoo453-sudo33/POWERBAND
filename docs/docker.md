# Docker Guide

This guide covers how to build, run, and deploy POWERBAND using Docker containers.

## 🐳 Quick Start with Docker

### Prerequisites
- **Docker** installed on your system
- **Docker Compose** (usually included with Docker Desktop)

### Build and Run
```bash
# Build the Docker image
docker build -t powerband .

# Run the container
docker run -p 8080:80 powerband

# Access the application
open http://localhost:8080
```

### Using Docker Compose
```bash
# Start the application
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the application
docker-compose down
```

## 🏗️ Docker Architecture

### Multi-Stage Build
The Dockerfile uses a multi-stage build approach:

1. **Builder Stage**: Builds the React application
2. **Production Stage**: Serves the built files with Nginx

### Image Layers
```dockerfile
# Stage 1: Build (node:18-alpine)
FROM node:18-alpine AS builder
# - Install dependencies
# - Build the application
# - Output to /app/dist

# Stage 2: Production (nginx:alpine)
FROM nginx:alpine AS production
# - Copy built files from builder
# - Configure Nginx
# - Set up security and caching
```

## 📦 Docker Images

### Base Images
- **Builder**: `node:18-alpine` (~40MB base)
- **Production**: `nginx:alpine` (~15MB base)
- **Final Image**: ~25MB (optimized)

### Image Optimization
- Multi-stage build reduces final image size
- Alpine Linux for minimal footprint
- Only production dependencies included
- Static files served by Nginx

## 🔧 Configuration Files

### Dockerfile
```dockerfile
# Multi-stage build for optimal size
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production --silent
COPY . .
RUN npm run build

FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx Configuration
- **SPA Support**: Handles client-side routing
- **Gzip Compression**: Reduces bandwidth usage
- **Security Headers**: Protects against common attacks
- **Caching**: Optimizes static asset delivery
- **Health Checks**: Monitors container health

### Docker Compose
```yaml
services:
  powerband:
    build: .
    ports:
      - "8080:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:80/health"]
```

## 🚀 Deployment Options

### Local Development
```bash
# Quick development setup
docker-compose up -d

# View application
open http://localhost:8080

# View logs
docker-compose logs -f powerband
```

### Production Deployment
```bash
# Build production image
docker build -t powerband:latest .

# Tag for registry
docker tag powerband:latest your-registry/powerband:latest

# Push to registry
docker push your-registry/powerband:latest

# Deploy on production server
docker run -d \
  --name powerband-prod \
  -p 80:80 \
  --restart unless-stopped \
  your-registry/powerband:latest
```

### Cloud Deployment

#### AWS ECS
```bash
# Build and push to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com
docker build -t powerband .
docker tag powerband:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/powerband:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/powerband:latest
```

#### Google Cloud Run
```bash
# Build and deploy to Cloud Run
gcloud builds submit --tag gcr.io/PROJECT-ID/powerband
gcloud run deploy --image gcr.io/PROJECT-ID/powerband --platform managed
```

#### Azure Container Instances
```bash
# Build and push to Azure Container Registry
az acr build --registry myregistry --image powerband .
az container create --resource-group myResourceGroup --name powerband --image myregistry.azurecr.io/powerband:latest
```

## 🔍 Container Management

### Useful Docker Commands

#### Image Management
```bash
# List images
docker images

# Remove unused images
docker image prune

# Build with no cache
docker build --no-cache -t powerband .

# Inspect image
docker inspect powerband
```

#### Container Management
```bash
# List running containers
docker ps

# View container logs
docker logs powerband-container

# Execute commands in container
docker exec -it powerband-container sh

# Stop container
docker stop powerband-container

# Remove container
docker rm powerband-container
```

#### System Cleanup
```bash
# Remove all stopped containers
docker container prune

# Remove unused networks
docker network prune

# Remove unused volumes
docker volume prune

# Complete system cleanup
docker system prune -a
```

### Health Monitoring
```bash
# Check container health
docker inspect --format='{{.State.Health.Status}}' powerband-container

# View health check logs
docker inspect --format='{{range .State.Health.Log}}{{.Output}}{{end}}' powerband-container
```

## 🔒 Security Best Practices

### Container Security
- **Non-root user**: Runs as nginx user, not root
- **Minimal base image**: Alpine Linux reduces attack surface
- **Security headers**: Configured in Nginx
- **Health checks**: Monitors container health
- **Resource limits**: Prevents resource exhaustion

### Production Security
```yaml
# docker-compose.prod.yml
services:
  powerband:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    read_only: true
    tmpfs:
      - /var/cache/nginx:noexec,nosuid,size=100m
      - /var/run:noexec,nosuid,size=100m
```

### Network Security
```yaml
networks:
  powerband-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
```

## 📊 Performance Optimization

### Build Optimization
```dockerfile
# Use .dockerignore to exclude unnecessary files
# Multi-stage build to reduce final image size
# npm ci for faster, reliable builds
# Alpine images for smaller footprint
```

### Runtime Optimization
```nginx
# Gzip compression
gzip on;
gzip_types text/plain text/css application/json application/javascript;

# Browser caching
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Resource Limits
```yaml
services:
  powerband:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 256M
```

## 🧪 Testing Docker Setup

### Local Testing
```bash
# Build and test locally
docker build -t powerband-test .
docker run -p 8080:80 powerband-test

# Test health endpoint
curl http://localhost:8080/health

# Test application
curl http://localhost:8080/
```

### Automated Testing
```bash
# Test in CI/CD pipeline
docker build -t powerband-ci .
docker run -d --name powerband-test -p 8080:80 powerband-ci

# Wait for container to be ready
sleep 10

# Run tests
curl -f http://localhost:8080/health || exit 1
curl -f http://localhost:8080/ || exit 1

# Cleanup
docker stop powerband-test
docker rm powerband-test
```

## 🔧 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear Docker cache
docker builder prune

# Build with verbose output
docker build --progress=plain -t powerband .

# Check build context size
docker build --no-cache -t powerband . 2>&1 | grep "Sending build context"
```

#### Runtime Issues
```bash
# Check container logs
docker logs powerband-container

# Check Nginx configuration
docker exec powerband-container nginx -t

# Check file permissions
docker exec powerband-container ls -la /usr/share/nginx/html
```

#### Performance Issues
```bash
# Monitor resource usage
docker stats powerband-container

# Check container processes
docker exec powerband-container ps aux

# Analyze image layers
docker history powerband
```

### Debug Mode
```bash
# Run container in debug mode
docker run -it --entrypoint sh powerband

# Or override command
docker run -it powerband sh
```

## 📋 Docker Checklist

Before deploying to production:

- [ ] **Build succeeds** without errors
- [ ] **Image size** is optimized (< 50MB)
- [ ] **Security scan** passes
- [ ] **Health checks** work correctly
- [ ] **Environment variables** are configured
- [ ] **Resource limits** are set
- [ ] **Logging** is configured
- [ ] **Backup strategy** is in place
- [ ] **Monitoring** is set up
- [ ] **Update process** is defined

---

**Next**: Learn about [Deployment](./deployment.md) options for production!