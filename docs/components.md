# Component Guide

This guide covers how to use and create components in POWERBAND, including the design system and best practices.

## 🧩 Component Architecture

POWERBAND uses a layered component architecture:

1. **UI Components** - Base components from shadcn/ui
2. **Section Components** - Page sections like Hero, Features
3. **Page Components** - Complete pages that combine sections

## 🎨 UI Components (shadcn/ui)

### Button Component

```tsx
import { Button } from "@/components/ui/button";

// Variants
<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>

// Custom styling
<Button className="rounded-full px-8 box-glow">
  Custom Button
</Button>
```

### Input Component

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input 
    id="email" 
    type="email" 
    placeholder="Enter your email"
  />
</div>
```

### Card Component

```tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here.</p>
  </CardContent>
</Card>
```

## 🏗️ Section Components

### Hero Section

The Hero component showcases the main value proposition:

```tsx
// Usage
import Hero from "@/components/Hero";

<Hero />
```

**Features:**
- Responsive typography scaling
- Background image with Ken Burns effect
- Animated elements with staggered delays
- Trust indicators and social proof
- Call-to-action buttons

### Features Section

Displays key product features in a grid layout:

```tsx
import Features from "@/components/Features";

<Features />
```

**Structure:**
- Icon-based feature cards
- Responsive grid layout
- Hover animations
- Scroll-triggered animations

### Pricing Section

Shows pricing tiers and plans:

```tsx
import Pricing from "@/components/Pricing";

<Pricing />
```

**Features:**
- Pricing cards with highlights
- Feature comparison
- Popular plan highlighting
- Responsive layout

## 🎯 Creating Custom Components

### Component Template

```tsx
// src/components/MyComponent.tsx
import { cn } from "@/utils/cn";

interface MyComponentProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export default function MyComponent({ 
  title, 
  description, 
  className,
  children 
}: MyComponentProps) {
  return (
    <div className={cn("p-4 rounded-lg border", className)}>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {description && (
        <p className="text-muted-foreground mb-4">{description}</p>
      )}
      {children}
    </div>
  );
}
```

### Component with Animations

```tsx
import { useEffect, useRef } from "react";

export default function AnimatedComponent() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref}
      className="animate-on-scroll opacity-0 transform translate-y-8"
    >
      Content appears on scroll
    </div>
  );
}
```

## 🎨 Design System

### Color Palette

```tsx
// Primary colors
<div className="bg-primary text-primary-foreground">Primary</div>
<div className="bg-secondary text-secondary-foreground">Secondary</div>

// Semantic colors
<div className="bg-destructive text-destructive-foreground">Error</div>
<div className="bg-muted text-muted-foreground">Muted</div>

// Background colors
<div className="bg-background text-foreground">Background</div>
<div className="bg-card text-card-foreground">Card</div>
```

### Typography Scale

```tsx
// Headings
<h1 className="text-4xl font-bold font-display">Heading 1</h1>
<h2 className="text-3xl font-semibold font-display">Heading 2</h2>
<h3 className="text-2xl font-medium font-display">Heading 3</h3>

// Body text
<p className="text-base">Regular text</p>
<p className="text-lg">Large text</p>
<p className="text-sm text-muted-foreground">Small muted text</p>
```

### Spacing System

```tsx
// Padding
<div className="p-4">Padding 16px</div>
<div className="p-6">Padding 24px</div>
<div className="p-8">Padding 32px</div>

// Margins
<div className="mb-4">Margin bottom 16px</div>
<div className="mt-8">Margin top 32px</div>

// Gaps
<div className="flex gap-4">Gap 16px</div>
<div className="grid grid-cols-2 gap-6">Gap 24px</div>
```

## ✨ Animation System

### Scroll Animations

```tsx
// Basic scroll animation
<div className="animate-on-scroll">
  Fades in and slides up
</div>

// Directional animations
<div className="animate-on-scroll-left">Slides in from left</div>
<div className="animate-on-scroll-right">Slides in from right</div>
<div className="animate-on-scroll-scale">Scales and fades in</div>

// Staggered children
<div className="stagger-children">
  <div className="animate-on-scroll">Item 1 (0ms delay)</div>
  <div className="animate-on-scroll">Item 2 (150ms delay)</div>
  <div className="animate-on-scroll">Item 3 (300ms delay)</div>
