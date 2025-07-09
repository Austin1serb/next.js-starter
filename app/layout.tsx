import { bodyAttributes } from "@zero-ui/attributes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/config/siteConfig";
import { TopBar } from "./components/TopBar/TopBar";
import { Footer } from "./components/Footer";
import { domAnimation, LazyMotion } from "motion/react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});
export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.title}`
  },
  description: SITE_CONFIG.description
  // openGraph: {
  //   title: SITE_CONFIG.title,
  //   description: SITE_CONFIG.description,
  //   url: SITE_CONFIG.url,
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: SITE_CONFIG.title,
  //   description: SITE_CONFIG.description,
  //   images: [SITE_CONFIG.ogImage],
  // },
};
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <html lang="en">
      <LazyMotion features={domAnimation}>
        <body {...bodyAttributes} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <TopBar />
          {children}
          <Footer />
        </body>
      </LazyMotion>
    </html>;
}