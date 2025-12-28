import type { State } from '@/state'

const PRESETS_KEY = 'symbol-logo-maker-presets'

export type Preset = {
  name: string
  state: Partial<State>
}

const defaults: Preset[] = [
  {
    name: 'Minimal',
    state: {
      background: { shape: 'circle', fill: '#18181b', radius: 0, strokeWidth: 0, opacity: 100, size: 512, fillType: 'solid', gradientStops: [], gradientAngle: 0, stroke: '#000' },
      symbol: { fill: '#ffffff', strokeWidth: 0, rotation: 0, skewX: 0, skewY: 0, size: 60, opacity: 100, fillType: 'solid', gradientStops: [], stroke: '#000', strokePosition: 'center', strokeDash: 0 },
      effects: { glow: false, shadow: false, glowColor: '#fff', glowBlur: 20, glowOpacity: 50, shadowColor: '#000', shadowX: 0, shadowY: 0, shadowBlur: 0, shadowOpacity: 0 }
    }
  },
  {
    name: 'Rounded',
    state: {
      background: { shape: 'squircle', fill: '#6366f1', radius: 100, strokeWidth: 0, opacity: 100, size: 512, fillType: 'solid', gradientStops: [], gradientAngle: 0, stroke: '#000' },
      symbol: { fill: '#ffffff', strokeWidth: 0, rotation: 0, skewX: 0, skewY: 0, size: 70, opacity: 100, fillType: 'solid', gradientStops: [], stroke: '#000', strokePosition: 'center', strokeDash: 0 }
    }
  },
  {
    name: 'Shadow',
    state: {
      background: { shape: 'squircle', fill: '#f43f5e', radius: 64, strokeWidth: 0, opacity: 100, size: 512, fillType: 'solid', gradientStops: [], gradientAngle: 0, stroke: '#000' },
      effects: { shadow: true, shadowX: 0, shadowY: 12, shadowBlur: 32, shadowColor: '#000000', shadowOpacity: 40, glow: false, glowColor: '#fff', glowBlur: 20, glowOpacity: 50 }
    }
  },
  {
    name: 'Rotated',
    state: {
      background: { shape: 'squircle', fill: '#10b981', radius: 48, strokeWidth: 0, opacity: 100, size: 512, fillType: 'solid', gradientStops: [], gradientAngle: 0, stroke: '#000' },
      symbol: { rotation: 15, skewX: 0, skewY: 0, fill: '#ffffff', strokeWidth: 0, size: 70, opacity: 100, fillType: 'solid', gradientStops: [], stroke: '#000', strokePosition: 'center', strokeDash: 0 }
    }
  }
]

export const getPresets = (): Preset[] => {
  const stored = localStorage.getItem(PRESETS_KEY)
  return stored ? [...defaults, ...JSON.parse(stored)] : defaults
}

export const savePreset = (preset: Preset) => {
  const custom = getPresets().filter(p => !defaults.some(d => d.name === p.name))
  localStorage.setItem(PRESETS_KEY, JSON.stringify([...custom, preset]))
}

export const deletePreset = (name: string) => {
  const custom = getPresets().filter(p => p.name !== name && !defaults.some(d => d.name === p.name))
  localStorage.setItem(PRESETS_KEY, JSON.stringify(custom))
}

export const isDefault = (name: string) => defaults.some(p => p.name === name)
