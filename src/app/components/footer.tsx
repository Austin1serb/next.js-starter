import Link from "next/link"
import { SITE_CONFIG, SITE_NAP, SITE_SLUGS } from "@/config/site-config"
import { Socials } from "./social"

const year = new Date().getFullYear()

const socialLinks = [
  {
    href: SITE_NAP.profiles.linkedIn,
    icon: "linkedin",
  },
  {
    href: SITE_NAP.profiles.facebook,
    icon: "facebook",
  },

  {
    href: SITE_NAP.profiles.gbp,
    icon: "google",
  },
  {
    href: SITE_NAP.profiles.instagram,
    icon: "instagram",
  },
]

export const Footer: React.FC = () => {
  return (
    <footer className="bg-background-alt mt-10 overflow-hidden">
      <div className="p-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-12 pt-16 pb-8 md:pt-32 lg:grid-cols-3">
          {/* Navigation Links */}
          <div>
            <h3 className="after:bg-primary relative mb-4 after:absolute after:bottom-0 after:mt-2 after:block after:h-[3px] after:w-12">Navigate</h3>
            <nav className="flex flex-col gap-5">
              <Link href={SITE_SLUGS.home}>Home</Link>
              <Link href={SITE_SLUGS.contact}>Contact</Link>
              <Link href={SITE_SLUGS.services}>Services</Link>
              <Link rel="noopener noreferrer" target="_blank" href={SITE_NAP.googleReviewLink}>
                Write Review
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="h-card">
            <h3 className="after:bg-primary relative mb-4 after:absolute after:bottom-0 after:mt-2 after:block after:h-[3px] after:w-16">Contact</h3>
            <div className="grid grid-cols-1 gap-4">
              <Link href={`tel:${SITE_NAP.phone}`} className="p-tel" aria-label={`Call ${SITE_CONFIG.title} in ${SITE_NAP.city} at ${SITE_NAP.formattedPhone}`}>
                {SITE_NAP.formattedPhone}
              </Link>
              <Link href={`mailto:${SITE_NAP.email}`} className="u-email" aria-label={`Email ${SITE_CONFIG.title} at ${SITE_NAP.email}`}>
                {SITE_NAP.email}
              </Link>
              <Link href={SITE_NAP.profiles.gbp} className="p-adr" target="_blank" rel="noopener noreferrer" aria-label="View our location on Google Maps">
                <span className="p-street-address">{SITE_NAP.address}</span>,<span className="p-locality"> {SITE_NAP.city}</span>,
                <span className="p-region"> {SITE_NAP.state}</span>,<span className="p-postal-code">{SITE_NAP.zipCode}</span>
              </Link>
            </div>
          </div>

          {/* Business Hours Column */}
          <div>
            <h3 className="after:bg-primary relative mb-4 after:absolute after:bottom-0 after:mt-2 after:block after:h-[3px] after:w-16">Hours</h3>

            <div className="flex flex-col gap-2">
              {SITE_NAP.openingHours.map(({ days, hours }) => (
                <p key={days}>
                  <span className="text-nowrap">{days}: </span>
                  <span className="text-nowrap">{hours}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-5 flex justify-center">
          <Socials socialLinks={socialLinks} />
        </div>
        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between border-t border-neutral-600 pt-4 pb-4 lg:flex-row lg:items-end">
          <div className="flex w-fit flex-col items-center lg:items-start lg:justify-between">
            {/* Logo */}
            <div className="h-card flex w-fit items-center">
              {/* <Image src={Logo} alt={`{SITE_CONFIG.title} Kirkland Logo" width={50} height={50} className="u-logo`} /> */}
              <span className="p-name xs:text-[24px] text-xl font-extrabold text-nowrap uppercase italic">{SITE_CONFIG.title}</span>
            </div>

            {/* Copyright */}
            <p className="mt-4 w-full text-center text-base! text-neutral-500 md:mt-0 lg:text-start">
              {year} Copyright © {SITE_CONFIG.title} | Website by
              <Link title="Seattle Web Design & SEO | Serbyte Development" href="https://www.serbyte.net/" className="text-primary font-medium hover:underline">
                {" "}
                Serbyte Development
              </Link>
            </p>
          </div>
          <div className="mt-4 flex w-fit items-center justify-center lg:mt-0">
            <Link title={`Terms of Service | ${SITE_CONFIG.title}`} href="/privacy-policy" className="text-sm! text-nowrap text-neutral-500">
              Privacy Policy{" "}
            </Link>
            <span className="mx-1 text-neutral-500">|</span>
            <Link title={`Privacy Policy | ${SITE_CONFIG.title}`} href="/terms-of-service" className="text-sm! text-nowrap text-neutral-500">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
