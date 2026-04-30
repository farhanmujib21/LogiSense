import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LogiSense AI",
  description: "Platform web berbasis AI untuk otomasi data pemeliharaan aset logistik",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="en">
    <head>
      <meta name="dicoding:email" content="mujiburrahmanfarhan@gmail.com" />
    </head>
    <body>
      {children}
    </body>
  </html>
);
}