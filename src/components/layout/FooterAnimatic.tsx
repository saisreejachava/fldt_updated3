import type { ReactNode } from 'react'
import '../../styles/footer-animatic.css'

type Bld = { x: number; w: number; h: number; step?: boolean }

/** 2D skyline silhouette — neutral towers suggesting a riverfront CBD */
const SKYLINE: Bld[] = [
  { x: 14, w: 32, h: 48 },
  { x: 48, w: 38, h: 72 },
  { x: 88, w: 34, h: 58 },
  { x: 126, w: 46, h: 96, step: true },
  { x: 176, w: 30, h: 52 },
  { x: 208, w: 44, h: 88 },
  { x: 256, w: 36, h: 64 },
  { x: 296, w: 50, h: 104, step: true },
  { x: 350, w: 32, h: 54 },
  { x: 386, w: 42, h: 82 },
  { x: 432, w: 38, h: 70 },
  { x: 474, w: 34, h: 56 },
  { x: 512, w: 48, h: 92 },
  { x: 564, w: 30, h: 50 },
  { x: 598, w: 36, h: 74 },
  { x: 638, w: 34, h: 62 },
]

/** Horizontal shift so the skyline cluster sits on the right (viewBox 1200 wide) */
const SKYLINE_SHIFT = 520
const HORIZON = 178
const HIGHLIGHT_INDEX = 3

function windowsForBuilding(x: number, w: number, h: number, bi: number, topY?: number) {
  const pad = 3
  const cellW = 5
  const cellH = 5
  const gap = 1.5
  const cols = Math.max(1, Math.floor((w - pad * 2) / (cellW + gap)))
  const rows = Math.max(1, Math.floor((h - pad * 2) / (cellH + gap)))
  const blockTop = topY ?? HORIZON - h
  const nodes: ReactNode[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const wx = x + pad + c * (cellW + gap)
      const wy = blockTop + pad + r * (cellH + gap)
      const hash = (r * cols + c + bi * 7) % 11
      if (hash === 0 || hash === 5) {
        nodes.push(
          <rect
            key={`d-${r}-${c}`}
            x={wx}
            y={wy}
            width={cellW}
            height={cellH}
            rx={0.5}
            fill="#1a2333"
            opacity={0.88}
          />,
        )
        continue
      }
      const mod = (r + c + bi * 3) % 8
      const warm = hash % 4 === 1 ? '#f6f0e4' : hash % 4 === 2 ? '#e8d9a8' : '#c5b896'
      nodes.push(
        <rect
          key={`l-${r}-${c}`}
          className={`footer-animatic__win footer-animatic__win--${mod}`}
          x={wx}
          y={wy}
          width={cellW}
          height={cellH}
          rx={0.5}
          fill={warm}
        />,
      )
    }
  }
  return <g>{nodes}</g>
}

function SkylineBuilding(b: Bld & { bi: number; highlight?: boolean }) {
  const { x, w, h, step, bi, highlight } = b
  const baseY = HORIZON - h
  const fill = highlight ? '#3d4d62' : '#323c4e'
  return (
    <g className={highlight ? 'footer-animatic__build footer-animatic__build--hl' : 'footer-animatic__build'}>
      {highlight ? (
        <>
          <rect
            className="footer-animatic__hl-glow"
            x={x - 4}
            y={baseY - 4}
            width={w + 8}
            height={h + (step ? 22 : 0) + 8}
            rx={2}
            fill="rgba(34, 211, 238, 0.12)"
            stroke="none"
          />
          <rect
            className="footer-animatic__hl-stroke"
            x={x - 2}
            y={baseY - 2}
            width={w + 4}
            height={h + (step ? 18 : 0) + 4}
            rx={1}
            fill="none"
            stroke="#22d3ee"
            strokeWidth={1.6}
          />
        </>
      ) : null}
      <rect
        x={x}
        y={baseY}
        width={w}
        height={h}
        fill={fill}
        stroke="rgba(0,0,0,0.28)"
        strokeWidth={0.45}
      />
      {step ? (
        <rect
          x={x + w * 0.12}
          y={baseY - 14}
          width={w * 0.5}
          height={14}
          fill="#2a3444"
          stroke="rgba(0,0,0,0.22)"
          strokeWidth={0.35}
        />
      ) : null}
      {windowsForBuilding(x, w, h, bi)}
      {step ? windowsForBuilding(x + w * 0.12, w * 0.5, 12, bi + 20, baseY - 14) : null}
    </g>
  )
}

