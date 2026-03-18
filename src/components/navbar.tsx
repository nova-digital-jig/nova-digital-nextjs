"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Work", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-[#FAF9F6]/90 backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-[1400px] items-center justify-between px-6 md:px-10 py-5">
          <a href="#" className="text-lg font-medium tracking-tight">
            Nova Digital
          </a>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-sm text-[#8A8580] hover:text-[#1A1A1A] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:978-606-3386"
              className="text-sm text-[#8A8580] hover:text-[#1A1A1A] transition-colors"
            >
              (978) 606-3386
            </a>
            <a href="#pricing" className="btn-primary text-sm py-3 px-6">
              Start a Project
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#FAF9F6] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col justify-center items-center h-full gap-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-display text-[#1A1A1A] transition-all duration-500"
              style={{
                transitionDelay: menuOpen ? `${i * 80}ms` : "0ms",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(30px)",
              }}
            >
              {link.label}
            </a>
          ))}
          <div
            className="mt-8 flex flex-col items-center gap-4 transition-all duration-500"
            style={{
              transitionDelay: menuOpen ? "400ms" : "0ms",
              opacity: menuOpen ? 1 : 0,
            }}
          >
            <a href="tel:978-606-3386" className="text-sm text-[#8A8580]">
              (978) 606-3386
            </a>
            <a
              href="#pricing"
              onClick={() => setMenuOpen(false)}
              className="btn-primary"
            >
              Start a Project
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
