import { InputControls } from './InputControls'
import { BackgroundControls } from './BackgroundControls'
import { SymbolControls } from './SymbolControls'
import { EffectsControls } from './EffectsControls'
import { LayoutControls } from './LayoutControls'

export function ControlsPanel() {
  return (
    <aside className="panel-scroll overflow-y-auto overflow-x-hidden border-r border-border bg-card">
      <InputControls />
      <BackgroundControls />
      <SymbolControls />
      <EffectsControls />
      <LayoutControls />
    </aside>
  )
}
