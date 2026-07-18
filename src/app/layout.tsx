/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata, Viewport } from "next";
import "./globals.css";
import SiteShell from "@/components/SiteShell";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://devtork.studio";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "DevTork Studio — Design, Development & Digital Growth", template: "%s — DevTork Studio" },
  description: "DevTork Studio designs and builds clear websites, apps, brands, and digital growth systems.",
  keywords: ["digital agency", "web design", "web development", "mobile apps", "branding", "SEO", "Bangladesh"],
  authors: [{ name: "DevTork Studio" }],
  creator: "DevTork Studio",
  openGraph: {
    type: "website",
    siteName: "DevTork Studio",
    title: "DevTork Studio — Clear digital experiences",
    description: "Websites, apps, brands, and growth systems—designed clearly and built carefully.",
    images: [{ url: "/brand/logo-horizontal.jpg", width: 1536, height: 804, alt: "DevTork Studio brand logo" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "DevTork Studio",
    description: "Clear digital experiences for ambitious businesses.",
    images: ["/brand/logo-horizontal.jpg"]
  },
  icons: {
    icon: [{ url: "/brand/app-icon-light.png", type: "image/png", sizes: "512x512" }],
    shortcut: "/brand/app-icon-light.png",
    apple: "/brand/app-icon-light.png"
  },
  manifest: "/manifest.webmanifest"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2efe8" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0910" }
  ],
  colorScheme: "light"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body><SiteShell>{children}</SiteShell></body>
    </html>
  );
}
