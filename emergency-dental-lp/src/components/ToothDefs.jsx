/**
 * Shared gradients and the molar silhouette, rendered once for the whole page.
 *
 * Every tooth slot references these by id, so the 13 instances don't each
 * duplicate a set of gradient definitions (and their ids) into the document.
 * Mounted once in App.jsx, before anything that uses it.
 */
export const TOOTH_VIEWBOX = '0 0 210 268'
export const TOOTH_PATH =
  'M40.0 64.0 C42.0 56.7 43.3 47.5 47.0 42.0 C50.7 36.5 56.8 31.0 62.0 31.0 C67.2 31.0 72.8 42.3 78.0 42.0 C83.2 41.7 88.0 29.3 93.0 29.0 C98.0 28.7 102.7 40.3 108.0 40.0 C113.3 39.7 118.8 27.8 125.0 27.0 C131.2 26.2 138.8 30.5 145.0 35.0 C151.2 39.5 157.5 45.5 162.0 54.0 C166.5 62.5 170.0 75.3 172.0 86.0 C174.0 96.7 174.5 107.7 174.0 118.0 C173.5 128.3 170.8 137.7 169.0 148.0 C167.2 158.3 165.0 169.5 163.0 180.0 C161.0 190.5 159.2 201.8 157.0 211.0 C154.8 220.2 153.3 233.3 150.0 235.0 C146.7 236.7 140.7 228.3 137.0 221.0 C133.3 213.7 131.2 200.0 128.0 191.0 C124.8 182.0 121.8 172.7 118.0 167.0 C114.2 161.3 109.3 156.7 105.0 157.0 C100.7 157.3 95.8 162.3 92.0 169.0 C88.2 175.7 85.3 187.7 82.0 197.0 C78.7 206.3 75.3 218.0 72.0 225.0 C68.7 232.0 65.3 240.7 62.0 239.0 C58.7 237.3 55.0 224.3 52.0 215.0 C49.0 205.7 46.3 193.7 44.0 183.0 C41.7 172.3 39.7 161.8 38.0 151.0 C36.3 140.2 34.5 128.8 34.0 118.0 C33.5 107.2 34.0 95.0 35.0 86.0 C36.0 77.0 38.0 71.3 40.0 64.0 Z'

export default function ToothDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" className="absolute">
      <defs>
        <linearGradient id="tth-body" x1="26" y1="24" x2="184" y2="248" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset=".28" stopColor="#f7fafd" />
          <stop offset=".56" stopColor="#e4eaf2" />
          <stop offset=".8" stopColor="#c8d1dd" />
          <stop offset="1" stopColor="#aab6c5" />
        </linearGradient>
        <linearGradient id="tth-shade" x1="112" y1="30" x2="196" y2="250" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#78869b" stopOpacity="0" />
          <stop offset="1" stopColor="#57657a" stopOpacity=".55" />
        </linearGradient>
        <linearGradient id="tth-rim" x1="170" y1="40" x2="40" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#dbeafe" stopOpacity=".9" />
          <stop offset=".5" stopColor="#60a5fa" stopOpacity=".55" />
          <stop offset="1" stopColor="#60a5fa" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="tth-spec" x1="0" y1="0" x2=".7" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="1" stopColor="#ffffff" stopOpacity=".08" />
        </linearGradient>
        <clipPath id="tth-clip">
          <path d={TOOTH_PATH} />
        </clipPath>
      </defs>
    </svg>
  )
}