/** Simplified 2D truss bridge (foreground over water) */
function RiverBridge() {
  const x0 = 48
  const y0 = 272
  const x1 = 1120
  const y1 = 188
  const n = 14
  const topOff = -14
  const pts: { bx: number; by: number; tx: number; ty: number }[] = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const bx = x0 + t * (x1 - x0)
    const by = y0 + t * (y1 - y0)
    const tx = bx + (y1 - y0) * 0.04
    const ty = by + topOff
    pts.push({ bx, by, tx, ty })
  }
  const segs: ReactNode[] = []
  for (let i = 0; i < n; i++) {
    const a = pts[i]
    const b = pts[i + 1]
    segs.push(
      <path
        key={`w-${i}`}
        d={`M ${a.bx} ${a.by} L ${a.tx} ${a.ty} L ${b.tx} ${b.ty} L ${b.bx} ${b.by} Z`}
        fill="rgba(110, 122, 138, 0.22)"
        stroke="rgba(90, 102, 118, 0.55)"
        strokeWidth={0.5}
      />,
    )
    if (i % 2 === 0) {
      segs.push(
        <line
          key={`d-${i}`}
          x1={a.bx}
          y1={a.by}
          x2={b.tx}
          y2={b.ty}
          stroke="rgba(70, 82, 98, 0.65)"
          strokeWidth={0.65}
        />,
      )
    } else {
      segs.push(
        <line
          key={`d-${i}`}
          x1={a.tx}
          y1={a.ty}
          x2={b.bx}
          y2={b.by}
          stroke="rgba(70, 82, 98, 0.65)"
          strokeWidth={0.65}
        />,
      )
    }
  }
  return (
    <g className="footer-animatic__bridge" fill="none">
      <line
        x1={x0}
        y1={y0 + 4}
        x2={x1}
        y2={y1 + 4}
        stroke="#5c6a7c"
        strokeWidth={3.2}
        strokeLinecap="round"
      />
      {segs}
      <line
        x1={x0}
        y1={y0}
        x2={x1}
        y2={y1}
        stroke="#8a96a8"
        strokeWidth={2.2}
        strokeLinecap="round"
      />
    </g>
  )
}

/** Cyan “street mesh” + diagonals over the dense city (right side only) */
function SmartCityMesh() {
  const x0 = 508
  const x1 = 1195
  const yTop = 10
  const yBot = HORIZON + 6
  const diags: ReactNode[] = []
  let k = 0
  for (let x = x0 - 40; x < x1 + 80; x += 34) {
    diags.push(
      <line
        key={`mesh-d-${k}`}
        className={`footer-animatic__mesh-line footer-animatic__mesh-line--${k % 3}`}
        x1={x}
        y1={yBot}
        x2={x + 140}
        y2={yTop}
        stroke="#22d3ee"
        strokeWidth={0.55}
        opacity={0.38}
      />,
    )
    k++
  }
  const horiz: ReactNode[] = []
  for (let y = yTop; y < yBot; y += 22) {
    horiz.push(
      <line
        key={`mesh-h-${y}`}
        className={`footer-animatic__mesh-line footer-animatic__mesh-line--${(y / 22) % 3}`}
        x1={x0}
        y1={y}
        x2={x1}
        y2={y + 6}
        stroke="#06b6d4"
        strokeWidth={0.45}
        opacity={0.28}
      />,
    )
  }
  return (
    <g className="footer-animatic__mesh">
      <g clipPath="url(#fa-city-mesh-clip)">
        {diags}
        {horiz}
        <path
          className="footer-animatic__mesh-arc"
          fill="none"
          stroke="#22d3ee"
          strokeWidth={0.7}
          strokeDasharray="6 14"
          strokeLinecap="round"
          opacity={0.32}
          d="M 520 168 Q 720 120 920 150 T 1160 128"
        />
      </g>
    </g>
  )
}

function worldX(localX: number) {
  return SKYLINE_SHIFT + localX
}

/** Extra translucent “twin” volumes on towers (smart-city highlights) */
function TwinVoxels() {
  const idxs = [6, 10, 14]
  return (
    <g className="footer-animatic__voxels">
      {idxs.map((i) => {
        const b = SKYLINE[i]
        if (!b) {
          return null
        }
        const x = worldX(b.x)
        const baseY = HORIZON - b.h
        return (
          <rect
            key={`vx-${i}`}
            className="footer-animatic__voxel"
            x={x - 2}
            y={baseY + b.h * 0.08}
            width={b.w + 4}
            height={b.h * 0.78}
            rx={1.5}
            fill="rgba(34, 211, 238, 0.09)"
            stroke="#22d3ee"
            strokeWidth={0.9}
          />
        )
      })}
    </g>
  )
}

function DataChip({ wx, wy, delayClass = '' }: { wx: number; wy: number; delayClass?: string }) {
  return (
    <g transform={`translate(${wx},${wy})`}>
      <g className={['footer-animatic__data-chip', delayClass].filter(Boolean).join(' ')}>
        <rect x={0} y={0} width={15} height={15} rx={2.5} fill="rgba(6, 182, 212, 0.92)" />
        <path
          d="M4.5 11V6L7.5 4l3 2v5"
          fill="none"
          stroke="#f0f9ff"
          strokeWidth={1.05}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M4.5 11h6" stroke="#f0f9ff" strokeWidth={0.9} strokeLinecap="round" />
      </g>
    </g>
  )
}

