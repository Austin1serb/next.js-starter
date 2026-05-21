import type { NextConfig } from "next"
import createMDX from "@next/mdx"

const nextConfig: NextConfig = {
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

const withMDX = createMDX({})

export default withMDX(nextConfig)
