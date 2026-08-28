import { Check } from 'lucide-react'
import { about, aboutMedia } from '../data/content.js'
import Section, { GLASS } from './Section.jsx'
import MediaPanel from './MediaPanel.jsx'

export default function About() {
  return (
    <Section id="about" eyebrow={about.eyebrow} heading={about.heading}>
      <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          {about.body.map((p) => (
            <p key={p} className="mb-4 max-w-xl text-[0.95rem] leading-relaxed text-gray-400 last:mb-0">
              {p}
            </p>
          ))}
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {about.points.map((point) => (
              <li key={point} className="flex items-start gap-2.5 text-[13px] text-gray-300">
                <Check className="mt-0.5 size-4 shrink-0 text-blue-400" strokeWidth={2.6} />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Media slot — same swap contract as the tooth placeholders. The panel takes
            the shape of what it holds: 16:9 once footage is configured, otherwise the
            4:3 it has always been, so adding a clip never crops it. */}
        <div
          className={`${GLASS} grid place-items-center overflow-hidden ${
            aboutMedia.video ? 'aspect-video' : 'aspect-[4/3]'
          }`}
        >
          <MediaPanel
            video={aboutMedia.video}
            poster={aboutMedia.poster}
            label={aboutMedia.label}
            glow="from-blue-800/45"
          />
        </div>
      </div>
    </Section>
  )
}
