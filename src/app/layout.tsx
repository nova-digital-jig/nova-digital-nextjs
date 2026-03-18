import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-general-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nova Digital | Premium AI Web Agency",
  description:
    "We build stunning, high-converting websites using AI-powered development. Premium quality, 48hr delivery. Starting at $500.",
  keywords: [
    "web agency",
    "AI web development",
    "website design",
    "premium websites",
    "fast websites",
  ],
  openGraph: {
    title: "Nova Digital | Premium AI Web Agency",
    description:
      "Stunning websites built with AI. Premium quality in 48 hours. Starting at $500.",
    type: "website",
    siteName: "Nova Digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nova Digital | Premium AI Web Agency",
    description:
      "Stunning websites built with AI. Premium quality in 48 hours.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-[#0a0a0a] text-[#f5f5f5]`}
      >
        {children}
      </body>
    </html>
  );
}
