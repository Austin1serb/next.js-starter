import { SITE_NAP } from "@/config/siteConfig"
import Image from "next/image"
import Link from "next/link"

export const SocialLinks: React.FC = () => {
  return (
    <div className="relative flex gap-7.5">
      <Link prefetch={false} rel="noopener nofollow" target="_blank" href={SITE_NAP.profiles.gbp} className="relative aspect-square h-5 w-5">
        <Image src="/google.png" alt="Google Logo" height={256} width={256} className="object-fill" />
      </Link>
      <Link prefetch={false} rel="noopener nofollow" target="_blank" href={SITE_NAP.profiles.facebook} className="relative aspect-square h-5 w-5">
        <Image src="/facebook.png" alt="Facebook Logo" height={256} width={256} className="object-fill" />
      </Link>
      <Link prefetch={false} rel="noopener nofollow" target="_blank" href={SITE_NAP.profiles.yelp} className="relative aspect-square h-5 w-5">
        <Image src="/yelp.png" alt="Yelp Logo" height={256} width={256} className="object-fill" />
      </Link>
      <Link prefetch={false} rel="noopener nofollow" target="_blank" href={SITE_NAP.profiles.bbb} className="relative aspect-square h-5 w-5">
        <Image src="/better-business-bureau.png" alt="BBB Logo" height={256} width={256} className="object-fill" />
      </Link>
    </div>
  )
}
