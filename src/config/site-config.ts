// change this to the domain of your site when you deploy
export const DOMAIN_URL = process.env.NODE_ENV === "production" ? "https://nextjs-starter.vercel.app" : "http://localhost:3000"

export const SITE_CONFIG = {
  title: "My Next.js Starter",
  description: "A fully optimized Next.js 15 starter template.",
} as const

export const SITE_NAP = {
  name: "Your Company Name",
  nameSlug: "your-company-name",
  googleBusinessType: "ProfessionalService" as const,
  contact: "John Doe",
  contactTitle: "CEO",
  email: "example@gmail.com",
  phone: "+1123456789",
  formattedPhone: "+1 (123) 456-789",
  address: "123 Street",
  addressLink: "https://goo.gl/maps/",
  city: "City",
  state: "State",
  stateCode: "ST",
  zipCode: "12345",
  geo: { latitude: 40.7128, longitude: -74.006 },
  areaServed: ["City", "Nearby City"],
  openingHours: [
    { days: "Mon - Fri", hours: "8am - 5pm" },
    { days: "Sat", hours: "Closed" },
    { days: "Sun", hours: "Closed" },
  ] as const,
  googleReviewLink: "https://g.page/yourbusiness/review",
  profiles: {
    facebook: "",
    twitter: "",
    instagram: "",
    linkedIn: "",
    youtube: "",
    yelp: "https://www.yelp.com/biz/your-business",
    bbb: "",
    gbp: "https://g.co/yourbusiness",
  } as const,
  logo: DOMAIN_URL + "/logo.png",
  favicon: DOMAIN_URL + "/favicon.ico",
  images: [DOMAIN_URL + "/opengraph-image.png"],
} as const

export const SITE_SLUGS = {
  home: "/",
  about: "/about",
  contact: "/contact",
  services: "/services",
  // gallery: "/gallery",
  terms: "/terms-of-service",
  privacy: "/privacy-policy",
  // quote: "/quote",
} as const

const flattenSlugs = (obj: Record<string, string | Record<string, string>>): string[] => {
  return Object.values(obj).flatMap((value) => (typeof value === "string" ? [value] : flattenSlugs(value)))
}

export const ALL_PAGES: string[] = Object.values(SITE_SLUGS).flatMap((value) => (typeof value === "string" ? [value] : flattenSlugs(value)))
