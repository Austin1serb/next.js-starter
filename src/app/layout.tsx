import { bodyAttributes } from "@zero-ui/attributes";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DOMAIN_URL, SITE_CONFIG } from "@/config/siteConfig";
import { Footer } from "./components/Footer";
import { MotionWrapper } from "@/utils/motion-wrapper";
import { LazyUi } from "./components/LazyUi";
import { TopBarV2 } from "./components/TopBarV2/TopBarV2";
import { ZeroUiRuntime } from "@/utils/init-zero-runtime";

const geistSans = Geist({
  variable: "--font-primary",
  subsets: ["latin"]
});
const geistMono = Geist_Mono({
  variable: "--font-secondary",
  subsets: ["latin"]
});
export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN_URL),
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description
};
export default function RootLayout({
  children


}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <MotionWrapper>
        <body {...bodyAttributes} className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <TopBarV2 />
          <LazyUi />
          {children}
          <Footer />
          <ZeroUiRuntime />
        </body>
      </MotionWrapper>
    </html>);

}