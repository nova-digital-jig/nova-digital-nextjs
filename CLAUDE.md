# CLAUDE.md — Vektor Animation System (Complete)

## CRITICAL RULES
1. Build ONE section at a time. Never build the full site in a single response.
2. Every animation MUST use GSAP — no CSS transitions for scroll animations.
3. Always initialize Lenis BEFORE any ScrollTrigger code.
4. Use the utility components in /lib/animations/ — do NOT rewrite them from scratch.
5. Mobile: disable custom cursor, disable parallax, simplify reveals to opacity-only.
6. All cleanup: kill ScrollTriggers and timelines on component unmount.
7. Check prefers-reduced-motion before running any animation.
8. Maximum 3 will-change properties active at any time.

## TECH STACK — Do not deviate
- Next.js 14+ (App Router, TypeScript)
- Tailwind CSS
- GSAP 3.12+ with ScrollTrigger (npm: gsap)
- Lenis (npm: lenis) — NOT @studio-freight/lenis (deprecated)
- No Framer Motion. No AOS. No animate.css. No CSS-only scroll animations.

## COLOR SYSTEM — Only these colors exist
```css
:root {
  --bg-primary: #0A0A0A;
  --bg-secondary: #111111;
  --bg-card: rgba(255, 255, 255, 0.03);
  --bg-card-hover: rgba(255, 255, 255, 0.06);
  --accent: #FF4D00;
  --accent-hover: #FF6B2C;
  --accent-glow: rgba(255, 77, 0, 0.08);
  --text-primary: #F5F5F0;
  --text-muted: #888888;
  --border: rgba(255, 255, 255, 0.08);
  --border-hover: rgba(255, 255, 255, 0.15);
}
```

## TYPOGRAPHY — Exact values
- Display: Syne (Google Fonts) or Clash Display (Fontshare). Weight 600-700.
- Body: Plus Jakarta Sans (Google Fonts) or General Sans (Fontshare). Weight 400-500.
- Mono: JetBrains Mono. For labels, numbers, eyebrow text.
- Hero: clamp(3.5rem, 8vw, 8rem), weight 700, line-height 0.95, letter-spacing -0.04em
- Section heading: clamp(2rem, 4vw, 4rem), weight 600, line-height 1.0, letter-spacing -0.02em
- Eyebrow: 0.75rem, uppercase, letter-spacing 0.15em, accent color, mono font
- Body: 1rem, line-height 1.6, weight 400, text-muted color

## SPACING
- Section padding: 120px vertical desktop, 64px mobile
- Container: max-width 1200px, mx-auto, px-6
- Component gap: 80px between major elements
- Card padding: 32-48px

## ANIMATION DEFAULTS
- Duration: 0.8-1.2s for reveals, 0.4-0.6s for hovers, 2-4s for ambient
- Easing: "power3.out" for entrances, "power2.inOut" for morphs, "power2.out" for hovers
- Stagger: 0.08-0.15s between elements
- ScrollTrigger start: "top 85%"
- NEVER use "linear" easing on reveals — everything needs a curve
- Scrub animations use ease: "none"

## UTILITY FILES — Import these, don't rewrite them
```
/lib/animations/
  text-reveal.ts      → animateTextReveal(), animateWordHighlight()
  fade-up.ts          → animateFadeUp(), animateStaggerList()
  parallax.ts         → animateParallax(), initDepthParallax()
  counter.ts          → animateCounter()
  magnetic.ts         → initMagneticButton()
  cursor.ts           → initCustomCursor()
  image-reveal.ts     → initCircleReveal(), initWipeReveal(), initScaleReveal()
  horizontal-scroll.ts → initHorizontalScroll()
  pinned-section.ts   → initPinnedSwap(), initSplitScroll()
  hover-reveal.ts     → initHoverReveal()
  card-effects.ts     → initCardTilt(), initStackedCards()
  page-transition.ts  → PageTransition component
  scroll-progress.ts  → initScrollProgress()
  scramble.ts         → scrambleText()
  color-transition.ts → initColorTransitions()
  blob-morph.ts       → initBlobMorph()

/components/animations/
  SmoothScroll.tsx     → Lenis provider wrapper
  Preloader.tsx        → Branded loading animation
  CustomCursor.tsx     → Dot + follower cursor
  ScrollReveal.tsx     → Reusable scroll-triggered fade-up wrapper
  TextReveal.tsx       → Reusable line-by-line heading reveal
  MagneticButton.tsx   → Button with magnetic hover effect
  Marquee.tsx          → Infinite scrolling text strip
  ScrollProgress.tsx   → Thin accent bar at top of page

/styles/
  globals.css          → All CSS custom properties, grain, cursor, marquee
```

## BUILD ORDER — Always follow this sequence
1. Layout + Lenis + Globals (foundation)
2. Preloader (first impression)
3. Navigation (sticky, glassmorphism, mobile menu)
4. Hero (structure first, then entrance animation)
5. Marquee (simple, gets scroll feeling right)
6. Services (list layout with hover states)
7. Portfolio (images with hover reveals)
8. Stats (counter animation)
9. Pricing (editorial, NOT template cards)
10. Testimonials (horizontal scroll cards)
11. CTA (massive typography closer)
12. Footer (minimal, clean)
13. Custom cursor (add last, desktop only)
14. Polish pass (responsive, reduced-motion, performance)

## COMMON MISTAKES TO AVOID
- Do NOT use useLayoutEffect for GSAP — use useEffect
- Do NOT forget overflow-hidden on parent divs for clip-path/y reveals
- Do NOT set will-change on more than 3 elements at once
- Do NOT animate width or height — use scaleX/scaleY or clipPath
- Do NOT put ScrollTrigger on display:none elements
- Do NOT forget to .kill() ScrollTrigger instances in cleanup
- GSAP SplitText is a paid Club plugin — manually split text into spans
- Import ScrollTrigger and register it: gsap.registerPlugin(ScrollTrigger)
- Lenis scroll callback must be connected to ScrollTrigger.update
