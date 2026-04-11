# Installation Guide

This guide will help you set up POWERBAND on your local development environment.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

### Required Software
- **Node.js** (version 18.x or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`
- **npm** (comes with Node.js) or **yarn**
  - Verify npm: `npm --version`
  - Or install yarn: `npm install -g yarn`
- **Git**
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

### Recommended Tools
- **VS Code** with extensions:
  - ES7+ React/Redux/React-Native snippets
  - Tailwind CSS IntelliSense
  - TypeScript Importer
  - Prettier - Code formatter
  - ESLint

## Installation Steps

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/Mostafa-SAID7/POWERBAND.git

# Navigate to the project directory
cd POWERBAND
```

### 2. Install Dependencies

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory (optional):
```bash
# Copy the example environment file
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Development settings
VITE_APP_TITLE=POWERBAND
VITE_API_URL=http://localhost:3000/api
VITE_ENVIRONMENT=development

# Analytics (optional)
VITE_GA_TRACKING_ID=your_google_analytics_id

# Feature flags (optional)
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_PWA=true
```

### 4. Start Development Server

```bash
# Start the development server
npm run dev

# Or with yarn
yarn dev
```

The application will be available at `http://localhost:8080`

### 5. Verify Installation

Open your browser and navigate to `http://localhost:8080`. You should see the POWERBAND homepage.

## Build for Production

To create a production build:

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

The built files will be in the `dist/` directory.

## Alternative Installation Methods

### Using Bun (Experimental)

If you have Bun installed:
```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build
```

### Using Docker

```bash
# Build the Docker image
docker build -t powerband .

# Run the container
docker run -p 8080:8080 powerband
```

## Troubleshooting

### Common Issues

#### Node Version Issues
```bash
# Check your Node.js version
node --version

# If you need to upgrade, use nvm (Node Version Manager)
nvm install 18
nvm use 18
```

#### Port Already in Use
```bash
# If port 8080 is busy, specify a different port
npm run dev -- --port 3000
```

#### Permission Errors (macOS/Linux)
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

#### Clear Cache
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Getting Help

If you encounter issues:

1. Check the [Troubleshooting Guide](./troubleshooting.md)
2. Search [existing issues](https://github.com/Mostafa-SAID7/POWERBAND/issues)
3. Create a [new issue](https://github.com/Mostafa-SAID7/POWERBAND/issues/new) with:
   - Your operating system
   - Node.js version
   - npm/yarn version
   - Error messages
   - Steps to reproduce

## Next Steps

After successful installation:

1. Read the [Quick Start Guide](./quick-start.md)
2. Explore the [Project Structure](./project-structure.md)
3. Check out the [Development Guide](./development.md)
4. Review the [Component Guide](./components.md)

---

**Need help?** Join our community or create an issue on GitHub!