import { Phone } from 'lucide-react'
import { brand, nav } from '../data/content.js'
import ToothMark from './ToothMark.jsx'

export default function Header() {
  return (
    <header className="relative z-30 w-full">
      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-4 sm:gap-6 sm:px-6 sm:py-5 lg:px-10 lg:py-6">
        <a href="#top" aria-label="Dental Emergency Care — home" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-blue-400 backdrop-blur-md">
            <ToothMark className="size-6" />
          </span>
          <span className="min-w-0 leading-none">
            <span className="block text-sm font-bold tracking-wide text-white">
              {brand.name.toUpperCase()}
            </span>
            <span className="mt-1 block text-[11px] font-medium tracking-[0.18em] text-gray-400">
              {brand.nameLine2.toUpperCase()}
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-8 xl:gap-10">
            {nav.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="text-sm text-gray-300 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={brand.phoneHref}
          className="ml-auto flex shrink-0 items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/10 px-3 py-2 text-[13px] font-semibold text-white shadow-[0_0_24px_-6px_rgba(96,165,250,.65)] backdrop-blur-md transition-colors hover:bg-blue-500/20 sm:gap-2.5 sm:px-4 sm:py-2.5 sm:text-sm lg:ml-0 lg:px-5 lg:py-3"
        >
          <span className="grid size-6 place-items-center rounded-full bg-blue-500 text-white">
            <Phone className="size-3.5" strokeWidth={2.5} />
          </span>
          <span className="whitespace-nowrap">{brand.phone}</span>
        </a>
      </div>
    </header>
  )
}
