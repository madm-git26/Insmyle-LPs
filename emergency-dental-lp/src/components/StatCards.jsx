import { Heart } from 'lucide-react'
import { statCards } from '../data/content.js'
import EkgLine from './EkgLine.jsx'
import ProgressRing from './ProgressRing.jsx'

const CARD =
  'rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md ' +
  'shadow-[0_18px_40px_-24px_rgba(0,0,0,.9),inset_0_1px_0_rgba(255,255,255,.08)]'

const LABEL = 'text-[10px] font-semibold tracking-[0.16em] text-gray-400 uppercase'

export default function StatCards() {
  const { patientStatus, careQuality, emergency, patients } = statCards

  return (
    <div className="flex w-full flex-col gap-4">
      <div className={CARD}>
        <p className={LABEL}>{patientStatus.label}</p>
        <div className="mt-3 flex items-center gap-3">
          <EkgLine className="h-8 flex-1 text-blue-400" />
          <span className="flex items-center gap-1.5 whitespace-nowrap">
            <Heart className="size-3.5 text-blue-400" fill="currentColor" />
            <span className="text-xl font-bold leading-none text-white">{patientStatus.value}</span>
            <span className="self-end text-[10px] font-medium text-gray-400">{patientStatus.unit}</span>
          </span>
        </div>
      </div>

      <div className={CARD}>
        <p className={LABEL}>{careQuality.label}</p>
        <div className="mt-3 flex items-center gap-4">
          <ProgressRing value={careQuality.value} />
          <span>
            <span className="block text-2xl font-bold leading-none text-white">{careQuality.value}%</span>
            <span className="mt-1.5 block whitespace-pre-line text-[11px] leading-tight text-gray-400">
              {careQuality.caption}
            </span>
          </span>
        </div>
      </div>

      <div className={CARD}>
        <p className={LABEL}>{emergency.label}</p>
        <p className="mt-2 text-3xl font-bold leading-none text-blue-400">{emergency.value}</p>
        <p className="mt-2 whitespace-pre-line text-[11px] leading-tight text-gray-400">
          {emergency.caption}
        </p>
      </div>

      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-3 py-2.5 backdrop-blur-md">
        <span className="flex -space-x-2" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="size-7 rounded-full border-2 border-[#0b1120] bg-[radial-gradient(circle_at_35%_30%,#93c5fd,#1e3a8a)]"
            />
          ))}
        </span>
        <span className="leading-tight">
          <span className="block text-sm font-bold text-white">{patients.count}</span>
          <span className="block text-[11px] text-gray-400">{patients.caption}</span>
        </span>
      </div>
    </div>
  )
}
