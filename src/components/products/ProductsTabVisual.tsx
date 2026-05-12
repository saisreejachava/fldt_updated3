import { useId } from 'react'

type Tab = 'Platforms' | 'Tools' | 'Interfaces'

type Props = { tab: Tab; className?: string }

type ToolsGlassTone = 'blue' | 'green' | 'red' | 'orange' | 'purple'

const TOOLS_LINE: Record<ToolsGlassTone, string> = {
  blue: '#38bdf8',
  green: '#4ade80',
  red: '#f87171',
  orange: '#fb923c',
  purple: '#c084fc',
}

function toolsFiberSpoke(pathD: string, tint: string, blurId: string, prefix: string) {
  const strands: [number, number][] = [
    [0, 0],
    [1.35, -0.95],
    [-1.2, -0.75],
    [0.95, 1.1],
    [-0.88, 0.92],
  ]
  return (
    <g key={prefix}>
      <g opacity="0.42" filter={`url(#${blurId})`}>
        <path d={pathD} fill="none" stroke={tint} strokeWidth="7" strokeLinecap="round" />
      </g>
      <g className="products-tab-visual__data-flow">
        {strands.map(([ox, oy], i) => (
          <g key={`${prefix}-s-${i}`} transform={`translate(${ox},${oy})`}>
            <path
              d={pathD}
              fill="none"
              stroke={tint}
              strokeWidth={i === 0 ? 1.1 : 0.45}
              strokeLinecap="round"
              opacity={0.35 + i * 0.11}
              strokeDasharray="6 10"
            />
          </g>
        ))}
      </g>
    </g>
  )
}

function platformsFiberBundle(pathD: string, tint: string, blurId: string, prefix: string) {
  const strands: [number, number][] = [
    [0, 0],
    [1.6, -1.1],
    [-1.35, -0.9],
    [1.05, 1.15],
    [-0.95, 1],
  ]
  return (
    <g key={prefix}>
      <g opacity="0.38" filter={`url(#${blurId})`}>
        <path d={pathD} fill="none" stroke={tint} strokeWidth="6.5" strokeLinecap="round" />
      </g>
      <g className="products-tab-visual__data-flow">
        {strands.map(([ox, oy], i) => (
          <g key={`${prefix}-s-${i}`} transform={`translate(${ox},${oy})`}>
            <path
              d={pathD}
              fill="none"
              stroke={tint}
              strokeWidth={i === 0 ? 1 : 0.42}
              strokeLinecap="round"
              opacity={0.28 + i * 0.12}
              strokeDasharray="5 11"
            />
          </g>
        ))}
      </g>
    </g>
  )
}

function platformsIsoNode(
  id: string,
  x: number,
  y: number,
  tint: string,
  label: string,
  caption: string,
) {
  return (
    <g key={id} transform={`translate(${x},${y})`} className="products-tab-visual__platforms-node">
      <ellipse cx="0" cy="22" rx="22" ry="5.5" fill="rgba(0,0,0,0.35)" opacity="0.65" />
      <path
        d="M-16,6 L0,-6 L16,6 L0,18 Z"
        fill="rgba(15,23,42,0.75)"
        stroke={tint}
        strokeWidth="0.55"
        opacity="0.95"
      />
      <path
        d="M-16,6 L0,-6 L0,6 L-16,18 Z"
        fill="rgba(30,41,59,0.8)"
        stroke={tint}
        strokeWidth="0.35"
        opacity="0.78"
      />
      <path
        d="M0,-6 L16,6 L0,18 L0,6 Z"
        fill="rgba(51,65,85,0.55)"
        stroke={tint}
        strokeWidth="0.35"
        opacity="0.72"
      />
      <circle cx="0" cy="6" r="3.2" fill={`${tint}`} opacity="0.35" />
      <text
        x="0"
        y="-13"
        textAnchor="middle"
        fill="rgba(248,250,252,0.92)"
        fontSize="5"
        fontWeight="700"
        letterSpacing="0.08em"
        fontFamily="Inter, system-ui, sans-serif"
      >
        {label}
      </text>
      <text
        x="0"
        y="31"
        textAnchor="middle"
        fill="rgba(148,163,184,0.55)"
        fontSize="4"
        fontFamily="Inter, system-ui, sans-serif"
      >
        {caption}
      </text>
    </g>
  )
}

