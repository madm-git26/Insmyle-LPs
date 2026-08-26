import { treatments } from '../data/content.js'
import Section, { GLASS } from './Section.jsx'

export default function Treatments() {
  return (
    <Section id="treatments" eyebrow={treatments.eyebrow} heading={treatments.heading} intro={treatments.intro}>
      <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {treatments.steps.map((step, i) => (
          <li key={step.n} className={`${GLASS} relative p-6`}>
            {/* connector, desktop only — decorative */}
            {i < treatments.steps.length - 1 && (
              <span
                aria-hidden="true"
                className="absolute -right-3 top-1/2 hidden h-px w-6 -translate-y-1/2 bg-gradient-to-r from-blue-400/40 to-transparent lg:block"
              />
            )}
            <span className="text-[2rem] font-bold leading-none text-blue-400/70">{step.n}</span>
            <h3 className="mt-4 text-base font-semibold text-white">{step.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-gray-400">{step.desc}</p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
