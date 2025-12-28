const getSvgElement = () => document.getElementById('logo-svg') as SVGSVGElement | null

const serialize = (svg: SVGSVGElement) => {
  const clone = svg.cloneNode(true) as SVGSVGElement
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  return new XMLSerializer().serializeToString(clone)
}

export const downloadSvg = () => {
  const svg = getSvgElement()
  if (!svg) return
  
  const blob = new Blob([serialize(svg)], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'logo.svg'
  a.click()
  URL.revokeObjectURL(url)
}

export const copySvg = async () => {
  const svg = getSvgElement()
  if (!svg) return
  
  await navigator.clipboard.writeText(serialize(svg))
}

export const downloadPng = (size: number) => {
  const svg = getSvgElement()
  if (!svg) return
  
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return
  
  const img = new Image()
  const blob = new Blob([serialize(svg)], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  
  img.onload = () => {
    ctx.drawImage(img, 0, 0, size, size)
    URL.revokeObjectURL(url)
    
    const a = document.createElement('a')
    a.href = canvas.toDataURL('image/png')
    a.download = `logo-${size}.png`
    a.click()
  }
  img.src = url
}