function toolsGlassSatellite(
  id: string,
  x: number,
  y: number,
  opts: {
    tone: ToolsGlassTone
    title: string
    status: string
    kind: 'line' | 'bars' | 'bars3' | 'shield' | 'route'
  },
) {
  const c = TOOLS_LINE[opts.tone]
  return (
    <g key={id} transform={`translate(${x},${y})`}>
      <ellipse cx="0" cy="30" rx="30" ry="7" fill="rgba(0,0,0,0.42)" opacity="0.55" />
      <rect
        x="-27"
        y="-20"
        width="54"
        height="48"
        rx="8"
        fill="rgba(255,255,255,0.035)"
        stroke="rgba(255,255,255,0.34)"
        strokeWidth="0.65"
      />
      <rect
        x="-25"
        y="-18"
        width="50"
        height="20"
        rx="5"
        fill="rgba(15,23,42,0.55)"
        stroke={c}
        strokeWidth="0.5"
        opacity="0.9"
      />
      {opts.kind === 'line' && (
        <path
          d="M-20 4 Q-12 0 -4 8 L4 -2 L12 4 L20 -4"
          fill="none"
          stroke={c}
          strokeWidth="0.85"
          strokeLinecap="round"
          opacity="0.92"
        />
      )}
      {opts.kind === 'bars' && (
        <g opacity="0.9">
          <rect x="-16" y="-1" width="3.5" height="8" rx="0.5" fill={c} opacity="0.45" />
          <rect x="-10" y="-5" width="3.5" height="12" rx="0.5" fill={c} opacity="0.7" />
          <rect x="-4" y="-3" width="3.5" height="10" rx="0.5" fill={c} />
        </g>
      )}
      {opts.kind === 'bars3' && (
        <g opacity="0.88" transform="translate(-6, -2)">
          <rect x="0" y="4" width="3" height="8" rx="0.5" fill={c} />
          <rect x="5" y="1" width="3" height="11" rx="0.5" fill={c} opacity="0.85" />
          <rect x="10" y="3" width="3" height="9" rx="0.5" fill={c} opacity="0.65" />
          <rect x="15" y="-1" width="3" height="13" rx="0.5" fill={c} opacity="0.9" />
        </g>
      )}
      {opts.kind === 'shield' && (
        <path
          d="M-7 -2 L0 -8 L7 -2 V4 Q0 9 -7 4 Z"
          fill="rgba(248,250,252,0.06)"
          stroke={c}
          strokeWidth="0.55"
          opacity="0.95"
        />
      )}
      {opts.kind === 'route' && (
        <path
          d="M-18 8 L-8 2 L4 8 L18 0"
          fill="none"
          stroke={c}
          strokeWidth="0.78"
          strokeLinecap="round"
          opacity="0.88"
        />
      )}
      <text
        x="0"
        y="18"
        textAnchor="middle"
        fill="rgba(248,250,252,0.9)"
        fontSize="5.5"
        fontWeight="700"
        letterSpacing="0.06em"
        fontFamily="Inter, system-ui, sans-serif"
      >
        {opts.title}
      </text>
      <text
        x="0"
        y="26"
        textAnchor="middle"
        fill="rgba(203,213,225,0.52)"
        fontSize="4.5"
        fontFamily="Inter, system-ui, sans-serif"
      >
        {opts.status}
      </text>
    </g>
  )
}

type InterfaceModeKind = 'desktop' | 'web' | 'phone' | 'ar' | 'vr'

