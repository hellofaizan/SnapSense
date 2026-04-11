/**
 * MarqueeStrip — dual-row infinite scroll of feature tags.
 * Row 1 scrolls left, row 2 scrolls right for a layered look.
 * Pure CSS animation (animate-marquee-left / animate-marquee-right from index.css).
 */

const ROW_1 = [
  'AI Screenshot Analysis',
  'Win + Alt + S',
  'Precision Region Capture',
  'Text Extraction',
  'Google Lens Search',
  'Free Forever',
  'Open Source',
  'Stealth Mode',
  'Privacy First',
  'Zero Background Tracking',
]

const ROW_2 = [
  'Windows',
  'macOS',
  'Linux',
  'Voice Input',
  'AI Follow-up Chat',
  'Groq Powered',
  'Global Shortcut',
  'Dark Panel UI',
  'Instant Answers',
  'No Account Required',
]

function Tag({ label }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-1.5 text-[12px] font-medium text-neutral-400">
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400/70" aria-hidden />
      {label}
    </span>
  )
}

function MarqueeRow({ items, direction = 'left', speed = 45 }) {
  const cls = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'
  const doubled = [...items, ...items]
  const durationS = `${speed}s`
  return (
    <div className="overflow-hidden" aria-hidden>
      <div
        className={`flex w-max gap-3 ${cls}`}
        style={{ animationDuration: durationS }}
      >
        {doubled.map((item, i) => (
          <Tag key={`${item}-${i}`} label={item} />
        ))}
      </div>
    </div>
  )
}

export default function MarqueeStrip() {
  return (
    <div className="relative border-t border-white/8 bg-neutral-950 py-8 md:py-10 overflow-hidden">
      {/* fade masks on both sides */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-neutral-950 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-neutral-950 to-transparent"
        aria-hidden
      />
      <div className="flex flex-col gap-3">
        <MarqueeRow items={ROW_1} direction="left"  speed={50} />
        <MarqueeRow items={ROW_2} direction="right" speed={55} />
      </div>
    </div>
  )
}
