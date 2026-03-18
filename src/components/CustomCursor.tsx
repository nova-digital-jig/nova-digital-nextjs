'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const followerPos = useRef({ x: 0, y: 0 })
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches
    if (isCoarsePointer) return

    const dot = dotRef.current
    const follower = followerRef.current
    if (!dot || !follower) return

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`
    }

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n

    let rafId: number
    const animate = () => {
      followerPos.current.x = lerp(followerPos.current.x, mouse.current.x, 0.15)
      followerPos.current.y = lerp(followerPos.current.y, mouse.current.y, 0.15)
      follower.style.left = `${followerPos.current.x}px`
      follower.style.top = `${followerPos.current.y}px`
      rafId = requestAnimationFrame(animate)
    }

    const onMouseEnterLink = () => {
      follower.classList.add('hovering')
      dot.classList.add('hidden')
    }

    const onMouseLeaveLink = () => {
      follower.classList.remove('hovering', 'hovering-image')
      dot.classList.remove('hidden')
      if (textRef.current) textRef.current.textContent = ''
    }

    const onMouseEnterImage = () => {
      follower.classList.add('hovering-image')
      dot.classList.add('hidden')
      if (textRef.current) textRef.current.textContent = 'VIEW'
    }

    const onMouseLeaveImage = () => {
      follower.classList.remove('hovering-image')
      dot.classList.remove('hidden')
      if (textRef.current) textRef.current.textContent = ''
    }

    window.addEventListener('mousemove', onMouseMove)
    rafId = requestAnimationFrame(animate)

    const links = document.querySelectorAll('a, button')
    links.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterLink)
      el.addEventListener('mouseleave', onMouseLeaveLink)
    })

    const images = document.querySelectorAll('[data-cursor-image]')
    images.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnterImage)
      el.addEventListener('mouseleave', onMouseLeaveImage)
    })

    // Re-attach listeners when DOM changes (for dynamically added elements)
    const observer = new MutationObserver(() => {
      const newLinks = document.querySelectorAll('a, button')
      newLinks.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink)
        el.removeEventListener('mouseleave', onMouseLeaveLink)
        el.addEventListener('mouseenter', onMouseEnterLink)
        el.addEventListener('mouseleave', onMouseLeaveLink)
      })
      const newImages = document.querySelectorAll('[data-cursor-image]')
      newImages.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterImage)
        el.removeEventListener('mouseleave', onMouseLeaveImage)
        el.addEventListener('mouseenter', onMouseEnterImage)
        el.addEventListener('mouseleave', onMouseLeaveImage)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafId)
      observer.disconnect()
      links.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink)
        el.removeEventListener('mouseleave', onMouseLeaveLink)
      })
      images.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterImage)
        el.removeEventListener('mouseleave', onMouseLeaveImage)
      })
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={followerRef} className="cursor-follower">
        <span ref={textRef} />
      </div>
    </>
  )
}
