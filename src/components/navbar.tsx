"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "glass-strong shadow-lg shadow-black/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-rose-500">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Nova<span className="text-gradient">Digital</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a href="tel:978-606-3386" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            (978) 606-3386
          </a>
          <a href="#pricing">
            <Button className="bg-gradient-to-r from-violet-500 to-rose-500 text-white border-0 hover:opacity-90 transition-opacity">
              Get Started
            </Button>
          </a>
        </div>

        {/* Mobile nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" />
            }
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] bg-background/95 backdrop-blur-xl">
            <SheetHeader>
              <SheetTitle className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-rose-500">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </div>
                Nova Digital
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-1 px-4 mt-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-4 flex flex-col gap-3 border-t border-border pt-4">
                <a href="tel:978-606-3386" className="px-3 text-sm text-muted-foreground">
                  (978) 606-3386
                </a>
                <a href="#pricing" onClick={() => setOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-violet-500 to-rose-500 text-white border-0">
                    Get Started
                  </Button>
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </motion.header>
  );
}
