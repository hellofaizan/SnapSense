/**
 * ShinyText — React Bits inspired shimmer sweep over text.
 * Requires the `animate-shine` keyframe in global CSS.
 */
export default function ShinyText({ text, speed = 4, className = '' }) {
  return (
    <span
      className={`animate-shine inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(110deg, currentColor 25%, rgba(255,255,255,0.85) 45%, currentColor 60%)',
        backgroundSize: '250% 100%',
        animationDuration: `${speed}s`,
        /* currentColor lets the caller set the base colour via text-* utilities */
        color: 'inherit',
      }}
    >
      {text}
    </span>
  )
}
