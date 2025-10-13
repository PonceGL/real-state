import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

import { defaultMetadata } from "@/config/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="es-MX">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="w-full p-4 bg-blue-600 text-white">
          <Link href="/">Home</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
