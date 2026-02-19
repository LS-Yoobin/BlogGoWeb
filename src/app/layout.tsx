import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BlogGo – The fastest way to turn photos into blogs",
    template: "%s | BlogGo",
  },
  description:
    "BlogGo is the fastest way to turn photos into blogs.",
  keywords: ["blogging", "writing", "developer blog", "content creation"],
  openGraph: {
    type: "website",
    siteName: "BlogGo",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        {/* Subtle gradient background */}
        <div
          className="fixed inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(124,58,237,0.12) 0%, transparent 60%)",
          }}
        />
        <Header />
        <main className="flex-1 relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
