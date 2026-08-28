import { useEffect, useRef, useState } from 'react'
import ToothPlaceholder from './ToothPlaceholder.jsx'

/**
 * The About section's media slot.
 *
 * Same swap contract as the tooth artwork: give it a video and it plays; give it
 * nothing — or hand it a file that fails to load — and it falls back, first to the
 * poster still, then to the vector tooth. The page never shows a broken box.
 *
 * An autoplaying loop is precisely what `prefers-reduced-motion` exists to suppress,
 * and the global reduced-motion rule in `index.css` only neutralises CSS animation —
 * it has no effect on a `<video>`. So that case is handled explicitly here: the poster
 * frame is shown instead and the video is never fetched.
 */
export default function MediaPanel({ video, poster, label = '', glow = 'from-blue-800/45' }) {
  const [videoFailed, setVideoFailed] = useState(false)
  const [posterFailed, setPosterFailed] = useState(false)
  const [reduced, setReduced] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const showVideo = Boolean(video) && !videoFailed && !reduced
  const showPoster = Boolean(poster) && !posterFailed && !showVideo

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // React does not reliably reflect the `muted` attribute onto the property, and an
    // unmuted video is refused autoplay by every browser — so set it directly before
    // asking to play.
    el.muted = true
    const started = el.play?.()
    // Autoplay can still be refused (battery saver, data saver, iOS Low Power Mode).
    // That is not an error worth surfacing: the poster stays up, which is the
    // intended fallback, so swallow it rather than letting it reject unhandled.
    if (started && typeof started.catch === 'function') started.catch(() => {})
  }, [showVideo, video])

  // Decorative by default: the copy beside it already carries the meaning, so an empty
  // label keeps it out of the accessibility tree rather than announcing a filename.
  const a11y = label ? { 'aria-label': label, role: 'img' } : { 'aria-hidden': 'true' }

  if (showVideo) {
    return (
      <video
        ref={ref}
        className="size-full object-cover"
        src={video}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onError={() => setVideoFailed(true)}
        {...a11y}
      />
    )
  }

  if (showPoster) {
    return (
      <img
        className="size-full object-cover"
        src={poster}
        alt={label}
        loading="lazy"
        decoding="async"
        onError={() => setPosterFailed(true)}
        {...(label ? {} : { 'aria-hidden': 'true' })}
      />
    )
  }

  return <ToothPlaceholder className="size-[62%]" glow={glow} />
}
