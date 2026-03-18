'use client'

export function Marquee() {
  const items = ['DESIGN', 'DEVELOP', 'DEPLOY']
  const repeated = Array(8).fill(items).flat()

  return (
    <section className="py-8 border-y border-white/5 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span
            key={i}
            className="text-[clamp(1.5rem,3vw,3rem)] font-bold uppercase tracking-wider text-white/10 mx-6 md:mx-10 flex items-center gap-6 md:gap-10"
          >
            {item}
            <span className="text-[#8b5cf6] text-lg">·</span>
          </span>
        ))}
      </div>
    </section>
  )
}
