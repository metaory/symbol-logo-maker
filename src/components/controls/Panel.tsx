import { useState, type ReactNode } from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import { cn } from '@/lib/utils'

type Props = {
  title: string
  icon?: ReactNode
  children: ReactNode
  defaultOpen?: boolean
}

export function Panel({ title, icon, children, defaultOpen = true }: Props) {
  const [open, setOpen] = useState(defaultOpen)
  
  return (
    <section className="border-b border-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground hover:bg-muted/50"
      >
        {icon}
        <span className="flex-1 text-left">{title}</span>
        <IconChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="grid gap-3 px-3 pb-3">{children}</div>}
    </section>
  )
}
