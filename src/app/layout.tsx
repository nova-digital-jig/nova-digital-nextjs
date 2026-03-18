import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nova Digital | AI-Powered Web Agency | Websites in 48 Hours",
  description:
    "Nova Digital builds stunning, high-converting websites in 48 hours using AI-powered development. Based in Edison, NJ. Starting at $500.",
  keywords: [
    "web agency",
    "AI web development",
    "website design",
    "Edison NJ",
    "fast websites",
    "48 hour websites",
  ],
  openGraph: {
    title: "Nova Digital | AI-Powered Web Agency",
    description:
      "Stunning websites in 48 hours. AI-powered development starting at $500.",
    type: "website",
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
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
