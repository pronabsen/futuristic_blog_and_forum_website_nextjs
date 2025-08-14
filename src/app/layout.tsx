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
  title: "Z.AI - Cosmic Blog & Forum",
  description: "A futuristic blog and forum platform themed around Z.AI with cosmic nebula backgrounds and space-inspired design.",
  keywords: ["Z.AI", "blog", "forum", "cosmic", "nebula", "space", "Three.js", "community"],
  authors: [{ name: "Z.AI Team" }],
  openGraph: {
    title: "Z.AI - Cosmic Blog & Forum",
    description: "Futuristic community platform with cosmic design",
    url: "https://chat.z.ai",
    siteName: "Z.AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Z.AI - Cosmic Blog & Forum",
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
