export function PreviewNav() {
  return (
    <header className="border-border border-b bg-surface">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <a href="#" className="font-display text-foreground text-subtitle">
            Acme
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#"
              className="text-body-sm text-muted-foreground transition hover:text-foreground"
            >
              Product
            </a>
            <a
              href="#"
              className="text-body-sm text-muted-foreground transition hover:text-foreground"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-body-sm text-muted-foreground transition hover:text-foreground"
            >
              Docs
            </a>
            <a
              href="#"
              className="text-body-sm text-muted-foreground transition hover:text-foreground"
            >
              Changelog
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#"
            className="hidden text-body-sm text-primary underline-offset-4 hover:text-primary/90 hover:underline sm:inline"
          >
            Sign in
          </a>
          <button type="button" className="bg-primary text-primary-foreground hover:bg-primary/90">
            Get started
          </button>
        </div>
      </div>
    </header>
  )
}
