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
//     // Turbopack requires MDX options to be serializable; pass the plugin by
//     // module path instead of the function reference.
//     // eslint-disable-next-line @typescript-eslint/no-var-requires
//     remarkPlugins: [require.resolve("remark-gfm")],
//   },
// })

// export default withMDX(nextConfig)
