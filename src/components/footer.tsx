"use client";

import { Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Web Design", href: "#services" },
    { label: "UI/UX Design", href: "#services" },
    { label: "SEO & Performance", href: "#services" },
    { label: "AI Integration", href: "#services" },
  ],
  company: [
    { label: "Our Work", href: "#portfolio" },
    { label: "Process", href: "#process" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#060609] border-t border-[#1f1f3a]">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <a href="#" className="text-2xl font-bold tracking-tight text-white">
              Nova Digital
            </a>
            <p className="text-sm text-[#888899] mt-4 max-w-xs leading-relaxed">
              AI-powered web agency building stunning,
              high-converting websites in 48 hours.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-label mb-5">Services</p>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#888899] hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <p className="text-label mb-5">Company</p>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-[#888899] hover:text-white transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-label mb-5">Contact</p>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:jigpatel01234@gmail.com"
                  className="flex items-center gap-2 text-sm text-[#888899] hover:text-white transition-colors duration-300"
                >
                  <Mail size={14} className="shrink-0" />
                  jigpatel01234@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:978-606-3386"
                  className="flex items-center gap-2 text-sm text-[#888899] hover:text-white transition-colors duration-300"
                >
                  <Phone size={14} className="shrink-0" />
                  (978) 606-3386
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-sm text-[#888899]">
                  <MapPin size={14} className="shrink-0" />
                  Edison, NJ
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 md:mt-24 pt-8 border-t border-[#1f1f3a] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-[#555566]">
            &copy; {new Date().getFullYear()} Nova Digital. All rights reserved.
          </p>
          <p className="text-xs text-[#555566]">
            Built with AI. Powered by results.
          </p>
        </div>
      </div>
    </footer>
  );
}
