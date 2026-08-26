import { ArrowRight } from 'lucide-react'
import { services } from '../data/content.js'
import ServiceCard from './ServiceCard.jsx'

export default function Services() {
  return (
    <section id="services" className="relative border-t border-white/5 py-16 lg:py-20">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-blue-400 uppercase">
              <span aria-hidden="true" className="inline-block h-3.5 w-0.5 bg-blue-400" />
              {services.eyebrow}
            </p>
            <h2 className="mt-4 max-w-xl text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[2rem]">
              {services.heading}
            </h2>
          </div>

          <a
            href="#services"
            className="inline-flex shrink-0 items-center gap-2.5 self-start rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10 sm:self-auto"
          >
            {services.cta}
            <ArrowRight className="size-4" strokeWidth={2.2} />
          </a>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {services.items.map((item) => (
            <ServiceCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  )
}
