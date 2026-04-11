# Quick Start Guide

Get up and running with POWERBAND in just a few minutes!

## 🚀 5-Minute Setup

### 1. Clone and Install
```bash
git clone https://github.com/Mostafa-SAID7/POWERBAND.git
cd POWERBAND
npm install
```

### 2. Start Development
```bash
npm run dev
```

### 3. Open in Browser
Navigate to `http://localhost:8080` and you're ready to go! 🎉

## 📁 Project Overview

POWERBAND is a modern fitness equipment showcase website built with:

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Vite** - Lightning-fast build tool
- **Radix UI** - Accessible component primitives

## 🎯 Key Features

### ✨ Modern Design
- Responsive design that works on all devices
- Dark theme with neon green accents
- Smooth animations and transitions
- Professional fitness industry aesthetic

### 🏃‍♂️ Performance
- Fast loading with Vite
- Optimized images and assets
- Lazy loading components
- Minimal bundle size

### 🎨 Components
- Reusable UI components
- Consistent design system
- Accessible by default
- Easy to customize

## 🛠️ Development Workflow

### File Structure
```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
└── styles/        # Global styles
```

### Adding a New Component
```tsx
// src/components/MyComponent.tsx
import { Button } from "@/components/ui/button";

export default function MyComponent() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">My Component</h2>
      <Button>Click me</Button>
    </div>
  );
}
```

### Using the Component
```tsx
// src/pages/Index.tsx
import MyComponent from "@/components/MyComponent";

const Index = () => {
  return (
    <div>
      <MyComponent />
    </div>
  );
};
```

## 🎨 Styling Guide

### Tailwind Classes
```tsx
// Common patterns
<div className="container mx-auto px-4">           // Container
<h1 className="text-4xl font-bold text-primary">  // Heading
<p className="text-muted-foreground">             // Muted text
<Button className="rounded-full px-8">            // Rounded button
```

### Custom Colors
```css
/* Available color variables */
--primary: 110 100% 55%;        /* Neon green */
--background: 0 0% 4%;          /* Dark background */
--foreground: 0 0% 95%;         /* Light text */
--muted-foreground: 0 0% 55%;   /* Muted text */
```

## 📱 Responsive Design

### Breakpoints
```tsx
// Mobile-first approach
<div className="
  text-sm          // Mobile (default)
  sm:text-base     // Small screens (640px+)
  md:text-lg       // Medium screens (768px+)
  lg:text-xl       // Large screens (1024px+)
  xl:text-2xl      // Extra large (1280px+)
">
```

### Common Responsive Patterns
```tsx
// Stack on mobile, side-by-side on desktop
<div className="flex flex-col md:flex-row gap-4">

// Hide on mobile, show on desktop
<div className="hidden lg:block">

// Full width on mobile, fixed width on desktop
<div className="w-full lg:w-96">
```

## 🧪 Testing Your Changes

### Run Tests
```bash
npm run test        # Run all tests
npm run test:watch  # Run tests in watch mode
```

### Lint Code
```bash
npm run lint        # Check for linting errors
npm run lint:fix    # Fix auto-fixable issues
```

### Build for Production
```bash
npm run build       # Create production build
npm run preview     # Preview production build
```

## 🔧 Common Tasks

### Adding a New Page
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation if needed

### Adding Icons
```tsx
import { Star, Heart, Zap } from "lucide-react";

<Star className="h-5 w-5 text-primary" />
```

### Adding Animations
```tsx
// Scroll animations (already set up)
<div className="animate-on-scroll">
  Content appears on scroll
</div>

// CSS animations
<div className="animate-pulse">
  Pulsing element
</div>
```

## 🎯 Next Steps

Now that you're set up, explore these guides:

1. **[Project Structure](./project-structure.md)** - Understand the codebase
2. **[Component Guide](./components.md)** - Learn about components
3. **[Styling Guide](./styling.md)** - Master the design system
4. **[Development Guide](./development.md)** - Advanced development topics

## 💡 Pro Tips

### VS Code Setup
Install these extensions for the best experience:
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- TypeScript Importer
- Auto Rename Tag

### Keyboard Shortcuts
- `Ctrl/Cmd + Shift + P` - Command palette
- `Ctrl/Cmd + P` - Quick file open
- `Ctrl/Cmd + D` - Select next occurrence
- `Alt + Shift + F` - Format document

### Hot Reload
The development server supports hot reload - your changes will appear instantly without losing component state!

---

**Ready to build something amazing?** 🚀

Check out the [Component Guide](./components.md) to start building!