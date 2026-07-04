import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "R.K. Automobile — Buy & Sell Used Cars in Delhi | Genuine Deals, Best Prices",
  description: "R.K. Automobile is Delhi's trusted used car dealer. Buy & sell pre-owned cars with finance, insurance, Pan India delivery, denting/painting & detailing. Visit us at D-11/12 Nehru Vihar, Near Timarpur, Delhi - 110054. Call 9999995121.",
  keywords: ["used cars Delhi", "buy used car", "sell car Delhi", "second hand car", "R.K. Automobile", "car finance Delhi", "pre-owned cars", "car insurance Delhi"],
  authors: [{ name: "R.K. Automobile" }],
  icons: {
    icon: "/rk-logo.jpeg",
  },
  openGraph: {
    title: "R.K. Automobile — Buy & Sell Used Cars in Delhi",
    description: "Genuine deals & best prices on used cars. Finance, insurance, Pan India delivery. D-11/12 Nehru Vihar, Delhi.",
    url: "https://rkautomobile.in",
    siteName: "R.K. Automobile",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "R.K. Automobile — Buy & Sell Used Cars in Delhi",
    description: "Genuine deals & best prices on used cars in Delhi.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        {children}
        <Toaster />
        <SonnerToaster />
      </body>
    </html>
  );
}