</div>
```

### CSS Animations

```tsx
// Built-in animations
<div className="animate-pulse">Pulsing</div>
<div className="animate-bounce">Bouncing</div>
<div className="animate-float">Floating</div>

// Custom animations
<div className="animate-glow-pulse">Glowing pulse</div>
<div className="animate-ken-burns">Ken Burns zoom</div>
```

## 📱 Responsive Components

### Responsive Grid

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>
```

### Responsive Typography

```tsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Responsive heading
</h1>
```

### Responsive Visibility

```tsx
// Hide on mobile, show on desktop
<div className="hidden lg:block">Desktop only</div>

// Show on mobile, hide on desktop
<div className="block lg:hidden">Mobile only</div>

// Different layouts for different screens
<div className="flex flex-col lg:flex-row">
  Stacked on mobile, side-by-side on desktop
</div>
```

## 🔧 Component Patterns

### Compound Components

```tsx
// Card compound component
const Card = ({ children, className }) => (
  <div className={cn("rounded-lg border bg-card", className)}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="p-6 pb-0">{children}</div>
);

const CardContent = ({ children }) => (
  <div className="p-6">{children}</div>
);

// Usage
<Card>
  <CardHeader>
    <h3>Title</h3>
  </CardHeader>
  <CardContent>
    <p>Content</p>
  </CardContent>
</Card>
```

### Render Props Pattern

```tsx
interface RenderPropsComponentProps {
  children: (data: any) => React.ReactNode;
}

const RenderPropsComponent = ({ children }: RenderPropsComponentProps) => {
  const [data, setData] = useState(null);
  
  // Fetch or compute data
  
  return <>{children(data)}</>;
};

// Usage
<RenderPropsComponent>
  {(data) => (
    <div>
      {data ? <p>{data.message}</p> : <p>Loading...</p>}
    </div>
  )}
</RenderPropsComponent>
```

### Higher-Order Components

```tsx
function withAnimation<T extends object>(
  Component: React.ComponentType<T>
) {
  return function AnimatedComponent(props: T) {
    return (
      <div className="animate-on-scroll">
        <Component {...props} />
      </div>
    );
  };
}

// Usage
const AnimatedCard = withAnimation(Card);
```

## 🧪 Testing Components

### Component Testing

```tsx
// MyComponent.test.tsx
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders with title', () => {
    render(<MyComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<MyComponent title="Test" className="custom-class" />);
    expect(screen.getByText('Test').parentElement).toHaveClass('custom-class');
  });
});
```

### Visual Testing

```tsx
// Storybook story
export default {
  title: 'Components/MyComponent',
  component: MyComponent,
};

export const Default = {
  args: {
    title: 'Default Title',
    description: 'Default description',
  },
};

export const WithoutDescription = {
  args: {
    title: 'Title Only',
  },
};
```

## 📋 Component Checklist

When creating a new component:

- [ ] **TypeScript**: Proper type definitions
- [ ] **Props**: Clear and documented interface
- [ ] **Styling**: Uses design system tokens
- [ ] **Responsive**: Works on all screen sizes
- [ ] **Accessible**: Proper ARIA labels and keyboard navigation
- [ ] **Performance**: Optimized for rendering
- [ ] **Testing**: Unit tests for key functionality
- [ ] **Documentation**: Clear usage examples
- [ ] **Reusable**: Can be used in multiple contexts
- [ ] **Consistent**: Follows project conventions

## 🎯 Best Practices

### Component Design
1. **Single Responsibility**: Each component should have one clear purpose
2. **Composition over Inheritance**: Use composition to build complex components
3. **Props Interface**: Design clear, intuitive props interfaces
4. **Default Props**: Provide sensible defaults

### Performance
1. **React.memo**: Use for expensive components
2. **useMemo/useCallback**: Optimize expensive calculations
3. **Lazy Loading**: Load components when needed
4. **Bundle Splitting**: Split large components into separate chunks

### Accessibility
1. **Semantic HTML**: Use proper HTML elements
2. **ARIA Labels**: Provide descriptive labels
3. **Keyboard Navigation**: Ensure keyboard accessibility
4. **Color Contrast**: Maintain proper contrast ratios

---

**Next**: Learn about [Styling](./styling.md) and the design system!