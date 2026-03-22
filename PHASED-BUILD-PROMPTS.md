# Nova Digital — Phased Build Prompts for Claude Code

> **Why phases?** Your original prompts are 300+ lines. Claude Code reads
> the whole thing, fills its context, then rushes through the code.
> These shorter, focused prompts produce dramatically better results.
>
> **PREREQUISITE:** Place CLAUDE.md in your project root BEFORE running
> any of these prompts. Claude Code reads it automatically.

---

## PHASE 1: Project Setup + Layout + Lenis

```
Read CLAUDE.md first.

Set up a new Next.js 14 project (App Router, TypeScript, Tailwind CSS) for Nova Digital.

Install these exact packages:
- gsap
- lenis

Configure:
1. app/layout.tsx — load fonts (Syne from Google Fonts for display, Plus Jakarta Sans for body, JetBrains Mono for mono), set metadata, wrap children in SmoothScrollProvider from CLAUDE.md
2. app/globals.css — add all CSS custom properties from CLAUDE.md color system, add the grain overlay class, cursor styles, marquee animation, and section spacing
3. app/page.tsx — empty for now, just a black background div
4. tailwind.config.ts — extend with our color variables and font families

Test: the page should load with a black background, smooth scroll active (even though there's nothing to scroll yet), and correct fonts loading.

Do NOT build any sections yet. Just the foundation.
```

---

## PHASE 2: Preloader

```
Read CLAUDE.md — use Pattern 8 (Preloader) exactly.

Build components/Preloader.tsx:
- Full-screen overlay, bg #0A0A0A, z-index 9999, fixed position
- "NOVA." text in display font, accent color on the period
- The text reveals with clip-path from left to right (clipPath: "inset(0 100% 0 0)" → "inset(0 0 0 0)")
- Below the text: a thin progress bar (2px height, accent color) that scales from scaleX(0) to scaleX(1)
- After both complete: the entire overlay slides up (yPercent: -100) revealing the page
- Use GSAP timeline, total duration ~2.5s
- On complete: set body overflow back to visible, unmount the preloader

Add it to app/page.tsx. The page should currently show ONLY the preloader animation on load, then reveal a black page.

Do NOT build any other sections yet.
```

---

## PHASE 3: Navigation

```
Read CLAUDE.md first.

Build components/Navbar.tsx:
- Fixed position, full width, z-50, padding 32px vertical initially
- Left: "NOVA." text logo in display font, weight 700, white, accent color period
- Right: nav links — Work / Services / Pricing / Contact — body font, text-muted, hover: text-primary transition 0.3s
- Far right: "Start a Project" button — bg accent, text black, rounded-full, px-6 py-3, font-weight 600
- Apply magnetic button effect from CLAUDE.md Pattern 6 on the CTA button

On scroll past 100px (use ScrollTrigger or scroll event):
- Background: rgba(10,10,10,0.85) + backdrop-filter: blur(16px) saturate(1.8)
- Padding shrinks from 32px to 16px vertical
- Border-bottom: 1px solid var(--border)
- Transition everything with GSAP, duration 0.3s

Mobile (below 768px):
- Hide nav links and CTA
- Show hamburger icon (3 horizontal lines, 24px wide, 2px height, white)
- On click: lines animate to X shape with GSAP
- Full-screen overlay slides down from top, bg #0A0A0A
- Nav links appear staggered (each slides in from y: 40, opacity 0, stagger 0.08)
- Close: reverse the animation

Add Navbar to app/page.tsx above the Preloader-revealed content.

Test: navbar should be sticky, glassmorphism activates on scroll, mobile menu animates open/close smoothly.
```

---

## PHASE 4: Hero Section

