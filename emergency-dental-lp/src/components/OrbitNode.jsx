import ToothPlaceholder from './ToothPlaceholder.jsx'

/**
 * One glass node on the orbit ring.
 *
 * Position comes from `angle` (degrees) and the ring radii, so the ring stays
 * even and the angles are all adjustable from data/content.js. The ellipse is
 * wider than it is tall, which is what makes the ring read as a disc lying flat.
 */
export default function OrbitNode({ label, angle, index }) {
  const rad = (angle * Math.PI) / 180
  const cos = Math.cos(rad)
  const sin = Math.sin(rad)

  // Nodes toward the viewer sit slightly larger and brighter.
  const depth = (1 + sin) / 2
  const scale = 0.86 + depth * 0.18
  const opacity = 0.72 + depth * 0.28

  return (
    <div
      className="absolute flex flex-col items-center"
      style={{
        // radii come from the container so they can shrink per breakpoint
        left: `calc(50% + var(--orx) * ${cos.toFixed(4)})`,
        top: `calc(50% + var(--ory) * ${sin.toFixed(4)})`,
        transform: `translate(-50%,-50%) scale(${scale.toFixed(3)})`,
        opacity,
      }}
    >
      <div
        className="grid size-[54px] place-items-center rounded-full border border-white/15 bg-white/5 shadow-[0_10px_30px_-12px_rgba(0,0,0,.9),inset_0_1px_0_rgba(255,255,255,.18)] backdrop-blur-md sm:size-[72px] lg:size-[86px]"
        style={{ animation: `float 6s ease-in-out ${index * -0.9}s infinite alternate` }}
      >
        <ToothPlaceholder className="size-[58%]" glow="from-blue-500/30" />
      </div>
      <span className="mt-2 whitespace-pre-line text-center text-[9px] font-medium leading-tight text-gray-300 [text-shadow:0_1px_6px_rgba(7,11,20,.95)] sm:mt-2.5 sm:text-[10px]">
        {label}
      </span>
    </div>
  )
}
