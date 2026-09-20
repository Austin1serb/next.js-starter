import {
  IconBrandFacebook,
  IconBrandGoogle,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@react-zero-ui/icon-sprite"
import Link from "next/link"
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
    <footer className="mt-10 bg-inverse text-inverse-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,1fr)]">
          {/* Brand */}
          <div className="h-card">
            <span className="block p-name font-display text-inverse-foreground text-subtitle">
              {SITE_CONFIG.title}
            </span>
            <p className="mt-3 max-w-xs text-body-sm text-inverse-foreground/60">
              {SITE_CONFIG.description}
            </p>

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
                      className="flex size-9 items-center justify-center rounded-full text-inverse-foreground/60 transition hover:bg-inverse-foreground/10 hover:text-inverse-foreground"
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
            <p className="font-mono text-caption text-inverse-foreground/60 uppercase tracking-wider">
              Navigate
            </p>
            <ul className="mt-4 space-y-2">
              {navigateLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    {...(link.external
                      ? { target: "_blank", rel: "nofollow noopener noreferrer" }
                      : {})}
                    className="text-body-sm text-inverse-foreground/70 transition hover:text-inverse-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact (h-card microformats preserved) */}
          <div className="h-card">
            <p className="font-mono text-caption text-inverse-foreground/60 uppercase tracking-wider">
              Contact
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href={`tel:${SITE_NAP.phone}`}
                  className="p-tel text-body-sm text-inverse-foreground/70 transition hover:text-inverse-foreground"
                  aria-label={`Call ${SITE_CONFIG.title} in ${SITE_NAP.city} at ${SITE_NAP.formattedPhone}`}
                >
                  {SITE_NAP.formattedPhone}
                </Link>
              </li>
              <li>
                <Link
                  href={`mailto:${SITE_NAP.email}`}
                  className="u-email text-body-sm text-inverse-foreground/70 transition hover:text-inverse-foreground"
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
                  className="block p-adr text-body-sm text-inverse-foreground/70 leading-relaxed transition hover:text-inverse-foreground"
                >
                  <span className="p-street-address">{SITE_NAP.address}</span>
                  <br />
                  <span className="p-locality">{SITE_NAP.city}</span>,{" "}
                  <span className="p-region">{SITE_NAP.stateCode}</span>{" "}
                  <span className="p-postal-code">{SITE_NAP.zipCode}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <p className="font-mono text-caption text-inverse-foreground/60 uppercase tracking-wider">
              Hours
            </p>
            <ul className="mt-4 space-y-2">
              {SITE_NAP.openingHours.map(({ days, hours }) => (
                <li
                  key={days}
                  className="flex justify-between gap-3 text-body-sm text-inverse-foreground/70"
                >
                  <span className="text-nowrap">{days}</span>
                  <span className="text-nowrap text-inverse-foreground/90">{hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col gap-4 border-border/20 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-caption text-inverse-foreground/50">
            © {year} {SITE_CONFIG.title} · Website by{" "}
            <Link
              href="https://www.serbyte.net/"
              title="Seattle Web Design & SEO | Serbyte Development"
              target="_blank"
              rel="noopener noreferrer"
              className="text-inverse-foreground/70 underline-offset-4 hover:text-inverse-foreground hover:underline"
            >
              Serbyte Development
            </Link>
          </p>

          <div className="flex items-center gap-4">
            <Link
              href={SITE_SLUGS.privacy}
              title={`Privacy Policy | ${SITE_CONFIG.title}`}
              className="text-caption text-inverse-foreground/60 transition hover:text-inverse-foreground"
            >
              Privacy Policy
            </Link>
            <span aria-hidden className="text-inverse-foreground/30">
              ·
            </span>
            <Link
              href={SITE_SLUGS.terms}
              title={`Terms of Service | ${SITE_CONFIG.title}`}
              className="text-caption text-inverse-foreground/60 transition hover:text-inverse-foreground"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
