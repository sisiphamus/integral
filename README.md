# Integral

A polished product landing page for a fictional AR glasses company.

"See beyond."

Integral is a design exercise in premium consumer electronics marketing. The product: lightweight augmented reality glasses with holographic optics, neural interface, and all-day battery. The price: $1,299. The ship date: Q3 2026. None of it's real, but the page makes you reach for your wallet anyway.

## What's Here

A fully responsive, animation-rich landing page featuring:

- **Hero** with massive "INTEGRAL" display typography and a scroll indicator inviting exploration
- **Technology grid** (6 cells) with editorial layout showcasing specs:
  - Holographic Optics: 52-degree FOV, 4K per eye
  - Frame: 36g titanium-carbon composite
  - Spatial Audio with head tracking
  - Neural Interface: EMG micro-gesture sensors
  - All-Day Battery: 18hr graphene cells
  - Privacy First: hardware camera shutters, on-device processing
- **Use cases carousel** (Navigate, Create, Connect, Focus) with horizontal scroll on desktop
- **Press quotes** from (fictional) The Verge, Wired, Bloomberg, TechCrunch, Engadget with varied typography sizes
- **Photo gallery** in masonry grid with hover zoom
- **Pre-order CTA** with word-by-word blur-to-focus reveal animation
- **Animated navigation** with full-screen hamburger menu overlay and staggered link transitions

## Design System

The CSS layer is the real star. Extensive custom properties define a complete design token system for spacing, typography scale, easing curves, and color. Everything snaps to a consistent rhythm. The animation work uses Framer Motion for scroll-triggered reveals, staggered grid entries, word-by-word text animations, and clip-path menu transitions.

The aesthetic is deliberately Apple-minimal: white backgrounds, thin weight typography (Inter 300-600), generous whitespace, subtle hover states, and a custom 4px thin scrollbar.

## Tech

Next.js 16 (App Router), React 19, TypeScript, Framer Motion, Tailwind CSS 4, Next.js Image with Unsplash remote images.
