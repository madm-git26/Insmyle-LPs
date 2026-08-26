import { Check } from 'lucide-react'
import { whyUs } from '../data/content.js'
import Section, { GLASS } from './Section.jsx'

export default function WhyUs() {
  return (
    <Section id="why-us" eyebrow={whyUs.eyebrow} heading={whyUs.heading}>
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {whyUs.items.map((item) => (
          <li key={item.title} className={`${GLASS} p-6`}>
            <span className="grid size-9 place-items-center rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-400">
              <Check className="size-4" strokeWidth={2.6} />
            </span>
            <h3 className="mt-4 text-base font-semibold text-white">{item.title}</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-gray-400">{item.desc}</p>
          </li>
        ))}
      </ul>
    </Section>
  )
}
