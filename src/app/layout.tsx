import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Raleway } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import SheetProvider from "@/components/providers/sheet-provider";
import { Toaster } from "@/components/ui/sonner";
import JsonLd from "@/components/json-ld";
import {
  ogImageUrl,
  personJsonLd,
  siteConfig,
  siteUrl,
  websiteJsonLd,
} from "@/lib/seo";
import Navbar from "./(root)/_components/navbar";
import Footer from "./(root)/_components/footer";
import ChatWidget from "@/components/chat/chat-widget";
import NewProjectAnnouncement from "@/components/new-project-announcement";
import RouteChrome from "@/components/route-chrome";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteUrl }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: ogImageUrl({
          title: siteConfig.title,
          subtitle: siteConfig.description,
          eyebrow: "Portfolio",
        }),
        width: 1200,
        height: 630,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.name,
    images: [
      ogImageUrl({
        title: siteConfig.title,
        subtitle: siteConfig.description,
        eyebrow: "Portfolio",
      }),
    ],
  },
  formatDetection: { email: false, address: false, telephone: false },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

const font = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <JsonLd data={[personJsonLd, websiteJsonLd]} />
        <SheetProvider />
        <RouteChrome><Navbar /></RouteChrome>
        {children}
        <RouteChrome><Footer /></RouteChrome>
        <ChatWidget />
        <Toaster />
        <NewProjectAnnouncement />
        <GoogleAnalytics gaId="G-PXR24BFQ8T" />
      </body>
    </html>
  );
}
