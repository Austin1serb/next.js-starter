import Link from "next/link"
import { siteConfig, siteNAP, siteSlugs } from "@/config/siteConfig"
import { SocialLinks } from "./SocialLinks"

const year = new Date().getFullYear()

export const Footer: React.FC = () => {
  return (
    <footer className="footer bg-background-alt text-foreground-alt mt-10 overflow-hidden">
      <div className="p-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-12 pt-16 pb-8 md:pt-32 lg:grid-cols-3">
          {/* Navigation Links */}
          <div>
            <h3 className="after:bg-accent relative mb-4 after:absolute after:bottom-0 after:mt-2 after:block after:h-[3px] after:w-12">Navigate</h3>
            <nav className="flex flex-col gap-5">
              <Link href={siteSlugs.home}>Home</Link>
              <Link href={siteSlugs.contact}>Contact</Link>
              <Link href={siteSlugs.services}>Services</Link>
              <Link rel="noopener noreferrer" target="_blank" href={siteNAP.googleReviewLink}>
                Write Review
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="h-card">
            <h3 className="after:bg-accent relative mb-4 after:absolute after:bottom-0 after:mt-2 after:block after:h-[3px] after:w-16">Contact</h3>
            <div className="grid grid-cols-1 gap-4">
              <Link href={`tel:${siteNAP.phone}`} className="p-tel" aria-label={`Call ${siteConfig.title} in Bellevue at ${siteNAP.formattedPhone}`}>
                {siteNAP.formattedPhone}
              </Link>
              <Link href={`mailto:${siteNAP.email}`} className="u-email" ria-label={`Email ${siteConfig.title} at ${siteNAP.email}`}>
                {siteNAP.email}
              </Link>
              <Link href={siteNAP.profiles.gbp} className="p-adr" target="_blank" rel="noopener noreferrer" aria-label="View our location on Google Maps">
                <span className="p-street-address">{siteNAP.address}</span>,<span className="p-locality"> {siteNAP.city}</span>,
                <span className="p-region"> {siteNAP.state}</span>,<span className="p-postal-code">{siteNAP.zipCode}</span>
              </Link>
            </div>
          </div>

          {/* Business Hours Column */}
          <div>
            <h3 className="after:bg-accent relative mb-4 after:absolute after:bottom-0 after:mt-2 after:block after:h-[3px] after:w-16">Hours</h3>

            <div className="flex flex-col gap-2">
              {siteNAP.openingHours.map(({ days, hours }) => (
                <p key={days}>
                  <span className="text-nowrap">{days}: </span>
                  <span className="text-nowrap">{hours}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-5 flex justify-center">
          <SocialLinks />
        </div>
        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between border-t border-neutral-600 pt-4 pb-4 lg:flex-row lg:items-end">
          <div className="flex w-fit flex-col items-center lg:items-start lg:justify-between">
            {/* Logo */}
            <div className="h-card flex w-fit items-center">
              {/* <Image src={Logo} alt={`{siteConfig.title} Kirkland Logo" width={50} height={50} className="u-logo`} /> */}
              <span className="p-name text-compliment xs:text-[24px] text-xl font-extrabold text-nowrap uppercase italic">{siteConfig.title}</span>
            </div>

            {/* Copyright */}
            <p className="body-display-sm mt-4 w-full text-center text-base! text-neutral-500 md:mt-0 lg:text-start">
              {year} Copyright © {siteConfig.title} | Website by
              <Link title="Seattle Web Design & SEO | Serbyte Development" href="https://www.serbyte.net/" className="text-accent font-medium hover:underline">
                {" "}
                Serbyte Development
              </Link>
            </p>
          </div>
          <div className="mt-4 flex w-fit items-center justify-center lg:mt-0">
            <Link title={`Terms of Service | ${siteConfig.title}`} href={`${siteConfig.url}/privacy-policy`} className="text-sm! text-nowrap text-neutral-500">
              Privacy Policy{" "}
            </Link>
            <span className="mx-1 text-neutral-500">|</span>
            <Link title={`Privacy Policy | ${siteConfig.title}`} href={`${siteConfig.url}/terms-of-service`} className="text-sm! text-nowrap text-neutral-500">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
