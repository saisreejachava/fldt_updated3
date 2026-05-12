import { useId } from 'react'

type Props = { index: number; className?: string }

/**
 * Florida Digital Twin–themed illustrations: research & hazards, urban twin delivery, education.
 * Theme 0 evokes the FLDT command hub: holographic Florida + hazard vortex, model feeds, HiPerGator.
 * Theme 1: coastal product lab — wireframe pipeline, collaboration table ribbon, prototyping + dual monitors.
 * Theme 2: education & engagement journey — static timeline arc, plan grid, curriculum doc (no motion).
 */
export function AboutPillarVisual({ index, className }: Props) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
  const cn = ['about-pillar-visual', `about-pillar-visual--theme-${index}`, className]
    .filter(Boolean)
    .join(' ')

  if (index === 0) {
    const gb = `pv-bg-${uid}`
    const gm = `pv-mesh-${uid}`
    const gf = `pv-fl-${uid}`
    const vortex = `pv-vortex-${uid}`
    const holoSheen = `pv-holo-${uid}`
    const holoClip = `pv-holo-clip-${uid}`
    return (
      <svg className={cn} viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <radialGradient id={gb} cx="42%" cy="28%" r="78%">
            <stop offset="0%" stopColor="#0f1f3a" />
            <stop offset="50%" stopColor="#0a1528" />
            <stop offset="100%" stopColor="#060d18" />
          </radialGradient>
          <linearGradient id={gm} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id={gf} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id={vortex} cx="40%" cy="45%" r="65%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="25%" stopColor="rgba(251,146,60,0.65)" />
            <stop offset="55%" stopColor="rgba(234,88,12,0.35)" />
            <stop offset="100%" stopColor="rgba(234,88,12,0)" />
          </radialGradient>
          <linearGradient id={holoSheen} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(45,212,191,0.12)" />
            <stop offset="100%" stopColor="rgba(0,33,165,0.06)" />
          </linearGradient>
          <clipPath id={holoClip}>
            <rect x="71" y="55" width="218" height="162" rx="6" ry="6" />
          </clipPath>
        </defs>
        <rect width="400" height="280" rx="18" fill={`url(#${gb})`} />

        <g fill="none" stroke="#2dd4bf" strokeWidth="0.55" opacity="0.42" className="pv-feed-lines">
          <path d="M56 68 Q68 95 78 118 Q88 138 98 148" strokeDasharray="4 5" />
          <path d="M56 116 Q72 128 86 142" strokeDasharray="4 5" />
          <path d="M56 164 Q74 158 92 150" strokeDasharray="4 5" />
        </g>

        <g opacity="0.88">
          <rect x="8" y="44" width="52" height="36" rx="4" fill="rgba(13,40,55,0.55)" stroke="#2dd4bf" strokeWidth="0.75" />
          <text
            x="34"
            y="57"
            textAnchor="middle"
            fill="rgba(248,250,252,0.88)"
            fontSize="6"
            fontWeight="800"
            letterSpacing="0.08em"
            fontFamily="Inter, system-ui, sans-serif"
          >
            SOCIAL
          </text>
          <text
            x="34"
            y="64.5"
            textAnchor="middle"
            fill="rgba(148,163,184,0.75)"
            fontSize="4.5"
            letterSpacing="0.06em"
            fontFamily="Inter, system-ui, sans-serif"
          >
            MODELS
          </text>
          <g stroke="#60a5fa" strokeWidth="0.45" opacity="0.75">
            <rect x="16" y="69" width="4" height="8" fill="rgba(96,165,250,0.12)" />
            <rect x="22" y="67" width="4" height="10" fill="rgba(96,165,250,0.12)" />
            <rect x="28" y="69" width="4" height="8" fill="rgba(96,165,250,0.12)" />
            <circle cx="38" cy="72" r="2" fill="rgba(96,165,250,0.15)" />
            <circle cx="44" cy="71" r="1.8" fill="rgba(96,165,250,0.12)" />
          </g>
        </g>
        <g opacity="0.88">
          <rect x="8" y="92" width="52" height="36" rx="4" fill="rgba(13,40,55,0.52)" stroke="#2dd4bf" strokeWidth="0.75" />
          <text
            x="34"
            y="104"
            textAnchor="middle"
            fill="rgba(248,250,252,0.86)"
            fontSize="5.5"
            fontWeight="800"
            letterSpacing="0.06em"
            fontFamily="Inter, system-ui, sans-serif"
          >
            ENVIRONMENT
          </text>
          <text
            x="34"
            y="111.5"
            textAnchor="middle"
            fill="rgba(148,163,184,0.72)"
            fontSize="4.5"
            letterSpacing="0.06em"
            fontFamily="Inter, system-ui, sans-serif"
          >
            MODELS
          </text>
          <path
            d="M18 122 L22 116 L26 120 L30 114 L34 118 L38 113 L42 118"
            fill="none"
            stroke="#34d399"
            strokeWidth="0.55"
            strokeLinejoin="round"
          />
          <path d="M18 123 L18 127 M34 123 L34 127" stroke="#94a3b8" strokeWidth="0.4" />
        </g>
        <g opacity="0.88">
          <rect x="8" y="140" width="52" height="36" rx="4" fill="rgba(13,40,55,0.52)" stroke="#2dd4bf" strokeWidth="0.75" />
          <text
            x="34"
            y="152"
            textAnchor="middle"
            fill="rgba(248,250,252,0.86)"
            fontSize="5.5"
            fontWeight="800"
            letterSpacing="0.06em"
            fontFamily="Inter, system-ui, sans-serif"
          >
            INFRA-
          </text>
          <text
            x="34"
            y="159.5"
            textAnchor="middle"
            fill="rgba(148,163,184,0.72)"
            fontSize="4.5"
            letterSpacing="0.06em"
            fontFamily="Inter, system-ui, sans-serif"
          >
            STRUCTURE
          </text>
          <g stroke="#f97316" strokeWidth="0.45" opacity="0.7">
            <rect x="18" y="166" width="16" height="6" fill="rgba(249,115,22,0.08)" />
            <path d="M20 166 L20 160 L32 160 L32 166 M23 160 L23 157 M29 160 L29 157" />
          </g>
        </g>

        <g fill="none" stroke="#00f0ff" strokeWidth="0.85" className="pv-hex-mesh" opacity="0.55">
          <path d="M52 210 L64 203 L64 189 L52 182 L40 189 L40 203 Z" />
          <path d="M80 216 L92 209 L92 195 L80 188 L68 195 L68 209 Z" />
          <path d="M108 208 L120 201 L120 187 L108 180 L96 187 L96 201 Z" />
          <path d="M66 232 L78 225 L78 211 L66 204 L54 211 L54 225 Z" />
          <path d="M94 238 L106 231 L106 217 L94 210 L82 217 L82 231 Z" />
        </g>
        <g stroke="#2dd4bf" strokeWidth="1.15" opacity="0.92">
          <rect x="14" y="198" width="40" height="72" rx="5" fill="rgba(0,240,255,0.06)" />
          <rect x="20" y="208" width="28" height="5" rx="1" fill="rgba(0,240,255,0.18)" />
          <rect x="20" y="216" width="28" height="5" rx="1" fill="rgba(0,240,255,0.12)" />
          <rect x="20" y="224" width="28" height="5" rx="1" fill="rgba(0,240,255,0.08)" />
          <rect x="20" y="232" width="28" height="5" rx="1" fill="rgba(143,71,174,0.14)" />
          <text
            x="34"
            y="258"
            textAnchor="middle"
            fill="#2dd4bf"
            fontSize="8"
            fontWeight="800"
            opacity="0.9"
            letterSpacing="0.12em"
            fontFamily="JetBrains Mono, ui-monospace, monospace"
          >
            HPC
          </text>
        </g>

        <g className="pv-holo-frame">
          <rect
            className="pv-holo-border"
            x="66"
            y="34"
            width="228"
            height="198"
            rx="10"
            fill="rgba(6,24,40,0.35)"
            stroke="#2dd4bf"
            strokeWidth="1.1"
          />
          <rect x="69" y="37" width="222" height="192" rx="8" fill={`url(#${holoSheen})`} opacity="0.65" />
          <text
            x="180"
            y="48"
            textAnchor="middle"
            fill="rgba(248,250,252,0.88)"
            fontSize="6.2"
            fontWeight="800"
            letterSpacing="0.16em"
            fontFamily="Inter, system-ui, sans-serif"
          >
            FLDT · UF DIGITAL TWIN
          </text>
          <text
            x="180"
            y="222"
            textAnchor="middle"
            fill="rgba(148,163,184,0.6)"
            fontSize="5"
            fontWeight="700"
            letterSpacing="0.14em"
            fontFamily="Inter, system-ui, sans-serif"
          >
            HAZARD SIMULATION · LIVE MESH
          </text>
        </g>

        <g clipPath={`url(#${holoClip})`}>
          <g transform="translate(0, 4)">
            <g opacity="0.2" stroke="#ffffff" strokeWidth="0.45">
              {Array.from({ length: 7 }).map((_, i) => (
                <line key={`gh${i}`} x1="78" y1={58 + i * 24} x2="282" y2={54 + i * 24} opacity={0.35} />
              ))}
              {Array.from({ length: 8 }).map((_, i) => (
                <line key={`gv${i}`} x1={88 + i * 26} y1="56" x2={82 + i * 26} y2="214" opacity={0.35} />
              ))}
            </g>
            <path
              className="pv-florida"
              fill={`url(#${gf})`}
              stroke="#2dd4bf"
              strokeWidth="1.5"
              opacity="0.95"
              d="M258 48 L282 44 L298 58 L310 82 L316 112 L320 148 L316 186 L300 204 L282 218 L262 230 L242 242 L228 252 L212 258 L192 254 L178 248 L168 232 L162 212 L160 186 L164 156 L174 128 L190 100 L208 76 L226 56 Z"
              transform="translate(-52, 6) scale(0.58) translate(48, 32)"
            />
            <g
              className="pv-contours"
              fill="none"
              stroke="#c084fc"
              strokeWidth="0.9"
              opacity="0.5"
              strokeLinecap="round"
              transform="translate(-52, 6) scale(0.58) translate(48, 32)"
            >
              <path d="M210 120 Q240 114 262 128 Q276 150 268 178" />
              <path d="M218 148 Q246 140 266 156" />
              <path d="M224 172 Q252 166 274 182" />
            </g>
            <g transform="translate(142, 128)">
              <g className="pv-hurricane">
              <ellipse cx="0" cy="0" rx="10" ry="10" fill={`url(#${vortex})`} opacity="0.9" />
              <ellipse cx="0" cy="0" rx="4" ry="4" fill="rgba(255,255,255,0.75)" />
              <path
                d="M0 0 C 22 -18 38 8 32 32 C 26 52 4 48 -8 36 C -22 22 -18 8 0 0"
                fill="none"
                stroke="rgba(251,146,60,0.55)"
                strokeWidth="1.2"
              />
              <path
                d="M0 0 C 30 -24 52 10 44 42 C 38 68 8 62 -12 46 C -32 28 -26 10 0 0"
                fill="none"
                stroke="rgba(249,115,22,0.35)"
                strokeWidth="0.85"
              />
              </g>
            </g>
          </g>
        </g>

        <path
          className="pv-sat-dash"
          fill="none"
          stroke="#2dd4bf"
          strokeWidth="1.3"
          strokeDasharray="7 11"
          strokeLinecap="round"
          d="M70 40 Q180 18 298 42"
          opacity="0.82"
        />

        <g fill="none" stroke="#2dd4bf" strokeWidth="0.45" opacity="0.38" className="pv-right-feed">
          <path d="M296 58 Q286 90 280 128" strokeDasharray="3 4" />
          <path d="M296 98 Q288 120 284 145" strokeDasharray="3 4" />
          <path d="M296 138 Q289 158 286 175" strokeDasharray="3 4" />
          <path d="M296 178 Q290 195 288 210" strokeDasharray="3 4" />
        </g>

        <g opacity="0.9">
          <rect x="302" y="50" width="86" height="28" rx="4" fill="rgba(13,35,55,0.55)" stroke="#2dd4bf" strokeWidth="0.65" />
          <text x="324" y="60" fill="rgba(226,232,240,0.75)" fontSize="5" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
            REAL-TIME SIM
          </text>
          <g transform="translate(338, 72)">
            <circle r="8" fill="none" stroke="#2dd4bf" strokeWidth="0.5" opacity="0.65" />
            <g className="pv-radar-sweep">
              <line x1="0" y1="0" x2="0" y2="-7.5" stroke="#fb923c" strokeWidth="1" strokeLinecap="round" />
            </g>
          </g>
        </g>
        <g opacity="0.88">
          <rect x="302" y="86" width="86" height="28" rx="4" fill="rgba(13,35,55,0.52)" stroke="#2dd4bf" strokeWidth="0.65" />
          <text x="320" y="96" fill="rgba(226,232,240,0.72)" fontSize="5" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
            FLOOD RISKS
          </text>
          <rect x="310" y="100" width="12" height="10" rx="1" fill="#fb923c" opacity="0.65" />
          <rect x="324" y="102" width="12" height="8" rx="1" fill="#f97316" opacity="0.45" />
          <rect x="338" y="104" width="12" height="6" rx="1" fill="#fbbf24" opacity="0.35" />
        </g>
        <g opacity="0.88">
          <rect x="302" y="122" width="86" height="28" rx="4" fill="rgba(13,35,55,0.52)" stroke="#2dd4bf" strokeWidth="0.65" />
          <text x="318" y="132" fill="rgba(226,232,240,0.72)" fontSize="5" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
            STORM SURGE
          </text>
          <path
            d="M308 146 Q318 138 328 144 Q338 152 348 142 Q358 132 372 140"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="0.65"
          />
        </g>
        <g opacity="0.88">
          <rect x="302" y="158" width="86" height="28" rx="4" fill="rgba(13,35,55,0.52)" stroke="#2dd4bf" strokeWidth="0.65" />
          <text x="314" y="168" fill="rgba(226,232,240,0.72)" fontSize="5" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
            TRAFFIC IMPACT
          </text>
          <path d="M310 180 L320 178 L332 182 L348 174 L370 180" fill="none" stroke="#f97316" strokeWidth="0.7" strokeLinecap="round" />
        </g>
        <g opacity="0.88">
          <rect x="302" y="194" width="86" height="28" rx="4" fill="rgba(13,35,55,0.52)" stroke="#2dd4bf" strokeWidth="0.65" />
          <text x="310" y="204" fill="rgba(226,232,240,0.72)" fontSize="5" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
            EVACUATION
          </text>
          <path
            d="M312 218 L318 210 L326 214 L334 206 L342 212 L350 204 L362 210"
            fill="none"
            stroke="#2dd4bf"
            strokeWidth="0.65"
            strokeLinejoin="round"
          />
        </g>

        <circle className="pv-pulse-a" cx="168" cy="152" r="3.5" fill="#2dd4bf" />
        <circle className="pv-pulse-b" cx="228" cy="128" r="2.8" fill="#fb923c" />
        <circle className="pv-pulse-c" cx="248" cy="168" r="3" fill="#a78bfa" />

        <rect width="400" height="280" rx="18" fill={`url(#${gm})`} opacity="0.1" style={{ mixBlendMode: 'screen' }} />
        <text
          x="200"
          y="272"
          textAnchor="middle"
          fill="rgba(255,255,255,0.42)"
          fontSize="9"
          letterSpacing="0.18em"
          fontFamily="Inter, system-ui, sans-serif"
        >
          GEOSPATIAL · HAZARDS · HiPerGATOR
        </text>
      </svg>
    )
  }

  if (index === 1) {
    const bg = `pv-p1bg-${uid}`
    const water = `pv-p1water-${uid}`
    const sun = `pv-p1sun-${uid}`
    const floor = `pv-p1floor-${uid}`

    return (
      <svg className={cn} viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <defs>
          <linearGradient id={bg} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0a1128" />
            <stop offset="55%" stopColor="#121f3d" />
            <stop offset="100%" stopColor="#1a2a4a" />
          </linearGradient>
          <linearGradient id={water} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(30,58,95,0.55)" />
            <stop offset="100%" stopColor="rgba(15,35,58,0.75)" />
          </linearGradient>
          <linearGradient id={floor} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="rgba(249,115,22,0.09)" />
            <stop offset="50%" stopColor="rgba(34,211,238,0.05)" />
            <stop offset="100%" stopColor="rgba(249,115,22,0.03)" />
          </linearGradient>
          <radialGradient id={sun} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(251,146,60,0.58)" />
            <stop offset="45%" stopColor="rgba(234,88,12,0.22)" />
            <stop offset="100%" stopColor="rgba(234,88,12,0)" />
          </radialGradient>
        </defs>
        <rect width="400" height="280" rx="18" fill={`url(#${bg})`} />

        <circle className="pv-sun-glow" cx="348" cy="54" r="32" fill={`url(#${sun})`} />

        <g className="pv-p1-dataflow" opacity="0.32" fill="none" strokeWidth="0.85" strokeLinecap="round">
          <path d="M42 238 Q120 200 200 188 Q280 175 358 165" stroke="#22d3ee" strokeDasharray="6 10" />
          <path d="M48 248 Q200 215 352 178" stroke="#fb923c" strokeDasharray="5 12" />
        </g>

        <g fill="none" stroke="#e2e8f0" strokeWidth="1.05" strokeLinejoin="round" opacity="0.88">
          <path d="M76 182 L76 104" />
          <path d="M76 104 L52 92" />
          <path d="M76 104 L100 92" />
          <circle cx="76" cy="100" r="4.5" fill="rgba(34,211,238,0.2)" stroke="#22d3ee" strokeWidth="1.1" />
        </g>

        <g opacity="0.9">
          <path
            fill="none"
            stroke="#22d3ee"
            strokeWidth="1.35"
            d="M118 178 L118 114 L174 78 L230 114 L230 178 L174 214 L118 178 Z"
          />
          <path fill="none" stroke="#22d3ee" strokeWidth="1.25" d="M118 114 L174 78 L230 114 M174 78 L174 214" />
          <path
            fill="none"
            stroke="#fb923c"
            strokeWidth="1.05"
            opacity="0.92"
            d="M148 156 L162 148 L176 156 L168 174 L148 168 Z M162 148 L168 128 L182 138 L176 156"
            className="pv-twin-wire"
          />
        </g>
        <g opacity="0.62" stroke="#cbd5e1" strokeWidth="0.95" fill="none">
          <path d="M188 170 L188 122 L236 94 L284 122 L284 170 L236 198 L188 170 Z" />
          <path d="M188 122 L236 94 L284 122 M236 94 L236 198" />
        </g>
        <g opacity="0.48" stroke="#94a3b8" strokeWidth="0.85" fill="none">
          <path d="M242 162 L242 128 L282 106 L322 128 L322 162 L282 184 L242 162 Z" />
          <path d="M242 128 L282 106 L322 128 M282 106 L282 184" />
        </g>
        <g opacity="0.38" stroke="#64748b" strokeWidth="0.78" fill="none">
          <path d="M288 156 L288 132 L320 116 L352 132 L352 156 L320 172 L288 156 Z" />
          <path d="M288 132 L320 116 L352 132 M320 116 L320 172" />
        </g>

        <g className="pv-p1-lab-left" opacity="0.75" stroke="#94a3b8" strokeWidth="0.65" fill="none">
          <rect x="22" y="118" width="36" height="48" rx="2" fill="rgba(15,23,42,0.35)" />
          <path d="M28 128 L52 128 M28 138 L48 138 M28 148 L50 148" stroke="#22d3ee" opacity="0.65" />
          <path d="M34 166 L46 156" stroke="#fb923c" opacity="0.55" />
        </g>
        <g className="pv-p1-lab-right" opacity="0.72">
          <rect x="328" y="112" width="54" height="38" rx="3" fill="rgba(15,23,42,0.4)" stroke="#64748b" strokeWidth="0.6" />
          <rect x="336" y="120" width="18" height="22" rx="1" fill="rgba(34,211,238,0.06)" stroke="#22d3ee" strokeWidth="0.5" />
          <rect x="358" y="120" width="18" height="22" rx="1" fill="rgba(34,211,238,0.06)" stroke="#22d3ee" strokeWidth="0.5" />
          <path d="M340 132 L352 132 M340 140 L350 140" stroke="#e2e8f0" strokeWidth="0.4" opacity="0.5" />
          <path d="M362 132 L372 132 M362 140 L370 140" stroke="#e2e8f0" strokeWidth="0.4" opacity="0.5" />
        </g>

        <rect x="0" y="198" width="400" height="82" fill={`url(#${water})`} />
        <path
          className="pv-water-wave"
          fill={`url(#${floor})`}
          opacity="0.85"
          d="M0 198 Q80 188 160 194 T320 190 T400 196 L400 280 L0 280 Z"
        />
        <path
          fill="none"
          stroke="#38bdf8"
          strokeWidth="0.9"
          opacity="0.5"
          strokeDasharray="5 9"
          strokeLinecap="round"
          className="pv-coastline-drift"
          d="M0 200 Q120 186 220 196 Q320 206 400 192"
        />

        <g className="pv-p1-table-band" opacity="0.88">
          <rect x="96" y="166" width="208" height="22" rx="3" fill="rgba(34,211,238,0.06)" stroke="rgba(34,211,238,0.35)" strokeWidth="0.55" />
          <text
            x="200"
            y="180"
            textAnchor="middle"
            fill="rgba(226,232,240,0.55)"
            fontSize="5"
            fontWeight="700"
            letterSpacing="0.14em"
            fontFamily="Inter, system-ui, sans-serif"
          >
            ASSEMBLE · MODEL · COMPARE · VISUALIZE
          </text>
        </g>

        <text
          x="200"
          y="272"
          textAnchor="middle"
          fill="rgba(255,255,255,0.42)"
          fontSize="9"
          letterSpacing="0.16em"
          fontFamily="Inter, system-ui, sans-serif"
        >
          DIGITAL TWIN · COASTAL FLORIDA · DESIGN
        </text>
      </svg>
    )
  }

  const gEduBg = `pv-edu-bg-${uid}`
  const gEduArc = `pv-edu-arc-${uid}`
  return (
    <svg className={cn} viewBox="0 0 400 280" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <radialGradient id={gEduBg} cx="42%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#2d2648" />
          <stop offset="45%" stopColor="#14101f" />
          <stop offset="100%" stopColor="#06060d" />
        </radialGradient>
        <linearGradient id={gEduArc} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect width="400" height="280" rx="18" fill={`url(#${gEduBg})`} />

      <g fill="#22d3ee" opacity="0.88">
        <circle cx="116" cy="56" r="3.4" />
        <circle cx="144" cy="46" r="3.4" />
        <circle cx="176" cy="42" r="3.4" />
        <circle cx="208" cy="48" r="3.4" />
      </g>

      <g transform="translate(202, 56)">
        <circle r="13" fill="rgba(34,211,238,0.08)" stroke="#22d3ee" strokeWidth="1.05" />
        <circle r="10" fill="none" stroke="rgba(226,232,240,0.35)" strokeWidth="0.45" />
        <line x1="0" y1="0" x2="0" y2="-6" stroke="#e2e8f0" strokeWidth="1" strokeLinecap="round" />
        <line x1="0" y1="0" x2="5" y2="3" stroke="#e2e8f0" strokeWidth="0.85" strokeLinecap="round" opacity="0.9" />
      </g>

      <path
        d="M60 236 C 108 205, 155 160, 202 128 C 255 92, 308 84, 348 96"
        fill="none"
        stroke={`url(#${gEduArc})`}
        strokeWidth="2.15"
        strokeLinecap="round"
      />

      <line x1="202" y1="69" x2="202" y2="115" stroke="#22d3ee" strokeWidth="0.85" opacity="0.58" strokeLinecap="round" />

      <g transform="translate(60, 236)">
        <circle r="12.5" fill="rgba(34,211,238,0.09)" stroke="#22d3ee" strokeWidth="1.05" />
        <path d="M0 -7 V7 M-7 0 H7" stroke="#e2e8f0" strokeWidth="0.95" strokeLinecap="round" />
      </g>
      <g transform="translate(202, 128)">
        <circle r="12.5" fill="rgba(34,211,238,0.09)" stroke="#22d3ee" strokeWidth="1.05" />
        <path d="M0 -7 V7 M-7 0 H7" stroke="#e2e8f0" strokeWidth="0.95" strokeLinecap="round" />
      </g>
      <g transform="translate(348, 96)">
        <circle r="12.5" fill="rgba(34,211,238,0.09)" stroke="#22d3ee" strokeWidth="1.05" />
        <path d="M0 -7 V7 M-7 0 H7" stroke="#e2e8f0" strokeWidth="0.95" strokeLinecap="round" />
      </g>

      <rect
        x="88"
        y="174"
        width="118"
        height="70"
        rx="5"
        fill="rgba(34,211,238,0.04)"
        stroke="#2dd4bf"
        strokeWidth="0.95"
        opacity="0.82"
      />
      <path
        d="M88 209 H206 M147 174 V244"
        fill="none"
        stroke="#2dd4bf"
        strokeWidth="0.65"
        strokeDasharray="4 5"
        opacity="0.5"
        strokeLinecap="round"
      />

      <g transform="translate(228, 186)" fill="none" strokeWidth="0.9" opacity="0.88">
        <rect x="0" y="0" width="38" height="50" rx="3" stroke="#94a3b8" />
        <path d="M8 16 L30 16 M8 24 L28 24 M8 32 L26 32" stroke="#22d3ee" opacity="0.75" strokeLinecap="round" />
        <path d="M10 40 L22 40" stroke="#64748b" strokeWidth="0.65" opacity="0.7" strokeLinecap="round" />
      </g>

      <text
        x="200"
        y="272"
        textAnchor="middle"
        fill="rgba(203,213,225,0.52)"
        fontSize="8.5"
        fontWeight="700"
        letterSpacing="0.18em"
        fontFamily="Inter, system-ui, sans-serif"
      >
        STUDENTS · COMMUNITIES · CURRICULUM
      </text>
    </svg>
  )
}
