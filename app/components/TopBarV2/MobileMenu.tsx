"use client"
import Link from "next/link"
import { useUI } from "@react-zero-ui/core"
import { SITE_SLUGS } from "@/config/siteConfig"
import { LinkButton } from "../ui/LinkButton"

export const MobileMenu: React.FC<{ navItems: { name: string; href: string }[] }> = ({ navItems }) => {
  const [, setMobileMenuOpen] = useUI<"closed" | "open">("mobile-menu", "closed")
  const toggle = () => {
    setMobileMenuOpen((prev) => (prev === "closed" ? "open" : "closed"))
  }

  // const ref = useRef<HTMLUListElement | null>(null)

  // useEffect(() => {
  //   function onPointerDown(e: PointerEvent) {
  //     if (document.body.dataset.mobileMenu !== "open") return

  //     // Check if clicked element is the menu button or its children
  //     const target = e.target as Element
  //     const isMenuButton = target.closest('[data-mobile-menu-button="true"]')

  //     if (ref.current && !ref.current.contains(e.target as Node) && !isMenuButton) {
  //       document.body.dataset.mobileMenu = "closed"
  //     }
  //   }
  //   window.addEventListener("pointerdown", onPointerDown, true)
  //   return () => window.removeEventListener("pointerdown", onPointerDown, true)
  // }, [])

  return (
    <div className="mobile-menu-container transition-all duration-300 md:hidden">
      {/* Menu content */}
      <div className="relative mx-4 mt-4 rounded-xl border border-zinc-700 bg-zinc-900/95 p-6 shadow-2xl backdrop-blur-md">
        <nav>
          <ul className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <li key={item.name} className="mobile-menu-item transition duration-300" style={{ "--index": index } as React.CSSProperties}>
                <Link
                  href={item.href}
                  onClick={() => toggle()}
                  className="hover:text-surface block rounded-lg border border-transparent px-4 py-3 text-base font-medium text-zinc-300 transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-800/50"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Separator */}
          <hr className="my-4 h-px text-zinc-700" />

          {/* Contact button */}
          <div className="mobile-menu-item">
            <LinkButton href={SITE_SLUGS.contact} onClick={() => toggle()} className="w-full justify-center py-3">
              Contact Us
            </LinkButton>
          </div>
        </nav>
      </div>
    </div>
  )
}
