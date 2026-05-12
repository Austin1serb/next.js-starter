import Link from "next/link"

interface LinkButtonProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode
  active?: boolean
  className?: string
}

export const LinkButton: React.FC<LinkButtonProps> = ({ href, children, className, ...props }) => {
  return (
    <Link href={href} className={`${className}`} {...props}>
      {children}
    </Link>
  )
}
