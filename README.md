# INTEGRAL

A product page for AR glasses that don't exist -- and you'll still want to buy them.

INTEGRAL is a concept landing page for a $1,299 pair of AR glasses shipping Q3 2026. "See beyond." The goal was to build something that feels indistinguishable from a real product launch. Massive hero typography, a six-cell tech spec grid, use cases carousel, press quotes from fictional publications, a masonry gallery, and a pre-order flow that ends with a word-by-word blur-to-focus animation on the confirmation text.

The real work here is the CSS layer. A complete design token system built on custom properties controls every surface -- spacing, color, typography, motion timing. Nothing is hardcoded inline. Framer Motion handles scroll-triggered reveals, staggered grid entries, and clip-path transitions for the full-screen hamburger menu that slides in with staggered link animations. The aesthetic is Apple-minimal: Inter at weights 300-600, generous whitespace, a custom 4px scrollbar, and the kind of restraint that takes longer than excess.

Next.js, TypeScript, Framer Motion, Tailwind CSS. 8 components across Hero, Features, Gallery, Navigation, PreOrder, Press, UseCases, and Footer.
