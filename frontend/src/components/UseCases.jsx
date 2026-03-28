import { motion } from 'framer-motion'
import { BookOpen, BriefcaseBusiness, Code2, Palette, Rocket } from 'lucide-react'
import Container from './Container'
import { ScrollReveal } from './ScrollReveal'

const bentoCards = [
  {
    icon: BookOpen,
    title: 'For students',
    desc: 'Turn lecture slides, PDFs, and problem sets into explanations and study notes in one snip.',
    accent: 'border-blue-500/20 bg-blue-500/[0.07] lg:col-span-2',
    iconBg: 'bg-blue-500/15 ring-blue-500/25',
    iconColor: 'text-blue-300',
  },
  {
    icon: Code2,
    title: 'For developers',
    desc: 'Debug faster: capture stack traces, configs, and snippets for clarity and quicker fixes.',
    accent: 'border-violet-500/20 bg-violet-500/[0.07] lg:col-span-2',
    iconBg: 'bg-violet-500/15 ring-violet-500/25',
    iconColor: 'text-violet-300',
  },
  {
    icon: Palette,
    title: 'For designers',
    desc: 'Study UI patterns, spacing, and references from any tool or browser without exporting assets.',
    accent: 'border-teal-500/20 bg-teal-500/[0.07] lg:col-span-2',
    iconBg: 'bg-teal-500/15 ring-teal-500/25',
    iconColor: 'text-teal-300',
  },
  {
    icon: BriefcaseBusiness,
    title: 'For support teams',
    desc: 'Capture customer issues from tickets and dashboards, then generate clear action steps quickly.',
    accent: 'border-amber-500/20 bg-amber-500/[0.07] lg:col-span-3',
    iconBg: 'bg-amber-500/15 ring-amber-500/25',
    iconColor: 'text-amber-300',
  },
  {
    icon: Rocket,
    title: 'For product teams',
    desc: 'Review feature behavior from recorded screens and UI states without interrupting discussion flow.',
    accent: 'border-cyan-500/20 bg-cyan-500/[0.07] lg:col-span-3',
    iconBg: 'bg-cyan-500/15 ring-cyan-500/25',
    iconColor: 'text-cyan-300',
  },
]

export default function UseCases() {
  return (
    <section id="use-cases" className="relative border-t border-white/10 py-24 md:py-32">
      <Container>
        <ScrollReveal>
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-blue-400/90">Use cases</p>
          <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-neutral-100 md:text-[2rem]">
            Real workflows, not demo-only scenarios
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-relaxed text-neutral-400 md:text-[17px]">
            A bento-style use-case layout mirrors how different teams use SnapSense in daily execution.
          </p>
        </ScrollReveal>

        <div className="mt-16 grid gap-4 lg:grid-cols-6">
          {bentoCards.map((c) => (
            <motion.article
              key={c.title}
              whileHover={{ y: -3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 28 }}
              className={`h-full rounded-2xl border p-6 ring-1 ring-white/5 ${c.accent}`}
            >
              <div className={`mb-5 inline-flex rounded-lg p-2.5 ring-1 ${c.iconBg}`}>
                <c.icon className={`h-5 w-5 ${c.iconColor}`} strokeWidth={1.5} />
              </div>
              <h3 className="text-[18px] font-semibold text-neutral-100">{c.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-neutral-500">{c.desc}</p>
            </motion.article>
          ))}
        </div>

        <ScrollReveal className="mt-10 rounded-2xl border border-white/15 bg-neutral-900/65 p-6 md:p-8" delay={0.1}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Outcome</p>
          <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-neutral-400">
            Across teams, SnapSense reduces context loss by turning visual fragments into answers in one compact
            interaction loop: trigger, snip, choose mode, act.
          </p>
        </ScrollReveal>
      </Container>
    </section>
  )
}
