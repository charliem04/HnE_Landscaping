import type { Metadata } from "next";
// Self-hosted via Fontsource — bundled at build, no CDN request, no
// layout shift from a third-party stylesheet.
//   Archivo (variable, wdth axis) — display + utility labels. The width
//   axis is the point: the badge wordmark is a heavy WIDE grotesque, and
//   `font-stretch: 112%` on headings is what makes the type match the
//   sign on the truck.
//   Karla — body. Open apertures, sized for reading on a phone outdoors.
import "@fontsource-variable/archivo/wdth.css";
import "@fontsource/karla/400.css";
import "@fontsource/karla/600.css";
import "@fontsource/karla/700.css";
import "./globals.css";
import { client } from "@/client.config";
import { JsonLd } from "@/components/JsonLd";

// All SEO metadata is driven by client.config.ts — no per-client edits here.
export const metadata: Metadata = {
  metadataBase: new URL(client.siteUrl),
  title: client.metaTitle,
  description: client.metaDescription,
  openGraph: {
    title: client.metaTitle,
    description: client.metaDescription,
    url: client.siteUrl,
    siteName: client.businessName,
    images: [{ url: client.ogImagePath, width: 1200, height: 630 }],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <JsonLd />
      </body>
    </html>
  );
}