```
Read CLAUDE.md — use Pattern 1 (Text Line Reveal) for the headline.

Build components/Hero.tsx:
- min-height: 100svh, flex, items-center, relative
- Background: subtle radial gradient from rgba(255,77,0,0.06) center outward, plus the grain overlay class from globals.css
- Content structure (all inside a container div, max-w-[1200px] mx-auto px-6):

  1. Eyebrow: "AI-POWERED WEB AGENCY" — use .eyebrow class, mono font, accent color
  2. Headline — 4 lines, each wrapped in overflow-hidden div:
     - "WE BUILD"
     - "WEBSITES" 
     - "THAT PRINT"
     - "MONEY."
     - Each line: .heading-hero class from CLAUDE.md
  3. Subheadline: "Premium websites delivered in 48 hours. Stunning design. Blazing fast. Real results." — body font, text-muted, max-w-[500px], mt-6
  4. Two buttons side by side, mt-8, gap-4:
     - "Start a Project" — bg accent, text black, rounded-full, px-8 py-4, font-semibold. Apply magnetic effect.
     - "View Work" — transparent bg, border 1px rgba(255,255,255,0.2), same shape, hover: border-white
  5. Trust bar at bottom: "50+ Sites Built · 48hr Delivery · 5.0★ Rating" — text-muted, text-sm, mt-12

GSAP entrance timeline (starts AFTER preloader completes — use a callback or state):
  1. Eyebrow fades up (y: 20 → 0, opacity 0 → 1), duration 0.6
  2. Headline lines reveal using Pattern 1 (y: "100%", clipPath reveal, stagger 0.12), duration 1.0
  3. Subheadline fades up (y: 30 → 0, opacity 0 → 1), duration 0.6, delay 0.2 after last line
  4. Buttons fade up together (y: 20 → 0, opacity 0 → 1), duration 0.5, delay 0.1
  5. Trust bar fades in (opacity 0 → 1), duration 0.4

Total entrance: ~1.5s after preloader.

Test: preloader plays → overlay slides up → hero content animates in with staggered reveals. The text should feel DRAMATIC — big, tight, commanding.
```

---

## PHASE 5: Marquee

```
Read CLAUDE.md — use Pattern 10 (Infinite Marquee).

Build components/Marquee.tsx:
- Full-width section, no container constraint
- Padding: 24px 0
- Border-top and border-bottom: 1px solid var(--border)
- Text content: "DESIGN · DEVELOP · DEPLOY · " repeated 8 times in a single string
- Display font, weight 500, size 1.1rem, letter-spacing 0.1em, uppercase
- Color: rgba(255,255,255,0.25)
- Use the .marquee-track CSS animation from CLAUDE.md
- Duplicate the text content so the loop is seamless (two identical spans side by side)
- Pause on hover

Add ScrollTrigger: the whole marquee section fades up (Pattern 2) when scrolled into view.

Test: smooth infinite scroll of text, pauses on hover, seamless loop with no jump.
```

---

## PHASE 6: Services

```
Read CLAUDE.md — use Pattern 3 (Staggered List Reveal).

Build components/Services.tsx:
- Section with padding 120px vertical
- Container: max-w-[1200px] mx-auto px-6
- Eyebrow: "WHAT WE DO" — .eyebrow class
- Heading: "Services." — .heading-section class, mb-16

Layout: vertical list, NOT a card grid. Each service is a full-width row:

4 services:
01 — Web Design: "Bespoke visual identities and interfaces that captivate and convert."
02 — Web Development: "Lightning-fast sites built with Next.js. Deployed in 48 hours."  
03 — AI Integration: "Smart chatbots and automation that turn visitors into customers."
04 — SEO & Performance: "Built to rank. Optimized to convert. Measured to improve."

Each row:
- Full width, py-6, border-bottom 1px solid var(--border)
- Left: number in mono font, accent color, text-sm
- Center: service name in display font (text-2xl), description below in body font text-muted
- Right: arrow "→" in text-muted
- On hover: bg shifts to var(--bg-card), service name color → accent, arrow translateX(10px)
- Transitions: all 0.3s ease

GSAP: use Pattern 3 — stagger the rows in from y: 60, opacity 0, stagger 0.1

Test: service rows slide in on scroll, hover states feel smooth and responsive.
```

---

## PHASE 7: Portfolio

