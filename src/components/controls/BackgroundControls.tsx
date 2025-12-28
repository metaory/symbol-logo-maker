import { IconSquare } from '@tabler/icons-react'
import { Panel } from './Panel'
import { ControlRow } from './ControlRow'
import { update, useStore, type Shape } from '@/state'
import { Button } from '@/components/ui/button'

const shapes: { value: Shape; label: string }[] = [
  { value: 'rect', label: 'Rect' },
  { value: 'circle', label: 'Circle' },
  { value: 'squircle', label: 'Squircle' }
]

export function BackgroundControls() {
  const bg = useStore(s => s.background)
  const set = (v: Partial<typeof bg>) => update('background', v)
  
  return (
    <Panel title="Background" icon={<IconSquare className="size-4" />}>
      <div className="grid grid-cols-3 gap-1">
        {shapes.map(s => (
          <Button
            key={s.value}
            size="sm"
            variant={bg.shape === s.value ? 'default' : 'outline'}
            onClick={() => set({ shape: s.value })}
          >
            {s.label}
          </Button>
        ))}
      </div>
      
      <ControlRow label="Fill" value={bg.fill} onChange={v => set({ fill: v as string })} type="color" />
      <ControlRow label="Size" value={bg.size} onChange={v => set({ size: v as number })} type="range" min={64} max={2048} step={64} />
      <ControlRow label="Radius" value={bg.radius} onChange={v => set({ radius: v as number })} type="range" min={0} max={256} />
      <ControlRow label="Opacity" value={bg.opacity} onChange={v => set({ opacity: v as number })} type="range" min={0} max={100} />
      
      <div className="border-t border-border pt-2">
        <ControlRow label="Stroke" value={bg.stroke} onChange={v => set({ stroke: v as string })} type="color" />
        <ControlRow label="Stroke Width" value={bg.strokeWidth} onChange={v => set({ strokeWidth: v as number })} type="range" min={0} max={50} />
      </div>
    </Panel>
  )
}
