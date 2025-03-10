import type { LocalBusiness, WithContext } from "schema-dts"
import { siteConfig, siteNAP } from "./site"

export const localBusinessSchema: WithContext<LocalBusiness> = {
  "@context": "https://schema.org",
  "@type": siteNAP.googleBusinessType,
  image: siteNAP.images,
  name: siteNAP.name,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteNAP.address,
    addressLocality: siteNAP.city,
    addressRegion: siteNAP.state,
    postalCode: siteNAP.zipCode,
    addressCountry: "US",
  },

  // review: {
  //   "@type": "Review",
  //   reviewRating: { "@type": "Rating", ratingValue: 4.9, bestRating: 5 },
  //   author: { "@type": "Person", name: "Garrett Harris" },
  // },
  // geo: { "@type": "GeoCoordinates", latitude: 47.709356, longitude: -122.177239 },\

  url: siteConfig.url,
  telephone: siteNAP.phone,
  priceRange: "$$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      opens: "08:00",
      closes: "17:00",
    },
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Friday"], opens: "08:00", closes: "14:00" },
  ],
  sameAs: Object.values(siteNAP.socialMedia),
}
