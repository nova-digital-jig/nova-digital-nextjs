"use client";

const footerLinks = [
  {
    title: "Navigate",
    links: [
      { label: "Work", href: "#portfolio" },
      { label: "Services", href: "#services" },
      { label: "Process", href: "#process" },
      { label: "Pricing", href: "#pricing" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "jigpatel01234@gmail.com", href: "mailto:jigpatel01234@gmail.com" },
      { label: "(978) 606-3386", href: "tel:978-606-3386" },
      { label: "Edison, New Jersey", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[#E8E4DC]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-0">
          {/* Brand */}
          <div className="md:col-span-5">
            <a href="#" className="text-2xl font-medium tracking-tight">
              Nova Digital
            </a>
            <p className="text-sm text-[#8A8580] mt-4 max-w-xs leading-relaxed">
              AI-powered web agency building stunning,
              high-converting websites in 48 hours.
            </p>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title} className="md:col-span-3">
              <p className="text-label mb-5">{group.title}</p>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#8A8580] hover:text-[#1A1A1A] transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-[#E8E4DC] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-[#8A8580]">
            &copy; {new Date().getFullYear()} Nova Digital. All rights reserved.
          </p>
          <p className="text-xs text-[#8A8580]">
            Built with AI. Powered by results.
          </p>
        </div>
      </div>
    </footer>
  );
}
