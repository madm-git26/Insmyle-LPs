import { brand, footer, nav, emergencyNotice } from '../data/content.js'
import ToothMark from './ToothMark.jsx'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#050810]">
      <div className="mx-auto max-w-[1600px] px-6 py-12 lg:px-10 lg:py-16">
        {/* medical safety notice — deliberately first and full width */}
        <p
          role="note"
          className="rounded-2xl border border-amber-400/25 bg-amber-400/5 p-4 text-[13px] leading-relaxed text-amber-100/90"
        >
          <strong className="font-semibold text-amber-200">Life-threatening emergency?</strong>{' '}
          {emergencyNotice}
        </p>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-blue-400">
                <ToothMark className="size-6" />
              </span>
              <span className="leading-none">
                <span className="block text-sm font-bold text-white">{brand.name.toUpperCase()}</span>
                <span className="mt-1 block text-[11px] tracking-[0.18em] text-gray-400">
                  {brand.nameLine2.toUpperCase()}
                </span>
              </span>
            </span>
            <a
              href={brand.phoneHref}
              className="mt-6 inline-block text-lg font-bold text-white transition-colors hover:text-blue-400"
            >
              {brand.phone}
            </a>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {col.links.map((label) => {
                  const target = nav.find((n) => n.label === label)
                  return (
                    <li key={label}>
                      <a
                        href={target ? target.href : '#top'}
                        className="text-sm text-gray-300 transition-colors hover:text-white"
                      >
                        {label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="text-[11px] font-semibold tracking-[0.18em] text-gray-400 uppercase">Visit</h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-300">[CONFIRM: street address]</p>
            <p className="mt-1 text-sm leading-relaxed text-gray-300">[CONFIRM: city, state, ZIP]</p>
          </div>
        </div>

        <p className="mt-12 border-t border-white/10 pt-6 text-[12px] text-gray-400">
          © {new Date().getFullYear()} {footer.legal}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
