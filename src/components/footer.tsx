'use client'

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="text-lg font-bold tracking-tight text-white">
            NOVA<span className="gradient-text">.</span>
          </a>

          {/* Links */}
          <div className="flex items-center gap-8">
            <a
              href="mailto:jigpatel01234@gmail.com"
              className="text-sm text-[#555] hover:text-white transition-colors duration-300"
            >
              jigpatel01234@gmail.com
            </a>
            <a
              href="tel:978-606-3386"
              className="text-sm text-[#555] hover:text-white transition-colors duration-300"
            >
              (978) 606-3386
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-[#333]">
            &copy; {new Date().getFullYear()} Nova Digital
          </p>
        </div>
      </div>
    </footer>
  )
}
