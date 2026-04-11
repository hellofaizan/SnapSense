/**
 * TiltCard — React Bits inspired 3-D perspective tilt on hover.
 * Pass children normally; all styling stays on the outer wrapper className.
 */
import { useRef } from 'react'

export default function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.015,
  perspective = 900,
  glare = true,
}) {
  const cardRef = useRef(null)
  const glareRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const { left, top, width, height } = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - left) / width   // 0..1
    const y = (e.clientY - top) / height   // 0..1
    const rotateX = (y - 0.5) * -maxTilt * 2
    const rotateY = (x - 0.5) * maxTilt * 2

    cardRef.current.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${scale},${scale},${scale})`
    cardRef.current.style.transition = 'transform 0.12s ease-out'

    if (glare && glareRef.current) {
      const angle = Math.atan2(e.clientY - (top + height / 2), e.clientX - (left + width / 2)) * (180 / Math.PI)
      glareRef.current.style.opacity = '1'
      glareRef.current.style.transform = `rotate(${angle}deg)`
    }
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)`
    cardRef.current.style.transition = 'transform 0.45s cubic-bezier(0.22,1,0.36,1)'
    if (glare && glareRef.current) glareRef.current.style.opacity = '0'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute -inset-[50%] opacity-0 transition-opacity duration-300"
          style={{
            background:
              'linear-gradient(105deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0) 60%)',
            transformOrigin: 'center',
          }}
        />
      )}
    </div>
  )
}