```
Read CLAUDE.md — use Pattern 4 (Parallax) and Pattern 2 (Fade Up).

Build components/Portfolio.tsx:
- Eyebrow: "SELECTED WORK"
- Heading: "Our Work."

Layout: 2-column grid on desktop, 1 column on mobile, gap-8

3 portfolio items. Each item:
- Aspect ratio 4/3, overflow-hidden, rounded-2xl, relative
- Image fills container (object-cover). Use Unsplash placeholder URLs:
  - Salon site: https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800
  - Barbershop site: https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=800  
  - Auto garage site: https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800
- On hover: image scales to 1.05 over 0.4s (GSAP or CSS transition)
- Overlay on hover: linear-gradient from transparent to rgba(0,0,0,0.6) at bottom
- Text overlay at bottom (appears on hover): project name in display font + "View Project →"
- First item spans 2 columns on desktop (col-span-2)

Parallax: apply Pattern 4 with speed -15 on each image

GSAP scroll: entire grid fades up with Pattern 2

Test: images have subtle parallax on scroll, hover reveals overlay with project info, smooth scale transition.
```

---

## PHASE 8: Stats

```
Read CLAUDE.md — use Pattern 5 (Counter).

Build components/Stats.tsx:
- Full-width section, bg var(--bg-secondary), grain overlay, py-20
- Container with 4 stats in a row (grid-cols-2 on mobile, grid-cols-4 on desktop)

Stats:
- 50+ → "Sites Launched"
- 48 → "Hour Delivery" 
- 100 → "% Satisfaction"
- 5.0 → "★ Google Rating"

Each stat:
- Number: display font, heading-section size, text-primary, font-bold
- Label: body font, text-muted, text-sm, mt-2
- Text-center

Use Pattern 5 for each number. The counter animates from 0 to target when scrolled into view.
For the "5.0" stat, animate to 50 then format display as (value/10).toFixed(1).

Test: scroll to stats section, numbers count up smoothly. Should feel satisfying.
```

---

## PHASE 9: Pricing

```
Read CLAUDE.md.

Build components/Pricing.tsx — this should look EDITORIAL, not like a SaaS template.
- Eyebrow: "PRICING"
- Heading: "Investment."

Layout: 3 pricing tiers in a row (stack on mobile). NOT equal-height cards with checkmark lists.

Instead, use this editorial layout:
- Each tier: bg var(--bg-card), border 1px var(--border), rounded-2xl, p-10
- Tier name: eyebrow style, text-sm, uppercase, letter-spaced
- Price: display font, 4rem, text-primary. Dollar sign in text-muted at smaller size.
- Description: 1-2 sentences in body font about who this is for
- Features: plain text list separated by thin borders, no checkmarks, no bullets. Each feature is a simple row with text, py-3, border-bottom var(--border)
- CTA button at bottom

Tiers:
1. STARTER — $499 — "Perfect for new businesses that need a professional online presence fast."
   Features: Custom one-page design, Mobile responsive, Basic SEO setup, 48-hour delivery, 30 days of support
   CTA: "Get Started"

2. GROWTH (featured) — $999 — "For businesses ready to turn their website into a growth engine."
   This card: border accent instead of border, slightly larger scale (scale-[1.02]), accent gradient glow behind it
   Features: Multi-page custom design, Advanced animations, AI chatbot integration, SEO optimization, 90 days of support, Performance analytics
   CTA: "Most Popular" label above button, button is accent bg

3. SCALE — $2,499 — "Complete digital transformation with ongoing optimization."
   Features: Full custom web application, E-commerce or booking integration, AI automation suite, Priority support, Monthly optimization, Dedicated account manager
   CTA: "Contact Us"

Hover on each card: translateY(-4px), border brightens slightly

GSAP: stagger cards in from y: 60, opacity 0, stagger 0.15

Test: pricing section should look premium and editorial, NOT like a Stripe pricing page clone.
```

---

## PHASE 10: Testimonials

```
Read CLAUDE.md.

Build components/Testimonials.tsx:
- Eyebrow: "TESTIMONIALS"
- Heading: "What clients say."

3 testimonial cards in a horizontal scroll container:
- Container: flex, gap-6, overflow-x-auto, snap-x snap-mandatory, scrollbar-hide
- Each card: min-w-[350px] on mobile, min-w-[400px] on desktop, flex-shrink-0, snap-center
- Card: bg var(--bg-card), border 1px var(--border), rounded-2xl, p-12
- Large decorative quote mark: " as text, display font, 6rem, accent color at 15% opacity, absolute top-6 left-6
- Quote: body font, 1.1rem, italic, text-primary, relative z-10
- Below quote: mt-6, client name in display font text-sm font-semibold, client title in text-muted text-sm

Testimonials:
1. "Nova Digital transformed our online presence completely. We went from zero bookings to over 40 per week." — Maria Santos, Owner, Lucas Hair Salon
2. "The best investment we've made for our business. Professional, fast, and the design is incredible." — Marco R., Owner, Edison Barbershop
3. "We finally have a website that matches the quality of our work. Highly recommend Nova Digital." — Ram P., Owner, Ram's Garage

GSAP: cards slide in from x: 100, opacity 0, stagger 0.15 on scroll

Test: cards are horizontally scrollable with snap, quote marks are decorative, feels trustworthy.
```

