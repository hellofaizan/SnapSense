/**
 * Magnet — React Bits magnetic hover effect.
 * Wraps children with an invisible padding zone; when the mouse enters,
 * the inner element is pulled toward the cursor.
 */
import { useRef } from 'react'

export default function Magnet({
  children,
  padding = 60,
  strength = 3.5,
  className = '',
}) {
  const outerRef = useRef(null)
  const innerRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!outerRef.current || !innerRef.current) return
    const rect = outerRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    innerRef.current.style.transform = `translate(${(e.clientX - cx) / strength}px, ${(e.clientY - cy) / strength}px)`
    innerRef.current.style.transition = 'transform 0.2s ease-out'
  }

  const handleMouseLeave = () => {
    if (!innerRef.current) return
    innerRef.current.style.transform = 'translate(0,0)'
    innerRef.current.style.transition = 'transform 0.55s cubic-bezier(0.22,1,0.36,1)'
  }

  return (
    <div
      ref={outerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ padding, margin: -padding, display: 'inline-block' }}
      className={className}
    >
      <div ref={innerRef}>{children}</div>
    </div>
  )
}
