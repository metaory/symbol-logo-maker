import { useSyncExternalStore } from 'react'

const STORAGE_KEY = 'symbol-logo-maker-state'

export type InputMode = 'char' | 'icon'
export type Shape = 'rect' | 'circle' | 'squircle'
export type PreviewMode = 'transparent' | 'light' | 'dark' | 'checkerboard'
export type Align = 'start' | 'center' | 'end'
export type StrokePosition = 'inside' | 'center' | 'outside'

export type State = {
  input: {
    mode: InputMode
    char: string
    font: string
    size: number
    weight: number
    icon: string
    iconSvg: string
  }
  background: {
    shape: Shape
    fill: string
    fillType: 'solid' | 'gradient'
    gradientStops: string[]
    gradientAngle: number
    stroke: string
    strokeWidth: number
    size: number
    radius: number
    opacity: number
  }
  symbol: {
    fill: string
    fillType: 'solid' | 'gradient'
    gradientStops: string[]
    stroke: string
    strokeWidth: number
    strokePosition: StrokePosition
    strokeDash: number
    size: number
    rotation: number
    skewX: number
    skewY: number
    opacity: number
  }
  effects: {
    glow: boolean
    glowColor: string
    glowBlur: number
    glowOpacity: number
    shadow: boolean
    shadowX: number
    shadowY: number
    shadowBlur: number
    shadowColor: string
    shadowOpacity: number
  }
  layout: {
    padding: number
    alignH: Align
    alignV: Align
  }
  preview: {
    mode: PreviewMode
    zoom: number
  }
}

const defaults: State = {
  input: {
    mode: 'char',
    char: 'A',
    font: 'sans-serif',
    size: 100,
    weight: 600,
    icon: '',
    iconSvg: ''
  },
  background: {
    shape: 'squircle',
    fill: '#6366f1',
    fillType: 'solid',
    gradientStops: ['#6366f1', '#8b5cf6'],
    gradientAngle: 135,
    stroke: '#4f46e5',
    strokeWidth: 0,
    size: 512,
    radius: 80,
    opacity: 100
  },
  symbol: {
    fill: '#ffffff',
    fillType: 'solid',
    gradientStops: ['#ffffff', '#e0e0e0'],
    stroke: '#000000',
    strokeWidth: 0,
    strokePosition: 'center',
    strokeDash: 0,
    size: 70,
    rotation: 0,
    skewX: 0,
    skewY: 0,
    opacity: 100
  },
  effects: {
    glow: false,
    glowColor: '#ffffff',
    glowBlur: 20,
    glowOpacity: 50,
    shadow: true,
    shadowX: 0,
    shadowY: 8,
    shadowBlur: 24,
    shadowColor: '#000000',
    shadowOpacity: 30
  },
  layout: {
    padding: 0,
    alignH: 'center',
    alignV: 'center'
  },
  preview: {
    mode: 'checkerboard',
    zoom: 100
  }
}

const load = (): State => {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return structuredClone(defaults)
  return { ...structuredClone(defaults), ...JSON.parse(stored) }
}

const listeners = new Set<() => void>()
let state = load()

const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
const notify = () => listeners.forEach(fn => fn())

export const store = new Proxy(state, {
  get: (target, prop) => target[prop as keyof State],
  set: (target, prop, value) => {
    target[prop as keyof State] = value
    save()
    notify()
    return true
  }
})

export const update = <K extends keyof State>(section: K, values: Partial<State[K]>) => {
  store[section] = { ...store[section], ...values }
}

export const reset = () => {
  state = structuredClone(defaults)
  Object.assign(store, state)
  save()
  notify()
}

export const loadState = (newState: Partial<State>) => {
  Object.entries(newState).forEach(([key, value]) => {
    const k = key as keyof State
    Object.assign(store[k], value)
  })
}

export const useStore = <T>(selector: (s: State) => T): T => {
  return useSyncExternalStore(
    cb => { listeners.add(cb); return () => listeners.delete(cb) },
    () => selector(store as State)
  )
}

export const getState = () => store as State
