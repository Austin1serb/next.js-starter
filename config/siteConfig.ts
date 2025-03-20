export const siteConfig = {
  title: "My Next.js Starter",
  description: "A fully optimized Next.js 15 starter template.",
  url: process.env.NEXT_PUBLIC_URL || "https://yourwebsite.com",
  siteName: "My Next.js Starter",
  keywords: ["Next.js", "Tailwind CSS", "SEO", "TypeScript"],
  ogImage: "/og-image.png",
  logo: "/logo.png",
} as const

export const siteNAP = {
  name: "Your Company Name",
  googleBusinessType: "ProfessionalService" as const,
  contact: "John Does",
  contactTitle: "CEO",
  email: "example@gmail.com",
  phone: "+1123456789",
  formattedPhone: "+1 (123) 456-789",
  address: "123 Street",
  addressLink: "https://goo.gl/maps/youraddress",
  city: "City",
  state: "State",
  zipCode: "12345",
  openingHours: [
    { days: "Mon - Thurs", hours: "8am - 5pm" },
    { days: "Friday", hours: "8am - 2pm" },
    { days: "Sat - Sun", hours: "Closed" },
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
  logo: "/logo.png",
  favicon: "/favicon.ico",
  images: ["business-image.png"],
} as const

export const siteSlugs = {
  home: "/",
  about: "/about",
  contact: "/contact",
  services: "/services",
  gallery: "/gallery",
  terms: "/terms-of-service",
  privacy: "/privacy-policy",
  quote: "/quote",
} as const
