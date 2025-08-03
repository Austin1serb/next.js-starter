export default {
  webpack(config, { dev }) {
    if (!dev) {
      config.plugins.push({
        apply(compiler) {
          compiler.hooks.beforeCompile.tapPromise(
            "SpriteBuild",
            () => import("./scripts/build-sprite.mjs") // works in ESM
          )
        },
      })
    }
    return config
  },
}
