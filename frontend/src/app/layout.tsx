import type { Metadata } from "next";
import { Sarabun, Geist_Mono } from "next/font/google";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import "./globals.css";

// Sarabun - A beautiful Thai font that also supports Latin
const sarabun = Sarabun({
  variable: "--font-sarabun",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Thai Property Agent | ตัวแทนอสังหาริมทรัพย์ไทย",
  description: "AI-powered Thai real estate agent with voice capabilities. Find your perfect property in Bangkok, Chiang Mai, and Phuket.",
  keywords: ["Thai property", "real estate", "Bangkok condo", "Chiang Mai house", "Phuket villa", "อสังหาริมทรัพย์", "คอนโด", "บ้าน"],
  authors: [{ name: "Thai Property Agent" }],
  openGraph: {
    title: "Thai Property Agent | ตัวแทนอสังหาริมทรัพย์ไทย",
    description: "AI-powered Thai real estate agent with voice capabilities",
    type: "website",
    locale: "th_TH",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${sarabun.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#1E3A5F" />
      </head>
      <body className="antialiased font-sans">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
