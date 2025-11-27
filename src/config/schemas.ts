import type { LocalBusiness, Organization, WebSite, WithContext } from "schema-dts"
import { DOMAIN_URL, SITE_CONFIG, SITE_NAP } from "./site-config"

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": SITE_NAP.googleBusinessType,
  "@id": `${DOMAIN_URL}/#localbusiness`,
  name: SITE_NAP.name,
  description: SITE_CONFIG.description,
  url: DOMAIN_URL,
  telephone: SITE_NAP.phone,
  email: SITE_NAP.email,
  image: SITE_NAP.images,
  logo: SITE_NAP.logo,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_NAP.address,
    addressLocality: SITE_NAP.city,
    addressRegion: SITE_NAP.stateCode,
    postalCode: SITE_NAP.zipCode,
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: SITE_NAP.geo.latitude,
    longitude: SITE_NAP.geo.longitude,
  },
  areaServed: SITE_NAP.areaServed.map((area) => ({ "@type": "City", name: area })),
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  sameAs: Object.values(SITE_NAP.profiles).filter(Boolean),
} satisfies WithContext<LocalBusiness>

export const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${DOMAIN_URL}/#website`,
  name: SITE_NAP.name,
  description: SITE_CONFIG.description,
  url: DOMAIN_URL,
  publisher: { "@id": `${DOMAIN_URL}/#organization` },
}

export const organizationSchema: WithContext<Organization> = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${DOMAIN_URL}/#organization`,
  name: SITE_NAP.name,
  url: DOMAIN_URL,
  logo: SITE_NAP.logo,
  email: SITE_NAP.email,
  telephone: SITE_NAP.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE_NAP.address,
    addressLocality: SITE_NAP.city,
    addressRegion: SITE_NAP.stateCode,
    postalCode: SITE_NAP.zipCode,
    addressCountry: "US",
  },
  sameAs: Object.values(SITE_NAP.profiles).filter(Boolean),
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: SITE_NAP.email,
      telephone: SITE_NAP.phone,
      availableLanguage: ["English"],
    },
  ],
}

/** Combined graph with all schemas - use this in your layout.tsx */
export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    { ...organizationSchema, "@context": undefined },
    { ...websiteSchema, "@context": undefined },
    { ...localBusinessSchema, "@context": undefined },
  ],
}