/** Footer SVG: river-left, city-right, cyan mesh — no floating UI card. */
export function FooterAnimatic() {
  return (
    <div className="footer-animatic" aria-hidden>
      <svg
        className="footer-animatic__svg"
        viewBox="0 0 1200 320"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="fa-day-sky" x1="0" y1="0" x2="1" y2="0.25">
            <stop offset="0%" stopColor="#9cb9d4" />
            <stop offset="38%" stopColor="#c8dff0" />
            <stop offset="100%" stopColor="#e8f4fc" />
          </linearGradient>
          <linearGradient id="fa-atmosphere-left" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(4, 12, 28, 0.58)" />
            <stop offset="36%" stopColor="rgba(6, 18, 36, 0.22)" />
            <stop offset="72%" stopColor="rgba(8, 20, 40, 0)" />
          </linearGradient>
          <linearGradient id="fa-river" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0c1628" />
            <stop offset="55%" stopColor="#060d18" />
            <stop offset="100%" stopColor="#03060c" />
          </linearGradient>
          <linearGradient id="fa-water-left" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(0, 4, 12, 0.55)" />
            <stop offset="55%" stopColor="rgba(0, 4, 12, 0.12)" />
            <stop offset="100%" stopColor="rgba(0, 4, 12, 0)" />
          </linearGradient>
          <linearGradient id="fa-river-gleam" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
            <stop offset="45%" stopColor="rgba(34, 211, 238, 0.14)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
          </linearGradient>
          <radialGradient id="fa-sun-haze" cx="88%" cy="12%" r="45%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.5)" />
            <stop offset="40%" stopColor="rgba(255, 255, 255, 0.08)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>
          <mask id="fa-river-mask">
            <rect x="0" y={HORIZON} width="1200" height={320 - HORIZON} fill="white" />
          </mask>
          <clipPath id="fa-city-mesh-clip">
            <rect x="500" y="6" width="698" height="182" />
          </clipPath>
        </defs>

        <rect width="1200" height="320" fill="url(#fa-day-sky)" />
        <rect width="1200" height="200" fill="url(#fa-sun-haze)" />
        <rect width="1200" height={HORIZON} fill="url(#fa-atmosphere-left)" />

        <g className="footer-animatic__skyline" transform={`translate(${SKYLINE_SHIFT}, 0)`}>
          {SKYLINE.map((b, i) => (
            <SkylineBuilding key={`b-${b.x}-${i}`} {...b} bi={i} highlight={i === HIGHLIGHT_INDEX} />
          ))}
        </g>

        <TwinVoxels />
        <SmartCityMesh />

        {[5, 9, 13].map((i, j) => {
          const b = SKYLINE[i]
          const wx = worldX(b.x + b.w / 2) - 7.5
          const wy = HORIZON - b.h - 20
          const delayClass = j === 1 ? 'footer-animatic__data-chip--d1' : j === 2 ? 'footer-animatic__data-chip--d2' : ''
          return <DataChip key={`chip-${i}`} wx={wx} wy={wy} delayClass={delayClass} />
        })}

        <rect x="0" y={HORIZON} width="1200" height={320 - HORIZON} fill="url(#fa-river)" />
        <rect x="0" y={HORIZON} width="520" height={320 - HORIZON} fill="url(#fa-water-left)" />
        <line
          x1="0"
          y1={HORIZON}
          x2="1200"
          y2={HORIZON}
          stroke="rgba(34, 211, 238, 0.22)"
          strokeWidth={1.2}
        />

        <g className="footer-animatic__river" mask="url(#fa-river-mask)">
          <rect
            className="footer-animatic__river-shimmer"
            x="0"
            y={HORIZON}
            width="1200"
            height={320 - HORIZON}
            fill="url(#fa-river-gleam)"
            opacity={0.5}
          />
          <g className="footer-animatic__river-lines" fill="none" stroke="rgba(34,211,238,0.12)" strokeWidth="0.7">
            <path d="M -40 214 Q 160 208 360 214 T 760 212 T 1240 216" />
            <path d="M -80 232 Q 140 226 340 232 T 720 228 T 1280 234" />
            <path d="M -20 252 Q 200 246 400 252 T 800 248 T 1220 254" />
          </g>
        </g>

        <RiverBridge />

        <g className="footer-animatic__twin-nodes" fill="#22d3ee">
          <circle className="footer-animatic__twin-node" cx="148" cy="112" r="2.6" opacity={0.82} />
          <circle className="footer-animatic__twin-node" cx="268" cy="96" r="2.2" opacity={0.68} />
          <circle className="footer-animatic__twin-node" cx="412" cy="124" r="2.4" opacity={0.72} />
        </g>

      </svg>
    </div>
  )
}
