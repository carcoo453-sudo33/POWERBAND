# Troubleshooting Guide

This guide helps you resolve common issues when working with POWERBAND.

## 🚨 Common Issues

### Installation Problems

#### Node.js Version Issues

**Problem**: `npm install` fails with version errors
```bash
Error: This project requires Node.js 18.x or higher
```

**Solution**:
```bash
# Check your Node.js version
node --version

# Install Node Version Manager (nvm)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use Node.js 18
nvm install 18
nvm use 18

# Verify installation
node --version
npm --version
```

#### Permission Errors (macOS/Linux)

**Problem**: Permission denied when installing packages
```bash
Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules'
```

**Solution**:
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Or use nvm to avoid permission issues
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

#### Package Lock Conflicts

**Problem**: Package lock file conflicts
```bash
Error: npm ERR! peer dep missing
```

**Solution**:
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install
```

### Development Server Issues

#### Port Already in Use

**Problem**: Port 8080 is already in use
```bash
Error: Port 8080 is already in use
```

**Solution**:
```bash
# Use a different port
npm run dev -- --port 3000

# Or kill the process using the port (macOS/Linux)
lsof -ti:8080 | xargs kill -9

# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

#### Hot Reload Not Working

**Problem**: Changes don't reflect in the browser

**Solution**:
```bash
# Check if you're editing the right files
# Ensure files are in the src/ directory

# Restart the development server
npm run dev

# Clear browser cache
# Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (macOS)

# Check for TypeScript errors
npm run build
```

#### Module Resolution Errors

**Problem**: Cannot resolve module imports
```bash
Error: Cannot resolve module '@/components/Button'
```

**Solution**:
```bash
# Check tsconfig.json path mapping
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}

# Restart TypeScript server in VS Code
# Ctrl+Shift+P -> "TypeScript: Restart TS Server"
```

### Build Issues

#### Build Failures

**Problem**: Build fails with TypeScript errors
```bash
Error: Type 'string' is not assignable to type 'number'
```

**Solution**:
```bash
# Check TypeScript errors
npx tsc --noEmit

# Fix type errors in your code
# Example fix:
const age: number = parseInt(ageString, 10);

# Build again
npm run build
```

#### Memory Issues During Build

**Problem**: Build fails with out of memory error
```bash
Error: JavaScript heap out of memory
```

**Solution**:
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build

# Or add to package.json scripts
{
  "scripts": {
    "build": "NODE_OPTIONS='--max-old-space-size=4096' vite build"
  }
}
```

#### Import/Export Errors

**Problem**: Module import/export issues
```bash
Error: The requested module does not provide an export named 'default'
```

**Solution**:
```tsx
// Wrong
import Button from '@/components/ui/button';

// Correct
import { Button } from '@/components/ui/button';

// Or check the actual export in the file
// If it's a default export:
export default function Button() { ... }

// If it's a named export:
export function Button() { ... }
```

### Styling Issues

#### Tailwind Classes Not Working

**Problem**: Tailwind CSS classes not applying
```bash
Classes like 'bg-primary' not working
```

**Solution**:
```bash
# Check if Tailwind is properly configured
# Verify tailwind.config.ts includes your files
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // ...
}

# Restart development server
npm run dev

# Check if CSS is imported in main.tsx
import './index.css'
```

#### Custom CSS Not Loading

**Problem**: Custom styles not appearing

**Solution**:
```css
/* Make sure CSS is imported in the correct order */
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Your custom styles go here */
@layer utilities {
  .custom-class {
    /* styles */
  }
}
```

#### Responsive Design Issues

**Problem**: Responsive classes not working on mobile

**Solution**:
```html
<!-- Ensure viewport meta tag is present -->
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<!-- Use correct responsive prefixes -->
<div class="text-sm md:text-lg lg:text-xl">
  Responsive text
</div>
```

### Performance Issues

#### Slow Loading

**Problem**: Application loads slowly

**Solution**:
```tsx
// Implement code splitting
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// Optimize images
// Use WebP format
// Implement lazy loading for images
<img 
  src="image.webp" 
  loading="lazy" 
  alt="Description"
/>
```

#### Large Bundle Size

**Problem**: Bundle size is too large

**Solution**:
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist/assets/*.js

# Implement code splitting in vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-button']
        }
      }
    }
  }
});
```

### Testing Issues

#### Tests Failing

**Problem**: Tests fail unexpectedly
```bash
Error: Cannot find module '@testing-library/jest-dom'
```