function interfacesModeArt(kind: InterfaceModeKind, pw: number, stripH: number) {
  const ty = 34
  const iw = pw - 7
  const h = stripH - ty - 10

  if (kind === 'desktop') {
    return (
      <g transform={`translate(3, ${ty})`}>
        <rect x="1" y="0" width="17" height="11" rx="1" fill="rgba(15,23,42,0.92)" stroke="#38bdf8" strokeWidth="0.35" />
        <rect x="20" y="2" width="18" height="13" rx="1" fill="rgba(15,23,42,0.95)" stroke="#22d3ee" strokeWidth="0.35" />
        <rect x="4" y="14" width="14" height="9" rx="0.8" fill="rgba(15,23,42,0.88)" stroke="#64748b" strokeWidth="0.3" />
        <rect x="20" y="16" width="16" height="10" rx="0.8" fill="rgba(15,23,42,0.9)" stroke="#64748b" strokeWidth="0.3" />
        <path
          d={`M4 ${Math.min(38, h - 8)} L9 32 L14 34 L22 28 L28 30 L${iw - 2} 26`}
          fill="none"
          stroke="#fb923c"
          strokeWidth="0.65"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.9"
        />
        <g fill="#22d3ee" opacity="0.65">
          <rect x="6" y="44" width="1.2" height="4" rx="0.3" />
          <rect x="10" y="42" width="1.2" height="6" rx="0.3" />
          <rect x="14" y="45" width="1.2" height="3" rx="0.3" />
        </g>
        <rect x="4" y={h - 2} width={iw - 4} height="3" rx="0.5" fill="rgba(30,41,59,0.7)" stroke="rgba(148,163,184,0.35)" strokeWidth="0.3" />
      </g>
    )
  }

  if (kind === 'web') {
    return (
      <g transform={`translate(3, ${ty})`}>
        <rect x="0" y="4" width={iw} height={h * 0.42} rx="2" fill="rgba(30,41,59,0.55)" stroke="rgba(148,163,184,0.4)" strokeWidth="0.4" />
        <rect x="2" y="6" width="7" height={h * 0.42 - 4} rx="0.8" fill="rgba(15,23,42,0.85)" />
        <rect x="11" y="7" width={iw - 14} height={h * 0.42 - 6} rx="1" fill="rgba(248,250,252,0.94)" />
        <line x1="13" y1="11" x2={iw - 4} y2="11" stroke="rgba(15,23,42,0.35)" strokeWidth="0.35" />
        <line x1="13" y1="15" x2={iw - 8} y2="15" stroke="rgba(15,23,42,0.22)" strokeWidth="0.35" />
        <line x1="13" y1="19" x2={iw - 12} y2="19" stroke="rgba(15,23,42,0.18)" strokeWidth="0.35" />
        <rect x="13" y="22" width="5" height="3" rx="0.6" fill="#22c55e" opacity="0.85" />
        <rect x="20" y="22" width="5" height="3" rx="0.6" fill="#ef4444" opacity="0.8" />
        <circle cx={iw - 5} cy="10" r="1.2" fill="rgba(15,23,42,0.35)" />
      </g>
    )
  }

  if (kind === 'phone') {
    return (
      <g transform={`translate(3, ${ty})`}>
        <g opacity="0.35" fill="none" strokeWidth="0.65" strokeLinecap="round" className="products-tab-visual__interfaces-dataflow">
          <path
            d={`M-4 ${h * 0.35} C 12 8, ${iw - 8} ${h * 0.55}, ${iw + 6} 12`}
            stroke="#38bdf8"
            strokeDasharray="4 6"
          />
          <path
            d={`M${iw + 2} ${h * 0.5} C ${iw - 10} 20, 8 ${h * 0.3}, -2 ${h * 0.65}`}
            stroke="#fb923c"
            strokeDasharray="4 6"
          />
        </g>
        <rect
          x={iw * 0.14}
          y="6"
          width={iw * 0.72}
          height={h * 0.78}
          rx="4"
          fill="rgba(15,23,42,0.92)"
          stroke="rgba(56,189,248,0.45)"
          strokeWidth="0.45"
        />
        <rect
          x={iw * 0.18}
          y="10"
          width={iw * 0.64}
          height={h * 0.68}
          rx="2.5"
          fill="rgba(2,6,23,0.75)"
        />
        <text
          x={iw / 2}
          y="17"
          textAnchor="middle"
          fill="rgba(226,232,240,0.75)"
          fontSize="3.5"
          fontWeight="700"
          letterSpacing="0.08em"
          fontFamily="Inter, system-ui, sans-serif"
        >
          DataSync
        </text>
        <rect x={iw * 0.22} y="22" width={iw * 0.5} height="10" rx="2" fill="rgba(51,65,85,0.55)" stroke="rgba(100,116,139,0.35)" strokeWidth="0.3" />
        <rect x={iw * 0.26} y="36" width={iw * 0.42} height="12" rx="2" fill="rgba(56,189,248,0.15)" stroke="rgba(34,211,238,0.35)" strokeWidth="0.35" />
        <rect x={iw * 0.22} y="52" width={iw * 0.38} height="9" rx="2" fill="rgba(16,185,129,0.12)" stroke="rgba(52,211,153,0.28)" strokeWidth="0.3" />
        <rect x={iw * 0.2} y={h * 0.58} width={iw * 0.6} height="8" rx="2" fill="#14b8a6" opacity="0.88" />
        <text
          x={iw / 2}
          y={h * 0.58 + 5.5}
          textAnchor="middle"
          fill="#042f2e"
          fontSize="3.8"
          fontWeight="800"
          letterSpacing="0.06em"
          fontFamily="Inter, system-ui, sans-serif"
        >
          Approve
        </text>
      </g>
    )
  }

  if (kind === 'ar') {
    return (
      <g transform={`translate(3, ${ty})`}>
        <rect x="8" y="8" width="4" height={h * 0.45} rx="0.5" fill="#eab308" opacity="0.75" />
        <rect x="4" y={8 + h * 0.35} width="14" height="3" rx="0.5" fill="#ca8a04" opacity="0.7" transform="rotate(-12 11 12)" />
        <circle cx="22" cy={h * 0.52} r="3" fill="rgba(148,163,184,0.35)" />
        <path d={`M22 ${h * 0.52 + 3} L22 ${h * 0.74}`} stroke="rgba(148,163,184,0.35)" strokeWidth="0.8" strokeLinecap="round" />
        <rect x="4" y="4" width={iw - 8} height="14" rx="1.5" fill="rgba(56,189,248,0.1)" stroke="rgba(56,189,248,0.45)" strokeWidth="0.4" opacity="0.85" className="products-tab-visual__interfaces-hud-b" />
        <path d={`M${iw * 0.45} 18 L${iw * 0.55} ${28}`} stroke="rgba(125,211,252,0.5)" strokeWidth="0.4" strokeDasharray="2 1" />
        <text x={iw * 0.5} y="28" textAnchor="middle" fill="#7dd3fc" fontSize="4" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
          92%
        </text>
        <rect x="2" y={h * 0.62} width={iw - 4} height="10" rx="1" fill="none" stroke="rgba(56,189,248,0.25)" strokeWidth="0.35" opacity="0.7" />
      </g>
    )
  }

  return (
    <g transform={`translate(3, ${ty})`}>
      <ellipse cx={iw * 0.5} cy={h * 0.72} rx={iw * 0.4} ry="6" fill="none" stroke="rgba(100,116,139,0.35)" strokeWidth="0.45" />
      <circle cx={iw * 0.32} cy={h * 0.42} r="2.2" fill="rgba(129,140,248,0.5)" />
      <circle cx={iw * 0.5} cy={h * 0.38} r="2.2" fill="rgba(129,140,248,0.5)" />
      <circle cx={iw * 0.68} cy={h * 0.4} r="2.2" fill="rgba(129,140,248,0.5)" />
      <path
        d={`M${iw * 0.25} ${h * 0.55} L${iw * 0.42} ${h * 0.25} L${iw * 0.58} ${h * 0.28} L${iw * 0.75} ${h * 0.52}`}
        fill="none"
        stroke="rgba(34,211,238,0.55)"
        strokeWidth="0.55"
      />
      <g fill="rgba(34,211,238,0.25)" stroke="rgba(34,211,238,0.45)" strokeWidth="0.35">
        <rect x={iw * 0.35} y={h * 0.48} width="4" height="14" />
        <rect x={iw * 0.44} y={h * 0.44} width="4" height="18" />
        <rect x={iw * 0.53} y={h * 0.5} width="4" height="12" />
      </g>
      <rect x="2" y="6" width="12" height="8" rx="1" fill="rgba(15,23,42,0.35)" stroke="rgba(165,180,252,0.35)" strokeWidth="0.35" opacity="0.8" />
      <rect x={iw - 14} y="10" width="12" height="7" rx="1" fill="rgba(15,23,42,0.35)" stroke="rgba(165,180,252,0.35)" strokeWidth="0.35" opacity="0.75" />
    </g>
  )
}

