declare module "svgstore" {
  export default function svgstore(options: { svgAttrs: Record<string, string>; symbolAttrs: Record<string, string>; copyAttrs: string[] }): {
    add: (id: string, svg: string) => void
    toString: (options: { inline: boolean }) => string
  }
}
