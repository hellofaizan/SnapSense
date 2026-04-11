import CountUp from './bits/CountUp'
import Container from './Container'
import { ScrollReveal } from './ScrollReveal'

const stats = [
  { value: 100, suffix: '%', label: 'Free forever', decimals: 0 },
  { value: 3, suffix: '', label: 'Platforms', decimals: 0 },
  { value: 1, suffix: '', label: 'Shortcut to rule them all', decimals: 0 },
  { value: 0, suffix: '', label: 'Data sent without your action', decimals: 0 },
]

export default function StatsBar() {
  return (
    <section aria-label="Key statistics" className="border-t border-white/8 bg-neutral-950 py-14 md:py-16">
      <Container>
        <ScrollReveal y={24}>
          <dl className="grid grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-4 md:gap-x-8">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 text-center">
                <dt className="order-2 text-[12px] font-medium leading-snug text-neutral-500 md:text-[13px]">
                  {s.label}
                </dt>
                <dd className="order-1 text-[2.8rem] font-bold leading-none tracking-tight text-neutral-100 md:text-[3.4rem]">
                  <CountUp to={s.value} suffix={s.suffix} decimals={s.decimals} duration={1.6} />
                </dd>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </Container>
    </section>
  )
}
