import { ArrowRight } from 'lucide-react'
import ToothPlaceholder from './ToothPlaceholder.jsx'

export default function ServiceCard({ title, desc, src }) {
  return (
    <article className="group relative flex min-h-[236px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-[0_20px_44px_-30px_rgba(0,0,0,.95),inset_0_1px_0_rgba(255,255,255,.07)] transition-colors hover:border-blue-400/30 hover:bg-white/[0.07]">
      {/* graphic bleeds off the card's right edge, as in the reference */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-6 top-1/2 h-[78%] w-[52%] -translate-y-1/2">
        <ToothPlaceholder className="size-full" src={src} glow="from-blue-700/35" />
      </div>

      <div className="relative pr-[45%]">
        <h3 className="whitespace-pre-line text-lg font-semibold leading-snug text-white">{title}</h3>
        <p className="mt-3 text-[13px] leading-relaxed text-gray-400">{desc}</p>
      </div>

      <a
        href="#services"
        className="relative mt-6 inline-flex items-center gap-2.5 text-[13px] font-medium text-gray-300 transition-colors hover:text-white"
      >
        Learn More
        <span className="grid size-7 place-items-center rounded-full border border-white/15 bg-white/5 transition-colors group-hover:border-blue-400/50 group-hover:bg-blue-500/20">
          <ArrowRight className="size-3.5" strokeWidth={2.2} />
        </span>
      </a>
    </article>
  )
}
