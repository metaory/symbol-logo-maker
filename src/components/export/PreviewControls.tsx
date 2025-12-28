import { IconSquare, IconSun, IconMoon, IconGridDots } from '@tabler/icons-react'
import { update, useStore, type PreviewMode } from '@/state'
import { Button } from '@/components/ui/button'

const modes: { value: PreviewMode; icon: typeof IconSquare }[] = [
  { value: 'transparent', icon: IconSquare },
  { value: 'light', icon: IconSun },
  { value: 'dark', icon: IconMoon },
  { value: 'checkerboard', icon: IconGridDots }
]

const zooms = [25, 50, 75, 100, 150, 200]

export function PreviewControls() {
  const preview = useStore(s => s.preview)
  const set = (v: Partial<typeof preview>) => update('preview', v)
  
  return (
    <section className="grid gap-2">
      <h3 className="text-xs font-medium text-muted-foreground">Preview</h3>
      <div className="grid grid-cols-4 gap-1">
        {modes.map(m => (
          <Button
            key={m.value}
            size="sm"
            variant={preview.mode === m.value ? 'default' : 'outline'}
            onClick={() => set({ mode: m.value })}
            title={m.value}
          >
            <m.icon className="size-4" />
          </Button>
        ))}
      </div>
      <label className="grid gap-1">
        <span className="text-xs text-muted-foreground">Zoom</span>
        <select
          value={preview.zoom}
          onChange={e => set({ zoom: Number(e.target.value) })}
          className="h-7 rounded-md border border-input bg-input/20 px-2 text-xs"
        >
          {zooms.map(z => <option key={z} value={z}>{z}%</option>)}
        </select>
      </label>
    </section>
  )
}
