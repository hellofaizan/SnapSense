/**
 * BlurText — React Bits inspired word-by-word blur-in animation.
 * Each word fades in with a gaussian blur dissolve, staggered by delay ms.
 */
import { useRef, useEffect } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'

export default function BlurText({
  text = '',
  delay = 120,
  className = '',
  animateBy = 'words',
  direction = 'top',
  stepDuration = 0.42,
  onAnimationComplete,
}) {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('')
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  useEffect(() => {
    if (isInView) {
      controls.start('show').then(() => onAnimationComplete?.())
    }
  }, [isInView, controls, onAnimationComplete])

  const fromY = direction === 'top' ? -14 : 14

  return (
    <span ref={ref} className={`flex flex-wrap ${className}`} aria-label={text}>
      {elements.map((word, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={{ filter: 'blur(12px)', opacity: 0, y: fromY }}
          animate={controls}
          variants={{
            show: {
              filter: 'blur(0px)',
              opacity: 1,
              y: 0,
              transition: {
                delay: (i * delay) / 1000,
                duration: stepDuration,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
          className={animateBy === 'words' ? 'mr-[0.28em]' : ''}
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}
