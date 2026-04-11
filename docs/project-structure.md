# Project Structure

This document explains the organization and structure of the POWERBAND codebase.

## 📁 Root Directory

```
POWERBAND/
├── .github/                 # GitHub workflows and templates
├── docs/                    # Project documentation
├── public/                  # Static assets
├── src/                     # Source code
├── dist/                    # Production build output
├── node_modules/            # Dependencies
├── .gitignore              # Git ignore rules
├── package.json            # Project configuration
├── README.md               # Project overview
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite build configuration
└── vitest.config.ts        # Test configuration
```

## 🎯 Source Code Structure

### `/src` Directory

```
src/
├── components/             # Reusable UI components
│   ├── ui/                # Base UI components (shadcn/ui)
│   ├── BrandMarquee.tsx   # Brand marquee component
│   ├── Contact.tsx        # Contact section
│   ├── Features.tsx       # Features showcase
│   ├── Footer.tsx         # Site footer
│   ├── Hero.tsx           # Hero section
│   ├── Navbar.tsx         # Navigation bar
│   ├── Pricing.tsx        # Pricing section
│   ├── Products.tsx       # Products showcase
│   ├── Reviews.tsx        # Customer reviews
│   └── Team.tsx           # Team section
├── hooks/                 # Custom React hooks
│   └── useScrollAnimation.ts
├── pages/                 # Page components
│   ├── Index.tsx          # Homepage
│   └── NotFound.tsx       # 404 page
├── utils/                 # Utility functions
│   └── cn.ts              # Class name utility
├── App.tsx                # Main app component
├── main.tsx               # Application entry point
└── index.css              # Global styles
```

## 🧩 Component Architecture

### Component Categories

#### 1. **Page Components** (`/src/pages/`)
Top-level components that represent entire pages or routes.

```tsx
// Example: Index.tsx
const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        {/* Other sections */}
      </main>
      <Footer />
    </div>
  );
};
```

#### 2. **Section Components** (`/src/components/`)
Large sections of a page with specific functionality.

```tsx
// Example: Hero.tsx
export default function Hero() {
  return (
    <section id="home" className="min-h-screen">
      {/* Hero content */}
    </section>
  );
}
```

#### 3. **UI Components** (`/src/components/ui/`)
Reusable, low-level UI components based on Radix UI primitives.

```tsx
// Example: Button component
import { Button } from "@/components/ui/button";

<Button variant="outline" size="lg">
  Click me
</Button>
```

### Component Naming Conventions

- **PascalCase** for component files: `Hero.tsx`, `BrandMarquee.tsx`
- **camelCase** for hooks: `useScrollAnimation.ts`
- **kebab-case** for utility files: `class-names.ts`

## 🎨 Styling Architecture

### Tailwind CSS Structure

```css
/* index.css */
@tailwind base;      /* Reset and base styles */
@tailwind components; /* Component classes */
@tailwind utilities;  /* Utility classes */

@layer base {
  /* Custom base styles */
}

@layer components {
  /* Custom component styles */
}

@layer utilities {
  /* Custom utility classes */
}
```

### Design System

#### Colors
```css
:root {
  --primary: 110 100% 55%;        /* Neon green */
  --background: 0 0% 4%;          /* Dark background */
  --foreground: 0 0% 95%;         /* Light text */
  --muted-foreground: 0 0% 55%;   /* Muted text */
  --border: 0 0% 15%;             /* Border color */
}
```

#### Typography
- **Headings**: Space Grotesk font family
- **Body**: Inter font family
- **Responsive**: Mobile-first approach

#### Spacing
- **Container**: `container mx-auto px-4`
- **Sections**: `py-12` or `py-20`
- **Components**: `p-4`, `p-6`, `p-8`

## 🔧 Configuration Files

### TypeScript Configuration

#### `tsconfig.json`
Main TypeScript configuration with path mapping:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### `tsconfig.app.json`
Application-specific TypeScript settings.

#### `tsconfig.node.json`
Node.js environment TypeScript settings.

### Build Configuration

#### `vite.config.ts`
Vite build tool configuration:
```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

#### `tailwind.config.ts`
Tailwind CSS configuration with custom theme.

### Package Configuration

#### `package.json`
Project metadata and scripts:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "lint": "eslint ."
  }
}
```

## 🗂️ Asset Organization

### `/public` Directory
```
public/
├── favicon.svg             # Site favicon
├── favicon.ico             # Fallback favicon
├── placeholder.svg         # Placeholder image
└── robots.txt              # SEO robots file
```

### Image Guidelines
- **Format**: Use WebP for photos, SVG for icons
- **Optimization**: Compress images before adding
- **Naming**: Use descriptive, kebab-case names
- **Location**: Store in `/public` for static assets

## 🧪 Testing Structure

### Test Organization
```
src/
├── components/
│   ├── __tests__/          # Component tests
│   └── Button.test.tsx
├── hooks/
│   ├── __tests__/          # Hook tests
│   └── useScrollAnimation.test.ts
└── utils/
    ├── __tests__/          # Utility tests
    └── cn.test.ts
```

### Test Naming
- **Component tests**: `ComponentName.test.tsx`
- **Hook tests**: `useHookName.test.ts`
- **Utility tests**: `utilityName.test.ts`

## 📦 Dependency Management

### Production Dependencies
- **React**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Radix UI**: Accessible components
- **Lucide React**: Icons

### Development Dependencies
- **Vite**: Build tool
- **ESLint**: Code linting
- **Vitest**: Testing framework
- **TypeScript**: Type checking

## 🔄 Import/Export Patterns

### Import Conventions
```tsx
// External libraries first
import React from 'react';
import { Button } from '@radix-ui/react-button';

// Internal imports with @ alias
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';

// Relative imports last
import './Component.css';
```

### Export Patterns
```tsx
// Default export for main component
export default function Hero() {
  return <div>Hero content</div>;
}

// Named exports for utilities
export const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`;
};

// Re-exports for barrel files
export { Button } from './button';
export { Input } from './input';
```

## 🚀 Build Output

### `/dist` Directory (Production)
```
dist/
├── assets/
│   ├── index-[hash].css    # Bundled styles
│   └── index-[hash].js     # Bundled JavaScript
├── index.html              # Main HTML file
└── favicon.svg             # Static assets
```

## 📋 Best Practices

### File Organization
1. **Group by feature** rather than file type
2. **Keep components small** and focused
3. **Use barrel exports** for cleaner imports
4. **Separate concerns** (logic, styling, types)

### Naming Conventions
1. **Be descriptive** and consistent
2. **Use TypeScript** for better IntelliSense
3. **Follow React conventions** for hooks and components
4. **Use semantic HTML** elements

### Performance
1. **Lazy load** large components
2. **Optimize images** and assets
3. **Use React.memo** for expensive components
4. **Minimize bundle size** with tree shaking

---

**Next**: Learn about [Components](./components.md) and how to use them effectively!