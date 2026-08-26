export default function EkgLine({ className = '' }) {
  return (
    <svg viewBox="0 0 120 32" aria-hidden="true" focusable="false" className={className} preserveAspectRatio="none">
      <defs>
        <linearGradient id="ekg-fade" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#60a5fa" stopOpacity=".2" />
          <stop offset=".25" stopColor="#93c5fd" stopOpacity="1" />
          <stop offset="1" stopColor="#60a5fa" stopOpacity=".45" />
        </linearGradient>
      </defs>
      <polyline
        points="0,20 14,20 20,20 26,8 32,28 38,14 44,20 58,20 66,20 72,11 78,25 84,20 120,20"
        fill="none"
        stroke="url(#ekg-fade)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}
