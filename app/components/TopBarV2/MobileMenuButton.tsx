"use client"
import { DotMenuIcon } from "./DotMenuIcon"
import { useUI } from "@react-zero-ui/core"
import { SITE_SLUGS } from "@/config/siteConfig"
import { LinkButton } from "../ui/LinkButton"

export const MobileMenuButton: React.FC = () => {
  const [, setMobileMenuOpen] = useUI<"closed" | "open">("mobile-menu", "closed")

  return (
    <div className="flex h-full items-center justify-between gap-4 sm:hidden">
      <LinkButton className="" href={SITE_SLUGS.contact}>
        Contact
      </LinkButton>
      <div className="border-primary animate-click flex h-full items-center justify-center rounded-full border-2 p-1.5">
        <button
          type="button"
          aria-label="Toggle navigation"
          data-mobile-menu-button="true"
          onClick={(e) => {
            e.stopPropagation()
            setMobileMenuOpen((prev) => (prev === "closed" ? "open" : "closed"))
          }}
          className={"group right-3 h-6 w-6 text-sm transition-all duration-300 ease-in-out hover:cursor-pointer sm:absolute"}
        >
          <DotMenuIcon />
        </button>
      </div>
    </div>
  )
}
