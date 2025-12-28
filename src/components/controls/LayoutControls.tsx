import { IconLayoutGrid } from '@tabler/icons-react'
import { Panel } from './Panel'
import { ControlRow } from './ControlRow'
import { update, useStore, type Align } from '@/state'
import { Button } from '@/components/ui/button'

const aligns: Align[] = ['start', 'center', 'end']

export function LayoutControls() {
  const layout = useStore(s => s.layout)
  const set = (v: Partial<typeof layout>) => update('layout', v)
  
  return (
    <Panel title="Layout" icon={<IconLayoutGrid className="size-4" />} defaultOpen={false}>
      <ControlRow label="Padding" value={layout.padding} onChange={v => set({ padding: v as number })} type="range" min={0} max={200} />
      
      <div className="grid gap-1">
        <span className="text-xs text-muted-foreground">Horizontal</span>
        <div className="grid grid-cols-3 gap-1">
          {aligns.map(a => (
            <Button key={a} size="sm" variant={layout.alignH === a ? 'default' : 'outline'} onClick={() => set({ alignH: a })}>
              {a}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="grid gap-1">
        <span className="text-xs text-muted-foreground">Vertical</span>
        <div className="grid grid-cols-3 gap-1">
          {aligns.map(a => (
            <Button key={a} size="sm" variant={layout.alignV === a ? 'default' : 'outline'} onClick={() => set({ alignV: a })}>
              {a}
            </Button>
          ))}
        </div>
      </div>
    </Panel>
  )
}
