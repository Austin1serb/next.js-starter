import createMDX from "@next/mdx"
import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  experimental: {
    useTypeScriptCli: true,
  },
  reactCompiler: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "images.unsplash.com",
    //   },
    // ],
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
}

// MDX

const withMDX = createMDX({
  // add any options here
})

export default withMDX(nextConfig)
