import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "AI-Powered Web Design & Development | Nova Digital",
  description:
    "Premium websites delivered in 48 hours, not 48 days. AI-powered web design agency serving Edison, NJ and nationwide. Starting at $500. Call (978) 606-3386.",
  keywords: [
    "web design agency",
    "AI web development",
    "website design Edison NJ",
    "fast website development",
    "affordable web design",
    "local business websites",
  ],
  openGraph: {
    title: "Nova Digital | Websites That Print Money",
    description:
      "Premium AI-powered websites delivered in 48 hours. Starting at $500. Stunning design. Blazing performance. Real results.",
    type: "website",
    siteName: "Nova Digital",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova Digital | Websites That Print Money",
    description:
      "Premium AI-powered websites in 48 hours. Starting at $500.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Nova Digital",
    description:
      "AI-powered web design agency delivering premium websites in 48 hours.",
    telephone: "+19786063386",
    email: "jigpatel01234@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Edison",
      addressRegion: "NJ",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 40.5187,
      longitude: -74.4121,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    priceRange: "$500 - $2,500",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "50",
      bestRating: "5",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
      ],
      opens: "09:00",
      closes: "18:00",
    },
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${instrumentSerif.variable} antialiased bg-[#0A0A0F] text-[#FAFAF8]`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-[#8b5cf6] focus:text-white focus:rounded-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
