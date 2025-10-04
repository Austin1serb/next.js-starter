import type { NextConfig } from "next"

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
}

export default nextConfig

// MDX
// const withMDX = createMDX({
//   extension: /\.mdx?$/,
//   options: {
//     remarkPlugins: [remarkGfm],
//   },
// })

// export default withMDX(nextConfig)
