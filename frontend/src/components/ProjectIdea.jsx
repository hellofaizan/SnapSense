import { Cpu, Eye, Workflow } from 'lucide-react'
import Container from './Container'
import { ScrollReveal, Stagger, StaggerItem } from './ScrollReveal'

const pillars = [
  {
    icon: Eye,
    title: 'The problem',
    desc: 'Useful context is trapped in screenshots, errors, docs, and UI states. Switching tabs to explain every capture breaks flow.',
    accent: 'bg-blue-500/15 ring-blue-500/30 text-blue-300',
  },
  {
    icon: Workflow,
    title: 'The idea',
    desc: 'Snap once and decide what you need next: AI understanding, plain text extraction, or visual search with Google Lens.',
    accent: 'bg-violet-500/15 ring-violet-500/30 text-violet-300',
  },
  {
    icon: Cpu,
    title: 'Why SnapSense',
    desc: 'Desktop-first workflow with a global shortcut, low-friction capture overlay, and a focused side panel designed for quick iteration.',
    accent: 'bg-teal-500/15 ring-teal-500/30 text-teal-300',
  },
]

export default function ProjectIdea() {
  return (
    <section id="project-idea" className="relative border-t border-white/10 py-24 md:py-32">
      <Container>
        <ScrollReveal>
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-blue-400/90">
            Project idea
          </p>
          <h2 className="mt-4 text-center text-3xl font-semibold tracking-tight text-neutral-100 md:text-[2rem]">
            Understand any screen without context switching
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[15px] leading-relaxed text-neutral-400 md:text-[17px]">
            SnapSense is a Windows tray app that turns a selected screen region into actionable output in seconds.
            It is built for people who constantly inspect visual information while working.
          </p>
        </ScrollReveal>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
          {pillars.map((item) => (
            <StaggerItem key={item.title}>
              <article className="h-full rounded-2xl border border-white/10 bg-neutral-950/70 p-6 ring-1 ring-white/5">
                <div className={`mb-5 inline-flex rounded-lg p-2.5 ring-1 ${item.accent}`}>
                  <item.icon className="h-5 w-5" strokeWidth={1.6} />
                </div>
                <h3 className="text-[17px] font-semibold text-neutral-100">{item.title}</h3>
                <p className="mt-3 text-[14px] leading-relaxed text-neutral-500">{item.desc}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}
