import * as React from 'react'

/**
 * Fades an element in once it scrolls into view, without pulling Framer Motion
 * into the home route's eagerly-loaded bundle (see docs/performance/OVERVIEW.md).
 * `motion-safe:` keeps the element fully visible outside the observed transition
 * when `prefers-reduced-motion` is set, satisfying the accessibility baseline.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = React.useRef<T>(null)
  const [isVisible, setIsVisible] = React.useState(false)

  React.useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '-40px' },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}
