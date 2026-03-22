# Nova Digital Animation Toolkit

Drop-in animation system for building Awwwards-quality websites with Claude Code / OpenClaw.

## Quick Setup

### 1. Install dependencies in your Next.js project
```bash
npm install gsap lenis
```

### 2. Copy files into your project
```
CLAUDE.md                          → project root (Claude Code reads this automatically)
styles/globals.css                 → app/globals.css (merge with existing)
lib/animations/                    → lib/animations/ (entire folder)
components/animations/             → components/animations/ (entire folder)
PHASED-BUILD-PROMPTS.md           → keep on your desktop for reference (don't put in project)
```

### 3. Wire up your layout (app/layout.tsx)
```tsx
import { SmoothScrollProvider } from "@/components/animations";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({ subsets: ["latin"], variable: "--font-display" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${jakarta.variable} ${jetbrains.variable}`}>
      <body>
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
```

### 4. Use components in your pages
```tsx
import { Preloader, TextReveal, ScrollReveal, MagneticButton, Marquee, CustomCursor } from "@/components/animations";

export default function Home() {
  return (
    <>
      <Preloader brandName="NOVA" />
      <CustomCursor />
      
      <section className="min-h-screen flex items-center">
        <div className="container-main">
          <TextReveal 
            lines={["WE BUILD", "WEBSITES", "THAT PRINT", "MONEY."]} 
            className="heading-hero"
          />
          <ScrollReveal delay={0.5}>
            <p className="body-text mt-6">Premium websites delivered in 48 hours.</p>
          </ScrollReveal>
          <ScrollReveal delay={0.7}>
            <MagneticButton className="bg-[var(--accent)] text-black rounded-full px-8 py-4 font-semibold mt-8">
              Start a Project
            </MagneticButton>
          </ScrollReveal>
        </div>
      </section>

      <Marquee text="DESIGN · DEVELOP · DEPLOY · " />
    </>
  );
}
```

### 5. Use animation utilities directly for custom work
```tsx
import { useEffect, useRef } from "react";
import { initScaleReveal, initCardTilt, animateCounter } from "@/lib/animations";

function MyComponent() {
  const imageRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (imageRef.current) initScaleReveal(imageRef.current);
    
    let cardCleanup: (() => void) | undefined;
    if (cardRef.current) cardCleanup = initCardTilt(cardRef.current);
    
    if (counterRef.current) animateCounter(counterRef.current, 50);

    return () => cardCleanup?.();
  }, []);

  return (
    <>
      <div ref={imageRef} className="overflow-hidden rounded-2xl">
        <img src="/photo.jpg" alt="" className="w-full" />
      </div>
      <div ref={cardRef} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8">
        <span ref={counterRef}>0</span>+ Projects
      </div>
    </>
  );
}
```

## What's Included

### Animation Utilities (/lib/animations/)
| Function | What it does |
|----------|-------------|
| `animateTextReveal()` | Line-by-line heading reveal with clip-path |
| `animateWordHighlight()` | Scroll-linked word-by-word highlight |
| `animateFadeUp()` | Element fades up on scroll |
| `animateStaggerList()` | List items stagger in on scroll |
| `animateParallax()` | Simple parallax scroll |
| `initDepthParallax()` | Multi-layer depth parallax |
| `animateCounter()` | Number counts up on scroll |
| `initMagneticButton()` | Button follows cursor on hover |
| `initCustomCursor()` | Dot + follower custom cursor |
| `initCircleReveal()` | Image reveals from center circle |
| `initWipeReveal()` | Image wipes in from direction |
| `initScaleReveal()` | Image clip + scale combo reveal |
| `scrambleText()` | Characters shuffle before resolving |
| `initHorizontalScroll()` | Vertical scroll → horizontal movement |
| `initPinnedSwap()` | Pinned section with content swap |
| `initStackedCards()` | Cards overlap on scroll |
| `initSplitScroll()` | Left pinned, right scrolls |
| `initColorTransitions()` | Background color morphs between sections |
| `initScrollProgress()` | Thin progress bar at top |
| `initHoverReveal()` | Floating image preview on list hover |
| `initCardTilt()` | 3D tilt + glow on card hover |

### React Components (/components/animations/)
| Component | What it does |
|-----------|-------------|
| `<SmoothScrollProvider>` | Wraps app with Lenis smooth scroll |
| `<TextReveal>` | Drop-in heading with line reveal animation |
| `<ScrollReveal>` | Wrapper that fades children up on scroll |
| `<MagneticButton>` | Button with magnetic hover effect |
| `<Preloader>` | Branded loading animation |
| `<CustomCursor>` | Dot + follower cursor (desktop only) |
| `<Marquee>` | Infinite scrolling text strip |

## For Claude Code / OpenClaw

Place `CLAUDE.md` in the project root. It tells the AI:
- Which animation system to use (GSAP + Lenis, not Framer Motion)
- Exact color values, typography specs, spacing
- Which utility files exist and how to import them
- Build order (section by section, not all at once)
- Common mistakes to avoid

Then use the prompts from `PHASED-BUILD-PROMPTS.md` one phase at a time.
