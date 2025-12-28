import { IconDownload, IconCopy, IconPhoto } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { update, useStore } from '@/state'
import { downloadSvg, downloadPng, copySvg } from '@/lib/export'
import { PresetList } from './PresetList'
import { PreviewControls } from './PreviewControls'

const pngSizes = [128, 256, 512, 1024] as const

export function ExportPanel() {
  const size = useStore(s => s.background.size)
  
  return (
    <aside className="panel-scroll grid content-start gap-4 overflow-y-auto border-l border-border bg-card p-3">
      <PreviewControls />
      
      <section className="grid gap-2">
        <h3 className="text-xs font-medium text-muted-foreground">Export SVG</h3>
        <div className="grid grid-cols-2 gap-2">
          <Button size="sm" variant="outline" onClick={downloadSvg}>
            <IconDownload className="size-4" />
            Download
          </Button>
          <Button size="sm" variant="outline" onClick={copySvg}>
            <IconCopy className="size-4" />
            Copy
          </Button>
        </div>
      </section>

      <section className="grid gap-2">
        <h3 className="text-xs font-medium text-muted-foreground">Export PNG</h3>
        <div className="grid grid-cols-2 gap-2">
          {pngSizes.map(s => (
            <Button key={s} size="sm" variant="outline" onClick={() => downloadPng(s)}>
              <IconPhoto className="size-4" />
              {s}px
            </Button>
          ))}
        </div>
      </section>

      <PresetList />
    </aside>
  )
}
