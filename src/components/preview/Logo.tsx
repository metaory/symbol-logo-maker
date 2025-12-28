import { useStore, type State, type Align } from '@/state'

const getShape = (shape: State['background']['shape'], size: number, radius: number) => {
  const r = Math.min(radius, size / 2)
  return shape === 'circle'
    ? <circle cx={size/2} cy={size/2} r={size/2} />
    : <rect x={0} y={0} width={size} height={size} rx={shape === 'squircle' ? r : 0} />
}

const textAnchor = { start: 'start', center: 'middle', end: 'end' } as const
const baseline = { start: 'hanging', center: 'central', end: 'auto' } as const

const getPos = (align: Align, size: number, padding: number) =>
  align === 'start' ? padding : align === 'end' ? size - padding : size / 2

const parseIconPaths = (svg: string) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(svg, 'image/svg+xml')
  const svgEl = doc.querySelector('svg')
  if (!svgEl) return { paths: '', size: 24 }
  const viewBox = svgEl.getAttribute('viewBox') || '0 0 24 24'
  const size = parseFloat(viewBox.split(' ')[2]) || 24
  // Strip fill attrs and filter to only renderable elements
  const allowed = ['path', 'circle', 'rect', 'ellipse', 'line', 'polyline', 'polygon', 'g']
  const paths = Array.from(svgEl.querySelectorAll(allowed.join(',')))
    .map(el => { el.removeAttribute('fill'); return el.outerHTML })
    .join('')
  return { paths, size }
}

export function Logo() {
  const bg = useStore(s => s.background)
  const symbol = useStore(s => s.symbol)
  const input = useStore(s => s.input)
  const effects = useStore(s => s.effects)
  const layout = useStore(s => s.layout)
  
  const size = bg.size
  const symbolSize = (symbol.size / 100) * (size - layout.padding * 2)
  const fontSize = (input.size / 100) * symbolSize
  
  const bgFill = bg.fillType === 'gradient' ? 'url(#bgGradient)' : bg.fill
  const symbolFill = symbol.fillType === 'gradient' ? 'url(#symbolGradient)' : symbol.fill
  const filterId = (effects.glow || effects.shadow) ? 'effects' : undefined

  const cx = getPos(layout.alignH, size, layout.padding)
  const cy = getPos(layout.alignV, size, layout.padding)
  
  const transform = `rotate(${symbol.rotation} ${cx} ${cy}) skewX(${symbol.skewX}) skewY(${symbol.skewY})`

  const icon = input.iconSvg ? parseIconPaths(input.iconSvg) : null

  return (
    <svg
      id="logo-svg"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {bg.fillType === 'gradient' && (
          <linearGradient id="bgGradient" gradientTransform={`rotate(${bg.gradientAngle})`}>
            {bg.gradientStops.map((color, i) => (
              <stop key={i} offset={`${(i / (bg.gradientStops.length - 1)) * 100}%`} stopColor={color} />
            ))}
          </linearGradient>
        )}
        {symbol.fillType === 'gradient' && (
          <linearGradient id="symbolGradient" gradientUnits="userSpaceOnUse">
            {symbol.gradientStops.map((color, i) => (
              <stop key={i} offset={`${(i / (symbol.gradientStops.length - 1)) * 100}%`} stopColor={color} />
            ))}
          </linearGradient>
        )}
        {(effects.glow || effects.shadow) && (
          <filter id="effects" x="-50%" y="-50%" width="200%" height="200%">
            {effects.shadow && (
              <feDropShadow
                dx={effects.shadowX}
                dy={effects.shadowY}
                stdDeviation={effects.shadowBlur / 2}
                floodColor={effects.shadowColor}
                floodOpacity={effects.shadowOpacity / 100}
              />
            )}
            {effects.glow && (
              <>
                <feGaussianBlur in="SourceAlpha" stdDeviation={effects.glowBlur / 2} result="blur" />
                <feFlood floodColor={effects.glowColor} floodOpacity={effects.glowOpacity / 100} result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </>
            )}
          </filter>
        )}
      </defs>

      <g fill={bgFill} stroke={bg.stroke} strokeWidth={bg.strokeWidth} opacity={bg.opacity / 100}>
        {getShape(bg.shape, size, bg.radius)}
      </g>

      <g
        opacity={symbol.opacity / 100}
        transform={transform}
        filter={filterId ? `url(#${filterId})` : undefined}
      >
        {input.mode === 'char' ? (
          <text
            x={cx}
            y={cy}
            fill={symbolFill}
            stroke={symbol.strokeWidth > 0 ? symbol.stroke : undefined}
            strokeWidth={symbol.strokeWidth > 0 ? symbol.strokeWidth : undefined}
            fontSize={fontSize}
            fontFamily={input.font}
            fontWeight={input.weight}
            textAnchor={textAnchor[layout.alignH]}
            dominantBaseline={baseline[layout.alignV]}
          >
            {input.char}
          </text>
        ) : icon ? (
          <g
            transform={`translate(${cx - symbolSize/2}, ${cy - symbolSize/2}) scale(${symbolSize / icon.size})`}
            fill={symbolFill}
            stroke={symbol.strokeWidth > 0 ? symbol.stroke : undefined}
            strokeWidth={symbol.strokeWidth > 0 ? symbol.strokeWidth : undefined}
            dangerouslySetInnerHTML={{ __html: icon.paths }}
          />
        ) : (
          <text
            x={cx}
            y={cy}
            fill={symbolFill}
            fontSize={symbolSize * 0.8}
            textAnchor="middle"
            dominantBaseline="central"
          >
            ★
          </text>
        )}
      </g>
    </svg>
  )
}
