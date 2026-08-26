import { useEffect, useState } from 'react'
import { Phone, Menu, X } from 'lucide-react'
import { brand, nav } from '../data/content.js'
import ToothMark from './ToothMark.jsx'
import useActiveSection from '../hooks/useActiveSection.js'

const IDS = nav.map((n) => n.href.slice(1))

export default function Header() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(IDS)

  // lock scroll and allow Escape to close (§1 escape-routes)
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#070b14]/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center gap-3 px-4 py-4 sm:gap-6 sm:px-6 sm:py-5 lg:px-10 lg:py-6">
        <a
          href="#top"
          aria-label="Dental Emergency Care — home"
          className="flex min-w-0 items-center gap-2.5 sm:gap-3"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-blue-400 backdrop-blur-md">
            <ToothMark className="size-6" />
          </span>
          <span className="min-w-0 leading-none">
            <span className="block text-sm font-bold tracking-wide text-white">
              {brand.name.toUpperCase()}
            </span>
            <span className="mt-1 block truncate text-[11px] font-medium tracking-[0.18em] text-gray-400">
              {brand.nameLine2.toUpperCase()}
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden flex-1 justify-center lg:flex">
          <ul className="flex items-center gap-8 xl:gap-10">
            {nav.map((item) => {
              const current = active === item.href.slice(1)
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    aria-current={current ? 'true' : undefined}
                    className={`relative py-1 text-sm transition-colors ${
                      current ? 'font-medium text-white' : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-blue-400 transition-transform duration-200 ${
                        current ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              )
            })}
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

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-white backdrop-blur-md lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* mobile nav — the page had no navigation at all below lg before this */}
      <nav
        id="mobile-nav"
        aria-label="Primary"
        hidden={!open}
        className="border-t border-white/10 bg-[#070b14]/95 backdrop-blur-md lg:hidden"
      >
        <ul className="mx-auto max-w-[1600px] px-4 py-3 sm:px-6">
          {nav.map((item) => {
            const current = active === item.href.slice(1)
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={current ? 'true' : undefined}
                  className={`flex min-h-[48px] items-center rounded-lg px-3 text-[15px] transition-colors ${
                    current ? 'bg-white/5 font-medium text-white' : 'text-gray-300'
                  }`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
