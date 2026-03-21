import type { Metadata } from "next";
import { Syne, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "AI-Powered Web Design Agency | Vektor",
  description:
    "Premium AI-powered websites delivered in 48 hours. Stunning design. Blazing fast. Real results for local businesses. Starting at $500.",
  keywords: [
    "web design agency",
    "AI web development",
    "website design",
    "fast website development",
    "affordable web design",
    "local business websites",
    "Next.js agency",
  ],
  openGraph: {
    title: "AI-Powered Web Design Agency | Vektor",
    description:
      "Premium AI-powered websites delivered in 48 hours. Starting at $500. Stunning design. Blazing performance. Real results.",
    type: "website",
    siteName: "Vektor",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI-Powered Web Design Agency | Vektor",
    description:
      "Premium AI-powered websites in 48 hours. Starting at $500.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Vektor",
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
    areaServed: { "@type": "Country", name: "United States" },
    priceRange: "$500 - $2,500",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "50",
      bestRating: "5",
    },
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${syne.variable} ${jakarta.variable} ${jetbrains.variable} antialiased`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:top-4 focus:left-4 focus:px-4 focus:py-2 focus:bg-[#FF4D00] focus:text-white focus:rounded-lg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
