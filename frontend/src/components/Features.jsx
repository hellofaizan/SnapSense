import { motion } from 'framer-motion'
import {
  Brain,
  ClipboardCheck,
  Crosshair,
  LayoutPanelTop,
  MonitorSmartphone,
  SearchCheck,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import Container from './Container'
import { ScrollReveal, Stagger, StaggerItem } from './ScrollReveal'

const items = [
  {
    icon: Brain,
    title: 'Instant AI insights',
    desc: 'Explain code, summarize text, decode errors, and describe UI from a single snip.',
    iconWrap: 'bg-blue-500/15 ring-blue-500/25',
    iconColor: 'text-blue-300',
  },
  {
    icon: MonitorSmartphone,
    title: 'Works anywhere',
    desc: 'Browsers, IDEs, design tools, terminals — capture context from any app on Windows.',
    iconWrap: 'bg-violet-500/15 ring-violet-500/25',
    iconColor: 'text-violet-300',
  },
  {
    icon: Zap,
    title: 'Lightning-fast snipping',
    desc: 'Global shortcut, minimal chrome, and results in seconds so you stay in flow.',
    iconWrap: 'bg-amber-500/15 ring-amber-500/25',
    iconColor: 'text-amber-300',
  },
  {
    icon: Crosshair,
    title: 'Smart context',
    desc: 'Handles structure: code blocks, stack traces, diagrams, and mixed layouts.',
    iconWrap: 'bg-teal-500/15 ring-teal-500/25',
    iconColor: 'text-teal-300',
  },
  {
    icon: LayoutPanelTop,
    title: 'Three focused modes',
    desc: 'Open each capture in AI chat mode, text extraction mode, or Google Lens mode.',
    iconWrap: 'bg-indigo-500/15 ring-indigo-500/25',
    iconColor: 'text-indigo-300',
  },
  {
    icon: ClipboardCheck,
    title: 'Text extraction',
    desc: 'Pull readable text from screenshots and copy it instantly for notes, docs, or prompts.',
    iconWrap: 'bg-cyan-500/15 ring-cyan-500/25',
    iconColor: 'text-cyan-300',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative border-t border-white/10 py-24 md:py-32">
      <Container>
        <ScrollReveal>
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-blue-400/90">Features</p>
          <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-neutral-100 md:text-[2rem]">
            Built around real desktop workflows
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-relaxed text-neutral-400 md:text-[17px]">
            From capture to output, SnapSense combines shortcut-driven selection, mode-based analysis, and fast
            response loops so you can keep momentum while working.
          </p>
        </ScrollReveal>
        <Stagger className="mt-16 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-5">
          {items.map((f) => (
            <StaggerItem key={f.title}>
              <motion.article
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
                className="group h-full rounded-2xl border border-white/10 bg-neutral-950/90 p-6 ring-1 ring-white/5"
              >
                <div className={`mb-5 inline-flex rounded-lg p-2 ring-1 ${f.iconWrap}`}>
                  <f.icon className={`h-5 w-5 ${f.iconColor}`} strokeWidth={1.5} />
                </div>
                <h3 className="text-[17px] font-semibold text-neutral-100">{f.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-neutral-500">{f.desc}</p>
              </motion.article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