/**
 * Products tab art: Platforms procedural mesh, Tools glass network, Interfaces usage-mode strip.
 */
export function ProductsTabVisual({ tab, className }: Props) {
  const raw = useId().replace(/[^a-zA-Z0-9]/g, '')
  const cn = [
    'products-tab-visual',
    tab === 'Platforms' && 'products-tab-visual--platforms',
    tab === 'Tools' && 'products-tab-visual--tools',
    tab === 'Interfaces' && 'products-tab-visual--interfaces',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (tab === 'Platforms') {
    const clip = `pp-clip-${raw}`
    const vignette = `pp-vig-${raw}`
    const mesh = `pp-mesh-${raw}`
    const frameStroke = `pp-frame-${raw}`
    const towerFace = `pp-tower-${raw}`
    const towerAccent = `pp-tower-ac-${raw}`
    const coreGlow = `pp-core-${raw}`
    const beamGrad = `pp-beam-${raw}`
    const fiberBlur = `pp-fiber-blur-${raw}`
    const hx = 158
    const hy = 156
    const hubAttachX = hx
    const hubAttachY = hy - 38

    const fibers = [
      { d: `M${hubAttachX} ${hubAttachY} C 120 96 88 88 74 98`, tint: '#22d3ee', id: 'pf1' },
      { d: `M${hubAttachX} ${hubAttachY} C ${hx} 96 ${hx} 78 ${hx} 64`, tint: '#4ade80', id: 'pf2' },
      { d: `M${hubAttachX} ${hubAttachY} C 210 98 244 104 258 118`, tint: '#38bdf8', id: 'pf3' },
      { d: `M${hubAttachX} ${hubAttachY} C 224 168 238 200 246 222`, tint: '#2dd4bf', id: 'pf4' },
      { d: `M${hubAttachX} ${hubAttachY} C 118 188 96 212 86 228`, tint: '#a78bfa', id: 'pf5' },
    ]

    const satellites = [
      platformsIsoNode('pn1', 74, 98, '#22d3ee', 'ANALYTICS', 'Observability'),
      platformsIsoNode('pn2', 158, 64, '#4ade80', 'PRODUCT', 'Living surface'),
      platformsIsoNode('pn3', 258, 118, '#38bdf8', 'DASHBOARD', 'Control plane'),
      platformsIsoNode('pn4', 246, 222, '#2dd4bf', 'DEPLOY', 'Runtime mesh'),
      platformsIsoNode('pn5', 86, 228, '#a78bfa', 'SECURITY', 'Trust layer'),
    ]

    return (
      <svg className={cn} viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <clipPath id={clip}>
            <rect x="2" y="2" width="316" height="278" rx="11" ry="11" />
          </clipPath>
          <filter id={fiberBlur} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.4" />
          </filter>
          <linearGradient id={towerFace} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(15,23,42,0.95)" />
            <stop offset="100%" stopColor="rgba(30,41,59,0.88)" />
          </linearGradient>
          <linearGradient id={towerAccent} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.22)" />
            <stop offset="50%" stopColor="rgba(16,185,129,0.12)" />
            <stop offset="100%" stopColor="rgba(56,189,248,0.18)" />
          </linearGradient>
          <radialGradient id={coreGlow} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(52,211,153,0.55)" />
            <stop offset="45%" stopColor="rgba(34,211,238,0.22)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <linearGradient id={beamGrad} x1="50%" y1="100%" x2="50%" y2="0%">
            <stop offset="0%" stopColor="rgba(167,243,208,0)" />
            <stop offset="40%" stopColor="rgba(110,231,183,0.35)" />
            <stop offset="100%" stopColor="rgba(240,253,250,0.75)" />
          </linearGradient>
          <linearGradient id={vignette} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(2,6,14,0.52)" />
            <stop offset="14%" stopColor="rgba(2,6,14,0)" />
            <stop offset="80%" stopColor="rgba(2,6,14,0)" />
            <stop offset="100%" stopColor="rgba(1,3,8,0.68)" />
          </linearGradient>
          <radialGradient id={mesh} cx="50%" cy="46%" r="65%">
            <stop offset="0%" stopColor="rgba(34,211,238,0.11)" />
            <stop offset="50%" stopColor="rgba(16,185,129,0.05)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <linearGradient id={frameStroke} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(52,211,153,0.45)" />
            <stop offset="50%" stopColor="rgba(56,189,248,0.4)" />
            <stop offset="100%" stopColor="rgba(45,212,191,0.45)" />
          </linearGradient>
        </defs>

        <rect width="320" height="320" fill="#010408" />

        <g clipPath={`url(#${clip})`}>
          <g opacity="0.09" stroke="rgba(34,211,238,0.5)" strokeWidth="0.35">
            {Array.from({ length: 11 }, (_, i) => (
              <line key={`pg-${i}`} x1={24 + i * 28} y1="52" x2={38 + i * 26} y2="248" />
            ))}
          </g>

          {fibers.map((f) => platformsFiberBundle(f.d, f.tint, fiberBlur, f.id))}

          <ellipse cx={hx} cy={hy + 42} rx="62" ry="14" fill="rgba(34,211,238,0.06)" />
          <path
            d={`M${hx - 52} ${hy + 36} L${hx} ${hy + 18} L${hx + 52} ${hy + 36} L${hx} ${hy + 54} Z`}
            fill="rgba(15,23,42,0.92)"
            stroke="rgba(45,212,191,0.35)"
            strokeWidth="0.6"
          />

          <g className="products-tab-visual__platforms-hub">
            <path
              d={`M${hx - 36} ${hy - 8} L${hx + 2} ${hy - 26} L${hx + 38} ${hy - 8} L${hx + 38} ${hy + 14} L${hx - 36} ${hy + 14} Z`}
              fill={`url(#${towerFace})`}
              stroke="rgba(148,163,184,0.25)"
              strokeWidth="0.55"
            />
            <path
              d={`M${hx - 36} ${hy - 8} L${hx + 2} ${hy - 26} L${hx + 38} ${hy - 8} L${hx + 2} ${hy + 10} Z`}
              fill={`url(#${towerAccent})`}
              opacity="0.85"
            />
            <rect
              x={hx - 22}
              y={hy - 52}
              width="44"
              height="40"
              rx="5"
              fill="rgba(15,23,42,0.94)"
              stroke="rgba(56,189,248,0.4)"
              strokeWidth="0.55"
            />
            <rect
              x={hx - 18}
              y={hy - 48}
              width="36"
              height="14"
              rx="3"
              fill="rgba(2,6,23,0.75)"
              stroke="rgba(34,211,238,0.35)"
              strokeWidth="0.45"
            />
            <text
              x={hx - 2}
              y={hy - 38}
              fill="rgba(226,232,240,0.5)"
              fontSize="4.5"
              fontWeight="700"
              letterSpacing="0.28em"
              fontFamily="ui-monospace, monospace"
            >
              FLDT
            </text>
            <g className="products-tab-visual__platforms-beam">
              <rect x={hx - 1.5} y={hy - 118} width="3" height="72" rx="1" fill={`url(#${beamGrad})`} opacity="0.9" />
            </g>
            <circle cx={hx} cy={hy - 32} r="36" fill={`url(#${coreGlow})`} className="products-tab-visual__platforms-core-glow" />
            <circle
              cx={hx}
              cy={hy - 32}
              r="10"
              fill="rgba(2,6,23,0.65)"
              stroke="rgba(52,211,153,0.75)"
              strokeWidth="1.2"
              className="products-tab-visual__platforms-core-ring"
            />
            <circle
              cx={hx}
              cy={hy - 32}
              r="18"
              fill="none"
              stroke="rgba(34,211,238,0.35)"
              strokeWidth="0.65"
              className="products-tab-visual__platforms-core-ring"
            />
          </g>

          {satellites}

          <g transform="translate(218, 198)" opacity="0.9">
            <rect
              x="0"
              y="0"
              width="52"
              height="36"
              rx="4"
              fill="rgba(2,6,23,0.45)"
              stroke="rgba(56,189,248,0.22)"
              strokeWidth="0.5"
            />
            <path
              d="M8 24 L14 18 L20 22 L28 12 L36 20 L44 10"
              fill="none"
              stroke="rgba(52,211,153,0.55)"
              strokeWidth="0.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <text x="26" y="32" textAnchor="middle" fill="rgba(148,163,184,0.5)" fontSize="3.5" fontFamily="ui-monospace, monospace">
              live feed
            </text>
          </g>
        </g>

        <rect width="320" height="320" fill={`url(#${vignette})`} pointerEvents="none" />
        <rect width="320" height="320" fill={`url(#${mesh})`} pointerEvents="none" />

        <text
          x="160"
          y="34"
          textAnchor="middle"
          fill="rgba(125,211,252,0.4)"
          fontSize="5.5"
          letterSpacing="0.32em"
          fontWeight="700"
          fontFamily="Inter, system-ui, sans-serif"
          className="products-tab-visual__platforms-tag"
        >
          LIVE ARCHITECTURE MAP
        </text>

        <g transform="translate(14, 46)" opacity="0.92">
          <circle cx="0" cy="0" r="6" fill="none" stroke="#22d3ee" strokeWidth="1.15" opacity="0.88" />
          <circle cx="7" cy="-3" r="6" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.68" />
          <circle cx="14" cy="1" r="6" fill="none" stroke="#67e8f9" strokeWidth="0.85" opacity="0.52" />
          <text
            x="26"
            y="5"
            fill="#f8fafc"
            fontSize="9.5"
            fontWeight="800"
            letterSpacing="0.2em"
            fontFamily="Inter, system-ui, sans-serif"
          >
            FLDT
          </text>
        </g>

        <g
          className="products-tab-visual__platforms-hud"
          fill="none"
          stroke="rgba(45,212,191,0.58)"
          strokeWidth="0.85"
          strokeLinecap="round"
        >
          <path d="M18 276 L18 260 M18 276 L36 276" />
          <path d="M302 276 L302 260 M302 276 L284 276" />
          <path d="M18 54 L18 70 M18 54 L36 54" />
          <path d="M302 54 L302 70 M302 54 L284 54" />
        </g>

        <g className="products-tab-visual__data-flow" opacity="0.88">
          <path
            d="M 14 26 L 306 26 L 306 278 L 14 278 Z"
            fill="none"
            stroke={`url(#${frameStroke})`}
            strokeWidth="0.65"
            strokeDasharray="10 14"
          />
        </g>

        <text
          x="160"
          y="302"
          textAnchor="middle"
          fill="rgba(226,232,240,0.48)"
          fontSize="8.5"
          letterSpacing="0.22em"
          fontWeight="600"
          fontFamily="Inter, system-ui, sans-serif"
        >
          FOUNDATION · TECHNICAL CORE
        </text>
      </svg>
    )
  }

  if (tab === 'Tools') {
    const sky = `tl-sky-${raw}`
    const floor = `tl-floor-${raw}`
    const metal = `tl-metal-${raw}`
    const glassSheen = `tl-sheen-${raw}`
    const fiberBlur = `tl-fiber-blur-${raw}`
    const bloom = `tl-bloom-${raw}`

    const hubX = 160
    const hubY = 166

    const spokes = [
      { d: `M${hubX} ${hubY} C 118 128 92 98 78 88`, tint: TOOLS_LINE.blue, id: 's1' },
      { d: `M${hubX} ${hubY} C ${hubX} 130 ${hubX} 95 ${hubX} 68`, tint: TOOLS_LINE.green, id: 's2' },
      { d: `M${hubX} ${hubY} C 208 132 232 118 252 126`, tint: TOOLS_LINE.red, id: 's3' },
      { d: `M${hubX} ${hubY} C 202 198 218 218 236 228`, tint: TOOLS_LINE.orange, id: 's4' },
      { d: `M${hubX} ${hubY} C 112 198 92 220 78 228`, tint: TOOLS_LINE.purple, id: 's5' },
    ]

    const satellites = [
      toolsGlassSatellite('ts1', 72, 88, {
        tone: 'blue',
        title: 'PIPELINE',
        status: 'Route · +15%',
        kind: 'route',
      }),
      toolsGlassSatellite('ts2', 160, 70, {
        tone: 'green',
        title: 'SENSORS',
        status: 'Risk · LOW',
        kind: 'bars',
      }),
      toolsGlassSatellite('ts3', 254, 132, {
        tone: 'red',
        title: 'GUARD',
        status: 'Txn · SECURE',
        kind: 'shield',
      }),
      toolsGlassSatellite('ts4', 236, 232, {
        tone: 'orange',
        title: 'EXPORT',
        status: 'Stock · NONE',
        kind: 'bars3',
      }),
      toolsGlassSatellite('ts5', 76, 232, {
        tone: 'purple',
        title: 'FORECAST',
        status: 'Demand · STABLE',
        kind: 'line',
      }),
    ]

    return (
      <svg className={cn} viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id={sky} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1d23" />
            <stop offset="50%" stopColor="#14161c" />
            <stop offset="100%" stopColor="#0a0c10" />
          </linearGradient>
          <radialGradient id={floor} cx="50%" cy="88%" r="75%">
            <stop offset="0%" stopColor="rgba(56,189,248,0.16)" />
            <stop offset="45%" stopColor="rgba(30,58,138,0.06)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <linearGradient id={metal} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="45%" stopColor="#e2e8f0" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id={glassSheen} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.11)" />
            <stop offset="40%" stopColor="rgba(255,255,255,0.03)" />
            <stop offset="100%" stopColor="rgba(15,23,42,0.35)" />
          </linearGradient>
          <filter id={fiberBlur} x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" />
          </filter>
          <filter id={bloom} x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="320" height="320" fill={`url(#${sky})`} />
        <ellipse cx="160" cy="252" rx="138" ry="38" fill={`url(#${floor})`} opacity="0.92" />

        <g opacity="0.12" stroke="#64748b" strokeWidth="0.45" fill="none">
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`tlh-${i}`} x1="10" y1={36 + i * 20} x2="310" y2={40 + i * 19} />
          ))}
          {Array.from({ length: 14 }).map((_, i) => (
            <line key={`tlv-${i}`} x1={-20 + i * 26} y1="310" x2={8 + i * 24} y2="36" />
          ))}
        </g>
        <g opacity="0.28" fill="#38bdf8">
          {Array.from({ length: 28 }).map((_, i) => {
            const px = 20 + (i * 41) % 292
            const py = 38 + ((i * 53) % 248)
            return <circle key={`tld-${i}`} cx={px} cy={py} r={0.45} opacity={0.3 + (i % 4) * 0.14} />
          })}
        </g>

        {spokes.map((s) => toolsFiberSpoke(s.d, s.tint, fiberBlur, s.id))}

        {satellites}

        <g transform={`translate(${hubX},${hubY})`} filter={`url(#${bloom})`}>
          <g className="products-tab-visual__tools-core">
            <ellipse
              className="products-tab-visual__tools-base-glow"
              cx="0"
              cy="34"
              rx="54"
              ry="11"
              fill="rgba(56,189,248,0.32)"
              opacity="0.88"
            />
            <rect
              x="-42"
              y="-10"
              width="84"
              height="58"
              rx="14"
              fill={`url(#${glassSheen})`}
              stroke="rgba(255,255,255,0.38)"
              strokeWidth="0.9"
            />
            <rect
              x="-39"
              y="-38"
              width="78"
              height="32"
              rx="10"
              fill={`url(#${metal})`}
              stroke="rgba(255,255,255,0.25)"
              strokeWidth="0.65"
            />
            <rect
              x="-35"
              y="-6"
              width="70"
              height="26"
              rx="6"
              fill="rgba(8,11,18,0.58)"
              stroke="rgba(100,116,139,0.28)"
              strokeWidth="0.45"
        />
        <text
              x="0"
              y="11"
              textAnchor="middle"
              fill="#f8fafc"
              fontSize="7.5"
              fontWeight="800"
              letterSpacing="0.26em"
              fontFamily="Inter, system-ui, sans-serif"
            >
              FLDT
            </text>
            <text
              x="0"
              y="19"
              textAnchor="middle"
              fill="rgba(148,163,184,0.58)"
              fontSize="4.6"
              letterSpacing="0.14em"
          fontFamily="Inter, system-ui, sans-serif"
        >
              TOOL CORE
        </text>
            <rect x="-48" y="12" width="11" height="6" rx="1.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.4" opacity="0.95" />
            <rect x="-32" y="14" width="11" height="6" rx="1.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.4" opacity="0.95" />
            <rect x="22" y="14" width="11" height="6" rx="1.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.4" opacity="0.95" />
            <rect x="38" y="12" width="11" height="6" rx="1.5" fill="#0f172a" stroke="#38bdf8" strokeWidth="0.4" opacity="0.95" />
            <circle cx="0" cy="-22" r="2.5" fill="#7dd3fc" opacity="0.95" className="products-tab-visual__tools-spark" />
          </g>
        </g>

        <text
          x="160"
          y="302"
          textAnchor="middle"
          fill="rgba(226,232,240,0.42)"
          fontSize="8.5"
          letterSpacing="0.2em"
          fontWeight="600"
          fontFamily="Inter, system-ui, sans-serif"
        >
          PROBLEM → SOLUTION MODULES
        </text>
      </svg>
    )
  }

  const frameGrad = `if-frame-${raw}`
  const bezel = `if-bezel-${raw}`
  const stripBg = `if-strip-${raw}`
  const iconGrad = `if-icon-${raw}`
  const vignette = `if-vig-${raw}`
  const markGlow = `if-mark-glow-${raw}`

  const strip = { x: 15, y: 48, w: 290, h: 224, r: 10 } as const
  const pw = strip.w / 5

  const modes = [
    { kind: 'desktop' as const, line1: 'DESKTOP', line2: 'DEEP ANALYSIS', tint: 'rgba(56,189,248,0.07)' },
    { kind: 'web' as const, line1: 'WEB-BASED', line2: 'QUICK REVIEW', tint: 'rgba(96,165,250,0.07)' },
    { kind: 'phone' as const, line1: 'PHONE-BASED', line2: 'ON-THE-GO', tint: 'rgba(251,146,60,0.06)' },
    { kind: 'ar' as const, line1: 'AR', line2: 'FIELD OPERATION', tint: 'rgba(45,212,191,0.07)' },
    { kind: 'vr' as const, line1: 'VR', line2: 'COLLABORATION', tint: 'rgba(167,139,250,0.07)' },
  ]

  return (
    <svg className={cn} viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id={frameGrad} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#15171c" />
          <stop offset="100%" stopColor="#0a0b0e" />
        </linearGradient>
        <linearGradient id={bezel} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.03)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.15)" />
        </linearGradient>
        <linearGradient id={stripBg} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#141922" />
          <stop offset="100%" stopColor="#0d1017" />
        </linearGradient>
        <linearGradient id={iconGrad} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="55%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id={vignette} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(4,6,12,0.38)" />
          <stop offset="10%" stopColor="rgba(4,6,12,0)" />
          <stop offset="90%" stopColor="rgba(4,6,12,0)" />
          <stop offset="100%" stopColor="rgba(2,4,10,0.5)" />
        </linearGradient>
        <filter id={markGlow} x="-85%" y="-85%" width="270%" height="270%">
          <feGaussianBlur stdDeviation="1.1" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="320" height="320" fill="#05070d" />

      <g className="products-tab-visual__interfaces-device">
        <rect x="11" y="10" width="298" height="278" rx="16" ry="16" fill="#050506" opacity="0.5" />
        <rect x="10" y="9" width="300" height="280" rx="17" ry="17" fill={`url(#${frameGrad})`} stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <rect x="12" y="11" width="296" height="276" rx="15" ry="15" fill="none" stroke={`url(#${bezel})`} strokeWidth="0.85" opacity="0.85" />

        <g transform="translate(22, 18)">
          <g filter={`url(#${markGlow})`}>
            <path
              d="M9 13.2v-.7a5.2 5.2 0 0110.4 0v.7h1.9c.8 0 1.4.7 1.4 1.5v10.2c0 .8-.6 1.5-1.4 1.5H7.1c-.8 0-1.4-.7-1.4-1.5V14.7c0-.8.6-1.5 1.4-1.5H9zm2.4 0h5.6v-.7a2.8 2.8 0 10-5.6 0v.7z"
              fill={`url(#${iconGrad})`}
              opacity="0.98"
            />
          </g>
          <text x="30" y="16" fill="#f8fafc" fontSize="10" fontWeight="700" letterSpacing="0.22em" fontFamily="Inter, system-ui, sans-serif">
            INTERFACES
          </text>
        </g>

        <line x1="20" y1="42" x2="300" y2="42" stroke="rgba(100,116,139,0.12)" strokeWidth="0.5" />

        <g transform={`translate(${strip.x}, ${strip.y})`} className="products-tab-visual__interfaces-strip">
          <rect width={strip.w} height={strip.h} rx={strip.r} ry={strip.r} fill={`url(#${stripBg})`} stroke="rgba(255,255,255,0.05)" strokeWidth="0.55" />
          {modes.map((m, i) => (
            <g key={m.kind} transform={`translate(${i * pw}, 0)`} className="products-tab-visual__interfaces-mode-col">
              <rect width={pw} height={strip.h} fill={m.tint} />
              {i < 4 ? (
                <line
                  x1={pw - 0.5}
                  y1="14"
                  x2={pw - 0.5}
                  y2={strip.h - 14}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="0.55"
                />
              ) : null}
              <text
                x={pw / 2}
                y="12"
                textAnchor="middle"
                fill="rgba(248,250,252,0.92)"
                fontSize="4.25"
                fontWeight="800"
                letterSpacing="0.06em"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {m.line1}
              </text>
              <text
                x={pw / 2}
                y="18.5"
                textAnchor="middle"
                fill="rgba(148,163,184,0.82)"
                fontSize="3.15"
                fontWeight="700"
                letterSpacing="0.05em"
                fontFamily="Inter, system-ui, sans-serif"
              >
                {m.line2}
              </text>
              {interfacesModeArt(m.kind, pw, strip.h)}
            </g>
          ))}
        </g>
      </g>
      <rect width="320" height="320" fill={`url(#${vignette})`} pointerEvents="none" />
      <text
        x="160"
        y="306"
        textAnchor="middle"
        fill="rgba(226,232,240,0.38)"
        fontSize="7"
        letterSpacing="0.14em"
        fontWeight="600"
        fontFamily="Inter, system-ui, sans-serif"
      >
        DESKTOP · WEB · PHONE · AR · VR
      </text>
    </svg>
  )
}
