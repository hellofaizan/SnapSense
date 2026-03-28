import { motion } from 'framer-motion'
import {
  Brain,
  ClipboardCheck,
  Crosshair,
  LayoutPanelTop,
  SearchCheck,
  ShieldCheck,
  Zap,
} from 'lucide-react'
import Container from './Container'
import { ScrollReveal } from './ScrollReveal'

const quickCards = [
  {
    icon: LayoutPanelTop,
    title: 'Three output modes',
    desc: 'Switch between AI chat, text extraction, and Lens workflows for each capture.',
    iconWrap: 'bg-blue-500/15 ring-blue-500/25',
    iconColor: 'text-blue-300',
    span: 'lg:col-span-2',
  },
  {
    icon: ClipboardCheck,
    title: 'Text extraction',
    desc: 'Pull clean text from selected regions and copy instantly for docs, prompts, or notes.',
    iconWrap: 'bg-violet-500/15 ring-violet-500/25',
    iconColor: 'text-violet-300',
    span: 'lg:col-span-2',
  },
  {
    icon: SearchCheck,
    title: 'Lens search fallback',
    desc: 'Open browser flow when embedded Lens is limited, while preserving capture context.',
    iconWrap: 'bg-fuchsia-500/15 ring-fuchsia-500/25',
    iconColor: 'text-fuchsia-300',
    span: 'lg:col-span-2',
  },
  {
    icon: Crosshair,
    title: 'Precision capture',
    desc: 'Select only the relevant region so output stays focused and noise stays low.',
    iconWrap: 'bg-teal-500/15 ring-teal-500/25',
    iconColor: 'text-teal-300',
    span: 'lg:col-span-3',
  },
  {
    icon: ShieldCheck,
    title: 'Capture-first privacy',
    desc: 'Analysis starts only after explicit shortcut + region selection by the user.',
    iconWrap: 'bg-emerald-500/15 ring-emerald-500/25',
    iconColor: 'text-emerald-300',
    span: 'lg:col-span-3',
  },
]

export default function Features() {
  return (
    <section id="features" className="relative border-t border-white/10 py-24 md:py-32">
      <Container>
        <ScrollReveal>
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-blue-400/90">Features</p>
          <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-neutral-100 md:text-[2rem]">
            Bento-style product highlights
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-relaxed text-neutral-400 md:text-[17px]">
            Structured cards present the complete capture flow at a glance, from trigger speed to mode-specific output.
          </p>
        </ScrollReveal>
        <div className="mt-16 grid gap-4 lg:grid-cols-6">
          <motion.article
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-white/15 bg-neutral-900/70 p-7 ring-1 ring-white/10 lg:col-span-4"
          >
            <div className="mb-5 inline-flex rounded-lg bg-blue-500/15 p-2 ring-1 ring-blue-500/25">
              <Brain className="h-5 w-5 text-blue-300" strokeWidth={1.5} />
            </div>
            <h3 className="text-[20px] font-semibold text-neutral-100">Instant AI screenshot understanding</h3>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-neutral-500">
              Start from one capture and get direct context on code, errors, visual states, and UI behavior. Continue in
              the same panel with follow-up prompts instead of repeating capture cycles.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[12px] text-neutral-300">
                Code and stack traces
              </div>
              <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[12px] text-neutral-300">
                UI and layout analysis
              </div>
              <div className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-[12px] text-neutral-300">
                Docs and text summaries
              </div>
            </div>
          </motion.article>

          <motion.article
            whileHover={{ y: -2 }}
            transition={{ duration: 0.2 }}
            className="rounded-2xl border border-white/15 bg-neutral-900/70 p-6 ring-1 ring-white/10 lg:col-span-2"
          >
            <div className="mb-4 inline-flex rounded-lg bg-amber-500/15 p-2 ring-1 ring-amber-500/25">
              <Zap className="h-5 w-5 text-amber-300" strokeWidth={1.5} />
            </div>
            <h3 className="text-[17px] font-semibold text-neutral-100">Fast trigger loop</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-neutral-500">
              Win + Alt + S opens capture instantly so you can act before context fades.
            </p>
            <div className="mt-5 rounded-xl border border-blue-500/25 bg-blue-500/10 p-4">
              <p className="text-[11px] uppercase tracking-[0.18em] text-blue-300/90">Shortcut</p>
              <p className="mt-2 text-[18px] font-semibold text-blue-100">Win + Alt + S</p>
            </div>
          </motion.article>

          {quickCards.map((f) => (
            <motion.article
              key={f.title}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className={`group rounded-2xl border border-white/15 bg-neutral-900/70 p-6 ring-1 ring-white/10 ${f.span}`}
            >
              <div className={`mb-5 inline-flex rounded-lg p-2 ring-1 ${f.iconWrap}`}>
                <f.icon className={`h-5 w-5 ${f.iconColor}`} strokeWidth={1.5} />
              </div>
              <h3 className="text-[17px] font-semibold text-neutral-100">{f.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-neutral-500">{f.desc}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  )
}
