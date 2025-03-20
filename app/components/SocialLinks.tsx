import { siteNAP } from "@/config/siteConfig"
import Image from "next/image"
import Link from "next/link"

export const SocialLinks: React.FC = () => {
  return (
    <div className="flex gap-7.5">
      <Link prefetch={false} rel="noopener nofollow" target="_blank" href={siteNAP.profiles.gbp} className="icon-display">
        <Image src="/google.png" alt="Google Logo" fill sizes="10vw" />
      </Link>
      <Link prefetch={false} rel="noopener nofollow" target="_blank" href={siteNAP.profiles.facebook} className="icon-display">
        <Image src="/facebook.png" alt="Facebook Logo" fill sizes="10vw" className="p-1" />
      </Link>
      <Link prefetch={false} rel="noopener nofollow" target="_blank" href={siteNAP.profiles.yelp} className="icon-display">
        <Image src="/yelp.png" alt="Yelp Logo" fill sizes="10vw" className="p-1" />
      </Link>
      <Link prefetch={false} rel="noopener nofollow" target="_blank" href={siteNAP.profiles.bbb} className="icon-display">
        <Image src="/better-business-bureau.png" alt="BBB Logo" fill sizes="10vw" />
      </Link>
    </div>
  )
}
