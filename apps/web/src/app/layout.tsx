import type { Metadata } from "next";
import "./globals.css";
import { ConsentBanner } from "@/components/consent-banner";

export const metadata: Metadata = {
  title: "Retro AI Companion",
  description: "A modern collaborative AI Tamagotchi reimagining",
  openGraph: {
    title: "Retro AI Companion",
    description: "Shared AI lifeform with nostalgia skin and realtime social play",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Retro AI Companion",
    applicationCategory: "GameApplication",
    operatingSystem: "Web"
  };

  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <div className="mx-auto max-w-7xl px-4 py-6">{children}</div>
        <ConsentBanner />
      </body>
    </html>
  );
}
