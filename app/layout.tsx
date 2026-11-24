import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import StateWrapper from "@/components/StateWrapper";
import UnderConstruction from "@/components/UnderConstruction";
import { SHOW_UNDER_CONSTRUCTION, NOINDEX, SITE_URL } from "@/lib/site-config";
import { CONTACTS } from "@/content/contacts";

const mainFont = Geist_Mono({
  variable: "--font-main",
  subsets: ["latin"],
  weight: ["400"],
});

const businessName = "The M Studio";
const pageTitle = "Photo Studio Dubai | THE M STUDIO";
const description =
  "A completely private space with just you, a large mirror, and a clicker in your hand. Premium camera and professional lighting are already perfectly tuned.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: pageTitle,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: businessName,
    locale: "en_US",
  },
  robots: NOINDEX ? { index: false, follow: false } : undefined,
};

// Local business structured data — same contact details shown in ContactsSection,
// kept in sync by pulling from the one shared CONTACTS list.
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: businessName,
  description,
  image: `${SITE_URL}/opengraph-image.jpg`,
  url: SITE_URL,
  telephone: CONTACTS.find((c) => c.label === "Phone")?.value,
  email: CONTACTS.find((c) => c.label === "Email")?.value,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Art of Living Mall, Al Barsha 2",
    addressLocality: "Dubai",
    addressCountry: "AE",
  },
  sameAs: [CONTACTS.find((c) => c.label === "Instagram")?.href].filter(
    Boolean,
  ),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${mainFont.variable} h-full antialiased`}>
      <Script
        id="gtm-script"
        src="https://www.googletagmanager.com/gtm.js?id=GTM-T8FVZPS2"
        strategy="beforeInteractive"
      />
      <Script id="gtm-datalayer" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());`}
      </Script>
      <body className="min-h-full flex flex-col bg-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(
              /</g,
              "\\u003c",
            ),
          }}
        />
        <div
          style={{
            backgroundImage: "url('/noise.gif')",
            backgroundSize: "90px",
            opacity: 0.2,
            height: "100dvh",
            width: "100dvw",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 9999999,
            pointerEvents: "none",
            mixBlendMode: "multiply",
          }}
        />
        {SHOW_UNDER_CONSTRUCTION ? (
          <UnderConstruction />
        ) : (
          <StateWrapper>{children}</StateWrapper>
        )}
      </body>
    </html>
  );
}
