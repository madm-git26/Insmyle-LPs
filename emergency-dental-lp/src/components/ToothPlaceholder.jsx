import { useState } from 'react'

/**
 * A tooth slot.
 *
 * With no `src` (or if the image fails to load) it renders a glowing radial
 * gradient with a vector molar silhouette — so the page never shows a broken
 * image and still looks finished before real assets arrive.
 *
 * With a `src` it renders that image at exactly the same box size, so swapping
 * assets in causes no layout shift.
 *
 * Drop files into public/teeth/ and point at them from src/data/content.js.
 */
export default function ToothPlaceholder({
  src,
  alt = '',
  className = '',
  glow = 'from-blue-900/40',
  eager = false,
  showSilhouette = true,
}) {
  const [failed, setFailed] = useState(false)
  const useImage = src && !failed

  return (
    <div className={`relative grid place-items-center ${className}`}>
      <div
        aria-hidden="true"
        className={`absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${glow} via-transparent to-transparent`}
      />
      {useImage ? (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className="relative h-full w-full object-contain drop-shadow-[0_10px_40px_rgba(56,132,255,0.25)]"
        />
      ) : (
        showSilhouette && <ToothGlyph />
      )}
    </div>
  )
}

const CROWN_AND_ROOTS =
  'M100 14c-40 0-68 18-68 50 0 26 4 46 11 64 7 19 11 52 15 84 2 18 6 32 15 32 9 0 12-14 14-32 ' +
  '3-27 6-50 13-50s10 23 13 50c2 18 5 32 14 32 9 0 13-14 15-32 4-32 8-65 15-84 7-18 11-38 11-64 0-32-28-50-68-50Z'

function ToothGlyph() {
  return (
    <svg
      viewBox="0 0 200 260"
      aria-hidden="true"
      focusable="false"
      className="relative h-[78%] w-[78%]"
    >
      <defs>
        <linearGradient id="tp-body" x1="30" y1="10" x2="175" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f2f8ff" stopOpacity=".95" />
          <stop offset=".35" stopColor="#c8ddf5" stopOpacity=".75" />
          <stop offset=".7" stopColor="#5f86bd" stopOpacity=".45" />
          <stop offset="1" stopColor="#1b3564" stopOpacity=".35" />
        </linearGradient>
        <linearGradient id="tp-rim" x1="170" y1="30" x2="40" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#dbeafe" stopOpacity=".9" />
          <stop offset=".55" stopColor="#60a5fa" stopOpacity=".6" />
          <stop offset="1" stopColor="#60a5fa" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="tp-gloss" cx=".36" cy=".28" r=".7">
          <stop offset="0" stopColor="#fff" stopOpacity=".85" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".18" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g>
        <path d={CROWN_AND_ROOTS} fill="url(#tp-body)" />
        <path
          d="M46 58C54 40 74 30 100 30s46 10 54 28c-8 16-28 24-54 24s-46-8-54-24Z"
          fill="url(#tp-gloss)"
          opacity=".55"
        />
        <path d={CROWN_AND_ROOTS} fill="none" stroke="url(#tp-rim)" strokeWidth="2.2" strokeLinejoin="round" />
        <ellipse cx="74" cy="62" rx="17" ry="24" fill="url(#tp-gloss)" transform="rotate(-22 74 62)" />
      </g>
    </svg>
  )
}
