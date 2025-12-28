import { useStore } from '@/state'
import { Logo } from './Logo'
import { cn } from '@/lib/utils'

const bgModes = {
  transparent: '',
  light: 'bg-white',
  dark: 'bg-zinc-900',
  checkerboard: 'checkerboard'
}

export function PreviewCanvas() {
  const mode = useStore(s => s.preview.mode)
  const zoom = useStore(s => s.preview.zoom)
  
  return (
    <div className="grid place-items-center overflow-hidden bg-muted/30">
      <div
        className={cn('grid place-items-center rounded-lg', bgModes[mode])}
        style={{ transform: `scale(${zoom / 100})` }}
      >
        <Logo />
      </div>
    </div>
  )
}
