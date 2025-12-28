import { IconSparkles } from '@tabler/icons-react'
import { Panel } from './Panel'
import { ControlRow } from './ControlRow'
import { update, useStore } from '@/state'

export function EffectsControls() {
  const fx = useStore(s => s.effects)
  const set = (v: Partial<typeof fx>) => update('effects', v)
  
  return (
    <Panel title="Effects" icon={<IconSparkles className="size-4" />} defaultOpen={false}>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={fx.glow}
          onChange={e => set({ glow: e.target.checked })}
          className="accent-primary"
        />
        <span className="text-xs">Glow</span>
      </label>
      
      {fx.glow && (
        <div className="grid gap-2 pl-4">
          <ControlRow label="Color" value={fx.glowColor} onChange={v => set({ glowColor: v as string })} type="color" />
          <ControlRow label="Blur" value={fx.glowBlur} onChange={v => set({ glowBlur: v as number })} type="range" min={0} max={50} />
          <ControlRow label="Opacity" value={fx.glowOpacity} onChange={v => set({ glowOpacity: v as number })} type="range" min={0} max={100} />
        </div>
      )}
      
      <label className="flex items-center gap-2 border-t border-border pt-2">
        <input
          type="checkbox"
          checked={fx.shadow}
          onChange={e => set({ shadow: e.target.checked })}
          className="accent-primary"
        />
        <span className="text-xs">Drop Shadow</span>
      </label>
      
      {fx.shadow && (
        <div className="grid gap-2 pl-4">
          <ControlRow label="Color" value={fx.shadowColor} onChange={v => set({ shadowColor: v as string })} type="color" />
          <ControlRow label="Offset X" value={fx.shadowX} onChange={v => set({ shadowX: v as number })} type="range" min={-50} max={50} />
          <ControlRow label="Offset Y" value={fx.shadowY} onChange={v => set({ shadowY: v as number })} type="range" min={-50} max={50} />
          <ControlRow label="Blur" value={fx.shadowBlur} onChange={v => set({ shadowBlur: v as number })} type="range" min={0} max={50} />
          <ControlRow label="Opacity" value={fx.shadowOpacity} onChange={v => set({ shadowOpacity: v as number })} type="range" min={0} max={100} />
        </div>
      )}
    </Panel>
  )
}
