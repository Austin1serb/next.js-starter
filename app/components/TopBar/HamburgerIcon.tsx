import type { UISetterFn } from "@react-zero-ui/core"

interface Props {
  setIsOpen: UISetterFn<"closed" | "open">
}

export const HamburgerIcon: React.FC<Props> = ({ setIsOpen }) => {
  return (
    <button
      type="button"
      onClick={() => setIsOpen((prev) => (prev === "closed" ? "open" : "closed"))}
      aria-label="Toggle navigation menu"
      tabIndex={0}
      className="xs:p-3 xs:px-4 relative z-1 p-2 py-2.5 hover:cursor-pointer"
      // onKeyDown={(e) => {
      //   if (e.key === "Enter" || e.key === " ") setIsOpen((prev) => (prev === "closed" ? "open" : "closed"))
      // }}
    >
      <div className={`nav-icon relative flex h-[30px] w-[35px] cursor-pointer flex-col items-center justify-center`}>
        <span className="rounded-full"></span>
        <span className="rounded-full"></span>
        <span className="rounded-full"></span>
      </div>
    </button>
  )
}
