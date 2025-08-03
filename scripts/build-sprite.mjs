// scripts/build-sprite.mjs
import fs from "fs"
import path from "path"
import svgstore from "svgstore"

// absolute path to the raw SVG folder
const iconsDir = "node_modules/lucide-static/icons"
const store = svgstore({
  svgAttrs: true,
  symbolAttrs: true,
  copyAttrs: ["width", "height", "viewBox", "fill", "stroke", "stroke-width", "stroke-linecap", "stroke-linejoin", "class", "style"],
}) // will wrap everything in <svg> + <symbol>

for (const file of fs.readdirSync(iconsDir)) {
  if (!file.endsWith(".svg")) continue

  const id = file.replace(".svg", "") // mail
  const svg = fs.readFileSync(path.join(iconsDir, file), "utf8")

  // svg already contains viewBox, stroke, etc. → no extra attrs needed
  store.add(id, svg)
}

fs.mkdirSync("public", { recursive: true })
fs.writeFileSync("public/icons.svg", store.toString({ inline: false }))

console.log("✅  public/icons.svg generated from raw SVGs")
