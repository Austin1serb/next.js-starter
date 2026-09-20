import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@react-zero-ui/icon-sprite"

const columns: { heading: string; links: string[] }[] = [
  { heading: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
  { heading: "Company", links: ["About", "Blog", "Careers", "Press"] },
  { heading: "Resources", links: ["Docs", "Guides", "Support", "Status"] },
  { heading: "Legal", links: ["Privacy", "Terms", "Cookies", "DPA"] },
]

const socials: { label: string; icon: typeof IconBrandGithub }[] = [
  { label: "GitHub", icon: IconBrandGithub },
  { label: "Twitter", icon: IconBrandTwitter },
  { label: "LinkedIn", icon: IconBrandLinkedin },
  { label: "YouTube", icon: IconBrandYoutube },
]

export function PreviewFooter() {
  return (
    <footer className="bg-surface-inverse text-foreground-inverse">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(4,1fr)]">
          <div>
            <p className="font-display text-foreground-inverse text-subtitle">Acme</p>
            <p className="mt-3 max-w-xs text-body-sm text-foreground-inverse/60">
              A Next.js starter built around semantic design tokens you can actually live with.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.heading}>
              <p className="font-mono text-caption text-foreground-inverse/60 uppercase tracking-wider">
                {column.heading}
              </p>
              <ul className="mt-4 space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-body-sm text-foreground-inverse/70 transition hover:text-foreground-inverse"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-border-strong/20 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-foreground-inverse/50">
            © 2026 Acme, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="flex size-8 items-center justify-center rounded-full text-foreground-inverse/60 transition hover:bg-foreground-inverse/10 hover:text-foreground-inverse"
                >
                  <Icon size={16} />
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
