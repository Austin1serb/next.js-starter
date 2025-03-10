import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
    ],
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
