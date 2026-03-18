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
  title: "Nova Digital | AI Web Agency",
  description:
    "We build stunning, high-converting websites using AI-powered development. Starting at $500.",
  keywords: [
    "web agency",
    "AI web development",
    "website design",
    "fast websites",
  ],
  openGraph: {
    title: "Nova Digital | AI Web Agency",
    description:
      "Stunning websites built with AI. Starting at $500.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
