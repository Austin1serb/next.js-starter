export function PreviewNav() {
  return (
    <header className="border-border bg-surface border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <a href="#" className="font-display text-foreground text-subtitle">
            Acme
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            <a href="#" className="text-foreground-muted hover:text-foreground text-body-sm transition">
              Product
            </a>
            <a href="#" className="text-foreground-muted hover:text-foreground text-body-sm transition">
              Pricing
            </a>
            <a href="#" className="text-foreground-muted hover:text-foreground text-body-sm transition">
              Docs
            </a>
            <a href="#" className="text-foreground-muted hover:text-foreground text-body-sm transition">
              Changelog
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <a href="#" className="text-link hover:text-link-hover text-body-sm hidden underline-offset-4 hover:underline sm:inline">
            Sign in
          </a>
          <button
            type="button"
            className="bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-ring focus-visible:ring-offset-ring-offset text-body-sm rounded-md px-4 py-2 font-medium transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            Get started
          </button>
        </div>
      </div>
    </header>
  )
}
