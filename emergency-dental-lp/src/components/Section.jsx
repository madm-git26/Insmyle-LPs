/** Shared section shell: consistent eyebrow, heading and rhythm across the page. */
export default function Section({ id, eyebrow, heading, intro, action, children, className = '' }) {
  const headingId = `${id}-heading`
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`relative border-t border-white/5 py-16 lg:py-20 ${className}`}
    >
      <div className="mx-auto max-w-[1600px] px-6 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] text-blue-400 uppercase">
              <span aria-hidden="true" className="inline-block h-3.5 w-0.5 bg-blue-400" />
              {eyebrow}
            </p>
            <h2
              id={headingId}
              className="mt-4 max-w-xl text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-[2rem]"
            >
              {heading}
            </h2>
            {intro && <p className="mt-4 max-w-lg text-[0.95rem] leading-relaxed text-gray-400">{intro}</p>}
          </div>
          {action}
        </div>
        {children}
      </div>
    </section>
  )
}

export const GLASS =
  'rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md ' +
  'shadow-[0_20px_44px_-30px_rgba(0,0,0,.95),inset_0_1px_0_rgba(255,255,255,.07)]'
