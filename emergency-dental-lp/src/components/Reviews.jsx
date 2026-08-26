import { Star, Quote } from 'lucide-react'
import { reviews, rating } from '../data/content.js'
import Section, { GLASS } from './Section.jsx'

export default function Reviews() {
  return (
    <Section
      id="reviews"
      eyebrow={reviews.eyebrow}
      heading={reviews.heading}
      action={
        <div className={`${GLASS} flex shrink-0 items-center gap-3 px-4 py-3`}>
          <span className="flex gap-0.5" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((i) => (
              <Star key={i} className="size-3.5 text-blue-400" fill="currentColor" strokeWidth={0} />
            ))}
          </span>
          <span className="text-[13px] text-gray-300">
            <span className="font-bold text-white">{rating.score}</span> · {rating.count}
          </span>
        </div>
      }
    >
      <ul className="mt-12 grid gap-5 lg:grid-cols-3">
        {reviews.items.map((r, i) => (
          <li key={i} className={`${GLASS} flex flex-col p-6`}>
            <Quote aria-hidden="true" className="size-6 text-blue-400/40" />
            <blockquote className="mt-4 flex-1 text-[14px] italic leading-relaxed text-gray-300">
              {r.quote}
            </blockquote>
            <footer className="mt-5 border-t border-white/10 pt-4">
              <p className="text-sm font-semibold text-white">{r.name}</p>
              <p className="mt-0.5 text-[12px] text-gray-400">{r.meta}</p>
            </footer>
          </li>
        ))}
      </ul>
    </Section>
  )
}
