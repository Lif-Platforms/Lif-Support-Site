import { Inter } from "next/font/google";
import "./globals.css";
import Script from 'next/script';
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
      <NextTopLoader
        showSpinner={false}
      />
      <body className={inter.className}>
      <Script id="clarity-script" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");
          `}
        </Script>
        {children}
      </body>
      <CookieBanner />
      <Footer />
    </html>
  );
}
