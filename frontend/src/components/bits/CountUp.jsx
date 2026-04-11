/**
 * CountUp — React Bits inspired animated number counter.
 * Counts from 0 to `to` when the element enters the viewport.
 */
import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

export default function CountUp({
  to,
  duration = 1.8,
  decimals = 0,
  suffix = '',
  prefix = '',
  className = '',
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!isInView) return
    const start = performance.now()
    const step = (now) => {
      const elapsed = (now - start) / (duration * 1000)
      const progress = Math.min(elapsed, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(+(eased * to).toFixed(decimals))
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [isInView, to, duration, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}{value.toFixed(decimals)}{suffix}
    </span>
  )
}
