import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import CosmicBackground from "@/components/CosmicBackground";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevCommunity - Cosmic Blog & Forum",
  description: "A futuristic blog and forum platform themed around DevCommunity with cosmic nebula backgrounds and space-inspired design.",
  keywords: ["DevCommunity", "blog", "forum", "cosmic", "nebula", "space", "Three.js", "community"],
  authors: [{ name: "DevCommunity Team" }],
  openGraph: {
    title: "DevCommunity - Cosmic Blog & Forum",
    description: "Futuristic community platform with cosmic design",
    url: "#",
    siteName: "DevCommunity",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevCommunity - Cosmic Blog & Forum",
    description: "Futuristic community platform with cosmic design",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <CosmicBackground />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
