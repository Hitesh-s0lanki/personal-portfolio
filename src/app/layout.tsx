import type { Metadata } from "next";
import "./globals.css";
import { Raleway } from "next/font/google";

export const metadata: Metadata = {
  title: "Hitesh Solanki",
  description: "Personal Portfolio of Hitesh Solanki",
  icons: "/profile.png",
};

const font = Raleway({
  subsets: ["latin"],
  weight: ["600", "400", "500"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
