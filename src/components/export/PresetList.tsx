import { useState } from 'react'
import { IconPlus, IconTrash } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getPresets, savePreset, deletePreset, isDefault } from '@/lib/presets'
import { getState, loadState } from '@/state'

export function PresetList() {
  const [presets, setPresets] = useState(getPresets)
  const [name, setName] = useState('')
  
  const refresh = () => setPresets(getPresets())
  
  const handleSave = () => {
    if (!name.trim()) return
    savePreset({ name: name.trim(), state: getState() })
    setName('')
    refresh()
  }
  
  const handleLoad = (state: Parameters<typeof loadState>[0]) => loadState(state)
  
  const handleDelete = (n: string) => {
    deletePreset(n)
    refresh()
  }
  
  return (
    <section className="grid gap-2 border-t border-border pt-3">
      <h3 className="text-xs font-medium text-muted-foreground">Presets</h3>
      <div className="grid gap-1">
        {presets.map(p => (
          <div key={p.name} className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              className="flex-1 justify-start text-xs"
              onClick={() => handleLoad(p.state)}
            >
              {p.name}
            </Button>
            {!isDefault(p.name) && (
              <Button size="sm" variant="ghost" onClick={() => handleDelete(p.name)}>
                <IconTrash className="size-3" />
              </Button>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-1">
        <Input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Preset name"
          className="flex-1"
          onKeyDown={e => e.key === 'Enter' && handleSave()}
        />
        <Button size="sm" variant="outline" onClick={handleSave}>
          <IconPlus className="size-4" />
        </Button>
      </div>
    </section>
  )
}
