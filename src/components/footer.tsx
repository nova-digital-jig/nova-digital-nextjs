'use client'

const footerLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0A0A0F]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <a href="#" className="text-2xl font-bold tracking-tight text-white inline-block mb-4">
              NOVA<span className="gradient-text">.</span>
            </a>
            <p className="text-sm text-[#555] leading-relaxed max-w-xs">
              AI-powered web design agency delivering premium websites
              in 48 hours, not 48 days. Starting at $500.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-label text-[#555] mb-5">Quick Links</p>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#555] hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-label text-[#555] mb-5">Get in Touch</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:978-606-3386"
                  className="text-sm text-[#555] hover:text-white transition-colors duration-300"
                >
                  (978) 606-3386
                </a>
              </li>
              <li>
                <a
                  href="mailto:jigpatel01234@gmail.com"
                  className="text-sm text-[#555] hover:text-white transition-colors duration-300"
                >
                  jigpatel01234@gmail.com
                </a>
              </li>
              <li className="text-sm text-[#555]">Edison, NJ</li>
              <li className="text-sm text-[#555]">Mon &ndash; Fri, 9am &ndash; 6pm EST</li>
            </ul>
          </div>
        </div>

        {/* Local SEO */}
        <p className="text-xs text-[#333] mt-12 mb-8 leading-relaxed">
          Serving Edison, New Brunswick, Woodbridge, Piscataway, Metuchen, Perth Amboy,
          South Plainfield, and businesses nationwide.
        </p>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#333]">
            &copy; {new Date().getFullYear()} Nova Digital. All rights reserved.
          </p>
          <p className="text-xs text-[#333]">
            Built by <span className="gradient-text font-medium">Nova Digital</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