---

## PHASE 11: CTA Section

```
Read CLAUDE.md — use Pattern 1 (Text Line Reveal).

Build components/CTA.tsx:
- Full-width section, py-32, relative
- Background: subtle radial gradient from rgba(255,77,0,0.08) center, plus grain overlay
- Center-aligned content

Massive heading — 2 lines:
- "LET'S" — display font, clamp(4rem, 12vw, 12rem), text-primary
- "BUILD." — same size, accent color
- Both wrapped in overflow-hidden divs for Pattern 1 reveal

Below:
- Subheadline: "Ready to start? We'll have a proposal within 24 hours." — body font, text-muted, mt-8
- Two buttons, mt-10, flex gap-4 justify-center:
  - "Get in Touch" — accent bg, dark text, rounded-full, px-8 py-4, magnetic effect, links to mailto
  - "(978) 606-3386" — ghost button (border only), links to tel:

GSAP: text reveals on scroll with Pattern 1, buttons fade up after

Test: this section should feel like a grand finale. The typography should be MASSIVE.
```

---

## PHASE 12: Footer

```
Build components/Footer.tsx:
- bg #050505, border-top 1px var(--border), py-16
- Container centered

Top: "NOVA." logo, display font, 2rem
Middle: flex row — email (jigpatel01234@gmail.com) + phone ((978) 606-3386), text-muted, gap-8
Bottom: "© 2026 Nova Digital. All rights reserved." — text-muted, text-xs, mt-8

Simple fade-up on scroll for the whole footer.

Test: clean, minimal, nothing fancy. Let the CTA section above do the heavy lifting.
```

---

## PHASE 13: Custom Cursor

```
Read CLAUDE.md — use Pattern 7 (Custom Cursor) exactly.

Build components/CustomCursor.tsx:
- Only activates on desktop (pointer: fine media query)
- Small dot (8px, accent, circle) follows mouse exactly
- Larger follower (40px, 1px accent border, circle) follows with lerp delay
- On hover over links/buttons: follower scales 1.5x, dot hides
- Hide default cursor on body

Add CustomCursor to app/layout.tsx, outside of main content flow.

Test on desktop: cursor should feel smooth and responsive. Follower should trail behind the dot with a satisfying delay. Hover states should be visible on all interactive elements.
```

---

## PHASE 14: Polish Pass

```
Read CLAUDE.md.

Final polish — go through every section and verify:

1. Responsive: test at 375px, 768px, 1024px, 1440px. Nothing should overflow or break.
2. Reduced motion: wrap all GSAP animations in a check:
   if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) { ... }
3. Check that all ScrollTrigger instances are killed on unmount
4. Verify Lenis smooth scroll works on all browsers
5. Check that mobile hamburger menu animation is smooth
6. Verify all links work (mailto, tel, scroll-to-section)
7. Run Lighthouse — target 90+ on Performance
8. Check that grain overlay is subtle (3-5% opacity), not distracting
9. Verify custom cursor only appears on desktop
10. Check all font weights and sizes match CLAUDE.md spec exactly
```

---

## HOW TO USE THESE PROMPTS

1. Place CLAUDE.md in your project root
2. Open Claude Code in your project directory
3. Paste Phase 1 prompt, let it complete, test in browser
4. Paste Phase 2 prompt, let it complete, test in browser
5. Continue through each phase sequentially
6. If a section doesn't look right, give specific feedback:
   - BAD: "The hero doesn't look good"
   - GOOD: "The hero headline is too small. Change to clamp(4rem, 9vw, 9rem) and reduce line-height to 0.9. The reveal animation is too fast — change duration to 1.2s and stagger to 0.15s"
7. Never skip ahead. Each phase depends on the previous one working correctly.
