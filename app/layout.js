import { Inter } from "next/font/google";
import "./globals.css";
import ClarityScript from "@/components/global/clairity/clairity";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lif Support",
  description: "Get help with Lif Platforms services through our helpful community.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClarityScript />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
