import { ControlsPanel } from '@/components/controls/ControlsPanel'
import { PreviewCanvas } from '@/components/preview/Canvas'
import { ExportPanel } from '@/components/export/ExportPanel'

export function App() {
  return (
    <main className="grid h-dvh grid-cols-[280px_1fr_240px] grid-rows-[auto_1fr] overflow-hidden bg-background">
      <header className="col-span-3 flex items-center gap-3 border-b border-border px-4 py-2">
        <div className="size-6 rounded-md bg-primary" />
        <h1 className="text-sm font-semibold tracking-tight">Symbol Logo Maker</h1>
      </header>
      <ControlsPanel />
      <PreviewCanvas />
      <ExportPanel />
    </main>
  )
}

export default App
