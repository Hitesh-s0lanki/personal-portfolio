import type { Metadata } from "next";
import "./globals.css";
import { Raleway } from "next/font/google";
import SheetProvider from "@/components/providers/sheet-provider";
import { Toaster } from "@/components/ui/sonner";
// import Script from "next/script";
import Navbar from "./(root)/_components/navbar";
import Footer from "./(root)/_components/footer";

export const metadata: Metadata = {
  title: "Hitesh Solanki",
  description: "Personal Portfolio of Hitesh Solanki",
  icons: "/profile.svg",
};

const font = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SheetProvider />

        {/* <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-PXR24BFQ8T"
        ></Script>
        <script type="text/javascript">
          {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-PXR24BFQ8T');
              `}
        </script> */}
        <Navbar />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
