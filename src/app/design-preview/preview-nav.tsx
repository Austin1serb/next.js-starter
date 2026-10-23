export function PreviewNav() {
  return (
    <header className="border-border bg-surface border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <a href="#" className="font-display text-foreground text-subtitle">
            Acme
          </a>
          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#"
              className="text-body-sm text-muted-foreground hover:text-foreground transition"
            >
              Product
            </a>
            <a
              href="#"
              className="text-body-sm text-muted-foreground hover:text-foreground transition"
            >
              Pricing
            </a>
            <a
              href="#"
              className="text-body-sm text-muted-foreground hover:text-foreground transition"
            >
              Docs
            </a>
            <a
              href="#"
              className="text-body-sm text-muted-foreground hover:text-foreground transition"
            >
              Changelog
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-body-sm text-primary hover:text-primary/90 hidden underline-offset-4 hover:underline sm:inline"
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
