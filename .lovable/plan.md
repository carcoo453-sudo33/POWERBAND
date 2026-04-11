

## Enhanced Animations Plan

### What Changes

Add richer, more cinematic animations across every section — beyond the current simple fade-up. Each section gets a distinct animation style for visual variety.

### Animation Enhancements by Section

**1. New CSS Animations & Keyframes** (`index.css` + `tailwind.config.ts`)
- `animate-slide-in-left` / `animate-slide-in-right` — horizontal entrances
- `animate-scale-up` — scale from 0.8 to 1 with fade
- `animate-blur-in` — blur(10px) to blur(0) with fade
- `animate-rotate-in` — slight rotation entrance
- `animate-bounce-in` — spring-like bounce entrance
- `animate-glow-pulse` — repeating green glow pulse on highlighted elements
- `animate-float` — subtle continuous floating motion for decorative elements
- Parallax-style scroll classes: `.animate-on-scroll-left`, `.animate-on-scroll-right`, `.animate-on-scroll-scale`
- Stagger delays extended to 8 children with longer intervals (150ms)

**2. Hero** — Add a slow Ken Burns zoom on the background image, a typing/reveal effect on the headline via CSS clip-path animation, and a continuous float animation on the floating card

**3. Brand Marquee** — Add a subtle fade-in entrance and pause-on-hover

**4. Features** — Cards slide in from left/right/center (alternating) instead of uniform fade-up; icons get a rotate-in animation when visible

**5. Products** — Cards scale up from 0.85 with blur-in; product images get a slow parallax drift on hover; tags pulse with glow

**6. Pricing** — Cards slide in from bottom with stagger; the highlighted "Pro" card gets a continuous glow-pulse border; price numbers count-up animation via a small React hook

**7. Team** — Avatar photos scale-in with a circular clip-path reveal; social icons stagger-fade on hover of the card

**8. Reviews** — Cards alternate slide-in-left and slide-in-right; star ratings fill sequentially with a delay; quote icon gets a subtle float animation

**9. Contact** — Form card blurs in from behind; input fields slide in sequentially from the right; submit button gets a shimmer/shine effect on hover

**10. Footer** — Fade-in with a slight upward slide; social icons pop in with scale-bounce stagger

**11. Scroll Animation Hook** — Update `useScrollAnimation.ts` to support directional classes (`.animate-on-scroll-left`, `-right`, `-scale`) alongside the existing `.animate-on-scroll`

### Files Modified

| File | Change |
|------|--------|
| `src/index.css` | Add ~15 new keyframes and animation utility classes |
| `tailwind.config.ts` | Add new keyframes and animation entries |
| `src/hooks/useScrollAnimation.ts` | Observe additional animation class selectors |
| `src/components/Hero.tsx` | Ken Burns bg, float on card, staggered text reveal |
| `src/components/BrandMarquee.tsx` | Hover-pause, fade entrance |
| `src/components/Features.tsx` | Directional slide-in cards, icon rotate |
| `src/components/Products.tsx` | Scale+blur entrance, tag glow pulse |
| `src/components/Pricing.tsx` | Slide-up stagger, glow-pulse on Pro card, count-up price |
| `src/components/Team.tsx` | Clip-path reveal on avatars, social icon stagger |
| `src/components/Reviews.tsx` | Alternating L/R slide-in, sequential star fill, floating quote |
| `src/components/Contact.tsx` | Blur-in card, sequential field slide, shimmer button |
| `src/components/Footer.tsx` | Scale-bounce social icons, fade-up entrance |

### Technical Notes
- All animations use CSS transitions/keyframes — no heavy JS animation libraries needed
- A small `useCountUp` hook (pure React) will be created for the pricing number animation
- Performance: `will-change` applied sparingly, animations use `transform`/`opacity` only (GPU-composited)
- Reduced motion: `@media (prefers-reduced-motion)` will disable non-essential animations

