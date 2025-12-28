import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type Props = {
  label: string
  value: number | string
  onChange: (v: number | string) => void
  type?: 'text' | 'number' | 'range' | 'color'
  min?: number
  max?: number
  step?: number
  className?: string
}

export function ControlRow({ label, value, onChange, type = 'number', min, max, step = 1, className }: Props) {
  const isColor = type === 'color'
  const isRange = type === 'range'
  
  return (
    <label className={cn('grid grid-cols-[1fr_auto] items-center gap-2', className)}>
      <span className="text-xs text-muted-foreground">{label}</span>
      {isColor ? (
        <input
          type="color"
          value={value as string}
          onChange={e => onChange(e.target.value)}
          className="size-7 cursor-pointer rounded border-0 bg-transparent p-0"
        />
      ) : isRange ? (
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value as number}
            onChange={e => onChange(Number(e.target.value))}
            className="w-20 accent-primary"
          />
          <span className="w-8 text-right text-xs tabular-nums text-muted-foreground">{value}</span>
        </div>
      ) : (
        <Input
          type={type}
          value={value}
          onChange={e => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
          min={min}
          max={max}
          step={step}
          className="w-20 text-right"
        />
      )}
    </label>
  )
}
