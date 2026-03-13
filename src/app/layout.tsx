import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
    <html lang="en" className="bg-[#0A0A0A]">
      <body
        className={`${cormorant.variable} ${jetbrainsMono.variable} bg-[#0A0A0A] text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
