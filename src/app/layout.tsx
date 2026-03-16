import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";
import Cursor from "@/components/Cursor";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "10 Years — A Decade Remembered",
  description:
    "A cinematic journey through ten years of craft, community, and relentless progress.",
  openGraph: {
    title: "10 Years — A Decade Remembered",
    description: "Celebrating a decade of building together.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#EEF2F8]">
      <body
        className={`${cormorant.variable} ${jetbrainsMono.variable} ${inter.variable} bg-[#EEF2F8] text-[#1A2544] antialiased`}
      >
        {children}
        <Cursor />
      </body>
    </html>
  );
}
