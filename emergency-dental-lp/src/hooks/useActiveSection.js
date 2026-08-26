import { useEffect, useState } from 'react'

/**
 * Scrollspy for nav highlighting (§9 nav-state-active).
 * Uses IntersectionObserver rather than a scroll handler so it costs nothing
 * per frame, and a top margin so a section counts as "current" once it clears
 * the fixed header rather than when its very first pixel appears.
 */
export default function useActiveSection(ids) {
  const [active, setActive] = useState('')

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!els.length) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-88px 0px -55% 0px', threshold: [0.1, 0.35, 0.6] },
    )

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])

  return active
}
