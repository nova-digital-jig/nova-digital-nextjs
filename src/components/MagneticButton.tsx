'use client'

import { useRef, useEffect, type ReactNode } from 'react'
import gsap from 'gsap'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  as?: 'button' | 'a'
  href?: string
  target?: string
  rel?: string
  onClick?: () => void
}

export function MagneticButton({
  children,
  className = '',
  as = 'button',
  href,
  target,
  rel,
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const handleLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  const Tag = as as React.ElementType
  const props = {
    ref,
    className: `magnetic-btn ${className}`,
    ...(href && { href }),
    ...(target && { target }),
    ...(rel && { rel }),
    ...(onClick && { onClick }),
  }

  return <Tag {...props}>{children}</Tag>
}
