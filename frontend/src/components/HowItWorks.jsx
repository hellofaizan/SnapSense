import { motion } from 'framer-motion'
import { Keyboard, LayoutPanelTop, MousePointer2, Sparkles } from 'lucide-react'
import Container from './Container'
import { ScrollReveal, Stagger, StaggerItem } from './ScrollReveal'

const steps = [
  {
    title: 'Press shortcut',
    desc: 'Trigger SnapSense from anywhere with the global shortcut (Win/Alt/S in the current build).',
    icon: Keyboard,
    ring: 'border-blue-500/35 bg-neutral-900/85',
    iconColor: 'text-blue-300',
  },
  {
    title: 'Snip screen',
    desc: 'Freeze the desktop and drag to select the exact region you care about.',
    icon: MousePointer2,
    ring: 'border-violet-500/35 bg-neutral-900/85',
    iconColor: 'text-violet-300',
  },
  {
    title: 'Choose mode',
    desc: 'Pick AI, Text, or Lens from the floating mode strip before opening results.',
    icon: LayoutPanelTop,
    ring: 'border-indigo-500/35 bg-neutral-900/85',
    iconColor: 'text-indigo-300',
  },
  {
    title: 'Get output',
    desc: 'Review the result in a focused side panel, then iterate with follow-up prompts if needed.',
    icon: Sparkles,
    ring: 'border-teal-500/35 bg-neutral-900/85',
    iconColor: 'text-teal-300',
  },
]

const modeDetails = [
  {
    mode: 'AI mode',
    detail: 'Starts with an automatic screenshot description and supports follow-up chat in the same context.',
  },
  {
    mode: 'Text mode',
    detail: 'Extracts text from the selected image region and provides one-click copy for reuse.',
  },
  {
    mode: 'Lens mode',
    detail: 'Uploads the capture for visual search, with an external-browser fallback when embeds are restricted.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32">
      <Container>
        <ScrollReveal>
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-blue-400/90">
            How it works
          </p>
          <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-neutral-100 md:text-[2rem]">
            Fast capture-to-answer workflow
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-relaxed text-neutral-400 md:text-[17px]">
            SnapSense is designed around one short loop: trigger, select, choose mode, and act on the result.
          </p>
        </ScrollReveal>
        <div className="relative mt-20">
          {/* Runs only in the gutters; icon tiles use solid bg so the line does not cut through them */}
          <div className="pointer-events-none absolute left-[8%] right-[8%] top-7 z-0 hidden h-px bg-linear-to-r from-blue-500/20 via-violet-500/20 to-teal-500/20 md:block lg:left-[12%] lg:right-[12%]" />
          <Stagger className="grid gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {steps.map((s, i) => (
              <StaggerItem key={s.title}>
                <motion.div whileHover={{ y: -2 }} className="relative flex flex-col items-center text-center">
                  <div
                    className={`relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border ring-1 ring-white/5 ${s.ring}`}
                  >
                    <s.icon className={`h-6 w-6 ${s.iconColor}`} strokeWidth={1.5} />
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                    Step {i + 1}
                  </span>
                  <h3 className="mt-2 text-[17px] font-semibold text-neutral-100">{s.title}</h3>
                  <p className="mt-3 max-w-[260px] text-[14px] leading-relaxed text-neutral-500">{s.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <ScrollReveal className="mt-16 rounded-2xl border border-white/15 bg-neutral-900/65 p-6 md:p-8" delay={0.08}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">What each mode does</p>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {modeDetails.map((item) => (
              <div key={item.mode} className="rounded-xl border border-white/15 bg-white/5 p-4">
                <p className="text-[14px] font-semibold text-neutral-200">{item.mode}</p>
                <p className="mt-2 text-[13px] leading-relaxed text-neutral-500">{item.detail}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </Container>
    </section>
  )
}
