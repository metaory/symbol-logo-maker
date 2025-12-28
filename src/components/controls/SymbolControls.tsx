import { IconLetterA } from '@tabler/icons-react'
import { Panel } from './Panel'
import { ControlRow } from './ControlRow'
import { update, useStore } from '@/state'

export function SymbolControls() {
  const symbol = useStore(s => s.symbol)
  const set = (v: Partial<typeof symbol>) => update('symbol', v)
  
  return (
    <Panel title="Symbol" icon={<IconLetterA className="size-4" />}>
      <ControlRow label="Fill" value={symbol.fill} onChange={v => set({ fill: v as string })} type="color" />
      <ControlRow label="Size" value={symbol.size} onChange={v => set({ size: v as number })} type="range" min={10} max={200} />
      <ControlRow label="Opacity" value={symbol.opacity} onChange={v => set({ opacity: v as number })} type="range" min={0} max={100} />
      
      <div className="border-t border-border pt-2">
        <ControlRow label="Stroke" value={symbol.stroke} onChange={v => set({ stroke: v as string })} type="color" />
        <ControlRow label="Stroke Width" value={symbol.strokeWidth} onChange={v => set({ strokeWidth: v as number })} type="range" min={0} max={50} />
      </div>
      
      <div className="border-t border-border pt-2">
        <ControlRow label="Rotation" value={symbol.rotation} onChange={v => set({ rotation: v as number })} type="range" min={0} max={360} />
        <ControlRow label="Skew X" value={symbol.skewX} onChange={v => set({ skewX: v as number })} type="range" min={-45} max={45} />
        <ControlRow label="Skew Y" value={symbol.skewY} onChange={v => set({ skewY: v as number })} type="range" min={-45} max={45} />
      </div>
    </Panel>
  )
}
