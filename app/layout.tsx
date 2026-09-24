import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import ImageProtection from "@/app/components/shared/ImageProtection";
import ToastProvider from "@/app/components/ui/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitLog — Workout Library & Daily Plan Tracker",
  description:
    "FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.",
  icons: {
    icon: [
      {
        url: "/logo.png",
        type: "image/png",
        sizes: "28x28",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[#0c0d10] text-white selection:bg-[#ccff00] selection:text-black">
        <ImageProtection />
        <Navbar />
        <div className="flex flex-1 flex-col">
          {children}
          <Footer />
        </div>
        <ToastProvider />
      </body>
    </html>
  );
}
