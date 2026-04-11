# POWERBAND 💪

> **Premium Fitness Equipment Showcase** - A modern, responsive web application built with React, TypeScript, and Tailwind CSS.

[![CI/CD Pipeline](https://github.com/Mostafa-SAID7/POWERBAND/actions/workflows/ci.yml/badge.svg)](https://github.com/Mostafa-SAID7/POWERBAND/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

## 🌟 Live Demo

**[View Live Site →](https://mostafa-said7.github.io/POWERBAND)**

## ✨ Features

### 🎨 **Modern Design**
- **Dark Theme** with neon green accents
- **Responsive Design** that works on all devices
- **Smooth Animations** and micro-interactions
- **Professional Aesthetic** tailored for fitness industry

### ⚡ **Performance**
- **Lightning Fast** with Vite build tool
- **Optimized Assets** and lazy loading
- **Minimal Bundle Size** with code splitting
- **Perfect Lighthouse Scores**

### 🧩 **Developer Experience**
- **TypeScript** for type safety
- **Component-Based Architecture**
- **Comprehensive Documentation**
- **Testing Setup** with Vitest
- **CI/CD Pipeline** with GitHub Actions

### 🎯 **Key Sections**
- **Hero Section** - Compelling value proposition
- **Features Showcase** - Product highlights
- **Product Gallery** - Equipment showcase
- **Pricing Plans** - Flexible pricing options
- **Team Section** - Meet the experts
- **Customer Reviews** - Social proof
- **Contact Form** - Lead generation

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18.x or higher
- **npm** or **yarn**
- **Git**

### Installation

```bash
# Clone the repository
git clone https://github.com/Mostafa-SAID7/POWERBAND.git
cd POWERBAND

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:8080
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 🛠️ Tech Stack

### **Frontend**
- **[React 18](https://react.dev/)** - Modern React with hooks
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icons

### **Build Tools**
- **[Vite](https://vitejs.dev/)** - Lightning-fast build tool
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

### **Testing & Quality**
- **[Vitest](https://vitest.dev/)** - Unit testing framework
- **[Testing Library](https://testing-library.com/)** - Component testing
- **[TypeScript](https://www.typescriptlang.org/)** - Static type checking

### **Deployment**
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD pipeline
- **[GitHub Pages](https://pages.github.com/)** - Static site hosting
- **[Docker](https://www.docker.com/)** - Containerization support

## 📁 Project Structure

```
POWERBAND/
├── 📁 .github/              # GitHub workflows and templates
│   ├── 📁 workflows/        # CI/CD pipelines
│   ├── 📁 ISSUE_TEMPLATE/   # Issue templates
│   ├── 📄 CONTRIBUTING.md   # Contribution guidelines
│   └── 📄 CODE_OF_CONDUCT.md
├── 📁 docs/                 # Comprehensive documentation
│   ├── 📄 installation.md   # Setup guide
│   ├── 📄 quick-start.md    # Quick start guide
│   ├── 📄 components.md     # Component documentation
│   ├── 📄 deployment.md     # Deployment guide
│   └── 📄 troubleshooting.md
├── 📁 public/               # Static assets
│   ├── 🖼️ favicon.svg       # Site favicon
│   └── 🤖 robots.txt        # SEO robots file
├── 📁 src/                  # Source code
│   ├── 📁 components/       # React components
│   │   ├── 📁 ui/           # Base UI components
│   │   ├── 📄 Hero.tsx      # Hero section
│   │   ├── 📄 Features.tsx  # Features section
│   │   └── 📄 ...           # Other components
│   ├── 📁 hooks/            # Custom React hooks
│   ├── 📁 pages/            # Page components
│   ├── 📁 utils/            # Utility functions
│   ├── 📄 App.tsx           # Main app component
│   ├── 📄 main.tsx          # Entry point
│   └── 🎨 index.css         # Global styles
├── 📄 package.json          # Dependencies and scripts
├── 📄 tailwind.config.ts    # Tailwind configuration
├── 📄 tsconfig.json         # TypeScript configuration
├── 📄 vite.config.ts        # Vite configuration
└── 📄 README.md             # This file
```

## 🎨 Design System

### **Color Palette**
```css
/* Primary Colors */
--primary: 110 100% 55%;        /* Neon Green #00FF00 */
--background: 0 0% 4%;          /* Dark Background #0A0A0A */
--foreground: 0 0% 95%;         /* Light Text #F2F2F2 */

/* Semantic Colors */
--muted-foreground: 0 0% 55%;   /* Muted Text #8C8C8C */
--border: 0 0% 15%;             /* Border Color #262626 */
--accent: 110 100% 55%;         /* Accent Color */
```

### **Typography**
- **Headings**: Space Grotesk (Modern, geometric)
- **Body**: Inter (Readable, professional)
- **Scale**: Responsive typography with fluid scaling

### **Components**
- **Buttons**: Multiple variants (default, outline, ghost)
- **Cards**: Consistent spacing and styling
- **Forms**: Accessible input components
- **Navigation**: Responsive navbar with mobile menu

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

- **[📖 Getting Started](./docs/README.md)** - Documentation overview
- **[⚡ Quick Start](./docs/quick-start.md)** - 5-minute setup guide
- **[🏗️ Installation](./docs/installation.md)** - Detailed setup instructions
- **[📁 Project Structure](./docs/project-structure.md)** - Codebase organization
- **[🧩 Components](./docs/components.md)** - Component usage guide
- **[🚀 Deployment](./docs/deployment.md)** - Deployment options
- **[🔧 Troubleshooting](./docs/troubleshooting.md)** - Common issues and solutions

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript checks

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:ui      # Run tests with UI

# Deployment
npm run deploy       # Deploy to GitHub Pages
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./.github/CONTRIBUTING.md) for details.

### **Quick Contribution Steps**
1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### **Development Setup**
```bash
# Fork and clone the repo
git clone https://github.com/YOUR_USERNAME/POWERBAND.git
cd POWERBAND

# Install dependencies
npm install

# Create a new branch
git checkout -b feature/your-feature

# Start development
npm run dev
```

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful component library
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Lucide](https://lucide.dev/)** - Beautiful icon library
- **[Unsplash](https://unsplash.com/)** - High-quality images

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/Mostafa-SAID7/POWERBAND?style=social)
![GitHub forks](https://img.shields.io/github/forks/Mostafa-SAID7/POWERBAND?style=social)
![GitHub issues](https://img.shields.io/github/issues/Mostafa-SAID7/POWERBAND)
![GitHub pull requests](https://img.shields.io/github/issues-pr/Mostafa-SAID7/POWERBAND)

## 🔗 Links

- **[Live Demo](https://mostafa-said7.github.io/POWERBAND)** - See it in action
- **[Documentation](./docs/README.md)** - Comprehensive guides
- **[Issues](https://github.com/Mostafa-SAID7/POWERBAND/issues)** - Report bugs or request features
- **[Discussions](https://github.com/Mostafa-SAID7/POWERBAND/discussions)** - Community discussions

---

<div align="center">

**Built with ❤️ by [Mostafa SAID](https://github.com/Mostafa-SAID7)**

**[⭐ Star this repo](https://github.com/Mostafa-SAID7/POWERBAND) if you find it helpful!**

</div>
