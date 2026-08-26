import { Phone, Calendar, Star } from 'lucide-react'
import { brand, hero, features, rating, orbitNodes, heroTooth } from '../data/content.js'
import OrbitNode from './OrbitNode.jsx'
import ToothPlaceholder from './ToothPlaceholder.jsx'
import StatCards from './StatCards.jsx'

export default function Hero() {
  return (
    <section id="top" className="relative">
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-6 pb-16 pt-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,1.15fr)_minmax(0,0.6fr)] lg:gap-8 lg:px-10 lg:pb-24 xl:gap-10">
        {/* ---- copy ---- */}
        <div className="order-1">
          <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-blue-400 uppercase">
            <span aria-hidden="true" className="inline-block h-3.5 w-0.5 bg-blue-400" />
            {hero.eyebrow}
          </p>

          <h1 className="mt-5 text-[2.4rem] font-bold leading-[1.08] tracking-tight sm:text-5xl xl:text-[3.4rem] 2xl:text-6xl">
            {hero.headline.map((line) => (
              <span
                key={line.text}
                className={`block ${line.accent ? 'text-blue-400' : 'text-white'}`}
              >
                {line.text}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-gray-400">{hero.body}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={brand.phoneHref}
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-8px_rgba(37,99,235,.9)] transition-colors hover:bg-blue-500"
            >
              <Phone className="size-4" strokeWidth={2.4} />
              {hero.primaryCta}
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/10"
            >
              <Calendar className="size-4" strokeWidth={2.2} />
              {hero.secondaryCta}
            </a>
          </div>

          <ul className="mt-10 grid max-w-md grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
            {features.map(({ icon: Icon, title, sub }) => (
              <li key={title} className="flex items-center gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md">
                  <Icon className="size-4" strokeWidth={2.2} />
                </span>
                <span className="leading-tight">
                  <span className="block text-[13px] font-semibold text-white">{title}</span>
                  <span className="block text-[11px] text-gray-400">{sub}</span>
                </span>
              </li>
            ))}

            <li className="flex items-center gap-3">
              <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-[11px] font-bold text-white backdrop-blur-md">
                {rating.score}
              </span>
              <span className="leading-tight">
                <span className="flex gap-0.5" aria-hidden="true">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star
                      key={i}
                      className={`size-3 ${i < 4 ? 'text-blue-400' : 'text-gray-600'}`}
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </span>
                <span className="mt-1 block text-[11px] text-gray-400">{rating.count}</span>
              </span>
            </li>
          </ul>
        </div>

        {/* ---- orbit visual ---- */}
        <div aria-hidden="true" className="order-3 lg:order-2">
          <div className="relative mx-auto aspect-square w-full max-w-[320px] [--orx:33%] [--ory:29%] sm:max-w-[440px] sm:[--orx:41%] sm:[--ory:32%] lg:max-w-[560px] lg:[--orx:46%] lg:[--ory:34%]">
            {/* holographic platform */}
            <div className="pointer-events-none absolute inset-x-[8%] bottom-[10%] h-[38%]">
              <div className="absolute inset-0 rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,.35),rgba(59,130,246,.10)_42%,transparent_70%)]" />
              <div className="absolute inset-[14%] rounded-[50%] border border-blue-400/30" />
              <div className="absolute inset-[26%] rounded-[50%] border border-blue-400/20" />
              <div
                className="absolute inset-[4%] rounded-[50%] border border-dashed border-blue-400/20"
                style={{ animation: 'spin 48s linear infinite' }}
              />
            </div>

            {/* connector web */}
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
              className="pointer-events-none absolute inset-0 size-full"
            >
              {orbitNodes.map(({ angle }, i) => {
                const rad = (angle * Math.PI) / 180
                return (
                  <line
                    key={i}
                    x1="50"
                    y1="50"
                    x2={(50 + Math.cos(rad) * 40).toFixed(2)}
                    y2={(50 + Math.sin(rad) * 31).toFixed(2)}
                    stroke="rgba(96,165,250,.34)"
                    strokeWidth="0.3"
                    vectorEffect="non-scaling-stroke"
                  />
                )
              })}
            </svg>

            {/* central tooth */}
            <div className="absolute left-1/2 top-1/2 size-[56%] -translate-x-1/2 -translate-y-1/2">
              <ToothPlaceholder className="size-full" glow="from-blue-800/50" src={heroTooth.src} eager />
            </div>

            {orbitNodes.map((node, i) => (
              <OrbitNode key={node.label} {...node} index={i} />
            ))}
          </div>
        </div>

        {/* ---- status cards ---- */}
        <div className="order-2 lg:order-3">
          <StatCards />
        </div>
      </div>
    </section>
  )
}
