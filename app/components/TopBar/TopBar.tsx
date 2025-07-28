import Link from "next/link"
import { MobileMenu } from "@/app/components/TopBar/MobileMenu"
import { SITE_SLUGS } from "@/config/siteConfig"
import { Logo } from "@/app/components/Logo"

export const TopBar = () => {
  return (
    <header className="bg-primary border-primary fixed z-5 flex w-full items-center justify-between overflow-hidden border-b p-2.5 text-black duration-300 md:px-5">
      <Logo />
      <div className="flex w-full flex-col items-center justify-between">
        <nav className="flex w-full items-center justify-center">
          <div className="flex w-full items-center justify-center gap-20 text-base font-medium max-lg:hidden">
            <Link className="text-nowrap duration-200 hover:text-white" href={SITE_SLUGS.home}>
              Home
            </Link>
            <Link className="text-nowrap duration-200 hover:text-white" href={SITE_SLUGS.about}>
              About Us
            </Link>

            <Link className="text-nowrap duration-200 hover:text-white" href={SITE_SLUGS.services}>
              Services
            </Link>
          </div>
        </nav>
      </div>
      <div className="flex w-full items-center justify-end gap-5">
        <Link className="hidden md:block" href={SITE_SLUGS.contact} title="Start Now With Pets Choice Insurance">
          Get a Quote
        </Link>
        <MobileMenu />
      </div>
    </header>
  )
}
