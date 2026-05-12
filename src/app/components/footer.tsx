import Link from "next/link"
import { IconBrandFacebook, IconBrandInstagram, IconBrandLinkedin, IconBrandGoogle } from "@react-zero-ui/icon-sprite"
import { SITE_CONFIG, SITE_NAP, SITE_SLUGS } from "@/config/site-config"

const year = new Date().getFullYear()

const socials = [
  {
    label: "LinkedIn",
    href: SITE_NAP.profiles.linkedIn,
    icon: IconBrandLinkedin,
  },
  {
    label: "Facebook",
    href: SITE_NAP.profiles.facebook,
    icon: IconBrandFacebook,
  },

  {
    label: "Google",
    href: SITE_NAP.profiles.gbp,
    icon: IconBrandGoogle,
  },
  {
    label: "Instagram",
    href: SITE_NAP.profiles.instagram,
    icon: IconBrandInstagram,
  },
]

const navigateLinks: { label: string; href: string; external?: boolean }[] = [
  { label: "Home", href: SITE_SLUGS.home },
  { label: "About", href: SITE_SLUGS.about },
  { label: "Services", href: SITE_SLUGS.allServices },
  { label: "Contact", href: SITE_SLUGS.contact },
  { label: "Write a Review", href: SITE_NAP.googleReviewLink, external: true },
]

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-inverse text-foreground-inverse mt-10">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          {/* Brand */}
          <div className="h-card">
            <span className="p-name font-display text-subtitle text-foreground-inverse block">{SITE_CONFIG.title}</span>
            <p className="text-body-sm text-foreground-inverse/60 mt-3 max-w-xs">{SITE_CONFIG.description}</p>

            {socials.length > 0 && (
              <div className="mt-6 flex items-center gap-2">
                {socials.map((social) => {
                  const Icon = social.icon
                  return (
                    <Link
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      title={social.label}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="text-foreground-inverse/60 hover:bg-foreground-inverse/10 hover:text-foreground-inverse flex size-9 items-center justify-center rounded-full transition"
                    >
                      <Icon size={16} strokeWidth={1} />
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Navigate */}
          <div>
            <p className="text-caption text-foreground-inverse/60 font-mono tracking-wider uppercase">Navigate</p>
            <ul className="mt-4 space-y-2">
              {navigateLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    {...(link.external ? { target: "_blank", rel: "nofollow noopener noreferrer" } : {})}
                    className="text-body-sm text-foreground-inverse/70 hover:text-foreground-inverse transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (h-card microformats preserved) */}
          <div className="h-card">
            <p className="text-caption text-foreground-inverse/60 font-mono tracking-wider uppercase">Contact</p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href={`tel:${SITE_NAP.phone}`}
                  className="p-tel text-body-sm text-foreground-inverse/70 hover:text-foreground-inverse transition"
                  aria-label={`Call ${SITE_CONFIG.title} in ${SITE_NAP.city} at ${SITE_NAP.formattedPhone}`}
                >
                  {SITE_NAP.formattedPhone}
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${SITE_NAP.email}`}
                  className="u-email text-body-sm text-foreground-inverse/70 hover:text-foreground-inverse transition"
                  aria-label={`Email ${SITE_CONFIG.title} at ${SITE_NAP.email}`}
                >
                  {SITE_NAP.email}
                </Link>
              </li>
              <li>
                <Link
                  href={SITE_NAP.profiles.gbp}
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                  aria-label="View our location on Google Maps"
                  className="p-adr text-body-sm text-foreground-inverse/70 hover:text-foreground-inverse block leading-relaxed transition"
                >
                  <span className="p-street-address">{SITE_NAP.address}</span>
                  <br />
                  <span className="p-locality">{SITE_NAP.city}</span>, <span className="p-region">{SITE_NAP.stateCode}</span>{" "}
                  <span className="p-postal-code">{SITE_NAP.zipCode}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <p className="text-caption text-foreground-inverse/60 font-mono tracking-wider uppercase">Hours</p>
            <ul className="mt-4 space-y-2">
              {SITE_NAP.openingHours.map(({ days, hours }) => (
                <li key={days} className="text-body-sm text-foreground-inverse/70 flex justify-between gap-3">
                  <span className="text-nowrap">{days}</span>
                  <span className="text-foreground-inverse/90 text-nowrap">{hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-border-strong/20 mt-12 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-foreground-inverse/50">
            © {year} {SITE_CONFIG.title} · Website by{" "}
            <Link
              href="https://www.serbyte.net/"
              title="Seattle Web Design & SEO | Serbyte Development"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground-inverse/70 hover:text-foreground-inverse underline-offset-4 hover:underline"
            >
              Serbyte Development
            </Link>
          </p>

          <div className="flex items-center gap-4">
            <Link
              href={SITE_SLUGS.privacy}
              title={`Privacy Policy | ${SITE_CONFIG.title}`}
              className="text-caption text-foreground-inverse/60 hover:text-foreground-inverse transition"
            >
              Privacy Policy
            </Link>
            <span aria-hidden className="text-foreground-inverse/30">
              ·
            </span>
            <Link
              href={SITE_SLUGS.terms}
              title={`Terms of Service | ${SITE_CONFIG.title}`}
              className="text-caption text-foreground-inverse/60 hover:text-foreground-inverse transition"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
