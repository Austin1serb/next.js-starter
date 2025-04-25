import React from "react"
import Link from "next/link"
import Image from "next/image"
import brandImage from "@/app/images/serbyte-logo.jpg"
import { MobileMenu } from "./MobileMenu"
import { SITE_SLUGS } from "@/config/siteConfig"
export const TopBar = () => {
  return (
    <header className="bg-background-alt text-foreground-alt z-50 flex w-full items-center justify-between overflow-hidden px-5 py-2.5">
      {/* Logo and Tagline */}
      <Link href="/" aria-label="Serbyte Next.js Starter" className="group flex w-full items-center gap-2">
        <Image
          src={brandImage}
          alt="Serbyte Next.js Starter"
          priority
          placeholder="blur"
          height={50}
          className="duration-300 will-change-transform group-hover:scale-95"
        />
        SERBYTE
      </Link>

      <div className="bg-background-alt flex w-full flex-col items-center justify-between gap-5">
        <nav className="flex w-full items-center justify-end">
          <MobileMenu />
          <div className="flex w-full items-center justify-end gap-10 max-lg:hidden">
            <Link href={SITE_SLUGS.services}>Services</Link>
            <Link href={SITE_SLUGS.about}>About</Link>
            <Link href={SITE_SLUGS.contact}>Contact</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
