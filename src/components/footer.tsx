import { Sparkles, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Services: [
    { label: "Custom Websites", href: "#services" },
    { label: "UI/UX Design", href: "#services" },
    { label: "SEO Optimization", href: "#services" },
    { label: "Performance", href: "#services" },
  ],
  Company: [
    { label: "Portfolio", href: "#portfolio" },
    { label: "Process", href: "#process" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-background/50">
      {/* Subtle glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="space-y-4">
            <a href="#" className="flex items-center gap-2 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-rose-500 transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-violet-500/25">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight">
                Nova<span className="text-gradient">Digital</span>
              </span>
            </a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AI-powered web agency building stunning, high-converting websites in 48 hours.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a
                href="mailto:jigpatel01234@gmail.com"
                className="flex items-center gap-2 hover:text-foreground transition-colors group"
              >
                <Mail className="h-4 w-4 group-hover:text-violet-400 transition-colors" />
                jigpatel01234@gmail.com
              </a>
              <a
                href="tel:978-606-3386"
                className="flex items-center gap-2 hover:text-foreground transition-colors group"
              >
                <Phone className="h-4 w-4 group-hover:text-violet-400 transition-colors" />
                (978) 606-3386
              </a>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Edison, New Jersey
              </div>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="nav-link-underline text-sm text-muted-foreground transition-colors hover:text-foreground inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8 bg-white/5" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Nova Digital. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with AI. Powered by results.
          </p>
        </div>
      </div>
    </footer>
  );
}
