import { useState } from 'react'
import { TOOTH_PATH, TOOTH_VIEWBOX } from './ToothDefs.jsx'

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

function ToothGlyph() {
  return (
    <svg
      viewBox={TOOTH_VIEWBOX}
      aria-hidden="true"
      focusable="false"
      className="relative h-[80%] w-[80%]"
    >
      <path d={TOOTH_PATH} fill="url(#tth-body)" />
      <path d={TOOTH_PATH} fill="url(#tth-shade)" />
      <g clipPath="url(#tth-clip)">
        {/* occlusal fissures — kept faint so they read as surface, not linework */}
        <path d="M93 32 C96 62 97 94 96 124" fill="none" stroke="#b0bccb" strokeWidth="2.4"
              strokeLinecap="round" opacity=".34" />
        <path d="M125 30 C121 60 119 92 119 122" fill="none" stroke="#b0bccb" strokeWidth="2.2"
              strokeLinecap="round" opacity=".28" />
        {/* speculars: key light upper-left, weaker fill upper-right, root bounce */}
        <path d="M58 48 C66 34 78 36 78 50 C78 70 70 108 62 134 C56 154 46 148 47 128
                 C48 100 52 64 58 48 Z" fill="url(#tth-spec)" opacity=".95" />
        <path d="M142 42 C152 38 160 50 158 66 C156 86 149 108 144 120 C139 132 132 127 135 112
                 C139 90 137 50 142 42 Z" fill="url(#tth-spec)" opacity=".45" />
        <path d="M53 166 C58 194 54 220 50 232 C47 241 42 237 42 226 C42 206 47 182 53 166 Z"
              fill="url(#tth-spec)" opacity=".3" />
      </g>
      <path d={TOOTH_PATH} fill="none" stroke="url(#tth-rim)" strokeWidth="2.4"
            strokeLinejoin="round" clipPath="url(#tth-clip)" />
    </svg>
  )
}
