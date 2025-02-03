import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const InterSans = Inter({
  variable: "--font-Inter-sans",
  subsets: ["latin"],
    weight: "400",
});

export const metadata: Metadata = {
  title: "Car speed app",
  description: "Car speed calculation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${InterSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

