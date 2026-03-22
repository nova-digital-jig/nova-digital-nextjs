'use client'

export default function Footer() {
  return (
    <footer className="relative border-t border-foreground/[0.06] px-6 md:px-16 lg:px-24 py-12 md:py-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 md:gap-0">
        {/* Logo */}
        <span className="font-[family-name:var(--font-syne)] text-sm font-bold tracking-[0.2em] uppercase text-foreground">
          vektor
        </span>

        {/* Links */}
        <div className="flex items-center gap-8">
          <a
            href="#process"
            className="font-[family-name:var(--font-inter)] text-xs tracking-[0.1em] uppercase text-muted hover:text-foreground transition-colors duration-300"
          >
            Process
          </a>
          <a
            href="#pricing"
            className="font-[family-name:var(--font-inter)] text-xs tracking-[0.1em] uppercase text-muted hover:text-foreground transition-colors duration-300"
          >
            Pricing
          </a>
          <a
            href="#contact"
            className="font-[family-name:var(--font-inter)] text-xs tracking-[0.1em] uppercase text-muted hover:text-foreground transition-colors duration-300"
          >
            Contact
          </a>
        </div>

        {/* Contact */}
        <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
          <a
            href="mailto:jigpatel01234@gmail.com"
            className="font-[family-name:var(--font-inter)] text-xs text-muted hover:text-foreground transition-colors duration-300"
          >
            jigpatel01234@gmail.com
          </a>
          <a
            href="tel:+19786063386"
            className="font-[family-name:var(--font-inter)] text-xs text-muted hover:text-foreground transition-colors duration-300"
          >
            (978) 606-3386
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 pt-6 border-t border-foreground/[0.04] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <span className="font-[family-name:var(--font-inter)] text-[11px] text-muted/60">
          &copy; 2026 Vektor
        </span>
        <span className="font-[family-name:var(--font-inter)] text-[11px] text-muted/40">
          Built by Vektor
        </span>
      </div>
    </footer>
  )
}