**Solution**:
```bash
# Install missing test dependencies
npm install --save-dev @testing-library/jest-dom

# Set up test configuration in vitest.config.ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});

# Create setup file
// src/test/setup.ts
import '@testing-library/jest-dom';
```

#### Component Tests Not Working

**Problem**: Component tests fail to render

**Solution**:
```tsx
// Wrap components with necessary providers
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

// Use in tests
test('renders component', () => {
  renderWithRouter(<MyComponent />);
});
```

### Deployment Issues

#### GitHub Pages 404 Errors

**Problem**: Routes return 404 on GitHub Pages

**Solution**:
```bash
# Add 404.html that redirects to index.html
# Create public/404.html
<!DOCTYPE html>
<html>
<head>
  <script>
    window.location.href = '/POWERBAND/';
  </script>
</head>
</html>

# Configure base URL in vite.config.ts
export default defineConfig({
  base: '/POWERBAND/',
  // ...
});
```

#### Environment Variables Not Working

**Problem**: Environment variables undefined in production

**Solution**:
```bash
# Ensure variables start with VITE_
VITE_API_URL=https://api.example.com

# Check build logs for environment variables
npm run build

# Verify in built files
grep -r "VITE_API_URL" dist/
```

## 🔧 Debugging Tools

### Browser DevTools

```javascript
// Debug React components
// Install React Developer Tools extension

// Debug performance
console.time('Component Render');
// ... component code
console.timeEnd('Component Render');

// Debug network requests
fetch('/api/data')
  .then(response => {
    console.log('Response:', response);
    return response.json();
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

### VS Code Debugging

Create `.vscode/launch.json`:
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome",
      "request": "launch",
      "type": "chrome",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```

### Network Issues

```bash
# Check if development server is running
curl http://localhost:8080

# Check network connectivity
ping google.com

# Check DNS resolution
nslookup github.com

# Check firewall settings
# Windows: Windows Defender Firewall
# macOS: System Preferences > Security & Privacy > Firewall
# Linux: ufw status
```

## 📋 Diagnostic Commands

### System Information

```bash
# Node.js and npm versions
node --version
npm --version

# Operating system
uname -a  # Linux/macOS
systeminfo  # Windows

# Available memory
free -h  # Linux
vm_stat  # macOS
systeminfo | findstr Memory  # Windows
```

### Project Health Check

```bash
# Check for outdated packages
npm outdated

# Audit for vulnerabilities
npm audit

# Check TypeScript configuration
npx tsc --showConfig

# Verify build
npm run build

# Test the built application
npm run preview
```

### Log Analysis

```bash
# View development server logs
npm run dev 2>&1 | tee dev.log

# View build logs
npm run build 2>&1 | tee build.log

# Check browser console for errors
# Open DevTools (F12) and check Console tab
```

## 🆘 Getting Help

### Before Asking for Help

1. **Search existing issues**: Check GitHub issues for similar problems
2. **Check documentation**: Review relevant documentation sections
3. **Reproduce the issue**: Create a minimal reproduction case
4. **Gather information**: Collect error messages, logs, and system info

### Creating a Bug Report

Include the following information:

```markdown
## Environment
- OS: [e.g., Windows 11, macOS 13, Ubuntu 22.04]
- Node.js version: [e.g., 18.17.0]
- npm version: [e.g., 9.6.7]
- Browser: [e.g., Chrome 120, Firefox 121]

## Steps to Reproduce
1. Step one
2. Step two
3. Step three

## Expected Behavior
What you expected to happen

## Actual Behavior
What actually happened

## Error Messages
```
Paste any error messages here
```

## Additional Context
Any other relevant information
```

### Community Resources

- **GitHub Issues**: [Report bugs and request features](https://github.com/Mostafa-SAID7/POWERBAND/issues)
- **Discussions**: [Community discussions](https://github.com/Mostafa-SAID7/POWERBAND/discussions)
- **Documentation**: [Project documentation](./README.md)

### Emergency Fixes

If you need to quickly fix a broken build:

```bash
# Reset to last working commit
git reset --hard HEAD~1

# Or create a new branch from last working commit
git checkout -b hotfix/emergency-fix

# Make minimal changes and test
npm run build
npm run test

# Deploy the fix
git commit -m "hotfix: emergency fix for production"
git push origin hotfix/emergency-fix
```

---

**Still having issues?** Don't hesitate to [create an issue](https://github.com/Mostafa-SAID7/POWERBAND/issues/new) with detailed information!