// scripts/scan-icons.ts
import fs from "fs"
import path from "path"
import * as babel from "@babel/core"
import traverse from "@babel/traverse"
import * as t from "@babel/types"

const iconNames = new Set()

function walk(dir) {
  for (const file of fs.readdirSync(dir)) {
    const full = path.join(dir, file)
    if (fs.statSync(full).isDirectory()) {
      walk(full)
    } else if (full.endsWith(".tsx")) {
      const code = fs.readFileSync(full, "utf8")
      const ast = babel.parseSync(code, {
        filename: full,
        presets: ["@babel/preset-typescript", "@babel/preset-react"],
        plugins: ["jsx"],
        sourceType: "module",
      })
      if (!ast) continue

      traverse(ast, {
        JSXElement(path) {
          const opening = path.node.openingElement
          const name = opening.name
          if (!t.isJSXIdentifier(name) || name.name !== "Icon") return

          for (const attr of opening.attributes) {
            if (t.isJSXAttribute(attr) && t.isJSXIdentifier(attr.name, { name: "name" }) && t.isStringLiteral(attr.value)) {
              iconNames.add(attr.value.value)
            }
          }
        },
      })
    }
  }
}

walk("app") // or "src" or whatever your root is

const output = [...iconNames].sort()
fs.writeFileSync("scripts/used-icons.json", JSON.stringify(output, null, 2))
console.log(`✅ Found ${output.length} used icons`)
