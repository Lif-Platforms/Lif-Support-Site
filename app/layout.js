import { Inter } from "next/font/google";
import "./globals.css";
import ClarityScript from "@/components/global/clairity/clairity";
import NextTopLoader from 'nextjs-toploader';
import Footer from "@/components/global/footer/footer";
import CookieBanner from "@/components/global/cookie banner/cookie_banner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lif Support",
  description: "Get help with Lif Platforms services through our helpful community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClarityScript />
      <NextTopLoader
        showSpinner={false}
      />
      <body className={inter.className}>{children}</body>
      <CookieBanner />
      <Footer />
    </html>
  );
}
