import { client } from "@/client.config";

/**
 * LocalBusiness structured data, generated from client.config.ts.
 * Validate after launch with Google's Rich Results Test.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    name: client.businessName,
    legalName: client.legalName,
    description: client.metaDescription,
    url: client.siteUrl,
    telephone: client.phoneHref,
    // Crews travel; there is no address a customer can walk into, so we
    // publish the area served rather than inventing a storefront.
    address: {
      "@type": "PostalAddress",
      addressRegion: client.addressRegion,
      addressCountry: client.addressCountry,
    },
    areaServed: { "@type": "Place", name: client.serviceArea },
    knowsLanguage: ["en", "es"],
    image: client.siteUrl + client.ogImagePath,
    ...(client.email ? { email: client.email } : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
