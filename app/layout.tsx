import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import React from "react";

export const metadata: Metadata = {
  title: "URL Shortener",
  description: "Shorten your long URLs into compact, shareable links",
};

const playfair = Playfair_Display({subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.className} antialiased min-h-screen bg-pink-50`}>
      <Header/>
        {children}
      </body>
    </html>
  );
}
