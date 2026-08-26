/** Circular progress ring. `value` is 0-100. */
export default function ProgressRing({ value = 98, size = 56, stroke = 4 }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c - (Math.min(Math.max(value, 0), 100) / 100) * c

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" focusable="false" className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,.10)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#60a5fa"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <circle cx={size / 2} cy={size / 2} r={r * 0.52} fill="rgba(96,165,250,.10)" />
    </svg>
  )
}
