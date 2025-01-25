import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";

const RobotoSans = Roboto({
  variable: "--font-Roboto-sans",
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
        className={`${RobotoSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
