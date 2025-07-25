import { SITE_NAP } from "@/config/siteConfig"
import clsx from "clsx"
import Link from "next/link"
import Image from "next/image"

export const Logo: React.FC<{ className?: string; footer?: boolean }> = ({ className, footer = false }) => {
  return (
    <Link
      href="/"
      aria-label={SITE_NAP.name + " home page"}
      className={clsx(
        "group flex w-full origin-left items-center gap-2 text-2xl font-bold whitespace-nowrap duration-300 hover:scale-105 hover:cursor-pointer md:text-3xl",
        className
      )}
    >
      <Image src="/serbyte-logo.png" alt={SITE_NAP.name} width={300} height={300} className="aspect-square h-10 w-10 rounded-lg md:h-12 md:w-12" />
      <span className="mt-1.5 w-fit leading-4">
        Serbyte
        <br />
        <span
          className={clsx(
            "block h-5 text-center text-sm font-medium md:text-base",
            !footer ? "scrolled750-true:h-0 scrolled750-true:opacity-0 duration-300" : ""
          )}
        >
          Web Design
        </span>
      </span>
    </Link>
  )
}
