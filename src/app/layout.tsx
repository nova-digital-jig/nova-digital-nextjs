import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vektor.agency"),
  title: "Vektor — AI That Moves Your Business Forward",
  description:
    "Vektor sets up AI agents for local businesses. Automate calls, bookings, follow-ups, and more — 24/7. No contracts, cancel anytime.",
  keywords: [
    "AI agent",
    "local business automation",
    "AI assistant",
    "business AI",
    "call automation",
    "lead follow-up",
    "AI setup service",
    "Vektor",
  ],
  authors: [{ name: "Vektor" }],
  openGraph: {
    title: "Vektor — AI That Moves Your Business Forward",
    description:
      "AI agents for local businesses. Automate calls, bookings, follow-ups, and more — 24/7.",
    url: "https://vektor.agency",
    siteName: "Vektor",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vektor — AI That Moves Your Business Forward",
    description:
      "AI agents for local businesses. Automate calls, bookings, follow-ups, and more — 24/7.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Vektor",
  description:
    "AI agent setup service for local businesses. Automate calls, bookings, follow-ups, and more.",
  url: "https://vektor.agency",
  telephone: "+19786063386",
  email: "jigpatel01234@gmail.com",
  priceRange: "$$",
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
