import React from "react"
import { SvgXml } from "react-native-svg"

export default function StatusDotSvg({ width, height, color }) {
  const xml = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 24" fill="none">
      <path opacity="0.52" d="M20 11.5C20 15.6421 16.6421 19 12.5 19C8.35786 19 5 15.6421 5 11.5C5 7.35786 8.35786 4 12.5 4C16.6421 4 20 7.35786 20 11.5Z" fill="${color}" stroke="${color}" style="fill:${color};fill:color(display-p3 0.7118 0.3525 0.2736);fill-opacity:1;stroke:${color};stroke:color(display-p3 0.7118 0.3525 0.2736);stroke-opacity:1;" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M19 11.5C19 15.0899 16.0899 18 12.5 18C8.91015 18 6 15.0899 6 11.5C6 7.91015 8.91015 5 12.5 5C16.0899 5 19 7.91015 19 11.5Z" fill="${color}" stroke="${color}" style="fill:${color};fill:color(display-p3 0.7118 0.3525 0.2736);fill-opacity:1;stroke:${color};stroke:color(display-p3 0.7118 0.3525 0.2736);stroke-opacity:1;" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `
  return <SvgXml xml={xml} />
}