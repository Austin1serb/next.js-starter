import styles from "./Hamburger.icon.module.css";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const HamburgerIcon: React.FC<Props> = ({ isOpen, setIsOpen }) => {
  return (
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      aria-expanded={isOpen}
      aria-label="Toggle navigation menu"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setIsOpen((prev) => !prev);
      }}
      className="animate-slide-left bg-primary xs:p-3 xs:px-4 relative z-50 p-2 py-2.5 hover:cursor-pointer"
    >
      <div className={`${styles.navIcon} ${isOpen ? styles.open : ""} will-change-transform`}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </button>
  );
};
